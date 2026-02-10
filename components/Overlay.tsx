
import React, { useState, useEffect } from 'react';
import { useScroll } from '@react-three/drei';

interface OverlayProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => (
  <section id={id} className={`min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-20 ${className}`}>
    {children}
  </section>
);

const Overlay: React.FC<OverlayProps> = ({ theme, toggleTheme }) => {
  const scroll = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      if (scroll.el) {
        // Show button if we've scrolled more than half a viewport height
        setShowBackToTop(scroll.el.scrollTop > window.innerHeight * 0.5);
      }
    };

    const scrollEl = scroll.el;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
    }
    return () => scrollEl?.removeEventListener('scroll', handleScroll);
  }, [scroll.el]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element && scroll.el) {
      scroll.el.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleLogoClick = () => {
    if (scroll.el) {
      scroll.el.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const themeClasses = {
    text: isDark ? 'text-white' : 'text-gray-900',
    subtext: isDark ? 'text-gray-300' : 'text-gray-600',
    navLink: isDark ? 'hover:text-blue-400' : 'hover:text-blue-600',
    border: isDark ? 'border-white/10' : 'border-black/10',
    card: isDark ? 'bg-white/5' : 'bg-black/5',
    stroke: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    accent: 'text-blue-500'
  };

  return (
    <div className={`w-full transition-colors duration-1000 pointer-events-none select-none ${themeClasses.text}`}>
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 sm:p-6 md:p-10 z-[100] pointer-events-auto">
        <div 
          className="syne font-extrabold text-xl sm:text-2xl tracking-tighter uppercase group cursor-pointer"
          onClick={handleLogoClick}
        >
          MIHJI<span className={`${themeClasses.accent} group-hover:animate-ping inline-block ml-1`}>.</span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-12">
          <div className="hidden sm:flex gap-6 md:gap-12 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold syne">
            <a href="#stack" onClick={(e) => handleNavClick(e, 'stack')} className={`${themeClasses.navLink} transition-all duration-300`}>Stack</a>
            <a href="#capabilities" onClick={(e) => handleNavClick(e, 'capabilities')} className={`${themeClasses.navLink} transition-all duration-300`}>Capabilities</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`${themeClasses.navLink} transition-all duration-300`}>Contact</a>
          </div>

          <button 
            onClick={toggleTheme}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${themeClasses.border} hover:scale-110`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="items-start">
        <div className="overflow-hidden">
          <h1 className="text-4xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.9] sm:leading-[0.85] tracking-tighter syne uppercase">
            Mihji George<br />Chaka
          </h1>
        </div>
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            <p className={`max-w-sm text-[11px] sm:text-xs md:text-sm leading-relaxed font-medium uppercase tracking-[0.1em] syne ${themeClasses.subtext}`}>
              Fullstack Architect & Software Developer. Translating complex logic into elegant digital realities.
            </p>
            <div className={`h-[1px] w-12 hidden md:block ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
            <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest animate-pulse ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Available for Innovations</span>
        </div>
      </Section>

      {/* Identity Section */}
      <Section className="items-end text-right">
        <div className="mb-4">
            <span className={`${themeClasses.accent} text-[10px] sm:text-xs font-bold tracking-[0.5em] uppercase syne`}>The Persona</span>
        </div>
        <h2 className={`text-4xl sm:text-7xl md:text-9xl font-bold tracking-tighter syne uppercase opacity-20 pointer-events-none mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
          Fullstack
        </h2>
        <div className="flex flex-col items-end gap-4">
            <p className={`max-w-md text-sm sm:text-base md:text-lg font-light leading-relaxed syne ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              I am a programmer driven by the elegance of code. From robust backends in <span className={`font-bold underline decoration-blue-500/50 ${themeClasses.text}`}>C#</span> and <span className={`font-bold underline decoration-blue-500/50 ${themeClasses.text}`}>PHP</span> to cinematic interfaces with <span className={`font-bold underline decoration-blue-500/50 ${themeClasses.text}`}>Three.js</span>.
            </p>
            <p className={`max-w-xs text-[9px] sm:text-[10px] font-mono uppercase tracking-widest leading-loose ${themeClasses.subtext}`}>
              Software Developer / Programmer / Creative Engineer.
            </p>
        </div>
      </Section>

      {/* Stack Section */}
      <Section id="stack" className="items-center text-center">
        <div className={`group relative border p-6 sm:p-12 md:p-32 backdrop-blur-xl pointer-events-auto transition-all duration-700 overflow-hidden w-full ${themeClasses.border} ${isDark ? 'hover:border-white/30' : 'hover:border-black/30'}`}>
          <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
          
          <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} text-[10px] sm:text-xs font-bold tracking-[0.5em] uppercase syne mb-8 md:mb-10 block`}>Core Arsenal</span>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-16 mb-8 md:mb-12">
            {['C#', 'PHP', 'JavaScript', 'HTML5 & CSS3', 'Three.js', 'React'].map((lang) => (
                <div key={lang} className="group/item">
                    <h3 className={`text-base sm:text-xl md:text-3xl font-bold syne uppercase tracking-tighter transition-colors ${themeClasses.text} ${isDark ? 'group-hover/item:text-blue-400' : 'group-hover/item:text-blue-600'}`}>
                        {lang}
                    </h3>
                    <div className={`w-0 group-hover/item:w-full h-[1px] bg-blue-500 transition-all duration-500 mt-2 mx-auto`}></div>
                </div>
            ))}
          </div>

          <p className={`max-w-md mx-auto text-[10px] sm:text-xs md:text-sm font-medium tracking-wide uppercase leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Specializing in high-performance application architecture and immersive web experiences.
          </p>
        </div>
      </Section>

      {/* Offerings Section */}
      <Section id="capabilities" className="items-start">
        <span className={`${themeClasses.accent} text-[10px] sm:text-xs font-bold tracking-[0.5em] uppercase syne mb-6`}>Capabilities</span>
        <h2 className={`text-4xl sm:text-6xl md:text-[8rem] font-black syne uppercase leading-[0.9] mb-8 md:mb-12 ${themeClasses.text}`}>
          What I<br /><span className="text-transparent stroke-1" style={{ WebkitTextStroke: `2px ${themeClasses.stroke}` }}>Offer</span>
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 w-full">
            {[
                { title: 'Fullstack Development', desc: 'Scalable systems and robust backend architectures tailored for performance and security.' },
                { title: 'Interactive Design', desc: '3D Immersive environments that bridge the gap between static content and user engagement.' },
                { title: 'Software Solutions', desc: 'Custom tools and enterprise software development using modern frameworks and languages.' },
                { title: 'Logic Optimization', desc: 'Refining complex algorithms and improving system efficiency across the entire stack.' }
            ].map((item, idx) => (
                <div key={idx} className={`space-y-3 sm:space-y-4 p-4 sm:p-6 border-l border-blue-500/30 backdrop-blur-sm ${themeClasses.card}`}>
                    <h4 className={`${isDark ? 'text-blue-400' : 'text-blue-600'} font-bold uppercase tracking-widest text-[9px] sm:text-xs`}>0{idx+1} / {item.title}</h4>
                    <p className={`${isDark ? 'text-gray-100' : 'text-gray-800'} text-[11px] sm:text-sm leading-relaxed syne uppercase font-medium`}>{item.desc}</p>
                </div>
            ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="items-start">
        <h2 className={`text-4xl sm:text-7xl md:text-[10rem] font-black syne uppercase text-transparent`} style={{ WebkitTextStroke: `1px ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'}` }}>
          Contact
        </h2>
        <div className="mt-8 md:mt-16 flex flex-col gap-4 md:gap-6 text-2xl sm:text-4xl md:text-6xl font-bold syne pointer-events-auto">
          {[
            { name: 'LinkedIn', url: 'https://linkedin.com' },
            { name: 'Github', url: 'https://github.com' },
            { name: 'Twitter', url: 'https://twitter.com' },
            { name: 'Email Me', url: 'mailto:mihji.chaka@example.com' }
          ].map((link, idx) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 transition-all duration-500 ${themeClasses.text} ${isDark ? 'hover:text-blue-500' : 'hover:text-blue-600'}`}
            >
              <span className={`text-[10px] sm:text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>/0{idx + 1}</span>
              {link.name}
            </a>
          ))}
        </div>
      </Section>

      <footer className={`h-[40vh] flex flex-col items-center justify-center border-t p-6 md:p-10 gap-6 md:gap-8 transition-colors duration-1000 ${isDark ? 'border-white/5 bg-[#010101]' : 'border-black/5 bg-[#f5f5f7]'}`}>
        <div className="flex flex-col items-center gap-2">
            <div className={`text-[10px] sm:text-xs tracking-[0.8em] uppercase ${isDark ? 'text-blue-500' : 'text-blue-600'} syne font-black mb-2`}>
                MIHJI
            </div>
            <div className={`text-[9px] sm:text-[10px] tracking-[0.4em] uppercase opacity-40 syne font-bold ${themeClasses.text}`}>
                Mihji George Chaka • Software Developer
            </div>
        </div>
        <div className={`text-[9px] sm:text-[10px] tracking-widest uppercase opacity-20 font-mono text-center ${themeClasses.text}`}>
          Building Digital Legacies Since 2025<br />
          40.7128° N, 74.0060° W
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={handleLogoClick}
        className={`fixed bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all duration-500 z-[100] pointer-events-auto ${showBackToTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'} ${themeClasses.border} ${isDark ? 'bg-black/40 hover:bg-white hover:text-black' : 'bg-white/40 hover:bg-black hover:text-white'}`}
        aria-label="Back to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="animate-bounce">
          <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>
      </button>
    </div>
  );
};

export default Overlay;
