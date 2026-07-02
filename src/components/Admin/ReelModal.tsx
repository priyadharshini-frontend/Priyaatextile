"use client";

import { useState, ChangeEvent } from "react";
import { X, UploadCloud } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";

interface ReelModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReelModal({
  open,
  onClose,
  onSuccess,
}: ReelModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    caption: "",
    instagramUrl: "",
    thumbnail: null as File | null,
    isActive: true,
  });

  const [preview, setPreview] = useState("");

  if (!open) return null;

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setForm({
      ...form,
      thumbnail: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  async function saveReel() {
    try {
      setLoading(true);

      if (!form.thumbnail) {
        alert("Please upload a thumbnail.");
        return;
      }

      const thumbnailUrl = await uploadImage(form.thumbnail);

      const res = await fetch("/api/admin/reels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption: form.caption,
          instagramUrl: form.instagramUrl,
          thumbnail: thumbnailUrl,
          isActive: form.isActive,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      alert("Reel added successfully");

      onSuccess();

      onClose();

      setForm({
        caption: "",
        instagramUrl: "",
        thumbnail: null,
        isActive: true,
      });

      setPreview("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">

          <div>
            <h2 className="text-2xl font-bold">
              Add Instagram Reel
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Upload reel thumbnail & Instagram link
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Upload */}

            <div>

              <label className="font-semibold">
                Reel Thumbnail
              </label>

              <label className="mt-3 border-2 border-dashed rounded-xl h-72 flex flex-col justify-center items-center cursor-pointer overflow-hidden">

                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <UploadCloud size={45} />

                    <p className="mt-3 text-gray-500">
                      Upload Thumbnail
                    </p>
                  </>
                )}

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

              </label>

            </div>

            {/* Form */}

            <div className="space-y-5">

              <div>

                <label className="font-medium">
                  Caption
                </label>

                <textarea
                  rows={4}
                  value={form.caption}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      caption: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-2"
                />

              </div>

              <div>

                <label className="font-medium">
                  Instagram Reel URL
                </label>

                <input
                  type="text"
                  value={form.instagramUrl}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      instagramUrl: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-2"
                  placeholder="https://www.instagram.com/reel/..."
                />

              </div>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive: e.target.checked,
                    })
                  }
                />

                Active Reel

              </label>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-5 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="border px-6 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={saveReel}
            disabled={loading}
            className="bg-[#7A1F3D] text-white px-6 py-2 rounded-xl"
          >
            {loading ? "Saving..." : "Save Reel"}
          </button>

        </div>

      </div>

    </div>
  );
}