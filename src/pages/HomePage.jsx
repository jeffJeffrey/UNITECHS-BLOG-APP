import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { useArticles } from "../hooks/ArticleProvider";

const HomePage = () => {
    const {articles} = useArticles()
  const latestArticles = articles.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur notre Blog
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez les derniers articles sur le développement web
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Derniers Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/blog"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Voir tous les articles
        </Link>
      </div>
    </div>
  );
}
export default HomePage;