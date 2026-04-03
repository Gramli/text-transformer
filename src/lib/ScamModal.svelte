<script>
  export let scam = null;
  export let visible = false;

  function close() {
    visible = false;
  }
</script>

{#if visible && scam}
  <div class="scam-modal-container">
    <div class="scam-modal-window">
      <div class="scam-modal-titlebar">
        <span>Internet Explorer - ALERT</span>
        <button on:click={close} class="scam-close-btn">X</button>
      </div>
      <div class="scam-modal-content">
        <h3 class="blink-text">{scam.title}</h3>
        <p>{scam.body}</p>
        <button class="scam-action-btn" on:click={close}>{scam.button}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .scam-modal-container {
    position: fixed;
    top: 20%; left: 30%;
    z-index: 9999;
    box-shadow: inset -2px -2px #0a0a0a, inset 2px 2px #fff, inset -3px -3px #dfdfdf, inset 3px 3px #dfdfdf;
    background: #c0c0c0;
    min-width: 350px;
    max-width: 450px;
    font-family: 'Pixelated MS Sans Serif', Tahoma, sans-serif;
  }
  .scam-modal-window { padding: 3px; }
  .scam-modal-titlebar {
    background: #000080;
    color: white;
    padding: 3px 5px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .scam-close-btn {
    background: #c0c0c0;
    border: 2px outset #eee;
    font-weight: bold;
    cursor: pointer;
    box-shadow: inset -1px -1px #0a0a0a;
  }
  .scam-close-btn:active { box-shadow: inset 1px 1px #0a0a0a; border: 2px inset #eee; }
  .scam-modal-content {
    padding: 20px;
    text-align: center;
    background: white;
    border: 2px inset #dfdfdf;
    margin-top: 2px;
  }
  .scam-action-btn {
    background: #ff0000;
    color: yellow;
    font-weight: bold;
    border: 3px outset red;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1.2rem;
    animation: flash 0.3s infinite alternate;
  }
  .blink-text { color: red; animation: flash 0.2s infinite alternate; font-size: 1.5rem; text-decoration: underline; }

  @keyframes flash {
    from { border-color: red; box-shadow: 0 0 50px red; }
    to { border-color: yellow; box-shadow: 0 0 100px yellow; }
  }
</style>
