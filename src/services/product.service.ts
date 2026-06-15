export const productService = {
  async getAll( search?:string,sort?:string) {

    const params = new URLSearchParams();

if (search) {
  params.set("search", search);
}

if (sort) {
  params.set("sort", sort);
}
    const url=`/api/products?${params.toString()}`;
    console.log("SERVICE URL:", url);

    const res = await fetch(url);
 
     if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Failed to fetch products");
    }

    return res.json();
    console.log(res)
  },

//   async create(data: any) {
//     const res = await fetch("/api/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     return res.json();
//   },

//   async update(id: string, data: any) {
//     const res = await fetch(`/api/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     return res.json();
//   },

//   async remove(id: string) {
//     const res = await fetch(`/api/products/${id}`, {
//       method: "DELETE" 
//     });
//     return res.json();
//   },
};