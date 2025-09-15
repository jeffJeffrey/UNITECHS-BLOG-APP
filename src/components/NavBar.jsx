import { useAuth } from "../hooks/AuthProvider";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { user, isAdmin, logout, toggleAdmin } = useAuth();

  return (
    <nav className=" bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Blog App
          </Link>

          <div className="flex space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>

            {isAdmin && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user.name} {isAdmin && "(Admin)"}
                </span>
                <button
                  onClick={toggleAdmin}
                  className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                >
                  Toggle Admin
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
