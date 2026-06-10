'use client';

import { useState } from 'react';

export type Filters = {
  categories: string[];
  priceRange: number[];
  colors: string[];
  materials: string[];
  rating: number | null;
};

type FilterProps = {
  onFilterChange?: (filters: Filters) => void;
};

const categories = [
  { name: 'Kanjivaram', count: 124 },
  { name: 'Banarasi', count: 98 },
  { name: 'Silk Sarees', count: 156 },
  { name: 'Cotton Sarees', count: 89 },
  { name: 'Wedding Sarees', count: 76 },
];

const colorOptions = [
  { name: 'Red', hex: '#c41e3a' },
  { name: 'Gold', hex: '#d4af37' },
  { name: 'Green', hex: '#2d5016' },
  { name: 'Blue', hex: '#1e3a5f' },
  { name: 'Pink', hex: '#d4649a' },
  { name: 'Purple', hex: '#6b3fa0' },
  { name: 'Orange', hex: '#d97706' },
  { name: 'White', hex: '#f5f5f5' },
];

const materialOptions = ['Silk', 'Cotton', 'Chiffon', 'Georgette', 'Jacquard'];

const priceRanges = [
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { label: 'Above ₹20,000', min: 20000, max: 50000 },
];

export const Filter = ({ onFilterChange }: FilterProps) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    material: true,
    rating: true,
  });

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [1000, 50000],
    colors: [],
    materials: [],
    rating: null,
  });

  const [localPriceRange, setLocalPriceRange] = useState<number[]>([
    1000, 50000,
  ]);

  const updateFilters = (updated: Filters) => {
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    updateFilters({ ...filters, categories: updated });
  };

  const handleColorChange = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];

    updateFilters({ ...filters, colors: updated });
  };

  const handleMaterialChange = (material: string) => {
    const updated = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];

    updateFilters({ ...filters, materials: updated });
  };

  const handleRatingChange = (rating: number) => {
    const newRating = filters.rating === rating ? null : rating;
    updateFilters({ ...filters, rating: newRating });
  };

  const handlePriceChange = (index: number, value: string) => {
    const newRange = [...localPriceRange];
    newRange[index] = Number(value);
    setLocalPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    updateFilters({ ...filters, priceRange: localPriceRange });
  };

  const resetFilters = () => {
    const reset: Filters = {
      categories: [],
      priceRange: [1000, 50000],
      colors: [],
      materials: [],
      rating: null,
    };

    setFilters(reset);
    setLocalPriceRange([1000, 50000]);
    onFilterChange?.(reset);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.materials.length +
    (filters.rating ? 1 : 0);

  return (
    <div className="rounded-3xl border border-[#eadfce] bg-white p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Filters</h2>

        {activeFilterCount > 0 && (
          <button onClick={resetFilters} className="text-sm text-red-600">
            Reset
          </button>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        {categories.map((c) => (
          <label key={c.name} className="flex gap-2">
            <input
              type="checkbox"
              checked={filters.categories.includes(c.name)}
              onChange={() => handleCategoryChange(c.name)}
            />
            {c.name}
          </label>
        ))}
      </div>

      {/* COLOR */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Colors</h3>
        <div className="flex gap-2 flex-wrap">
          {colorOptions.map((c) => (
            <button
              key={c.name}
              onClick={() => handleColorChange(c.name)}
              style={{ backgroundColor: c.hex }}
              className="w-6 h-6 rounded-full border"
            />
          ))}
        </div>
      </div>

      {/* APPLY BUTTON */}
      <button
        onClick={applyPriceFilter}
        className="w-full mt-6 bg-black text-white py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};