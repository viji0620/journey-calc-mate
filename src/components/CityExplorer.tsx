import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Clock, Users, Thermometer, IndianRupee, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type City = {
  name: string;
  country: string;
  region: "india" | "world";
  image: string;
  budget: string;
  budgetPerDay: number; // in INR
  bestTime: string;
  rating: number;
  highlights: string[];
  description: string;
  avgTemp: string;
  travelersPerYear: string;
};

export const cities: City[] = [
  // India
  { name: "Jaipur", country: "India", region: "india", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop", budget: "₹3,500/day", budgetPerDay: 3500, bestTime: "Oct - Mar", rating: 4.7, highlights: ["Amber Fort", "Hawa Mahal", "City Palace"], description: "The Pink City — a kaleidoscope of royal palaces, vibrant bazaars, and Rajasthani charm.", avgTemp: "25°C", travelersPerYear: "6.5M" },
  { name: "Goa", country: "India", region: "india", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop", budget: "₹4,000/day", budgetPerDay: 4000, bestTime: "Nov - Feb", rating: 4.5, highlights: ["Baga Beach", "Old Goa Churches", "Dudhsagar Falls"], description: "Sun, sand, and susegad — India's beach paradise with Portuguese heritage.", avgTemp: "28°C", travelersPerYear: "8M" },
  { name: "Kerala", country: "India", region: "india", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop", budget: "₹3,800/day", budgetPerDay: 3800, bestTime: "Sep - Mar", rating: 4.8, highlights: ["Backwaters", "Munnar Tea Gardens", "Kathakali"], description: "God's Own Country — lush backwaters, spice plantations, and Ayurvedic wellness.", avgTemp: "27°C", travelersPerYear: "5M" },
  { name: "Varanasi", country: "India", region: "india", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop", budget: "₹2,500/day", budgetPerDay: 2500, bestTime: "Oct - Mar", rating: 4.6, highlights: ["Ganga Aarti", "Kashi Vishwanath", "Boat Rides"], description: "The spiritual heart of India — ancient ghats, sacred rituals, and timeless culture.", avgTemp: "26°C", travelersPerYear: "3M" },
  { name: "Ladakh", country: "India", region: "india", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop", budget: "₹5,000/day", budgetPerDay: 5000, bestTime: "Jun - Sep", rating: 4.9, highlights: ["Pangong Lake", "Nubra Valley", "Monasteries"], description: "Land of high passes — surreal landscapes, Buddhist monasteries, and adventure.", avgTemp: "10°C", travelersPerYear: "1M" },
  { name: "Udaipur", country: "India", region: "india", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop", budget: "₹3,200/day", budgetPerDay: 3200, bestTime: "Oct - Mar", rating: 4.7, highlights: ["Lake Pichola", "City Palace", "Jag Mandir"], description: "Venice of the East — romantic lakeside palaces and vibrant art scene.", avgTemp: "24°C", travelersPerYear: "4M" },
  { name: "Rishikesh", country: "India", region: "india", image: "https://images.unsplash.com/photo-1600785767035-e5a3e718cf21?w=400&h=300&fit=crop", budget: "₹2,000/day", budgetPerDay: 2000, bestTime: "Sep - Nov", rating: 4.5, highlights: ["River Rafting", "Yoga Ashrams", "Ram Jhula"], description: "Yoga capital of the world — adventure sports meet spiritual serenity by the Ganges.", avgTemp: "22°C", travelersPerYear: "2.5M" },
  { name: "Darjeeling", country: "India", region: "india", image: "https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?w=400&h=300&fit=crop", budget: "₹2,800/day", budgetPerDay: 2800, bestTime: "Mar - May", rating: 4.4, highlights: ["Tiger Hill", "Tea Plantations", "Toy Train"], description: "Queen of the Hills — misty tea gardens with Himalayan panoramas.", avgTemp: "15°C", travelersPerYear: "1.5M" },
  // World
  { name: "Bali", country: "Indonesia", region: "world", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop", budget: "$60/day", budgetPerDay: 5000, bestTime: "Apr - Oct", rating: 4.7, highlights: ["Ubud Rice Terraces", "Uluwatu Temple", "Seminyak"], description: "Island of the Gods — terraced rice paddies, ancient temples, and surf beaches.", avgTemp: "27°C", travelersPerYear: "6M" },
  { name: "Paris", country: "France", region: "world", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop", budget: "$150/day", budgetPerDay: 12500, bestTime: "Apr - Jun", rating: 4.8, highlights: ["Eiffel Tower", "Louvre", "Montmartre"], description: "City of Light — world-class art, romantic boulevards, and legendary cuisine.", avgTemp: "16°C", travelersPerYear: "30M" },
  { name: "Tokyo", country: "Japan", region: "world", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop", budget: "$120/day", budgetPerDay: 10000, bestTime: "Mar - May", rating: 4.9, highlights: ["Shibuya Crossing", "Senso-ji", "Akihabara"], description: "Where tradition meets futurism — neon-lit streets, serene shrines, and incredible food.", avgTemp: "16°C", travelersPerYear: "15M" },
  { name: "Dubai", country: "UAE", region: "world", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop", budget: "$130/day", budgetPerDay: 10850, bestTime: "Nov - Mar", rating: 4.6, highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall"], description: "City of superlatives — futuristic skyline, luxury shopping, and desert adventures.", avgTemp: "33°C", travelersPerYear: "16M" },
  { name: "Bangkok", country: "Thailand", region: "world", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=300&fit=crop", budget: "$45/day", budgetPerDay: 3750, bestTime: "Nov - Feb", rating: 4.5, highlights: ["Grand Palace", "Chatuchak Market", "Street Food"], description: "The City of Angels — ornate temples, floating markets, and the world's best street food.", avgTemp: "29°C", travelersPerYear: "22M" },
  { name: "Rome", country: "Italy", region: "world", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop", budget: "$120/day", budgetPerDay: 10000, bestTime: "Apr - Jun", rating: 4.8, highlights: ["Colosseum", "Vatican", "Trevi Fountain"], description: "The Eternal City — millennia of history, art masterpieces, and la dolce vita.", avgTemp: "18°C", travelersPerYear: "10M" },
  { name: "Istanbul", country: "Turkey", region: "world", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop", budget: "$70/day", budgetPerDay: 5850, bestTime: "Apr - May", rating: 4.6, highlights: ["Hagia Sophia", "Grand Bazaar", "Bosphorus Cruise"], description: "Where East meets West — Byzantine mosaics, Ottoman palaces, and bustling bazaars.", avgTemp: "15°C", travelersPerYear: "14M" },
  { name: "New York", country: "USA", region: "world", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop", budget: "$200/day", budgetPerDay: 16700, bestTime: "Apr - Jun", rating: 4.7, highlights: ["Times Square", "Central Park", "Statue of Liberty"], description: "The city that never sleeps — iconic skyline, world-class museums, and Broadway magic.", avgTemp: "13°C", travelersPerYear: "66M" },
];

type Props = {
  onSelectCity?: (city: City) => void;
};

const CityExplorer = ({ onSelectCity }: Props) => {
  const [filter, setFilter] = useState<"all" | "india" | "world">("all");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const filtered = filter === "all" ? cities : cities.filter((c) => c.region === filter);

  const handleCalculate = (city: City) => {
    setSelectedCity(null);
    onSelectCity?.(city);
    setTimeout(() => {
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="destinations" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-teal-light rounded-full px-4 py-1.5 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-body font-medium text-foreground">Explore Cities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Pick Your Destination
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">
            Click any city to calculate your trip expenses instantly
          </p>

          <div className="inline-flex gap-2 bg-muted rounded-full p-1">
            {(["all", "india", "world"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all ${
                  filter === f ? "gradient-accent text-accent-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "🌐 All" : f === "india" ? "🇮🇳 India" : "🌍 World"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((city) => (
              <motion.div
                key={city.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCity(city)}
                className="glass-card overflow-hidden cursor-pointer group hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span className="text-xs font-body font-semibold">{city.rating}</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent h-16" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs bg-accent/90 text-accent-foreground rounded-full px-2 py-0.5 font-body">
                      {city.region === "india" ? "🇮🇳" : "🌍"} {city.country}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-lg text-foreground">{city.name}</h3>
                  <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">{city.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-accent font-body font-bold text-sm">{city.budget}</span>
                    <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {city.bestTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* City detail modal */}
        <AnimatePresence>
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCity(null)}
              className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card max-w-lg w-full overflow-hidden"
              >
                <div className="relative h-56">
                  <img src={selectedCity.image} alt={selectedCity.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-display font-bold text-2xl text-card">{selectedCity.name}</h3>
                    <p className="text-card/80 font-body text-sm">{selectedCity.country}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center text-foreground hover:bg-card transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <p className="font-body text-sm text-muted-foreground">{selectedCity.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                      {selectedCity.region === "india" ? <IndianRupee className="w-4 h-4 text-primary" /> : <DollarSign className="w-4 h-4 text-primary" />}
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Budget</p>
                        <p className="font-body font-semibold text-sm">{selectedCity.budget}</p>
                      </div>
                    </div>
                    <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Best Time</p>
                        <p className="font-body font-semibold text-sm">{selectedCity.bestTime}</p>
                      </div>
                    </div>
                    <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Avg Temp</p>
                        <p className="font-body font-semibold text-sm">{selectedCity.avgTemp}</p>
                      </div>
                    </div>
                    <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Visitors/yr</p>
                        <p className="font-body font-semibold text-sm">{selectedCity.travelersPerYear}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm mb-2 text-foreground">Top Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCity.highlights.map((h) => (
                        <span key={h} className="bg-teal-light text-primary rounded-full px-3 py-1 text-xs font-body font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCalculate(selectedCity)}
                    className="w-full gradient-accent text-accent-foreground font-body font-semibold rounded-full"
                  >
                    Calculate Trip Expenses <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CityExplorer;
