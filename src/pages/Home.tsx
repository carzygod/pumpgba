import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  Gamepad2, 
  Zap, 
  Shield, 
  Download,
  Play,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';

const Home: React.FC = () => {
  const { connected } = useWallet();

  const features = [
    {
      icon: Gamepad2,
      title: "Thousands of Games",
      description: "Access a vast library of classic GBA games with high-quality emulation"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized emulation engine for smooth 60fps gaming experience"
    },
    {
      icon: Shield,
      title: "Solana Powered",
      description: "Secure wallet integration with Phantom, Solflare, and more"
    },
    {
      icon: Download,
      title: "Chrome Extension",
      description: "Enhanced gaming with our powerful browser extension"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Players", value: "50K+" },
    { icon: Gamepad2, label: "Games Available", value: "2,500+" },
    { icon: Play, label: "Hours Played", value: "1M+" },
    { icon: Star, label: "User Rating", value: "4.9" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/backgrounds/gaming_bg.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gaming-gradient opacity-90"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="font-gaming text-5xl md:text-7xl font-bold mb-6 text-glow-strong"
              animate={{ textShadow: [
                "0 0 10px #00FF00",
                "0 0 20px #00FF00, 0 0 30px #00FF00",
                "0 0 10px #00FF00"
              ]}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-green-neon">Pump</span>
              <span className="text-green-lime">GBA</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-green-lime mb-8 font-code"
            >
              The Ultimate Retro Gaming Experience
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-green-forest mb-12 max-w-2xl mx-auto font-code"
            >
              Connect your Solana wallet and dive into thousands of classic Game Boy Advance games. 
              Play instantly in your browser with our cutting-edge emulation technology.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                to="/games"
                className="btn-gaming text-lg px-8 py-4 inline-flex items-center space-x-2 group"
              >
                <Play className="w-5 h-5 group-hover:animate-pulse" />
                <span>Start Playing</span>
              </Link>
              
              <Link 
                to="/extensions"
                className="btn-gaming bg-transparent border-green-lime text-green-lime hover:bg-green-lime hover:text-gaming-dark text-lg px-8 py-4 inline-flex items-center space-x-2 group"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Get Extension</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Gaming Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-neon rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gaming-dark/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-forest/20 rounded-full mb-4 group-hover:bg-green-forest/30 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-green-lime group-hover:text-green-neon transition-colors duration-300" />
                  </div>
                  <div className="font-gaming text-3xl font-bold text-green-neon mb-2 group-hover:text-glow transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="font-code text-green-forest group-hover:text-green-lime transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-gaming text-4xl md:text-5xl font-bold text-green-neon mb-6 text-glow">
              Gaming Features
            </h2>
            <p className="text-xl text-green-lime font-code max-w-2xl mx-auto">
              Experience retro gaming like never before with our advanced features
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="card-gaming text-center group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-forest/20 rounded-full mb-6 group-hover:bg-green-forest/30 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-green-lime group-hover:text-green-neon transition-colors duration-300" />
                  </div>
                  <h3 className="font-gaming text-xl font-bold text-green-neon mb-4 group-hover:text-glow transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-green-forest group-hover:text-green-lime transition-colors duration-300 font-code">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-forest/5">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-gaming text-4xl md:text-5xl font-bold text-green-neon mb-6 text-glow">
              Ready to Game?
            </h2>
            <p className="text-xl text-green-lime mb-8 font-code max-w-2xl mx-auto">
              {connected 
                ? "Your wallet is connected! Start exploring our game library."
                : "Connect your Solana wallet to begin your retro gaming journey."
              }
            </p>
            <Link 
              to={connected ? "/games" : "/games"}
              className="btn-gaming text-lg px-8 py-4 inline-flex items-center space-x-2 group"
            >
              <Gamepad2 className="w-5 h-5 group-hover:animate-pulse" />
              <span>{connected ? "Browse Games" : "Explore Games"}</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;