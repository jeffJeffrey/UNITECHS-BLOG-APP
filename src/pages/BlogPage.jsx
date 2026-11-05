import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { useArticles } from "../hooks/ArticleProvider";
const BlogPage = () => {
    const {articles} = useArticles()
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  const categories = [...new Set(articles.map(article => article.category.name))];
  const searchTerm = searchParams.get('q') || '';

  // Filtrage des articles
  useEffect(() => {
    let filtered = articles;

    // Filtrage par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(article => article.category.name === selectedCategory);
    }

    // Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, articles]);

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>

      {/* Barre de recherche et filtres */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher des articles..."
            defaultValue={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Résultats */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} trouvé{filteredArticles.length !== 1 ? 's' : ''}
          {searchTerm && ` pour "${searchTerm}"`}
          {selectedCategory && ` dans la catégorie "${selectedCategory}"`}
        </p>
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default BlogPage;