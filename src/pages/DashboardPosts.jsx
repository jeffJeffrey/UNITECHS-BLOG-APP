import { Link } from "react-router-dom";
import { useArticles } from "../hooks/ArticleProvider";
import { useState } from "react";

const DashboardPosts = () => {
  const { articles, addArticle, categories, deleteArticle, updateArticle, authors } = useArticles();

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category_id: "",
    content: "",
    slug: "",
    date: "",
    image: null,
    author_id: "",
  });
  const [editId, setEditId] = useState(null);

  const handleOpenCreate = () => {
    setForm({
      title: "",
      category_id: "",
      content: "",
      slug: "",
      date: new Date().toISOString().slice(0, 10),
      image: null,
      author_id: "",
    });
    setEditMode(false);
    setModalOpen(true);
    setEditId(null);
  };

  const handleOpenEdit = (article) => {
    setForm({
      title: article.title,
      category_id: article.category.id,
      content: article.content,
      slug: article.slug,
      date: article.date,
      image: null,
      author_id: article.author_id,
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
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
      if (form.image) {
        // Nouvelle image : utiliser FormData
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("slug", slug);
        formData.append("author_id", form.author_id);
        formData.append("category_id", form.category_id);
        formData.append("image", form.image);
        await updateArticle(editId, formData);
      } else {
        // Pas de nouvelle image : JSON sans image
        await updateArticle(editId, {
          title: form.title,
          content: form.content,
          slug: slug,
          author_id: form.author_id,
          category_id: form.category_id,
        });
      }
    } else {
      // Création
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("slug", slug);
      formData.append("author_id", randomAuthor.id);
      formData.append("category_id", form.category_id);
      if (form.image) {
        formData.append("image", form.image);
      }
      await addArticle(formData);
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
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
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
                          {article.category.name}
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