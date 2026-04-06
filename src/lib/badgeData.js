const rarities = ["Common", "Rare", "Legendary", "Existential"];

export const badges = [
  {
    id: "v1",
    type: "visit",
    limit: 1,
    name: "1-Week Streak (Actually 1 Visit)",
    icon: "🔥",
    desc: "You clicked a link! Such engagement. Dev.to would be proud.",
  },
  {
    id: "v2",
    type: "visit",
    limit: 2,
    name: "The Refresh Button Tester",
    icon: "♻️",
    desc: "You visited twice. Your dedication to hitting F5 is inspiring.",
  },
  {
    id: "v3",
    type: "visit",
    limit: 3,
    name: "Serial Tab Hoarder",
    icon: "📑",
    desc: "Three visits! We know you just left the tab open and forgot.",
  },
  {
    id: "v4",
    type: "visit",
    limit: 4,
    name: "Engagement Metric Booster",
    icon: "📈",
    desc: "Our seed-round investors love you. Four visits!",
  },
  {
    id: "v5",
    type: "visit",
    limit: 5,
    name: "Community Legend™",
    icon: "👑",
    desc: "You've read zero articles but visited 5 times. Royalty!",
  },
  {
    id: "t2",
    type: "transform",
    limit: 2,
    name: "Hello World Architect",
    icon: "👶",
    desc: "Two transforms! You're ready to copy from StackOverflow.",
  },
  {
    id: "t4",
    type: "transform",
    limit: 4,
    name: "Senior YAML Engineer",
    icon: "👴",
    desc: "Four transforms. You can now center a div (by asking an AI).",
  },
  {
    id: "t6",
    type: "transform",
    limit: 6,
    name: "Industry Thought Leader",
    icon: "🧠",
    desc: "Six transforms. Time to write a 50-part dev course.",
  },
  {
    id: "t8",
    type: "transform",
    limit: 8,
    name: "10x Rockstar Ninja",
    icon: "🎸",
    desc: "Eight transforms! Your code runs in O(1) time always.",
  },
  {
    id: "t10",
    type: "transform",
    limit: 10,
    name: "Web3 AI Blockchain Expert",
    icon: "🤖",
    desc: "Ten transforms! You just pivoted your career based on hype.",
  },
  {
    id: "t12",
    type: "transform",
    limit: 12,
    name: "Burnout Survivor",
    icon: "☕",
    desc: "Twelve transforms?! Are you remembering to hydrate?",
  },
  {
    id: "t14",
    type: "transform",
    limit: 14,
    name: "Unpaid Open Source Maintainer",
    icon: "💸",
    desc: "Fourteen transforms. And still no sponsors on GitHub.",
  },
].map(badge => ({
  ...badge,
  rarity: rarities[Math.floor(Math.random() * rarities.length)]
}));

export function inflateBadge(badge, prestigeLevel) {
  if (!prestigeLevel || prestigeLevel < 1) return badge;
  
  const prefixes = ["Super", "Ultra", "Galactic", "Quantum", "Hyper", "Ascended", "God-Tier"];
  const suffixes = ["Pro Max", "Plus Ultra", "Visionary", "Architect", "Mastermind", "Overlord", "Supreme"];
  
  const prefix = prefixes[(prestigeLevel - 1) % prefixes.length];
  const suffix = suffixes[(prestigeLevel - 1) % suffixes.length];
  
  return {
    ...badge,
    name: `${prefix} ${badge.name} ${suffix}`,
    limit: badge.limit * Math.pow(2, prestigeLevel),
    desc: `[Prestige ${prestigeLevel}] ${badge.desc} Now with more inflation!`,
    icon: badge.icon.repeat((prestigeLevel % 3) + 1)
  };
}
