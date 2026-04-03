let recognition = null;
let availableVoices = [];

export function initSpeechRecognition(onResult, onEnd) {
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  recognition.onend = () => onEnd();

  return recognition;
}

export function toggleListening(isListening) {
  if (!recognition) {
    alert("Your browser does not support Speech Recognition. Try a modern Chrome/Edge browser.");
    return false;
  }
  if (isListening) {
    recognition.stop();
    return false;
  } else {
    recognition.start();
    return true;
  }
}

export function initVoices() {
  if (!('speechSynthesis' in window)) return;

  const loadVoices = () => {
    availableVoices = window.speechSynthesis.getVoices();
  };
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

export function speakText(text, mode, onEnd) {
  if (!('speechSynthesis' in window)) {
    alert("Text-to-Speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const pitchMap = { baby: 1.5, silly: 1.3, dog: 0.5, cow: 0.5, zalgo: 0.1 };
  if (pitchMap[mode]) utterance.pitch = pitchMap[mode];
  if (mode === "yoda") utterance.rate = 0.7;
  if (mode === "zalgo") utterance.rate = 0.4;
  if (mode === "vending") { utterance.pitch = 0.8; utterance.rate = 1.2; }
  if (mode === "spongebob") {
    // Spongebob modulates pitch per word or randomly, but for speech synthesis, 
    // we can just set a weird pitch and fast rate
    utterance.pitch = Math.random() > 0.5 ? 1.8 : 0.6;
    utterance.rate = 1.5;
  }

  const voicePrefs = {
    yoda:      ['uk english male', 'david', 'male', 'george', 'daniel'],
    pirate:    ['uk english male', 'david', 'male', 'george', 'daniel'],
    baby:      ['female', 'zira', 'samantha', 'sandra', 'uk english female'],
    vending:   ['zira', 'siri', 'mark', 'google', 'english'],
    silly:     ['karen', 'melina', 'female', 'zira'],
    cat:       ['karen', 'melina', 'female', 'zira'],
    hamster:   ['karen', 'melina', 'female', 'zira'],
    dog:       ['male', 'david', 'george', 'mark'],
    cow:       ['male', 'david', 'george', 'mark'],
    duck:      ['male', 'david', 'george', 'mark'],
    leet:      ['zira', 'siri', 'google', 'english'],
    corporate: ['male', 'david', 'george'],
    zalgo:     ['male', 'david', 'george']
  };

  const keywords = voicePrefs[mode];
  if (keywords) {
    const voice = availableVoices.find(v =>
      keywords.some(kw => v.name.toLowerCase().includes(kw))
    );
    if (voice) utterance.voice = voice;
  }

  utterance.onend = onEnd;
  utterance.onerror = onEnd;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  window.speechSynthesis.cancel();
}
