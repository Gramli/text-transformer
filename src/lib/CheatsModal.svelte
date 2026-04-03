<script>
  export let visible = false;
</script>

{#if visible}
  <div class="cheats-overlay">
    <div class="cheats-modal">
      <h2>🎮 SEKRIT CHEETZ O_o 🎮</h2>
      <div class="cheats-list">
        <p><b>↑ ↑ ↓ ↓ ← → ← → B A</b> - 30 Lives (Contra)</p>
        <p><b>IDDQD</b> - Degreelessness Mode (Doom)</p>
        <p><b>IDKFA</b> - Very Happy Ammo (Doom)</p>
        <p><b>DNKROZ</b> - God Mode & Jetpack (Duke Nukem 3D)</p>
        <p><b>ROSEBUD</b> - 1,000 Simoleons (The Sims)</p>
        <p><b>PORNTIPSGUZZARDO</b> - $500k & All Tech (SimCity 2000)</p>
        <p><b>HESOYAM</b> - Health, Armor, $250k (GTA SA)</p>
        <p><b>PANZER</b> - Spawn Rhino Tank (GTA Vice City)</p>
        <p><b>HOW DO YOU TURN THIS ON</b> - Cobra Car (AoE2)</p>
        <p><b>PEPPERONI PIZZA</b> - 1000 Food (AoE1)</p>
        <p><b>POWER OVERWHELMING</b> - God Mode (StarCraft)</p>
        <p><b>SHOW ME THE MONEY</b> - 10k Minerals & Gas (StarCraft)</p>
        <p><b>GREEDISGOOD</b> - 500 Gold & Wood (Warcraft 3)</p>
        <p><b>JUSTIN BAILEY</b> - Swimsuit + Armor (Metroid)</p>
        <p><b>A B A C A B B</b> - Blood Code (Mortal Kombat)</p>
        <p><b>IMPULSE 9</b> - All Weapons (Quake)</p>
        <p><b>NOCLIP</b> - Walk Through Walls (Half-Life / Quake)</p>
        <p><b>BEWAREOBLIVIONISATHAND</b> - Super Cheat Menu (Turok 2)</p>
      </div>
      <button class="cheats-close-btn" on:click={() => visible = false}>NOOB M0D3 ON</button>
    </div>
  </div>
{/if}

<style>
  .cheats-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 50, 0, 0.8);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px);
  }
  .cheats-modal {
    background: #000;
    color: #0f0;
    padding: 2rem;
    border: 8px ridge #555;
    border-radius: 10px;
    box-shadow: 0 0 40px #0f0, inset 0 0 20px #0f0;
    font-family: 'Courier New', Courier, monospace;
    width: 90%;
    max-width: 550px;
    text-align: left;
    transform: perspective(600px) rotateX(5deg);
  }
  .cheats-modal h2 {
    color: #ff0;
    text-align: center;
    text-shadow: 3px 3px #f00;
    font-size: 2.3rem;
    margin-top: 0;
    animation: hack-blink 2s steps(2, start) infinite;
    letter-spacing: 2px;
  }
  .cheats-list {
    max-height: 40vh;
    overflow-y: auto;
    padding-right: 15px;
    scrollbar-width: thin;
    scrollbar-color: #0f0 #000;
  }
  .cheats-list p {
    border-bottom: 2px dotted #0a0;
    padding-bottom: 0.8rem;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    line-height: 1.4;
  }
  .cheats-list b { 
    color: #f0f;
    background: rgba(255, 0, 255, 0.2);
    padding: 0 5px;
    border-radius: 3px;
  }
  .cheats-close-btn {
    display: block;
    width: 100%;
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f00;
    color: #ff0;
    font-family: 'Impact', sans-serif;
    font-size: 1.8rem;
    border: 4px solid #ff0;
    cursor: pointer;
    box-shadow: 0 5px 0 #800;
    transition: all 0.1s;
  }
  .cheats-close-btn:hover { 
    background: #ff0; 
    color: #f00; 
    border-color: #f00; 
    box-shadow: 0 2px 0 #800;
    transform: translateY(3px);
  }
  @keyframes hack-blink { 50% { opacity: 0.7; color: #fff; } }
</style>
