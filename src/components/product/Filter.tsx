'use client';

import { useState } from 'react';

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

export const Filter = ({ onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    material: true,
    rating: true,
  });

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [1000, 50000],
    colors: [],
    materials: [],
    rating: null,
  });

  const [localPriceRange, setLocalPriceRange] = useState([1000, 50000]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    const newFilters = { ...filters, categories: updated };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleColorChange = (color) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];

    const newFilters = { ...filters, colors: updated };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleMaterialChange = (material) => {
    const updated = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];

    const newFilters = { ...filters, materials: updated };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newRating = filters.rating === rating ? null : rating;
    const newFilters = { ...filters, rating: newRating };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = parseInt(value);
    setLocalPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    const newFilters = { ...filters, priceRange: localPriceRange };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [1000, 50000],
      colors: [],
      materials: [],
      rating: null,
    });
    setLocalPriceRange([1000, 50000]);
    onFilterChange?.({
      categories: [],
      priceRange: [1000, 50000],
      colors: [],
      materials: [],
      rating: null,
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.materials.length +
    (filters.rating ? 1 : 0);

  return (
    <div className="rounded-3xl border border-[#eadfce] bg-white p-6 lg:p-8 h-fit sticky top-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header with count */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1a0f1a]">Filters</h2>
          {activeFilterCount > 0 && (
            <p className="text-xs font-semibold text-[#8b1e1e] mt-1">
              {activeFilterCount} active
            </p>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#ffe8e8',
              color: '#8b1e1e',
              border: '1px solid #ffcccc',
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#eadfce] mb-6"></div>

      {/* Categories Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h3 className="text-lg font-semibold text-[#1a0f1a]">Categories</h3>
          <span
            className="text-lg transition-transform duration-300"
            style={{
              transform: expandedSections.categories ? 'rotate(180deg)' : 'rotate(0deg)',
              color: '#8b1e1e',
            }}
          >
            ▼
          </span>
        </button>

        <div
          className={`space-y-3 overflow-hidden transition-all duration-300`}
          style={{
            maxHeight: expandedSections.categories ? '400px' : '0px',
            opacity: expandedSections.categories ? 1 : 0,
          }}
        >
          {categories.map((category) => (
            <label
              key={category.name}
              className="flex items-center gap-3 text-gray-700 cursor-pointer group/item hover:text-[#8b1e1e] transition-colors duration-300"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
                className="h-5 w-5 rounded transition-all duration-300 cursor-pointer"
                style={{
                  accentColor: '#8b1e1e',
                  borderColor: '#eadfce',
                }}
              />
              <span className="text-sm font-medium flex-1">{category.name}</span>
              <span className="text-xs text-gray-500 group-hover/item:text-[#8b1e1e] transition-colors">
                ({category.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-[#eadfce] my-6"></div>

      {/* Price Range Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-semibold text-[#1a0f1a]">Price Range</h3>
          <span
            className="text-lg transition-transform duration-300"
            style={{
              transform: expandedSections.price ? 'rotate(180deg)' : 'rotate(0deg)',
              color: '#8b1e1e',
            }}
          >
            ▼
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300`}
          style={{
            maxHeight: expandedSections.price ? '300px' : '0px',
            opacity: expandedSections.price ? 1 : 0,
          }}
        >
          <div className="space-y-3">
            {/* Quick Price Ranges */}
            <div className="space-y-2 mb-4">
              {priceRanges.map((range) => (
                <label
                  key={range.label}
                  className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-[#8b1e1e] transition-colors"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={
                      localPriceRange[0] === range.min && localPriceRange[1] === range.max
                    }
                    onChange={() => {
                      setLocalPriceRange([range.min, range.max]);
                    }}
                    className="h-4 w-4"
                    style={{ accentColor: '#8b1e1e' }}
                  />
                  <span className="text-sm font-medium flex-1">{range.label}</span>
                </label>
              ))}
            </div>

            <div className="border-t border-[#eadfce] pt-4">
              <label className="text-xs font-semibold text-gray-700 block mb-3">
                Custom Range
              </label>
              {/* Price Inputs */}
              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-gray-600">₹</span>
                  <input
                    type="number"
                    min="1000"
                    max="50000"
                    value={localPriceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#eadfce] rounded-lg text-sm focus:outline-none focus:border-[#8b1e1e] transition-colors"
                    placeholder="Min"
                  />
                  <span className="text-gray-500 text-sm">to</span>
                  <span className="text-xs text-gray-600">₹</span>
                  <input
                    type="number"
                    min="1000"
                    max="50000"
                    value={localPriceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#eadfce] rounded-lg text-sm focus:outline-none focus:border-[#8b1e1e] transition-colors"
                    placeholder="Max"
                  />
                </div>

                {/* Visual Range Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    value={localPriceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: '#eadfce',
                      accentColor: '#8b1e1e',
                    }}
                  />
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    value={localPriceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: '#eadfce',
                      accentColor: '#8b1e1e',
                    }}
                  />
                </div>

                <button
                  onClick={applyPriceFilter}
                  className="w-full mt-3 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#8b1e1e',
                    color: '#fff',
                  }}
                >
                  Apply Price
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#eadfce] my-6"></div>

      {/* Colors Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('colors')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-semibold text-[#1a0f1a]">Colors</h3>
          <span
            className="text-lg transition-transform duration-300"
            style={{
              transform: expandedSections.colors ? 'rotate(180deg)' : 'rotate(0deg)',
              color: '#8b1e1e',
            }}
          >
            ▼
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300`}
          style={{
            maxHeight: expandedSections.colors ? '400px' : '0px',
            opacity: expandedSections.colors ? 1 : 0,
          }}
        >
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color.name)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                  filters.colors.includes(color.name)
                    ? 'ring-2 ring-[#8b1e1e] scale-105'
                    : 'hover:scale-110'
                }`}
                title={color.name}
                style={{
                  border:
                    color.name === 'White' ? '2px solid #eadfce' : 'none',
                  backgroundColor: filters.colors.includes(color.name)
                    ? 'rgba(139, 30, 30, 0.05)'
                    : 'transparent',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: color.hex,
                    border: color.name === 'White' ? '1px solid #ddd' : 'none',
                    boxShadow: filters.colors.includes(color.name)
                      ? `0 0 10px ${color.hex}aa`
                      : 'none',
                  }}
                ></div>
                <span className="text-xs font-medium text-gray-700">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-[#eadfce] my-6"></div>

      {/* Material Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('material')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-semibold text-[#1a0f1a]">Material</h3>
          <span
            className="text-lg transition-transform duration-300"
            style={{
              transform: expandedSections.material ? 'rotate(180deg)' : 'rotate(0deg)',
              color: '#8b1e1e',
            }}
          >
            ▼
          </span>
        </button>

        <div
          className={`space-y-3 overflow-hidden transition-all duration-300`}
          style={{
            maxHeight: expandedSections.material ? '300px' : '0px',
            opacity: expandedSections.material ? 1 : 0,
          }}
        >
          {materialOptions.map((material) => (
            <button
              key={material}
              onClick={() => handleMaterialChange(material)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-left ${
                filters.materials.includes(material)
                  ? 'text-white'
                  : 'text-gray-700 border border-[#eadfce] hover:border-[#8b1e1e]'
              }`}
              style={{
                backgroundColor: filters.materials.includes(material)
                  ? '#8b1e1e'
                  : 'transparent',
              }}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-[#eadfce] my-6"></div>

      {/* Rating Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-semibold text-[#1a0f1a]">Rating</h3>
          <span
            className="text-lg transition-transform duration-300"
            style={{
              transform: expandedSections.rating ? 'rotate(180deg)' : 'rotate(0deg)',
              color: '#8b1e1e',
            }}
          >
            ▼
          </span>
        </button>

        <div
          className={`space-y-3 overflow-hidden transition-all duration-300`}
          style={{
            maxHeight: expandedSections.rating ? '300px' : '0px',
            opacity: expandedSections.rating ? 1 : 0,
          }}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center gap-2 ${
                filters.rating === star
                  ? 'bg-[#8b1e1e] text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {'★'.repeat(star)}
              {'☆'.repeat(5 - star)}
              <span className="text-xs text-gray-500 ml-auto">
                {star}+
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={() => {
          /* Trigger filter application */
        }}
        className="w-full mt-8 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: '#8b1e1e',
          boxShadow: '0 8px 20px rgba(139, 30, 30, 0.3)',
        }}
      >
        Apply All Filters
      </button>
    </div>
  );
};
