import { Plane, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-hero py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Plane className="w-5 h-5 text-accent" />
          <span className="font-display font-bold text-xl text-primary-foreground">Travel Buddy</span>
        </div>
        <p className="text-primary-foreground/60 font-body text-sm mb-4">
          Your companion for exploring India and the world
        </p>
        <div className="flex items-center justify-center gap-1 text-primary-foreground/40 text-xs font-body">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-accent fill-accent" />
          <span>for travelers everywhere</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
