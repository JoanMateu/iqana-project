import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 bg-[#DDDDDD] shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo y nombre */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-6" />
          <span className="text-lg font-semibold text-gray-900">
            Iqana Dashboard
          </span>
        </div>

        {/* Navegación */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`hover:text-[#6DEA7F] transition ${
              pathname === "/" ? "text-[#6DEA7F]" : "text-gray-700"
            }`}
          >
            Holdings
          </Link>
          <Link
            to="/docs"
            className={`hover:text-[#6DEA7F] transition ${
              pathname === "/docs" ? "text-[#6DEA7F]" : "text-gray-700"
            }`}
          >
            Documentation
          </Link>

          <div className="text-gray-600 text-xs border-l pl-4">
            User: <span className="font-semibold">coinbase_user</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
