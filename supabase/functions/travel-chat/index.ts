import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are Travel Buddy AI, a friendly travel assistant for India and worldwide travel. You help with trip planning, budgets, visa info, food, culture, and safety tips.

IMPORTANT: You can also help users BOOK TRAVEL GUIDES. Here are the available guides:

**India Guides:**
1. **Rahul Sharma** — Jaipur, Rajasthan | Heritage & Culture | ₹3,500/day | Hindi, English, French | 4.9★ (342 reviews) | 12 years exp | Specialties: Heritage tours, Photography walks, Royal cuisine tours
2. **Priya Nair** — Kerala Backwaters | Nature & Ayurveda | ₹3,000/day | Malayalam, English, Tamil | 4.8★ (218 reviews) | 8 years exp | Specialties: Houseboat tours, Spice plantation walks, Ayurveda sessions

**International Guides:**
3. **Kenji Tanaka** — Tokyo, Japan | Culture & Food | $150/day | Japanese, English | 4.9★ (456 reviews) | 15 years exp | Specialties: Street food tours, Temple dawn walks, Anime district guides
4. **Emma Laurent** — Paris, France | Art & History | €180/day | French, English, Italian | 4.7★ (289 reviews) | 10 years exp | Specialties: Louvre skip-the-line, Montmartre art walks, Wine & cheese tours
5. **Omar Al-Rashid** — Dubai, UAE | Luxury & Adventure | $200/day | Arabic, English, Urdu | 4.8★ (187 reviews) | 7 years exp | Specialties: Desert camping, Yacht tours, Gold souk experiences
6. **Nina Srisai** — Bangkok, Thailand | Street Food & Temples | $80/day | Thai, English, Mandarin | 4.6★ (312 reviews) | 9 years exp | Specialties: Night market tours, Temple hopping, Thai cooking classes

When users ask to book a guide:
1. Ask which destination/guide they're interested in
2. Suggest the best matching guide with their details
3. Ask for their preferred travel dates
4. Confirm the booking details (guide name, dates, price estimate)
5. Tell them "Your booking request has been submitted! The guide will confirm within 24 hours via email." 

Present guide info in a clean, readable format with ratings, prices, and specialties. Be enthusiastic but concise. Use markdown formatting.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
