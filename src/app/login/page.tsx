"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }
      console.log("Login Success:", data);

      // Redirect after login
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center px-6 py-20 bg-cover bg-center bg-[url('/images/login/loginbg.jpg')]"
    >
      {/* Background Glow */}
      <div className="absolute -top-40 left-10 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-[500px] w-[500px] rounded-full bg-[#2b0d0d]/5 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4af37]/20 to-transparent blur-xl" />

        <div className="relative rounded-3xl border border-[#eadfce] bg-white p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#2b0d0d]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue your heritage journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-10 space-y-5">
            {/* Email */}
            <div className="flex items-center gap-3 rounded-2xl border border-[#eadfce] bg-[#faf7f2] px-4 h-14">
              <Mail className="h-5 w-5 text-[#d4af37]" />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-[#2b0d0d] outline-none placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 rounded-2xl border border-[#eadfce] bg-[#faf7f2] px-4 h-14">
              <Lock className="h-5 w-5 text-[#d4af37]" />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-[#2b0d0d] outline-none placeholder:text-gray-400"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500 font-medium">
                {error}
              </p>
            )}

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgotpass"
                className="text-xs text-[#b08b2d] hover:text-[#2b0d0d]"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d4af37] font-semibold text-[#2b0d0d] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-[#2b0d0d] hover:text-[#d4af37]"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}