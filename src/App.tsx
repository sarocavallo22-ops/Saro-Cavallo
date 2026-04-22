import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Users, 
  Backpack, 
  Navigation, 
  Flag, 
  RotateCw, 
  Star, 
  Moon, 
  Music, 
  Heart, 
  Camera, 
  Gamepad2, 
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Music2,
  Lightbulb,
  Map as MapIcon,
  Timer as TimerIcon,
  QrCode,
  Send,
  Monitor,
  Cpu,
  Info,
  Trash2,
  RefreshCw,
  X,
  XCircle,
  Globe,
  Circle,
  ChevronUp,
  ChevronDown,
  Zap,
  Smile,
  Plus,
  Droplets,
  Handshake,
  Bus,
  Bath,
  Ticket,
  ShoppingBag,
  Coffee,
  Bed,
  Smartphone,
  BookOpen,
  Book,
  Car,
  Mountain,
  Skull,
  Newspaper,
  Sun,
  Wifi,
  Briefcase,
  Waves,
  Mail,
  Timer,
  Feather,
  Banknote,
  GraduationCap,
  Phone,
  Tv,
  Gem,
  School,
  LogOut,
  Brain,
  Palette,
  Eye,
  Snowflake,
  Clock,
  Skull as SkullIcon,
  ShoppingBasket,
  Utensils,
  Activity,
  Scissors,
  Train,
  Box,
  User,
  Footprints,
  Settings,
  Edit3,
  Shield,
  Download,
  Hourglass,
  Square,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';

// --- Types ---
type Session = {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
};

const SESSIONS: Session[] = [
  { id: 0, title: "Home", subtitle: "Benvenuti a bordo", icon: <Moon className="w-6 h-6" />, color: "sky" },
  { id: 1, title: "Incontro 1", subtitle: "L'Equipaggio", icon: <Users className="w-6 h-6" />, color: "blue" },
  { id: 2, title: "Incontro 2", subtitle: "Lo Zaino", icon: <Backpack className="w-6 h-6" />, color: "purple" },
  { id: 3, title: "Incontro 3", subtitle: "Il Decollo", icon: <Rocket className="w-6 h-6" />, color: "indigo" },
  { id: 4, title: "Incontro 4", subtitle: "L'Atterraggio", icon: <Flag className="w-6 h-6" />, color: "emerald" },
];

// --- Components ---

const SURVIVAL_ITEMS = [
  { id: 'matches', name: 'Scatola di fiammiferi', icon: <AlertCircle className="w-5 h-5" />, rank: 15, comment: "Non esiste O2" },
  { id: 'food', name: 'Alimento concentrato', icon: <Utensils className="w-5 h-5" />, rank: 4, comment: "Abbastanza indispensabile" },
  { id: 'parachute', name: 'Seta per paracadute', icon: <Flag className="w-5 h-5" />, rank: 8, comment: "Barelle a riparo" },
  { id: 'pistols', name: '2 pistole calibro 45', icon: <AlertCircle className="w-5 h-5" />, rank: 11, comment: "Perché necessarie?" },
  { id: 'milk', name: 'Cassa di latte in polvere', icon: <Utensils className="w-5 h-5" />, rank: 12, comment: "Troppa H2O" },
  { id: 'oxygen', name: '2 bombole di ossigeno da 100 litri', icon: <AlertCircle className="w-5 h-5" />, rank: 1, comment: "Semplice sopravvivenza" },
  { id: 'heater', name: 'Elemento riscaldante portatile', icon: <TimerIcon className="w-5 h-5" />, rank: 13, comment: "Non è necessario. Elevatissima temperatura della faccia illuminata della luna" },
  { id: 'rope', name: '50 metri di fune nylon', icon: <Navigation className="w-5 h-5" />, rank: 6, comment: "Trasporto" },
  { id: 'star_map', name: 'Mappa stellare della costellazione lunare', icon: <MapIcon className="w-5 h-5" />, rank: 3, comment: "Importante per l'orientamento" },
  { id: 'raft', name: 'Canotto (autogonfiabile)', icon: <Circle className="w-5 h-5" />, rank: 9, comment: "Non di uso primario" },
  { id: 'compass', name: 'Bussola magnetica', icon: <Navigation className="w-5 h-5" />, rank: 14, comment: "Nessun magnetismo" },
  { id: 'water', name: '50 litri d\'acqua', icon: <Utensils className="w-5 h-5" />, rank: 2, comment: "Sopravvivenza" },
  { id: 'flares', name: 'Razzi chimici di segnalazione', icon: <Rocket className="w-5 h-5" />, rank: 10, comment: "Uso discutibile" },
  { id: 'first_aid', name: 'Cassetta di pronto soccorso', icon: <Heart className="w-5 h-5" />, rank: 7, comment: "Di qualche utilità" },
  { id: 'radio', name: 'Apparecchio radio FM solare', icon: <MessageSquare className="w-5 h-5" />, rank: 5, comment: "Potrebbe ricevere o trasmettere alla navicella madre quando questa è in vista." },
];

const StudentInput = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const game = urlParams.get('game');
  const mode = urlParams.get('mode');

  const [starWord, setStarWord] = useState("");
  const [shadowWord, setShadowWord] = useState("");
  const [ranking, setRanking] = useState<string[]>([]);
  const [reflection, setReflection] = useState({ canDo: "", passion: "", unique: "", nickname: "" });
  const [lyricText, setLyricText] = useState("");
  const [discourseAnswer, setDiscourseAnswer] = useState("");
  const [nickname, setNickname] = useState(() => localStorage.getItem('student_nickname') || "");
  const [sentRecords, setSentRecords] = useState<{ id: string, text: string, type: string }[]>(() => {
    const saved = localStorage.getItem('student_sent_records');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('student_sent_records', JSON.stringify(sentRecords));
  }, [sentRecords]);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('student_nickname', nickname);
  }, [nickname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (game === 'survival' || game === 'survival_class') {
        // Handle survival ranking submission
      } else if (mode === 'lyrics') {
        if (lyricText.trim()) {
          await fetch('/api/lyrics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: lyricText.trim(), nickname: nickname.trim() || "Anonimo" })
          });
          setSubmitted(true);
        }
      } else if (mode === 'discourse_map') {
        if (discourseAnswer.trim()) {
          const res = await fetch('/api/discourse-map', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer: discourseAnswer.trim() })
          });
          const data = await res.json();
          if (data.success) {
            setSentRecords([{ id: data.id, text: discourseAnswer.trim(), type: 'Mappa del Discorso' }]);
            setSubmitted(true);
          }
        }
      } else if (mode === 'reflection') {
        const payload = { nickname: reflection.nickname.trim() || "Anonimo" };
        const newSent = [];
        
        if (reflection.canDo.trim()) {
          const res = await fetch('/api/reflection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, type: 'canDo', word: reflection.canDo.trim() })
          });
          const data = await res.json();
          if (data.success) newSent.push({ id: data.id, text: reflection.canDo.trim(), type: 'Cosa mi piace/non mi piace' });
        }
        if (reflection.passion.trim()) {
          const res = await fetch('/api/reflection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, type: 'passion', word: reflection.passion.trim() })
          });
          const data = await res.json();
          if (data.success) newSent.push({ id: data.id, text: reflection.passion.trim(), type: 'Quali sono i miei punti di forza' });
        }
        if (reflection.unique.trim()) {
          const res = await fetch('/api/reflection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, type: 'unique', word: reflection.unique.trim() })
          });
          const data = await res.json();
          if (data.success) newSent.push({ id: data.id, text: reflection.unique.trim(), type: 'Quali esperienze porto con me' });
        }
        setSentRecords(newSent.map(item => ({ id: item.id, text: item.text, type: item.type })));
        setSubmitted(true);
      } else {
        if (starWord.trim()) {
          await fetch('/api/brainstorming', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'stars', word: starWord.trim() })
          });
        }
        if (shadowWord.trim()) {
          await fetch('/api/brainstorming', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'shadows', word: shadowWord.trim() })
          });
        }
      }
      setSubmitted(true);
      confetti({ particleCount: 50, spread: 60 });
    } catch (err) {
      console.error(err);
    }
  };

  const toggleItem = (id: string) => {
    if (ranking.includes(id)) {
      setRanking(ranking.filter(i => i !== id));
    } else {
      setRanking([...ranking, id]);
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newRanking = [...ranking];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newRanking.length) return;
    [newRanking[index], newRanking[targetIndex]] = [newRanking[targetIndex], newRanking[index]];
    setRanking(newRanking);
  };

  const revealOnLim = async (id: string, type: string) => {
    try {
      const endpoint = type === 'Mappa del Discorso' ? '/api/discourse-map/reveal' : '/api/reflection/reveal';
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      confetti({ particleCount: 30, spread: 50 });
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-950">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Messaggio Inviato!</h2>
        <p className="text-slate-400 mb-8">Le tue risposte sono ora in orbita nella galassia della classe.</p>
        
        {(mode === 'reflection' || mode === 'discourse_map') && sentRecords.length > 0 && (
          <div className="w-full max-w-md space-y-4 mb-8">
            <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest">Il tuo equipaggiamento:</h3>
            {sentRecords.map((r, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{r.type}</span>
                  <span className="text-xs text-slate-300 italic truncate max-w-[200px]">"{r.text}"</span>
                </div>
                <button 
                  onClick={() => revealOnLim(r.id, r.type)}
                  className="btn-primary py-2 text-sm justify-center bg-purple-600 hover:bg-purple-500"
                >
                  Scopri sulla LIM <Monitor className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => { setSubmitted(false); setShowForm(false); setStarWord(""); setShadowWord(""); setRanking([]); setReflection({ canDo: "", passion: "", unique: "", nickname: "" }); setSentRecords([]); setDiscourseAnswer(""); }} className="btn-secondary">Invia di nuovo</button>
      </div>
    );
  }

  if (mode === 'discourse_map') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="space-card w-full max-w-md border-sky-500/30">
          <div className="text-center mb-8">
            <MapIcon className="w-12 h-12 text-sky-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Mappa del Discorso</h2>
            <p className="text-xs text-slate-500 italic">Rispondi alle domande per costruire il tuo percorso.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> La tua Risposta
              </label>
              <textarea
                value={discourseAnswer}
                onChange={(e) => setDiscourseAnswer(e.target.value)}
                placeholder="Inserisci qui il tuo pensiero..."
                maxLength={300}
                required
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors resize-none"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-4 text-lg">
              <Send className="w-5 h-5" /> Invia Risposta
            </button>
          </form>
        </div>
      </div>
    );
  }
  if (mode === 'lyrics') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="space-card w-full max-w-md border-purple-500/30">
          <div className="text-center mb-8">
            <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Segnali dallo Spazio</h2>
            <p className="text-xs text-slate-500 italic">Invia una frase della tua canzone preferita</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                <Users className="w-4 h-4" /> Il tuo Nome/Nickname
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Come vuoi farti riconoscere?"
                maxLength={20}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> La tua Frase
              </label>
              <textarea
                value={lyricText}
                onChange={(e) => setLyricText(e.target.value)}
                placeholder="Inserisci qui la frase della canzone..."
                maxLength={200}
                required
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors resize-none"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-4 text-lg">
              <Send className="w-5 h-5" /> Invia Segnale
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (mode === 'caa_game') {
    const [role, setRole] = useState<'selection' | 'descriptors' | 'guesser'>('selection');
    const [gameState, setGameState] = useState<any>(null);
    const [myGuess, setMyGuess] = useState("");

    const fetchGame = async () => {
      try {
        const res = await fetch('/api/caa-game');
        const data = await res.json();
        setGameState(data);
      } catch (err) { console.error(err); }
    };

    useEffect(() => {
      fetchGame();
      const interval = setInterval(fetchGame, 2000);
      return () => clearInterval(interval);
    }, []);

    const handlePass = async () => {
      if (!gameState || gameState.passCount <= 0) return;
      try {
        await fetch('/api/caa-game/pass', { method: 'POST' });
        fetchGame();
      } catch (err) { console.error(err); }
    };

    const handleGuess = async () => {
      try {
        await fetch('/api/caa-game/guess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guess: myGuess })
        });
        setMyGuess("");
        confetti({ particleCount: 40, spread: 70 });
      } catch (err) { console.error(err); }
    };

    if (role === 'selection') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950 gap-8">
          <div className="text-center space-y-2">
            <Zap className="w-12 h-12 text-indigo-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-black uppercase tracking-tighter">Parole in Orbita</h2>
            <p className="text-slate-500">Scegli il tuo ruolo nell'equipaggio</p>
          </div>
          <div className="grid w-full max-w-sm gap-4">
            <button 
              onClick={() => setRole('descriptors')}
              className="p-8 bg-indigo-600 rounded-3xl border border-indigo-400 shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:scale-105 transition-transform flex flex-col items-center gap-3"
            >
              <Users className="w-10 h-10" />
              <div className="text-center">
                <div className="font-black uppercase tracking-widest text-lg">Descrittori</div>
                <div className="text-xs opacity-70">Vedete il messaggio e lo descrivete</div>
              </div>
            </button>
            <button 
              onClick={() => setRole('guesser')}
              className="p-8 bg-emerald-600 rounded-3xl border border-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform flex flex-col items-center gap-3"
            >
              <Cpu className="w-10 h-10" />
              <div className="text-center">
                <div className="font-black uppercase tracking-widest text-lg">Pulsantiera</div>
                <div className="text-xs opacity-70">Il vostro compito è indovinare!</div>
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (role === 'descriptors') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
              <Users className="w-4 h-4" /> Modalità Descrittori
            </h2>
            
            <div className="space-card bg-indigo-900/20 border-indigo-500/30 p-8">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] block mb-6 text-center">Messaggio da Far Indovinare:</span>
              <div className="flex flex-col gap-4 items-center">
                {gameState?.currentPhrase?.length ? (
                  gameState.currentPhrase.map((s: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 w-full p-4 bg-white rounded-2xl shadow-xl">
                      <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-xl text-slate-900 shrink-0">
                        <CAAIcon label={s.label} className="w-8 h-8" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.category}</span>
                        <span className="text-2xl font-black text-slate-900 uppercase">{s.label}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">In attesa di un messaggio...</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handlePass}
                disabled={!gameState?.passCount}
                className="btn-primary w-full justify-center py-6 text-xl bg-orange-600 hover:bg-orange-500 border-orange-400 shadow-[0_10px_30px_rgba(234,88,12,0.3)] disabled:opacity-30"
              >
                <RefreshCw className="w-6 h-6" /> PASSA
              </button>
              <div className="text-center text-xs text-slate-600">
                Hai ancora <strong>{gameState?.passCount || 0}</strong> tentativi di salto disponibili
              </div>
              <button onClick={() => setRole('selection')} className="btn-secondary py-3 text-xs w-full justify-center">Cambia Ruolo</button>
            </div>
          </div>
        </div>
      );
    }

    if (role === 'guesser') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
          <div className="w-full max-w-md space-y-12">
            <h2 className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4" /> Modalità Pulsantiera
            </h2>

            <div className="relative">
              <button 
                onClick={() => {
                  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                }}
                className="w-full aspect-square rounded-full bg-emerald-600 border-8 border-emerald-500 shadow-[0_20px_60px_rgba(16,185,129,0.3),inset_0_-10px_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-4 group active:scale-95 active:translate-y-2 transition-all"
              >
                <Zap className="w-20 h-20 text-white fill-current group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black uppercase tracking-widest">PRENOTATI!</span>
              </button>
              <div className="absolute -inset-4 rounded-full border-2 border-emerald-500/20 border-dashed animate-[spin_20s_linear_infinite]" />
            </div>

            {/* Display Symbols for Guesser too (optional but requested "spunta sotto il messaggio") */}
            {gameState?.currentPhrase?.length > 0 && (
              <div className="flex justify-center gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                {gameState.currentPhrase.map((s: any, i: number) => (
                  <div key={i} className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg transform -rotate-3 odd:rotate-3">
                    <CAAIcon label={s.label} className="w-10 h-10" />
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 block text-center">La tua Risposta:</label>
              <input 
                type="text"
                placeholder="Scrivi qui..."
                value={myGuess}
                onChange={(e) => setMyGuess(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 text-3xl font-black text-center uppercase tracking-tighter focus:border-emerald-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
              />
              <button 
                onClick={handleGuess}
                className="btn-primary w-full justify-center py-6 text-2xl bg-emerald-600 hover:bg-emerald-500 border-emerald-400 shadow-[0_15px_40px_rgba(16,185,129,0.3)]"
              >
                <Send className="w-6 h-6" /> INVIA RISPOSTA
              </button>
              <button onClick={() => setRole('selection')} className="btn-secondary py-3 text-xs w-full justify-center border-none">Cambia Ruolo</button>
            </div>
          </div>
        </div>
      );
    }
  }

  if (mode === 'reflection') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="space-card w-full max-w-md border-purple-500/30">
          <div className="text-center mb-8">
            <Backpack className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Il Mio Equipaggiamento</h2>
            <p className="text-xs text-slate-500 italic">Cosa porto con me nel viaggio verso l'esame?</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                <Users className="w-4 h-4" /> Il tuo Nome/Nickname
              </label>
              <input
                type="text"
                value={reflection.nickname}
                onChange={(e) => setReflection({ ...reflection, nickname: e.target.value })}
                placeholder="Come vuoi farti riconoscere?"
                maxLength={20}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Cosa mi piace/non mi piace
              </label>
              <input
                type="text"
                value={reflection.canDo}
                onChange={(e) => setReflection({ ...reflection, canDo: e.target.value })}
                placeholder="Un tuo pensiero..."
                maxLength={50}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-pink-400 flex items-center gap-2">
                <Heart className="w-4 h-4" /> Quali sono i miei punti di forza
              </label>
              <input
                type="text"
                value={reflection.passion}
                onChange={(e) => setReflection({ ...reflection, passion: e.target.value })}
                placeholder="Ciò che ti rende forte..."
                maxLength={50}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <Smile className="w-4 h-4" /> Quali esperienze porto con me
              </label>
              <input
                type="text"
                value={reflection.unique}
                onChange={(e) => setReflection({ ...reflection, unique: e.target.value })}
                placeholder="Le tappe del tuo viaggio..."
                maxLength={50}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-4 text-lg">
              <Send className="w-5 h-5" /> Invia Riflessione
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (game === 'survival' || game === 'survival_class') {
    return (
      <div className="min-h-screen bg-slate-950 p-4 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-sky-400 uppercase italic">
              {game === 'survival_class' ? 'Classifica di Classe' : 'Avventura nello Spazio'}
            </h2>
            <p className="text-xs text-slate-400">
              {game === 'survival_class' 
                ? 'Registra la decisione collettiva dell\'equipaggio' 
                : 'Ordina gli oggetti per importanza (1 = più importante)'}
            </p>
          </div>

          <div className="space-card border-emerald-500/30">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" /> La Tua Classifica
            </h3>
            {ranking.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl">
                <p className="text-sm">Seleziona gli oggetti sotto</p>
              </div>
            ) : (
              <div className="space-y-2">
                {ranking.map((id, index) => {
                  const item = SURVIVAL_ITEMS.find(i => i.id === id)!;
                  return (
                    <motion.div
                      layout
                      key={id}
                      className="flex items-center gap-3 p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-sky-500 text-white text-[10px] font-bold rounded-full shrink-0">
                        {index + 1}
                      </span>
                      <span className="font-medium text-xs flex-1">{item.name}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => moveItem(index, 'up')} className="p-1 text-sky-400"><ChevronUp className="w-4 h-4" /></button>
                        <button onClick={() => moveItem(index, 'down')} className="p-1 text-sky-400"><ChevronDown className="w-4 h-4" /></button>
                        <button onClick={() => toggleItem(id)} className="p-1 text-slate-500"><X className="w-4 h-4" /></button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-card">
            <h3 className="text-lg font-bold mb-4">Oggetti Disponibili</h3>
            <div className="grid gap-2">
              {SURVIVAL_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  disabled={ranking.includes(item.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                    ranking.includes(item.id) 
                      ? 'bg-slate-800/50 border-slate-700 opacity-50 grayscale' 
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <div className="p-1.5 bg-slate-700 rounded-lg shrink-0">{item.icon}</div>
                  <div className="font-medium text-xs">{item.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-lg border-t border-slate-800">
            <button 
              onClick={handleSubmit}
              disabled={ranking.length === 0}
              className="btn-primary w-full justify-center py-4 text-lg"
            >
              Invia Classifica <Send />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950 space-y-6">
        <h2 className="text-3xl font-bold text-center mb-4">Briefing Galattico</h2>
        
        <div className="grid gap-6 w-full max-w-md">
          <div className="space-card border-yellow-500/30 bg-yellow-500/5">
            <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
              <Star className="fill-yellow-400" /> Le Stelle che Brillano
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Rappresentano i punti di forza del nostro gruppo. Sono quelle qualità, talenti e modi di stare insieme che rendono la nostra classe speciale e luminosa. Cosa ci fa brillare quando siamo uniti?
            </p>
          </div>

          <div className="space-card border-blue-500/30 bg-blue-500/5">
            <h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2">
              <Moon className="fill-blue-400" /> Le Zone d'Ombra
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sono le nostre fragilità, le sfide che non abbiamo ancora superato o le occasioni in cui non siamo riusciti a crescere insieme. Cosa ci ha frenato o reso il viaggio più difficile?
            </p>
          </div>
        </div>

        <button onClick={() => setShowForm(true)} className="btn-primary w-full max-w-md justify-center py-4 text-lg">
          Invia Messaggio <Send />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
      <div className="space-card w-full max-w-md border-sky-500/30">
        <h2 className="text-2xl font-bold mb-6 text-center">Inserisci le tue parole</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-yellow-400">Stelle che Brillano</label>
            <input
              type="text"
              value={starWord}
              onChange={(e) => setStarWord(e.target.value)}
              placeholder="Esempio: Collaborazione..."
              maxLength={20}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-blue-400">Zone d'Ombra</label>
            <input
              type="text"
              value={shadowWord}
              onChange={(e) => setShadowWord(e.target.value)}
              placeholder="Esempio: Rumore..."
              maxLength={20}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button type="submit" className="btn-primary w-full justify-center py-4">
            <Send className="w-5 h-5" /> Lancia in Orbita
          </button>
        </form>
      </div>
    </div>
  );
};

const BrainstormingCloud = () => {
  const [data, setData] = useState<{ stars: string[], shadows: string[] }>({ stars: [], shadows: [] });
  const [showInfo, setShowInfo] = useState(false);
  const appUrl = window.location.origin;

  const fetchData = async () => {
    try {
      const res = await fetch('/api/brainstorming');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const deleteWord = async (type: 'stars' | 'shadows', index: number) => {
    try {
      await fetch('/api/brainstorming/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, index })
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold">La Galassia della Classe: Mappa del Viaggio</h3>
            <button 
              onClick={() => setShowInfo(true)}
              className="p-2 bg-sky-500/10 text-sky-400 rounded-full hover:bg-sky-500/20 transition-all"
            >
              <Star className="w-5 h-5 fill-sky-400" />
            </button>
          </div>
          <p className="text-slate-400 text-sm">Visualizziamo la nostra rotta. Le vostre parole creano le costellazioni che guideranno il nostro decollo.</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-2xl">
          <QRCodeSVG value={`${appUrl}?mode=student`} size={120} />
        </div>
      </div>

      <div className="relative min-h-[600px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        {/* Star Map Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/starmap/1920/1080?blur=10')] bg-cover bg-center opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50" />
          
          {/* Constellation Lines (Decorative) */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="white" strokeWidth="1" />
            <line x1="30%" y1="40%" x2="20%" y2="70%" stroke="white" strokeWidth="1" />
            <line x1="80%" y1="10%" x2="70%" y2="30%" stroke="white" strokeWidth="1" />
            <line x1="70%" y1="30%" x2="90%" y2="50%" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 p-12 flex flex-wrap gap-8 items-center justify-center min-h-[600px]">
          {data.stars.length === 0 && data.shadows.length === 0 ? (
            <div className="text-center space-y-4">
              <Navigation className="w-12 h-12 text-slate-700 mx-auto animate-pulse" />
              <p className="text-slate-500 font-medium italic">In attesa di coordinate dall'equipaggio...</p>
            </div>
          ) : (
            <>
              {data.stars.map((w, i) => (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={`star-${i}`}
                  className="group relative px-6 py-3 bg-yellow-400/5 text-yellow-400 border border-yellow-400/20 rounded-full text-xl font-bold shadow-[0_0_30px_rgba(250,204,21,0.15)] hover:bg-yellow-400/10 transition-all cursor-default flex items-center gap-2"
                >
                  <Star className="w-4 h-4 fill-yellow-400 animate-pulse" />
                  {w}
                  <button 
                    onClick={() => deleteWord('stars', i)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
              {data.shadows.map((w, i) => (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={`shadow-${i}`}
                  className="group relative px-6 py-3 bg-blue-500/5 text-blue-400 border border-blue-500/20 rounded-full text-xl font-bold shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:bg-blue-500/10 transition-all cursor-default flex items-center gap-2"
                >
                  <Moon className="w-4 h-4 fill-blue-400 opacity-50" />
                  {w}
                  <button 
                    onClick={() => deleteWord('shadows', i)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Info Modal for Session 2 */}
      <AnimatePresence>
        {showInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="space-card max-w-lg w-full border-sky-500/50 relative"
            >
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X />
              </button>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-sky-400">
                <Star className="w-6 h-6 fill-sky-400" /> Mappa del Viaggio
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Prima del decollo, dobbiamo tracciare la nostra rotta stellare. Questa mappa non è fatta di coordinate fredde, ma delle vostre parole.
                </p>
                <p>
                  Le <span className="text-yellow-400 font-bold">Stelle che Brillano</span> sono i punti di forza del gruppo, ciò che ci rende uniti e capaci di volare alto.
                </p>
                <p>
                  Le <span className="text-blue-400 font-bold">Zone d'Ombra</span> sono le nostre fragilità, le nebulose che dobbiamo imparare ad attraversare insieme.
                </p>
                <p className="font-bold text-white pt-2">Cosa fare:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Inquadra il QR Code e leggi le istruzioni sul tuo dispositivo.</li>
                  <li>Invia le tue parole: vedrai comparire nuove stelle e nebulose sulla mappa.</li>
                  <li>Insieme creeremo le costellazioni che guideranno la nostra missione verso l'esame.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReflectionDisplay = () => {
  const [data, setData] = useState<{ 
    canDo: { id: string, word: string, nickname: string, revealed: boolean }[], 
    passion: { id: string, word: string, nickname: string, revealed: boolean }[], 
    unique: { id: string, word: string, nickname: string, revealed: boolean }[] 
  }>({ canDo: [], passion: [], unique: [] });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/reflection');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const deleteWord = async (type: 'canDo' | 'passion' | 'unique', index: number) => {
    try {
      await fetch('/api/reflection/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, index })
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = (item: { id: string, word: string, nickname: string, revealed: boolean }, index: number, type: 'canDo' | 'passion' | 'unique') => {
    return (
      <motion.div 
        layout
        key={item.id} 
        className="group relative p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Inviato da: {item.nickname}</span>
          <button onClick={() => deleteWord(type, index)} className="opacity-0 group-hover:opacity-100 text-red-400 transition-opacity">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
        
        <div 
          className={`w-full p-3 rounded-lg border transition-all text-center font-medium ${
            item.revealed 
              ? 'bg-slate-900/50 border-slate-700 text-slate-200 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
              : 'bg-purple-500/20 border-purple-500/30 text-purple-300/50 italic'
          }`}
        >
          {item.revealed ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {item.word}
            </motion.span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <X className="w-3 h-3" /> Coperto
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      <div className="space-card border-sky-500/30 bg-sky-500/5">
        <h5 className="font-bold text-sky-400 text-sm mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Cosa mi piace/non mi piace
        </h5>
        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-2">
          {data.canDo.length === 0 ? (
            <div className="h-20 border border-slate-800 border-dashed rounded-lg flex items-center justify-center text-[10px] text-slate-600 italic">In attesa...</div>
          ) : (
            data.canDo.map((item, i) => renderItem(item, i, 'canDo'))
          )}
        </div>
      </div>

      <div className="space-card border-pink-500/30 bg-pink-500/5">
        <h5 className="font-bold text-pink-400 text-sm mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4" /> Quali sono i miei punti di forza
        </h5>
        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-2">
          {data.passion.length === 0 ? (
            <div className="h-20 border border-slate-800 border-dashed rounded-lg flex items-center justify-center text-[10px] text-slate-600 italic">In attesa...</div>
          ) : (
            data.passion.map((item, i) => renderItem(item, i, 'passion'))
          )}
        </div>
      </div>

      <div className="space-card border-emerald-500/30 bg-emerald-500/5">
        <h5 className="font-bold text-emerald-400 text-sm mb-4 flex items-center gap-2">
          <Smile className="w-4 h-4" /> Quali esperienze porto con me
        </h5>
        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-2">
          {data.unique.length === 0 ? (
            <div className="h-20 border border-slate-800 border-dashed rounded-lg flex items-center justify-center text-[10px] text-slate-600 italic">In attesa...</div>
          ) : (
            data.unique.map((item, i) => renderItem(item, i, 'unique'))
          )}
        </div>
      </div>
    </div>
  );
};

// --- Session 1: NASA Briefing ---
const NasaBriefing = () => {
  const initialTopics = [
    { text: "La mia canzone preferita, tipologia di musica che mi piace", color: "text-red-400" },
    { text: "Viaggio in un posto che vorrei fare", color: "text-sky-400" },
    { text: "Il mio difetto peggiore", color: "text-orange-400" },
    { text: "Il mio pregio di cui vado fiero", color: "text-emerald-400" },
    { text: "Il primo ricordo che mi viene in mente", color: "text-purple-400" },
    { text: "Un argomento di scienze che mi è piaciuto", color: "text-yellow-400" },
    { text: "Un argomento di storia che mi è piaciuto", color: "text-indigo-400" },
    { text: "Due qualità del mio compagno di banco", color: "text-pink-400" },
    { text: "Riassunto della mia settimana", color: "text-blue-400" },
    { text: "Un sogno che vorrei realizzare", color: "text-cyan-400" }
  ];

  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopic, setSelectedTopic] = useState<typeof initialTopics[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const drawTopic = () => {
    if (isSpinning || topics.length === 0) return;
    setIsSpinning(true);
    setSelectedTopic(null);
    setTimerActive(false);
    setTimeLeft(0);

    setTimeout(() => {
      const index = Math.floor(Math.random() * topics.length);
      const chosen = topics[index];
      setSelectedTopic(chosen);
      setTopics(topics.filter((_, i) => i !== index));
      setIsSpinning(false);
    }, 2000);
  };

  const reset = () => {
    setTopics(initialTopics);
    setSelectedTopic(null);
    setTimerActive(false);
    setTimeLeft(0);
  };

  useEffect(() => {
    let interval: any;
    if (timerActive) {
      interval = setInterval(() => setTimeLeft(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
      {/* Left Panel: Topics List (Data Stream) */}
      <div className="space-card bg-slate-900/80 border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Data Stream
          </h3>
          <button 
            onClick={() => setShowInfo(true)}
            className="p-2 bg-sky-500/10 text-sky-400 rounded-full hover:bg-sky-500/20 transition-all"
          >
            <Star className="w-5 h-5 fill-sky-400" />
          </button>
        </div>
        <div className="space-y-2">
          {initialTopics.map((t, i) => {
            const isUsed = !topics.find(top => top.text === t.text);
            return (
              <div 
                key={i} 
                className={`p-3 rounded-lg text-sm font-medium border transition-all ${
                  isUsed 
                    ? 'bg-slate-950/50 border-slate-900 text-slate-700 line-through' 
                    : `bg-slate-800/50 border-slate-700 ${t.color}`
                }`}
              >
                {t.text}
              </div>
            );
          })}
        </div>
        {topics.length === 0 && (
          <button onClick={reset} className="btn-secondary w-full mt-6 justify-center">
            <RefreshCw className="w-4 h-4" /> Riavvia Sistema
          </button>
        )}
      </div>

      {/* Center Panel: NASA Monitor */}
      <div className="lg:col-span-2 space-y-6">
        <div className="relative aspect-video bg-black rounded-3xl border-[12px] border-slate-800 shadow-2xl overflow-hidden group">
          {/* Monitor Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <AnimatePresence mode="wait">
              {isSpinning ? (
                <motion.div 
                  key="spinning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 w-full"
                >
                  <div className="relative w-full h-32 flex flex-col items-center justify-center overflow-hidden">
                    <motion.div 
                      animate={{ y: [-20, 20, -20] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-full h-px bg-sky-500/50 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                    />
                    <div className="mt-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [10, 40, 10] }}
                          transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.1 }}
                          className="w-1 bg-sky-500/40 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sky-500 font-mono tracking-[0.5em] text-sm animate-pulse">RICERCA SEGNALE...</p>
                </motion.div>
              ) : selectedTopic ? (
                <motion.div 
                  key="selected"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-xs font-mono text-emerald-500 mb-2 uppercase tracking-[0.3em]">Segnale Ricevuto</div>
                  <h2 className={`text-4xl font-bold leading-tight ${selectedTopic.color}`}>
                    {selectedTopic.text}
                  </h2>
                    <div className="flex flex-col items-center gap-6 pt-4">
                      {/* Integrated Timer as Hourglass */}
                      <div className="bg-slate-900/50 border border-slate-800 px-6 py-2 rounded-xl flex items-center gap-3">
                        <Hourglass className={`w-5 h-5 ${timerActive ? 'text-sky-500 animate-spin' : 'text-slate-500'}`} />
                        <div className={`text-2xl font-mono font-bold ${timerActive ? 'text-sky-500 text-glow' : 'text-slate-500'}`}>
                          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                      </div>

                      <button 
                        onClick={() => setTimerActive(!timerActive)} 
                        className={`btn-primary px-8 py-4 text-lg transition-all ${timerActive ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                      >
                        {timerActive ? (
                          <><Square className="w-5 h-5 fill-current" /> Termina Trasmissione</>
                        ) : (
                          <><Radio className="w-5 h-5" /> Inizia Trasmissione</>
                        )}
                      </button>
                    </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <Monitor className="w-20 h-20 text-slate-800 mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-500">NASA BRIEFING ROOM</h3>
                    <p className="text-sky-500 font-mono text-xs uppercase tracking-widest">rompighiaccio</p>
                    
                    {/* Timer under briefing room */}
                    <div className="mt-4 flex justify-center">
                      <div className="bg-slate-900/50 border border-slate-800 px-6 py-2 rounded-xl flex items-center gap-3">
                        <Hourglass className="w-5 h-5 text-slate-600" />
                        <div className="text-2xl font-mono font-bold text-slate-600">
                          00:00
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 font-mono text-[10px] mt-4">SISTEMA PRONTO PER IL SORTEGGIO</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Monitor Footer */}
          <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center text-[10px] font-mono text-slate-700">
            <div>NASA MISSION CONTROL // SECTOR 7G</div>
            <div className="flex gap-4">
              <span>CPU: {100 - (topics.length * 10)}%</span>
              <span>SIGNAL: STABLE</span>
            </div>
          </div>
        </div>

        {/* Action Button outside monitor */}
        <div className="flex justify-center pt-2">
          {selectedTopic ? (
            <div className="flex gap-4">
              <button 
                onClick={drawTopic} 
                disabled={isSpinning || topics.length === 0}
                className="btn-primary bg-sky-600 hover:bg-sky-500 animate-bounce py-4 px-8 text-lg disabled:opacity-30 disabled:animate-none"
              >
                Prossima Estrazione <RotateCw className="w-5 h-5" />
              </button>
              <button onClick={reset} className="btn-secondary py-4 px-8 text-lg">
                Ricomincia Sorteggio <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          ) : !isSpinning ? (
            <button 
              onClick={drawTopic} 
              disabled={topics.length === 0}
              className="btn-primary px-12 py-5 text-xl shadow-[0_10px_30px_rgba(56,189,248,0.3)]"
            >
              Estrai Argomento <RotateCw className="w-5 h-5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="space-card max-w-lg w-full border-sky-500/50 relative"
            >
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X />
              </button>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-sky-400">
                <Info className="w-6 h-6" /> Briefing Pre-Partenza
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Benvenuti nella sala operativa della NASA. Prima di ogni missione, l'equipaggio deve conoscersi a fondo per affrontare insieme le sfide dello spazio.
                </p>
                <p className="font-bold text-white">Come funziona:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Estrai un argomento cliccando sul pulsante centrale.</li>
                  <li>L'argomento apparirà sul monitor principale.</li>
                  <li>Prenditi il tuo tempo per parlare e argomentare, clicca <span className="text-sky-400 font-bold">Termina Trasmissione</span> quando reputi di aver detto tutto.</li>
                  <li>Ogni argomento può essere estratto una sola volta per turno.</li>
                </ul>
                <p className="text-sm italic text-slate-500 pt-4 border-t border-slate-800">
                  Obiettivo: sciogliere la tensione e iniziare a comunicare in modo spontaneo.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SessionAnimation = ({ sessionId }: { sessionId: number }) => {
  if (sessionId === 1) {
    // Incontro 1: People gathering in the center - continuous movement
    return (
      <div className="relative w-full h-20 flex items-center justify-center overflow-hidden mb-6">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            animate={{ 
              x: [-400, -40], 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 1, 
              ease: "linear" 
            }}
            className="absolute"
          >
            <Users className="w-8 h-8 text-sky-400/40" />
          </motion.div>
        ))}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            animate={{ 
              x: [400, 40], 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 1, 
              ease: "linear" 
            }}
            className="absolute"
          >
            <Users className="w-8 h-8 text-sky-400/40" />
          </motion.div>
        ))}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="z-10 bg-sky-500/20 p-4 rounded-full border border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
        >
          <Users className="w-12 h-12 text-sky-400" />
        </motion.div>
      </div>
    );
  }

  if (sessionId === 2) {
    // Incontro 2: Rocket Earth (left) -> Right (Photo Style)
    return (
      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden mb-6">
        {/* Departure: Earth (Realistic Style) */}
        <div className="absolute left-12 sm:left-24 flex flex-col items-center">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-800 shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center justify-center relative border border-white/10 overflow-hidden"
            >
              {/* Water Base */}
              <div className="absolute inset-0 bg-blue-600" />
              
              {/* Simulated Continents */}
              <div className="absolute top-2 left-4 w-8 h-6 bg-emerald-500/60 rounded-full blur-sm" />
              <div className="absolute bottom-4 right-2 w-10 h-8 bg-emerald-600/60 rounded-full blur-md" />
              <div className="absolute top-8 right-6 w-6 h-10 bg-emerald-400/50 rounded-full blur-sm" />
              
              {/* Highlight */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
              
              {/* Clouds */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20"
              >
                <div className="absolute top-4 left-4 w-4 h-2 bg-white rounded-full blur-[2px]" />
                <div className="absolute bottom-6 right-8 w-6 h-3 bg-white rounded-full blur-[3px]" />
              </motion.div>
            </motion.div>

            {/* Multiple Departure Smoke Puffs for Velocity */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [0.5, 2, 4],
                  opacity: [0, 0.4, 0],
                  x: [0, 40, 100],
                  y: [0, (i - 1) * 10, (i - 1) * 20]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  times: [0, 0.1, 0.5], 
                  delay: i * 0.1,
                  ease: "easeOut" 
                }}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full blur-2xl pointer-events-none"
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest">Terra</span>
        </div>

        {/* Neon Blue Rocket leaving Earth (Faster trajectory) */}
        <motion.div
          animate={{ 
            x: [-160, -100, 450], 
            y: [0, -20, -60],
            opacity: [0, 1, 1, 0],
            rotate: [60, 90, 120]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeIn" }}
          className="relative z-10"
        >
          <div className="relative">
            <Rocket className="w-12 h-12 text-sky-400 rotate-90 drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]" />
            {/* Speed Lines */}
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4], width: [20, 40, 20] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute -left-10 top-1/2 -translate-y-1/2 h-0.5 bg-sky-200/50 blur-[1px] rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (sessionId === 3) {
    // Incontro 3: Deep Space (Photo Style)
    return (
      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden mb-6">
        {/* Background Stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() }}
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}

        {/* Passing Planet (Distanced) */}
        <motion.div
          animate={{ x: [400, -400] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute right-0 top-1/4"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/10 blur-[1px] border border-white/5 shadow-inner" />
        </motion.div>

        {/* Neon Blue Rocket in Space */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [88, 92, 88]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <div className="relative">
            <Rocket className="w-12 h-12 text-sky-400 rotate-90 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.15 }}
              className="absolute -left-7 top-1/2 -translate-y-1/2 w-8 h-4 bg-sky-300 blur-md rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (sessionId === 4) {
    // Incontro 4: Rocket -> Planet (right) + Landing Flag (Photo Style) - No Box
    return (
      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden mb-6">
        {/* Background Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random(), scale: Math.random() }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}

        <div className="relative flex items-center justify-center w-full max-w-lg h-full">
          {/* Orbital Path */}
          <div className="absolute w-40 h-40 rounded-full border border-sky-500/20" />
          
          {/* Planet */}
          <div className="absolute right-12 sm:right-24 flex flex-col items-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-800 shadow-[0_0_40px_rgba(192,38,211,0.4)] flex items-center justify-center relative border border-white/10"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
              
              {/* White Landing Flag */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ 
                  opacity: [0, 0, 1], 
                  scale: [0, 0, 1],
                  y: [10, 10, -45]
                }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.7, 0.8] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 z-30"
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-white/80" />
                  <div className="absolute top-0 right-[-14px] w-4 h-3 bg-white border border-slate-200 rounded-sm shadow-sm" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Neon Blue Rocket */}
          <motion.div
            initial={{ x: -250, y: 0, opacity: 0, rotate: 90 }}
            animate={{ 
              x: [-250, -100, 30], 
              y: [20, -10, 0],
              opacity: [0, 1, 1],
              rotate: [70, 90, 90]
            }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.7] }}
            className="relative z-20"
          >
            <div className="relative">
              <Rocket className="w-10 h-10 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <motion.div 
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-4 bg-sky-300 blur-sm rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

const Header = ({ session }: { session: Session }) => (
  <header className="mb-12 text-center">
    <SessionAnimation sessionId={session.id} />
    <motion.h1 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
    >
      {session.title}: {session.subtitle}
    </motion.h1>
    <p className="text-slate-400 max-w-lg mx-auto">Missione Esame: Decollo! - Laboratorio TIC inclusivo</p>
  </header>
);

// --- Session 1: Ruota Rompighiaccio ---
const IcebreakerWheel = () => {
  const topics = [
    { label: "Musica", icon: <Music className="w-5 h-5" />, color: "bg-red-500" },
    { label: "Sport", icon: <Star className="w-5 h-5" />, color: "bg-orange-500" },
    { label: "Amici", icon: <Users className="w-5 h-5" />, color: "bg-yellow-500" },
    { label: "Social", icon: <Gamepad2 className="w-5 h-5" />, color: "bg-green-500" },
    { label: "Hobby", icon: <Heart className="w-5 h-5" />, color: "bg-blue-500" },
    { label: "Film", icon: <Camera className="w-5 h-5" />, color: "bg-indigo-500" },
    { label: "Cibo", icon: <Utensils className="w-5 h-5" />, color: "bg-purple-500" },
    { label: "Viaggi", icon: <Navigation className="w-5 h-5" />, color: "bg-pink-500" },
  ];

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedTopic(null);
    setTimerActive(false);
    setTimeLeft(30);
    
    const extraSpins = 5 + Math.random() * 5;
    const newRotation = rotation + extraSpins * 360;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = (newRotation % 360);
      const index = Math.floor(((360 - normalizedRotation + 22.5) % 360) / 45);
      setSelectedTopic(topics[index].label);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 3000);
  };

  useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  return (
    <div className="space-card max-w-2xl mx-auto flex flex-col items-center gap-8">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-sky-400">
          <ChevronRight className="w-8 h-8 rotate-90" />
        </div>
        
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="w-full h-full rounded-full border-4 border-slate-800 overflow-hidden relative shadow-2xl"
        >
          {topics.map((t, i) => (
            <div
              key={i}
              className={`absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end pr-8 ${t.color}`}
              style={{ transform: `rotate(${i * 45}deg) skewY(-45deg)` }}
            >
              <div style={{ transform: `skewY(45deg) rotate(22.5deg)` }} className="flex flex-col items-center gap-1 text-white">
                {t.icon}
                <span className="text-[10px] font-bold uppercase tracking-tighter">{t.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="text-center w-full">
        {!selectedTopic && !isSpinning && (
          <button onClick={spin} className="btn-primary mx-auto">
            <RotateCw className="w-5 h-5" /> Gira la Ruota
          </button>
        )}

        {isSpinning && (
          <p className="text-sky-400 font-medium animate-pulse">Navigazione in corso...</p>
        )}

        {selectedTopic && !isSpinning && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h3 className="text-2xl font-bold mb-4">Argomento: <span className="text-sky-400">{selectedTopic}</span></h3>
            
            <div className="flex flex-col items-center gap-4">
              <div className={`text-4xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                00:{timeLeft.toString().padStart(2, '0')}
              </div>
              
              {!timerActive && timeLeft === 30 && (
                <button onClick={() => setTimerActive(true)} className="btn-primary">
                  <TimerIcon className="w-5 h-5" /> Avvia 30 Secondi
                </button>
              )}
              
              {timeLeft === 0 && (
                <button onClick={spin} className="btn-secondary">
                  <RotateCw className="w-5 h-5" /> Prossimo Astronauta
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- Session 2: Survival Game ---
const SurvivalGame = () => {
  const [revealedItems, setRevealedItems] = useState<Set<string>>(new Set());
  const [classRanking, setClassRanking] = useState<string[]>(SURVIVAL_ITEMS.map(i => i.id));
  const [showQR, setShowQR] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSettingsInfo, setShowSettingsInfo] = useState(false);

  const toggleReveal = (id: string) => {
    const newRevealed = new Set(revealedItems);
    if (newRevealed.has(id)) {
      newRevealed.delete(id);
    } else {
      newRevealed.add(id);
    }
    setRevealedItems(newRevealed);
  };

  const moveClassItem = (index: number, direction: 'up' | 'down') => {
    const newRanking = [...classRanking];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newRanking.length) return;
    [newRanking[index], newRanking[targetIndex]] = [newRanking[targetIndex], newRanking[index]];
    setClassRanking(newRanking);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Explanation Box */}
      <div className="space-card bg-slate-900/50 border-sky-500/30">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-sky-400 uppercase tracking-tighter italic">Avventura nello Spazio</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-3 bg-sky-500/20 rounded-full hover:bg-sky-500/40 transition-colors border border-sky-500/30 text-sky-400"
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>

        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-sky-950/40 border border-sky-500/20 rounded-2xl text-sm mb-6 space-y-4"
          >
            <p className="text-slate-300">
              Questa attività mette alla prova le vostre capacità di sopravvivenza e collaborazione. Pensate criticamente a ogni oggetto!
            </p>
            <p className="text-slate-300 border-t border-sky-500/20 pt-4">
              In questa attività, lavoreremo sul decision making e sulla negoziazione in team. Scegliete con cura l'equipaggiamento!
            </p>
          </motion.div>
        )}
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>Consideratevi membro dell’equipaggio di un’astronave il cui programma originale di volo prevedeva un appuntamento tra la vostra astronave e l’astronave madre, in un punto prestabilito della superficie illuminata della luna.</p>
          <p>Purtroppo, a causa di un guasto improvviso, il vostro veicolo ha dovuto compiere un atterraggio di emergenza e siete scesi a 200 km. dalla località in cui si trova la seconda astronave.</p>
          <p>Nel corso della manovra di atterraggio la vostra astronave ha subito danni irreparabili: una buona parte del materiale in dotazione è andata distrutta mentre alcuni membri dell’equipaggio sono rimasti lievemente feriti.</p>
          <p>L’unica speranza di salvezza consiste nell’affrontare i 200 km. di percorso che vi separano dall’astronave madre che non ha potuto essere informata della disavventura capitata al vostro veicolo e che non è quindi in condizione né di portarvi aiuto, né di localizzare la vostra posizione.</p>
          <p className="font-bold text-white">Poiché non vi sarà possibile trasportare tutte le attrezzature, il vostro obiettivo è di stabilire un ordine di importanza dei materiali e delle attrezzature rimaste indenni.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-card">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Backpack className="text-sky-400" /> Risorse Disponibili
          </h3>
          <div className="grid gap-2 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {SURVIVAL_ITEMS.map(item => (
              <div key={item.id} className="flex flex-col gap-2">
                <button
                  onClick={() => toggleReveal(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                    revealedItems.has(item.id) 
                      ? 'bg-sky-500/10 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.1)]' 
                      : 'bg-slate-800 border-slate-700 hover:border-sky-500/50'
                  }`}
                >
                  <div className="p-2 bg-slate-700 rounded-lg shrink-0">{item.icon}</div>
                  <div className="font-medium text-sm flex-1">{item.name}</div>
                  {revealedItems.has(item.id) && (
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-full">
                        Posizione: {item.rank}
                      </span>
                      <ChevronDown className="w-4 h-4 text-sky-400 rotate-180 transition-transform" />
                    </div>
                  )}
                  {!revealedItems.has(item.id) && (
                    <ChevronDown className="w-4 h-4 text-slate-500 transition-transform" />
                  )}
                </button>
                
                <AnimatePresence>
                  {revealedItems.has(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-xs text-slate-300 italic leading-relaxed">
                        <span className="text-sky-400 font-bold not-italic mr-2 uppercase tracking-wider">Motivazione NASA:</span>
                        {item.comment}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* QR Code Section */}
          <div className="space-card border-purple-500/30 bg-purple-500/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <QrCode className="text-purple-400" /> 1 Classifica Personale
              </h3>
              <button 
                onClick={() => setShowQR(!showQR)}
                className="text-xs uppercase font-bold text-purple-400 hover:underline"
              >
                {showQR ? 'Nascondi' : 'Mostra QR'}
              </button>
            </div>
            {showQR && (
              <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl">
                <QRCodeSVG value={`${window.location.origin}?mode=student&game=survival`} size={160} />
                <p className="text-slate-900 text-xs font-bold text-center">Scansiona per partecipare alla classifica collettiva</p>
              </div>
            )}
            <p className="text-xs text-slate-400 mt-4 italic">Inquadra il codice per permettere agli studenti di ordinare gli oggetti dal proprio dispositivo.</p>
          </div>

          {/* Class Ranking Section */}
          <div className="space-card border-emerald-500/30 bg-emerald-500/5 min-h-[400px]">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Users className="text-emerald-400" /> 2 Classifica di Classe
            </h3>
            <p className="text-xs text-slate-400 mb-6 italic">Lavoro collettivo: sposta gli oggetti per stabilire l'ordine di importanza deciso dall'equipaggio.</p>
            
            <div className="space-y-2">
              {classRanking.map((id, index) => {
                const item = SURVIVAL_ITEMS.find(i => i.id === id)!;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={id}
                    className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl group"
                  >
                    <span className="w-6 h-6 flex items-center justify-center bg-emerald-500 text-white text-[10px] font-bold rounded-full shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-medium text-xs flex-1">{item.name}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => moveClassItem(index, 'up')} className="p-1 hover:bg-emerald-500/20 rounded text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => moveClassItem(index, 'down')} className="p-1 hover:bg-emerald-500/20 rounded text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Session 3: CAA Explanation & Game ---
const CAAIcon = ({ label, filename, className }: { label: string, filename?: string, className?: string }) => {
  if (filename) {
    return <img src={`/caa/${filename}`} alt={label} className={className} referrerPolicy="no-referrer" />;
  }
  const icons: Record<string, React.ReactNode> = {
    "Io": <Users className={className} />,
    "Amici": <Users className={`${className} text-blue-500`} />,
    "Amicizia": <Handshake className={`${className} text-pink-400`} />,
    "Amore": <Heart className={`${className} text-red-500 fill-red-200`} />,
    "Anatomia": <Activity className={`${className} text-emerald-500`} />,
    "Andare": <Rocket className={`${className} text-sky-400`} />,
    "Ansia": <Activity className={`${className} text-orange-400`} />,
    "Arte": <Palette className={`${className} text-purple-500`} />,
    "Autobus": <Bus className={`${className} text-yellow-600`} />,
    "Bacio": <Heart className={`${className} text-pink-500 fill-pink-100`} />,
    "Bagno": <Bath className={`${className} text-sky-300`} />,
    "Bello": <Smile className={`${className} text-emerald-500`} />,
    "Bere": <Droplets className={`${className} text-sky-500`} />,
    "Biglietto": <Ticket className={`${className} text-orange-400`} />,
    "Bisogno": <Info className={`${className} text-indigo-400`} />,
    "Blu": <Circle className={`${className} text-blue-600 fill-blue-600`} />,
    "Borsa": <ShoppingBag className={`${className} text-purple-400`} />,
    "Caffè": <Coffee className={`${className} text-amber-900`} />,
    "Camera": <Bed className={`${className} text-indigo-400`} />,
    "Cane": <Footprints className={`${className} text-amber-700`} />,
    "Canzone": <Music className={`${className} text-pink-400`} />,
    "Capelli": <Scissors className={`${className} text-slate-400`} />,
    "Capire": <Brain className={`${className} text-purple-400`} />,
    "Casa": <MapIcon className={`${className} text-orange-500`} />,
    "Cellulare": <Smartphone className={`${className} text-slate-700`} />,
    "Cena": <Utensils className={`${className} text-slate-500`} />,
    "Chiedere": <MessageSquare className={`${className} text-sky-400`} />,
    "Cibo": <ShoppingBasket className={`${className} text-emerald-600`} />,
    "Colazione": <Coffee className={`${className} text-orange-400`} />,
    "Computer": <Monitor className={`${className} text-slate-800`} />,
    "Cravatta": <User className={`${className} text-blue-900`} />,
    "Credere": <Star className={`${className} text-yellow-400 fill-yellow-100`} />,
    "Cucina": <Utensils className={`${className} text-slate-400`} />,
    "Cultura": <Globe className={`${className} text-emerald-500`} />,
    "Domani": <Sun className={`${className} text-yellow-400`} />,
    "Dormire": <Moon className={`${className} text-indigo-400`} />,
    "Fame": <Utensils className={`${className} text-orange-500`} />,
    "Famiglia": <Users className={`${className} text-emerald-500`} />,
    "Fare": <Zap className={`${className} text-yellow-500`} />,
    "Freddo": <Snowflake className={`${className} text-sky-400`} />,
    "Gelosia": <Eye className={`${className} text-red-400`} />,
    "Giallo": <Circle className={`${className} text-yellow-400 fill-yellow-400`} />,
    "Gioco": <Gamepad2 className={`${className} text-emerald-400`} />,
    "Giornale": <Newspaper className={`${className} text-slate-600`} />,
    "Giorno": <Sun className={`${className} text-yellow-500`} />,
    "Internet": <Wifi className={`${className} text-sky-500`} />,
    "Lavare": <Droplets className={`${className} text-sky-300`} />,
    "Lavoro": <Briefcase className={`${className} text-amber-800`} />,
    "Leggere": <BookOpen className={`${className} text-blue-500`} />,
    "Letto": <Bed className={`${className} text-slate-500`} />,
    "Lezione": <Book className={`${className} text-indigo-500`} />,
    "Libro": <Book className={`${className} text-orange-800`} />,
    "Macchina": <Car className={`${className} text-red-600`} />,
    "Mamma": <User className={`${className} text-pink-400`} />,
    "Mangiare": <Utensils className={`${className} text-emerald-500`} />,
    "Mare": <Waves className={`${className} text-blue-500`} />,
    "Mattina": <Sun className={`${className} text-orange-300`} />,
    "Messaggio": <Mail className={`${className} text-sky-500`} />,
    "Montagna": <Mountain className={`${className} text-emerald-700`} />,
    "Morte": <SkullIcon className={`${className} text-slate-900`} />,
    "Musica": <Music className={`${className} text-purple-500`} />,
    "Neve": <Snowflake className={`${className} text-slate-100`} />,
    "Noia": <Clock className={`${className} text-slate-400`} />,
    "Notte": <Moon className={`${className} text-indigo-900`} />,
    "Odio": <XCircle className={`${className} text-red-600`} />,
    "Oggi": <Clock className={`${className} text-emerald-500`} />,
    "Orario": <Timer className={`${className} text-slate-500`} />,
    "Papà": <User className={`${className} text-blue-600`} />,
    "Pasta": <Utensils className={`${className} text-amber-500`} />,
    "Peccato": <AlertCircle className={`${className} text-red-500`} />,
    "Penna": <Plus className={`${className} text-slate-900`} />,
    "Pensare": <Brain className={`${className} text-indigo-400`} />,
    "Poesia": <Feather className={`${className} text-purple-400`} />,
    "Pranzo": <Utensils className={`${className} text-slate-600`} />,
    "Pregare": <User className={`${className} text-white`} />,
    "Prete": <User className={`${className} text-black`} />,
    "Pulire": <RotateCw className={`${className} text-sky-400`} />,
    "Regola": <Info className={`${className} text-red-600`} />,
    "Religione": <Globe className={`${className} text-yellow-600`} />,
    "Rosso": <Circle className={`${className} text-red-600 fill-red-600`} />,
    "Scarpe": <Footprints className={`${className} text-slate-800`} />,
    "Scrivere": <Plus className={`${className} text-blue-700`} />,
    "Sete": <Droplets className={`${className} text-sky-600`} />,
    "Sigaretta": <XCircle className={`${className} text-slate-400`} />,
    "Soldi": <Banknote className={`${className} text-emerald-500`} />,
    "Sonno": <Moon className={`${className} text-slate-300`} />,
    "Sorella": <User className={`${className} text-pink-300`} />,
    "Studiare": <GraduationCap className={`${className} text-indigo-600`} />,
    "Strumento": <Music className={`${className} text-emerald-500`} />,
    "Telefono": <Phone className={`${className} text-slate-700`} />,
    "Televisione": <Tv className={`${className} text-slate-800`} />,
    "Tempo": <Clock className={`${className} text-slate-500`} />,
    "Tesoro": <Gem className={`${className} text-yellow-400`} />,
    "Treno": <Train className={`${className} text-slate-600`} />,
    "Tutto": <Box className={`${className} text-slate-400`} />,
    "Università": <School className={`${className} text-indigo-800`} />,
    "Uscire": <LogOut className={`${className} text-red-400`} />,
    "Verde": <Circle className={`${className} text-emerald-600 fill-emerald-600`} />,
    "Volere": <Plus className={`${className} text-indigo-500`} />,
    "Volontà": <Zap className={`${className} text-orange-500`} />
  };
  return icons[label] || <Circle className={className} />;
};

const CAAActivity = () => {
  const [showRules, setShowRules] = useState(false);
  const [gameState, setGameState] = useState<{ currentPhrase: any[], guess: string, passCount: number, livesCount: number, score: number }>({
    currentPhrase: [],
    guess: "",
    passCount: 2,
    livesCount: 3,
    score: 0
  });

  const fetchGameState = async () => {
    try {
      const res = await fetch('/api/caa-game');
      const data = await res.json();
      setGameState(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGameState();
    const interval = setInterval(fetchGameState, 2000);
    return () => clearInterval(interval);
  }, []);

  const generateRandomPhrase = async () => {
    try {
      await fetch('/api/caa-game/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      fetchGameState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-12">
      {/* CAA Explanation Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-card border-sky-500/30 bg-sky-500/5 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <Star className="w-40 h-40 fill-sky-400" />
          </div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-sky-400">
            <Star className="w-8 h-8 fill-sky-400" /> Cos'è la CAA?
          </h3>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p className="font-medium text-white">Comunicazione Aumentativa Alternativa</p>
            <p>È un insieme di strategie, strumenti e tecniche messi in atto in ambito clinico e domestico per facilitare la comunicazione in persone che hanno difficoltà a usare i canali comunicativi verbali.</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <span className="text-sky-400 font-bold block mb-1 uppercase text-[10px]">A cosa serve?</span>
                <p className="text-xs">A compensare disabilità comunicative temporanee o permanenti, limitazioni nelle attività e restrizioni alla partecipazione.</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <span className="text-sky-400 font-bold block mb-1 uppercase text-[10px]">Come si usa?</span>
                <p className="text-xs">Attraverso l'uso di simboli, immagini, tabelle o ausili tecnologici che supportano l'espressione dei bisogni e dei pensieri.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Planet & Spaceship */}
        <div className="relative h-80 flex items-center justify-center">
          {/* Planet */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(168,85,247,0.4)] relative z-10"
          >
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
          </motion.div>
          
          {/* Spaceship Orbit */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-72 h-72 border border-slate-800 rounded-full"
          >
            <motion.div 
              className="absolute -top-4 left-1/2 -translate-x-1/2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-8 h-8 text-sky-400 rotate-0 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
            </motion.div>
          </motion.div>
          
          {/* Stars Background */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * 400 - 200, 
                y: Math.random() * 400 - 200,
                opacity: Math.random()
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Parole in Orbita: CAA Game */}
      <div className="space-card border-indigo-500/30 bg-indigo-500/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-3 text-indigo-400">
                <Zap className="w-8 h-8 text-indigo-400" /> Parole in Orbita
              </h3>
              <p className="text-slate-400 mt-2">Indovina il messaggio spaziale decifrando i simboli CAA!</p>
            </div>
            <button 
              onClick={() => setShowRules(!showRules)}
              className="p-3 bg-indigo-500/20 rounded-full hover:bg-indigo-500/40 transition-colors border border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.2)]"
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={generateRandomPhrase}
              className="btn-primary px-8 py-4 text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            >
              <RefreshCw className="w-5 h-5" /> Genera Messaggio
            </button>
          </div>
        </div>

        {showRules && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mb-8 bg-indigo-950/40 border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4 text-indigo-300 font-bold border-b border-indigo-500/20 pb-2">
                <Info className="w-5 h-5" /> Regolamento del Gioco
              </div>
              <ul className="space-y-3 text-slate-300 list-disc pl-5 mb-8">
                <li><strong>Obiettivo:</strong> L'equipaggio deve indovinare la parola mostrata sulla LIM tramite i simboli CAA.</li>
                <li><strong>Salti (Stelle):</strong> Se la parola è troppo difficile, usa un "Passo" per cambiare parola.</li>
                <li><strong>Cuori:</strong> si perdono ad ogni parola non indovinata.</li>
                <li><strong>Punteggio:</strong> Ogni parola indovinata aumenta il punteggio. Un errore toglie un punto.</li>
              </ul>

              {/* Game Example */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-indigo-500/30">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] block mb-4">Esempio di Gioco:</span>
                <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-white rounded-xl shadow-lg transform -rotate-3">
                      <CAAIcon label="Casa" className="w-12 h-12 text-slate-900" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">SIMBOLO CAA</span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-indigo-500 hidden md:block" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="px-6 py-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl text-emerald-400 font-black uppercase text-xl">
                      CASA!
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">RISPOSTA CORRETTA</span>
                  </div>
                  <Plus className="w-6 h-6 text-indigo-500 hidden md:block" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
                      +1
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">PUNTO</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="min-h-[300px] flex flex-wrap gap-6 items-center justify-center p-8 bg-slate-950/50 border border-slate-800 rounded-3xl relative overflow-hidden">
            {!gameState.currentPhrase.length ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto opacity-20">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <p className="text-slate-500 italic text-sm">In attesa di generare un messaggio...</p>
              </div>
            ) : (
              <>
                <div className="absolute top-4 left-4 flex gap-3">
                  <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                    Messaggio in Orbita
                  </span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(3)].map((_, i) => (
                      <Heart 
                        key={i} 
                        className={`w-4 h-4 ${i < gameState.livesCount ? 'text-red-500 fill-red-500' : 'text-slate-800'}`} 
                      />
                    ))}
                  </div>
                  <div className="flex gap-1 items-center bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                    <div className="flex gap-1 mr-2 border-r border-slate-800 pr-2">
                      {[...Array(3)].map((_, i) => (
                        <Heart 
                          key={i} 
                          className={`w-4 h-4 ${i < gameState.livesCount ? 'text-red-500 fill-red-500' : 'text-slate-800'}`} 
                        />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(2)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < gameState.passCount ? 'text-yellow-500 fill-yellow-500' : 'text-slate-800'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto pr-4">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Score:</span>
                    <span className="text-xl font-black text-white">{gameState.score}</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={gameState.currentPhrase.map(p => p.id).join('-')}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-wrap gap-6 justify-center"
                  >
                    {gameState.currentPhrase.map((symbol: any, i: number) => (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        key={`${symbol.id}-${i}`}
                        className="flex flex-col items-center gap-3 p-8 bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] group"
                      >
                        <div className="text-slate-900">
                          <CAAIcon label={symbol.label} filename={symbol.filename} className="w-32 h-32 md:w-48 md:h-48 object-contain" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
              <Monitor className="w-6 h-6" /> Sala Controllo
            </h4>
            
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <button 
                onClick={async () => {
                  await fetch('/api/caa-game/pass', { method: 'POST' });
                  fetchGameState();
                }}
                disabled={gameState.passCount <= 0}
                className="btn-secondary h-20 text-xs flex-col gap-2 border-yellow-500/30 text-yellow-500 disabled:opacity-30"
              >
                <Star className="w-5 h-5 fill-current" /> PASSO (STELLA)
              </button>

              <button 
                onClick={generateRandomPhrase}
                className="btn-secondary h-20 text-xs flex-col gap-2 border-sky-500/30 text-sky-400 bg-sky-500/5 hover:bg-sky-500/10"
              >
                <RefreshCw className="w-5 h-5" /> RICOMINCIA GIOCO
              </button>

              <button 
                onClick={async () => {
                  await fetch('/api/caa-game/reset-turn', { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ success: true }) 
                  });
                  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                  fetchGameState();
                }}
                className="btn-secondary h-20 text-xs flex-col gap-2 border-emerald-500/30 text-emerald-500"
              >
                <CheckCircle2 className="w-5 h-5" /> PAROLA INDOVINATA
              </button>

              <button 
                onClick={async () => {
                  await fetch('/api/caa-game/reset-turn', { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ success: false }) 
                  });
                  fetchGameState();
                }}
                className="btn-secondary h-20 text-xs flex-col gap-2 border-red-500/30 text-red-500"
              >
                <XCircle className="w-5 h-5" /> PAROLA NON INDOVINATA (PERSO -1 ❤️)
              </button>
            </div>

            {gameState.guess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-4"
              >
                <div className="p-10 bg-emerald-500/10 border-2 border-emerald-500 border-dashed rounded-2xl">
                  <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest block mb-2">Tentativo di risposta:</span>
                  <div className="text-5xl font-black text-white uppercase tracking-tighter">
                    {gameState.guess}
                  </div>
                </div>
                <button 
                  onClick={async () => {
                    await fetch('/api/caa-game/guess', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ guess: "" }) });
                    fetchGameState();
                  }}
                  className="btn-secondary py-2 px-6 text-xs"
                >
                  Pulisci Pulsantiera
                </button>
              </motion.div>
            ) : (
              <div className="p-10 opacity-30 mt-auto">
                <Cpu className="w-16 h-16 mx-auto mb-4" />
                <p className="italic text-sm">In attesa che un astronauta prema il pulsante...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Session 3: Segnali dallo Spazio (Lyrics) ---
const SpaceSignals = () => {
  const [lyrics, setLyrics] = useState<{ id: string, text: string, nickname: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const fetchLyrics = async () => {
    try {
      const res = await fetch('/api/lyrics');
      const json = await res.json();
      setLyrics(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLyrics();
    const interval = setInterval(fetchLyrics, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const deleteLyric = async (id: string) => {
    try {
      await fetch('/api/lyrics/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchLyrics();
    } catch (err) {
      console.error(err);
    }
  };

  const reorderLyric = async (id: string, direction: 'up' | 'down') => {
    try {
      await fetch('/api/lyrics/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, direction })
      });
      fetchLyrics();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Explanation Section */}
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-3 text-sky-400">
          <Music className="w-8 h-8 text-sky-400" /> Segnali dallo Spazio
        </h3>
        <button 
          onClick={() => setShowExplainer(!showExplainer)}
          className="p-2 bg-sky-500/20 rounded-full hover:bg-sky-500/40 transition-colors border border-sky-500/30 text-sky-400"
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      </div>

      {showExplainer && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-sky-950/40 border border-sky-500/20 rounded-3xl text-sm leading-relaxed mb-8"
        >
          <div className="flex items-center gap-2 mb-3 text-sky-300 font-bold uppercase tracking-widest text-[10px]">
            <Info className="w-4 h-4" /> Obiettivo dell'Esercizio
          </div>
          <p className="text-slate-300">
            Caricare una frase di una canzone per te importante o che ascolti di solito. 
            Le frasi di tutta la classe compongono il testo di una <strong>canzone collettiva</strong>.
          </p>
        </motion.div>
      )}

      {/* Lyrics Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="space-card border-purple-500/30 bg-purple-500/5">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Music className="text-purple-400" /> Invia la tua Frase
            </h3>
            <p className="text-xs text-slate-400 mb-6 italic">Invia la frase che più ti rappresenta.</p>
            
            <div className="flex flex-col items-center gap-6">
              <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center gap-2">
                <QRCodeSVG value={`${window.location.origin}?mode=lyrics`} size={140} />
                <span className="text-[10px] font-bold text-slate-900 uppercase">Invia Segnale Musicale</span>
              </div>
              
              {/* Timer */}
              <div className="w-full space-y-3">
                <div className={`p-4 bg-slate-950 border rounded-2xl flex flex-col items-center gap-1 transition-colors ${timeLeft < 60 ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800'}`}>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tempo Rimasto</span>
                  <div className={`text-4xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-sky-400'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTimerActive(!timerActive)} 
                    className={`flex-1 btn-primary justify-center ${timerActive ? 'bg-orange-600 hover:bg-orange-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                  >
                    {timerActive ? <RotateCw className="w-4 h-4" /> : <TimerIcon className="w-4 h-4" />}
                    {timerActive ? 'Pausa' : 'Avvia Timer'}
                  </button>
                  <button onClick={() => { setTimeLeft(600); setTimerActive(false); }} className="btn-secondary p-3">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-card border-slate-800 bg-slate-900/50 min-h-[500px]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="text-sky-400" /> Segnali Ricevuti (La Canzone Collettiva)
          </h3>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-4">
            {lyrics.length === 0 ? (
              <div className="h-40 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-600 gap-3">
                <Music2 className="w-8 h-8 opacity-20" />
                <p className="text-sm italic">In attesa di segnali musicali dallo spazio...</p>
              </div>
            ) : (
              lyrics.map((lyric, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={lyric.id}
                  className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl relative group hover:border-sky-500/30 transition-all flex items-center gap-4"
                >
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      disabled={index === 0}
                      onClick={() => reorderLyric(lyric.id, 'up')}
                      className="p-1 hover:bg-slate-700 rounded disabled:opacity-20"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button 
                      disabled={index === lyrics.length - 1}
                      onClick={() => reorderLyric(lyric.id, 'down')}
                      className="p-1 hover:bg-slate-700 rounded disabled:opacity-20"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                        <Users className="w-3 h-3" /> {lyric.nickname}
                      </span>
                      <button 
                        onClick={() => deleteLyric(lyric.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg text-slate-200 font-medium leading-relaxed italic">
                      "{lyric.text}"
                    </p>
                  </div>
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Discourse Map Display Section ---
const DiscourseMapDisplay = () => {
  const [data, setData] = useState<{ id: string, answer: string, question: string, revealed: boolean }[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/discourse-map');
      const json = await res.json();
      if (Array.isArray(json)) setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const reveal = async (id: string) => {
    try {
      await fetch('/api/discourse-map/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchData();
      confetti({ particleCount: 50, spread: 70 });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await fetch('/api/discourse-map/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-card border-sky-500/30 bg-sky-500/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-3 text-sky-400">
              <QrCode className="w-8 h-8 text-sky-400" /> Domande & Risposte
            </h3>
            <p className="text-slate-400 mt-2">Inquadra il QR Code per rispondere alle domande della mappa!</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center gap-2">
            <QRCodeSVG value={`${window.location.origin}?mode=discourse_map`} size={120} />
            <span className="text-[10px] font-bold text-slate-900 uppercase">Rispondi Qui</span>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Star className="w-4 h-4" /> Segnali Ricevuti
          </h4>
          
          <div className="flex flex-wrap gap-4">
            {data.length === 0 ? (
              <div className="w-full h-24 border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center text-slate-600 italic text-sm">
                In attesa di segnali dai navigatori...
              </div>
            ) : (
              data.map((item) => (
                <div key={item.id} className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => reveal(item.id)}
                    className={`p-4 rounded-full transition-all shadow-lg ${
                      item.revealed 
                        ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-sky-300'
                    }`}
                  >
                    <Star className={`w-8 h-8 ${item.revealed ? 'fill-current' : ''}`} />
                  </motion.button>
                  
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="absolute -top-2 -right-2 p-1 bg-red-900/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  <AnimatePresence>
                    {item.revealed && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 w-64 p-4 bg-slate-900 border border-sky-500/30 rounded-2xl shadow-2xl text-sm italic"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-slate-900" />
                        "{item.answer}"
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Session 4: Final Presentation ---
const FinalPresentation = () => {
  const [showExplainer, setShowExplainer] = useState(false);
  const steps = [
    { title: "Introduzione", desc: "Chi sono." },
    { title: "Il Mio Pianeta", desc: "Le mie passioni e i miei interessi." },
    { title: "Il Mio Percorso", desc: "Le tappe più importanti della scuola." },
    { title: "Ostacoli Superati", desc: "Come ho affrontato le difficoltà." },
    { title: "Obiettivo Esame", desc: "Cosa mi aspetto dal futuro." },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <MapIcon className="text-sky-400" /> Mappa del Discorso
          </h3>
          <button 
            onClick={() => setShowExplainer(!showExplainer)}
            className="p-2 bg-sky-500/20 rounded-full hover:bg-sky-500/40 transition-colors border border-sky-500/30 text-sky-400"
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        </div>

        {showExplainer && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-sky-950/40 border border-sky-500/20 rounded-2xl text-sm mb-6"
          >
            <p className="text-slate-300">
              Usa questa mappa per organizzare i punti chiave della tua presentazione. Ogni tappa rappresenta un capitolo della tua missione verso l'esame.
            </p>
          </motion.div>
        )}

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && <div className="w-0.5 h-full bg-slate-800 my-1" />}
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex-1">
                <h4 className="font-bold text-sky-400">{step.title}</h4>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <DiscourseMapDisplay />
      </div>
    </div>
  );
};

// --- Home Screen ---
const Home = ({ onStart, notes, setNotes }: { onStart: (session: number) => void, notes: string, setNotes: (n: string) => void }) => {
  const [activeModal, setActiveModal] = useState<'laboratorio' | 'obiettivo' | null>(null);
  const [showSessions, setShowSessions] = useState(false);

  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      {/* Animated Rocket Journey (Photo Style) */}
      <div className="relative w-full max-w-2xl h-60 mx-auto mb-12 flex items-center justify-between px-16 overflow-visible">
        {/* Background Stars & Small Planets */}
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: Math.random() }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            />
          ))}
          {/* Smaller Background Planets */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-1/4 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 blur-[1px]" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-1/3 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 blur-[1px]" 
          />
        </div>

        {/* Departure: Earth */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-800 shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center justify-center relative border border-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-600" />
              <div className="absolute top-2 left-4 w-8 h-6 bg-emerald-500/60 rounded-full blur-sm" />
              <div className="absolute bottom-4 right-2 w-10 h-8 bg-emerald-600/60 rounded-full blur-md" />
              <div className="absolute top-8 right-6 w-6 h-10 bg-emerald-400/50 rounded-full blur-sm" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-30"
              >
                <div className="absolute top-4 left-4 w-4 h-2 bg-white rounded-full blur-[2px]" />
                <div className="absolute bottom-6 right-8 w-6 h-3 bg-white rounded-full blur-[3px]" />
              </motion.div>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 2, 2.5], opacity: [0, 0.6, 0], y: [0, -10, -20] }}
              transition={{ duration: 5, repeat: Infinity, times: [0, 0.1, 0.3], ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 rounded-full blur-xl pointer-events-none"
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest">Terra</span>
        </div>
        
        <div className="absolute left-32 right-32 h-px bg-slate-800 top-[40%] -translate-y-1/2 border-t border-dashed border-slate-700 opacity-30" />

        <motion.div
          animate={{ x: [-160, 160], y: [0, -20, 0], opacity: [0, 1, 1, 0], rotate: [70, 90, 110] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-[35%] z-20"
        >
          <div className="relative">
            <Rocket className="w-12 h-12 text-sky-400 rotate-90 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-3 bg-sky-300 blur-sm rounded-full"
            />
          </div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-800 shadow-[0_0_50px_rgba(192,38,211,0.4)] flex items-center justify-center relative border border-white/10"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: [0, 0, 1], scale: [0, 0, 1], y: [10, 10, -50] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.7, 0.8] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 z-30"
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-0.5 h-10 bg-white/80" />
                  <div className="absolute top-0 right-[-18px] w-5 h-4 bg-white border border-slate-200 rounded-sm shadow-sm" />
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              animate={{ scale: [0.5, 2, 3], opacity: [0, 0.4, 0] }}
              transition={{ duration: 5, repeat: Infinity, times: [0, 0.7, 0.9], ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-400/20 rounded-full blur-2xl pointer-events-none"
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest italic">Missione</span>
        </div>
      </div>
      
      <h2 className="text-5xl font-bold mb-6 tracking-tight uppercase italic flex flex-col items-center">
        <span>Escape from exam:</span>
        <span className="text-sky-400 lowercase text-3xl mt-2">missione decollo!</span>
      </h2>
      <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        Un viaggio spaziale per raccontare chi sei, scoprire i tuoi talenti e prepararti al meglio per il tuo esame finale.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <button 
          onClick={() => setActiveModal('laboratorio')}
          className="space-card text-left hover:scale-105 transition-transform group"
        >
          <h4 className="font-bold text-sky-400 mb-2 flex items-center gap-2">
            <Star className="w-5 h-5 text-sky-400 fill-sky-400 group-hover:rotate-12 transition-transform" /> Laboratorio
          </h4>
          <p className="text-sm text-slate-400">Esplora il tuo percorso attraverso la metafora del viaggio spaziale.</p>
        </button>
        
        <button 
          onClick={() => setActiveModal('obiettivo')}
          className="space-card text-left hover:scale-105 transition-transform group"
        >
          <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" /> Obiettivo
          </h4>
          <p className="text-sm text-slate-400">Costruzione della presentazione rompighiaggio del proprio esame.</p>
        </button>
      </div>

      <AnimatePresence>
        {!showSessions ? (
          <motion.div 
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex justify-center"
          >
            <button 
              onClick={() => setShowSessions(true)}
              className="btn-primary px-12 py-5 text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:scale-105 transition-transform"
            >
              Inizia Missione <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[1, 2, 3, 4].map((num) => (
              <button 
                key={num}
                onClick={() => onStart(num)}
                className="btn-primary py-6 justify-center text-lg font-black italic shadow-lg hover:scale-110 transition-all border-emerald-500/50 bg-emerald-600/20"
              >
                Incontro {num}
              </button>
            ))}
            <button 
              onClick={() => setShowSessions(false)}
              className="col-span-full text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em] mt-2"
            >
              Annulla
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals for Home Screen */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="space-card max-w-lg w-full border-sky-500/50 relative"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-2"
              >
                <X />
              </button>
              
              {activeModal === 'laboratorio' ? (
                <div className="space-y-6 text-left">
                  <h3 className="text-3xl font-black uppercase italic text-sky-400 flex items-center gap-3">
                    <Star className="w-8 h-8 fill-sky-400" /> Il Laboratorio
                  </h3>
                  <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                    <p>
                      Questo laboratorio è un'esperienza immersiva progettata per aiutarti a navigare verso l'esame finale. 
                    </p>
                    <p>
                      Attraverso 4 incontri, esploreremo le tue passioni, i tuoi punti di forza e le tue fragilità, trasformandoli nel carburante per il tuo decollo.
                    </p>
                    <p className="italic text-sky-300">
                      "Non è solo un esame, è l'inizio del tuo viaggio."
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-left">
                  <h3 className="text-3xl font-black uppercase italic text-emerald-400 flex items-center gap-3">
                    <Edit3 className="w-8 h-8" /> Sezione Appunti
                  </h3>
                  <div className="space-y-4">
                    <p className="text-slate-300 text-lg">
                      Usa questo spazio per annotare le tue idee sull'obiettivo finale della missione.
                    </p>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Scrivi qui i tuoi pensieri..."
                      className="w-full h-48 bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-bold text-sm">
                      L'obiettivo è costruire una presentazione autentica e creativa per il proprio esame.
                    </div>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setActiveModal(null)}
                className="btn-secondary w-full mt-8 justify-center"
              >
                Chiudi
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Mission Finish Component ---
const MissionFinish = ({ onHome }: { onHome: () => void }) => {
  const [finished, setFinished] = useState(false);
  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key="rocket"
            exit={{ scale: 0, opacity: 0, rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Rocket className="w-20 h-20 text-emerald-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 italic uppercase">Pronti al Contatto!</h2>
            <p className="text-slate-400 mb-8">È il momento di presentare il tuo pianeta alla classe.</p>
            <button 
              onClick={() => setFinished(true)}
              className="btn-primary bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20 mx-auto px-10 py-4 text-lg"
            >
              Concludi Missione
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="flag"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="space-y-6 flex flex-col items-center"
          >
            <div className="relative">
              {/* Astronaut Graphic */}
              <div className="w-32 h-32 bg-slate-800 rounded-full border-4 border-emerald-500 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <div className="w-16 h-16 bg-white rounded-2xl relative">
                    <div className="absolute top-2 left-2 right-2 h-6 bg-slate-900 rounded-lg" />
                    <div className="absolute bottom-2 left-4 right-4 h-1 bg-sky-500 rounded-full" />
                </div>
                <div className="absolute top-[-10px] right-[-10px] w-12 h-12 bg-emerald-500 rotate-45 border-4 border-slate-900" />
              </div>
              
              {/* Flag */}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                className="absolute -right-4 bottom-0 w-1 bg-white"
              >
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  className="absolute top-0 left-1 h-6 bg-white border border-slate-200 flex items-center justify-center text-[10px] text-slate-800 font-bold"
                >
                  EXAM
                </motion.div>
              </motion.div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-emerald-400 uppercase italic">Missione Compiuta!</h2>
              <p className="text-slate-400">Atterraggio riuscito sul pianeta dell'Esame.</p>
            </div>
            <button 
              onClick={onHome}
              className="btn-secondary mt-8"
            >
              Torna alla Base (Home)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [currentSession, setCurrentSession] = useState(0);
  const [showReflectionExplainer, setShowReflectionExplainer] = useState(false);
  const [notes, setNotes] = useState("");
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('escape_exam_progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (typeof data.currentSession === 'number') setCurrentSession(data.currentSession);
        if (typeof data.notes === 'string') setNotes(data.notes);
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  const handleSave = () => {
    setSaveStatus('saving');
    const data = {
      currentSession,
      notes,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('escape_exam_progress', JSON.stringify(data));
    setTimeout(() => setSaveStatus('saved'), 600);
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (typeof data.currentSession === 'number') setCurrentSession(data.currentSession);
        if (typeof data.notes === 'string') setNotes(data.notes);
        handleSave(); // Re-save locally
        alert("Backup caricato con successo!");
      } catch (err) {
        console.error("Failed to parse backup", err);
        alert("Errore nel caricamento del file backup.");
      }
    };
    reader.readAsText(file);
  };
  const handleExport = () => {
    const data = {
      currentSession,
      notes,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progressi_missione_${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Simple routing for student mode
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');

  if (mode === 'student' || mode === 'reflection' || mode === 'lyrics' || mode === 'discourse_map' || mode === 'caa_game' || urlParams.get('game')) {
    return <StudentInput />;
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-32 min-h-screen relative">
      {/* Global Save Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
            <Rocket className="w-5 h-5 text-sky-400" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Missione Decollo</h1>
            <p className="text-[10px] text-slate-500 font-mono">Pannello di Controllo</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              saveStatus === 'saved' 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                : 'bg-sky-500/10 border-sky-500/30 text-sky-400 hover:bg-sky-500/20'
            }`}
          >
            {saveStatus === 'saving' ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : saveStatus === 'saved' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {saveStatus === 'saving' ? 'Salvataggio...' : saveStatus === 'saved' ? 'Salvato!' : 'Salva Progressi'}
          </motion.button>

          <button
            onClick={handleExport}
            className="p-2 bg-slate-800 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Scarica Backup"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-slate-800 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Carica Backup"
          >
            <RefreshCw className="w-4 h-4" />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImport} 
              className="hidden" 
              accept=".json"
            />
          </button>
        </div>
      </div>
      {/* Home Button for Sessions */}
      {currentSession > 0 && (
        <button 
          onClick={() => setCurrentSession(0)}
          className="fixed top-6 left-6 z-50 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-3 rounded-xl shadow-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <Moon className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Home</span>
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSession}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentSession === 0 && <Home onStart={(num) => setCurrentSession(num)} notes={notes} setNotes={setNotes} />}
          
          {currentSession > 0 && (
            <>
              <Header session={SESSIONS[currentSession]} />
              
              {currentSession === 1 && (
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-bold">1</div>
                      <h2 className="text-2xl font-bold">Fase 1: Il Rompighiaccio - NASA Briefing</h2>
                    </div>
                    <NasaBriefing />
                  </section>
                  
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">2</div>
                      <h2 className="text-2xl font-bold">Fase 2: La Galassia della Classe</h2>
                    </div>
                    <BrainstormingCloud />
                  </section>
                </div>
              )}

              {currentSession === 2 && (
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold">1</div>
                      <h2 className="text-2xl font-bold">Fase 1: Teoria dei Giochi</h2>
                    </div>
                    <SurvivalGame />
                  </section>
                  
                  <section className="space-card">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center font-bold">2</div>
                        <h2 className="text-2xl font-bold">Fase 2: Riflessione Personale</h2>
                        <button 
                          onClick={() => setShowReflectionExplainer(!showReflectionExplainer)}
                          className="p-2 bg-purple-500/20 rounded-full hover:bg-purple-500/40 transition-colors border border-purple-500/30 text-purple-400"
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <p className="text-sky-400 font-mono text-xs uppercase tracking-widest ml-10">Cosa porto con me, il mio equipaggiamento</p>
                      {showReflectionExplainer && (
                        <div className="ml-10 mt-4 p-4 bg-purple-950/40 border border-purple-500/20 rounded-xl text-sm italic text-slate-300">
                          Prendetevi un momento per riflettere sul vostro percorso scolastico e personale. Cosa avete imparato? Quali sono i vostri talenti?
                        </div>
                      )}
                    </div>
                      <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center gap-2">
                        <QRCodeSVG value={`${window.location.origin}?mode=reflection`} size={100} />
                        <span className="text-[10px] font-bold text-slate-900 uppercase">Invia Riflessione</span>
                      </div>
                    </div>
                    
                    <ReflectionDisplay />
                  </section>
                </div>
              )}

              {currentSession === 3 && (
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">1</div>
                      <h2 className="text-2xl font-bold">Fase 1: Parole in Orbita (CAA)</h2>
                    </div>
                    <CAAActivity />
                  </section>
                  
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center font-bold">2</div>
                      <h2 className="text-2xl font-bold">Fase 2: Segnali dallo Spazio</h2>
                    </div>
                    <SpaceSignals />
                  </section>
                </div>
              )}

              {currentSession === 4 && (
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold">1</div>
                      <h2 className="text-2xl font-bold">Fase 1: Costruzione del Discorso</h2>
                    </div>
                    <FinalPresentation />
                  </section>
                  
                  <section className="text-center py-12">
                    <MissionFinish onHome={() => setCurrentSession(0)} />
                  </section>
                </div>
              )}

              {/* Navigation Buttons in Sessions */}
              <div className="mt-12 pt-12 border-t border-slate-800 flex justify-between items-center">
                <button 
                  onClick={() => setCurrentSession(0)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Torna alla Home
                </button>
                
                {currentSession < 4 && (
                  <button 
                    onClick={() => setCurrentSession(currentSession + 1)}
                    className="btn-primary flex items-center gap-2"
                  >
                    Prossimo Incontro <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
