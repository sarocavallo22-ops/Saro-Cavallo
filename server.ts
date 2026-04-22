import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Servire la cartella caa come file statici
  app.use('/caa', express.static(path.join(process.cwd(), 'caa')));

  // In-memory storage for brainstorming words
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

  const caaGameData = {
    currentPhrase: [] as { id: string, label: string, category: string, filename?: string }[],
    guess: "",
    passCount: 2,
    livesCount: 3,
    score: 0
  };

  const generateCaaWord = () => {
    const files = getCaaFiles();
    if (files.length === 0) return [];
    
    // Scegli una parola a caso dai file caricati
    const randomFile = files[Math.floor(Math.random() * files.length)];
    return [randomFile];
  };

  // API Routes
  app.get("/api/brainstorming", (req, res) => {
    res.json(brainstormingData);
  });

  app.post("/api/brainstorming", (req, res) => {
    const { type, word } = req.body;
    if (type === "stars" || type === "shadows") {
      if (word && typeof word === "string" && word.trim().length > 0) {
        brainstormingData[type].push(word.trim().substring(0, 20)); // Limit length
        // Keep only last 50 words to avoid memory issues
        if (brainstormingData[type].length > 50) {
          brainstormingData[type].shift();
        }
        return res.json({ success: true, data: brainstormingData[type] });
      }
    }
    res.status(400).json({ success: false, message: "Invalid data" });
  });

  app.post("/api/brainstorming/delete", (req, res) => {
    const { type, index } = req.body;
    if (type === "stars" || type === "shadows") {
      if (typeof index === "number" && index >= 0 && index < brainstormingData[type].length) {
        brainstormingData[type].splice(index, 1);
        return res.json({ success: true, data: brainstormingData[type] });
      }
    }
    res.status(400).json({ success: false, message: "Invalid data" });
  });

  app.get("/api/reflection", (req, res) => {
    res.json(reflectionData);
  });

  app.post("/api/reflection", (req, res) => {
    const { type, word, nickname } = req.body;
    if (type === "canDo" || type === "passion" || type === "unique") {
      if (word && typeof word === "string" && word.trim().length > 0) {
        const newItem = { 
          id: Math.random().toString(36).substring(2, 15),
          word: word.trim().substring(0, 50),
          nickname: (nickname || "Anonimo").trim().substring(0, 20),
          revealed: false
        };
        reflectionData[type].push(newItem);
        if (reflectionData[type].length > 50) {
          reflectionData[type].shift();
        }
        return res.json({ success: true, id: newItem.id });
      }
    }
    res.status(400).json({ success: false, message: "Invalid data" });
  });

  app.post("/api/reflection/reveal", (req, res) => {
    const { id } = req.body;
    let found = false;
    ['canDo', 'passion', 'unique'].forEach(type => {
      const item = reflectionData[type as keyof typeof reflectionData].find(i => i.id === id);
      if (item) {
        item.revealed = true;
        found = true;
      }
    });
    if (found) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  });

  app.post("/api/reflection/delete", (req, res) => {
    const { type, index } = req.body;
    if (type === "canDo" || type === "passion" || type === "unique") {
      if (typeof index === "number" && index >= 0 && index < reflectionData[type].length) {
        reflectionData[type].splice(index, 1);
        return res.json({ success: true, data: reflectionData[type] });
      }
    }
    res.status(400).json({ success: false, message: "Invalid data" });
  });

  app.get("/api/lyrics", (req, res) => {
    res.json(lyricsData);
  });

  app.post("/api/lyrics", (req, res) => {
    const { text, nickname } = req.body;
    if (text && typeof text === "string" && text.trim().length > 0) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 15),
        text: text.trim().substring(0, 200),
        nickname: (nickname || "Anonimo").trim().substring(0, 20)
      };
      lyricsData.push(newItem);
      if (lyricsData.length > 50) lyricsData.shift();
      return res.json({ success: true });
    }
    res.status(400).json({ success: false });
  });

  app.post("/api/lyrics/delete", (req, res) => {
    const { id } = req.body;
    const index = lyricsData.findIndex(l => l.id === id);
    if (index !== -1) {
      lyricsData.splice(index, 1);
      return res.json({ success: true });
    }
    res.status(404).json({ success: false });
  });

  app.post("/api/lyrics/reorder", (req, res) => {
    const { id, direction } = req.body;
    const index = lyricsData.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ success: false });

    if (direction === 'up' && index > 0) {
      [lyricsData[index], lyricsData[index - 1]] = [lyricsData[index - 1], lyricsData[index]];
    } else if (direction === 'down' && index < lyricsData.length - 1) {
      [lyricsData[index], lyricsData[index + 1]] = [lyricsData[index + 1], lyricsData[index]];
    }
    res.json({ success: true });
  });

  app.get("/api/discourse-map", (req, res) => {
    res.json(discourseMapData);
  });

  app.post("/api/discourse-map", (req, res) => {
    const { answer, question } = req.body;
    if (answer && typeof answer === "string" && answer.trim().length > 0) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 15),
        answer: answer.trim().substring(0, 300),
        question: question || "Mappa del Discorso",
        revealed: false
      };
      discourseMapData.push(newItem);
      if (discourseMapData.length > 50) discourseMapData.shift();
      return res.json({ success: true, id: newItem.id });
    }
    res.status(400).json({ success: false });
  });

  app.post("/api/discourse-map/reveal", (req, res) => {
    const { id } = req.body;
    const item = discourseMapData.find(i => i.id === id);
    if (item) {
      item.revealed = true;
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  });

  app.post("/api/discourse-map/delete", (req, res) => {
    const { id } = req.body;
    const index = discourseMapData.findIndex(l => l.id === id);
    if (index !== -1) {
      discourseMapData.splice(index, 1);
      return res.json({ success: true });
    }
    res.status(404).json({ success: false });
  });

  app.get("/api/caa-game", (req, res) => {
    res.json(caaGameData);
  });

  app.post("/api/caa-game/generate", (req, res) => {
    caaGameData.currentPhrase = generateCaaWord();
    caaGameData.guess = "";
    caaGameData.passCount = 2;
    caaGameData.livesCount = 3;
    caaGameData.score = 0;
    res.json({ success: true, phrase: caaGameData.currentPhrase });
  });

  app.post("/api/caa-game/pass", (req, res) => {
    if (caaGameData.passCount > 0) {
      caaGameData.passCount -= 1;
      caaGameData.currentPhrase = generateCaaWord();
      caaGameData.guess = "";
      res.json({ success: true, passCount: caaGameData.passCount, phrase: caaGameData.currentPhrase, livesCount: caaGameData.livesCount });
    } else {
      res.status(400).json({ success: false, message: "No stars left" });
    }
  });

  app.post("/api/caa-game/life-lost", (req, res) => {
    if (caaGameData.livesCount > 0) {
      caaGameData.livesCount -= 1;
      res.json({ success: true, livesCount: caaGameData.livesCount });
    } else {
      res.status(400).json({ success: false, message: "No hearts left" });
    }
  });

  app.post("/api/caa-game/reset-turn", (req, res) => {
    const { success } = req.body;
    caaGameData.guess = "";
    if (success) {
      caaGameData.score += 1;
      caaGameData.currentPhrase = generateCaaWord();
    } else {
      caaGameData.score = Math.max(0, caaGameData.score - 1);
      caaGameData.livesCount = Math.max(0, caaGameData.livesCount - 1);
    }
    res.json({ success: true, score: caaGameData.score, livesCount: caaGameData.livesCount });
  });

  app.post("/api/caa-game/guess", (req, res) => {
    const { guess } = req.body;
    caaGameData.guess = guess || "";
    res.json({ success: true });
  });

  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      // In Vercel, the file might be elsewhere, but we try to find it
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Not Found');
      }
    });
  }

  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

export default startServer();
