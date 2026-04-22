import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// In-memory storage (Note: resets on Vercel occasionally)
const brainstormingData: { stars: string[], shadows: string[] } = {
  stars: [],
  shadows: []
};

const reflectionData: { 
  canDo: { id: string, word: string, nickname: string, revealed: boolean }[], 
  passion: { id: string, word: string, nickname: string, revealed: boolean }[], 
  unique: { id: string, word: string, nickname: string, revealed: boolean }[] 
} = {
  canDo: [],
  passion: [],
  unique: []
};

const lyricsData: { id: string, text: string, nickname: string }[] = [];
const discourseMapData: { id: string, answer: string, question: string, revealed: boolean }[] = [];

const caaGameData = {
  currentPhrase: [] as { id: string, label: string, category: string, filename?: string }[],
  guess: "",
  passCount: 2,
  livesCount: 3,
  score: 0
};

// --- Helpers ---
const getCaaFiles = () => {
  try {
    const caaPath = path.join(process.cwd(), 'caa');
    if (fs.existsSync(caaPath)) {
      return fs.readdirSync(caaPath)
        .filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'))
        .map(file => ({
          id: Math.random().toString(36).substring(2, 9),
          label: file.replace(/\.(png|jpg|jpeg)$/, ''),
          filename: file,
          category: 'Simbolo'
        }));
    }
  } catch (e) {
    console.error("Error reading caa directory", e);
  }
  return [];
};

const generateCaaWord = () => {
  const files = getCaaFiles();
  if (files.length === 0) return [];
  const randomFile = files[Math.floor(Math.random() * files.length)];
  return [randomFile];
};

// --- API Routes ---
app.get("/api/brainstorming", (req, res) => res.json(brainstormingData));
app.post("/api/brainstorming", (req, res) => {
  const { type, word } = req.body;
  if (brainstormingData[type as keyof typeof brainstormingData]) {
    brainstormingData[type as keyof typeof brainstormingData].push(word.trim().substring(0, 50));
    return res.json({ success: true });
  }
  res.status(400).send("Invalid type");
});

app.post("/api/brainstorming/delete", (req, res) => {
  const { type, index } = req.body;
  if (brainstormingData[type as keyof typeof brainstormingData]) {
    brainstormingData[type as keyof typeof brainstormingData].splice(index, 1);
    return res.json({ success: true });
  }
  res.status(400).send("Invalid type");
});

app.get("/api/reflection", (req, res) => res.json(reflectionData));
app.post("/api/reflection", (req, res) => {
  const { type, word, nickname } = req.body;
  if (reflectionData[type as keyof typeof reflectionData]) {
    const newItem = { id: Math.random().toString(36).substring(2, 10), word, nickname, revealed: false };
    reflectionData[type as keyof typeof reflectionData].push(newItem);
    return res.json({ success: true, id: newItem.id });
  }
  res.status(400).send("Invalid type");
});

app.post("/api/reflection/reveal", (req, res) => {
  const { id } = req.body;
  for (let type in reflectionData) {
    const item = reflectionData[type as keyof typeof reflectionData].find(i => i.id === id);
    if (item) { item.revealed = true; return res.json({ success: true }); }
  }
  res.status(404).send("Not found");
});

app.get("/api/lyrics", (req, res) => res.json(lyricsData));
app.post("/api/lyrics", (req, res) => {
  lyricsData.push({ id: Math.random().toString(36).substring(2, 10), text: req.body.text, nickname: req.body.nickname });
  res.json({ success: true });
});

app.get("/api/discourse-map", (req, res) => res.json(discourseMapData));
app.post("/api/discourse-map", (req, res) => {
  const newItem = { id: Math.random().toString(36).substring(2, 10), answer: req.body.answer, question: req.body.question, revealed: false };
  discourseMapData.push(newItem);
  res.json({ success: true, id: newItem.id });
});

app.get("/api/caa-game", (req, res) => res.json(caaGameData));
app.post("/api/caa-game/generate", (req, res) => {
  caaGameData.currentPhrase = generateCaaWord();
  caaGameData.score = 0;
  caaGameData.livesCount = 3;
  res.json({ success: true });
});

app.post("/api/caa-game/reset-turn", (req, res) => {
  const { success } = req.body;
  if (success) {
    caaGameData.score += 1;
    caaGameData.currentPhrase = generateCaaWord();
  } else {
    caaGameData.score = Math.max(0, caaGameData.score - 1);
    caaGameData.livesCount = Math.max(0, caaGameData.livesCount - 1);
  }
  res.json({ success: true, score: caaGameData.score, livesCount: caaGameData.livesCount });
});

app.post("/api/caa-game/pass", (req, res) => {
  if (caaGameData.passCount > 0) {
    caaGameData.passCount--;
    caaGameData.currentPhrase = generateCaaWord();
    res.json({ success: true });
  } else res.status(400).send("No passes left");
});

app.get("/api/health", (req, res) => res.json({ status: "ok", env: process.env.NODE_ENV }));

export default app;
