import { motion } from "framer-motion";
import { Compass, Shield, Wallet, Globe, Bot, Users } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Smart Expense Calculator",
    description: "Click any destination to auto-calculate trip costs with multi-currency support.",
  },
  {
    icon: Compass,
    title: "16+ Curated Destinations",
    description: "From Jaipur to Tokyo — handpicked cities with budgets, seasons, and highlights.",
  },
  {
    icon: Bot,
    title: "AI Travel Assistant",
    description: "24/7 chatbot that helps plan trips, compare costs, and book expert guides.",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description: "Book verified guides for immersive, authentic experiences at every destination.",
  },
  {
    icon: Globe,
    title: "India & Worldwide",
    description: "Comprehensive coverage from Rajasthan's palaces to Paris's boulevards.",
  },
  {
    icon: Shield,
    title: "Travel Smart",
    description: "Budget tips, safety advice, and insider knowledge to travel with confidence.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Everything You Need to Travel Better
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg">
            Plan smarter, spend wiser, and experience more with our all-in-one travel platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 group hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
