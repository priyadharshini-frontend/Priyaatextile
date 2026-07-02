"use client";

import { useState, ChangeEvent } from "react";
import { X, UploadCloud } from "lucide-react";
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

export default function BannerModal({
  open,
  onClose,
}: BannerModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<HeroForm>({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    desktopImage: null,
    mobileImage: null,
    isActive: true,
  });

  const [desktopPreview, setDesktopPreview] = useState("");
  const [mobilePreview, setMobilePreview] = useState("");

  if (!open) return null;

  const handleDesktop = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setForm({
      ...form,
      desktopImage: file,
    });

    setDesktopPreview(URL.createObjectURL(file));
  };

  const handleMobile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setForm({
      ...form,
      mobileImage: file,
    });

    setMobilePreview(URL.createObjectURL(file));
  };

 async function saveHero() {
  try {
    setLoading(true);

    if (!form.desktopImage) {
      alert("Please select a desktop banner.");
      return;
    }

    const desktopImageUrl = await uploadImage(form.desktopImage);

    let mobileImageUrl = "";

    if (form.mobileImage) {
      mobileImageUrl = await uploadImage(form.mobileImage);
    }

    const response = await fetch("/api/admin/banner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

    alert("Hero created successfully");

    onClose();

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3">

<div className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-xl flex flex-col">
        {/* Header */}

        <div className="border-b flex justify-between items-center p-4">

          <div>

            <h2 className="text-2xl font-bold ">
              Hero Section
            </h2>

            <p className="text-gray-500 mt-1">
              Update homepage hero banner
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X />
          </button>

        </div>

<div className="flex-1 overflow-y-auto p-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start">
          {/* LEFT */}

          <div className="space-y-6 flex gap-5 justify-center ">

            {/* Desktop */}


            <div>

              <label className="font-semibold">
                Desktop Banner
              </label>

              <label className="mt-3 border-2 border-dashed rounded-xl h-40 w-40 flex flex-col justify-center items-center cursor-pointer overflow-hidden">

                {desktopPreview ? (
                  <img
                    src={desktopPreview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <UploadCloud size={45} />
                    <p className="mt-3 text-gray-500">
                      Upload Desktop Image
                    </p>
                  </>
                )}

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleDesktop}
                />

              </label>

            </div>

            {/* Mobile */}

            <div>

              <label className="font-semibold">
                Mobile Banner
              </label>

              <label className="mt-3 border-2 border-dashed rounded-xl h-40 w-40 flex flex-col justify-center items-center cursor-pointer overflow-hidden">

                {mobilePreview ? (
                  <img
                    src={mobilePreview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <UploadCloud size={40} />
                    <p className="mt-3 text-gray-500">
                      Upload Mobile Image
                    </p>
                  </>
                )}

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleMobile}
                />

              </label>

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-5">
            <div className="flex gap-2">
                 <div>

              <label>Title</label>

              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-1 mt-2"
              />

            </div>

            <div>

              <label>Subtitle</label>

              <input
                value={form.subtitle}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subtitle: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 p-1 mt-2"
              />

            </div>

            </div>

           

            <div>

              <label>Description</label>

              <textarea
                rows={2}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 mt-2"
              />

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div>

                <label>Button Text</label>

                <input
                  value={form.buttonText}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      buttonText: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-1 mt-2"
                />

              </div>

              <div>

                <label>Button Link</label>

                <input
                  value={form.buttonLink}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      buttonLink: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-1 mt-2"
                />

              </div>

            </div>

            <label className="flex gap-3 items-center">

              <input
                checked={form.isActive}
                type="checkbox"
                onChange={(e) =>
                  setForm({
                    ...form,
                    isActive: e.target.checked,
                  })
                }
              />

              Active Hero

            </label>

          </div>

        </div>
        </div>

        {/* Footer */}

        <div className="p-5 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="border px-4 py-1 rounded-xl"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={saveHero}
            className="bg-[#7A1F3D] text-white px-4 py-1 rounded-xl"
          >
            {loading ? "Saving..." : "Save Hero"}
          </button>

        </div>

      </div>

    </div>
  );
}