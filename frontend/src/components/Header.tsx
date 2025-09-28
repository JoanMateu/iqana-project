import { Link, useLocation } from "react-router-dom";


type HeaderProps = {
  username?: string | null;
};

export default function Header({ username }: HeaderProps) {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 bg-[#DDDDDD] shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logos + Title */}
        <div className="flex items-center gap-3">

          <span className="text-lg font-semibold text-gray-900">
            Coinbase Dashboard
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
            Architecture & Tools
          </Link>


          <Link
            to="/ops"
            className={`hover:text-[#6DEA7F] transition ${
              pathname === "/ops" ? "text-[#6DEA7F]" : "text-gray-700"
            }`}
          >
            Operations & Observability
          </Link>


          {username && (
            <div className="text-gray-600 text-xs border-l pl-4">
              User: <span className="font-semibold">{username}</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
