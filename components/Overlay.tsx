
import React, { useState, useEffect } from 'react';
import { useScroll } from '@react-three/drei';

interface OverlayProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => (
  <section id={id} className={`min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-20 max-w-[1600px] mx-auto ${className}`}>
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

  const arsenal = [
    'C#', 'PHP', 'JavaScript', 
    'Three.js', 'React', 'Flutter', 
    'Kotlin', 'Ethical Hacking', 'IT Engineering',
    'Systems Design'
  ];

  return (
    <div className={`w-full transition-colors duration-1000 pointer-events-none select-none ${themeClasses.text}`}>
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 sm:p-8 lg:px-24 xl:px-32 z-[100] pointer-events-auto">
        <div 
          className="syne font-extrabold text-xl sm:text-2xl tracking-tighter uppercase group cursor-pointer"
          onClick={handleLogoClick}
        >
          MIHJI<span className={`${themeClasses.accent} group-hover:animate-ping inline-block ml-1`}>.</span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-10">
          <div className="hidden sm:flex gap-6 md:gap-12 text-[10px] uppercase tracking-[0.4em] font-bold syne">
            <a href="#stack" onClick={(e) => handleNavClick(e, 'stack')} className={`${themeClasses.navLink} transition-all duration-300`}>Stack</a>
            <a href="#capabilities" onClick={(e) => handleNavClick(e, 'capabilities')} className={`${themeClasses.navLink} transition-all duration-300`}>Offer</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`${themeClasses.navLink} transition-all duration-300`}>Contact</a>
          </div>

          <button 
            onClick={toggleTheme}
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all duration-500 ${themeClasses.border} hover:scale-110 active:scale-95 pointer-events-auto`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="items-start">
        <div className="overflow-hidden">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[13rem] font-black leading-[1] sm:leading-[0.85] tracking-tighter syne uppercase">
            Mihji George<br />Chaka
          </h1>
        </div>
        <div className="mt-8 md:mt-16 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
            <p className={`max-w-md text-sm md:text-lg leading-relaxed font-medium uppercase tracking-[0.05em] syne ${themeClasses.subtext}`}>
              Fullstack Architect & Creative Developer. Engineering immersive digital environments.
            </p>
            <div className={`h-[1px] w-16 hidden md:block ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
            <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] animate-pulse ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>STATUS: ACTIVE</span>
        </div>
      </Section>

      {/* Stack Section */}
      <Section id="stack" className="items-center text-center">
        <div className={`group relative border p-8 sm:p-16 lg:p-24 backdrop-blur-3xl pointer-events-auto transition-all duration-700 overflow-hidden w-full ${themeClasses.border} ${isDark ? 'hover:border-white/20' : 'hover:border-black/20'}`}>
          <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
          
          <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} text-[10px] sm:text-xs font-bold tracking-[0.6em] uppercase syne mb-12 block`}>The Arsenal</span>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 mb-12">
            {arsenal.map((lang) => (
                <div key={lang} className="group/item flex flex-col items-center">
                    <h3 className={`text-base sm:text-lg md:text-xl xl:text-2xl font-bold syne uppercase tracking-tighter transition-all duration-500 ${themeClasses.text} group-hover/item:text-blue-500 group-hover/item:scale-110`}>
                        {lang}
                    </h3>
                    <div className={`w-0 group-hover/item:w-8 h-[2px] bg-blue-500 transition-all duration-500 mt-3`}></div>
                </div>
            ))}
          </div>

          <p className={`max-w-2xl mx-auto text-xs sm:text-sm font-medium tracking-widest uppercase leading-loose opacity-60 ${themeClasses.text}`}>
            A comprehensive suite of technologies enabling enterprise-scale solutions and cinematic web experiences.
          </p>
        </div>
      </Section>

      {/* Offerings Section */}
      <Section id="capabilities" className="items-start">
        <span className={`${themeClasses.accent} text-[10px] sm:text-xs font-bold tracking-[0.5em] uppercase syne mb-8`}>Capabilities</span>
        <h2 className={`text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black syne uppercase leading-[0.9] mb-12 ${themeClasses.text}`}>
          Strategic<br /><span className="text-transparent stroke-1" style={{ WebkitTextStroke: `2px ${themeClasses.stroke}` }}>Delivery</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 w-full">
            {[
                { title: 'Cloud Engineering', desc: 'Designing resilient, distributed backends using C# and PHP optimized for massive concurrency.' },
                { title: 'Interactive Web', desc: 'Crafting immersive 3D experiences that drive user retention and brand prestige.' },
                { title: 'Mobile Ecosystems', desc: 'Developing cross-platform high-performance apps with Flutter and Kotlin.' },
                { title: 'Cyber Security', desc: 'Integrating ethical hacking principles to ensure architectures are hardened against modern threats.' }
            ].map((item, idx) => (
                <div key={idx} className={`group p-8 border-l-2 border-blue-500/20 backdrop-blur-md transition-all duration-500 hover:border-blue-500 ${themeClasses.card}`}>
                    <h4 className={`${isDark ? 'text-blue-400' : 'text-blue-600'} font-bold uppercase tracking-widest text-xs mb-4`}>0{idx+1} . {item.title}</h4>
                    <p className={`${isDark ? 'text-gray-100' : 'text-gray-800'} text-sm sm:text-base leading-relaxed syne uppercase font-semibold`}>{item.desc}</p>
                </div>
            ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="items-start">
        <h2 className={`text-5xl sm:text-8xl md:text-[11rem] font-black syne uppercase text-transparent mb-12`} style={{ WebkitTextStroke: `1px ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}` }}>
          Connect
        </h2>
        <div className="flex flex-col gap-6 sm:gap-10 text-3xl sm:text-5xl md:text-7xl font-bold syne pointer-events-auto">
          {[
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mihji-george-chaka-72a8a1221/' },
            { name: 'Github', url: 'https://github.com/MihjiChaka' },
            { name: 'WhatsApp', url: 'https://wa.me/260977572626' },
            { name: 'Email', url: 'mailto:mihjigeorgechaka@gmail.com' }
          ].map((link, idx) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-6 transition-all duration-500 ${themeClasses.text} hover:text-blue-500 hover:translate-x-4`}
            >
              <span className={`text-xs font-mono opacity-30 group-hover:opacity-100 group-hover:text-blue-500 transition-all`}>0{idx + 1}</span>
              {link.name}
            </a>
          ))}
        </div>
      </Section>

      <footer className={`h-[50vh] flex flex-col items-center justify-center border-t px-8 py-20 gap-10 transition-colors duration-1000 ${isDark ? 'border-white/5 bg-[#010101]' : 'border-black/5 bg-[#f0f0f2]'}`}>
        <div className="flex flex-col items-center gap-4">
            <div className={`text-sm sm:text-lg tracking-[1em] uppercase ${isDark ? 'text-blue-500' : 'text-blue-600'} syne font-black`}>
                MIHJI
            </div>
            <div className={`text-[10px] tracking-[0.4em] uppercase opacity-40 syne font-bold text-center ${themeClasses.text}`}>
                Software Developer / Systems Architect / Creative Engineer
            </div>
        </div>
        <div className={`text-[10px] tracking-widest uppercase opacity-20 font-mono text-center leading-loose ${themeClasses.text}`}>
          EST. 2025 • ALL RIGHTS RESERVED<br />
          DESIGNED FOR THE NEXT GENERATION OF DIGITAL REALITY
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={handleLogoClick}
        className={`fixed bottom-8 right-8 sm:bottom-12 sm:right-12 w-12 h-12 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all duration-700 z-[110] pointer-events-auto shadow-2xl ${showBackToTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-50 pointer-events-none'} ${themeClasses.border} ${isDark ? 'bg-black/80 hover:bg-blue-600 hover:border-blue-500' : 'bg-white/80 hover:bg-blue-600 hover:border-blue-500 hover:text-white'}`}
        aria-label="Back to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="group-hover:animate-bounce">
          <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>
      </button>
    </div>
  );
};

export default Overlay;
