import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement initial
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, authorsRes, categoriesRes] = await Promise.all([
          api.get("/articles"),
          api.get("/authors"),
          api.get("/categories"),
        ]);
        setArticles(articlesRes.data.data || articlesRes.data);
        setAuthors(authorsRes.data.data || authorsRes.data);
        setCategories(categoriesRes.data.data || categoriesRes.data);
      } catch (error) {
        console.error("erreur lors du chargement des donnees:", error)
      } finally {
        setLoading(false);
      }
    }; fetchData();
  }, [])


  // CRUD Articles
  const addArticle =  async (articleData) => {
    const config = articleData instanceof FormData 
      ? { headers: { 'Content-Type': undefined } } 
      : {};
    const res = await api.post("/articles", articleData, config);
    setArticles((prevItems) => [...prevItems, res.data.data || res.data]);
  };

   const deleteArticle = async (id) => {
    await api.delete(`/articles/${id}`)
   setArticles((prevItems) => prevItems.filter((item) => item.id !== id))

  };

  const updateArticle = async (id, articleData) => {
    const config = articleData instanceof FormData 
      ? { headers: { 'Content-Type': undefined } } 
      : {};
    const res = await api.put(`/articles/${id}`, articleData, config);
    setArticles((prevItems) => prevItems.map((item) => item.id === id ? res.data.data || res.data : item))
  };

  // CRUD Authors
  const addAuthors = async (author) => {
    const res = await api.post("/authors", author);
    setAuthors((prevItems) => [...prevItems, res.data.data || res.data]);
  };

   const deleteAuthor = async (id) => {
    await api.delete(`/authors/${id}`);
    setAuthors((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateAuthor = async (id, author) => {
    const res = await api.put(`/authors/${id}`, author);
    setAuthors((prevItems) => prevItems.map((item) => item.id === id ? res.data.data || res.data : item));
  };

  // CRUD Categories
  const addCategory = async (category) => {
    const res = await api.post("/categories", category);
    setCategories((prevItems) => [...prevItems, res.data.data || res.data]);
  }

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    setCategories((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateCategory = async (id, category) => {
    const res = await api.put(`/categories/${id}`, category);
    setCategories((prevItems) => prevItems.map((item) => item.id === id ? res.data.data || res.data : item));
  };
 

  return (
    <ArticleContext.Provider value={{ articles, addArticle, deleteArticle, updateArticle,  authors, addAuthors, deleteAuthor, updateAuthor, categories, addCategory, deleteCategory, updateCategory, loading }}>
      {children}
    </ArticleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticles doit être utilisé dans AuthProvider");
  }

  return context;
};