"use client";

import { useEffect, useState } from "react";
import ReelModal from "@/components/Admin/ReelModal";

interface Reel {
  id: string;
  thumbnail: string;
  caption: string;
  instagramUrl: string;
  isActive: boolean;
}

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [open, setOpen] = useState(false);

  async function fetchReels() {
    try {
      const res = await fetch("/api/admin/reels");
      const data = await res.json();

      if (data.success) {
        setReels(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteReel(id: string) {
    const ok = confirm("Delete this reel?");

    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/reels/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchReels();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchReels();
  }, []);

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Instagram Reels
          </h1>

          <p className="text-gray-500 mt-1">
            Manage homepage reels
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#7A1F3D] hover:bg-[#5d1730] text-white px-5 py-3 rounded-xl"
        >
          + Add Reel
        </button>

      </div>

      {/* Empty */}

      {reels.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <p className="text-gray-500">
            No reels found.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {reels.map((reel) => (

            <div
              key={reel.id}
              className="bg-white rounded-2xl shadow border overflow-hidden"
            >

              {/* Thumbnail */}

              <img
                src={reel.thumbnail}
                className="w-full h-64 object-cover"
              />

              {/* Content */}

              <div className="p-4">

                <div className="flex justify-between items-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      reel.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {reel.isActive ? "Active" : "Inactive"}
                  </span>

                </div>

                <p className="mt-4 font-medium line-clamp-2">
                  {reel.caption}
                </p>

                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  className="text-blue-600 text-sm mt-3 block truncate"
                >
                  View Instagram Reel
                </a>

                {/* Buttons */}

                <div className="grid grid-cols-2 gap-3 mt-5">

                 

                  <button
                    onClick={() => deleteReel(reel.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Modal */}

      <ReelModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchReels}
      />

    </div>
  );
}