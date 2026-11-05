import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import NotFound from "./NotFound";
import { useArticles } from "../hooks/ArticleProvider";
const CategoryPage = () => {
  const { articles } = useArticles();
  const { name } = useParams();
  const categoryArticles = articles.filter(
    (article) => article.category.name.toLowerCase() === name.toLowerCase()
  );

  if (categoryArticles.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Catégorie: {name}
      </h1>
      <p className="text-gray-600 mb-8">
        {categoryArticles.length} article
        {categoryArticles.length !== 1 ? "s" : ""} dans cette catégorie
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
export default CategoryPage;
