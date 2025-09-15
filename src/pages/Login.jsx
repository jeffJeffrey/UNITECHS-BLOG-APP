import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login({ name: name.trim(), isAdmin: false });
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connexion</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Entrez votre nom"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Se connecter
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Connectez-vous avec n'importe quel nom, puis utilisez "Toggle Admin" pour accéder au dashboard.
        </p>
      </div>
    </div>
  );
}
export default Login;