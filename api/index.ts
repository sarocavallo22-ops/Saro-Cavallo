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
const CAA_FILES = [
  "Cina.png", "Colosseo di Roma.png", "Giappone.png", "Lupo cattivo.png", "Saturno.png", "Statua della Libertà.png", 
  "acqua.png", "aereo.png", "albero di Natale.png", "armadio.png", "assistente dello zoo.png", "astronauta.png", 
  "aula.png", "ballerina.png", "bicchiere.png", "budino.png", "buio.png", "buono.png", "calcio.png", "caldo.png", 
  "calzini.png", "campeggio.png", "cane.png", "caricare la lavatrice.png", "cartellino rosso.png", "cinema.png", 
  "cioccolato.png", "città.png", "conchiglia.png", "correre.png", "corriere.png", "cuscino.png", "dentista.png", 
  "discoteca.png", "divano.png", "diventare triste.png", "dottore.png", "esame.png", "esperimento.png", 
  "fabbrica.png", "festa.png", "fiori.png", "forchetta.png", "freddo.png", "gara di corsa.png", "gatto.png", 
  "giocare ai videogames.png", "guerra.png", "inaugurazione delle Olimpiadi.png", "incidente stradale.png", 
  "isola.png", "kebab.png", "lasagna.png", "letto.png", "libro di fiabe.png", "luna.png", "mamma.png", 
  "mangiare.png", "matita.png", "mensa.png", "mettere il cappello .png", "monopattino.png", "montagna.png", 
  "moschea.png", "motofficina.png", "nuvola.png", "occhiali da sole.png", "orecchino.png", "palestra.png", 
  "pallavolo.png", "panino.png", "patatine fritte.png", "pesci.png", "piangere.png", "piatto.png", "porta.png", 
  "regole.png", "riso.png", "ristorante.png", "scala.png", "scarpe.png", "scrivere.png", "scuola.png", 
  "sedia per la scuola.png", "serpente.png", "soldi.png", "sorella.png", "specchio.png", "spirale.png", 
  "spruzzarsi il profumo.png", "stazione.png", "studiare.png", "sushi.png", "telegiornale.png", "triangolo.png", 
  "vacanza.png", "vaso.png", "verde.png", "zaino.png", "zebra (1).png"
];

const getCaaFiles = () => {
  return CAA_FILES.map(file => ({
    id: Math.random().toString(36).substring(2, 9),
    label: file.replace(/\.(png|jpg|jpeg)$/, ''),
    filename: file,
    category: 'Simbolo'
  }));
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
