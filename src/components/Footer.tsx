import { Plane, Heart, Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="gradient-hero py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5 text-accent" />
              <span className="font-display font-bold text-xl text-primary-foreground">Travel Buddy</span>
            </div>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
              Your all-in-one companion for planning unforgettable journeys across India and the world.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Destinations", "Calculator", "Guides"].map((item) => (
                <button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-primary-foreground/60 text-sm font-body hover:text-accent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Get Started</h4>
            <div className="space-y-2">
              <Link to="/register" className="block text-primary-foreground/60 text-sm font-body hover:text-accent transition-colors">
                Create Account
              </Link>
              <Link to="/login" className="block text-primary-foreground/60 text-sm font-body hover:text-accent transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-primary-foreground/40 text-xs font-body">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-accent fill-accent" />
            <span>for travelers everywhere</span>
          </div>
          <p className="text-primary-foreground/30 text-xs font-body">
            © {new Date().getFullYear()} Travel Buddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
