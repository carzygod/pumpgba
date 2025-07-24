import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Clock, 
  Download,
  Play,
  Heart,
  TrendingUp
} from 'lucide-react';

interface Game {
  id: string;
  title: string;
  rom: string;
  developer: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  cover: string;
  category: string;
  size: string;
  plays: number;
}

const GameLibrary: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load games data
    fetch('/data/games.json')
      .then(response => response.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading games:', error);
        setLoading(false);
      });

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('pumpgba-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const genres = useMemo(() => {
    const allGenres = games.map(game => game.genre);
    return ['all', ...Array.from(new Set(allGenres))];
  }, [games]);

  const categories = useMemo(() => {
    const allCategories = games.map(game => game.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [games]);

  const filteredAndSortedGames = useMemo(() => {
    let filtered = games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.genre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre;
      const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
      
      return matchesSearch && matchesGenre && matchesCategory;
    });

    // Sort games
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.plays - a.plays);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year':
        filtered.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    return filtered;
  }, [games, searchTerm, selectedGenre, selectedCategory, sortBy]);

  const toggleFavorite = (gameId: string) => {
    const newFavorites = favorites.includes(gameId)
      ? favorites.filter(id => id !== gameId)
      : [...favorites, gameId];
    
    setFavorites(newFavorites);
    localStorage.setItem('pumpgba-favorites', JSON.stringify(newFavorites));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-forest border-t-green-neon rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-gaming text-4xl md:text-5xl font-bold text-green-neon mb-4 text-glow">
            Game Library
          </h1>
          <p className="text-green-lime font-code text-lg">
            Discover and play thousands of classic GBA games
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-gaming mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-green-lime font-code font-semibold mb-2">
                Search Games
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-forest w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, developer, or genre..."
                  className="w-full pl-10 pr-4 py-3 bg-gaming-darker border-2 border-green-forest rounded-lg text-green-lime font-code focus:border-green-lime focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-green-lime font-code font-semibold mb-2">
                Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-3 bg-gaming-darker border-2 border-green-forest rounded-lg text-green-lime font-code focus:border-green-lime focus:outline-none transition-colors duration-300"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-gaming-darker">
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-green-lime font-code font-semibold mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gaming-darker border-2 border-green-forest rounded-lg text-green-lime font-code focus:border-green-lime focus:outline-none transition-colors duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gaming-darker">
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-green-lime font-code font-semibold mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gaming-darker border-2 border-green-forest rounded-lg text-green-lime font-code focus:border-green-lime focus:outline-none transition-colors duration-300"
              >
                <option value="popular" className="bg-gaming-darker">Most Popular</option>
                <option value="rating" className="bg-gaming-darker">Highest Rated</option>
                <option value="name" className="bg-gaming-darker">Name (A-Z)</option>
                <option value="year" className="bg-gaming-darker">Newest First</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-green-forest font-code">
              Showing {filteredAndSortedGames.length} of {games.length} games
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-green-forest text-gaming-dark' 
                    : 'text-green-forest hover:text-green-lime'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-green-forest text-gaming-dark' 
                    : 'text-green-forest hover:text-green-lime'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Games Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }
          >
            {filteredAndSortedGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={viewMode === 'grid' ? 'game-card group' : 'game-card group flex'}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <>
                    <div className="relative overflow-hidden">
                      <img 
                        src={game.cover} 
                        alt={game.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Overlay Buttons */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-2">
                          <Link
                            to={`/play/${game.id}`}
                            className="bg-green-forest hover:bg-green-lime text-gaming-dark p-3 rounded-full transition-colors duration-300"
                          >
                            <Play className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => toggleFavorite(game.id)}
                            className={`p-3 rounded-full transition-colors duration-300 ${
                              favorites.includes(game.id)
                                ? 'bg-red-500 text-white'
                                : 'bg-gaming-dark/80 text-green-lime hover:bg-green-forest hover:text-gaming-dark'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${favorites.includes(game.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-gaming-dark/80 px-2 py-1 rounded-lg">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-green-lime text-sm font-code">{game.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-gaming text-lg font-bold text-green-neon mb-2 group-hover:text-glow transition-all duration-300">
                        {game.title}
                      </h3>
                      <p className="text-green-forest text-sm mb-2 font-code">
                        {game.developer} • {game.year}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-green-forest/20 text-green-lime px-2 py-1 rounded text-xs font-code">
                          {game.genre}
                        </span>
                        <div className="flex items-center space-x-1 text-green-forest text-xs font-code">
                          <TrendingUp className="w-3 h-3" />
                          <span>{game.plays.toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-green-forest text-sm line-clamp-2 font-code">
                        {game.description}
                      </p>
                    </div>
                  </>
                ) : (
                  // List View
                  <>
                    <div className="flex-shrink-0">
                      <img 
                        src={game.cover} 
                        alt={game.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-gaming text-xl font-bold text-green-neon mb-1 group-hover:text-glow transition-all duration-300">
                            {game.title}
                          </h3>
                          <p className="text-green-forest font-code">
                            {game.developer} • {game.year} • {game.genre}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-green-lime font-code">{game.rating}</span>
                        </div>
                      </div>
                      <p className="text-green-forest text-sm mb-3 font-code">
                        {game.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs font-code text-green-forest">
                          <span className="bg-green-forest/20 text-green-lime px-2 py-1 rounded">
                            {game.category}
                          </span>
                          <span>{game.size}</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>{game.plays.toLocaleString()} plays</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleFavorite(game.id)}
                            className={`p-2 rounded-lg transition-colors duration-300 ${
                              favorites.includes(game.id)
                                ? 'bg-red-500 text-white'
                                : 'text-green-lime hover:bg-green-forest/20'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(game.id) ? 'fill-current' : ''}`} />
                          </button>
                          <Link
                            to={`/play/${game.id}`}
                            className="bg-green-forest hover:bg-green-lime text-gaming-dark px-4 py-2 rounded-lg transition-colors duration-300 font-code font-semibold"
                          >
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredAndSortedGames.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-16 h-16 text-green-forest mx-auto mb-4" />
            <h3 className="font-gaming text-2xl font-bold text-green-lime mb-2">
              No Games Found
            </h3>
            <p className="text-green-forest font-code">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameLibrary;