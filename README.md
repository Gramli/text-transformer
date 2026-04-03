# 🦄 Absurd Text Transformer

> A chaotic, feature-packed text transformer built for maximum nonsense. Transform your boring text into Yoda-speak, Brainrot, Zalgo corruption, Corporate Synergy, Pirate lingo, and many more absurd formats — complete with Text-to-Speech, voice dictation, cursor trails, an evil floating Clippy, and 90s cheat codes.

Built for the **DEV April Fools Challenge** 🎉

---

## What It Does

The Absurd Text Transformer takes normal text and ruins it — beautifully. It offers **17 transformation modes**, each with a distinct personality, unique theme, and its own TTS voice settings.

### Transformation Modes

| Mode | Description |
|---|---|
| 🤡 Silly English | Randomized caps, emoji spam, shuffled words |
| 🌠 Yoda Style | Sentence structure reversed, Jedi-style |
| 🏴‍☠️ Pirate | Ahoy! Full pirate vocabulary substitution |
| 👶 Baby Talk | Uwu-fied cute baby babble |
| 🐱 Cat | Pure meow-based communication |
| 🐶 Dog | Woof enthusiastically repeated |
| 🐹 Hamster | Squeak-inflected vocabulary chaos |
| 🦆 Duck | Quack, quack, quack |
| 🐄 Cow | Moo. Just moo. |
| 🎰 Vending Machine | Corporate dispensary voice |
| 🧽 SpongeBob Case | aLtErNaTiNg CaPs |
| 🖥️ Leetspeak | 1337 h4ck3r sp34k |
| 🧠 Brainrot | Skibidi rizz sigma slang |
| 🏢 Corporate Synergy | Leverages core competencies going forward |
| 😈 Zalgo | C̴̦͝o̵͕̓r̵̺̔r̴̳̿u̵͇͊p̷̣̿t̷̩̒e̷͚͗d̶̠̓ text corruption |
| 💥 Broken Regex | `<[Object object]>` escaping `undefined` everywhere |
| 🚀 Startup Hustle | Pivot your MVP into a unicorn hypothesis at scale |

---

## Features

- **16 absurd text transformation modes** with per-mode themes and styling
- **Text-to-Speech** — each mode has a unique voice, pitch, and speed
- **Voice Dictation** — speak your input using the browser's Speech Recognition API
- **Evil Clippy** — a floating, unkillable paperclip that offers terrible advice
- **Cursor Trails** — 90s-style sparkle and emoji particle trails following your mouse
- **Works on My Machine button** — triggers a full-screen BSOD experience
- **90s Cheat Codes modal** — a reference sheet of classic game cheats
- **Scam Modal** — randomly-timed "YOU HAVE WON" pop-ups
- **Premium Upsell Modal** — fake $499 token purchases (floppy disk payments only)
- **Absurd Time Badge** — displays the current time in a random obscure timezone
- **Keyboard-only transform** — `Scroll Lock` / `Insert` to transform, `Pause` for voice input

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
git clone https://github.com/yourusername/text-transformer.git
cd text-transformer
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Docker / Cloud Run Deployment

The project includes a multi-stage `Dockerfile` and an `nginx.conf.template` for deployment to container environments such as **Google Cloud Run**.

The Nginx configuration uses the `$PORT` environment variable (automatically set by Cloud Run, defaults to `8080`).

### Build and Run Locally

```bash
docker build -t text-transformer .
docker run -p 8080:8080 text-transformer
```

### Deploy to Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT/text-transformer
gcloud run deploy text-transformer \
  --image gcr.io/YOUR_PROJECT/text-transformer \
  --platform managed \
  --allow-unauthenticated
```

---

## Project Structure

```
src/
├── App.svelte              # Main application host
├── lib/
│   ├── transformers.js     # All 16 transformation mode definitions
│   ├── speechService.js    # TTS and Speech Recognition logic
│   ├── scamData.js         # Scam pop-up content
│   ├── ManualModal.svelte  # "How to use" modal
│   ├── CheatsModal.svelte  # 90s game cheat codes modal
│   ├── ScamModal.svelte    # Random scam pop-up
│   ├── PremiumModal.svelte # Fake premium upsell
│   ├── AbsurdTimeBadge.svelte  # Timezone badge
│   ├── EvilClippy.svelte   # Annoying floating paperclip
│   └── CursorTrails.svelte # 90s cursor particle effects
```

---

## Adding a New Transformation Mode

Add a new entry to the `modes` array in `src/lib/transformers.js`:

```js
{
  id: "mymode",
  label: "My Mode 🔥",
  msg: "A short tagline shown in the UI.",
  copyMsg: "Copied message shown after copying!",
  bgColor: "#ff00ff",
  transform: (text) => {
    if (!text.trim()) return "";
    return text.split(" ").map(w => w + "🔥").join(" ");
  }
}
```

Optionally map a TTS voice/pitch in `src/lib/speechService.js`.

---

## Browser Support

Requires a modern browser. TTS and Speech Recognition features work best in **Chrome** or **Edge** (full Web Speech API support). Firefox has limited TTS support and no Speech Recognition.

---

## Contributing

Pull requests are welcome. For significant changes, open an issue first to discuss what you'd like to change.

---

## Maintainer

Built with maximum irresponsibility by a developer who had too much coffee. Submissions, chaos, and feature PRs are welcome.
