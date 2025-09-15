import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ArticleDetail from "./pages/ArticleDetail";
import CategoryPage from "./pages/CategoryPage";
import AuthorProfile from "./pages/AuthorProfile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import DashboardPosts from "./pages/DashboardPosts";
import DashboardUsers from "./pages/DashboardUsers";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./hooks/AuthProvider";
import { ArticleProvider } from "./hooks/ArticleProvider";

function App() {
  return (
    <>
      <ArticleProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <NavBar />
              <main>
                <Routes>
                  {/* Routes publiques */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<ArticleDetail />} />
                  <Route path="/category/:name" element={<CategoryPage />} />
                  <Route path="/author/:id" element={<AuthorProfile />} />
                  <Route path="/login" element={<Login />} />

                  {/* Routes protégées (admin) */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/posts"
                    element={
                      <ProtectedRoute>
                        <DashboardPosts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/users"
                    element={
                      <ProtectedRoute>
                        <DashboardUsers />
                      </ProtectedRoute>
                    }
                  />

                  {/* Route 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </ArticleProvider>
    </>
  );
}

export default App;
