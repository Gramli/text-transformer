// Silly mappings
const sillyMap = {
  you: "u", are: "r", the: "teh", very: "super-duper", good: "goodest",
  bad: "baddest", hello: "hewwo", world: "wourld", friend: "fren",
  dog: "doggo", cat: "catto", snake: "danger noodle", what: "wat",
  why: "y", yes: "yasss", no: "naur", bro: "bruh",
};
const emojis = [" 🤡", " 🤪", " 🥴", " 🦄", " 🛸", " 🤠", " 🌵", " 🍕"];

// Pirate dictionary
const pirateMap = {
  "hello": "ahoy", "hi": "avast", "my": "me", "friend": "matey", "friends": "mateys",
  "yes": "aye", "no": "nay", "you": "ye", "are": "be", "is": "be", "your": "yer",
  "the": "th'", "of": "o'", "to": "t'", "very": "mighty", "bad": "scurvy",
  "good": "shipshape", "where": "whar", "stop": "belay", "money": "booty",
  "hey": "yo ho", "boy": "lad", "girl": "lass", "dude": "matey"
};

function matchCase(original, replacement) {
  return (original.charAt(0) === original.charAt(0).toUpperCase())
    ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
    : replacement;
}

function createVocabTransformer(vocab, suffix = null) {
  return (text) => {
    if (!text.trim()) return "";
    return text.split(/\s+/).map(w => {
      if (w.match(/^[a-z]+$/i) && Math.random() > 0.5) {
        return matchCase(w, vocab[Math.floor(Math.random() * vocab.length)]);
      }
      if (suffix && Math.random() > 0.6) return w + suffix;
      return w;
    }).join(" ");
  };
}

export const modes = [
  { 
    id: "silly", 
    label: "Silly English 🤡", 
    msg: "Prepare for maximum nonsense! Press ScrollLock.",
    copyMsg: "SNATCHED! 🏃‍♂️💨",
    bgColors: ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#ff99ff"], // Dynamic colors
    transform: (text) => {
      if (!text.trim()) return "";
      let words = text.split(/\s+/);
      if (words.length > 5 && Math.random() > 0.7) {
        words = words.sort(() => Math.random() - 0.5);
      }
      return words.map((w) => {
        let cleanWord = w.toLowerCase().replace(/[^a-z]/g, "");
        let replacement = sillyMap[cleanWord] || w;
        let newWord = "";
        for (let char of replacement) {
          newWord += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        }
        if (Math.random() > 0.6) newWord += "?!".repeat(Math.floor(Math.random() * 4) + 1);
        if (Math.random() > 0.8) newWord += emojis[Math.floor(Math.random() * emojis.length)];
        return newWord;
      }).join(" ");
    }
  },
  { 
    id: "yoda", 
    label: "Yoda Style 🌠", 
    msg: "Transform your text, you must. Press ScrollLock.",
    copyMsg: "Copied, it is! 🐸",
    bgColor: "#0a192f",
    transform: (text) => {
      if (!text.trim()) return "";
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
      return sentences.map((sentence) => {
        const trimmed = sentence.trim();
        if (!trimmed) return "";
        const words = trimmed.split(/\s+/);
        const punctMatch = words[words.length - 1].match(/[\.!\?]+$/);
        let punct = punctMatch ? punctMatch[0] : "";
        if (punct) words[words.length - 1] = words[words.length - 1].slice(0, -punct.length);
        if (words.length <= 2) return words.join(" ") + (punct || "");
        const splitPoint = Math.floor(words.length * 0.6);
        const firstPart = words.slice(0, splitPoint);
        const secondPart = words.slice(splitPoint);
        secondPart[0] = secondPart[0].charAt(0).toUpperCase() + secondPart[0].slice(1);
        firstPart[0] = firstPart[0].charAt(0).toLowerCase() + firstPart[0].slice(1);
        return `${secondPart.join(" ")}, ${firstPart.join(" ")}${punct || "."}`;
      }).join(" ");
    }
  },
  { 
    id: "pirate", 
    label: "Pirate 🏴‍☠️", 
    msg: "Shiver me timbers! Hit the ScrollLock button matey.",
    copyMsg: "Looted! 🏴‍☠️",
    bgColor: "#312011",
    transform: (text) => {
      if (!text.trim()) return "";
      let words = text.split(/(?=\b)|(?<=\b)/);
      return words.map((w) => {
        let cl = w.toLowerCase();
        if (pirateMap[cl]) return matchCase(w, pirateMap[cl]);
        if (w.trim().length > 0 && Math.random() > 0.5 && /^[A-Za-z]+$/.test(w)) {
          return w + " arrr!";
        }
        return w;
      }).join("");
    }
  },
  { 
    id: "baby", 
    label: "Baby Talk 🍼", 
    msg: "Goo goo ga ga... Pwess ScwollWock...",
    copyMsg: "Snatched! 👶",
    bgColor: "#ebf8ff",
    transform: (text) => {
      if (!text.trim()) return "";
      let words = text.split(/\s+/);
      return words.map(w => {
        let isUpper = (w.charAt(0) && w.charAt(0).toUpperCase() === w.charAt(0) && w.match(/[a-zA-Z]/));
        let bw = w.toLowerCase()
                  .replace(/r/g, "w").replace(/l/g, "w")
                  .replace(/th/g, "d").replace(/s/g, "sh")
                  .replace(/v/g, "b");
        if (isUpper) bw = bw.charAt(0).toUpperCase() + bw.slice(1);
        if (Math.random() < 0.5) {
          let gub = [" goo goo", " ga ga", " waaa", " ba-ba"][Math.floor(Math.random() * 4)];
          bw += gub;
        }
        return bw;
      }).join(" ");
    }
  },
  { 
    id: "cat", 
    label: "Cat 🐾", 
    msg: "Meow hiss purr! *scratches ScrollLock key*",
    copyMsg: "*Purr* Copied 🐾",
    bgColor: "#222",
    transform: createVocabTransformer(["meow", "purr", "hiss", "scratch", "meowza", "mew", "yowl"])
  },
  { 
    id: "dog", 
    label: "Dog 🐶", 
    msg: "Woof woof! Bark at the ScrollLock key.",
    copyMsg: "*Bark* Copied 🐶",
    bgColor: "#8b4513",
    transform: createVocabTransformer(["woof", "bark", "bork", "arf", "yap", "howl", "sniff"], " *pant*")
  },
  { 
    id: "hamster", 
    label: "Hamster 🐹", 
    msg: "Squeak squeak! Run on the ScrollLock wheel.",
    copyMsg: "*Squeak* Copied 🐹",
    bgColor: "#ffebcd",
    transform: createVocabTransformer(["squeak", "nibble", "scurry", "sniff", "chew"])
  },
  { 
    id: "duck", 
    label: "Duck 🦆", 
    msg: "Quack quack! Waddle to the ScrollLock key.",
    copyMsg: "*Quack* Copied 🦆",
    bgColor: "#fae3b4",
    transform: createVocabTransformer(["quack", "honk", "waddle", "flap"], " *quack*")
  },
  { 
    id: "cow", 
    label: "Cow 🐄", 
    msg: "Moo moo! Graze on the ScrollLock key.",
    copyMsg: "*Moo* Copied 🐄",
    bgColor: "#f0f0f0",
    transform: createVocabTransformer(["moo", "mooooo", "graze", "chew"])
  },
  { 
    id: "vending", 
    label: "Vending Machine 📠", 
    msg: "Bzzzt... Insert ScrollLock to dispense.",
    copyMsg: "*Ka-ching* Dispensed 📠",
    bgColor: "#d3d3d3",
    transform: (text) => {
      if (!text.trim()) return "";
      let vendingVocab = ["*clunk*", "*whirrr*", "*beep*", "*kachunk*", "[OUT OF STOCK]"];
      return text.split(/\s+/).map(w => {
        if (Math.random() < 0.5) return vendingVocab[Math.floor(Math.random() * vendingVocab.length)];
        return w.toUpperCase();
      }).join(" ");
    }
  },
  { 
    id: "spongebob", 
    label: "sPoNgEbOb CaSe 🧽", 
    msg: "mOcKiNg YoUr TyPiNg...",
    copyMsg: "cOpIeD!",
    bgColor: "#e6e600",
    transform: (text) => {
      if (!text.trim()) return "";
      return text.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
    }
  },
  {
    id: "leet",
    label: "1337 5P34K 💻",
    msg: "W3lc0m3 70 7h3 M47r1x pwn3d h4x0r",
    copyMsg: "h4ck3d!",
    bgColor: "#000000",
    transform: (text) => {
      if (!text.trim()) return "";
      const leetMap = { a: '4', e: '3', i: '1', o: '0', s: '5', t: '7', b: '8', g: '9' };
      const words = text.split(/\s+/).map(w => {
        return w.replace(/[aeiostbg]/gi, match => leetMap[match.toLowerCase()] || match);
      });
      if (words.length > 0 && Math.random() > 0.5) words.push("pwn3d");
      if (Math.random() > 0.7) words.push("h4x0r");
      return words.join(" ");
    }
  },
  {
    id: "brainrot",
    label: "Gen Alpha Brainrot 💀",
    msg: "Absolute sigma rizz.",
    copyMsg: "W Copy!",
    bgColor: "#ff00ff",
    transform: (text) => {
      if (!text.trim()) return "";
      const rot = ["skibidi", "rizz", "gyatt", "fanum tax", "sigma", "cap", "mewing", "ohio"];
      let newText = text.split(/\s+/).map(w => {
        if (Math.random() > 0.7) return rot[Math.floor(Math.random() * rot.length)];
        return w;
      }).join(" ");
      return newText + " fr fr no cap 💀";
    }
  },
  {
    id: "corporate",
    label: "Corporate Synergy 👔",
    msg: "Let's circle back and leverage our paradigms.",
    copyMsg: "Synergized!",
    bgColor: "#e0e0e0",
    transform: (text) => {
      if (!text.trim()) return "";
      const corpMap = {
        "use": "leverage", "talk": "circle back on", "idea": "paradigm shift",
        "good": "value-adding", "bad": "sub-optimal", "help": "facilitate",
        "job": "bandwidth", "team": "squad", "make": "synergize"
      };
      return text.split(/\s+/).map(w => {
        const clean = w.toLowerCase().replace(/[^a-z]/g, "");
        if (corpMap[clean]) return matchCase(w, corpMap[clean]);
        return w;
      }).join(" ") + " Please advise on your bandwidth.";
    }
  },
  {
    id: "zalgo",
    label: "Z̷a̸l̶g̵o̵ ̷ 👁️",
    msg: "H̷̼͝E̴͇̿ ̷̮͑C̵͎̎Õ̶̤M̸̰̓E̴̢̛S̸̙̆",
    copyMsg: "S̸͕̿Ǫ̶̈́U̴͎͂L̸̜͂ ̷̢͌S̴̩̓N̶̡̆A̸̭̒T̸̲͗Ç̸͝H̸͈̿Ě̵͔D̵͌ͅ",
    bgColor: "#4a0000",
    transform: (text) => {
      if (!text.trim()) return "";
      const diacritics = [
        '\u030d', '\u030e', '\u0304', '\u0305',
        '\u033f', '\u0311', '\u0306', '\u0310',
        '\u0352', '\u0357', '\u0351', '\u0301',
        '\u0340', '\u0316', '\u0317', '\u0318',
        '\u0319', '\u031c', '\u031d', '\u0320',
        '\u0324', '\u0325', '\u0326', '\u0329',
        '\u032a', '\u032b', '\u032c', '\u032d',
      ];
      return text.split('').map(c => {
        if (c === ' ' || c === '\n') return c;
        let count = Math.floor(Math.random() * 5) + 1;
        let z = c;
        for (let i = 0; i < count; i++) {
          z += diacritics[Math.floor(Math.random() * diacritics.length)];
        }
        return z;
      }).join('');
    }
  },
  {
    id: "regex",
    label: "Borked Regex 🔍",
    msg: "Uncaught SyntaxError: Invalid regular expression...",
    copyMsg: "/Copied/g;",
    bgColor: "#000080",
    transform: (text) => {
      if (!text.trim()) return "";
      return "^(?:(?!" + text.trim().replace(/\s+/g, "\\s+(.*?)") + ")[\\s\\S])*$";
    }
  },
  {
    id: "startup",
    label: "Startup Hustle 🚀",
    msg: "We're disrupting disruption. Pivot or die.",
    copyMsg: "Shipped to prod! 🚀",
    bgColor: "#f5f0ff",
    transform: (text) => {
      if (!text.trim()) return "";
      const startupMap = {
        "idea":     "unicorn hypothesis",
        "plan":     "go-to-market roadmap",
        "work":     "hustle",
        "problem":  "pain point",
        "change":   "pivot",
        "hire":     "onboard a rockstar",
        "fire":     "sunset the headcount",
        "meeting":  "standup",
        "failure":  "learnings",
        "success":  "hockey stick growth",
        "money":    "runway",
        "product":  "MVP",
        "user":     "early adopter",
        "build":    "ship",
        "talk":     "async",
        "good":     "10x",
        "bad":      "pre-product-market-fit",
        "fast":     "default aggressive",
        "slow":     "not iterating fast enough",
        "old":      "legacy",
        "new":      "disruptive",
        "company":  "rocketship",
        "team":     "founding team",
        "boss":     "co-founder",
        "customer": "design partner",
        "website":  "landing page",
        "email":    "cold outreach",
      };
      const buzzwords = [
        "move fast", "iterate", "disrupt", "scale", "10x growth",
        "product-market fit", "growth hack", "agile", "ROI", "Series A"
      ];
      const words = text.split(/\s+/).map(w => {
        const clean = w.toLowerCase().replace(/[^a-z]/g, "");
        if (startupMap[clean]) return matchCase(w, startupMap[clean]);
        if (Math.random() > 0.85) return w + " (but at scale)";
        return w;
      });
      const buzz = buzzwords[Math.floor(Math.random() * buzzwords.length)];
      return words.join(" ") + ` — and that's how we ${buzz}.`;
    }
  }
];