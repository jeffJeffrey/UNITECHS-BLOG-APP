import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import ArticleCard from "../components/ArticleCard";
import { useArticles } from "../hooks/ArticleProvider";
const AuthorProfile = () => {
    const {articles, authors} = useArticles()
  const { id } = useParams();
  const author = authors.find(a => a.id === parseInt(id));
  const authorArticles = articles.filter(a => a.authorId === parseInt(id));

  if (!author) {
    return <NotFound />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{author.name}</h1>
            <p className="text-gray-600 text-lg">{author.bio}</p>
            <p className="text-sm text-gray-500 mt-2">
              {authorArticles.length} article{authorArticles.length !== 1 ? 's' : ''} publié{authorArticles.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles de {author.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authorArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
} 
export default AuthorProfile;