import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  User, 
  Gamepad2, 
  Heart, 
  Clock, 
  Star, 
  TrendingUp, 
  Download, 
  Wallet,
  History,
  Trophy,
  Play,
  Settings
} from 'lucide-react';

interface Game {
  id: string;
  title: string;
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

interface GameSession {
  gameId: string;
  title: string;
  cover: string;
  playTime: number;
  lastPlayed: Date;
}

const Dashboard: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [recentSessions, setRecentSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPlayTime: 0,
    gamesPlayed: 0,
    favoriteGames: 0,
    achievements: 0
  });

  useEffect(() => {
    // Load games data
    fetch('/data/games.json')
      .then(response => response.json())
      .then((gamesData: Game[]) => {
        setGames(gamesData);
        
        // Load favorites
        const savedFavorites = localStorage.getItem('pumpgba-favorites');
        let favoriteIds: string[] = [];
        if (savedFavorites) {
          favoriteIds = JSON.parse(savedFavorites);
          const favoriteGames = gamesData.filter(game => favoriteIds.includes(game.id));
          setFavorites(favoriteGames);
        }
        
        // Load recent sessions (mock data)
        const mockSessions: GameSession[] = [
          {
            gameId: 'pokemon-ruby',
            title: 'Pokémon Ruby',
            cover: "/img/1.jpg",
            playTime: 145,
            lastPlayed: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
          },
          {
            gameId: "kirby-and-the-amazing-mirror",
            title: "Kirby & the Amazing Mirror",
            cover: "/img/9.jpg",
            playTime: 89,
            lastPlayed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
          },
          {
            gameId: "final-fantasy-vi-advance",
            title: "Final Fantasy VI Advance",
            cover:  "/img/20.jpg",
            playTime: 67,
            lastPlayed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
          }
        ];
        setRecentSessions(mockSessions);
        
        // Calculate stats
        const totalPlayTime = mockSessions.reduce((total, session) => total + session.playTime, 0);
        setStats({
          totalPlayTime,
          gamesPlayed: mockSessions.length,
          favoriteGames: favoriteIds ? favoriteIds.length : 0,
          achievements: 12 // Mock achievements
        });
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      });
  }, []);

  const formatPlayTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatLastPlayed = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-forest/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-10 h-10 text-green-lime" />
          </div>
          <h2 className="font-gaming text-3xl font-bold text-green-neon mb-4 text-glow">
            Connect Your Wallet
          </h2>
          <p className="text-green-forest font-code text-lg mb-6">
            Connect your Solana wallet to access your gaming dashboard and track your progress.
          </p>
          <Link 
            to="/"
            className="btn-gaming inline-flex items-center space-x-2"
          >
            <User className="w-5 h-5" />
            <span>Go to Home</span>
          </Link>
        </motion.div>
      </div>
    );
  }

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
            Gaming Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-neon rounded-full animate-pulse-green"></div>
              <span className="text-green-lime font-code">
                Connected: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: Clock, label: 'Total Play Time', value: formatPlayTime(stats.totalPlayTime), color: 'text-blue-400' },
            { icon: Gamepad2, label: 'Games Played', value: stats.gamesPlayed.toString(), color: 'text-green-lime' },
            { icon: Heart, label: 'Favorite Games', value: stats.favoriteGames.toString(), color: 'text-red-400' },
            { icon: Trophy, label: 'Achievements', value: stats.achievements.toString(), color: 'text-yellow-400' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card-gaming text-center group cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-forest/20 rounded-full mb-4 group-hover:bg-green-forest/30 transition-colors duration-300">
                  <Icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className="font-gaming text-2xl font-bold text-green-neon mb-2 group-hover:text-glow transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-green-forest group-hover:text-green-lime transition-colors duration-300 font-code">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Games */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card-gaming">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-gaming text-2xl font-bold text-green-neon flex items-center space-x-2">
                  <Heart className="w-6 h-6" />
                  <span>Recommend Games</span>
                </h2>
                <Link 
                  to="/games"
                  className="text-green-lime hover:text-green-neon transition-colors duration-300 font-code text-sm"
                >
                  Browse All Games →
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <motion.div
                    key={session.gameId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gaming-darker rounded-lg border border-green-forest/30 hover:border-green-forest transition-colors duration-300 group"
                  >
                    <img 
                      src={session.cover}
                      alt={session.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-gaming text-lg font-bold text-green-neon group-hover:text-glow transition-all duration-300">
                        {session.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm font-code text-green-forest">
                        <span>Played: {formatPlayTime(session.playTime)}</span>
                        <span>Last: {formatLastPlayed(session.lastPlayed)}</span>
                      </div>
                    </div>
                    <Link
                      to={`/play/${session.gameId}`}
                      className="bg-green-forest hover:bg-green-lime text-gaming-dark p-3 rounded-lg transition-colors duration-300"
                    >
                      <Play className="w-5 h-5" />
                    </Link>
                  </motion.div>
                ))}
                
                {recentSessions.length === 0 && (
                  <div className="text-center py-8">
                    <Gamepad2 className="w-12 h-12 text-green-forest mx-auto mb-3" />
                    <p className="text-green-forest font-code">
                      No recent games. Start playing to see your history!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            {/* Favorite Games */}
            <div className="card-gaming">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-gaming text-xl font-bold text-green-neon flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Favorites</span>
                </h3>
                <span className="text-green-forest font-code text-sm">
                  {favorites.length} games
                </span>
              </div>
              
              <div className="space-y-3">
                {favorites.slice(0, 4).map((game) => (
                  <div key={game.id} className="flex items-center space-x-3 group">
                    <img 
                      src={game.cover}
                      alt={game.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-code text-sm font-semibold text-green-lime group-hover:text-green-neon transition-colors duration-300">
                        {game.title}
                      </div>
                      <div className="text-xs text-green-forest">
                        {game.genre}
                      </div>
                    </div>
                    <Link
                      to={`/play/${game.id}`}
                      className="text-green-forest hover:text-green-lime transition-colors duration-300"
                    >
                      <Play className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
                
                {favorites.length === 0 && (
                  <div className="text-center py-4">
                    <Heart className="w-8 h-8 text-green-forest mx-auto mb-2" />
                    <p className="text-green-forest font-code text-sm">
                      No favorites yet. Add some games!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-gaming">
              <h3 className="font-gaming text-xl font-bold text-green-neon mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/games"
                  className="w-full bg-green-forest hover:bg-green-lime text-gaming-dark py-3 px-4 rounded-lg transition-colors duration-300 font-code font-semibold text-center block"
                >
                  Browse Games
                </Link>
                <Link
                  to="/extensions"
                  className="w-full bg-gaming-card hover:bg-green-forest/20 text-green-lime py-3 px-4 rounded-lg transition-colors duration-300 font-code font-semibold text-center block border border-green-forest"
                >
                  Get Extension
                </Link>
                <button className="w-full bg-gaming-card hover:bg-green-forest/20 text-green-lime py-3 px-4 rounded-lg transition-colors duration-300 font-code font-semibold border border-green-forest">
                  Settings
                </button>
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="card-gaming">
              <h3 className="font-gaming text-xl font-bold text-green-neon mb-4 flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Recent Achievement</span>
              </h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="font-code text-sm font-semibold text-green-lime mb-1">
                  First Game Played
                </div>
                <div className="text-xs text-green-forest">
                  Started your gaming journey on PumpGBA
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;