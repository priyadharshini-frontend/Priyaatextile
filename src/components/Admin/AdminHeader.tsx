// 'use client';

// import { useState } from 'react';

// export const AdminHeader = ({ onToggleSidebar, sidebarOpen }) => {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const notifications = [
//     { id: 1, message: 'New order from John Doe', time: '2 min ago', read: false },
//     { id: 2, message: 'Product inventory low', time: '1 hour ago', read: false },
//     { id: 3, message: 'Customer review posted', time: '3 hours ago', read: true },
//     { id: 4, message: 'Payment received', time: '5 hours ago', read: true },
//   ];

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <header
//       className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40"
//       style={{
//         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
//       }}
//     >
//       {/* Left: Menu Toggle + Search */}
//       <div className="flex items-center gap-4 flex-1">
//         {/* Menu Toggle */}
//         <button
//           onClick={onToggleSidebar}
//           className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
//           title="Toggle sidebar"
//         >
//           {sidebarOpen ? (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           ) : (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           )}
//         </button>

//         {/* Search Bar */}
//         <div className="hidden md:flex relative flex-1 max-w-md">
//           <input
//             type="text"
//             placeholder="Search products, orders, customers..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
//           />
//           <svg
//             className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Right: Notifications + User Menu */}
//       <div className="flex items-center gap-4">
//         {/* Notifications */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowNotifications(!showNotifications);
//               setShowUserMenu(false);
//             }}
//             className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
//             title="Notifications"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//               />
//             </svg>
//             {unreadCount > 0 && (
//               <span
//                 className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
//               >
//                 {unreadCount}
//               </span>
//             )}
//           </button>

//           {/* Notifications Dropdown */}
//           {showNotifications && (
//             <div
//               className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
//               style={{
//                 animation: 'slideDown 0.3s ease-out',
//                 boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//                 <h3 className="font-bold text-gray-900">Notifications</h3>
//                 <button
//                   onClick={() => setShowNotifications(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="max-h-96 overflow-y-auto">
//                 {notifications.map((notif) => (
//                   <div
//                     key={notif.id}
//                     className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
//                       !notif.read ? 'bg-blue-50' : ''
//                     }`}
//                   >
//                     <div className="flex items-start justify-between">
//                       <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
//                         {notif.message}
//                       </p>
//                       {!notif.read && (
//                         <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0 ml-2" />
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="p-4 border-t border-gray-200 text-center">
//                 <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
//                   View All Notifications
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* User Menu */}
//         <div className="relative border-l border-gray-200 pl-4">
//           <button
//             onClick={() => {
//               setShowUserMenu(!showUserMenu);
//               setShowNotifications(false);
//             }}
//             className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold">
//               AD
//             </div>
//             <span className="hidden sm:inline text-sm font-medium text-gray-700">Admin</span>
//           </button>

//           {/* User Menu Dropdown */}
//           {showUserMenu && (
//             <div
//               className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
//               style={{
//                 animation: 'slideDown 0.3s ease-out',
//                 boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <div className="p-4 border-b border-gray-200">
//                 <p className="font-semibold text-gray-900">Admin User</p>
//                 <p className="text-sm text-gray-500">admin@example.com</p>
//               </div>

//               <div className="py-2">
//                 <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700">
//                   👤 Profile
//                 </button>
//                 <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700">
//                   ⚙️ Settings
//                 </button>
//                 <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700">
//                   🔒 Security
//                 </button>
//               </div>

//               <div className="border-t border-gray-200 p-2">
//                 <button className="w-full px-4 py-2 rounded hover:bg-red-50 transition-colors text-sm text-red-600 font-medium">
//                   🚪 Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;
