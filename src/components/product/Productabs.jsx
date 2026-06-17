"use client";

import { useState } from "react";

interface ProductDetails {
  brand?: string | null;
  categoryName: string;
  subCategoryName?: string | null;
  sizes: string[];
  sku: string;
}

interface ProductTabsProps {
  description: string;
  details: ProductDetails;
  reviewsAvailable?: boolean; // false until Review model is added
}

const TABS = ["Description", "Details", "Reviews"] as const;
type Tab = (typeof TABS)[number];

export default function ProductTabs({
  description,
  details,
  reviewsAvailable = false,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  return (
    <div className="mt-8">
      {/* Tab headers */}
      <div className="flex gap-6 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`-mb-px border-b-2 pb-2.5 text-sm transition ${
              activeTab === tab
                ? "border-[#8B1538] font-medium text-[#8B1538]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4 text-sm leading-relaxed text-gray-600">
        {activeTab === "Description" && <p>{description}</p>}

        {activeTab === "Details" && (
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {details.brand && (
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <dt className="text-gray-500">Brand</dt>
                <dd className="font-medium text-gray-800">{details.brand}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <dt className="text-gray-500">Category</dt>
              <dd className="font-medium text-gray-800">{details.categoryName}</dd>
            </div>
            {details.subCategoryName && (
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <dt className="text-gray-500">Sub-category</dt>
                <dd className="font-medium text-gray-800">{details.subCategoryName}</dd>
              </div>
            )}
            {details.sizes.length > 0 && (
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <dt className="text-gray-500">Available sizes</dt>
                <dd className="font-medium text-gray-800">{details.sizes.join(", ")}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <dt className="text-gray-500">SKU</dt>
              <dd className="font-medium text-gray-800">{details.sku}</dd>
            </div>
          </dl>
        )}

        {activeTab === "Reviews" && (
          <div>
            {reviewsAvailable ? (
              <p>Reviews will render here.</p>
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}