import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Plane, Hotel, Utensils, Camera, Car, Plus, Trash2, IndianRupee, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { City } from "@/components/CityExplorer";

type ExpenseItem = {
  id: string;
  category: string;
  description: string;
  amount: number;
};

const categories = [
  { value: "transport", label: "Transport", icon: Car },
  { value: "accommodation", label: "Accommodation", icon: Hotel },
  { value: "food", label: "Food & Drinks", icon: Utensils },
  { value: "activities", label: "Activities", icon: Camera },
  { value: "flights", label: "Flights", icon: Plane },
  { value: "other", label: "Other", icon: Plus },
];

const getPresetForCity = (city: City): ExpenseItem[] => {
  const daily = city.budgetPerDay;
  return [
    { id: crypto.randomUUID(), category: "accommodation", description: `Stay in ${city.name}`, amount: Math.round(daily * 0.4) },
    { id: crypto.randomUUID(), category: "food", description: `Meals in ${city.name}`, amount: Math.round(daily * 0.25) },
    { id: crypto.randomUUID(), category: "transport", description: `Local transport`, amount: Math.round(daily * 0.15) },
    { id: crypto.randomUUID(), category: "activities", description: `${city.highlights[0] || "Sightseeing"}`, amount: Math.round(daily * 0.2) },
  ];
};

const presets = {
  india: {
    label: "India Budget (per day)",
    items: [
      { category: "accommodation", description: "Budget Hotel", amount: 1500 },
      { category: "food", description: "Meals (3x)", amount: 800 },
      { category: "transport", description: "Local Transport", amount: 500 },
      { category: "activities", description: "Sightseeing", amount: 600 },
    ],
  },
  international: {
    label: "International Budget (per day)",
    items: [
      { category: "accommodation", description: "Hotel/Hostel", amount: 5000 },
      { category: "food", description: "Meals (3x)", amount: 3000 },
      { category: "transport", description: "Local Transport", amount: 1500 },
      { category: "activities", description: "Attractions", amount: 2500 },
    ],
  },
};

type Props = {
  selectedCity?: City | null;
};

const ExpenseCalculator = ({ selectedCity }: Props) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [days, setDays] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [newCategory, setNewCategory] = useState("transport");
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [activeCityName, setActiveCityName] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCity) {
      setExpenses(getPresetForCity(selectedCity));
      setCurrency(selectedCity.region === "india" ? "INR" : "USD");
      setActiveCityName(selectedCity.name);
      setDays(3);
    }
  }, [selectedCity]);

  const addExpense = () => {
    if (!newDescription || !newAmount) return;
    setExpenses([
      ...expenses,
      { id: crypto.randomUUID(), category: newCategory, description: newDescription, amount: parseFloat(newAmount) },
    ]);
    setNewDescription("");
    setNewAmount("");
  };

  const removeExpense = (id: string) => setExpenses(expenses.filter((e) => e.id !== id));

  const loadPreset = (preset: "india" | "international") => {
    setExpenses(presets[preset].items.map((item) => ({ ...item, id: crypto.randomUUID() })));
    setActiveCityName(null);
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalForTrip = total * days * travelers;
  const exchangeRate = 83.5;
  const displayTotal = currency === "INR" ? totalForTrip : totalForTrip / exchangeRate;
  const currencySymbol = currency === "INR" ? "₹" : "$";

  const getCategoryIcon = (cat: string) => {
    const found = categories.find((c) => c.value === cat);
    return found ? found.icon : Plus;
  };

  return (
    <section id="calculator" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-coral-light rounded-full px-4 py-1.5 mb-4">
            <Calculator className="w-4 h-4 text-accent" />
            <span className="text-sm font-body font-medium text-foreground">Smart Calculator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Trip Expense Calculator
          </h2>
          {activeCityName ? (
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mt-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-body font-semibold text-primary">Calculating for {activeCityName}</span>
            </div>
          ) : (
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Select a city above or add expenses manually
            </p>
          )}
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass-card p-6 space-y-6"
          >
            <div>
              <p className="text-sm font-body font-medium text-foreground mb-3">Quick Presets</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => loadPreset("india")} className="font-body rounded-full">
                  🇮🇳 India Budget
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadPreset("international")} className="font-body rounded-full">
                  🌍 International
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-body text-muted-foreground mb-1 block">Currency</label>
                <Select value={currency} onValueChange={(v) => setCurrency(v as "INR" | "USD")}>
                  <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">₹ INR</SelectItem>
                    <SelectItem value="USD">$ USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-body text-muted-foreground mb-1 block">Days</label>
                <Input type="number" min={1} value={days} onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))} className="font-body" />
              </div>
              <div>
                <label className="text-xs font-body text-muted-foreground mb-1 block">Travelers</label>
                <Input type="number" min={1} value={travelers} onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))} className="font-body" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-body font-medium text-foreground">Add Expense</p>
              <div className="flex gap-2">
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger className="w-36 font-body"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="font-body" />
                <Input placeholder="Amount" type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="w-28 font-body" />
                <Button onClick={addExpense} size="icon" className="gradient-accent shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {expenses.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-8 font-body">
                  No expenses yet. Select a destination or load a preset!
                </p>
              )}
              {expenses.map((expense, i) => {
                const Icon = getCategoryIcon(expense.category);
                return (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-body text-sm flex-1">{expense.description}</span>
                    <span className="font-body font-semibold text-sm">
                      {currencySymbol}{(currency === "INR" ? expense.amount : expense.amount / exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <button onClick={() => removeExpense(expense.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Summary Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-4"
          >
            <div className="glass-card p-6 gradient-primary text-primary-foreground">
              <p className="text-sm opacity-80 font-body mb-1">
                {activeCityName ? `${activeCityName} Trip Cost` : "Total Trip Cost"}
              </p>
              <div className="flex items-baseline gap-1">
                {currency === "INR" ? <IndianRupee className="w-6 h-6" /> : <DollarSign className="w-6 h-6" />}
                <span className="text-4xl font-display font-bold">
                  {displayTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <p className="text-xs opacity-60 font-body mt-2">
                {days} day{days > 1 ? "s" : ""} × {travelers} traveler{travelers > 1 ? "s" : ""}
              </p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <p className="font-body font-semibold text-sm text-foreground">Breakdown per day</p>
              {categories.map((cat) => {
                const catTotal = expenses.filter((e) => e.category === cat.value).reduce((s, e) => s + e.amount, 0);
                if (catTotal === 0) return null;
                const Icon = cat.icon;
                const displayAmt = currency === "INR" ? catTotal : catTotal / exchangeRate;
                return (
                  <div key={cat.value} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-body flex-1 text-muted-foreground">{cat.label}</span>
                    <span className="text-sm font-body font-semibold">
                      {currencySymbol}{displayAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="glass-card p-6">
              <p className="font-body font-semibold text-sm text-foreground mb-2">💡 Budget Tips</p>
              <ul className="space-y-2 text-xs text-muted-foreground font-body">
                <li>• Book trains early on IRCTC for best fares</li>
                <li>• Street food in India costs ₹50-200 per meal</li>
                <li>• Use local buses for budget-friendly transport</li>
                <li>• Shoulder season (Sep-Nov) has best deals</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseCalculator;
