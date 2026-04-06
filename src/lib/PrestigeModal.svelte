<script>
  export let visible = false;
  export let prestigeLevel = 1;

  function closePrestige() {
    visible = false;
  }

  function handleKeydown(e) {
    if (visible) {
      e.preventDefault();
      closePrestige();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="prestige-backdrop" on:click={closePrestige}>
    <div class="prestige-modal" on:click|stopPropagation>
      <h1>🌟 ASCENSION ACHIEVED 🌟</h1>
      <p class="subtitle">Upgrading account to PROFESSIONAL INTERNET USER™</p>
      
      <div class="prestige-info">
        You have collected all badges. There is nothing left for you...<br /><br />
        <strong>EXCEPT ENDLESS INFLATION!</strong><br /><br />
        Welcome to <strong>Prestige Level {prestigeLevel}</strong>!<br />
        Your previous badges mean nothing! Requirements multiplied! Names elongated!
      </div>
      
      <div class="prompt">Press ANY KEY to accept your new reality.</div>
    </div>
  </div>
{/if}

<style>
  .prestige-backdrop {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(255, 0, 255, 0.9);
    z-index: 3000;
    display: flex; justify-content: center; align-items: center;
    animation: flashBg 0.5s infinite alternate;
  }
  @keyframes flashBg {
    from { background: rgba(255, 0, 255, 0.9); }
    to { background: rgba(0, 255, 255, 0.9); }
  }

  .prestige-modal {
    background: #000;
    color: #0f0;
    padding: 3rem;
    border: 10px double yellow;
    text-align: center;
    max-width: 600px;
    box-shadow: 0 0 50px white;
    font-family: monospace;
    animation: zoomIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  @keyframes zoomIn {
    from { transform: scale(0); rotate: -10deg; }
    to { transform: scale(1); rotate: 0deg; }
  }

  h1 { font-family: 'Comic Sans MS', cursive; color: #ff00ff; text-shadow: 3px 3px 0 white; font-size: 2.5rem; margin-top: 0; }
  .subtitle { font-weight: bold; font-size: 1.2rem; color: yellow; margin-bottom: 2rem; }
  .prestige-info { font-size: 1.1rem; line-height: 1.5; margin-bottom: 2rem; border: 2px dashed lime; padding: 1rem; }
  .prompt { font-size: 1.5rem; color: #ff0; animation: blink 0.5s infinite alternate; font-weight: bold; }

  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0; }
  }
</style>