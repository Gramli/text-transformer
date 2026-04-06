<script>
  import { getRandomFormattedText } from "./socialTemplates.js";
  import { copyToClipboard } from "./clipboard.js";

  export let transformedText = "";

  let specialCopyState = "";

  const formats = [
    { type: "devto",     cls: "devto",     label: "👨‍💻 dev.to Quick Post",   copiedLabel: "COPIED 🚀" },
    { type: "linkedin",  cls: "linkedin",  label: "💼 LinkedIn Post",        copiedLabel: "SYNERGIZED 💼" },
    { type: "teams",     cls: "teams",     label: "🤝 Teams Message",        copiedLabel: "CIRCLED BACK 🤝" },
    { type: "recruiter", cls: "recruiter", label: "🏃 Respond to Recruiter", copiedLabel: "DECLINED 🏃" },
  ];

  function copyFormat(type) {
    if (!transformedText) return;
    const result = getRandomFormattedText(type, transformedText);
    copyToClipboard(
      result,
      () => { specialCopyState = type; },
      () => { specialCopyState = ""; }
    );
  }
</script>

<div class="formatting-section">
  <h3>✨ SPREAD THE CHAOS ✨</h3>
  <div class="format-buttons">
    {#each formats as fmt}
      <button
        class="fmt-btn {fmt.cls}"
        disabled={!transformedText}
        on:click={() => copyFormat(fmt.type)}
      >
        {specialCopyState === fmt.type ? fmt.copiedLabel : fmt.label}
      </button>
    {/each}
  </div>
</div>

<style>
  .formatting-section {
    margin-top: 1rem;
    text-align: center;
    border: 3px double #00ffff;
    padding: 1rem;
    background: rgba(255,192,203,0.5);
    border-radius: 10px;
  }
  .formatting-section h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    color: #ff00ff;
    text-shadow: 1px 1px 0px black;
    transform: rotate(-1deg);
  }
  .format-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
    align-items: center;
  }
  .fmt-btn {
    flex: 1;
    min-width: 200px;
    padding: 0.8rem;
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 900;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    border: 4px solid black;
    box-shadow: 4px 4px 0 black;
  }
  .fmt-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 black;
  }
  .fmt-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  .fmt-btn.devto { background: #000000; color: #ffffff; border-color: #00ff00; }
  .fmt-btn.linkedin { background: #0077b5; color: #ffffff; border-color: #ffff00; }
  .fmt-btn.teams { background: #6264a7; color: #ffffff; border-color: #ff00ff; }
  .fmt-btn.recruiter { background: #ff4500; color: #ffffff; border-color: #00ffff; }
  .fmt-btn:hover:not(:disabled) {
    transform: rotate(2deg) scale(1.05);
  }

  @media (max-width: 768px) {
    .formatting-section { padding: 0.5rem; margin-top: 0.5rem; }
    .formatting-section h3 { font-size: 1.2rem; }
    .fmt-btn { width: 90%; min-width: auto; padding: 0.6rem; font-size: 1rem; border-width: 3px; box-shadow: 3px 3px 0 black; }
  }
</style>
