export const productService = {
  async getAll(
    search?: string,
    sort?: string,
    category?: string,
    subcategory?: string,
     type?: string,
  sale?: string,
  featured?: string
    
  ) {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (sort && sort !== "featured") {
      params.set("sort", sort);
    }

    if (category) {
      params.set("category", category);
    }

    if (subcategory) {
      params.set("subcategory", subcategory);
    }

    if (type) {
  params.set("type", type);
}

if (sale) {
  params.set("sale", sale);
}

if (featured) {
  params.set("featured", featured);
}

    const url = `/api/products?${params.toString()}`;


    const res = await fetch(url);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));

      throw new Error(
        error.message || "Failed to fetch products"
      );
    }

    return res.json();
  },

  async getById(id: string) {
    const res = await fetch(`/api/products/${id}`);

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }

      const error = await res.json().catch(() => ({}));

      throw new Error(
        error.message || "Failed to fetch product"
      );
    }

    return res.json();
  },
  async getRelatedProducts(
  productId: string,
  categoryId: string,
  subCategoryId?: string
) {
  const res = await fetch(
    `/api/products/related?productId=${productId}&categoryId=${categoryId}&subCategoryId=${subCategoryId}`
  );

  return res.json();
}
};