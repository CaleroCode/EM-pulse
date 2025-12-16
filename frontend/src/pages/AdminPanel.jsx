import { useState, useEffect } from "react";
import { Trash2, Edit2, Eye, LogOut, Search } from "lucide-react";
import { forumAPI } from "../services/forumAPI";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "csbvtrcalerocode";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Posts management
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Edit mode
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("");
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categories = [
    { id: "general", name: "General" },
    { id: "sintomas", name: "Síntomas" },
    { id: "tratamientos", name: "Tratamientos" },
    { id: "experiencias", name: "Experiencias" },
    { id: "ejercicio", name: "Ejercicio y Bienestar" },
    { id: "ayuda", name: "Pedir Ayuda" },
  ];

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUsername("");
      setPassword("");
      loadPosts();
    } else {
      setLoginError("Usuario o contraseña incorrectos");
    }
  };

  // Auto-reload posts cuando se autentica
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Admin autenticado, recargando posts automáticamente');
      loadPosts();
      // Recargar cada 10 segundos
      const interval = setInterval(loadPosts, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Load all posts
  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      console.log('AdminPanel: Cargando posts...');
      const data = await forumAPI.getPosts();
      console.log('AdminPanel: Posts obtenidos:', data);
      console.log('AdminPanel: Es array?', Array.isArray(data));
      console.log('AdminPanel: Longitud:', data?.length);
      
      const postsArray = Array.isArray(data) ? data : [];
      console.log('AdminPanel: Seteando posts:', postsArray);
      setPosts(postsArray);
      filterPosts(postsArray);
    } catch (err) {
      setError("Error al cargar los posts");
      console.error('AdminPanel: Error cargando posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts
  const filterPosts = (postsToFilter) => {
    let filtered = Array.isArray(postsToFilter) ? postsToFilter : [];

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    console.log('filterPosts:', { 
      totalPosts: postsToFilter?.length || 0, 
      afterSearch: filtered.length, 
      searchQuery, 
      categoryFilter 
    });
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    console.log('useEffect filterPosts ejecutado, posts:', posts.length);
    filterPosts(posts);
  }, [searchQuery, categoryFilter, posts]);

  // Delete post
  const handleDeletePost = async (postId) => {
    try {
      await forumAPI.deletePost(postId);
      setPosts(posts.filter((p) => p.id !== postId));
      setDeleteConfirm(null);
      setError("");
    } catch (err) {
      setError("Error al eliminar el post");
      console.error(err);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId, postId) => {
    try {
      await forumAPI.deleteComment(commentId);
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.filter((c) => c.id !== commentId),
              }
            : post
        )
      );
      setDeleteConfirm(null);
      setError("");
    } catch (err) {
      setError("Error al eliminar el comentario");
      console.error(err);
    }
  };

  // Edit post
  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditCategory(post.category);
  };

  const saveEdit = async () => {
    try {
      const updatedData = {
        title: editTitle,
        content: editContent,
        category: editCategory,
      };
      await forumAPI.updatePost(editingPostId, updatedData);
      setPosts(
        posts.map((post) =>
          post.id === editingPostId
            ? { ...post, ...updatedData }
            : post
        )
      );
      setEditingPostId(null);
      setError("");
    } catch (err) {
      setError("Error al actualizar el post");
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle("");
    setEditContent("");
    setEditCategory("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPosts([]);
    setFilteredPosts([]);
    setUsername("");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-bg-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-dark-bg-secondary/50 border border-empulsePrimary/30 rounded-lg p-8 backdrop-blur">
            <h1 className="text-3xl font-bold text-empulsePrimary mb-8 text-center">
              Panel Admin
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-dark-bg border border-empulseAccent/30 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-empulsePrimary transition"
                  placeholder="admin"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-bg border border-empulseAccent/30 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-empulsePrimary transition"
                  placeholder="••••••••"
                />
              </div>

              {loginError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-empulsePrimary text-dark-bg font-semibold py-2 px-4 rounded-lg hover:bg-empulseMid transition"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-empulsePrimary">
            Panel de Administración del Foro
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold py-2 px-4 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Salir
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-red-200">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-dark-bg-secondary/50 border border-empulseAccent/20 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Total de Posts</p>
            <p className="text-3xl font-bold text-empulsePrimary">{posts.length}</p>
          </div>
          <div className="bg-dark-bg-secondary/50 border border-empulseAccent/20 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Total de Comentarios</p>
            <p className="text-3xl font-bold text-empulsePrimary">
              {posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0)}
            </p>
          </div>
          <div className="bg-dark-bg-secondary/50 border border-empulseAccent/20 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Total de Likes</p>
            <p className="text-3xl font-bold text-empulsePrimary">
              {posts.reduce((sum, post) => sum + post.likes, 0)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-empulsePrimary" />
            <input
              type="text"
              placeholder="Buscar por título, contenido o autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-bg-secondary/50 border border-empulseAccent/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-empulsePrimary transition"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-dark-bg-secondary/50 border border-empulseAccent/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empulsePrimary transition"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Posts list */}
        <div className="space-y-4">
          {console.log('RENDER: loading=', loading, 'filteredPosts.length=', filteredPosts?.length)}
          {loading ? (
            <div className="text-center py-12 text-slate-400">
              Cargando posts...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No se encontraron posts (filteredPosts.length = {filteredPosts.length})
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-dark-bg-secondary/30 border border-empulseAccent/20 rounded-lg p-6"
              >
                {editingPostId === post.id ? (
                  // Edit mode
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-dark-bg border border-empulseAccent/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empulsePrimary"
                      placeholder="Título"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-dark-bg border border-empulseAccent/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empulsePrimary resize-none"
                      rows="4"
                      placeholder="Contenido"
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-dark-bg border border-empulseAccent/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empulsePrimary"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 bg-empulsePrimary text-dark-bg font-semibold py-2 px-4 rounded-lg hover:bg-empulseMid transition"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 bg-slate-700/50 text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600/50 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Post header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-empulsePrimary">
                            {post.title}
                          </h3>
                          <p className="text-sm text-slate-400">
                            Por {post.author} • {" "}
                            {new Date(post.created_at).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <span className="bg-empulsePrimary/20 text-empulsePrimary text-xs font-semibold px-3 py-1 rounded-full">
                          {categories.find((c) => c.id === post.category)?.name}
                        </span>
                      </div>
                      <p className="text-slate-300 line-clamp-2">{post.content}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                      <span>❤️ {post.likes} likes</span>
                      <span>💬 {post.comments?.length || 0} comentarios</span>
                    </div>

                    {/* Comments preview */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="bg-dark-bg/50 rounded-lg p-4 mb-4 space-y-3 max-h-60 overflow-y-auto">
                        <p className="text-sm font-semibold text-slate-300">
                          Comentarios ({post.comments.length})
                        </p>
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-dark-bg-secondary/50 rounded p-2 text-sm"
                          >
                            <div className="flex items-start justify-between mb-1">
                              <p className="font-semibold text-slate-300">
                                {comment.author}
                              </p>
                              <button
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: "comment",
                                    id: comment.id,
                                    postId: post.id,
                                  })
                                }
                                className="text-red-400 hover:text-red-300 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-slate-400">{comment.content}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(comment.created_at).toLocaleDateString(
                                "es-ES"
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(post)}
                        className="flex-1 flex items-center justify-center gap-2 bg-empulsePrimary/20 hover:bg-empulsePrimary/30 text-empulsePrimary font-semibold py-2 px-4 rounded-lg transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ type: "post", id: post.id })}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold py-2 px-4 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-bg-secondary border border-empulseAccent/30 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-empulsePrimary mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-slate-300 mb-6">
              {deleteConfirm.type === "post"
                ? "¿Estás seguro de que deseas eliminar este post? Esta acción no se puede deshacer."
                : "¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 font-semibold py-2 px-4 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === "post") {
                    handleDeletePost(deleteConfirm.id);
                  } else {
                    handleDeleteComment(deleteConfirm.id, deleteConfirm.postId);
                  }
                }}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold py-2 px-4 rounded-lg transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
