<script>
  import { createEventDispatcher } from 'svelte';
  import { developerExcuses } from './scamData.js';

  const dispatch = createEventDispatcher();

  export let visible = false;

  let excuse = "";

  $: if (visible) {
    excuse = developerExcuses[Math.floor(Math.random() * developerExcuses.length)];
  }

  function dismiss() {
    dispatch('close');
  }
</script>

{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="freeze-overlay" on:click={dismiss}>
    <div class="bsod-content">
      <div class="bsod-title-wrapper">
        <span class="bsod-title">A fatal exception 0E has occurred at 0xDEADBEEF in 0x00000000.</span>
      </div>
      <div class="bsod-excuse">*** {excuse}</div>
      <div class="bsod-instructions">
        * Press any key to terminate the current application.<br>
        * Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.
      </div>
      <div class="bsod-prompt">Press any key to continue _</div>
    </div>
  </div>
{/if}

<style>
  .freeze-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #0000aa;
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: crosshair;
  }
  .bsod-content {
    color: #fff;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.2rem;
    pointer-events: none;
    user-select: none;
    text-align: left;
    max-width: 600px;
    width: 90%;
  }
  .bsod-title-wrapper {
    text-align: center;
    margin-bottom: 30px;
  }
  .bsod-title {
    background: #fff;
    color: #0000aa;
    padding: 0 10px;
    font-weight: bold;
  }
  .bsod-excuse {
    margin-bottom: 30px;
    font-weight: bold;
    color: #fff;
  }
  .bsod-instructions {
    margin-bottom: 30px;
    line-height: 1.6;
  }
  .bsod-prompt {
    text-align: center;
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
</style>
