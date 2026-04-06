const rarities = ["Common", "Rare", "Legendary", "Existential"];

export const badges = [
  {
    id: "v1",
    type: "visit",
    limit: 1,
    name: "1-Week Streak (Actually 1 Visit)",
    icon: "🔥",
    desc: "You clicked a link! Such engagement. This community would be proud.",
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
  {
    id: "new1",
    type: "transform",
    limit: 7,
    name: "Top 7",
    icon: "🙌",
    desc: "Awarded for having a post featured in the weekly 'must-reads'. Actually you just transformed 7 texts. Close enough.",
  },
  {
    id: "new2",
    type: "transform",
    limit: 1,
    name: "Writing Debut",
    icon: "📝",
    desc: "Awarded for writing your first DEV post! Or, you know, transforming your first text. Same amount of effort.",
  },
  {
    id: "new3",
    type: "visit",
    limit: 6,
    name: "1 Week Community Wellness Streak",
    icon: "🧘",
    desc: "For actively engaging by posting 2 comments... or just visiting us 6 times. We are desperate for DAUs.",
  },
  {
    id: "new4",
    type: "visit",
    limit: 7,
    name: "2 Week Community Wellness Streak",
    icon: "🗣️",
    desc: "Keep the conversation going! Or refresh the page 7 times. We literally can't tell the difference.",
  },
  {
    id: "new5",
    type: "transform",
    limit: 3,
    name: "Top Discussion of the Week",
    icon: "💬",
    desc: "Awarded for starting a featured discussion! In reality, 3 text transforms is the deepest conversation we've seen today.",
  },
  {
    id: "new6",
    type: "transform",
    limit: 5,
    name: "#Discuss",
    icon: "🏷️",
    desc: "Awarded for the top weekly post. You transformed 5 texts, which is basically a viral thought-piece on whether JS is dead.",
  },
  {
    id: "new7",
    type: "visit",
    limit: 8,
    name: "100 Thumbs Up Milestone",
    icon: "👍",
    desc: "Awarded for giving 100 thumbs ups! Wait, no, you just visited 8 times. Enjoy this mod-exclusive badge anyway.",
  },
  {
    id: "new8",
    type: "transform",
    limit: 9,
    name: "#howtodevto Hero",
    icon: "🦸",
    desc: "Rewarded for giving helpful advice. Transforming 9 texts means you're basically our Chief DevRel Officer now.",
  },
  {
    id: "new9",
    type: "transform",
    limit: 11,
    name: "DEV Challenge Volunteer Judge",
    icon: "⚖️",
    desc: "Awarded for judging a DEV Challenge! Or just mashing transform 11 times. We trust your impeccable taste.",
  },
  {
    id: "new10",
    type: "visit",
    limit: 9,
    name: "500 Thumbs Up Milestone",
    icon: "👎",
    desc: "Gave 500 thumbs ups! Actually, just 9 page visits. You're definitely running a bot, but here's a mod-exclusive badge.",
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
