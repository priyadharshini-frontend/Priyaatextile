"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  ContactFormData,
} from "@/schemas/contact.schema";
import { toast } from "sonner";
export default function ContactForm() {
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<ContactFormData>({
  resolver: zodResolver(contactSchema),
});

const onSubmit = async (data: ContactFormData) => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Something went wrong.");
      return;
    }
            reset();
    toast.success("Message sent successfully!");

  } catch (error) {
    console.error(error);
    alert("Failed to send message.");
  }
};

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-[#3d1f1f] mb-8">
        Send Message
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        {/* Name */}

        <div>
          <input
            {...register("name")}
            placeholder="Your Name"
            className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#8B1E1E]"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#8B1E1E]"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#8B1E1E]"
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Message */}

        <div>
          <textarea
            {...register("message")}
            rows={6}
            placeholder="Write your message..."
            className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#8B1E1E]"
          />

          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#8B1E1E] hover:bg-[#6d1818] text-white py-4 rounded-xl font-semibold transition"
        >
          {isSubmitting
            ? "Sending..."
            : "Send Message"}
        </button>

      </form>

    </div>
  );
}