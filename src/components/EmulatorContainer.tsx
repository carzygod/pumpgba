import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Maximize, Minimize, Settings, Volume2, VolumeX } from 'lucide-react'
// import TouchControls from './TouchControls'

interface EmulatorContainerProps {
  romPath: string | null
  onBack: () => void
}

// Declare EmulatorJS types
declare global {
  interface Window {
    EJS_player: string
    EJS_core: string
    EJS_gameUrl: string
    EJS_pathtodata: string
    EJS_startOnLoaded: boolean
    EJS_fullscreenOnLoad: boolean
    EJS_mobile: boolean
    EJS_VirtualGamepadSettings: any
    EJS_volume:number
  }
}

const EmulatorContainer = ({ romPath, onBack }: EmulatorContainerProps) => {
  const emulatorRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    if (!romPath || !emulatorRef.current) return
    // Configure EmulatorJS
    window.EJS_player = '#emulator'
    window.EJS_core = 'gba'
    window.EJS_gameUrl = romPath
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/'
    window.EJS_startOnLoaded = true
    window.EJS_mobile = true
    window.EJS_fullscreenOnLoad = false
    window.EJS_volume = 1

    
    
    // Mobile-optimized virtual gamepad settings
    window.EJS_VirtualGamepadSettings = {
      opacity: 0.8,
      scale: 1.2,
      hide: false
    }

    // Load EmulatorJS
    const script = document.createElement('script')
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js'
    script.onload = () => {
      setTimeout(() => setIsLoading(false), 2000)
    }
    document.head.appendChild(script)

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [romPath])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      emulatorRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // EmulatorJS audio control would go here
  }

  // Auto-hide controls on mobile after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const resetTimeout = () => {
      clearTimeout(timeout)
      setShowControls(true)
      timeout = setTimeout(() => setShowControls(false), 3000)
    }

    const handleInteraction = () => resetTimeout()
    
    window.addEventListener('touchstart', handleInteraction)
    window.addEventListener('click', handleInteraction)
    resetTimeout()

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('click', handleInteraction)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black relative" ref={emulatorRef}>
      {/* Header Controls */}
      <div className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white hover:bg-gray-700/80 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="p-3 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white hover:bg-gray-700/80 transition-all duration-200"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white hover:bg-gray-700/80 transition-all duration-200"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            
            <button className="p-3 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white hover:bg-gray-700/80 transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-white text-xl font-semibold mb-2">Loading Game...</h3>
            <p className="text-gray-400">Initializing GBA emulator</p>
          </div>
        </div>
      )}

      {/* Emulator Container */}
      <div className="w-full h-screen flex items-center justify-center">
        <div id="emulator" className="w-full h-full max-w-full max-h-full"></div>
      </div>

      {/* Touch Controls for Mobile */}
      {/* <TouchControls visible={showControls && !isFullscreen} /> */}
    </div>
  )
}

export default EmulatorContainer