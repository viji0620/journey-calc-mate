import { motion } from "framer-motion";
import { Plane, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-2 mb-8">
            <Plane className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/80 text-sm font-body">India & Worldwide Travel</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground mb-6 leading-tight"
        >
          Your Perfect
          <br />
          <span className="text-gradient">Travel Buddy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 font-body"
        >
          Plan trips, calculate expenses, and explore destinations across India and beyond.
          Your all-in-one travel companion.
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
            onClick={onExplore}
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground font-body text-lg px-8 py-6 rounded-full hover:bg-primary-foreground/10 bg-transparent"
          >
            Explore Destinations
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Destinations" },
            { value: "₹0", label: "To Start" },
            { value: "24/7", label: "Planning" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-primary-foreground/50 font-body">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-primary-foreground/40" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
