<script>
  export let visible = false;
</script>

{#if visible}
  <div class="manual-modal-overlay">
    <div class="manual-modal">
      <div class="manual-content">
        <h2>📖 Very Official Manual 📖</h2>
        <ul>
          <li>1. Type words in the top box. <i>Do not try to make sense of them.</i></li>
          <li>2. <b>Desktop:</b> Press <b>Scroll Lock</b> or <b>Insert</b> to transform. Yes, Enter/Space are useless. <b>Mobile/tablet:</b> Smash the big rainbow button — or <b>shake your phone</b> like a maniac.</li>
          <li>3. <b>Desktop:</b> Press <b>Pause</b> to shout at your computer (assuming it even listens). <b>Mobile:</b> idk, scream louder?</li>
          <li>4. Click <b>Switch Mode</b> to jump to a <i>completely random</i> language. No order. No reason.</li>
          <li>5. Use the <b>floating dropdown</b> (somewhere on screen) to pick a specific language like a responsible adult.</li>
          <li>6. Pay $499 for premium tokens if prompted. We accept floppy disks only.</li>
          <li>7. Click <b>Works on My Machine</b> for full technical support.</li>
        </ul>
      </div>
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
    padding: 1rem;
    box-sizing: border-box;
  }
  .manual-modal {
    position: relative;
    background: #00ffff;
    padding: 2rem 1.5rem 4rem 1.5rem;
    border: 8px solid #ff0000;
    border-radius: 30px;
    box-shadow: 10px 10px 0px #000;
    max-width: 600px;
    width: 100%;
    max-height: 95vh;
    font-family: 'Comic Sans MS', cursive;
    color: #000;
    transform: rotate(2deg);
    overflow: visible;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .manual-content {
    overflow-y: auto;
    padding: 0 1.5rem;
    /* Optional chunky scrollbar style for vibe */
    scrollbar-width: auto;
    scrollbar-color: #ff0000 #00ffff;
  }
  .manual-content::-webkit-scrollbar {
    width: 12px;
  }
  .manual-content::-webkit-scrollbar-track {
    background: #00ffff;
    border-left: 2px solid #ff0000;
  }
  .manual-content::-webkit-scrollbar-thumb {
    background: #ff0000;
    border: 2px solid #00ffff;
    border-radius: 10px;
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

  @media (max-width: 768px) {
    .manual-modal {
      padding: 1rem 0.5rem 3.5rem 0.5rem;
      border-radius: 15px;
      border-width: 5px;
      box-shadow: 5px 5px 0px #000;
      transform: rotate(1deg);
      max-height: 90vh;
    }
    .manual-content {
      padding: 0 1rem;
    }
    .manual-modal h2 {
      font-size: 1.4rem;
    }
    .manual-modal ul {
      font-size: 0.95rem;
      padding-left: 1.2rem;
      line-height: 1.4;
    }
    .manual-close-btn {
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%) rotate(-5deg);
      width: 70px;
      height: 70px;
      font-size: 1.2rem;
    }
    .manual-close-btn:hover {
      transform: translateX(-50%) rotate(-15deg) scale(1.1);
    }
  }

  @media (max-width: 480px) {
    .manual-modal {
      padding: 0.75rem 0.25rem 3rem 0.25rem;
      border-radius: 10px;
    }
    .manual-content {
      padding: 0 0.5rem;
    }
    .manual-modal h2 {
      font-size: 1.1rem;
    }
    .manual-modal ul {
      font-size: 0.82rem;
    }
  }
</style>
