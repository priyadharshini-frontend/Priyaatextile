"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Lock, ShieldCheck, MapPin, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

import ContactForm from "@/components/checkout/ContactForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  size: string;
  image: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// NOTE: Shape assumed for the saved-address API. If your backend returns a
// different field set / endpoint, update SavedAddress + fetchSavedAddresses
// below — nothing else in this file depends on the exact shape.
interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

// Shape of the registered user's profile — matches ContactForm's
// ContactData (fullName / email / phone). `name` and `mobile` are kept as
// fallbacks only in case your API ever returns those instead.
interface UserProfile {
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
}

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // --------------------------------------------------
  // BUY NOW / CART
  // --------------------------------------------------

  const buyNow = searchParams.get("buyNow") === "true";
  const productId = searchParams.get("productId");
  const qty = Number(searchParams.get("qty") || 1);

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isPaying, setIsPaying] = useState(false);

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // null = still checking
  // true = first order
  // false = returning customer
  const [isFirstOrder, setIsFirstOrder] = useState<boolean | null>(null);

  const [checkingAuth, setCheckingAuth] = useState(true);

  // --------------------------------------------------
  // SAVED ADDRESSES
  // --------------------------------------------------

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("new");
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // --------------------------------------------------
  // CUSTOM TOAST
  // --------------------------------------------------

  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --------------------------------------------------
  // SAVE CURRENT CHECKOUT URL
  // --------------------------------------------------

  const saveCheckoutRedirect = () => {
    const currentUrl = window.location.pathname + window.location.search;
    localStorage.setItem("redirectAfterLogin", currentUrl);
  };

  // --------------------------------------------------
  // CHECK AUTHENTICATION
  // --------------------------------------------------

  const checkAuthentication = async () => {
    try {
      /*
       * Your existing first-order API already requires
       * the authenticated user.
       *
       * Therefore we can use it to determine whether
       * the customer is logged in.
       */

      const res = await fetch("/api/orders/check-first-order", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      console.log("AUTH / FIRST ORDER RESPONSE:", data);

      // NOT LOGGED IN
      if (res.status === 401) {
        saveCheckoutRedirect();
        showToast("Please login to continue checkout.");
        setTimeout(() => router.push("/login"), 1200);
        return false;
      }

      // OTHER AUTH FAILURE
      if (!res.ok || !data.success) {
        console.error("Authentication check failed:", data.message);
        showToast(data.message || "Unable to verify your account.");
        return false;
      }

      // LOGGED IN
      setIsFirstOrder(data.isFirstOrder);
      return true;
    } catch (error) {
      console.error("AUTHENTICATION ERROR:", error);
      showToast("Unable to verify login. Please try again.");
      return false;
    }
  };

  // --------------------------------------------------
  // CHECK FIRST ORDER
  // --------------------------------------------------

  const checkFirstOrder = async () => {
    try {
      const res = await fetch("/api/orders/check-first-order", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      console.log("FIRST ORDER API:", data);

      // NOT LOGGED IN
      if (res.status === 401) {
        saveCheckoutRedirect();
        showToast("Please login to continue checkout.");
        setTimeout(() => router.push("/login"), 1200);
        return;
      }

      // API ERROR
      if (!res.ok || !data.success) {
        console.error("First order check failed:", data.message);
        // Fail safe: don't give free shipping
        setIsFirstOrder(false);
        return;
      }

      // SUCCESS
      setIsFirstOrder(data.isFirstOrder);
    } catch (error) {
      console.error("FIRST ORDER CHECK ERROR:", error);
      // Fail safe: if API fails, don't give free shipping.
      setIsFirstOrder(false);
    }
  };

  // --------------------------------------------------
  // FETCH CART
  // --------------------------------------------------

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        credentials: "include",
        cache: "no-store",
      });

      // UNAUTHORIZED
      if (res.status === 401) {
        saveCheckoutRedirect();
        showToast("Please login to continue checkout.");
        setTimeout(() => router.push("/login"), 1200);
        return;
      }

      const data = await res.json();

      console.log("CART API:", data);

      const formattedItems: CartItem[] =
        data.data?.items?.map((item: any) => ({
          id: item.id,
          name: item.product.name,
          price: item.product.salesPrice ?? item.product.price,
          qty: item.quantity,
          size: item.product.size?.[0] || "",
          image: item.product.image,
        })) || [];

      setCartItems(formattedItems);
    } catch (error) {
      console.error("FETCH CART ERROR:", error);
    }
  };

  // --------------------------------------------------
  // FETCH BUY NOW PRODUCT
  // --------------------------------------------------

  const fetchBuyNowProduct = async () => {
    if (!productId) {
      console.error("Product ID missing");
      return;
    }

    try {
      console.log("Product ID:", productId);

      const res = await fetch(`/api/products/${productId}`, {
        cache: "no-store",
      });

      const data = await res.json();

      console.log("PRODUCT API RESPONSE:", data);

      if (!res.ok || !data.product) {
        console.error("Product not found");
        return;
      }

      const product = data.product;

      setCartItems([
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.salesPrice ?? product.price,
          qty,
          size: product.size?.[0] || "",
        },
      ]);
    } catch (error) {
      console.error("BUY NOW PRODUCT ERROR:", error);
    }
  };

  // --------------------------------------------------
  // FETCH SAVED ADDRESSES
  // --------------------------------------------------

  const fetchSavedAddresses = async () => {
    setLoadingAddresses(true);

    try {
      // ASSUMPTION: GET /api/addresses -> { success: true, addresses: SavedAddress[] }
      // Swap this endpoint/shape for your real one if it differs.
      const res = await fetch("/api/addresses", {
        credentials: "include",
        cache: "no-store",
      });

      if (res.status === 401) {
        // Auth redirect is already handled by checkAuthentication.
        setSelectedAddressId("new");
        return;
      }

      const data = await res.json();

      console.log("SAVED ADDRESSES API:", data);

      if (!res.ok || !data.success || !Array.isArray(data.addresses) || data.addresses.length === 0) {
        setSavedAddresses([]);
        setSelectedAddressId("new");
        return;
      }

      const addresses: SavedAddress[] = data.addresses;
      setSavedAddresses(addresses);

      const preferred = addresses.find((a) => a.isDefault) || addresses[0];

      setSelectedAddressId(preferred.id);

      // Name / phone come from the logged-in user's profile (see
      // fetchUserProfile) — only the address fields are taken here.
      setFormData((prev) => ({
        ...prev,
        address: preferred.address,
        city: preferred.city,
        state: preferred.state,
        pincode: preferred.pincode,
      }));
    } catch (error) {
      console.error("FETCH SAVED ADDRESSES ERROR:", error);
      setSavedAddresses([]);
      setSelectedAddressId("new");
    } finally {
      setLoadingAddresses(false);
    }
  };

  // --------------------------------------------------
  // FETCH LOGGED-IN USER'S NAME / MOBILE NUMBER
  // --------------------------------------------------

  const fetchUserProfile = async () => {
    try {
      // ASSUMPTION: GET /api/user/me -> { success: true, user: { name, phone, email } }
      // Update the endpoint / field names below if your auth API differs.
      const res = await fetch("/api/user/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (res.status === 401) {
        // Auth redirect is already handled by checkAuthentication.
        return;
      }

      const data = await res.json();

      console.log("USER PROFILE API:", data);

      if (!res.ok || !data.success || !data.user) {
        console.error("Unable to load user profile:", data.message);
        return;
      }

      const user: UserProfile = data.user;

      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || user.mobile || prev.phone,
      }));
    } catch (error) {
      console.error("FETCH USER PROFILE ERROR:", error);
    }
  };

  // --------------------------------------------------
  // SELECT A SAVED ADDRESS / SWITCH TO NEW ADDRESS
  // --------------------------------------------------

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);

    if (id === "new") {
      setFormData((prev) => ({
        ...prev,
        address: "",
        city: "",
        state: "",
        pincode: "",
      }));
      setErrors((prev) => ({ ...prev, address: "", city: "", state: "", pincode: "" }));
      return;
    }

    const selected = savedAddresses.find((a) => a.id === id);

    if (selected) {
      // Name / phone stay as the logged-in user's own details — only
      // the address fields switch when picking a saved address.
      setFormData((prev) => ({
        ...prev,
        address: selected.address,
        city: selected.city,
        state: selected.state,
        pincode: selected.pincode,
      }));
      setErrors((prev) => ({ ...prev, address: "", city: "", state: "", pincode: "" }));
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const initializeCheckout = async () => {
      setCheckingAuth(true);

      const authenticated = await checkAuthentication();

      if (!mounted) return;

      if (!authenticated) {
        setCheckingAuth(false);
        return;
      }

      /*
       * Authentication succeeded.
       * checkAuthentication already returned the first-order status.
       */

      const cartPromise = buyNow && productId ? fetchBuyNowProduct() : fetchCart();

      await Promise.all([cartPromise, fetchSavedAddresses(), fetchUserProfile()]);

      if (mounted) {
        setCheckingAuth(false);
      }
    };

    initializeCheckout();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyNow, productId]);

  // --------------------------------------------------
  // HANDLE FORM CHANGE
  // --------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // If the shopper edits a pre-filled saved address, treat it as a
    // custom / updated address rather than silently keeping it tied
    // to the saved entry.
    if (["address", "city", "state", "pincode"].includes(name) && selectedAddressId !== "new") {
      setSelectedAddressId("new");
    }
  };

  // --------------------------------------------------
  // SHIPPING CALCULATION
  // --------------------------------------------------

  const calculateShipping = (state: string, quantity: number): number => {
    // Still checking first-order status
    if (isFirstOrder === null) return 0;

    // FIRST ORDER = FREE SHIPPING
    if (isFirstOrder === true) return 0;

    // RETURNING CUSTOMER
    if (!state) return 0;

    const normalizedState = state.trim().toLowerCase();

    const baseShipping = normalizedState === "tamil nadu" ? 75 : 100;

    if (quantity <= 1) return baseShipping;

    return baseShipping + (quantity - 1) * 25;
  };

  // --------------------------------------------------
  // SUBTOTAL / QUANTITY / SHIPPING / TOTAL
  // --------------------------------------------------

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalQuantity = cartItems.reduce((total, item) => total + item.qty, 0);

  const shipping = calculateShipping(formData.state, totalQuantity);

  const total = subtotal + shipping;

  // --------------------------------------------------
  // RAZORPAY PAYMENT
  // --------------------------------------------------

  const handlePayment = async () => {
    try {
      console.log("=================================");
      console.log("START PAYMENT");
      console.log("BUY NOW:", buyNow);
      console.log("PRODUCT ID:", productId);
      console.log("QUANTITY:", qty);
      console.log("STATE:", formData.state);
      console.log("FRONTEND SUBTOTAL:", subtotal);
      console.log("FRONTEND SHIPPING:", shipping);
      console.log("FRONTEND TOTAL:", total);
      console.log("=================================");

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          buyNow,
          productId,
          quantity: qty,
          state: formData.state,
        }),
      });

      // UNAUTHORIZED
      if (res.status === 401) {
        saveCheckoutRedirect();
        showToast("Your session has expired. Please login again.");
        setTimeout(() => router.push("/login"), 1200);
        return;
      }

      const order = await res.json();

      console.log("CREATE ORDER RESPONSE:", order);

      if (!res.ok || !order.success) {
        showToast(order.message || "Unable to create payment");
        return;
      }

      openRazorpay(order);
    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      showToast("Something went wrong while starting payment.");
    }
  };

  // --------------------------------------------------
  // OPEN RAZORPAY
  // --------------------------------------------------

  const openRazorpay = (order: any) => {
    if (!razorpayLoaded || !(window as any).Razorpay) {
      showToast("Razorpay SDK is still loading. Please try again.");
      return;
    }

    const Razorpay = (window as any).Razorpay;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Priyaa Textile",
      description: isFirstOrder ? "First Order - Free Shipping" : "Order Payment",
      order_id: order.id,

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },

      theme: { color: "#7A1F3D" },

      modal: {
        ondismiss: () => {
          console.log("Payment cancelled");
        },
      },

      handler: async (response: any) => {
        try {
          console.log("RAZORPAY PAYMENT RESPONSE:", response);

          const payload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,

            shipping: {
              fullName: formData.fullName,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode,
            },

            buyNow: !!buyNow,
            productId,
            quantity: qty,
          };

          const verifyApi = buyNow ? "/api/payment/verify-buy-now" : "/api/payment/verify";

          const res = await fetch(verifyApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          });

          // UNAUTHORIZED
          if (res.status === 401) {
            saveCheckoutRedirect();
            showToast("Please login again to complete your order.");
            setTimeout(() => router.push("/login"), 1200);
            return;
          }

          const result = await res.json();

          console.log("VERIFY PAYMENT RESULT:", result);

          if (result.success) {
            window.location.href = `/order-success?orderId=${result.orderId}`;
            return;
          }

          showToast(result.message || "Payment verification failed.");
        } catch (error) {
          console.error("PAYMENT VERIFICATION ERROR:", error);
          showToast("Payment was completed, but order verification failed. Please contact support.");
        }
      },
    };

    const paymentObject = new Razorpay(options);

    paymentObject.on("payment.failed", (response: any) => {
      console.error("RAZORPAY PAYMENT FAILED:", response.error);
      showToast(response.error?.description || "Payment failed. Please try again.");
    });

    paymentObject.open();
  };

  // --------------------------------------------------
  // FORM VALIDATION
  // --------------------------------------------------

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    // Full Name
    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      validationErrors.fullName = "Full name must be at least 3 characters";
    }

    // Email
    if (!formData.email.trim()) {
      validationErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid email address";
    }

    // Phone
    const phone = formData.phone.replace(/\s+/g, "");

    if (!phone) {
      validationErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      validationErrors.phone = "Enter a valid 10-digit mobile number";
    }

    // Address
    if (!formData.address.trim()) {
      validationErrors.address = "Street address is required";
    } else if (formData.address.trim().length < 10) {
      validationErrors.address = "Please enter a complete address";
    }

    // City
    if (!formData.city.trim()) {
      validationErrors.city = "City is required";
    }

    // State
    if (!formData.state.trim()) {
      validationErrors.state = "State is required";
    }

    // Pincode
    if (!formData.pincode.trim()) {
      validationErrors.pincode = "Pincode is required";
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      validationErrors.pincode = "Enter a valid 6-digit pincode";
    }

    return validationErrors;
  };

  // --------------------------------------------------
  // CONTINUE TO PAYMENT
  // --------------------------------------------------

  const handleContinue = async () => {
    if (isPaying) return;

    /*
     * Backend will also verify authentication.
     * This is an additional frontend protection.
     */
    if (checkingAuth) {
      showToast("Please wait while we verify your account.");
      return;
    }

    if (isFirstOrder === null) {
      showToast("Please wait while we check your first-order offer.");
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (cartItems.length === 0) {
      showToast("Cart is empty");
      return;
    }

    setIsPaying(true);

    try {
      await handlePayment();
    } finally {
      setIsPaying(false);
    }
  };

  // --------------------------------------------------
  // AUTH CHECKING SCREEN
  // --------------------------------------------------

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5]">
        <div className="w-9 h-9 border-[3px] border-stone-200 border-t-[#7A1F3D] rounded-full animate-spin" />
        <p className="mt-4 text-stone-500 text-sm tracking-wide">Checking your account…</p>
      </div>
    );
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <>
      {/* TOAST */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[9999] flex items-start gap-2.5 max-w-sm px-4 py-3 rounded-xl shadow-lg shadow-black/10 text-sm font-medium text-white animate-in fade-in slide-in-from-top-2 ${
            toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* RAZORPAY SCRIPT */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Razorpay SDK Loaded");
          setRazorpayLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load Razorpay SDK");
          setRazorpayLoaded(false);
        }}
      />

      {/* CHECKOUT */}
      <div className="min-h-screen bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
          {/* Page heading */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7A1F3D] uppercase">
                Priyaa Textile
              </p>
              <h1 className="text-2xl font-semibold text-stone-800 mt-1">Checkout</h1>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400">
              <ShieldCheck size={14} className="text-[#7A1F3D]" />
              Secure checkout
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
            {/* LEFT SIDE */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-sm shadow-stone-200/40">
              <ContactForm data={formData} errors={errors} onChange={handleChange} />

              {/* -------------------------------- */}
              {/* SAVED ADDRESSES */}
              {/* -------------------------------- */}

              <div className="mt-7 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-[#7A1F3D]" />
                  <h2 className="text-sm font-semibold text-stone-800">Delivery address</h2>
                </div>

                {loadingAddresses ? (
                  <div className="space-y-2">
                    <div className="h-16 rounded-xl bg-stone-100 animate-pulse" />
                    <div className="h-16 rounded-xl bg-stone-100 animate-pulse" />
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {savedAddresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;

                      return (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${
                            isSelected
                              ? "border-[#7A1F3D] bg-[#7A1F3D]/[0.04] ring-1 ring-[#7A1F3D]/30"
                              : "border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="savedAddress"
                            className="mt-1 accent-[#7A1F3D]"
                            checked={isSelected}
                            onChange={() => handleSelectAddress(addr.id)}
                          />

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-stone-800 truncate">
                                {addr.fullName}
                              </p>
                              {addr.isDefault && (
                                <span className="text-[10px] uppercase tracking-wide font-semibold text-[#7A1F3D] bg-[#7A1F3D]/10 px-1.5 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                              {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                            <p className="text-xs text-stone-400 mt-0.5">{addr.phone}</p>
                          </div>
                        </label>
                      );
                    })}

                    <label
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${
                        selectedAddressId === "new"
                          ? "border-[#7A1F3D] bg-[#7A1F3D]/[0.04] ring-1 ring-[#7A1F3D]/30"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="savedAddress"
                        className="accent-[#7A1F3D]"
                        checked={selectedAddressId === "new"}
                        onChange={() => handleSelectAddress("new")}
                      />
                      <span className="flex items-center gap-1.5 text-sm font-medium text-stone-700">
                        <Plus size={14} />
                        {savedAddresses.length > 0 ? "Use a new address" : "Enter delivery address"}
                      </span>
                    </label>
                  </div>
                )}

                <p className="text-xs text-stone-400 mt-3">
                  {selectedAddressId === "new"
                    ? "Fill in the delivery details below."
                    : "You can edit any field below — it'll be saved as your delivery address for this order."}
                </p>
              </div>

              <ShippingForm data={formData} errors={errors} onChange={handleChange} />

              {/* FIRST ORDER OFFER */}
              {isFirstOrder === true && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                  <p className="text-sm font-semibold text-emerald-700">🎉 First Order Offer</p>
                  <p className="text-xs text-emerald-600 mt-1">Free shipping on your first order!</p>
                </div>
              )}

              {/* RETURNING CUSTOMER */}
              {isFirstOrder === false && (
                <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-center">
                  <p className="text-xs text-stone-600">
                    Shipping charges are calculated based on your delivery location.
                  </p>
                </div>
              )}

              {/* PAYMENT BUTTON */}
              <button
                type="button"
                onClick={handleContinue}
                disabled={isPaying || checkingAuth || isFirstOrder === null || cartItems.length === 0}
                className="relative overflow-hidden w-full h-12 rounded-xl bg-[#7A1F3D] text-white font-semibold text-sm group/btn transition-colors duration-300 mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-white -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#7A1F3D] transition-colors duration-300">
                  <Lock size={15} />
                  {isPaying
                    ? "Processing..."
                    : isFirstOrder === null
                      ? "Checking offer..."
                      : "Continue to Payment"}
                </span>
              </button>

              <p className="flex items-center justify-center gap-2 text-xs text-stone-400 mt-3">
                <ShieldCheck size={14} />
                Your information is encrypted and secure.
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:sticky lg:top-24">
              <OrderSummary items={cartItems} shipping={shipping} isFirstOrder={isFirstOrder} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
