import { Link } from "react-router-dom";
const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {article.category.name}
          </span>
          <span className="text-sm text-gray-500">{article.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          <Link to={`/blog/${article.slug}`} className="hover:text-blue-600 transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">
          {article.content.substring(0, 100)}...
        </p>
        <div className="flex items-center justify-between">
          <Link
            to={`/author/${article.authorId}`}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Par {article.author}
          </Link>
          <span className="text-sm text-gray-400">{article.date}</span>
        </div>
      </div>
    </div>
  );
}
export default ArticleCard;