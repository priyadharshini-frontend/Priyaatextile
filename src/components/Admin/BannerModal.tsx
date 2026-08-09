"use client";

import { useState, ChangeEvent } from "react";
import { X, UploadCloud, Loader2, ImageOff } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";

interface BannerModalProps {
  open: boolean;
  onClose: () => void;
}

interface HeroForm {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  desktopImage: File | null;
  mobileImage: File | null;
  isActive: boolean;
}

const initialForm: HeroForm = {
  title: "",
  subtitle: "",
  description: "",
  buttonText: "",
  buttonLink: "",
  desktopImage: null,
  mobileImage: null,
  isActive: true,
};

export default function BannerModal({ open, onClose }: BannerModalProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const [form, setForm] = useState<HeroForm>(initialForm);
  const [desktopPreview, setDesktopPreview] = useState("");
  const [mobilePreview, setMobilePreview] = useState("");

  if (!open) return null;

  const handleChange =
    (field: keyof HeroForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleImage = (field: "desktopImage" | "mobileImage", setPreview: (url: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      const file = e.target.files[0];
      setForm((prev) => ({ ...prev, [field]: file }));
      setPreview(URL.createObjectURL(file));
    };

  const clearImage = (field: "desktopImage" | "mobileImage", setPreview: (url: string) => void) => {
    setForm((prev) => ({ ...prev, [field]: null }));
    setPreview("");
  };

  async function saveHero() {
    setStatus(null);

    if (!form.desktopImage) {
      setStatus({ type: "error", message: "Add a desktop banner image before saving." });
      return;
    }

    try {
      setLoading(true);

      const desktopImageUrl = await uploadImage(form.desktopImage);
      const mobileImageUrl = form.mobileImage ? await uploadImage(form.mobileImage) : "";

      const response = await fetch("/api/admin/banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          subtitle: form.subtitle,
          description: form.description,
          desktopImage: desktopImageUrl,
          mobileImage: mobileImageUrl,
          buttonText: form.buttonText,
          buttonLink: form.buttonLink,
          isActive: form.isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create hero");
      }

      setStatus({ type: "success", message: "Hero saved. Closing…" });
      setTimeout(onClose, 600);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-100 flex justify-between items-center px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-[#12141C]">Hero Section</h2>
            <p className="text-sm text-gray-500 mt-0.5">Update the homepage hero banner</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status && (
            <div
              className={`mb-5 rounded-lg px-4 py-2.5 text-sm ${
                status.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-100"
                  : "bg-green-50 text-green-700 border border-green-100"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Images */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <label className="text-sm font-medium text-[#12141C]">Desktop Banner</label>
              <p className="text-xs text-gray-400 mb-2">Wide format, shown on desktop screens</p>
              <div className="relative h-32 w-56 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
                {desktopPreview ? (
                  <>
                    <img src={desktopPreview} className="w-full h-full object-cover" alt="Desktop banner preview" />
                    <button
                      onClick={() => clearImage("desktopImage", setDesktopPreview)}
                      className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                      aria-label="Remove desktop image"
                    >
                      <X size={13} />
                    </button>
                  </>
                ) : (
                  <label className="h-full w-full flex flex-col justify-center items-center cursor-pointer text-gray-400 hover:text-gray-500 hover:border-[#C99A3B] transition-colors">
                    <UploadCloud size={28} />
                    <p className="mt-2 text-xs">Upload image</p>
                    <input hidden type="file" accept="image/*" onChange={handleImage("desktopImage", setDesktopPreview)} />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#12141C]">Mobile Banner</label>
              <p className="text-xs text-gray-400 mb-2">Tall format, shown on mobile screens</p>
              <div className="relative h-40 w-24 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
                {mobilePreview ? (
                  <>
                    <img src={mobilePreview} className="w-full h-full object-cover" alt="Mobile banner preview" />
                    <button
                      onClick={() => clearImage("mobileImage", setMobilePreview)}
                      className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                      aria-label="Remove mobile image"
                    >
                      <X size={13} />
                    </button>
                  </>
                ) : (
                  <label className="h-full w-full flex flex-col justify-center items-center cursor-pointer text-gray-400 hover:text-gray-500 hover:border-[#C99A3B] transition-colors px-2 text-center">
                    <ImageOff size={22} />
                    <p className="mt-2 text-[11px]">Upload</p>
                    <input hidden type="file" accept="image/*" onChange={handleImage("mobileImage", setMobilePreview)} />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Text fields */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <Field label="Title">
                <input
                  value={form.title}
                  onChange={handleChange("title")}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C99A3B]/40 focus:border-[#C99A3B]"
                />
              </Field>
              <Field label="Subtitle">
                <input
                  value={form.subtitle}
                  onChange={handleChange("subtitle")}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C99A3B]/40 focus:border-[#C99A3B]"
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                rows={3}
                value={form.description}
                onChange={handleChange("description")}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C99A3B]/40 focus:border-[#C99A3B]"
              />
            </Field>

            <div className="grid grid-cols-2 gap-5">
              <Field label="Button Text">
                <input
                  value={form.buttonText}
                  onChange={handleChange("buttonText")}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C99A3B]/40 focus:border-[#C99A3B]"
                />
              </Field>
              <Field label="Button Link">
                <input
                  value={form.buttonLink}
                  onChange={handleChange("buttonLink")}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 mt-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C99A3B]/40 focus:border-[#C99A3B]"
                />
              </Field>
            </div>

            {/* Active toggle */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium text-[#12141C]">Active Hero</p>
                <p className="text-xs text-gray-400">Show this banner on the live homepage</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.isActive}
                onClick={() => setForm((prev) => ({ ...prev, isActive: !prev.isActive }))}
                className={`relative w-10 h-6 rounded-full transition-colors ${
                  form.isActive ? "bg-[#C99A3B]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    form.isActive ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={saveHero}
            className="bg-[#12141C] text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-60 hover:bg-[#1C1F29]"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? "Saving…" : "Save Hero"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-[#12141C]">{label}</label>
      {children}
    </div>
  );
}