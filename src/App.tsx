import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Volume2, VolumeX, Crown, Feather } from "lucide-react";

// --- ASSETS ---
const MUSIC_URL = "./assets/waltz.mp3";

// --- COMPONENT: SVG CLOUD ---
const CloudSVG = ({ className, style }: { className?: string, style?: any }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M18.42 9.22C18.21 6.32 15.69 4 12.5 4C9.72 4 7.46 5.79 6.78 8.16C4.1 8.5 2 10.93 2 13.89C2 17.26 4.54 20 7.67 20H17.83C20.68 20 23 17.5 23 14.44C23 11.58 20.97 9.21 18.42 9.22Z" />
  </svg>
);

const CloudBackground = () => (
  <div className="fixed inset-0 overflow-hidden -z-10 bg-[#b1ccdf]">
    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-[80px] opacity-60" />
    <motion.div initial={{ x: "-20vw" }} animate={{ x: "120vw" }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="absolute top-[15%]">
      <CloudSVG className="text-white w-64 h-32 opacity-80 blur-[2px]" />
    </motion.div>
    <motion.div initial={{ x: "-20vw" }} animate={{ x: "120vw" }} transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute top-[40%]">
      <CloudSVG className="text-white w-48 h-24 opacity-60" />
    </motion.div>
  </div>
);

// --- COMPONENT: PAPER TEAR SCREEN (REDESIGNED) ---
const PaperTearScreen = ({ onTear }: { onTear: () => void }) => {
  const [isTearing, setIsTearing] = useState(false);

  const handleTear = () => {
    setIsTearing(true);
    setTimeout(onTear, 1200); 
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden cursor-pointer bg-black/20" onClick={handleTear}>
      
      {/* LEFT HALF */}
      <motion.div
        initial={{ x: 0 }}
        animate={isTearing ? { x: "-100%", rotate: -5 } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 w-1/2 h-full bg-[#fdfaf0] border-r border-[#c5a059]/50 flex items-center justify-end shadow-2xl z-20"
      >
        <div className="relative w-full h-full flex items-center justify-end pr-1 md:pr-4 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')]"></div>
            {/* Border Line */}
            <div className="absolute top-10 bottom-10 right-4 border-r-2 border-double border-[#c5a059]"></div>
            
            <h1 className="font-royal text-4xl md:text-6xl lg:text-8xl text-[#1a2e3f] whitespace-nowrap z-10 mr-[-2px]">
                BRIDGE
            </h1>
        </div>
      </motion.div>

      {/* RIGHT HALF */}
      <motion.div
        initial={{ x: 0 }}
        animate={isTearing ? { x: "100%", rotate: 5 } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 w-1/2 h-full bg-[#fdfaf0] border-l border-[#c5a059]/50 flex items-center justify-start shadow-2xl z-20"
      >
        <div className="relative w-full h-full flex items-center justify-start pl-1 md:pl-4 overflow-hidden">
             {/* Background Texture */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')]"></div>
             {/* Border Line */}
             <div className="absolute top-10 bottom-10 left-4 border-l-2 border-double border-[#c5a059]"></div>

            <h1 className="font-royal text-4xl md:text-6xl lg:text-8xl text-[#1a2e3f] whitespace-nowrap z-10 ml-[-2px]">
                RTON
            </h1>
        </div>
      </motion.div>

      {/* CENTER SEAL & FOREVER TEXT */}
      {!isTearing && (
        <div className="absolute z-30 flex flex-col items-center justify-center">
            {/* The B Seal */}
            <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 md:w-28 md:h-28 bg-[#8a1c1c] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#6b1414]"
            >
                <div className="absolute inset-1 border border-white/20 rounded-full"></div>
                <span className="font-royal text-4xl md:text-5xl text-[#eecfa1] mt-1">B</span>
            </motion.div>

            {/* Subtitle */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 bg-white/80 px-4 py-2 rounded-sm border border-[#c5a059]"
            >
                <p className="font-royal tracking-[0.4em] text-[#1a2e3f] text-sm md:text-xl uppercase">
                    The Social Season Has Begun
                </p>
            </motion.div>
            
            <p className="mt-4 text-[#c5a059] font-royal text-[10px] tracking-widest animate-pulse">
                Tap to Break Seal
            </p>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: WHISTLEDOWN NEWSPAPER ---
const WhistledownPaper = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer overflow-hidden"
      onClick={onFinish}
    >
      <div className="absolute inset-0 bg-[#b1ccdf]/30 backdrop-blur-[2px]" />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative max-w-[420px] w-full paper-texture p-8 md:p-10 text-center shadow-2xl border border-gray-300"
      >
        <div className="absolute top-3 left-3 right-3 h-full border-t-2 border-b-2 border-[#1a1a1a] pointer-events-none" style={{ height: 'calc(100% - 24px)'}}></div>

        <div className="mt-4">
          <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#1a1a1a] mb-1 font-serif">Lady Whistledown's</p>
          <h1 className="font-gothic text-6xl text-[#1a1a1a] leading-none mb-2">Society <br/> Papers</h1>
        </div>

        <div className="border-t-2 border-b border-[#1a1a1a] h-1 w-full my-6" />

        <div className="font-serif text-lg md:text-xl text-left leading-relaxed text-[#1a1a1a] px-2">
          <p className="mb-4">
            <span className="drop-cap">D</span>earest Gentle Reader,
          </p>
          <p className="mb-4">
            It has come to this Author’s attention that a most determined 
            <span className="font-bold italic"> Gentleman </span> 
            of the season has set his sights upon the
            <span className="font-bold italic"> Diamond of The Season. </span> 
          </p>
          <p className="mb-4">
            He declares her the <span className="font-hand text-3xl mx-1">Incomparable</span> of the season and intends to offer his heart without reservation.
          </p>
          <p className="italic text-center mt-6 text-base opacity-80">
            Does she share his affection? The Ton holds its breath.
          </p>
        </div>

        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="mt-10 font-royal text-xs tracking-[0.3em] text-[#c5a059] uppercase"
        >
          Tap to Open His Letter
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENT: MUSIC TOGGLE ---
const MusicToggle = ({ audioRef, isPlaying, toggle }: any) => {
    return (
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#1a2e3f] text-[#c5a059] rounded-full shadow-lg border border-[#c5a059] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        title="Play Music"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    );
};
  
// --- MAIN APP ---
export default function App() {
  const [appStage, setAppStage] = useState(0); 
  const [isOpen, setIsOpen] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    return () => { 
        if(audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null; 
        }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleStartSequence = () => {
     if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Autoplay blocked", e));
     }
     setTimeout(() => setAppStage(1), 1200);
  };

  const handleOpenEnvelope = async () => {
    await controls.start({ rotateY: 180, transition: { duration: 1, ease: "easeInOut" } });
    setIsOpen(true);
    controls.set({ rotateY: 0 }); 
  };

  const handleYes = () => {
    setYesPressed(true);
    const colors = ["#accce3", "#c5a059", "#162062"]; 
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors });
  };

  const getNoText = () => ["No", "Truly?", "Scandalous!", "My Queen?", "You Jest!", "I Swoon!", "Cruel Beauty!", "Me Pissu Kelinnepa","Array eka Count karala Liwwe", "Yako Me 10 weni Eka", "Mawa Yaka Karagannepa", "Press Yes Ganiye", "Aye Option Na!!!!"].at(Math.min(noCount, 13));

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      <CloudBackground />
      
      {appStage > 0 && <MusicToggle audioRef={audioRef} isPlaying={isPlaying} toggle={toggleMusic} />}

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: REDESIGNED TEAR SCREEN */}
        {appStage === 0 && (
            <PaperTearScreen onTear={handleStartSequence} />
        )}

        {/* STAGE 1: NEWSPAPER (PREVIOUS VERSION) */}
        {appStage === 1 && (
            <WhistledownPaper onFinish={() => setAppStage(2)} />
        )}

        {/* STAGE 2: MAIN ENVELOPE & LETTER */}
        {appStage === 2 && (
            <div className="relative z-10 w-full max-w-[500px] px-4 perspective-[2000px]">
                <AnimatePresence mode="wait">
                
                {/* CLOSED ENVELOPE */}
                {!isOpen && (
                    <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                    transition={{ duration: 0.8 }}
                    className="w-full aspect-[1.4] cursor-pointer group"
                    onClick={handleOpenEnvelope}
                    >
                    <motion.div
                        animate={controls}
                        className="relative w-full h-full preserve-3d transition-transform duration-700 group-hover:scale-105"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="absolute inset-0 backface-hidden bg-[#e9ecef] shadow-2xl rounded-sm flex items-center justify-center border border-white/40">
                        <div className="absolute top-0 w-full h-1/2 bg-[#ffffff] [clip-path:polygon(0%_0%,_50%_100%,_100%_0%)] shadow-md z-10 origin-top"></div>
                        <div className="relative z-20 w-24 h-24 bg-[#1a2e3f] rounded-full flex items-center justify-center shadow-lg border-2 border-[#c5a059]">
                            <Crown className="text-[#c5a059] w-12 h-12" strokeWidth={1.5} />
                        </div>
                        <p className="absolute bottom-6 font-royal text-[#1a2e3f] text-xs tracking-[0.25em] uppercase opacity-80">
                           My Dearest Diamond
                        </p>
                        </div>
                    </motion.div>
                    </motion.div>
                )}

                {/* THE LETTER (UPDATED SECTION) */}
                {isOpen && !yesPressed && (
                    <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="paper-texture w-full p-10 text-center relative shadow-2xl border border-[#c5a059]"
                    >
                    {/* Corner Ornaments */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#c5a059]" />
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#c5a059]" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#c5a059]" />
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#c5a059]" />

                    <Feather className="w-8 h-8 text-[#c5a059] mx-auto mb-4" />
                    
                    <h2 className="font-royal text-2xl text-[#1a2e3f] mb-2 uppercase tracking-widest border-b border-[#c5a059] pb-2 inline-block">
                        My Dearest,
                    </h2>
                    
                    <div className="my-6 space-y-4">
                        <p className="font-serif text-lg text-[#1a2e3f]/90 leading-relaxed italic">
                            It's been months that I've been waiting for you, <span className="font-bold text-[#c5a059]">The Diamond of the Season</span>.
                        </p>
                        <p className="font-serif text-lg text-[#1a2e3f]/90 leading-relaxed italic">
                             I find myself bewitched, body and soul. 
                             I can no longer stand on the sidelines while others vie for your attention. 
                             It's been an honour to hold your hands in every promenade and dance at every ball, but my heart yearns for more.
                             I know I'm not a good writer — my thoughts often escape me — but I hope these words convey the depth of my feelings.
                             Among many suitors, I stand apart for my love to you and the sincerity of my affection.
                        </p>
                        <p className="font-serif text-lg text-[#1a2e3f]/90 italic mt-4">
                            Will you allow me the extraordinary privilege of being...
                        </p>
                        <h3 className="font-hand text-5xl md:text-6xl text-[#1a2e3f] mt-4 transform -rotate-2">
                            Your Valentine?
                        </h3>
                    </div>

                    <div className="flex flex-col gap-4 mt-8 items-center">
                        <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleYes}
                        className="bg-[#1a2e3f] text-[#c5a059] py-3 px-8 rounded-sm font-royal text-sm tracking-widest shadow-lg hover:bg-[#233b52] transition-colors w-full border border-[#c5a059]"
                        >
                        I ACCEPT YOUR SUIT <Heart size={14} className="inline ml-2 fill-[#c5a059]" />
                        </motion.button>
                        <button onClick={() => setNoCount(prev => prev + 1)} className="font-serif text-[#1a2e3f]/60 text-sm italic hover:text-[#1a2e3f] transition-colors">
                        {getNoText()}
                        </button>
                    </div>
                    </motion.div>
                )}

                {/* SUCCESS MESSAGE */}
                {yesPressed && (
                    <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="paper-texture w-full p-12 text-center shadow-2xl border-4 double border-[#c5a059]"
                    >
                    <h1 className="font-royal text-3xl text-[#1a2e3f] mb-4">It is a Match!</h1>
                    <p className="font-hand text-4xl text-[#1a2e3f] mt-4">You have made me the happiest man in the Ton.</p>
                    </motion.div>
                )}

                </AnimatePresence>
            </div>
        )}

      </AnimatePresence>
    </div>
  );
}