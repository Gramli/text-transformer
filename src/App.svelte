<script>
  import { onMount } from "svelte";
  import { modes } from "./lib/transformers.js";
  import { scams } from "./lib/scamData.js";
  import { initSpeechRecognition, initVoices, toggleListening, speakText, stopSpeaking } from "./lib/speechService.js";
  import ManualModal from "./lib/ManualModal.svelte";
  import ScamModal from "./lib/ScamModal.svelte";
  import PremiumModal from "./lib/PremiumModal.svelte";
  import AbsurdTimeBadge from "./lib/AbsurdTimeBadge.svelte";
  import CheatsModal from "./lib/CheatsModal.svelte";
  import EvilClippy from "./lib/EvilClippy.svelte";
  import CursorTrails from "./lib/CursorTrails.svelte";

  let inputText = "";
  let transformedText = "";
  let copied = false;
  let isTransforming = false;
  let showPremiumModal = false;
  let showScamModal = false;
  let showManual = false;
  let showCheats = false;
  let currentScam = null;
  let bgIndex = 0;
  let curModeIdx = 0;
  let isListening = false;
  let isPlaying = false;
  let isFrozen = false;
  let comboPos = { top: 50, left: 50 };
  let isTouchDevice = false;
  
  $: modeInfo = modes[curModeIdx];
  $: mode = modeInfo.id;
  $: currentBg = modeInfo.bgColors ? modeInfo.bgColors[bgIndex] : modeInfo.bgColor;

  function handleKeydown(event) {
    if (event.key === "ScrollLock" || event.key === "Insert") {
      event.preventDefault();
      triggerShaking();
      handleTransform();
    } else if (event.key === "Pause") {
      event.preventDefault();
      isListening = toggleListening(isListening);
    }
  }

  function triggerShaking() {
    isTransforming = true;
    setTimeout(() => isTransforming = false, 500);
  }

  function handleTransform() {
    transformedText = modeInfo.transform(inputText);
  }

  function cycleMode() {
    let newIdx;
    do { newIdx = Math.floor(Math.random() * modes.length); } while (newIdx === curModeIdx);
    curModeIdx = newIdx;
    transformedText = "";
    triggerShaking();
  }

  function selectMode(e) {
    const idx = parseInt(e.target.value, 10);
    if (!isNaN(idx) && idx !== curModeIdx) {
      curModeIdx = idx;
      transformedText = "";
      triggerShaking();
    }
  }

  function copyText() {
    navigator.clipboard.writeText(transformedText);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  function handleMobileTrigger() {
    triggerShaking();
    handleTransform();
  }

  function playText() {
    if (isPlaying) {
      stopSpeaking();
      isPlaying = false;
      return;
    }
    if (!transformedText) return;
    isPlaying = true;
    speakText(transformedText, mode, () => { isPlaying = false; });
  }

  onMount(() => {
    initSpeechRecognition(
      (transcript) => {
        inputText = (inputText + " " + transcript).trim();
        handleTransform();
      },
      () => { isListening = false; }
    );
    initVoices();

    isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // Shake-to-transform for mobile (Android + non-iOS 13+)
    let lastShake = 0;
    const SHAKE_THRESHOLD = 18;
    const handleMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const mag = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
      const now = Date.now();
      if (mag > SHAKE_THRESHOLD && now - lastShake > 1500) {
        lastShake = now;
        triggerShaking();
        handleTransform();
      }
    };
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission !== 'function') {
      window.addEventListener('devicemotion', handleMotion);
    }

    const premiumDelay = Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000;
    const premiumTimeout = setTimeout(() => { showPremiumModal = true; }, premiumDelay);

    const scamInterval = setInterval(() => {
      if (!showPremiumModal) {
        currentScam = scams[Math.floor(Math.random() * scams.length)];
        showScamModal = true;
      }
    }, Math.floor(Math.random() * 20000) + 20000);

    // Random position for language combobox — avoid dead center, stay in edge zones
    const edgeZones = [
      { top: 10 + Math.random() * 15, left: 5 + Math.random() * 20 },
      { top: 10 + Math.random() * 15, left: 70 + Math.random() * 20 },
      { top: 75 + Math.random() * 15, left: 5 + Math.random() * 20 },
      { top: 75 + Math.random() * 15, left: 70 + Math.random() * 20 },
    ];
    comboPos = edgeZones[Math.floor(Math.random() * edgeZones.length)];

    const bgInterval = setInterval(() => {
      if (modeInfo.bgColors) {
        bgIndex = (bgIndex + 1) % modeInfo.bgColors.length;
      }
    }, 1500);
    
    return () => {
      clearInterval(bgInterval);
      clearInterval(scamInterval);
      clearTimeout(premiumTimeout);
      window.removeEventListener('devicemotion', handleMotion);
    };
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
  <title>The Absurd Text Transformer 🦄</title>
</svelte:head>

<main style="background-color: {currentBg}; transition: background-color 0.5s ease; min-height: 100vh;">
  <div class="manual-btn-container">
    <button class="manual-btn" on:click={() => showManual = true}>📖 How to use</button>
  </div>
  
  <div class="cheats-btn-container">
    <button class="cheats-trigger-btn" on:click={() => showCheats = true}>🎮 CH34T5!</button>
  </div>

  <ManualModal bind:visible={showManual} />
  <CheatsModal bind:visible={showCheats} />
  <AbsurdTimeBadge />
  <PremiumModal visible={showPremiumModal} />
  <ScamModal bind:visible={showScamModal} scam={currentScam} />
  
  <EvilClippy />
  <CursorTrails />

  <div class="lang-picker" style="top: {comboPos.top}%; left: {comboPos.left}%;">
    <label for="lang-select">🌀 PICK UR LANG</label>
    <select id="lang-select" value={curModeIdx} on:change={selectMode}>
      {#each modes as m, i}
        <option value={i}>{m.label}</option>
      {/each}
    </select>
  </div>

  <div class="womm-btn-wrapper">
    <button class="womm-btn" on:click={() => isFrozen = true}>Works on My Machine</button>
  </div>

  {#if isFrozen}
    <div class="freeze-overlay" on:click={() => isFrozen = false}>
      <div class="freeze-message">
        Works on my machine.
      </div>
    </div>
  {/if}

  <div class="container {mode} {isTransforming ? 'shaking' : ''}">
    <header>
      <h1>{modeInfo.label}</h1>
      <p class="subtitle">{modeInfo.msg}</p>
      <div class="secret-warning desktop-warning">
        ⚠️ ONLY THE <b>SCROLL LOCK</b> KEY WILL TRANSFORM TEXT (or Insert) ⚠️<br/>
        Space and Enter are powerless here!<br/>
        🎙️ PRESS <b>PAUSE</b> FOR VOICE RECOGNITION 🎙️
      </div>
      <div class="secret-warning mobile-warning">
        🤙 TAP THE BIG BUTTON BELOW TO TRANSFORM! 🤙<br/>
        📳 OR SHAKE YOUR PHONE FOR MAXIMUM CHAOS!!!
      </div>
    </header>

    <div class="toggle-container">
      <button class="cycle-btn" on:click={cycleMode}>
        🔄 SWITCH MODE 🔄
      </button>
      <span class="mode-label">Current: <b>{mode.toUpperCase()}</b></span>
    </div>

    <div class="io-container">
      <div class="pane">
        <label for="input">Input (Normal): {#if isListening}<span class="listening-indicator">🔴 LISTENING...</span>{/if}</label>
        <textarea id="input" bind:value={inputText} placeholder="Type something normal here... Remember, NO AUTO-TRANSFORM!"></textarea>
      </div>

      <div class="mobile-transform-wrapper">
        <button class="mobile-transform-btn" on:click={handleMobileTrigger}>
          🤙 SMASH TO TRANSFORM 🤙
        </button>
        <div class="shake-hint-mobile">📳 OR SHAKE YOUR PHONE!!!</div>
      </div>

      <div class="pane output-pane">
        <label for="output">Output ({mode}):</label>
        <textarea id="output" readonly value={transformedText} placeholder="Press SCROLL LOCK to witness the magic/horror..."></textarea>
        
        <div class="action-buttons">
          <button on:click={playText} class="action-btn" disabled={!transformedText}>
            {isPlaying ? '🛑 Stop' : '🔊 Play'}
          </button>
          <button on:click={copyText} class="action-btn" disabled={!transformedText}>
            {#if copied}
              {modeInfo.copyMsg}
            {:else}
              📋 Copy Text
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  }
  main { display: flex; justify-content: center; align-items: center; padding: 2rem; box-sizing: border-box; }
  
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-2px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(4px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 3px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -2px) rotate(2deg); }
    90% { transform: translate(2px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  .shaking {
    animation: shake 0.3s;
    animation-iteration-count: 2;
  }

  .lang-picker {
    position: fixed;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transform: rotate(var(--tilt, -4deg));
    filter: drop-shadow(3px 3px 0 black);
  }
  .lang-picker label {
    font-family: 'Comic Sans MS', 'Chalkboard SE', cursive;
    font-size: 0.85rem;
    font-weight: 900;
    color: #ff00ff;
    text-shadow: 1px 1px 0 black;
    background: yellow;
    padding: 2px 6px;
    border: 2px solid black;
  }
  .lang-picker select {
    font-family: 'Comic Sans MS', 'Chalkboard SE', cursive;
    font-size: 0.9rem;
    background: #000080;
    color: lime;
    border: 3px outset #888;
    padding: 4px 6px;
    cursor: pointer;
    outline: none;
    max-width: 180px;
  }
  .lang-picker select:focus {
    border-style: inset;
  }

  .womm-btn-wrapper {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
  }
  .womm-btn {
    background-color: yellow;
    color: red;
    font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
    font-size: 1.2rem;
    font-weight: 900;
    border: 5px dashed lime;
    padding: 10px 20px;
    cursor: help;
    box-shadow: 5px 5px 0px blue;
    animation: womm-flash 0.5s infinite alternate;
    transform: rotate(-5deg);
  }
  .womm-btn:hover {
    transform: rotate(5deg) scale(1.2);
  }
  @keyframes womm-flash {
    0% { background-color: yellow; color: red; border-color: lime; box-shadow: 5px 5px 0px blue; }
    100% { background-color: magenta; color: yellow; border-color: cyan; box-shadow: -5px -5px 0px red; }
  }

  .freeze-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #0000aa; /* BSOD Blue */
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: crosshair;
  }
  .freeze-message {
    color: #fff;
    padding: 40px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 4rem;
    font-weight: bold;
    pointer-events: none;
    user-select: none;
    text-align: center;
    border: none;
    background: transparent;
    box-shadow: none;
  }

  .container { background: rgba(255, 255, 255, 0.9); padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2); max-width: 800px; width: 100%; position: relative; transition: all 0.3s ease; }

  .manual-btn-container {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
  }
  .manual-btn {
    background: #ff00ff;
    color: yellow;
    font-size: 1.5rem;
    font-weight: 900;
    border: 5px dashed yellow;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow: 5px 5px 0px black;
    transform: rotate(-5deg);
    transition: all 0.2s;
  }
  .manual-btn:hover {
    transform: rotate(5deg) scale(1.1);
    background: yellow;
    color: #ff00ff;
    border-color: #ff00ff;
  }

  .cheats-btn-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
  .cheats-trigger-btn {
    background: #000;
    color: #0f0;
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    font-weight: 900;
    border: 5px outset #555;
    padding: 15px;
    cursor: pointer;
    box-shadow: -6px -6px 0px #ff00ff;
    transform: rotate(5deg);
    transition: all 0.2s;
    text-shadow: 2px 2px #f00;
  }
  .cheats-trigger-btn:hover {
    transform: rotate(-3deg) scale(1.1);
    box-shadow: -10px -10px 0px #ff00ff;
    color: #ff0;
  }

  /* Yoda */
  .container.yoda { background: rgba(10, 25, 47, 0.95); color: #64ffda; font-family: 'Courier New', Courier, monospace; border: 2px solid #64ffda; box-shadow: 0 0 20px rgba(100, 255, 218, 0.2); }
  .container.yoda textarea { background: #112240; color: #ccd6f6; border: 1px solid #64ffda; }
  .container.yoda .action-btn { background: #64ffda; color: #0a192f; border: none; font-family: inherit; }
  .container.yoda .action-btn:hover { background: #52e0c4; transform: scale(1.05); }
  
  /* Pirate */
  .container.pirate { background: #ab8654; background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 10px, transparent 10px, transparent 20px); border: 5px dashed #4e3512; color: #2b1d0c; font-family: 'Times New Roman', Times, serif; box-shadow: inset 0 0 20px #4e3512; }
  .container.pirate textarea { background: #e6d3a6; border: 2px dashed #4e3512; color: #4e3512; font-family: 'Cursive', serif; font-weight: bold; }
  .container.pirate .action-btn { background: #ffd700; color: #000; border: 3px solid #b8860b; border-radius: 5px; font-family: inherit; }
  
  /* Baby */
  .container.baby { background: #ffe6f2; border: 10px solid #cce6ff; border-radius: 40px; color: #ff66a3; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 0 0 30px #ffb3d9; }
  .container.baby textarea { background: #fff; border: 3px dotted #ff99c2; border-radius: 20px; font-family: inherit; color: #ff66a3; }
  .container.baby .action-btn { background: #cce6ff; color: #ff66a3; border: 2px solid #ff99c2; border-radius: 20px; font-family: inherit; }

  /* Cat */
  .container.cat { background: repeating-linear-gradient(90deg, #ff9900, #ff9900 20px, #000 20px, #000 40px); color: #fff; border: 5px solid #ff9900; font-family: 'Impact', sans-serif; position: relative; }
  .container.cat::before { content: ''; position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); z-index: 0; }
  .container.cat > * { position: relative; z-index: 1; }
  .container.cat textarea { background: rgba(255,255,255,0.9); color: #000; border: 3px dashed #ff9900; font-family: inherit; }
  .container.cat .action-btn { background: #ff9900; color: #000; border: 2px solid #fff; border-radius: 50%; min-width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align: center; }
  .container.cat .action-btn:hover { transform: scale(1.2) rotate(15deg); }

  /* Dog */
  .container.dog { background: #d2b48c; border: 8px solid #8b4513; border-radius: 20px; color: #4a2511; font-family: 'Georgia', serif; position: relative; box-shadow: inset 0 0 15px rgba(139, 69, 19, 0.5); }
  .container.dog textarea { background: #fff8dc; border: 3px dashed #8b4513; color: #4a2511; font-family: inherit; }
  .container.dog .action-btn { background: #8b4513; color: #fff8dc; border: 3px solid #5a2e0b; border-radius: 15px; font-family: inherit; }

  /* Hamster */
  .container.hamster { background: #ffebcd; border: 6px dotted #d2691e; border-radius: 50px; color: #a0522d; font-family: 'Verdana', sans-serif; position: relative; box-shadow: 0 0 25px rgba(210, 105, 30, 0.4); }
  .container.hamster textarea { background: #fff; border: 4px solid #cd853f; color: #8b4513; font-family: inherit; border-radius: 25px; }
  .container.hamster .action-btn { background: #d2691e; color: #fff; border: 2px dashed #ffebcd; border-radius: 25px; font-family: inherit; }

  /* Duck */
  .container.duck { background: #fffacd; border: 5px solid #ffaa00; border-radius: 20px; color: #cc5500; font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; box-shadow: 0 0 15px rgba(255, 170, 0, 0.5); }
  .container.duck textarea { background: #fffdf0; border: 3px dashed #ffaa00; color: #cc5500; font-family: inherit; }
  .container.duck .action-btn { background: #ffaa00; color: #fff; border: 3px solid #e69900; border-radius: 10px; font-family: inherit; }

  /* Cow */
  .container.cow { background: #ffffff; border: 8px dashed #000000; border-radius: 10px; color: #000000; font-family: 'Courier New', Courier, monospace; box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2); }
  .container.cow textarea { background: #f9f9f9; border: 2px solid #000; color: #000; font-family: inherit; }
  .container.cow .action-btn { background: #000; color: #fff; border: 2px solid #fff; border-radius: 5px; font-family: inherit; }

  /* Vending Machine */
  .container.vending { background: #2f4f4f; border: 10px solid #a9a9a9; border-radius: 5px; color: #00ff00; font-family: 'Consolas', monospace; box-shadow: inset 0 0 20px #000; }
  .container.vending textarea { background: #000000; border: 2px solid #00ff00; color: #00ff00; font-family: inherit; text-transform: uppercase; }
  .container.vending .action-btn { background: #00ff00; color: #000; border: 4px solid #006400; border-radius: 2px; font-family: inherit; }

  header { text-align: center; margin-bottom: 1.5rem; }
  header h1 { font-size: 2.5rem; margin: 0; text-transform: uppercase; }
  .subtitle { font-size: 1.2rem; font-weight: bold; }
  .secret-warning { background: #ff0000; color: #fff; padding: 0.5rem; font-weight: bold; border-radius: 0.5rem; border: 2px dashed yellow; margin-top: 10px; text-shadow: 1px 1px 0 #000; }
  
  .toggle-container { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 2rem; }
  .cycle-btn { padding: 1rem 2rem; font-size: 1.4rem; font-weight: 900; background: linear-gradient(45deg, #ff00cc, #3333ff); color: white; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.3); transition: transform 0.1s; }
  .cycle-btn:active { transform: scale(0.95); }
  .mode-label { font-size: 1.2rem; background: rgba(255,255,255,0.8); color: black; padding: 2px 10px; border-radius: 5px;}

  .io-container { display: flex; flex-direction: column; gap: 1.5rem; }
  .pane { display: flex; flex-direction: column; gap: 0.5rem; }
  label { font-weight: bold; font-size: 1.2rem; background: rgba(255,255,255,0.7); color: black; padding: 2px 8px; border-radius: 4px; display: inline-block; width: max-content; }
  .listening-indicator { color: red; animation: blink 1s infinite alternate; font-weight: bold; margin-left: 10px; }
  @keyframes blink { from { opacity: 1; } to { opacity: 0; } }
  textarea { width: 100%; height: 150px; padding: 1rem; font-size: 1.2rem; border-radius: 0.5rem; border: 3px dashed #ff00ff; resize: vertical; box-sizing: border-box; font-family: inherit; transition: all 0.2s ease;}
  textarea:focus { outline: none; border-color: #00ffff; background: #ffffe0; transform: scale(1.02); }
  .container.yoda textarea:focus { background: #1a365d; border-color: #64ffda; }
  
  .output-pane { position: relative; }
  .action-buttons { position: absolute; right: 1rem; bottom: 1rem; display: flex; gap: 1rem; z-index: 10; }
  .action-btn { padding: 0.5rem 1.5rem; font-size: 1.2rem; font-weight: bold; cursor: pointer; background: #ffff00; border: 4px solid #ff00ff; border-radius: 2rem; box-shadow: 4px 4px 0px #ff00ff; transition: all 0.1s; font-family: inherit; }
  .action-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #ff00ff; }
  .action-btn:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0px #ff00ff; }
  .action-btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; transform: none; }

  /* ── Mobile transform button (hidden on desktop, shown on touch devices) ──── */
  .mobile-warning { display: none; }
  .mobile-transform-wrapper {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 0.75rem 0;
  }
  .mobile-transform-btn {
    width: 100%;
    padding: 1.2rem;
    font-size: 1.3rem;
    font-weight: 900;
    font-family: 'Comic Sans MS', 'Chalkboard SE', cursive;
    background: linear-gradient(135deg, #ff0066, #ff6600, #ffff00, #00cc00, #0066ff, #cc00ff);
    background-size: 400% 400%;
    animation: rainbow-btn 1.5s linear infinite;
    color: white;
    border: 5px solid black;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 5px 5px 0px black;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.8);
    transition: transform 0.1s, box-shadow 0.1s;
  }
  .mobile-transform-btn:active {
    transform: translate(3px, 3px);
    box-shadow: 2px 2px 0px black;
  }
  @keyframes rainbow-btn {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }
  .shake-hint-mobile {
    font-size: 0.9rem;
    font-weight: bold;
    color: #ff00ff;
    text-shadow: 1px 1px 0 black;
    background: yellow;
    padding: 3px 8px;
    border: 2px dashed black;
    border-radius: 5px;
    animation: blink 0.8s infinite alternate;
  }

  /* Touch devices: swap hints & show mobile button */
  @media (pointer: coarse) {
    .desktop-warning { display: none; }
    .mobile-warning { display: block; }
    .mobile-transform-wrapper { display: flex; }
  }

  /* ── Responsive layout ─────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .container { max-width: 98vw; }
  }

  @media (max-width: 768px) {
    main {
      align-items: flex-start;
      padding: 0.75rem;
      padding-top: 80px;
      padding-bottom: 90px;
    }
    .manual-btn {
      font-size: 1rem;
      padding: 6px 10px;
      border-width: 3px;
      box-shadow: 3px 3px 0px black;
    }
    .cheats-trigger-btn {
      font-size: 1rem;
      padding: 8px 10px;
      border-width: 3px;
    }
    .womm-btn {
      font-size: 0.8rem;
      padding: 6px 10px;
      border-width: 3px;
    }
    /* override random inline position so picker is always reachable */
    .lang-picker {
      top: 5rem !important;
      left: 50% !important;
      transform: translateX(-50%) rotate(-2deg) !important;
    }
    .lang-picker select { max-width: 160px; }
    .container { padding: 0.75rem; border-radius: 0.5rem; }
    header h1 { font-size: 1.6rem; }
    .subtitle { font-size: 1rem; }
    .secret-warning { font-size: 0.75rem; padding: 0.4rem; }
    .toggle-container { margin-bottom: 1rem; }
    .cycle-btn { font-size: 1rem; padding: 0.7rem 1.2rem; }
    .mode-label { font-size: 0.95rem; }
    label { font-size: 1rem; }
    textarea { height: 100px; font-size: 1rem; }
    .output-pane { padding-bottom: 3.5rem; }
    .action-btn { font-size: 0.9rem; padding: 0.4rem 0.9rem; }
  }

  @media (max-width: 480px) {
    main {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 70px;
    }
    header h1 { font-size: 1.2rem; }
    .container { padding: 0.5rem; }
    textarea { height: 80px; }
  }
</style>
