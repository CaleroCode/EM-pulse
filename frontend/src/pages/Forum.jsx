import { useState, useEffect } from "react";
import { MessageCircle, Heart, Reply, Search, Plus, User, Clock, X } from "lucide-react";
import { forumAPI } from "../services/forumAPI";
import ShareButtons from "../components/ShareButtons";
import ExportPDF from "../components/ExportPDF";

export default function Forum({ user, profileImage, showForum }) {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showNewPost, setShowNewPost] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("general");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Scroll al top cuando se abre el Forum
  useEffect(() => {
    if (showForum) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showForum]);

  // Obtener identificador único del usuario (email o username)
  const userIdentifier = user?.email || user?.username || "anonymous";

  const categories = [
    { id: "general", name: "General", color: "bg-blue-500/10 border-blue-500/30", icon: "💬" },
    { id: "sintomas", name: "Síntomas", color: "bg-red-500/10 border-red-500/30", icon: "🏥" },
    { id: "tratamientos", name: "Tratamientos", color: "bg-green-500/10 border-green-500/30", icon: "💊" },
    { id: "experiencias", name: "Experiencias", color: "bg-purple-500/10 border-purple-500/30", icon: "📖" },
    { id: "ejercicio", name: "Ejercicio y Bienestar", color: "bg-yellow-500/10 border-yellow-500/30", icon: "🏃" },
    { id: "ayuda", name: "Pedir Ayuda", color: "bg-pink-500/10 border-pink-500/30", icon: "🤝" },
  ];

  // Cargar posts desde localStorage primero, luego sincronizar con servidor
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Obtener datos del servidor (Neon)
        const data = await forumAPI.getPosts(null, null, userIdentifier);
        const postsArray = Array.isArray(data) ? data : [];
        
        // Actualizar posts (puede estar vacío, eso no es error)
        setPosts(postsArray);
      } catch (err) {
        console.error('Error loading posts:', err);
        // Solo mostrar error si hay problema de conexión real
        setError('Error al cargar los posts. Verifica tu conexión.');
        setPosts([]); // Mostrar lista vacía
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, [userIdentifier]);

  const currentPosts = posts;
  const filteredPosts = currentPosts.filter(post => {
    // Filtrar por búsqueda
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrar por categoría (solo si NO es "all")
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = async () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const authorName = user?.username || user?.name || "Usuario invitado";
      
      try {
        const newPost = {
          author: authorName,
          author_avatar: profileImage || "",
          title: newPostTitle,
          content: newPostContent,
          category: newPostCategory,
        };

        const createdPost = await forumAPI.createPost(newPost);
        
        // Agregar el nuevo post a la lista inmediatamente
        setPosts(prevPosts => [createdPost, ...prevPosts]);

        // Limpiar formulario y cerrar modal
        setNewPostTitle("");
        setNewPostContent("");
        setNewPostCategory("general");
        setShowNewPost(false);
        setError("");
        
        // Mensaje de éxito
        if (createdPost.is_local) {
          console.log('Post guardado localmente. Se sincronizará cuando la API esté disponible.');
        }
      } catch (err) {
        console.error('Error creating post:', err);
        const errorMsg = err.message || 'Error desconocido al crear el post';
        setError(`Error al crear el post: ${errorMsg}`);
      }
    }
  };

  // Función para formatear fechas con fecha y hora exacta
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Formato: "15 de diciembre de 2025, 14:30"
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    
    return date.toLocaleDateString('es-ES', options);
  };

  // Función para generar iniciales
  const getInitials = (name) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleLike = async (post) => {
    try {
      if (post.user_has_liked) {
        // Quitar like
        await forumAPI.unlikePost(post.id, userIdentifier);
        // Actualizar el post
        setPosts(prevPosts => 
          prevPosts.map(p => 
            p.id === post.id ? {
              ...p, 
              likes: Math.max(0, p.likes - 1),
              user_has_liked: false
            } : p
          )
        );
      } else {
        // Agregar like
        await forumAPI.likePost(post.id, userIdentifier);
        // Actualizar el post
        setPosts(prevPosts => 
          prevPosts.map(p => 
            p.id === post.id ? {
              ...p, 
              likes: p.likes + 1,
              user_has_liked: true
            } : p
          )
        );
      }
    } catch (err) {
      setError('Error al actualizar like');
      console.error('Error liking post:', err);
    }
  };

  const handleCommentLike = async (postId, comment) => {
    try {
      if (comment.user_has_liked) {
        // Quitar like
        await forumAPI.unlikeComment(comment.id, userIdentifier);
        // Actualizar el comentario
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.map(c =>
                    c.id === comment.id
                      ? {
                          ...c,
                          likes: Math.max(0, c.likes - 1),
                          user_has_liked: false
                        }
                      : c
                  )
                }
              : post
          )
        );
      } else {
        // Agregar like
        await forumAPI.likeComment(comment.id, userIdentifier);
        // Actualizar el comentario
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.map(c =>
                    c.id === comment.id
                      ? {
                          ...c,
                          likes: c.likes + 1,
                          user_has_liked: true
                        }
                      : c
                  )
                }
              : post
          )
        );
      }
    } catch (err) {
      setError('Error al actualizar like del comentario');
      console.error('Error liking comment:', err);
    }
  };

  const handleAddReply = async (postId) => {
    if (replyText.trim()) {
      const authorName = user?.username || user?.name || "Usuario invitado";

      try {
        const comment = {
          author: authorName,
          author_avatar: profileImage || "",
          content: replyText,
        };

        const createdComment = await forumAPI.addComment(postId, comment);
        
        // Actualizar el post con el nuevo comentario inmediatamente
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId || post.id === parseInt(postId)
              ? { ...post, comments: [...(post.comments || []), createdComment] }
              : post
          )
        );

        setReplyText("");
        setShowReplyForm(null);
        
        if (createdComment.is_local) {
          console.log('Comentario guardado localmente. Se sincronizará cuando la API esté disponible.');
        }
      } catch (err) {
        setError('Error al agregar comentario');
        console.error('Error adding reply:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-empulsePrimary mb-2">Foro de la Comunidad</h1>
          <p className="text-slate-400">Conecta con otros pacientes, comparte experiencias y recibe apoyo</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-red-200">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-400">Cargando posts...</p>
          </div>
        )}

        {!loading && (
          <>
        {/* Search and New Post */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-empulsePrimary" />
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#021922] border border-empulseAccent/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-empulsePrimary transition"
            />
          </div>
          <button
            onClick={() => setShowNewPost(true)}
            className="bg-empulsePrimary text-dark-bg font-semibold py-3 px-4 rounded-lg hover:bg-empulseMid transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nuevo Post
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Categorías */}
          <div className="lg:col-span-1">
            <div className="bg-dark-bg-secondary/30 border border-empulseAccent/20 rounded-lg p-4 sticky top-20">
              <h3 className="font-bold text-slate-200 mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat.id
                        ? "bg-empulsePrimary/20 border border-empulsePrimary/50 text-empulsePrimary font-semibold"
                        : "text-slate-400 hover:text-empulsePrimary hover:bg-empulseAccent/10"
                    }`}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="lg:col-span-3">
            {/* Category Info */}
            <div className={`border-l-4 rounded-lg p-4 mb-6 ${categories.find(c => c.id === selectedCategory).color}`}>
              <h2 className="text-xl font-bold text-slate-200">{categories.find(c => c.id === selectedCategory).name}</h2>
              <p className="text-sm text-slate-400 mt-1">{filteredPosts.length} posts en esta categoría</p>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <div
                    key={post.id}
                    className={`border rounded-lg p-6 hover:border-empulsePrimary/40 transition ${
                      post.is_local 
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-dark-bg-secondary/30 border-empulseAccent/20'
                    }`}
                  >
                    {/* Local Post Badge */}
                    {post.is_local && (
                      <div className="mb-3 inline-block bg-yellow-500/20 border border-yellow-500/50 rounded px-2 py-1 text-xs text-yellow-300">
                        ⏳ Sincronizando...
                      </div>
                    )}
                    
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        {post.author_avatar ? (
                          <img 
                            src={post.author_avatar} 
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover border border-empulsePrimary/50"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-empulsePrimary/20 border border-empulsePrimary/50 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-empulsePrimary">{getInitials(post.author)}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-200">{post.author}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {formatDate(post.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Post Title and Content */}
                    <button
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                      className="text-lg font-bold text-slate-100 mb-2 hover:text-empulsePrimary transition text-left w-full"
                    >
                      {post.title}
                    </button>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.content}</p>

                    {/* Post Stats */}
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <button 
                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        className="flex items-center gap-1 hover:text-empulsePrimary transition">
                        <MessageCircle className="w-4 h-4" />
                        {(post.comments || []).length} respuestas
                      </button>
                      <button 
                        onClick={() => handleLike(post)}
                        className={`flex items-center gap-1 transition ${
                          post.user_has_liked
                            ? "text-red-500 font-semibold"
                            : "text-slate-500 hover:text-empulsePrimary"
                        }`}
                      >
                        <Heart 
                          className="w-4 h-4" 
                          fill={post.user_has_liked ? "currentColor" : "none"}
                        />
                        {post.likes} likes
                      </button>
                      <button 
                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        className="flex items-center gap-1 hover:text-empulsePrimary transition ml-auto">
                        <Reply className="w-4 h-4" />
                        Ver más
                      </button>
                    </div>

                    {/* Expanded View */}
                    {expandedPost === post.id && (
                      <div className="mt-6 pt-6 border-t border-empulseAccent/20">
                        <p className="text-slate-300 mb-6">{post.content}</p>

                        {/* Share & Export Buttons */}
                        <div className="mb-6 flex flex-wrap gap-3">
                          <div className="flex-1">
                            <ShareButtons 
                              title={post.title}
                              url={`${window.location.href}#post-${post.id}`}
                              description={post.content.substring(0, 100)}
                            />
                          </div>
                          <ExportPDF 
                            title={post.title}
                            content={`<h2>${post.title}</h2><p>${post.content}</p><p><strong>Categoría:</strong> ${post.category}</p><p><strong>Autor:</strong> ${post.author}</p>`}
                            author={post.author}
                            date={new Date(post.created_at).toLocaleDateString('es-ES')}
                            buttonSize="sm"
                          />
                        </div>

                        {/* Comments Section */}
                        {(post.comments || []).length > 0 && (
                          <div className="mb-6 space-y-4">
                            <h4 className="font-semibold text-slate-200">Respuestas ({(post.comments || []).length})</h4>
                            {(post.comments || []).map(comment => (
                              <div key={comment.id} className="bg-dark-bg-secondary/30 border border-empulseAccent/10 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  {comment.author_avatar ? (
                                    <img 
                                      src={comment.author_avatar} 
                                      alt={comment.author}
                                      className="w-8 h-8 rounded-full object-cover border border-empulsePrimary/50"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 bg-empulsePrimary/20 border border-empulsePrimary/50 rounded-full flex items-center justify-center">
                                      <span className="text-xs font-bold text-empulsePrimary">{getInitials(comment.author)}</span>
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-semibold text-slate-200 text-sm">{comment.author}</p>
                                    <p className="text-xs text-slate-500">{formatDate(comment.created_at)}</p>
                                  </div>
                                </div>
                                <p className="text-slate-300 text-sm mb-3">{comment.content}</p>
                                <button 
                                  onClick={() => handleCommentLike(post.id, comment)}
                                  className={`flex items-center gap-1 text-xs transition ${
                                    comment.user_has_liked
                                      ? "text-red-500 font-semibold"
                                      : "text-slate-500 hover:text-empulsePrimary"
                                  }`}
                                >
                                  <Heart 
                                    className="w-3 h-3" 
                                    fill={comment.user_has_liked ? "currentColor" : "none"}
                                  />
                                  {comment.likes || 0} likes
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Form */}
                        {showReplyForm === post.id ? (
                          <div className="mb-4 space-y-2">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Escribe tu respuesta aquí..."
                              rows="3"
                              style={{ backgroundColor: '#021922' }}
                              className="w-full border border-empulseAccent/30 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-empulsePrimary transition resize-none"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAddReply(post.id)}
                                className="flex-1 bg-empulsePrimary text-dark-bg font-semibold py-2 px-4 rounded-lg hover:bg-empulseMid transition"
                              >
                                Responder
                              </button>
                              <button
                                onClick={() => {
                                  setShowReplyForm(null);
                                  setReplyText("");
                                }}
                                className="flex-1 bg-slate-700/50 text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600/50 transition"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowReplyForm(post.id)}
                            className="w-full bg-empulsePrimary/20 border border-empulsePrimary/50 text-empulsePrimary font-semibold py-2 px-4 rounded-lg hover:bg-empulsePrimary/30 transition"
                          >
                            Añadir respuesta
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No se encontraron posts</p>
                </div>
              )}
            </div>
          </div>
        </div>
          </>
        )}

        {/* Modal: Crear Post */}
        {showNewPost && (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div style={{ backgroundColor: '#021922' }} className="rounded-lg max-w-2xl w-full border border-empulseAccent/40 p-8">
            <h2 className="text-2xl font-bold text-empulsePrimary mb-6">Crear Nuevo Post</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Categoría</label>
                <select 
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  style={{ backgroundColor: '#021922' }} 
                  className="w-full border border-empulseAccent/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empulsePrimary transition">
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Título</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Ej: ¿Cómo manejas el cansancio?"
                  style={{ backgroundColor: '#021922' }}
                  className="w-full border border-empulseAccent/30 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-empulsePrimary transition"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Contenido</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Comparte tu experiencia, pregunta o consejo..."
                  rows="6"
                  style={{ backgroundColor: '#021922' }}
                  className="w-full border border-empulseAccent/30 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-empulsePrimary transition resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowNewPost(false)}
                className="flex-1 bg-slate-700/50 text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600/50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreatePost}
                className="flex-1 bg-empulsePrimary text-dark-bg font-semibold py-2 px-4 rounded-lg hover:bg-empulseMid transition"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
