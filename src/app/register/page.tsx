"use client";

import { useState,FormEvent } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Registration Success:", data);

      // Redirect
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-[url('/images/login/loginbg.jpg')] px-6 py-20">

      {/* Background glow */}
      <div className="absolute -top-40 left-10 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-[500px] w-[500px] rounded-full bg-[#2b0d0d]/5 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-md">

        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4af37]/20 to-transparent blur-xl" />

        <div className="relative rounded-3xl border border-[#eadfce] bg-white p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#2b0d0d]">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Join the heritage saree community
            </p>
          </div>

          <form onSubmit={handleRegister} className="mt-10 space-y-5">

            {/* Name */}
            <div className="flex items-center gap-3 rounded-2xl border border-[#eadfce] bg-[#faf7f2] px-4 h-14">
              <User className="h-5 w-5 text-[#d4af37]" />

              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-[#2b0d0d] outline-none placeholder:text-gray-400"
              />
            </div>

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

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d4af37] font-semibold text-[#2b0d0d] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60"
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#2b0d0d] hover:text-[#d4af37]"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}