import { Link } from "react-router-dom";
import { useArticles } from "../hooks/ArticleProvider";
const DashboardUsers = () => {
  const { articles, authors } = useArticles();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex">
        <div className="w-64 bg-white rounded-lg shadow-lg p-6 mr-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h2>
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
            >
              Vue d'ensemble
            </Link>
            <Link
              to="/dashboard/posts"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
            >
              Gestion des posts
            </Link>
            <Link
              to="/dashboard/users"
              className="block px-4 py-2 bg-blue-50 text-blue-600 rounded"
            >
              Gestion des utilisateurs
            </Link>
          </nav>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Gestion des Utilisateurs
            </h1>

            <div className="mb-6">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Inviter un utilisateur
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author) => (
                <div key={author.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {author.name}
                      </h3>
                      <p className="text-sm text-gray-600">Auteur</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{author.bio}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {articles.filter((a) => a.authorId === author.id).length}{" "}
                      articles
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Éditer
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardUsers;
