<script>
  export let visible = false;
</script>

{#if visible}
  <div class="premium-modal-overlay">
    <div class="premium-modal">
      <h2>❌ OUT OF PREMIUM TOKENS ❌</h2>
      <p>You have consumed all your daily allocated absurdity tokens required for this useless application.</p>
      <p>Please insert $499 into your floppy disk drive or press <strong>F5</strong> to instantly refill your tokens!</p>
      <div class="spinner">🪙</div>
    </div>
  </div>
{/if}

<style>
  .premium-modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
  }
  .premium-modal {
    background: #222;
    padding: 3rem;
    border: 5px solid red;
    text-align: center;
    box-shadow: 0 0 50px red;
    border-radius: 15px;
    animation: flash 0.5s infinite alternate;
  }
  .premium-modal h2 { font-size: 3rem; margin-top: 0; }
  .premium-modal p { font-size: 1.5rem; color: white; }

  @keyframes flash {
    from { border-color: red; box-shadow: 0 0 50px red; }
    to { border-color: yellow; box-shadow: 0 0 100px yellow; }
  }
  .spinner {
    font-size: 5rem;
    animation: spin 2s linear infinite;
    display: inline-block;
    margin-top: 2rem;
  }
  @keyframes spin { 100% { transform: rotate(360deg); } }
</style>
