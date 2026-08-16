import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "1mb" }));

// Lazy initializer for Gemini API client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY || process.env.API_KEY),
    timestamp: Date.now()
  });
});

// Gemini Reflective Interpretation endpoint
app.post("/api/gemini/reflect", async (req, res) => {
  try {
    const {
      cardName,
      cardNameVi,
      arcana,
      suit,
      topic,
      positionLabel,
      isReversed,
      userQuestion,
      language
    } = req.body;

    const isVi = language !== "en";
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY not configured",
        useFallback: true
      });
    }

    const systemInstruction = `You are a psychological and symbolic Tarot reflection companion for an app dedicated to mindful self-reflection and personal autonomy.
CORE MANDATES:
1. NON-PREDICTIVE: Never predict the future or state what "will happen". Tarot is a mirror for reflection, not a prophecy.
2. NO FATALISM OR FEAR: Never describe cards as "bad luck", "curses", "omens of disaster", or inevitable tragedies. Reframe challenging cards (e.g. Death, Tower, 10 of Swords) into transitions, healthy boundary assessments, letting go, or cognitive clarity.
3. NO MEDICAL/LEGAL/FINANCIAL ADVICE: Never diagnose health conditions, prescribe treatments, or guarantee financial/legal outcomes.
4. TONE: Warm, calm, grounded, adult, non-judgmental, encouraging self-awareness and active human agency.
5. STRUCTURE: Return strictly valid JSON containing:
   - symbolicMeaning: An explanation of the card's archetype and visual symbolism.
   - reflection: A thoughtful, open-ended psychological reflection connecting the card to the user's topic and spread position.
   - positiveGuidance: 1 practical, realistic, constructive micro-action the user can take today.
   - reflectionPrompt: 1 deep, introspective question for journaling.
   - closing: A reminder of personal autonomy (e.g. "The card is a mirror; you hold the power to decide.").
LANGUAGE: ${isVi ? "Vietnamese (tiếng Việt tự nhiên, dịu dàng, sâu sắc)" : "English (clean, warm, reflective)"}.`;

    const promptText = `Card: ${cardName} (${cardNameVi || ""})
Orientation: ${isReversed ? "Reversed / Internalized Perspective" : "Upright"}
Arcana: ${arcana}, Suit: ${suit || "None"}
Reflection Theme: ${topic}
Spread Position: ${positionLabel}
${userQuestion ? `User's introspective query: "${userQuestion}"` : ""}

Please provide a 4-layer symbolic reflection adhering strictly to the non-predictive philosophy.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            symbolicMeaning: { type: Type.STRING, description: "Symbolic and archetypal interpretation" },
            reflection: { type: Type.STRING, description: "Introspective psychological reflection" },
            positiveGuidance: { type: Type.STRING, description: "One small constructive micro-action" },
            reflectionPrompt: { type: Type.STRING, description: "One introspective journaling prompt" },
            closing: { type: Type.STRING, description: "Autonomy reminder" }
          },
          required: ["symbolicMeaning", "reflection", "positiveGuidance", "reflectionPrompt", "closing"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      return res.status(500).json({ error: "Empty AI response", useFallback: true });
    }

    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (err: any) {
    console.error("Gemini reflect error:", err);
    res.status(500).json({
      error: err.message || "Failed to generate reflection",
      useFallback: true
    });
  }
});

// Daily card mindful prompt generator endpoint
app.post("/api/gemini/daily-prompt", async (req, res) => {
  try {
    const { cardName, isReversed, language } = req.body;
    const isVi = language !== "en";
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({ error: "No API key", useFallback: true });
    }

    const systemInstruction = `You are a mindful reflection guide. Provide one gentle, non-predictive daily reflection question and one small grounding action for today's card.
LANGUAGE: ${isVi ? "Vietnamese" : "English"}.`;

    const promptText = `Card of the day: ${cardName} (${isReversed ? "Reversed" : "Upright"}).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dailyPrompt: { type: Type.STRING },
            dailyAction: { type: Type.STRING }
          },
          required: ["dailyPrompt", "dailyAction"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      return res.status(500).json({ error: "Empty AI response", useFallback: true });
    }
    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (err: any) {
    console.error("Daily prompt error:", err);
    res.status(500).json({ error: err.message, useFallback: true });
  }
});

// Vite / static middleware integration
async function setupApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tarot Reflection App server running on http://0.0.0.0:${PORT}`);
  });
}

setupApp();
