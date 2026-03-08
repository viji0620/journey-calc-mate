import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Menu, X } from "lucide-react";

const navItems = [
  { id: "destinations", label: "Destinations" },
  { id: "calculator", label: "Calculator" },
  { id: "guides", label: "Guides" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-accent" />
          <span className="font-display font-bold text-lg text-foreground">Travel Buddy</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:hidden bg-background border-b border-border p-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left font-body text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
