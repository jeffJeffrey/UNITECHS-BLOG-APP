import { Link } from "react-router-dom";
import { useArticles } from "../hooks/ArticleProvider";
const Dashboard = () => {
  const {articles, authors} = useArticles()
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex">
        {/* Navigation latérale */}
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
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
            >
              Gestion des utilisateurs
            </Link>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Tableau de bord</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Articles</h3>
                <p className="text-3xl font-bold text-blue-600">{articles.length}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Auteurs</h3>
                <p className="text-3xl font-bold text-green-600">{authors.length}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Catégories</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {new Set(articles.map(a => a.category)).size}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
              <div className="space-y-3">
                <Link
                  to="/dashboard/posts"
                  className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mr-4"
                >
                  Gérer les articles
                </Link>
                <Link
                  to="/dashboard/users"
                  className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Gérer les utilisateurs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;