import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Save, 
  Upload, 
  Settings, 
  Fullscreen, 
  Volume2, 
  ArrowLeft,
  Heart,
  Star,
  Download
} from 'lucide-react';
import EmulatorContainer from '@/components/EmulatorContainer';

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

const GamePlayer: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { connected } = useWallet();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [showSettings, setShowSettings] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const emulatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load game data
    fetch('/data/games.json')
      .then(response => response.json())
      .then((games: Game[]) => {
        const foundGame = games.find(g => g.id === gameId);
        if (foundGame) {
          setGame(foundGame);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading game:', error);
        setLoading(false);
      });

    // Check if game is in favorites
    const savedFavorites = localStorage.getItem('pumpgba-favorites');
    if (savedFavorites && gameId) {
      const favorites = JSON.parse(savedFavorites);
      setIsFavorite(favorites.includes(gameId));
    }
  }, [gameId]);

  const toggleFavorite = () => {
    if (!gameId) return;
    
    const savedFavorites = localStorage.getItem('pumpgba-favorites');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    const newFavorites = isFavorite
      ? favorites.filter((id: string) => id !== gameId)
      : [...favorites, gameId];
    
    setIsFavorite(!isFavorite);
    localStorage.setItem('pumpgba-favorites', JSON.stringify(newFavorites));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if(!isPlaying)
    {
      //Handel play 
    }
    // In a real implementation, this would control the emulator
  };

  const handleReset = () => {
    // Reset the game
    console.log('Resetting game...');
  };

  const handleSaveState = () => {
    // Save game state
    console.log('Saving game state...');
  };

  const handleLoadState = () => {
    // Load game state
    console.log('Loading game state...');
    // console.log((window as any).EJS)
  };

  const handleFullscreen = () => {
    if (emulatorRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        emulatorRef.current.requestFullscreen();
      }
    }
  };


//   function setVolume(volume: number) {
//   const clamped = Math.min(100, Math.max(0, volume))
//   const normalized = clamped / 100
//   if ((window as any).EJS_audio) {
//     (window as any).EJS_audio.volume = normalized
//   }
// }


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

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-gaming text-2xl font-bold text-green-neon mb-4">
            Game Not Found
          </h2>
          <Link 
            to="/games"
            className="btn-gaming inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Library</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4">
      <div className="container mx-auto">
        {/* Game Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/games"
              className="inline-flex items-center space-x-2 text-green-lime hover:text-green-neon transition-colors duration-300 font-code"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Library</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isFavorite
                    ? 'bg-red-500 text-white'
                    : 'text-green-lime hover:bg-green-forest/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <div className="flex items-center space-x-1 bg-gaming-card px-3 py-2 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-green-lime font-code">{game.rating}</span>
              </div>
            </div>
          </div>
          
          <h1 className="font-gaming text-3xl md:text-4xl font-bold text-green-neon mb-2 text-glow">
            {game.title}
          </h1>
          <p className="text-green-lime font-code">
            {game.developer} • {game.year} • {game.genre}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Emulator Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-3"
          >
            <div className="card-gaming">
              {/* Emulator Display */}
              <div 
                ref={emulatorRef}
                className="relative bg-gaming-darker rounded-lg overflow-hidden mb-4"
                style={{ aspectRatio: '3/2' }}
              >
                {/* Mock Emulator Screen */}

{
  !isPlaying ? 

                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gaming-darker to-gaming-dark" style={{display:isPlaying?"none":""}}>
                  {!connected ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-forest/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-green-lime" />
                      </div>
                      <h3 className="font-gaming text-xl font-bold text-green-neon mb-2">
                        Connect Wallet to Play
                      </h3>
                      <p className="text-green-forest font-code">
                        Connect your Solana wallet to start gaming
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <img 
                        src={game.cover}
                        alt={game.title}
                        className="w-32 h-32 object-cover rounded-lg mx-auto mb-4 opacity-50"
                      />
                      <div className="font-gaming text-lg font-bold text-green-neon mb-2">
                        GBA Emulator Ready
                      </div>
                      <p className="text-green-forest font-code mb-4">
                        Click Play to start {game.title}
                      </p>
                      <button 
                        onClick={handlePlayPause}
                        className="btn-gaming inline-flex items-center space-x-2"
                      >
                        <Play className="w-5 h-5" />
                        <span>Start Game</span>
                      </button>
                    </div>
                  )}
                </div>

  :

                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gaming-darker to-gaming-dark" style={{display:isPlaying?"":"none"}}>

                  <div style={{backgroundColor:"black" , width:"100%",height:"100%"}}>
                    <EmulatorContainer
                      romPath={encodeURI(game.rom)} 
                      onBack={()=>{}}
                    />
                  </div>
                </div>
}
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'linear-gradient(transparent 50%, rgba(0, 255, 0, 0.02) 50%)',
                  backgroundSize: '100% 4px'
                }} />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handlePlayPause}
                    className="bg-green-forest hover:bg-green-lime text-gaming-dark p-3 rounded-lg transition-colors duration-300"
                    disabled={!connected}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  
                  <button 
                    onClick={handleReset}
                    className="bg-gaming-card hover:bg-green-forest/20 text-green-lime p-3 rounded-lg transition-colors duration-300"
                    disabled={!connected}
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={handleSaveState}
                    className="bg-gaming-card hover:bg-green-forest/20 text-green-lime p-3 rounded-lg transition-colors duration-300"
                    disabled={!connected}
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={handleLoadState}
                    className="bg-gaming-card hover:bg-green-forest/20 text-green-lime p-3 rounded-lg transition-colors duration-300"
                    disabled={!connected}
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5 text-green-lime" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => {
                        window.EJS_volume = Number(e.target.value)/100
                        setVolume(Number(e.target.value))
                      }}
                      className="w-20 h-2 bg-gaming-darker rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #228B22 0%, #228B22 ${volume}%, #1a1a1a ${volume}%, #1a1a1a 100%)`
                      }}
                    />
                    <span className="text-green-forest font-code text-sm w-8">{volume}%</span>
                  </div>
                  
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="bg-gaming-card hover:bg-green-forest/20 text-green-lime p-3 rounded-lg transition-colors duration-300"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={handleFullscreen}
                    className="bg-gaming-card hover:bg-green-forest/20 text-green-lime p-3 rounded-lg transition-colors duration-300"
                  >
                    <Fullscreen className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Settings Panel */}
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gaming-darker rounded-lg border border-green-forest"
                >
                  <h3 className="font-gaming text-lg font-bold text-green-neon mb-4">
                    Emulator Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-green-lime font-code font-semibold mb-2">
                        Speed
                      </label>
                      <select className="w-full px-3 py-2 bg-gaming-card border border-green-forest rounded-lg text-green-lime font-code">
                        <option>1x (Normal)</option>
                        <option>2x (Fast)</option>
                        <option>0.5x (Slow)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-green-lime font-code font-semibold mb-2">
                        Filter
                      </label>
                      <select className="w-full px-3 py-2 bg-gaming-card border border-green-forest rounded-lg text-green-lime font-code">
                        <option>Nearest (Pixelated)</option>
                        <option>Linear (Smooth)</option>
                        <option>CRT Effect</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Game Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Game Cover */}
            <div className="card-gaming text-center">
              <img 
                src={game.cover}
                alt={game.title}
                className="w-full rounded-lg mb-4"
              />
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-code">
                  <span className="text-green-forest">Size:</span>
                  <span className="text-green-lime">{game.size}</span>
                </div>
                <div className="flex justify-between text-sm font-code">
                  <span className="text-green-forest">Plays:</span>
                  <span className="text-green-lime">{game.plays.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-code">
                  <span className="text-green-forest">Category:</span>
                  <span className="text-green-lime capitalize">{game.category}</span>
                </div>
              </div>
            </div>

            {/* Game Description */}
            <div className="card-gaming">
              <h3 className="font-gaming text-lg font-bold text-green-neon mb-3">
                About This Game
              </h3>
              <p className="text-green-forest font-code text-sm leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Game Controls Guide */}
            <div className="card-gaming">
              <h3 className="font-gaming text-lg font-bold text-green-neon mb-3">
                Controls
              </h3>
              <div className="space-y-2 text-sm font-code">
                <div className="flex justify-between">
                  <span className="text-green-forest">D-Pad:</span>
                  <span className="text-green-lime">Arrow Keys</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-forest">A Button:</span>
                  <span className="text-green-lime">Z Key</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-forest">B Button:</span>
                  <span className="text-green-lime">X Key</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-forest">L/R:</span>
                  <span className="text-green-lime">A/S Keys</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-forest">Start:</span>
                  <span className="text-green-lime">Enter</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-forest">Select:</span>
                  <span className="text-green-lime">Shift</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-gaming">
              <h3 className="font-gaming text-lg font-bold text-green-neon mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/extensions"
                  className="w-full btn-gaming text-center inline-flex items-center justify-center space-x-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Get Extension</span>
                </Link>
                <button className="w-full bg-gaming-card hover:bg-green-forest/20 text-green-lime py-3 px-4 rounded-lg transition-colors duration-300 font-code text-sm">
                  Share Game
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;