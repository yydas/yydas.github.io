import React, { useState, useEffect } from 'react';

interface Experience {
  role: string;
  company: string;
  time: string;
  status: 'future' | 'active' | 'past';
}

interface Reading {
  title: string;
  author: string;
  coverId: string;
}

export default function BentoGrid() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const albums = [
    { id: 'mus1', name: 'Midnight Dreams' },
    { id: 'mus2', name: 'Summer Vibes' },
    { id: 'mus3', name: 'Urban Beats' },
    { id: 'mus4', name: 'Chill Sessions' },
    { id: 'mus5', name: 'Electronic Flow' }
  ];
  
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentAlbum((prev) => (prev + 1) % albums.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [albums.length, isHovering]);
  
  const nextAlbum = () => {
    setCurrentAlbum((prev) => (prev + 1) % albums.length);
  };
  
  const prevAlbum = () => {
    setCurrentAlbum((prev) => (prev - 1 + albums.length) % albums.length);
  };
  
  const goToAlbum = (index: number) => {
    setCurrentAlbum(index);
  };
  
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setIsDragging(true);
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStart;
    
    // 拖动超过50px触发切换
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevAlbum();
      } else {
        nextAlbum();
      }
      setDragStart(null);
      setIsDragging(false);
    }
  };
  
  const handleDragEnd = () => {
    setDragStart(null);
    setIsDragging(false);
  };
  const experience: Experience[] = [
    { role: "Product Lead", company: "Apple", time: "2025 - Remote - Full time", status: "future" },
    { role: "Product Lead", company: "Apple", time: "2024 - On site - Full time", status: "active" },
    { role: "Product Designer", company: "Apple", time: "2023 - Hybrid - Part time", status: "past" },
    { role: "Ui-Ux Designer", company: "Apple", time: "2022 - Remote - Full time", status: "past" },
  ];
  
  const reading: Reading = {
    title: "Dieter Rams: The Complete Works",
    author: "Klaus Klemp",
    coverId: "book"
  };

  const workflowSteps = [
    { title: "Discovery Call", desc: "In the first stage, we'll have a Discovery Call to discuss your goals, needs, and project requirements. This helps us align our vision and set the foundation for a successful collaboration." },
    { title: "Strategic Research", desc: "Analyzing market trends and competitor landscapes to identify unique opportunities for growth." },
    { title: "User Experience Design", desc: "Drafting wireframes and prototypes that prioritize intuitive flow and aesthetic precision." },
    { title: "Agile Development", desc: "Turning high-fidelity designs into production-ready code with weekly sprint cycles." },
    { title: "Launch & Iterate", desc: "Deploying to production and gathering user feedback for continuous improvement." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Experience Card */}
      <div className="glass-card card-shadow p-8 flex flex-col gap-6">
        <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-bold w-fit text-neutral-900 dark:text-neutral-100">My Experience</span>
        <div className="space-y-6 relative ml-1">
          <div className="absolute top-0 bottom-0 left-[-1.5px] w-[1px] bg-neutral-200 dark:bg-neutral-700"></div>
          {experience.map((exp, i) => (
            <div key={i} className={`relative pl-6 transition-opacity duration-500 ${exp.status === 'future' ? 'opacity-30' : ''}`}>
              <div className={`absolute left-[-7px] top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-950 ${exp.status === 'active' ? 'bg-neutral-900 dark:bg-neutral-100' : 'bg-neutral-300 dark:bg-neutral-600'}`}></div>
              <h4 className="text-sm font-bold leading-tight text-neutral-900 dark:text-neutral-100">{exp.role} at {exp.company}</h4>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono uppercase mt-0.5">{exp.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Music Playlist */}
      <div 
        className="glass-card card-shadow p-8 flex flex-col items-center justify-between text-center overflow-hidden relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-bold text-neutral-900 dark:text-neutral-100">My music playlist</span>
        
        <div 
          className="relative h-32 w-full flex items-center justify-center mt-4 touch-none select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {albums.map((album, index) => {
            const offset = (index - currentAlbum + albums.length) % albums.length;
            const isActive = offset === 0;
            const isNext = offset === 1;
            const isPrev = offset === albums.length - 1;
            
            return (
              <img 
                key={album.id}
                src={`https://picsum.photos/seed/${album.id}/200/200`}
                onClick={() => !isDragging && goToAlbum(index)}
                className={`rounded-2xl absolute transition-all ease-out ${
                  isDragging ? 'duration-100' : 'duration-700'
                } ${
                  isActive 
                    ? 'w-28 h-28 z-30 shadow-2xl border-4 border-white dark:border-neutral-800 scale-100 opacity-100 rotate-0 cursor-grab active:cursor-grabbing' 
                    : isNext
                    ? 'w-24 h-24 z-20 shadow-lg opacity-40 translate-x-[40px] rotate-12 scale-95 cursor-pointer hover:opacity-60'
                    : isPrev
                    ? 'w-24 h-24 z-20 shadow-lg opacity-40 translate-x-[-40px] -rotate-12 scale-95 cursor-pointer hover:opacity-60'
                    : 'w-20 h-20 z-10 shadow-md opacity-0 scale-75 pointer-events-none'
                }`}
                alt={album.name}
                draggable={false}
              />
            );
          })}
        </div>
        
        {/* Dots Indicator */}
        <div className="flex gap-1.5 mt-2">
          {albums.map((_, index) => (
            <button
              key={index}
              onClick={() => goToAlbum(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentAlbum 
                  ? 'bg-orange-500 w-4' 
                  : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
              }`}
              aria-label={`Go to album ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="mt-2">
          <h4 className="font-bold text-neutral-900 dark:text-neutral-100 transition-opacity duration-300">
            {albums[currentAlbum].name}
          </h4>
          <p className="text-xs text-orange-500 flex items-center justify-center gap-1">
             <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Play on Spotify
          </p>
        </div>
      </div>

      {/* Reading List */}
      <div className="glass-card card-shadow p-8 flex flex-col gap-4">
        <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-bold w-fit text-neutral-900 dark:text-neutral-100">What I'm reading</span>
        <div className="space-y-1">
          <h4 className="font-bold text-sm line-clamp-2 text-neutral-900 dark:text-neutral-100">{reading.title}</h4>
          <p className="text-[10px] text-neutral-600 dark:text-neutral-400 font-mono">{reading.author}</p>
        </div>
        <div className="flex-1 bg-neutral-50 dark:bg-neutral-900 rounded-xl flex items-center justify-center p-4 min-h-[140px]">
           <img 
             src={`https://picsum.photos/seed/${reading.coverId}/300/450`} 
             className="h-full max-h-40 object-contain shadow-2xl rounded transform -rotate-2 hover:rotate-0 transition-transform duration-500" 
             alt="book cover" 
           />
        </div>
      </div>

      {/* Map Card */}
      <div className="glass-card card-shadow p-0 overflow-hidden relative min-h-[300px]">
        <div className="absolute top-6 left-6 z-10">
          <span className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-neutral-900 dark:text-neutral-100">Map</span>
        </div>
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900">
          <img src="https://api.placeholder.com/600/600?text=Montreal+Map" className="w-full h-full object-cover map-filter opacity-40" alt="map" />
        </div>
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <h3 className="text-2xl font-black tracking-[0.3em] uppercase text-neutral-900 dark:text-neutral-100">Montreal</h3>
          <p className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mt-1">Canada • 45.5017° N, 73.5673° W</p>
        </div>
      </div>

      {/* Workflow Steps Card */}
      <div className="md:col-span-2 glass-card card-shadow p-10 flex flex-col justify-between">
        <div className="space-y-6">
          <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-bold w-fit text-neutral-900 dark:text-neutral-100">How I work</span>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">0{activeStep + 1} {workflowSteps[activeStep].title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl text-lg">
              {workflowSteps[activeStep].desc}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          {workflowSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`px-6 py-3 rounded-full text-xs font-bold transition-all ${
                activeStep === i 
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Step 0{i+1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
