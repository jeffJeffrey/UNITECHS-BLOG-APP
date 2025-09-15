import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import ArticleCard from "../components/ArticleCard";
import { useArticles } from "../hooks/ArticleProvider";

const ArticleDetail = () => {
  const { articles } = useArticles();
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <NotFound />;
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <Link to="/" className="text-blue-600 hover:underline">
          Accueil
        </Link>
        {" > "}
        <Link to="/blog" className="text-blue-600 hover:underline">
          Blog
        </Link>
        {" > "}
        <span className="text-gray-500">{article.title}</span>
      </nav>

      {/* Article */}
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 md:h-80 object-cover"
        />

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
              {article.category}
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{article.readTime}</span>
              <span>{article.date}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <Link
                to={`/author/${article.authorId}`}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {article.author}
              </Link>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Articles similaires */}
      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Articles similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ArticleDetail;
