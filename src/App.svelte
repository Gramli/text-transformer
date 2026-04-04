<script>
  import { onMount } from "svelte";
  import { modes } from "./lib/transformers.js";
  import { scams } from "./lib/scamData.js";
  import { initSpeechRecognition, initVoices, toggleListening, speakText, stopSpeaking } from "./lib/speechService.js";
  import {
    SHAKE_THRESHOLD, SHAKE_COOLDOWN_MS, SHAKING_DURATION_MS,
    PREMIUM_DELAY_MIN_MS, PREMIUM_DELAY_MAX_MS,
    SCAM_INTERVAL_MIN_MS, SCAM_INTERVAL_RANGE_MS, BG_CYCLE_MS,
  } from "./lib/config.js";
  import ManualModal from "./lib/ManualModal.svelte";
  import ScamModal from "./lib/ScamModal.svelte";
  import PremiumModal from "./lib/PremiumModal.svelte";
  import BSODModal from "./lib/BSODModal.svelte";
  import AbsurdTimeBadge from "./lib/AbsurdTimeBadge.svelte";
  import CheatsModal from "./lib/CheatsModal.svelte";
  import EvilClippy from "./lib/EvilClippy.svelte";
  import CursorTrails from "./lib/CursorTrails.svelte";
  import GandalfBlocker from "./lib/GandalfBlocker.svelte";

  // ── State ──────────────────────────────────────────────
  let inputText = "";
  let transformedText = "";
  let curModeIdx = 0;
  let bgIndex = 0;

  let copied = false;
  let isTransforming = false;
  let isListening = false;
  let isPlaying = false;

  let showPremiumModal = false;
  let showScamModal = false;
  let showManual = false;
  let showCheats = false;
  let showBSOD = false;
  let showGandalf = false;

  let currentScam = null;
  let pastedTextGandalf = "";
  let comboPos = { top: 50, left: 50 };

  // ── Derived ────────────────────────────────────────────
  $: modeInfo = modes[curModeIdx];
  $: mode = modeInfo.id;
  $: currentBg = modeInfo.bgColors ? modeInfo.bgColors[bgIndex] : modeInfo.bgColor;

  // ── Core actions ───────────────────────────────────────
  function triggerShaking() {
    isTransforming = true;
    setTimeout(() => (isTransforming = false), SHAKING_DURATION_MS);
  }

  function handleTransform() {
    transformedText = modeInfo.transform(inputText);
  }

  function transformWithShake() {
    triggerShaking();
    handleTransform();
  }

  // ── Input handlers ─────────────────────────────────────
  function handleKeydown(event) {
    if (event.key === "ScrollLock" || event.key === "Insert") {
      event.preventDefault();
      transformWithShake();
    } else if (event.key === "Pause") {
      event.preventDefault();
      isListening = toggleListening(isListening);
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const clipData = event.clipboardData || window.clipboardData;
    const text = clipData ? clipData.getData('text') : "";
    pastedTextGandalf = text || "[ REDACTED CHAOS ]";
    showGandalf = true;
  }

  function cycleMode() {
    let newIdx;
    do {
      newIdx = Math.floor(Math.random() * modes.length);
    } while (newIdx === curModeIdx);
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

  // ── Setup helpers (each returns its own cleanup) ───────
  function pickRandomEdgeZone() {
    const zones = [
      { top: 10 + Math.random() * 15, left: 5 + Math.random() * 20 },
      { top: 10 + Math.random() * 15, left: 70 + Math.random() * 20 },
      { top: 75 + Math.random() * 15, left: 5 + Math.random() * 20 },
      { top: 75 + Math.random() * 15, left: 70 + Math.random() * 20 },
    ];
    return zones[Math.floor(Math.random() * zones.length)];
  }

  function setupShakeDetection() {
    let lastShake = 0;
    const onMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const mag = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
      if (mag > SHAKE_THRESHOLD && Date.now() - lastShake > SHAKE_COOLDOWN_MS) {
        lastShake = Date.now();
        transformWithShake();
      }
    };
    const supported =
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission !== "function";
    if (supported) window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }

  function setupScheduledPopups() {
    const premiumDelay =
      PREMIUM_DELAY_MIN_MS +
      Math.floor(Math.random() * (PREMIUM_DELAY_MAX_MS - PREMIUM_DELAY_MIN_MS + 1));
    const premiumTimeout = setTimeout(() => { showPremiumModal = true; }, premiumDelay);

    const scamDelay = SCAM_INTERVAL_MIN_MS + Math.floor(Math.random() * SCAM_INTERVAL_RANGE_MS);
    const scamInterval = setInterval(() => {
      if (!showPremiumModal) {
        currentScam = scams[Math.floor(Math.random() * scams.length)];
        showScamModal = true;
      }
    }, scamDelay);

    return () => {
      clearTimeout(premiumTimeout);
      clearInterval(scamInterval);
    };
  }

  function setupBgCycling() {
    const interval = setInterval(() => {
      if (modeInfo.bgColors) {
        bgIndex = (bgIndex + 1) % modeInfo.bgColors.length;
      }
    }, BG_CYCLE_MS);
    return () => clearInterval(interval);
  }

  // ── Lifecycle ──────────────────────────────────────────
  onMount(() => {
    initSpeechRecognition(
      (transcript) => {
        inputText = (inputText + " " + transcript).trim();
        handleTransform();
      },
      () => { isListening = false; }
    );
    initVoices();

    comboPos = pickRandomEdgeZone();

    const cleanups = [
      setupShakeDetection(),
      setupScheduledPopups(),
      setupBgCycling(),
    ];
    return () => cleanups.forEach((fn) => fn());
  });
</script>

<svelte:window on:keydown={handleKeydown} on:paste={handlePaste} />

<svelte:head>
  <title>The Absurd Text Transformer 🦄</title>
</svelte:head>

{#if showGandalf}
  <GandalfBlocker pastedText={pastedTextGandalf} on:close={() => showGandalf = false} />
{/if}

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
    <button class="womm-btn" on:click={() => showBSOD = true}>Works on My Machine</button>
  </div>

  <BSODModal visible={showBSOD} on:close={() => showBSOD = false} />

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
        <button class="mobile-transform-btn" on:click={transformWithShake}>
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
  /* ── Reset & layout ──────────────────────────────────────────── */
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  }
  main { display: flex; justify-content: center; align-items: center; padding: 2rem; box-sizing: border-box; }
  
  /* ── Animations ────────────────────────────────────────────── */
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

  /* ── Fixed UI elements ─────────────────────────────────────── */
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

  /* ── Container & content ──────────────────────────────────── */
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

  /* ── Header, toggle & IO ─────────────────────────────────── */
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
