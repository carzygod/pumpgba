import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Home, 
  Library, 
  User, 
  Download,
  Menu,
  X
} from 'lucide-react';

const Header: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Games', href: '/games', icon: Library },
    { name: 'Dashboard', href: '/dashboard', icon: User },
    { name: 'Extensions', href: '/extensions', icon: Download },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-gaming-dark/95 backdrop-blur-md border-b-2 border-green-forest"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Gamepad2 className="w-8 h-8 text-green-neon group-hover:text-green-lime transition-colors duration-300" />
                <div className="absolute inset-0 bg-green-neon/20 rounded-full blur-xl group-hover:bg-green-lime/30 transition-all duration-300"></div>
              </div>
              <div className="font-gaming text-xl font-bold">
                <span className="text-green-neon group-hover:text-green-lime transition-colors duration-300 text-glow">
                  Pump
                </span>
                <span className="text-green-lime group-hover:text-green-neon transition-colors duration-300">
                  GBA
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-code font-semibold
                      transition-all duration-300 relative group
                      ${
                        isActive
                          ? 'text-green-neon bg-green-forest/20 border border-green-forest'
                          : 'text-green-lime hover:text-green-neon hover:bg-green-forest/10'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-green-forest/10 rounded-lg border border-green-forest"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {connected && publicKey && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-green-forest/20 rounded-lg border border-green-forest"
              >
                <div className="w-2 h-2 bg-green-neon rounded-full animate-pulse-green"></div>
                <span className="font-code text-sm text-green-lime">
                  {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
                </span>
              </motion.div>
            )}
            
            <div className="wallet-button-container">
              <WalletMultiButton className="!bg-button-gradient hover:!bg-button-gradient-hover" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-green-lime hover:text-green-neon transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          initial={false}
          animate={{ 
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg font-code font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? 'text-green-neon bg-green-forest/20 border border-green-forest'
                        : 'text-green-lime hover:text-green-neon hover:bg-green-forest/10'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;