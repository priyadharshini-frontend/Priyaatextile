export default function Navbar() {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <button className="px-3 py-1 bg-black text-white rounded">
          Admin
        </button>
      </div>
    </header>
  );
}