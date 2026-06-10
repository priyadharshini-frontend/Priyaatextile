// "use client";
// import { useState } from "react";
// type IconProps = {
//   d:any;
//   size?: number;
//   className?: string;
// };
// const Icon = ({d, size = 20, className = "" }:IconProps) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d={d} />
//   </svg>
// );

// const icons = {
//   dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
//   products: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
//   orders: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2",
//   customers: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
//   revenue: "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
//   package: "M16.5 9.4l-9-5.18 M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
//   eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
//   edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
//   trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
//   plus: "M12 5v14 M5 12h14",
//   search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
//   bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
//   menu: "M3 12h18 M3 6h18 M3 18h18",
//   star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
//   filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
//   chart: "M18 20V10 M12 20V4 M6 20v-6",
// };

// const PRODUCTS = [
//   { id: "P001", name: "Royal Velvet Jacket", category: "Apparel", price: 289, stock: 45, status: "Active", rating: 4.8, sales: 312 },
//   { id: "P002", name: "Obsidian Watch", category: "Accessories", price: 1240, stock: 12, status: "Active", rating: 4.9, sales: 89 },
//   { id: "P003", name: "Gilded Frame Glasses", category: "Accessories", price: 425, stock: 0, status: "Out of Stock", rating: 4.7, sales: 156 },
//   { id: "P004", name: "Crimson Silk Blouse", category: "Apparel", price: 185, stock: 78, status: "Active", rating: 4.6, sales: 420 },
//   { id: "P005", name: "Mahogany Desk Set", category: "Office", price: 650, stock: 8, status: "Low Stock", rating: 4.8, sales: 67 },
//   { id: "P006", name: "Ember Leather Bag", category: "Accessories", price: 390, stock: 34, status: "Active", rating: 4.5, sales: 198 },
// ];

// const ORDERS = [
//   { id: "#ORD-7821", customer: "Alexandra Voss", product: "Royal Velvet Jacket", amount: 289, date: "Jun 07, 2026", status: "Delivered" },
//   { id: "#ORD-7820", customer: "Marcus Ellery", product: "Obsidian Watch", amount: 1240, date: "Jun 07, 2026", status: "Processing" },
//   { id: "#ORD-7819", customer: "Sofia Reinhart", product: "Ember Leather Bag", amount: 390, date: "Jun 06, 2026", status: "Shipped" },
//   { id: "#ORD-7818", customer: "Thomas Beckford", product: "Crimson Silk Blouse", amount: 185, date: "Jun 06, 2026", status: "Delivered" },
//   { id: "#ORD-7817", customer: "Naomi Chen", product: "Gilded Frame Glasses", amount: 425, date: "Jun 05, 2026", status: "Cancelled" },
//   { id: "#ORD-7816", customer: "Victor Harlow", product: "Mahogany Desk Set", amount: 650, date: "Jun 05, 2026", status: "Processing" },
//   { id: "#ORD-7815", customer: "Isabelle Fontaine", product: "Royal Velvet Jacket", amount: 289, date: "Jun 04, 2026", status: "Shipped" },
// ];

// const CUSTOMERS = [
//   { id: "C001", name: "Alexandra Voss", email: "a.voss@email.com", orders: 14, spent: 4820, status: "VIP", joined: "Jan 2024", avatar: "AV" },
//   { id: "C002", name: "Marcus Ellery", email: "m.ellery@email.com", orders: 8, spent: 6540, status: "VIP", joined: "Mar 2024", avatar: "ME" },
//   { id: "C003", name: "Sofia Reinhart", email: "s.reinhart@email.com", orders: 5, spent: 1890, status: "Active", joined: "May 2024", avatar: "SR" },
//   { id: "C004", name: "Thomas Beckford", email: "t.beckford@email.com", orders: 3, spent: 720, status: "Active", joined: "Jun 2024", avatar: "TB" },
//   { id: "C005", name: "Naomi Chen", email: "n.chen@email.com", orders: 11, spent: 3460, status: "VIP", joined: "Feb 2024", avatar: "NC" },
//   { id: "C006", name: "Victor Harlow", email: "v.harlow@email.com", orders: 2, spent: 650, status: "New", joined: "Jun 2026", avatar: "VH" },
//   { id: "C007", name: "Isabelle Fontaine", email: "i.fontaine@email.com", orders: 7, spent: 2310, status: "Active", joined: "Apr 2024", avatar: "IF" },
// ];

// const STATS = [
//   { label: "Total Revenue", value: "$128,450", change: "+12.4%", up: true, icon: "revenue" },
//   { label: "Total Orders", value: "2,841", change: "+8.7%", up: true, icon: "orders" },
//   { label: "Active Products", value: "364", change: "-2.1%", up: false, icon: "products" },
//   { label: "Customers", value: "12,684", change: "+15.3%", up: true, icon: "customers" },
// ];

// const CHART_BARS = [65, 82, 55, 90, 74, 95, 68, 88, 72, 91, 85, 100];
// const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// type BadgeProps = {
//   status: string;
// };
// const Badge = ({ status }:BadgeProps) => {
//   const map = {
//     Active: "bg-emerald-900/40 text-emerald-400 border border-emerald-800",
//     "Out of Stock": "bg-red-900/40 text-red-400 border border-red-800",
//     "Low Stock": "bg-amber-900/40 text-amber-400 border border-amber-800",
//     Delivered: "bg-emerald-900/40 text-emerald-400 border border-emerald-800",
//     Processing: "bg-blue-900/40 text-blue-400 border border-blue-800",
//     Shipped: "bg-purple-900/40 text-purple-400 border border-purple-800",
//     Cancelled: "bg-red-900/40 text-red-400 border border-red-800",
//     VIP: "bg-yellow-900/40 text-yellow-400 border border-yellow-800",
//     New: "bg-blue-900/40 text-blue-400 border border-blue-800",
//   };
//   type BadgeProps = {
//   status: string;
// }
//   return (
//     <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${map[status] || "bg-gray-800 text-gray-400"}`}>
//       {status}
//     </span>
//   );
// };

// const navItems = [
//   { key: "dashboard", label: "Dashboard", icon: "dashboard" },
//   { key: "products", label: "Products", icon: "products" },
//   { key: "orders", label: "Orders", icon: "orders" },
//   { key: "customers", label: "Customers", icon: "customers" },
// ];

// function Sidebar({ active, setActive, collapsed, setCollapsed }) {
//   return (
//     <aside className="flex flex-col transition-all duration-300 relative z-10"
//       style={{ width: collapsed ? 72 : 240, background: "linear-gradient(180deg, #0f0404 0%, #1a0808 60%, #200a0a 100%)", borderRight: "1px solid rgba(212,175,55,0.15)", minHeight: "100vh" }}>
//       <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
//         <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
//           style={{ background: "linear-gradient(135deg, #d4af37 0%, #b8960c 100%)" }}>
//           <span className="text-sm font-black" style={{ color: "#1a0808" }}>A</span>
//         </div>
//         {!collapsed && (
//           <div>
//             <div className="font-bold text-sm tracking-widest" style={{ color: "#d4af37", fontFamily: "Georgia, serif" }}>AURUM</div>
//             <div className="text-xs tracking-wider" style={{ color: "rgba(212,175,55,0.5)" }}>ADMIN</div>
//           </div>
//         )}
//       </div>
//       <nav className="flex-1 py-6 px-2 space-y-1">
//         {navItems.map(item => (
//           <button key={item.key} onClick={() => setActive(item.key)}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group"
//             style={{ background: active === item.key ? "linear-gradient(90deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 100%)" : "transparent", borderLeft: active === item.key ? "2px solid #d4af37" : "2px solid transparent" }}>
//             <span style={{ color: active === item.key ? "#d4af37" : "rgba(212,175,55,0.45)" }} className="flex-shrink-0 transition-colors">
//               <Icon d={icons[item.icon]} size={18} />
//             </span>
//             {!collapsed && (
//               <span className="text-sm font-medium tracking-wide" style={{ color: active === item.key ? "#d4af37" : "rgba(255,255,255,0.55)", fontFamily: "Georgia, serif" }}>
//                 {item.label}
//               </span>
//             )}
//           </button>
//         ))}
//       </nav>
//       <button onClick={() => setCollapsed(!collapsed)}
//         className="m-4 p-2 rounded-lg flex items-center justify-center"
//         style={{ background: "rgba(212,175,55,0.08)", color: "rgba(212,175,55,0.6)" }}>
//         <Icon d={icons.menu} size={16} />
//       </button>
//     </aside>
//   );
// }

// function DashboardView() {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-4 gap-4">
//         {STATS.map((s, i) => (
//           <div key={i} className="rounded-xl p-5 relative overflow-hidden"
//             style={{ background: "linear-gradient(135deg, #1e0b0b 0%, #160606 100%)", border: "1px solid rgba(212,175,55,0.12)" }}>
//             <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5" style={{ background: "#d4af37", transform: "translate(30%,-30%)" }} />
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,175,55,0.12)" }}>
//                 <Icon d={icons[s.icon]} size={18} className="text-yellow-500" />
//               </div>
//               <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.up ? "bg-emerald-900/40 text-emerald-400" : "bg-red-900/40 text-red-400"}`}>{s.change}</span>
//             </div>
//             <div className="text-2xl font-bold mb-1" style={{ color: "#fff", fontFamily: "Georgia, serif" }}>{s.value}</div>
//             <div className="text-xs" style={{ color: "rgba(212,175,55,0.5)" }}>{s.label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
//         <div className="rounded-xl p-6" style={{ background: "linear-gradient(135deg, #1e0b0b 0%, #160606 100%)", border: "1px solid rgba(212,175,55,0.12)" }}>
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="font-bold text-base" style={{ color: "#d4af37", fontFamily: "Georgia, serif" }}>Revenue Overview</h3>
//               <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Monthly performance 2026</p>
//             </div>
//           </div>
//           <div className="flex items-end gap-2 h-36">
//             {CHART_BARS.map((h, i) => (
//               <div key={i} className="flex-1 flex flex-col items-center gap-1">
//                 <div className="w-full rounded-t-sm group relative" style={{ height: `${h}%`, background: i === 5 ? "linear-gradient(180deg, #d4af37 0%, #b8960c 100%)" : "rgba(212,175,55,0.18)" }} />
//                 <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>{MONTHS[i]}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="rounded-xl p-6" style={{ background: "linear-gradient(135deg, #1e0b0b 0%, #160606 100%)", border: "1px solid rgba(212,175,55,0.12)" }}>
//           <h3 className="font-bold text-base mb-4" style={{ color: "#d4af37", fontFamily: "Georgia, serif" }}>Top Selling</h3>
//           <div className="space-y-3">
//             {PRODUCTS.slice(0, 4).map((p, i) => (
//               <div key={i} className="flex items-center gap-3">
//                 <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
//                   style={{ background: i === 0 ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.05)", color: i === 0 ? "#d4af37" : "rgba(255,255,255,0.35)" }}>{i + 1}</span>
//                 <div className="flex-1 min-w-0">
//                   <div className="text-xs font-medium truncate" style={{ color: "rgba(255,255,255,0.8)" }}>{p.name}</div>
//                   <div className="h-1 rounded-full mt-1 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
//                     <div className="h-full rounded-full" style={{ width: `${(p.sales / 420) * 100}%`, background: "linear-gradient(90deg, #d4af37, #b8960c)" }} />
//                   </div>
//                 </div>
//                 <span className="text-xs font-semibold flex-shrink-0" style={{ color: "#d4af37" }}>{p.sales}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="rounded-xl p-6" style={{ background: "linear-gradient(135deg, #1e0b0b 0%, #160606 100%)", border: "1px solid rgba(212,175,55,0.12)" }}>
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="font-bold text-base" style={{ color: "#d4af37", fontFamily: "Georgia, serif" }}>Recent Orders</h3>
//           <span className="text-xs cursor-pointer" style={{ color: "#d4af37" }}>View all →</span>
//         </div>
//         <table className="w-full text-sm">
//           <thead>
//             <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
//               {["Order", "Customer", "Product", "Amount", "Status"].map(h => (
//                 <th key={h} className="text-left pb-3 text-xs font-semibold tracking-wider" style={{ color: "rgba(212,175,55,0.5)" }}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {ORDERS.slice(0, 5).map((o, i) => (
//               <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
//                 <td className="py-3 text-xs font-mono" style={{ color: "rgba(212,175,55,0.8)" }}>{o.id}</td>
//                 <td className="py-3 text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>{o.customer}</td>
//                 <td className="py-3 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{o.product}</td>
//                 <td className="py-3 text-xs font-semibold" style={{ color: "#fff" }}>${o.amount}</td>
//                 <td className="py-3"><Badge status={o.status} /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function ProductsView() {
//   const [search, setSearch] = useState("");
//   const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div className="space-y-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-bold" style={{ color: "#d4af37", fontFamily: "Georgia, serif" }}>Product Catalogue</h2>
//           <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{PRODUCTS.length} total products</p>
//         </div>
//         <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
//           style={{ background: "linear-gradient(135deg, #d4af37 0%, #b8960c 100%)", color: "#1a0808" }}>
//           <Icon d={icons.plus} size={15} /> Add Product
//         </button>
//       </div>
//       <div className="flex gap-3">
//         <div className="relative flex-1">
//           <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(212,175,55,0.4)" }}><Icon d={icons.search} size={15} /></span>
//           <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
//             className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
//             style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.12)", color: "rgba(255,255,255,0.8)" }} />
//         </div>
//         <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm"
//           style={{ background: "rgba(212,175,55,0.08)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.12)" }}>
//           <Icon d={icons.filter} size={14} /> Filter
//         </button>
//       </div>
//       <div className="grid grid-cols-3 gap-4">
//         {filtered.map((p, i) => (
//           <div key={i} className="rounded-xl p-5 group cursor-pointer transition-all duration-200"
//             style={{ background: "linear-gradient(135deg, #1e0b0b 0%, #160606 100%)", border: "1px solid rgba(212,175,55,0.12)" }}>
//             <div className="w-full h-24 rounded-lg mb-4 flex items-center justify-center"
//               style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(26,8,8,0.8) 100%)", border: "1px solid rgba(212,175,55,0.08)" }}>
//               <Icon d={icons.package} size={32} className="opacity-30" style={{ color: "#d4af37" }} />
//             </div>
//             <div className="flex items-start justify-between mb-2">
//               <div>
//                 <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Georgia, serif" }}>{p.name}</p>
//                 <p className="text-xs mt-0.5" style={{ color: "rgba(212,175,55,0.45)" }}>{p.category}</p>
//               </div>
//               <Badge status={p.status} />
//             </div>
//             <div className="flex items-center justify-between mt-3">
//               <span className="text-lg font-bold" style={{ color: "#d4af37" }}>${p.price}</span>
//               <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
//                 <Icon d={icons.star} size={11} className="text-yellow-500" /> {p.rating} · {p.stock} in stock
//               </div>
//             </div>
//             <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
//               <button className="flex-1 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37" }}>Edit</button>
//               <button className="flex-1 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function OrdersView() {
//   const [filter, setFilter] = useState("All");
//   const statuses = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
//   const filtered = filter === "All" ? ORDERS : ORDERS.filter(o => o.status === filter);
//   return (
//     <div className="space-y-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-bold" style={{ color: "#d4af37", fontFamily: "Georgia, serif" }}>Order Management</h2>
//           <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{ORDERS.length} total orders</p>
//         </div>
//         <button className="px-4 py-2 rounded-lg text-sm font-semibold"
//           style={{ background: "linear-gradient(135deg, #d4af37 0%, #b8960c 100%)", color: "#1a0808" }}>Export CSV</button>
//       </div>
//       <div className="flex gap-2 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}>
//         {statuses.map(s => (
//           <button key={s} onClick={() => setFilter(s)} className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
//             style={{ background: filter === s ? "linear-gradient(135deg, #d4af37 0%, #b8960c 100%)" : "transparent", color: filter === s ? "#1a0808" : "rgba(212,175,55,0.5)" }}>
//             {s}
//           </button>
//         ))}
//       </div>
//       <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.12)" }}>
//         <table className="w-full text-sm">
//           <thead>
//             <tr style={{ background: "rgba(212,175,55,0.06)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
//               {["Order ID", "Customer", "Product", "Amount", "Date", "Status", "Actions"].map(h => (
//                 <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold tracking-wider" style={{ color: "rgba(212,175,55,0.6)" }}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((o, i) => (
//               <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "rgba(26,8,8,0.4)" : "rgba(16,4,4,0.4)" }}>
//                 <td className="px-5 py-3.5 text-xs font-mono font-semibold" style={{ color: "#d4af37" }}>{o.id}</td>
//                 <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>{o.customer}</td>
//                 <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{o.product}</td>
//                 <td className="px-5 py-3.5 text-xs font-bold" style={{ color: "#fff" }}>${o.amount}</td>
//                 <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{o.date}</td>
//                 <td className="px-5 py-3.5"><Badge status={o.status} /></td>
//                 <td className="px-5 py-3.5">
//                   <div className="flex gap-2">
//                     <button className="p-1.5 rounded-lg" style={{ color: "rgba(212,175,55,0.6)" }}><Icon d={icons.eye} size={14} /></button>
//                     <button className="p-1.5 rounded-lg" style={{ color: "rgba(212,175,55,0.6)" }}><Icon d={icons.edit} size={14} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function CustomersView() {
//   const [search, setSearch] = useState("");
//   const filtered = CUSTOMERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div className="space-y-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-bold" style={{ color: "#d4af37", fontFamily: "Georgia, serif" }}>Customer Directory</h2>
//           <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{CUSTOMERS.length} registered customers</p>
//         </div>
//         <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
//           style={{ background: "linear-gradient(135deg, #d4af37 0%, #b8960c 100%)", color: "#1a0808" }}>
//           <Icon d={icons.plus} size={15} /> Add Customer
//         </button>
//       </div>
//       <div className="relative max-w-sm">
//         <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(212,175,55,0.4)" }}><Icon d={icons.search} size={15} /></span>
//         <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..."
//           className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
//           style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.12)", color: "rgba(255,255,255,0.8)" }} />
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         {filtered.map((c, i) => (
//           <div key={i} className="rounded-xl p-5 flex items-center gap-4 group transition-all cursor-pointer"
//             style={{ background: "linear-gradient(135deg, #1e0b0b 0%, #160606 100%)", border: "1px solid rgba(212,175,55,0.12)" }}>
//             <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
//               style={{
//                 background: c.status === "VIP" ? "linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(184,150,12,0.15) 100%)" : "rgba(255,255,255,0.07)",
//                 color: c.status === "VIP" ? "#d4af37" : "rgba(255,255,255,0.5)",
//                 border: c.status === "VIP" ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.06)"
//               }}>{c.avatar}</div>
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Georgia, serif" }}>{c.name}</span>
//                 <Badge status={c.status} />
//               </div>
//               <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{c.email}</p>
//               <div className="flex items-center gap-4 mt-2">
//                 <span className="text-xs" style={{ color: "rgba(212,175,55,0.6)" }}>{c.orders} orders</span>
//                 <span className="text-xs font-semibold" style={{ color: "#d4af37" }}>${c.spent.toLocaleString()}</span>
//                 <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Since {c.joined}</span>
//               </div>
//             </div>
//             <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
//               <button className="p-2 rounded-lg" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37" }}><Icon d={icons.eye} size={13} /></button>
//               <button className="p-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}><Icon d={icons.trash} size={13} /></button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   const [active, setActive] = useState("dashboard");
//   const [collapsed, setCollapsed] = useState(false);
//   const views = { dashboard: DashboardView, products: ProductsView, orders: OrdersView, customers: CustomersView };
//   const View = views[active];
//   const titles = { dashboard: "Overview", products: "Products", orders: "Orders", customers: "Customers" };

//   return (
//     <div className="flex min-h-screen" style={{ background: "#110404" }}>
//       <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
//       <div className="flex-1 flex flex-col min-w-0">
//         <header className="flex items-center justify-between px-7 py-4 sticky top-0 z-10"
//           style={{ background: "rgba(17,4,4,0.95)", borderBottom: "1px solid rgba(212,175,55,0.1)", backdropFilter: "blur(8px)" }}>
//           <div>
//             <h1 className="text-base font-bold tracking-wide" style={{ color: "#d4af37", fontFamily: "Georgia, serif" }}>{titles[active]}</h1>
//             <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Monday, June 08, 2026</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="relative p-2 rounded-lg" style={{ background: "rgba(212,175,55,0.08)", color: "rgba(212,175,55,0.7)" }}>
//               <Icon d={icons.bell} size={17} />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#d4af37" }} />
//             </button>
//             <div className="flex items-center gap-3 px-3 py-2 rounded-xl"
//               style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.1)" }}>
//               <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
//                 style={{ background: "linear-gradient(135deg, #d4af37 0%, #b8960c 100%)", color: "#1a0808" }}>SA</div>
//               <div className="text-xs">
//                 <div className="font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>Super Admin</div>
//                 <div style={{ color: "rgba(212,175,55,0.5)" }}>Administrator</div>
//               </div>
//             </div>
//           </div>
//         </header>
//         <main className="flex-1 p-7 overflow-auto"><View /></main>
//       </div>
//     </div>
//   );
// }
