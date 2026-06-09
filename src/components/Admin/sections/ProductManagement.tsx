'use client';

import { useEffect, useState } from 'react';

export default function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    categoryId: '',
    subCategoryId: '',
  });

  // ================= LOAD CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.data || []);
    };

    fetchCategories();
  }, []);

  // ================= LOAD SUBCATEGORIES =================
  useEffect(() => {
    if (!formData.categoryId) {
      setSubCategories([]);
      return;
    }

    const fetchSub = async () => {
      const res = await fetch(
        `/api/subcategories?categoryId=${formData.categoryId}`
      );
      const data = await res.json();
      setSubCategories(data.data || []);
    };

    fetchSub();
  }, [formData.categoryId]);

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert('Product created successfully');

    setFormData({
      name: '',
      price: '',
      stock: '',
      categoryId: '',
      subCategoryId: '',
    });
  };

  return (
    <div className="p-6 space-y-4 max-w-md">

      {/* NAME */}
      <input
        className="border p-2 w-full"
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      {/* PRICE */}
      <input
        className="border p-2 w-full"
        placeholder="Price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
      />

      {/* STOCK */}
      <input
        className="border p-2 w-full"
        placeholder="Stock"
        value={formData.stock}
        onChange={(e) =>
          setFormData({ ...formData, stock: e.target.value })
        }
      />

      {/* CATEGORY DROPDOWN */}
      <select
        className="border p-2 w-full"
        value={formData.categoryId}
        onChange={(e) =>
          setFormData({
            ...formData,
            categoryId: e.target.value,
            subCategoryId: '',
          })
        }
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* SUBCATEGORY DROPDOWN */}
      <select
        className="border p-2 w-full"
        value={formData.subCategoryId}
        onChange={(e) =>
          setFormData({
            ...formData,
            subCategoryId: e.target.value,
          })
        }
      >
        <option value="">Select SubCategory</option>
        {subCategories.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        Create Product
      </button>
    </div>
  );
}