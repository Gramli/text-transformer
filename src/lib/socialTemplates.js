export const templates = {
  devto: [
    (text) => `🔥 OMG I CAN'T EVEN right now! Check out this absolute MIND-BLOWING snippet of thought:\n\n---\n${text}\n---\n\nIf you disagree, you're obviously not a 10x rockstar ninja developer. Smash that heart button! ❤️🦄💻 #dev #coding #blessed #10x`,
    (text) => `🚀 Just deployed this to production on a Friday. What could go wrong? Here's my architecture philosophy:\n\n${text}\n\nRead my 50-part series on why this is the only way to build software. 🛠️✨ #webdev #programming #yolo`,
    (text) => `🧠 Hot take approaching! I replaced my entire tech stack with just this:\n\n>>> ${text} <<<\n\nMy bundle size is now zero. Beat that! 🏆 #frontend #javascript #efficiency`,
    (text) => `Tired: Writing clean, maintainable code.\nWired:\n\n${text}\n\nWho needs tests when you have raw confidence? Drop your favorite framework in the comments! ⚡️😎 #tech #devlife #innovation`
  ],
  linkedin: [
    (text) => `🚨 I am truly HUMBLED and HONORED to share a ground-breaking paradigm shift in my professional journey. 🚨\n\nEver since I was 2 years old, I knew I wanted to say this:\n\n💡 "${text}"\n\nAgree? Thoughts? Let's synergize in the comments below. 👇👇👇👇\n\n#hustle #grind #synergy #humbled #ceo #thoughtleader`,
    (text) => `Today I woke up at 3:00 AM, ran a marathon, and meditated. Then I realized the ultimate truth of B2B sales:\n\n"${text}"\n\nThis is why I don't hire people who sleep. Are you grinding enough? 📈🤝🔥 #leadership #inspiration #mindset`,
    (text) => `I asked my dog what the future of AI and blockchain holds. He looked at me and said:\n\n"${text}"\n\nDogs are the best networkers. Connect with me for more insights. 🐶💼💡 #innovation #futureofwork #petsinbusiness`,
    (text) => `Failure is just a stepping stone. Yesterday I accidentally deleted the production database, but it taught me an important lesson:\n\n✨ ${text} ✨\n\nIt's not a mistake if you call it a pivot. Agree? 🔄🌟 #leadership #growthmindset #pivot`
  ],
  teams: [
    (text) => `🔴 HIGH PRIORITY 🔴\n\nHey team, just wanted to ping you, gently circle back, align our synergies, and touch base on this crucial deliverable:\n\n>>> ${text} <<<\n\nPlease action this immediately EOD or let's take it offline. Regards. ☕📉`,
    (text) => `👋 Happy Friday team! Just jumping in here to disrupt the current workflow with a quick thought:\n\n${text}\n\nLet's put a pin in this and unpack it during our 6-hour sync on Monday. 📅🍩`,
    (text) => `Per my last email... I just wanted to bubble this up to the top of your inbox.\n\n*** ${text} ***\n\nIf we have bandwidth to pivot on this, that would be a game-changer. 🚀📋`,
    (text) => `Just thinking out loud here, but what if instead of meeting our Q3 OKRs, we simply:\n\n${text}\n\nLet's take this offline and circle back when we have more optics. 👁️💼`
  ],
  recruiter: [
    (text) => `Hi there!\n\nThanks for reaching out! Since you definitely read my profile, you'll know that my response to your "exciting opportunity" is:\n\n>>> ${text}\n\nMy base compensation expectation is $1,000,000 and free unlimited avocados. Please advise. 🥑💅`,
    (text) => `Hello!\n\nYour message found me well! Unfortunately, to pass my candidate screening process, please decipher this:\n\n${text}\n\nIf you understand this, I will accept an interview. 🕵️‍♂️📝`,
    (text) => `Thanks for the InMail! I'm currently not looking, but my AI assistant has formulated this exact response for open roles:\n\n"${text}"\n\nPlease let the hiring manager know. Warmest regards! 🤖🚀`,
    (text) => `Hi! Thanks for the opportunity. Before we proceed, my personal ethos is strictly aligned with the following statement:\n\n✨ ${text} ✨\n\nDoes the company culture support this? Let me know! 🏢🔮`
  ]
};

export function getRandomFormattedText(type, text) {
  const typeTemplates = templates[type];
  if (!typeTemplates || typeTemplates.length === 0) return text;
  const randomTemplate = typeTemplates[Math.floor(Math.random() * typeTemplates.length)];
  return randomTemplate(text);
}
