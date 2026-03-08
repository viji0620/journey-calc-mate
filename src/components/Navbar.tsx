import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Menu, X, LogIn, UserPlus, LogOut, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "destinations", label: "Destinations" },
  { id: "calculator", label: "Calculator" },
  { id: "guides", label: "Guides" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

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
        <Link to="/" className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-accent" />
          <span className="font-display font-bold text-lg text-foreground">Travel Buddy</span>
        </Link>

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

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-body font-medium text-foreground truncate max-w-[120px]">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={signOut} className="font-body text-xs rounded-full border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">
                <LogOut className="w-3.5 h-3.5 mr-1" /> Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="font-body text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <LogIn className="w-4 h-4 mr-1.5" /> Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="gradient-accent text-accent-foreground font-body text-sm rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <UserPlus className="w-4 h-4 mr-1.5" /> Sign Up
                </Button>
              </Link>
            </>
          )}
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
          <div className="pt-3 border-t border-border space-y-2">
            {user ? (
              <Button variant="ghost" size="sm" onClick={() => { signOut(); setOpen(false); }} className="w-full font-body">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            ) : (
              <>
                <Link to="/login" className="block" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full font-body border-primary text-primary hover:bg-primary hover:text-primary-foreground">Sign In</Button>
                </Link>
                <Link to="/register" className="block" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full gradient-accent text-accent-foreground font-body shadow-md">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
