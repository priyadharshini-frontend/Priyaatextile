"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
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
  const [isFirstOrder, setIsFirstOrder] = useState<boolean | null>(
    null
  );

  const [checkingAuth, setCheckingAuth] = useState(true);

  // --------------------------------------------------
  // CUSTOM TOAST
  // --------------------------------------------------

  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const showToast = (
    message: string,
    type: "error" | "success" = "error"
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // --------------------------------------------------
  // SAVE CURRENT CHECKOUT URL
  // --------------------------------------------------

  const saveCheckoutRedirect = () => {
    const currentUrl =
      window.location.pathname +
      window.location.search;

    localStorage.setItem(
      "redirectAfterLogin",
      currentUrl
    );
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

      const res = await fetch(
        "/api/orders/check-first-order",
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await res.json();

      console.log(
        "AUTH / FIRST ORDER RESPONSE:",
        data
      );

      // --------------------------------------------
      // NOT LOGGED IN
      // --------------------------------------------

      if (res.status === 401) {
        saveCheckoutRedirect();

        showToast(
          "Please login to continue checkout."
        );

        setTimeout(() => {
          router.push("/login");
        }, 1200);

        return false;
      }

      // --------------------------------------------
      // OTHER AUTH FAILURE
      // --------------------------------------------

      if (
        !res.ok ||
        !data.success
      ) {
        console.error(
          "Authentication check failed:",
          data.message
        );

        showToast(
          data.message ||
            "Unable to verify your account."
        );

        return false;
      }

      // --------------------------------------------
      // LOGGED IN
      // --------------------------------------------

      setIsFirstOrder(
        data.isFirstOrder
      );

      return true;
    } catch (error) {
      console.error(
        "AUTHENTICATION ERROR:",
        error
      );

      showToast(
        "Unable to verify login. Please try again."
      );

      return false;
    }
  };

  // --------------------------------------------------
  // CHECK FIRST ORDER
  // --------------------------------------------------

  const checkFirstOrder = async () => {
    try {
      const res = await fetch(
        "/api/orders/check-first-order",
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await res.json();

      console.log(
        "FIRST ORDER API:",
        data
      );

      // --------------------------------------------
      // NOT LOGGED IN
      // --------------------------------------------

      if (res.status === 401) {
        saveCheckoutRedirect();

        showToast(
          "Please login to continue checkout."
        );

        setTimeout(() => {
          router.push("/login");
        }, 1200);

        return;
      }

      // --------------------------------------------
      // API ERROR
      // --------------------------------------------

      if (
        !res.ok ||
        !data.success
      ) {
        console.error(
          "First order check failed:",
          data.message
        );

        // Fail safe:
        // Don't give free shipping
        setIsFirstOrder(false);

        return;
      }

      // --------------------------------------------
      // SUCCESS
      // --------------------------------------------

      setIsFirstOrder(
        data.isFirstOrder
      );
    } catch (error) {
      console.error(
        "FIRST ORDER CHECK ERROR:",
        error
      );

      // Fail safe:
      // If API fails, don't give free shipping.
      setIsFirstOrder(false);
    }
  };

  // --------------------------------------------------
  // FETCH CART
  // --------------------------------------------------

  const fetchCart = async () => {
    try {
      const res = await fetch(
        "/api/cart",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      // --------------------------------------------
      // UNAUTHORIZED
      // --------------------------------------------

      if (res.status === 401) {
        saveCheckoutRedirect();

        showToast(
          "Please login to continue checkout."
        );

        setTimeout(() => {
          router.push("/login");
        }, 1200);

        return;
      }

      const data = await res.json();

      console.log(
        "CART API:",
        data
      );

      const formattedItems: CartItem[] =
        data.data?.items?.map(
          (item: any) => ({
            id: item.id,

            name:
              item.product.name,

            price:
              item.product.salesPrice ??
              item.product.price,

            qty:
              item.quantity,

            size:
              item.product.size?.[0] ||
              "",

            image:
              item.product.image,
          })
        ) || [];

      setCartItems(
        formattedItems
      );
    } catch (error) {
      console.error(
        "FETCH CART ERROR:",
        error
      );
    }
  };

  // --------------------------------------------------
  // FETCH BUY NOW PRODUCT
  // --------------------------------------------------

  const fetchBuyNowProduct = async () => {
    if (!productId) {
      console.error(
        "Product ID missing"
      );

      return;
    }

    try {
      console.log(
        "Product ID:",
        productId
      );

      const res = await fetch(
        `/api/products/${productId}`,
        {
          cache: "no-store",
        }
      );

      const data =
        await res.json();

      console.log(
        "PRODUCT API RESPONSE:",
        data
      );

      if (
        !res.ok ||
        !data.product
      ) {
        console.error(
          "Product not found"
        );

        return;
      }

      const product =
        data.product;

      setCartItems([
        {
          id: product.id,

          name:
            product.name,

          image:
            product.image,

          price:
            product.salesPrice ??
            product.price,

          qty,

          size:
            product.size?.[0] ||
            "",
        },
      ]);
    } catch (error) {
      console.error(
        "BUY NOW PRODUCT ERROR:",
        error
      );
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const initializeCheckout =
      async () => {
        setCheckingAuth(true);

        const authenticated =
          await checkAuthentication();

        if (!mounted) {
          return;
        }

        if (!authenticated) {
          setCheckingAuth(false);
          return;
        }

        /*
         * Authentication succeeded.
         *
         * checkAuthentication already returned
         * the first-order status.
         */

        if (
          buyNow &&
          productId
        ) {
          await fetchBuyNowProduct();
        } else {
          await fetchCart();
        }

        if (mounted) {
          setCheckingAuth(false);
        }
      };

    initializeCheckout();

    return () => {
      mounted = false;
    };
  }, [buyNow, productId]);

  // --------------------------------------------------
  // HANDLE FORM CHANGE
  // --------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );

    setErrors(
      (prev) => ({
        ...prev,
        [name]: "",
      })
    );
  };

  // --------------------------------------------------
  // SHIPPING CALCULATION
  // --------------------------------------------------

  const calculateShipping = (
    state: string,
    quantity: number
  ): number => {
    // Still checking first-order status
    if (
      isFirstOrder === null
    ) {
      return 0;
    }

    // -----------------------------------------------
    // FIRST ORDER = FREE SHIPPING
    // -----------------------------------------------

    if (
      isFirstOrder === true
    ) {
      return 0;
    }

    // -----------------------------------------------
    // RETURNING CUSTOMER
    // -----------------------------------------------

    if (!state) {
      return 0;
    }

    const normalizedState =
      state
        .trim()
        .toLowerCase();

    const baseShipping =
      normalizedState ===
      "tamil nadu"
        ? 75
        : 100;

    if (quantity <= 1) {
      return baseShipping;
    }

    return (
      baseShipping +
      (quantity - 1) * 25
    );
  };

  // --------------------------------------------------
  // SUBTOTAL
  // --------------------------------------------------

  const subtotal =
    cartItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.qty,
      0
    );

  // --------------------------------------------------
  // TOTAL QUANTITY
  // --------------------------------------------------

  const totalQuantity =
    cartItems.reduce(
      (total, item) =>
        total + item.qty,
      0
    );

  // --------------------------------------------------
  // SHIPPING
  // --------------------------------------------------

  const shipping =
    calculateShipping(
      formData.state,
      totalQuantity
    );

  // --------------------------------------------------
  // FINAL TOTAL
  // --------------------------------------------------

  const total =
    subtotal + shipping;

  // --------------------------------------------------
  // RAZORPAY PAYMENT
  // --------------------------------------------------

  const handlePayment =
    async () => {
      try {
        console.log(
          "================================="
        );

        console.log(
          "START PAYMENT"
        );

        console.log(
          "BUY NOW:",
          buyNow
        );

        console.log(
          "PRODUCT ID:",
          productId
        );

        console.log(
          "QUANTITY:",
          qty
        );

        console.log(
          "STATE:",
          formData.state
        );

        console.log(
          "FRONTEND SUBTOTAL:",
          subtotal
        );

        console.log(
          "FRONTEND SHIPPING:",
          shipping
        );

        console.log(
          "FRONTEND TOTAL:",
          total
        );

        console.log(
          "================================="
        );

        const res =
          await fetch(
            "/api/payment/create-order",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              credentials:
                "include",

              body: JSON.stringify({
                buyNow,

                productId,

                quantity: qty,

                state:
                  formData.state,
              }),
            }
          );

        // ------------------------------------------
        // UNAUTHORIZED
        // ------------------------------------------

        if (res.status === 401) {
          saveCheckoutRedirect();

          showToast(
            "Your session has expired. Please login again."
          );

          setTimeout(() => {
            router.push("/login");
          }, 1200);

          return;
        }

        const order =
          await res.json();

        console.log(
          "CREATE ORDER RESPONSE:",
          order
        );

        if (
          !res.ok ||
          !order.success
        ) {
          showToast(
            order.message ||
              "Unable to create payment"
          );

          return;
        }

        openRazorpay(order);
      } catch (error) {
        console.error(
          "PAYMENT ERROR:",
          error
        );

        showToast(
          "Something went wrong while starting payment."
        );
      }
    };

  // --------------------------------------------------
  // OPEN RAZORPAY
  // --------------------------------------------------

  const openRazorpay = (
    order: any
  ) => {
    if (
      !razorpayLoaded ||
      !(window as any).Razorpay
    ) {
      showToast(
        "Razorpay SDK is still loading. Please try again."
      );

      return;
    }

    const Razorpay =
      (window as any).Razorpay;

    const options = {
      key:
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount:
        order.amount,

      currency:
        order.currency,

      name:
        "Priyaa Textile",

      description:
        isFirstOrder
          ? "First Order - Free Shipping"
          : "Order Payment",

      order_id:
        order.id,

      prefill: {
        name:
          formData.fullName,

        email:
          formData.email,

        contact:
          formData.phone,
      },

      theme: {
        color:
          "#7A1F3D",
      },

      modal: {
        ondismiss: () => {
          console.log(
            "Payment cancelled"
          );
        },
      },

      handler:
        async (
          response: any
        ) => {
          try {
            console.log(
              "RAZORPAY PAYMENT RESPONSE:",
              response
            );

            const payload = {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,

              shipping: {
                fullName:
                  formData.fullName,

                phone:
                  formData.phone,

                address:
                  formData.address,

                city:
                  formData.city,

                state:
                  formData.state,

                pincode:
                  formData.pincode,
              },

              buyNow:
                !!buyNow,

              productId,

              quantity:
                qty,
            };

            const verifyApi =
              buyNow
                ? "/api/payment/verify-buy-now"
                : "/api/payment/verify";

            const res =
              await fetch(
                verifyApi,
                {
                  method:
                    "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  credentials:
                    "include",

                  body:
                    JSON.stringify(
                      payload
                    ),
                }
              );

            // ----------------------------------
            // UNAUTHORIZED
            // ----------------------------------

            if (
              res.status === 401
            ) {
              saveCheckoutRedirect();

              showToast(
                "Please login again to complete your order."
              );

              setTimeout(() => {
                router.push(
                  "/login"
                );
              }, 1200);

              return;
            }

            const result =
              await res.json();

            console.log(
              "VERIFY PAYMENT RESULT:",
              result
            );

            if (
              result.success
            ) {
              window.location.href =
                `/order-success?orderId=${result.orderId}`;

              return;
            }

            showToast(
              result.message ||
                "Payment verification failed."
            );
          } catch (error) {
            console.error(
              "PAYMENT VERIFICATION ERROR:",
              error
            );

            showToast(
              "Payment was completed, but order verification failed. Please contact support."
            );
          }
        },
    };

    const paymentObject =
      new Razorpay(
        options
      );

    paymentObject.on(
      "payment.failed",
      (response: any) => {
        console.error(
          "RAZORPAY PAYMENT FAILED:",
          response.error
        );

        showToast(
          response.error
            ?.description ||
            "Payment failed. Please try again."
        );
      }
    );

    paymentObject.open();
  };

  // --------------------------------------------------
  // FORM VALIDATION
  // --------------------------------------------------

  const validateForm =
    () => {
      const validationErrors: Record<
        string,
        string
      > = {};

      // Full Name
      if (
        !formData.fullName.trim()
      ) {
        validationErrors.fullName =
          "Full name is required";
      } else if (
        formData.fullName
          .trim()
          .length < 3
      ) {
        validationErrors.fullName =
          "Full name must be at least 3 characters";
      }

      // Email
      if (
        !formData.email.trim()
      ) {
        validationErrors.email =
          "Email address is required";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          formData.email
        )
      ) {
        validationErrors.email =
          "Enter a valid email address";
      }

      // Phone
      const phone =
        formData.phone.replace(
          /\s+/g,
          ""
        );

      if (!phone) {
        validationErrors.phone =
          "Phone number is required";
      } else if (
        !/^[6-9]\d{9}$/.test(
          phone
        )
      ) {
        validationErrors.phone =
          "Enter a valid 10-digit mobile number";
      }

      // Address
      if (
        !formData.address.trim()
      ) {
        validationErrors.address =
          "Street address is required";
      } else if (
        formData.address
          .trim()
          .length < 10
      ) {
        validationErrors.address =
          "Please enter a complete address";
      }

      // City
      if (
        !formData.city.trim()
      ) {
        validationErrors.city =
          "City is required";
      }

      // State
      if (
        !formData.state.trim()
      ) {
        validationErrors.state =
          "State is required";
      }

      // Pincode
      if (
        !formData.pincode.trim()
      ) {
        validationErrors.pincode =
          "Pincode is required";
      } else if (
        !/^[1-9][0-9]{5}$/.test(
          formData.pincode
        )
      ) {
        validationErrors.pincode =
          "Enter a valid 6-digit pincode";
      }

      return validationErrors;
    };

  // --------------------------------------------------
  // CONTINUE TO PAYMENT
  // --------------------------------------------------

  const handleContinue =
    async () => {
      if (isPaying) {
        return;
      }

      // --------------------------------------------
      // AUTH CHECK
      // --------------------------------------------

      /*
       * Backend will also verify authentication.
       * This is an additional frontend protection.
       */

      if (checkingAuth) {
        showToast(
          "Please wait while we verify your account."
        );

        return;
      }

      // --------------------------------------------
      // FIRST ORDER CHECK
      // --------------------------------------------

      if (
        isFirstOrder === null
      ) {
        showToast(
          "Please wait while we check your first-order offer."
        );

        return;
      }

      // --------------------------------------------
      // FORM VALIDATION
      // --------------------------------------------

      const validationErrors =
        validateForm();

      if (
        Object.keys(
          validationErrors
        ).length > 0
      ) {
        setErrors(
          validationErrors
        );

        return;
      }

      // --------------------------------------------
      // CART CHECK
      // --------------------------------------------

      if (
        cartItems.length === 0
      ) {
        showToast(
          "Cart is empty"
        );

        return;
      }

      // --------------------------------------------
      // PAYMENT
      // --------------------------------------------

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-[#7A1F3D] rounded-full animate-spin" />

        <p className="mt-4 text-gray-600 text-sm">
          Checking your account...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <>
      {/* ------------------------------------------- */}
      {/* TOAST */}
      {/* ------------------------------------------- */}

      {toast && (
        <div
          className={`fixed top-5 right-5 z-[9999] max-w-sm px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${
            toast.type === "error"
              ? "bg-red-600"
              : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ------------------------------------------- */}
      {/* RAZORPAY SCRIPT */}
      {/* ------------------------------------------- */}

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log(
            "Razorpay SDK Loaded"
          );

          setRazorpayLoaded(
            true
          );
        }}
        onError={() => {
          console.error(
            "Failed to load Razorpay SDK"
          );

          setRazorpayLoaded(
            false
          );
        }}
      />

      {/* ------------------------------------------- */}
      {/* CHECKOUT */}
      {/* ------------------------------------------- */}

      <div className="max-w-5xl mx-auto px-4 py-10 mt-30">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">

          {/* --------------------------------------- */}
          {/* LEFT SIDE */}
          {/* --------------------------------------- */}

          <div className="bg-white border border-stone-200 rounded-2xl p-7">

            <ContactForm
              data={formData}
              errors={errors}
              onChange={
                handleChange
              }
            />

            <ShippingForm
              data={formData}
              errors={errors}
              onChange={
                handleChange
              }
            />

            {/* ----------------------------------- */}
            {/* FIRST ORDER OFFER */}
            {/* ----------------------------------- */}

            {isFirstOrder ===
              true && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-green-700">
                  🎉 First Order Offer
                </p>

                <p className="text-xs text-green-600 mt-1">
                  Free shipping on your first order!
                </p>
              </div>
            )}

            {/* ----------------------------------- */}
            {/* RETURNING CUSTOMER */}
            {/* ----------------------------------- */}

            {isFirstOrder ===
              false && (
              <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-center">
                <p className="text-xs text-stone-600">
                  Shipping charges are calculated based on your delivery location.
                </p>
              </div>
            )}

            {/* ----------------------------------- */}
            {/* PAYMENT BUTTON */}
            {/* ----------------------------------- */}

            <button
              type="button"
              onClick={
                handleContinue
              }
              disabled={
                isPaying ||
                checkingAuth ||
                isFirstOrder ===
                  null ||
                cartItems.length ===
                  0
              }
              className="relative overflow-hidden w-full h-12 rounded-xl bg-[#7A1F3D] text-white font-semibold text-sm group/btn transition-colors duration-300 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-white -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-in-out" />

              <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#7A1F3D] transition-colors duration-300">
                <Lock
                  size={15}
                />

                {isPaying
                  ? "Processing..."
                  : isFirstOrder ===
                      null
                    ? "Checking offer..."
                    : "Continue to Payment"}
              </span>
            </button>

            <p className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3">
              <ShieldCheck
                size={14}
              />

              Your information is encrypted and secure.
            </p>
          </div>

          {/* --------------------------------------- */}
          {/* RIGHT SIDE */}
          {/* --------------------------------------- */}

          <div>
            <OrderSummary
              items={
                cartItems
              }
              shipping={
                shipping
              }
              isFirstOrder={
                isFirstOrder
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}