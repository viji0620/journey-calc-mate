import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop",
];

const HeroSection = ({ onExplore }: { onExplore: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cycling background images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentImage]}
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />

      {/* Image indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentImage ? "bg-accent w-6" : "bg-card/50"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-md border border-card/20 rounded-full px-5 py-2 mb-8">
            <Plane className="w-4 h-4 text-accent" />
            <span className="text-card/90 text-sm font-body">India & Worldwide Travel</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-card mb-6 leading-tight"
        >
          Your Perfect
          <br />
          <span className="text-gradient">Travel Buddy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-card/80 max-w-2xl mx-auto mb-10 font-body"
        >
          Plan trips, calculate expenses, and explore destinations across India and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onExplore}
            size="lg"
            className="gradient-accent text-accent-foreground font-body font-semibold text-lg px-8 py-6 rounded-full hover:opacity-90 transition-opacity"
          >
            Plan Your Trip
          </Button>
          <Button
            onClick={() => document.getElementById("guides")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            variant="outline"
            className="border-card/30 text-card font-body text-lg px-8 py-6 rounded-full hover:bg-card/10 bg-transparent"
          >
            Meet Our Guides
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Destinations" },
            { value: "₹0", label: "To Start" },
            { value: "24/7", label: "AI Assistant" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-card/60 font-body">{stat.label}</p>
            </div>
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
