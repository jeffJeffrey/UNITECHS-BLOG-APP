import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-lg shadow-lg p-12">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
export default NotFound;