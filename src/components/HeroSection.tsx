import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const heroImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop",
];

const destinations = ["Jaipur", "Bali", "Tokyo", "Paris", "Kerala", "Dubai"];

const HeroSection = ({ onExplore }: { onExplore: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentDest, setCurrentDest] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const imgInterval = setInterval(() => setCurrentImage((p) => (p + 1) % heroImages.length), 5000);
    const destInterval = setInterval(() => setCurrentDest((p) => (p + 1) % destinations.length), 2500);
    return () => { clearInterval(imgInterval); clearInterval(destInterval); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={heroImages[currentImage]} alt="Travel destination" className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />

      {/* Image indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrentImage(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentImage ? "bg-accent w-6" : "bg-card/40"}`} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-md border border-card/20 rounded-full px-5 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-card/90 text-sm font-body">AI-Powered Travel Planning</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-card mb-4 leading-tight"
        >
          Discover Your Next
          <br />
          <span className="text-gradient">Adventure</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <MapPin className="w-5 h-5 text-accent" />
          <span className="text-card/70 font-body text-lg">Now exploring</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentDest}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-accent font-display font-bold text-xl"
            >
              {destinations[currentDest]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-card/70 max-w-2xl mx-auto mb-10 font-body"
        >
          Smart expense calculator, expert local guides, and an AI assistant — everything you need for your perfect trip across India and the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onExplore}
            size="lg"
            className="gradient-accent text-accent-foreground font-body font-semibold text-lg px-8 py-6 rounded-full hover:opacity-90 transition-opacity"
          >
            <Plane className="w-5 h-5 mr-2" /> Explore Destinations
          </Button>
          {!user && (
            <Link to="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-card/30 text-card font-body text-lg px-8 py-6 rounded-full hover:bg-card/10 bg-transparent w-full"
              >
                Get Started Free
              </Button>
            </Link>
          )}
          {user && (
            <Button
              onClick={() => document.getElementById("guides")?.scrollIntoView({ behavior: "smooth" })}
              size="lg"
              variant="outline"
              className="border-card/30 text-card font-body text-lg px-8 py-6 rounded-full hover:bg-card/10 bg-transparent"
            >
              Meet Our Guides
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "16+", label: "Destinations" },
            { value: "6", label: "Expert Guides" },
            { value: "24/7", label: "AI Assistant" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-display font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-card/50 font-body">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-card/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
