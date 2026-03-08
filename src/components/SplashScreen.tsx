import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Globe, MapPin } from "lucide-react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center gradient-hero overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/40"
            initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 20, opacity: 0 }}
            animate={{ y: -20, opacity: [0, 1, 0] }}
            transition={{ duration: 3 + Math.random() * 3, delay: Math.random() * 2, repeat: Infinity }}
          />
        ))}

        <div className="relative flex flex-col items-center gap-6">
          {/* Globe */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.2 }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-full border-2 border-accent/30 flex items-center justify-center">
              <Globe className="w-16 h-16 text-accent animate-globe-spin" style={{ animationDuration: "8s" }} />
            </div>
            {/* Orbiting pin */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <MapPin className="w-5 h-5 text-coral absolute -top-2 left-1/2 -translate-x-1/2" />
            </motion.div>
          </motion.div>

          {/* Plane animation */}
          {phase >= 1 && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute -top-8"
            >
              <Plane className="w-8 h-8 text-primary-foreground animate-plane-fly" />
            </motion.div>
          )}

          {/* Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary-foreground text-center"
          >
            Travel Buddy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-foreground/70 font-body text-lg"
          >
            Explore India & the World
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="w-48 h-1 rounded-full bg-primary-foreground/20 overflow-hidden mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full rounded-full gradient-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
