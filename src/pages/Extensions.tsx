import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Chrome, 
  Zap, 
  Shield, 
  Gamepad2, 
  Star, 
  CheckCircle, 
  ExternalLink,
  Save,
  Settings,
  Maximize
} from 'lucide-react';

const Extensions: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Performance Boost",
      description: "Optimized emulation engine for smoother 60fps gaming experience with reduced input lag"
    },
    {
      icon: Save,
      title: "Enhanced Save States",
      description: "Quick save and load states with multiple slots and automatic backup functionality"
    },
    {
      icon: Settings,
      title: "Advanced Controls",
      description: "Customizable keyboard shortcuts, gamepad support, and touch controls for mobile"
    },
    {
      icon: Maximize,
      title: "Fullscreen Mode",
      description: "Immersive fullscreen gaming with scanline effects and CRT filters for authentic retro feel"
    },
    {
      icon: Shield,
      title: "Wallet Integration",
      description: "Seamless Solana wallet connectivity with secure transaction handling and game ownership"
    },
    {
      icon: Gamepad2,
      title: "Game Library Sync",
      description: "Synchronize your game library, favorites, and progress across all your devices"
    }
  ];

  const installSteps = [
    {
      step: 1,
      title: "Download Extension",
      description: "Click the download button below to get the PumpGBA extension package"
    },
    {
      step: 2,
      title: "Open Chrome Extensions",
      description: "Navigate to chrome://extensions/ in your Chrome browser"
    },
    {
      step: 3,
      title: "Enable Developer Mode",
      description: "Toggle on 'Developer mode' in the top right corner"
    },
    {
      step: 4,
      title: "Load Extension",
      description: "Click 'Load unpacked' and select the downloaded extension folder"
    }
  ];

  const handleDownload = () => {
    // Create a zip file with extension files
    const link = document.createElement('a');
    link.href = '/extension/manifest.json'; // This would be a zip file in production
    link.download = 'pumpgba-extension.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // In a real implementation, this would download a proper zip file
    alert('Extension download started! Check the installation guide below.');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-gaming text-4xl md:text-6xl font-bold text-green-neon mb-6 text-glow-strong">
            PumpGBA Extension
          </h1>
          <p className="text-xl text-green-lime font-code max-w-3xl mx-auto mb-8">
            Enhance your gaming experience with our powerful Chrome extension. 
            Get advanced features, better performance, and seamless wallet integration.
          </p>
          
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gaming text-lg px-8 py-4 inline-flex items-center space-x-3 group"
          >
            <Download className="w-6 h-6 group-hover:animate-bounce" />
            <span>Download Extension</span>
            <Chrome className="w-6 h-6" />
          </motion.button>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm font-code text-green-forest">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-lime" />
              <span>Chrome Compatible</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-lime" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-lime" />
              <span>Secure</span>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-gaming text-3xl md:text-4xl font-bold text-green-neon mb-8 text-center text-glow">
            Enhanced Gaming Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="card-gaming group cursor-pointer"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-forest/20 rounded-lg flex items-center justify-center group-hover:bg-green-forest/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-green-lime group-hover:text-green-neon transition-colors duration-300" />
                    </div>
                    <h3 className="font-gaming text-lg font-bold text-green-neon group-hover:text-glow transition-all duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-green-forest group-hover:text-green-lime transition-colors duration-300 font-code text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Installation Guide */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-gaming text-3xl md:text-4xl font-bold text-green-neon mb-8 text-center text-glow">
            Installation Guide
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {installSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card-gaming text-center group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 w-8 h-8 bg-green-forest/20 rounded-full flex items-center justify-center group-hover:bg-green-forest/30 transition-colors duration-300">
                  <span className="font-gaming text-sm font-bold text-green-lime">{step.step}</span>
                </div>
                
                <div className="mt-8 mb-4">
                  <h3 className="font-gaming text-lg font-bold text-green-neon mb-3 group-hover:text-glow transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-green-forest group-hover:text-green-lime transition-colors duration-300 font-code text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Extension Preview */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-gaming text-3xl md:text-4xl font-bold text-green-neon mb-8 text-center text-glow">
            Extension Preview
          </h2>
          
          <div className="card-gaming max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-gaming text-2xl font-bold text-green-neon mb-4">
                  Popup Interface
                </h3>
                <p className="text-green-forest font-code mb-6">
                  Quick access to all gaming features right from your browser toolbar. 
                  Connect wallets, launch games, and manage settings with ease.
                </p>
                
                <div className="space-y-3">
                  {[
                    "⚡ One-click game launch",
                    "🔗 Instant wallet connection",
                    "💾 Quick save state access",
                    "⚙️ Performance optimization toggle"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center space-x-2 text-green-lime font-code text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-lime" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gaming-darker border-2 border-green-forest rounded-lg p-6 shadow-gaming">
                  <div className="text-center">
                    <div className="font-gaming text-xl font-bold text-green-neon mb-2 text-glow">
                      PumpGBA
                    </div>
                    <div className="text-xs text-green-lime font-code mb-4">
                      Enhanced Gaming Experience
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-green-forest/20 rounded-lg p-3 border border-green-forest">
                        <div className="text-sm font-code text-green-lime font-semibold">⚡ Performance Boost</div>
                        <div className="text-xs text-green-forest">Optimized emulation for smoother gameplay</div>
                      </div>
                      
                      <div className="bg-green-forest/20 rounded-lg p-3 border border-green-forest">
                        <div className="text-sm font-code text-green-lime font-semibold">💾 Save States</div>
                        <div className="text-xs text-green-forest">Save and load game progress anywhere</div>
                      </div>
                      
                      <button className="w-full bg-button-gradient hover:bg-button-gradient-hover text-gaming-dark py-2 px-4 rounded-lg font-code font-semibold text-sm transition-colors duration-300">
                        Open PumpGBA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center bg-green-forest/5 py-16 px-6 rounded-2xl"
        >
          <h2 className="font-gaming text-3xl md:text-4xl font-bold text-green-neon mb-6 text-glow">
            Ready to Enhance Your Gaming?
          </h2>
          <p className="text-xl text-green-lime font-code mb-8 max-w-2xl mx-auto">
            Download the PumpGBA extension now and experience retro gaming like never before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gaming text-lg px-8 py-4 inline-flex items-center space-x-3 group"
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>Download Extension</span>
            </motion.button> */}
            
            <a
              href="https://github.com" // Would link to actual GitHub repo
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gaming bg-transparent border-green-lime text-green-lime hover:bg-green-lime hover:text-gaming-dark text-lg px-8 py-4 inline-flex items-center space-x-3 group"
            >
              <ExternalLink className="w-5 h-5 group-hover:animate-pulse" />
              <span>View Source Code</span>
            </a>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm font-code text-green-forest">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-green-lime" />
              <span>10K+ Downloads</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-lime" />
              <span>Open Source</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Extensions;