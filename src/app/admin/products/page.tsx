"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { spawn } from "child_process";

export default function ProductsPage() {
  // =============states===========

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    categoryId: "",
    stock: "",
    subCategoryId: "",
    description: "",
    images: [] as string[],
    isFeatured: false,
    isBestSeller: false,
  });

  const fetchproduct = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    console.log(data);
    setProducts(data.data || []);
  };

  const fetchcategory = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    console.log(data);
    setCategories(data.data || []);
  };
  useEffect(() => {
    fetchproduct();
    fetchcategory();
  }, []);

  const handleAddProduct = async () => {
    try {
      if (modalMode === "add") {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to Create Product");
          return;
        }
      } else {
        // EDIT PRODUCT (PUT API)
        const res = await fetch(`/api/products/${selectedId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to Update Product");
          return;
        }
      }

      // refresh list
      fetchproduct();

      // reset form
      setProduct({
        name: "",
        price: "",
        discount: "",
        categoryId: "",
        subCategoryId: "",
        description: "",
        stock: "",
        images: [],
      });

      setShowModal(false);
      setSelectedId(null);
    } catch (error) {
      console.log("CREATE/UPDATE ERROR:", error);
    }
  };

  const openEditModal = (p: any) => {
    setModalMode("edit");
    setSelectedId(p.id);

    setProduct({
      name: p.name,
      price: p.price,
      discount: p.discount,
      stock: p.stock,
      categoryId: p.categoryId,
      subCategoryId: p.subCategoryId,
      description: p.description,
      images: p.images || [],
      isFeatured: p.isFeautured,
      isBestSeller: p.isBestSeller,
    });

    setShowModal(true);
  };
  const openDeleteModal = async (pr: any) => {
    try {
      const confirmDelete = confirm(
        "Are you sure you want to delete this product?",
      );
      if (!confirmDelete) return;

      const res = await fetch(`/api/products/${pr.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      // remove from UI instantly OR refetch
      setProducts((prev) => prev.filter((p) => p.id !== pr.id));
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };
  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-500">Manage your products</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : (
                products.map((p: any) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    {/* Product Image */}
                    <td className="p-4">
                      <div>
                        <img
                          src={
                            p.images?.length > 0
                              ? p.images[0]
                              : "https://placehold.co/60x60"
                          }
                          alt={p.name}
                          className="w-14 h-14 rounded object-cover border"
                        />
                        {p.isBestSeller && (
                          <span className="inline-block rounded-full bg-orange-400 px-2 py-1 text-xs font-semibold text-white">
                            Best Seller
                          </span>
                        )}
                        {p.isFeatured && (
                          <span className="inline-block rounded-full bg-blue-400 px-2 py-1 text-xs font-semibold text-white">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Product Name */}
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{p.name}</p>

                        <p className="text-sm text-gray-500 line-clamp-1">
                          {p.description}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <div>
                        <p>{p.category?.name || "-"}</p>

                        <p className="text-xs text-gray-500">
                          {p.subCategory?.name || "-"}
                        </p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <div>
                        <p className="font-medium">₹{p.price}</p>

                        {p.discount > 0 && (
                          <p className="text-sm text-green-600">
                            Discount: ₹{p.discount}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          p.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.stock > 0 ? `${p.stock} Available` : "Out of Stock"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => openDeleteModal(p)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 mx-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add Product</h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                className="border rounded px-3 py-2"
                onChange={(e) => {
                  setProduct({ ...product, name: e.target.value });
                }}
              />

              <input
                type="number"
                placeholder="Price"
                className="border rounded px-3 py-2"
                value={product.price}
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
              />

              <input
                type="number"
                placeholder="Discount"
                value={product.discount}
                className="border rounded px-3 py-2"
                onChange={(e) => {
                  setProduct({ ...product, discount: e.target.value });
                }}
              />

              <input
                type="number"
                placeholder="Stock"
                className="border rounded px-3 py-2"
                value={product.stock}
                onChange={(e) => {
                  setProduct({ ...product, stock: e.target.value });
                }}
              />

              <select
                className="border rounded px-3 py-2"
                value={product.categoryId}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    categoryId: e.target.value,
                    subCategoryId: "",
                  });
                }}
              >
                <option>Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {" "}
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                className="border rounded px-3 py-2"
                value={product.subCategoryId}
                onChange={(e) =>
                  setProduct({ ...product, subCategoryId: e.target.value })
                }
                disabled={!product.categoryId}
              >
                <option>Select Subcategory</option>
                {categories
                  .find((c) => c.id === product.categoryId)
                  ?.subCategories?.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Description */}
            <textarea
              placeholder="Description"
              rows={4}
              className="w-full border rounded px-3 py-2 mt-4"
              value={product.description}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
            />
            <div className="m-4 flex gap-6">
              <label>
                <input
                  type="checkbox"
                  checked={product.isFeatured}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      isFeatured: e.target.checked,
                    })
                  }
                />
                Featured
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={product.isBestSeller}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      isBestSeller: e.target.checked,
                    })
                  }
                />
                BestSeller
              </label>
            </div>

            {/* Images */}
            <CldUploadWidget
              uploadPreset="ecommerce_upload"
              options={{
                sources: ["local", "url", "camera"],
              }}
              onSuccess={(result: any) => {
                console.log("UPLOAD RESULT:", result);

                const url = result?.info?.secure_url;

                if (!url) {
                  console.log("No URL found");
                  return;
                }

                setProduct((prev) => ({
                  ...prev,
                  images: [...prev.images, url],
                }));
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => open()}
                  className="bg-black text-white px-4 py-2"
                >
                  Upload Image
                </button>
              )}
            </CldUploadWidget>

            <div className="flex gap-2 mt-3 flex-wrap">
              {product.images.length > 0 ? (
                product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400">No images uploaded</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded bg-black text-white"
                onClick={handleAddProduct}
              >
                {modalMode === "add" ? " Add Product" : "Update Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
