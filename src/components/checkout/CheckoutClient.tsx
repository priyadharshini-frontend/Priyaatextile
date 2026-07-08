"use client";

import Script from "next/script";
import { useState,useEffect} from "react";
import { Lock, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/checkout/ContactForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useSearchParams } from "next/navigation";



export default function CheckoutClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
const [cartItems, setCartItems] = useState<any[]>([]);
const [isPaying, setIsPaying] = useState(false);
const [razorpayLoaded, setRazorpayLoaded] = useState(false);


  const fetchCart = async () => {
  try {
    const res = await fetch("/api/cart");
     const data = await res.json();


        const formattedItems =
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
    console.log(error);
  } finally {
   
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


//product details checkout
const fetchBuyNowProduct = async () => {
  try {
    console.log("Product ID:", productId);

    const res = await fetch(`/api/products/${productId}`);

    const data = await res.json();

    console.log("API Response:", data);

    const product = data.product;

    console.log("Product:", product);

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
  } catch (err) {
    console.error(err);
  }
};










const searchParams = useSearchParams();

const buyNow = searchParams.get("buyNow");

const productId = searchParams.get("productId");

const qty = Number(searchParams.get("qty") || 1);

useEffect(() => {
  if (buyNow) {
    fetchBuyNowProduct();
  } else {
    fetchCart();
  }
},[buyNow, productId]);



console.log("Cart Items:", cartItems);

//razorpay order
const handlePayment = async () => {
  try{
     const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  console.log("Total Amount:", total);
  const res = await fetch("/api/payment/create-order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: total,
  }),
});

const order = await res.json();

console.log(order);
openRazorpay(order);

  }
  catch(error){
    console.log(error)
  }
 
};


const openRazorpay = (order: any) => {
  if (!razorpayLoaded || !(window as any).Razorpay) {
  alert("Razorpay SDK is still loading. Please try again.");
  return;
}

const Razorpay = (window as any).Razorpay;

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

    amount: order.amount,

    currency: order.currency,

    name: "Shree priyaa Boutique",

    description: "Order Payment",

    order_id: order.id,

    prefill: {
      name: formData.fullName,
      email: formData.email,
      contact: formData.phone,
    },

    theme: {
      color: "#7A1F3D",
    },

modal: {
  ondismiss: () => {
    console.log("Payment cancelled");
  },
},

    
  handler: async (response: any) => {
  try {

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
   const verifyApi = buyNow
  ? "/api/payment/verify-buy-now"
  : "/api/payment/verify";

const res = await fetch(verifyApi, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

    const result = await res.json();

    console.log(result);

   if (result.success) {
  window.location.href = `/order-success?orderId=${result.orderId}`;
  return;
}

alert(result.message);
  } catch (err) {
    console.error(err);
  }
}
  };

  const paymentObject = new Razorpay(options);
  paymentObject.on("payment.failed", function (response: any) {
  console.log(response.error);
  alert("Payment Failed");
});

  paymentObject.open();
};

const handleContinue = async () => {
  if (isPaying) return;

  setIsPaying(true);

  try {
    const hasEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField) {
      alert("Please fill all fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    await handlePayment();
  } finally {
    setIsPaying(false);
  }
};


  return (
    <>
<Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="afterInteractive"
  onLoad={() => {
    console.log("Razorpay SDK Loaded");
    setRazorpayLoaded(true);
  }}
/>
      <div className="max-w-5xl mx-auto px-4 py-10 mt-30">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">

          {/* Left */}
          <div className="bg-white border border-stone-200 rounded-2xl p-7">

           

            <ContactForm
              data={formData}
              onChange={handleChange}
            />

            <ShippingForm
              data={formData}
              onChange={handleChange}
            />

            <button
               onClick={handleContinue}
              className="relative overflow-hidden w-full h-12 rounded-xl bg-[#7A1F3D] text-white font-semibold text-sm group/btn transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-white -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-in-out" />

              <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#7A1F3D] transition-colors duration-300">
                <Lock size={15} />
                Continue to Payment
              </span>
            </button>

            <p className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3">
              <ShieldCheck size={14} />
              Your information is encrypted and secure.
            </p>

          </div>

          {/* Right */}

          <div>
            <OrderSummary items={cartItems} />
          </div>

        </div>
      </div>
    </>
  );
}