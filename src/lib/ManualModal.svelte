<script>
  export let visible = false;
</script>

{#if visible}
  <div class="manual-modal-overlay">
    <div class="manual-modal">
      <h2>📖 Very Official Manual 📖</h2>
      <ul>
        <li>1. Type words in the top box. <i>Do not try to make sense of them.</i></li>
        <li>2. Press <b>Scroll Lock</b> or <b>Insert</b> to transform. Yes, your Enter/Space keys are useless.</li>
        <li>3. Press <b>Pause</b> to shout at your computer (assuming it even listens).</li>
        <li>4. Click <b>Switch Mode</b> to jump to a <i>completely random</i> language. No order. No reason.</li>
        <li>5. Use the <b>floating dropdown</b> (somewhere on screen) to pick a specific language like a responsible adult.</li>
        <li>6. Pay $499 for premium tokens if prompted. We accept floppy disks only.</li>
        <li>7. Click <b>Works on My Machine</b> for full technical support.</li>
      </ul>
      <button class="manual-close-btn" on:click={() => visible = false}>GTFO</button>
    </div>
  </div>
{/if}

<style>
  .manual-modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(255, 0, 255, 0.4);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  }
  .manual-modal {
    position: relative;
    background: #00ffff;
    padding: 2rem 3rem 4rem 3rem;
    border: 8px solid #ff0000;
    border-radius: 30px;
    box-shadow: 10px 10px 0px #000;
    max-width: 600px;
    font-family: 'Comic Sans MS', cursive;
    color: #000;
    transform: rotate(2deg);
    overflow: visible;
  }
  .manual-modal h2 {
    font-size: 2.5rem;
    text-align: center;
    text-decoration: underline wavy red;
    margin-top: 0;
  }
  .manual-modal ul {
    font-size: 1.3rem;
    line-height: 1.5;
    list-style-type: '👉 ';
  }
  .manual-close-btn {
    position: absolute;
    bottom: -20px;
    left: -20px;
    background: #ff0000;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    border: 4px solid black;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    cursor: pointer;
    box-shadow: -5px 5px 0px yellow;
    transform: rotate(-15deg);
    transition: transform 0.1s;
  }
  .manual-close-btn:hover {
    transform: rotate(-25deg) scale(1.2);
    background: black;
    color: red;
    border-color: red;
  }
</style>
