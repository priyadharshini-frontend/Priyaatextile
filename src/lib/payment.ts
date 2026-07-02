declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentProps {
  order: any;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export const openRazorpay = ({ order, user }: PaymentProps) => {
  const options = {
    key: process.env.RAZORPAY_KEY_ID,

    amount: order.amount,

    currency: order.currency,

    name: "Ramya Boutique",

    description: "Order Payment",

    order_id: order.id,

    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },

    theme: {
      color: "#7A1F3D",
    },

    handler: async function (response: any) {
      console.log("PAYMENT SUCCESS");

      console.log(response);
    },
  };

  const razor = new window.Razorpay(options);

  razor.open();
};