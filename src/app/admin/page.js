'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Plus,
  Edit,
  Trash2,
  Upload,
  ArrowLeft,
  Check,
  Sparkles,
  Eye,
  Images,
  Save,
  MoveUp,
  MoveDown,
  X,
  Building2,
  Lock,
  KeyRound,
  LogOut,
  Palette,
  Moon,
  Sun,
  Film,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import initialProjects from '@/data/projects.json';
import initialCompany from '@/data/company.json';

const ADMIN_PASSWORD = 'mezz2026';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [projects, setProjects] = useState(initialProjects);
  const [activeTheme, setActiveTheme] = useState(initialCompany.activeTheme || 'noir');
  const [editingProject, setEditingProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Check saved session
  useEffect(() => {
    const savedAuth = localStorage.getItem('mezz_admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Fetch live data
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data?.projects?.length) setProjects(data.projects);
      })
      .catch(() => {});

    fetch('/api/theme')
      .then((res) => res.json())
      .then((data) => {
        if (data?.activeTheme) setActiveTheme(data.activeTheme);
      })
      .catch(() => {});
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError(false);
      localStorage.setItem('mezz_admin_authenticated', 'true');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#DFC29A', '#FFFFFF'],
      });
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mezz_admin_authenticated');
    setPasswordInput('');
  };

  const handleThemeChange = async (themeId) => {
    setActiveTheme(themeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mezz_public_theme', themeId);
      document.cookie = `mezz_public_theme=${themeId}; path=/; max-age=31536000; SameSite=Lax`;
    }
    try {
      await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: themeId }),
      });
    } catch (err) {}
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEditClick = (project) => {
    setEditingProject({ ...project, images: [...(project.images || [])] });
    setIsNewProject(false);
  };

  const handleAddNewClick = () => {
    const newProj = {
      id: `project-${Date.now()}`,
      slug: `new-development-${Date.now().toString().slice(-4)}`,
      title: 'New Luxury Development',
      subtitle: 'Residential Architecture',
      category: 'Residential',
      location: 'Melbourne VIC',
      client: 'Private Client',
      year: '2025',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      description: 'A bespoke modern architectural development crafted with thoughtful contemporary spatial design.',
      features: ['Abundant natural lighting', 'High-end interior fixtures', 'Bespoke architectural layout'],
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      ],
    };
    setEditingProject(newProj);
    setIsNewProject(true);
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to remove this project from your website?')) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      persistProjects(updated);
    }
  };

  const handleSaveProjectModal = () => {
    let updated;
    if (isNewProject) {
      updated = [editingProject, ...projects];
    } else {
      updated = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    }
    setProjects(updated);
    persistProjects(updated);
    setEditingProject(null);
  };

  const persistProjects = async (updatedProjects) => {
    setIsSaving(true);
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: updatedProjects }),
      });
      setIsSaving(false);
      setSaveSuccess(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#DFC29A', '#FFFFFF'],
      });
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setIsSaving(false);
    }
  };

  // Image Upload Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditingProject({
          ...editingProject,
          heroImage: editingProject.images.length === 0 ? data.url : editingProject.heroImage,
          images: [...(editingProject.images || []), data.url],
        });
      }
    } catch (err) {
      alert('Could not upload image directly; you can also paste any image URL.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl) return;
    setEditingProject({
      ...editingProject,
      heroImage: editingProject.images.length === 0 ? newImageUrl : editingProject.heroImage,
      images: [...(editingProject.images || []), newImageUrl],
    });
    setNewImageUrl('');
  };

  const handleRemoveImage = (idx) => {
    const updatedImages = editingProject.images.filter((_, i) => i !== idx);
    setEditingProject({
      ...editingProject,
      heroImage: updatedImages[0] || '',
      images: updatedImages,
    });
  };

  const handleMoveImage = (idx, direction) => {
    const images = [...editingProject.images];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const temp = images[idx];
    images[idx] = images[targetIdx];
    images[targetIdx] = temp;
    setEditingProject({
      ...editingProject,
      heroImage: images[0],
      images,
    });
  };

  // 1. Password Protection Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center p-6 selection:bg-[#C5A880] selection:text-black">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel border border-neutral-800 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#C5A880]">
              Mezz Group
            </div>
            <h1 className="text-2xl font-serif text-white mt-1">CMS Studio Login</h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Enter your admin password to manage website content and photos.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                />
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/30 text-red-300 text-xs text-center">
                Incorrect password. Please try again.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#C5A880]/15 hover:scale-[1.01]"
            >
              Unlock Admin Studio
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800/80 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#DFC29A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#070708] text-[#F7F6F2] selection:bg-[#C5A880] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 glass-nav border-b border-neutral-800/80 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="View Live Website"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#C5A880]/10 text-[#C5A880]">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-serif text-white flex items-center gap-2">
                <span>Mezz Group Visual CMS Studio</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-sans uppercase tracking-wider">
                  Admin Active
                </span>
              </h1>
              <p className="text-xs text-neutral-400 font-light">
                Secure Content & Media Management Dashboard
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs">
              <Check className="w-3.5 h-3.5" />
              <span>Saved Successfully!</span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Preview Site</span>
          </Link>

          <button
            onClick={handleAddNewClick}
            className="px-4 py-2 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-[#C5A880]/10"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Studio Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-12">
        {/* Active Theme Selector Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-neutral-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] mb-2">
            <Palette className="w-4 h-4" />
            <span>Global Website Design Style</span>
          </div>
          <h2 className="text-2xl font-serif text-white mb-2">
            Active Public Theme
          </h2>
          <p className="text-xs text-neutral-400 max-w-xl mb-6">
            Choose the visual style displayed to public visitors on <span className="text-[#DFC29A]">plan11.co</span>. Only admins can change this setting.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Option 1: Noir */}
            <button
              onClick={() => handleThemeChange('noir')}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeTheme === 'noir'
                  ? 'border-[#C5A880] bg-[#C5A880]/10 shadow-lg shadow-[#C5A880]/10'
                  : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-black border border-white/10 text-[#C5A880]">
                  <Moon className="w-5 h-5" />
                </div>
                {activeTheme === 'noir' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C5A880] text-black text-[9px] uppercase font-bold tracking-wider">
                    Active Live
                  </span>
                )}
              </div>
              <div>
                <div className="text-base font-serif text-white">Noir Atelier</div>
                <div className="text-[11px] text-neutral-400 font-light mt-1">
                  Dark Luxury Obsidian & Champagne Gold
                </div>
              </div>
            </button>

            {/* Option 2: Minimalist */}
            <button
              onClick={() => handleThemeChange('minimalist')}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeTheme === 'minimalist'
                  ? 'border-white bg-white/10 shadow-lg'
                  : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-white text-black">
                  <Sun className="w-5 h-5" />
                </div>
                {activeTheme === 'minimalist' && (
                  <span className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] uppercase font-bold tracking-wider">
                    Active Live
                  </span>
                )}
              </div>
              <div>
                <div className="text-base font-serif text-white">Editorial Gallery</div>
                <div className="text-[11px] text-neutral-400 font-light mt-1">
                  Clean Off-White Scandinavian & Architectural
                </div>
              </div>
            </button>

            {/* Option 3: Cinematic */}
            <button
              onClick={() => handleThemeChange('cinematic')}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeTheme === 'cinematic'
                  ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-400/10'
                  : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  <Film className="w-5 h-5" />
                </div>
                {activeTheme === 'cinematic' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-black text-[9px] uppercase font-bold tracking-wider">
                    Active Live
                  </span>
                )}
              </div>
              <div>
                <div className="text-base font-serif text-white">Horizon Cinematic</div>
                <div className="text-[11px] text-neutral-400 font-light mt-1">
                  Fullscreen Horizon Slider & Widescreen Reel
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Portfolio Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif text-white">Portfolio Projects ({projects.length})</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Click "Edit" on any development to update copy, specs, and upload new photos.
              </p>
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-5 rounded-2xl glass-panel border border-neutral-800/80 flex flex-col justify-between hover:border-[#C5A880]/40 transition-all group"
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-white/5">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#DFC29A] text-[10px] uppercase tracking-wider">
                      {project.category}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] flex items-center gap-1">
                      <Images className="w-3 h-3 text-[#C5A880]" />
                      <span>{project.images?.length || 1} Photos</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#DFC29A] uppercase tracking-wider font-light">
                    {project.subtitle}
                  </div>
                  <h3 className="text-xl font-serif text-white mt-0.5">{project.title}</h3>
                  <p className="text-xs text-neutral-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">{project.location}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleEditClick(project)}
                      className="px-3 py-1.5 rounded-lg bg-[#C5A880]/10 hover:bg-[#C5A880] text-[#DFC29A] hover:text-black border border-[#C5A880]/30 text-xs font-medium flex items-center gap-1.5 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Edit / Add Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111114] border border-neutral-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">
                  {isNewProject ? 'Add Development' : 'Editing Project'}
                </span>
                <h3 className="text-2xl font-serif text-white mt-0.5">{editingProject.title}</h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* General Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Childcare">Childcare</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingProject.subtitle || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, subtitle: e.target.value })
                    }
                    placeholder="e.g. 8 Luxury Townhouses"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, location: e.target.value })
                    }
                    placeholder="e.g. Glen Iris VIC"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, year: e.target.value })
                    }
                    placeholder="e.g. 2025"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Project Description
                </label>
                <textarea
                  rows={4}
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>

              {/* Photo Gallery & Upload Section */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-serif text-white">Project Photo Gallery</h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Upload new photos, re-order images, or set cover photo.
                    </p>
                  </div>

                  <label className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Add by URL input */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Or paste an image URL here..."
                    className="flex-1 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2 rounded-xl bg-[#C5A880]/10 hover:bg-[#C5A880] text-[#DFC29A] hover:text-black border border-[#C5A880]/30 text-xs font-medium transition-all"
                  >
                    Add URL
                  </button>
                </div>

                {/* Photos List / Re-ordering */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {editingProject.images?.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group"
                    >
                      <img src={img} alt="gallery" className="w-full h-24 object-cover" />
                      {idx === 0 && (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#C5A880] text-black font-semibold text-[9px] uppercase">
                          Cover
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        {idx > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, -1)}
                            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs"
                            title="Move Left"
                          >
                            <MoveUp className="w-3 h-3 -rotate-90" />
                          </button>
                        )}
                        {idx < editingProject.images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, 1)}
                            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs"
                            title="Move Right"
                          >
                            <MoveDown className="w-3 h-3 -rotate-90" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-1 rounded bg-red-950/80 hover:bg-red-800 text-red-300 text-xs"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-6 mt-8 border-t border-neutral-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-5 py-2.5 rounded-full border border-neutral-800 text-neutral-400 hover:text-white text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProjectModal}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-[#C5A880]/20"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save & Publish'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
