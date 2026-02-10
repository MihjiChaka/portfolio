
import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import Scene from './components/Scene';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => setVisible(false), 1000);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f5f5f7]'}`}>
      {visible && (
        <div 
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${started ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f5f5f7]'}`}
        >
          <div className="relative group cursor-none">
             <h1 className={`text-7xl md:text-[12rem] font-extrabold mb-12 tracking-tighter syne uppercase animate-pulse ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              MIHJI
            </h1>
          </div>
          <button
            onClick={handleStart}
            className={`px-10 py-5 border transition-all duration-500 tracking-[0.3em] uppercase text-xs syne font-bold backdrop-blur-sm ${theme === 'dark' ? 'border-white/10 hover:border-white/40 hover:bg-white hover:text-black text-white' : 'border-black/10 hover:border-black/40 hover:bg-black hover:text-white text-black'}`}
          >
            Enter Experience
          </button>
        </div>
      )}

      {started && (
        <>
          <Canvas
            shadows
            gl={{ 
              antialias: true, 
              stencil: false, 
              depth: true,
              powerPreference: "high-performance" 
            }}
            dpr={[1, 2]}
            className="fixed inset-0"
          >
            <Suspense fallback={null}>
              {/* Reduced damping to 0.15 for faster, more responsive scrolling */}
              <ScrollControls pages={5} damping={0.15} infinite={false}>
                <Scene theme={theme} />
                <Scroll html>
                  <Overlay theme={theme} toggleTheme={toggleTheme} />
                </Scroll>
              </ScrollControls>
            </Suspense>
          </Canvas>
        </>
      )}
    </div>
  );
};

export default App;
