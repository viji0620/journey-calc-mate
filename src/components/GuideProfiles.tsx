import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Languages, Calendar, Award, Heart, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

import guideRahul from "@/assets/guide-rahul.jpg";
import guidePriya from "@/assets/guide-priya.jpg";
import guideKenji from "@/assets/guide-kenji.jpg";
import guideEmma from "@/assets/guide-emma.jpg";
import guideOmar from "@/assets/guide-omar.jpg";
import guideNina from "@/assets/guide-nina.jpg";

type Guide = {
  id: string;
  name: string;
  photo: string;
  location: string;
  speciality: string;
  languages: string[];
  rating: number;
  reviews: number;
  experience: string;
  pricePerDay: string;
  bio: string;
  highlights: string[];
};

const guides: Guide[] = [
  { id: "1", name: "Rahul Sharma", photo: guideRahul, location: "Jaipur, Rajasthan", speciality: "Heritage & Culture", languages: ["Hindi", "English", "French"], rating: 4.9, reviews: 342, experience: "12 years", pricePerDay: "₹3,500", bio: "Born and raised in Jaipur, Rahul brings the Pink City alive with stories of Rajput valor, hidden palace passages, and the best lassi spots locals don't share.", highlights: ["Certified heritage guide", "Photography walks", "Royal cuisine tours"] },
  { id: "2", name: "Priya Nair", photo: guidePriya, location: "Kerala Backwaters", speciality: "Nature & Ayurveda", languages: ["Malayalam", "English", "Tamil"], rating: 4.8, reviews: 218, experience: "8 years", pricePerDay: "₹3,000", bio: "An Ayurveda practitioner turned guide, Priya combines backwater houseboat journeys with authentic wellness experiences across God's Own Country.", highlights: ["Houseboat tours", "Spice plantation walks", "Ayurveda sessions"] },
  { id: "3", name: "Kenji Tanaka", photo: guideKenji, location: "Tokyo, Japan", speciality: "Culture & Food", languages: ["Japanese", "English"], rating: 4.9, reviews: 456, experience: "15 years", pricePerDay: "$150", bio: "A food photographer who became a guide, Kenji takes you beyond tourist Tokyo into hidden ramen alleys, sake bars, and sunrise temple visits.", highlights: ["Street food tours", "Temple dawn walks", "Anime district guides"] },
  { id: "4", name: "Emma Laurent", photo: guideEmma, location: "Paris, France", speciality: "Art & History", languages: ["French", "English", "Italian"], rating: 4.7, reviews: 289, experience: "10 years", pricePerDay: "€180", bio: "An art historian with a passion for storytelling, Emma reveals Paris through its hidden courtyards, bohemian cafés, and lesser-known masterpieces.", highlights: ["Louvre skip-the-line", "Montmartre art walks", "Wine & cheese tours"] },
  { id: "5", name: "Omar Al-Rashid", photo: guideOmar, location: "Dubai, UAE", speciality: "Luxury & Adventure", languages: ["Arabic", "English", "Urdu"], rating: 4.8, reviews: 187, experience: "7 years", pricePerDay: "$200", bio: "From desert dune bashing to yacht brunches, Omar crafts unforgettable Dubai experiences that blend Bedouin traditions with modern luxury.", highlights: ["Desert camping", "Yacht tours", "Gold souk experiences"] },
  { id: "6", name: "Nina Srisai", photo: guideNina, location: "Bangkok, Thailand", speciality: "Street Food & Temples", languages: ["Thai", "English", "Mandarin"], rating: 4.6, reviews: 312, experience: "9 years", pricePerDay: "$80", bio: "Nina knows every street vendor and hidden temple in Bangkok. Her tours are a sensory overload of flavors, colors, and stories.", highlights: ["Night market tours", "Temple hopping", "Thai cooking classes"] },
];

const GuideProfiles = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [bookingGuide, setBookingGuide] = useState<Guide | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingTravelers, setBookingTravelers] = useState(1);
  const [bookingPhone, setBookingPhone] = useState("");

  const handleBook = () => {
    if (!bookingDate || !bookingName || !bookingEmail || bookingTravelers < 1) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    toast({
      title: "Booking Request Sent! 🎉",
      description: `Booking for ${bookingTravelers} traveler${bookingTravelers > 1 ? "s" : ""} with ${bookingGuide?.name} on ${bookingDate}. Confirmation will be sent to ${bookingEmail}.`,
    });
    setBookingGuide(null);
    setBookingDate("");
    setBookingName("");
    setBookingEmail("");
    setBookingTravelers(1);
    setBookingPhone("");
  };

  return (
    <section id="guides" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-coral-light rounded-full px-4 py-1.5 mb-4">
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-sm font-body font-medium text-foreground">Expert Guides</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Meet Your Travel Guides
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Handpicked local experts who turn trips into unforgettable stories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img src={guide.photo} alt={guide.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-xs font-body font-semibold">{guide.rating}</span>
                  <span className="text-xs text-muted-foreground font-body">({guide.reviews})</span>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {guide.languages.slice(0, 2).map((l) => (
                    <span key={l} className="bg-card/80 backdrop-blur-sm text-xs font-body rounded-full px-2 py-0.5">{l}</span>
                  ))}
                  {guide.languages.length > 2 && (
                    <span className="bg-card/80 backdrop-blur-sm text-xs font-body rounded-full px-2 py-0.5">+{guide.languages.length - 2}</span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-lg text-foreground">{guide.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-xs font-body mt-1">
                  <MapPin className="w-3 h-3" /> {guide.location}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-teal-light text-primary text-xs font-body font-medium rounded-full px-2.5 py-0.5">{guide.speciality}</span>
                  <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                    <Award className="w-3 h-3" /> {guide.experience}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-accent font-display font-bold">{guide.pricePerDay}<span className="text-xs font-body text-muted-foreground font-normal">/day</span></span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs font-body rounded-full" onClick={() => setSelectedGuide(guide)}>
                      View Profile
                    </Button>
                    <Button size="sm" className="text-xs font-body rounded-full gradient-accent text-accent-foreground" onClick={() => setBookingGuide(guide)}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guide detail modal */}
        <AnimatePresence>
          {selectedGuide && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedGuide(null)} className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="glass-card max-w-lg w-full overflow-hidden">
                <div className="relative">
                  <img src={selectedGuide.photo} alt={selectedGuide.name} className="w-full h-64 object-cover" />
                  <button onClick={() => setSelectedGuide(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center"><X className="w-4 h-4" /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-foreground">{selectedGuide.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-body">{selectedGuide.location}</span>
                      <span className="mx-1">·</span>
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-body font-semibold">{selectedGuide.rating}</span>
                      <span className="text-xs text-muted-foreground font-body">({selectedGuide.reviews} reviews)</span>
                    </div>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{selectedGuide.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1">
                      <Languages className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-body">{selectedGuide.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1">
                      <Award className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-body">{selectedGuide.experience}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm mb-2">Specialities</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedGuide.highlights.map((h) => (
                        <span key={h} className="bg-teal-light text-primary text-xs font-body rounded-full px-3 py-1">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-accent font-display font-bold text-xl">{selectedGuide.pricePerDay}<span className="text-sm font-body text-muted-foreground font-normal">/day</span></span>
                    <Button className="gradient-accent text-accent-foreground rounded-full font-body" onClick={() => { setSelectedGuide(null); setBookingGuide(selectedGuide); }}>
                      Book This Guide
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Booking modal */}
        <AnimatePresence>
          {bookingGuide && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingGuide(null)} className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="glass-card max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-xl text-foreground">Book {bookingGuide.name}</h3>
                  <button onClick={() => setBookingGuide(null)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><X className="w-4 h-4" /></button>
                </div>

                <div className="flex items-center gap-3 bg-secondary rounded-lg p-3 mb-6">
                  <img src={bookingGuide.photo} alt={bookingGuide.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-body font-semibold text-sm">{bookingGuide.name}</p>
                    <p className="text-xs text-muted-foreground font-body">{bookingGuide.location} · {bookingGuide.pricePerDay}/day</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-body text-muted-foreground mb-1 block">Your Name *</label>
                    <Input value={bookingName} onChange={(e) => setBookingName(e.target.value)} placeholder="John Doe" className="font-body rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-body text-muted-foreground mb-1 block">Email *</label>
                    <Input value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} placeholder="john@example.com" type="email" className="font-body rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-body text-muted-foreground mb-1 block">Phone (optional)</label>
                    <Input value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} placeholder="+91 98765 43210" type="tel" className="font-body rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-body text-muted-foreground mb-1 block">Preferred Date *</label>
                      <Input value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} type="date" className="font-body rounded-xl" />
                    </div>
                    <div>
                      <label className="text-xs font-body text-muted-foreground mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Number of Travelers *
                      </label>
                      <Input
                        value={bookingTravelers}
                        onChange={(e) => setBookingTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                        type="number"
                        min={1}
                        max={50}
                        className="font-body rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Price summary */}
                  <div className="bg-secondary/80 rounded-xl p-3 space-y-1">
                    <div className="flex justify-between text-xs font-body text-muted-foreground">
                      <span>Guide rate</span>
                      <span>{bookingGuide.pricePerDay}/day</span>
                    </div>
                    <div className="flex justify-between text-xs font-body text-muted-foreground">
                      <span>Travelers</span>
                      <span>{bookingTravelers} person{bookingTravelers > 1 ? "s" : ""}</span>
                    </div>
                    <div className="border-t border-border pt-1 flex justify-between text-sm font-body font-semibold text-foreground">
                      <span>Note</span>
                      <span className="text-xs font-normal text-muted-foreground">Group rate may apply for 5+ travelers</span>
                    </div>
                  </div>

                  <Button onClick={handleBook} className="w-full gradient-accent text-accent-foreground font-body font-semibold rounded-full">
                    <Calendar className="w-4 h-4 mr-2" /> Confirm Booking for {bookingTravelers} Traveler{bookingTravelers > 1 ? "s" : ""}
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

export default GuideProfiles;
