import { motion } from "framer-motion";
import { Compass, Shield, Wallet, Globe } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Smart Budgeting",
    description: "Calculate expenses for any destination with presets for India and worldwide travel.",
  },
  {
    icon: Compass,
    title: "Destination Explorer",
    description: "Interactive map with curated destinations, daily budgets, and travel tips.",
  },
  {
    icon: Globe,
    title: "India & Worldwide",
    description: "From Rajasthan to Tokyo — plan trips across India and 190+ countries.",
  },
  {
    icon: Shield,
    title: "Travel Safe",
    description: "Budget tips and local insights to help you travel smart and stay within budget.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Why Travel Buddy?
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Everything you need to plan the perfect trip
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center group hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
