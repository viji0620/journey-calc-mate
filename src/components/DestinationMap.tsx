import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

const destinations = [
  { name: "Jaipur", country: "India", lat: 26.9124, lng: 75.7873, budget: "₹3,500/day", tag: "Heritage" },
  { name: "Goa", country: "India", lat: 15.2993, lng: 74.124, budget: "₹4,000/day", tag: "Beach" },
  { name: "Kerala", country: "India", lat: 10.8505, lng: 76.2711, budget: "₹3,800/day", tag: "Nature" },
  { name: "Varanasi", country: "India", lat: 25.3176, lng: 83.0168, budget: "₹2,500/day", tag: "Spiritual" },
  { name: "Ladakh", country: "India", lat: 34.1526, lng: 77.5771, budget: "₹5,000/day", tag: "Adventure" },
  { name: "Bali", country: "Indonesia", lat: -8.3405, lng: 115.092, budget: "$60/day", tag: "Tropical" },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, budget: "$150/day", tag: "Romance" },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, budget: "$120/day", tag: "Culture" },
  { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, budget: "$130/day", tag: "Luxury" },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, budget: "$45/day", tag: "Street Food" },
];

const DestinationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!, {
        center: [20.5937, 78.9629],
        zoom: 4,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: hsl(16, 85%, 60%); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="hsl(16, 85%, 60%)"/></svg>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      destinations.forEach((dest) => {
        L.marker([dest.lat, dest.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family: 'DM Sans', sans-serif; padding: 4px;">
              <strong style="font-family: 'Playfair Display', serif; font-size: 14px;">${dest.name}</strong>
              <br/><span style="color: #666; font-size: 12px;">${dest.country}</span>
              <br/><span style="color: hsl(16, 85%, 60%); font-weight: 600; font-size: 13px;">${dest.budget}</span>
              <br/><span style="background: hsl(174, 40%, 90%); padding: 1px 8px; border-radius: 10px; font-size: 11px;">${dest.tag}</span>
            </div>`
          );
      });

      mapInstance.current = map;
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="destinations" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-teal-light rounded-full px-4 py-1.5 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-body font-medium text-foreground">Explore</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            From the temples of India to the beaches of Bali — find your next adventure
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl border border-border mb-12"
        >
          <div ref={mapRef} className="h-[450px] w-full" />
        </motion.div>

        {/* Destination cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card p-4 hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{dest.name}</h3>
                  <p className="text-xs text-muted-foreground font-body">{dest.country}</p>
                </div>
                <span className="text-xs bg-teal-light text-primary rounded-full px-2 py-0.5 font-body">{dest.tag}</span>
              </div>
              <p className="text-accent font-body font-semibold text-sm">{dest.budget}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationMap;
