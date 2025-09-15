import { Link } from "react-router-dom";
import { useArticles } from "../hooks/ArticleProvider";
import { useState } from "react";
const DashboardPosts = () => {
  const { articles, addArticle, deleteArticle, updateArticle, authors } = useArticles();

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    slug: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);

  const handleOpenCreate = () => {
    setForm({
      title: "",
      category: "",
      content: "",
      slug: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setEditMode(false);
    setModalOpen(true);
    setEditId(null);
  };updateArticle

  const handleOpenEdit = (article) => {
    setForm({
      title: article.title,
      category: article.category,
      content: article.content,
      slug: article.slug,
      date: article.date,
    });
    setEditMode(true);
    setModalOpen(true);
    setEditId(article.id);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateArticle(editId, {
        ...articles.find(a => a.id === editId),
        ...form,
      });
    } else {
      // Random author and image
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const randomImg = `https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}`;
      addArticle({
        id: Date.now(),
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
        title: form.title,
        category: form.category,
        author: randomAuthor.name,
        authorId: randomAuthor.id,
        image: randomImg,
        content: form.content,
        date: form.date,
        readTime: "5 min",
      });
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet article ?")) {
      deleteArticle(id);
    }
  };

  // Modal JSX
  const modal = modalOpen && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={handleClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">{editMode ? "Modifier" : "Créer"} un post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Titre"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Catégorie"
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Contenu"
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (optionnel)"
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="mr-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {editMode ? "Mettre à jour" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex">
        <div className="w-64 bg-white rounded-lg shadow-lg p-6 mr-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h2>
          <nav className="space-y-2">
            <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
              Vue d'ensemble
            </Link>
            <Link to="/dashboard/posts" className="block px-4 py-2 bg-blue-50 text-blue-600 rounded">
              Gestion des posts
            </Link>
            <Link to="/dashboard/users" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
              Gestion des utilisateurs
            </Link>
          </nav>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des Posts</h1>
            
            <div className="mb-6">
              <button onClick={handleOpenCreate} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Créer un nouveau post
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Titre</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Catégorie</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Auteur</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {articles.map(article => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link to={`/blog/${article.slug}`} className="text-blue-600 hover:underline">
                          {article.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{article.author}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{article.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button onClick={() => handleOpenEdit(article)} className="text-blue-600 hover:text-blue-800 text-sm">
                            Éditer
                          </button>
                          <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800 text-sm">
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modal}
    </div>
  );
}
export default  DashboardPosts;