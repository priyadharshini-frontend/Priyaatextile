"use client";

import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function page() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center  px-6 py-20 bg-cover bg-center  bg-[url('/images/login/loginbg.jpg')]">

      {/* Background glow */}
      <div className="absolute -top-40 left-10 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-[500px] w-[500px] rounded-full bg-[#2b0d0d]/5 blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* soft glow frame */}
        <div className="absolute -inset-1 rounded-3xl bg-[#d4af37]/10 blur-xl" />

        <div className="relative rounded-3xl border border-[#eadfce] bg-white p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

          {!sent ? (
            <>
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-[#2b0d0d]">
                  Forgot Password
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Enter your email and we’ll send you a reset link
                </p>
              </div>

              {/* Form */}
              <div className="mt-10 space-y-5">

                {/* Email Input */}
                <div className="flex items-center gap-3 rounded-2xl border border-[#eadfce] bg-[#faf7f2] px-4 h-14">
                  <Mail className="h-5 w-5 text-[#d4af37]" />

                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-transparent text-[#2b0d0d] outline-none placeholder:text-gray-400"
                  />
                </div>

                {/* Button */}
                <button
                  onClick={() => setSent(true)}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d4af37] font-semibold text-[#2b0d0d] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Send Reset Link
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Back to login */}
              <p className="mt-8 text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#2b0d0d] hover:text-[#d4af37]"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/10">
                <CheckCircle className="h-8 w-8 text-[#d4af37]" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#2b0d0d]">
                Email Sent
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                We’ve sent a password reset link to your email.  
                Please check your inbox and follow the instructions.
              </p>

              <Link
                href="/login"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d4af37] px-6 py-3 font-semibold text-[#2b0d0d] shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}