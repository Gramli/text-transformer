<script>
  import { badges, inflateBadge } from './badgeData.js';
  export let visible = false;
  export let earnedBadgeIds = [];
  export let prestigeLevel = 0;
  function close() { visible = false; }
  
  $: inflatedBadges = badges.map(b => inflateBadge(b, prestigeLevel));
</script>

{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-backdrop" on:click={close}>
    <div class="modal" on:click|stopPropagation>
      <button class="close-btn" on:click={close}>X</button>
      <h2>🦄 Definitely Not Dev Badges™
        {#if prestigeLevel > 0}
          <span class="prestige-title"><br />[ PRESTIGE {prestigeLevel} ]</span>
        {/if}
      </h2>
      <p class="subtitle">Collect digital stickers to fill the void in your soul! Just like other sites.</p>
      
      <div class="stats-overview">
        <strong>Total Badges: {earnedBadgeIds.length} / {badges.length}</strong>
      </div>
      
      <div class="badges-grid">
        {#each inflatedBadges as badge}
          <div class="badge-card {earnedBadgeIds.includes(badge.id) ? 'earned' : 'locked'} rarity-{badge.rarity.toLowerCase()}">
            <div class="rarity-label">{badge.rarity}</div>
            <div class="badge-icon">{badge.icon}</div>
            <div class="badge-info">
              <h4>{badge.name}</h4>
              <p>{badge.desc}</p>
              <small>Requires: {badge.limit} {badge.type}s</small>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .prestige-title { color: yellow; text-shadow: 2px 2px red; font-size: 1.5rem; animation: pulse 1s infinite alternate; }
  @keyframes pulse { from { opacity: 0.8; } to { opacity: 1; text-shadow: 2px 2px white; } }

  .modal-backdrop {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.8); z-index: 2000;
    display: flex; justify-content: center; align-items: center;
  }
  .modal {
    background: #fff; width: 90%; max-width: 800px; max-height: 90vh;
    overflow-y: auto; padding: 2rem; border: 8px solid black;
    border-radius: 1rem; box-shadow: 10px 10px 0px #00ffff; position: relative;
  }
  .close-btn {
    position: absolute; top: 10px; right: 10px; font-size: 1.5rem;
    background: red; color: white; border: 3px solid black;
    cursor: pointer; font-weight: bold; width: 40px; height: 40px; border-radius: 50%;
  }
  .close-btn:hover { background: darkred; transform: scale(1.1); }
  h2 { margin-top: 0; font-family: 'Comic Sans MS', cursive; color: #ff00ff; text-transform: uppercase; text-shadow: 2px 2px 0px black; }
  .subtitle { font-weight: bold; margin-bottom: 1rem; color: #444; }
  .stats-overview { margin-bottom: 2rem; border-bottom: 3px dashed #ccc; padding-bottom: 1rem; font-size: 1.2rem; }
  
  .badges-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1.5rem;
  }
  .badge-card {
    border: 3px solid black; border-radius: 8px; padding: 1rem;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    gap: 0.5rem; transition: transform 0.2s; position: relative; overflow: hidden;
  }
  .badge-card:hover { transform: translateY(-5px); box-shadow: 0 5px 0px black; }
  .badge-card.earned { background: #e0ffe0; border-color: #00aa00; }
  .badge-card.locked { background: #eee; opacity: 0.6; filter: grayscale(100%); }

  .rarity-label {
    position: absolute; top: 5px; right: -25px; transform: rotate(45deg);
    background: #444; color: white; font-size: 0.7rem; font-weight: bold;
    padding: 2px 20px; text-transform: uppercase; font-family: monospace;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
  .badge-card.rarity-common .rarity-label { background: #888; }
  .badge-card.rarity-rare .rarity-label { background: #00aaff; }
  .badge-card.rarity-legendary .rarity-label { background: #ffaa00; color: black; }
  .badge-card.rarity-existential .rarity-label { background: #ff00ff; color: yellow; animation: strobe 0.5s infinite; }

  @keyframes strobe {
    50% { background: yellow; color: #ff00ff; }
  }
  
  .badge-icon { font-size: 3.5rem; display: flex; justify-content: center; align-items: center; height: 80px; margin-top: 10px; }
  .badge-info h4 { margin: 0; color: #333; font-family: monospace; font-size: 1.1rem; }
  .badge-info p { margin: 0.5rem 0; font-size: 0.9rem; }
  .badge-info small { color: #888; font-weight: bold; font-size: 0.8rem; }
</style>