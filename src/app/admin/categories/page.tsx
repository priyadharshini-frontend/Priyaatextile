"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  created: string;
  subCategories: any[];
};

export default function CategoriesPage() {
  /* ---------------- STATES ---------------- */

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [openId, setOpenId] = useState<string | null>(null);

  // Add / Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  //   -------------Subcat STATES-----------------
  const [showSubModal, setShowSubModal] = useState(false);

  const [subMode, setSubMode] = useState<"add" | "edit">("add");

  const [subName, setSubName] = useState("");

  const [subError, setSubError] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [selectedSubId, setSelectedSubId] = useState("");
  const [showSubDeleteModal, setShowSubDeleteModal] = useState(false);

  const [deleteSubId, setDeleteSubId] = useState("");

  const [deleteSubName, setDeleteSubName] = useState("");

  // ==========FETCH SUB=================

  const handleSubSubmit = async () => {
    setSubError("");

    if (!subName.trim()) {
      setSubError("Subcategory name is required");
      return;
    }

    try {
      let res;

      if (subMode === "add") {
        res = await fetch("/api/subcategories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subName,
            categoryId: selectedCategoryId,
          }),
        });
      } else {
        res = await fetch(`/api/subcategories/${selectedSubId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subName,
          }),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        setSubError(data.message);
        return;
      }

      await fetchCategories();

      setShowSubModal(false);

      setSubName("");

      setSelectedSubId("");

      setSelectedCategoryId("");
    } catch (error) {
      console.log(error);

      setSubError("Something went wrong");
    }
  };

  /* ---------------- FETCH CATEGORIES ---------------- */

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/categories");

      const data = await res.json();

      setCategories(data.data || []);
    } catch (error) {
      console.log("Fetching Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ADD / UPDATE ---------------- */

  const handleSubmit = async () => {
    setError("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      let res;

      if (modalMode === "add") {
        res = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        });
      } else {
        res = await fetch(`/api/categories/${selectedId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.error);
        return;
      }

      await fetchCategories();

      closeModal();
    } catch (error) {
      console.log("API Error:", error);

      setError("Something went wrong");
    }
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/categories/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error);
        return;
      }

      await fetchCategories();

      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };
  const handleDeleteSubcategory = async () => {
    if (!deleteSubId) return;

    try {
      const res = await fetch(`/api/subcategories/${deleteSubId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete subcategory");
        return;
      }

      // refresh UI
      await fetchCategories();

      // close modal + reset state
      setShowSubDeleteModal(false);
      setDeleteSubId("");
      setDeleteSubName("");
    } catch (error) {
      console.log("Delete Subcategory Error:", error);
      alert("Something went wrong");
    }
  };

  /* ---------------- MODAL HELPERS ---------------- */

  const openAddModal = () => {
    setModalMode("add");

    setName("");

    setError("");

    setSelectedId(null);

    setShowModal(true);
  };

  const openEditModal = (category: Category) => {
    setModalMode("edit");

    setSelectedId(category.id);

    setName(category.name);

    setError("");

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setName("");

    setError("");

    setSelectedId(null);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);

    setShowDeleteModal(true);
  };

  /* ---------------- ACCORDION ---------------- */

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  /* ---------------- INITIAL FETCH ---------------- */

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>

          <p className="text-gray-500">Manage categories & subcategories</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Add Category
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="bg-white rounded shadow p-6 text-center">
          Loading...
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded shadow p-6 text-center text-gray-500">
          No categories found
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          {categories.map((cat) => (
            <div key={cat.id} className="border-b last:border-b-0">
              {/* Category Row */}
              <div
                onClick={() => toggle(cat.id)}
                className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
              >
                {/* Left Side */}
                <div>
                  <h3 className="font-medium">{cat.name}</h3>

                  <p className="text-sm text-gray-500">
                    {cat.subCategories.length} subcategories
                  </p>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      openEditModal(cat);
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      openDeleteModal(cat.id);
                    }}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>

                  <span className="text-gray-500">
                    {openId === cat.id ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {/* Accordion */}
              {openId === cat.id && (
                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setSubMode("add");
                        setSubName("");
                        setSubError("");
                        setSelectedCategoryId(cat.id);
                        setSelectedSubId("");
                        setShowSubModal(true);
                      }}
                      className="m-3 bg-black text-white px-3 py-2 rounded text-sm hover:bg-gray-800"
                    >
                      + Add Subcategory
                    </button>
                  </div>

                  {cat.subCategories.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No subcategories found
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {cat.subCategories.map((sub: any) => (
                        <div
                          key={sub.id}
                          className="flex justify-between items-center border rounded px-3 py-2 bg-white"
                        >
                          <span>{sub.name}</span>

                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                setSubMode("edit");

                                setSubName(sub.name);

                                setSelectedSubId(sub.id);

                                setSelectedCategoryId(cat.id);

                                setSubError("");

                                setShowSubModal(true);
                              }}
                              className="text-blue-600 text-sm hover:underline"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => {
                                setDeleteSubId(sub.id);

                                setDeleteSubName(sub.name);

                                setShowSubDeleteModal(true);
                              }}
                              className="text-red-600 text-sm hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
            <h2 className="text-xl font-semibold mb-4">
              {modalMode === "add" ? "Add Category" : "Edit Category"}
            </h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Category Name</label>

              <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
              >
                {modalMode === "add" ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 mx-4">
            <h2 className="text-lg font-semibold mb-3">Delete Category</h2>

            <p className="text-gray-600">
              Are you sure you want to delete this category?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
            <h2 className="text-xl font-semibold mb-4">Add Subcategory</h2>

            <input
              type="text"
              placeholder="Subcategory name"
              value={subName}
              onChange={(e) => {
                setSubName(e.target.value);

                if (subError) {
                  setSubError("");
                }
              }}
              className="w-full border rounded px-3 py-2"
            />

            {subError && (
              <p className="text-red-500 text-sm mt-2">{subError}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowSubModal(false);
                  setSubName("");
                  setSubError("");
                }}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubSubmit}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 mx-4">
            <h2 className="text-lg font-semibold mb-3">Delete Subcategory</h2>

            <p className="text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold"> "{deleteSubName}"</span>?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowSubDeleteModal(false);

                  setDeleteSubId("");

                  setDeleteSubName("");
                }}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteSubcategory}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
