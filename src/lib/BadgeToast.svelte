<script>
  export let badge = null;
</script>

{#if badge}
  <div class="badge-toast rarity-{badge.rarity.toLowerCase()}">
    <div class="toast-content">
      <div class="badge-icon">{badge.icon}</div>
      <div class="badge-text">
        <strong>🏆 {badge.rarity.toUpperCase()} ACH1EVEMENT!</strong><br />
        <span class="badge-name">{badge.name}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .badge-toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #000;
    color: #fff;
    border: 4px solid #fff;
    box-shadow: 8px 8px 0px #ff00ff;
    padding: 15px;
    z-index: 9999;
    font-family: monospace;
    animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  /* Rarity box shadows! */
  .badge-toast.rarity-common { box-shadow: 8px 8px 0px #888888; border-color: #888888; }
  .badge-toast.rarity-rare { box-shadow: 8px 8px 0px #00aaff; border-color: #00aaff; }
  .badge-toast.rarity-legendary { box-shadow: 8px 8px 0px #ffaa00; border-color: #ffaa00; }
  .badge-toast.rarity-existential { box-shadow: 8px 8px 0px #ff00ff; border-color: #ff00ff; animation: existential-pulse 1s infinite alternate, slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  
  .toast-content { display: flex; align-items: center; gap: 15px; }
  .badge-icon { font-size: 3rem; }
  .badge-text strong { color: #0f0; }
  .badge-name { font-size: 1.2rem; color: #ff0; }
  
  @keyframes slideIn {
    from { transform: translateX(120%); }
    to { transform: translateX(0); }
  }
  @keyframes existential-pulse {
    from { box-shadow: 8px 8px 0px #ff00ff; }
    to { box-shadow: 12px 12px 0px #ff0000; border-color: #ff0000; color: #ffff00; }
  }
</style>