<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let pastedText = "";
  const dispatch = createEventDispatcher();

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div class="gandalf-overlay" transition:fade={{ duration: 300 }}>
  <div class="white-flash"></div>
  <div class="gandalf-container">
    <h1 class="gandalf-text">YOU SHALL NOT PASTE!</h1>
    <div class="gandalf-image">🧙‍♂️</div>
    <p class="apologize-text">Hit [ ESC ] to apologize.</p>
  </div>
  
  <div class="balrog-pit">
    <span class="fire-emoji">🔥</span>
    <span class="fire-emoji">🔥</span>
    <span class="fire-emoji">🔥</span>
    <span class="fire-emoji">🔥</span>
    <span class="fire-emoji">🔥</span>
  </div>
  
  <div class="falling-text">
    {pastedText || "[ EMPTY REGRET ]"}
  </div>
</div>

<style>
  .gandalf-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 0, 0, 0.95);
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: 'Comic Sans MS', Impact, sans-serif;
  }

  .white-flash {
    position: absolute;
    inset: 0;
    background: white;
    z-index: 100000;
    pointer-events: none;
    animation: flash 1.5s cubic-bezier(0.1, 0.8, 0.1, 1) forwards;
  }

  @keyframes flash {
    0% { opacity: 1; }
    50% { opacity: 0.8; }
    100% { opacity: 0; display: none; }
  }

  .gandalf-container {
    z-index: 99999;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    animation: zoomIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes zoomIn {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  .gandalf-text {
    font-size: clamp(3rem, 8vw, 6rem);
    color: #ff3333;
    text-transform: uppercase;
    font-family: 'Impact', sans-serif;
    text-shadow: 0 5px 20px #ff0000, 0 -5px 20px #ff0000;
    margin: 0;
    animation: shakeText 0.1s infinite;
  }

  @keyframes shakeText {
    0% { transform: translate(2px, 1px) rotate(0deg); }
    50% { transform: translate(-1px, -2px) rotate(-2deg); }
    100% { transform: translate(-3px, 0px) rotate(1deg); }
  }

  .gandalf-image {
    font-size: clamp(6rem, 15vw, 12rem);
    line-height: 1;
    filter: drop-shadow(0 0 30px white);
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  .apologize-text {
    color: #ffd700;
    font-family: monospace;
    font-size: clamp(1rem, 4vw, 2rem);
    margin-top: 2rem;
    padding: 10px 20px;
    border: 3px dashed #ffd700;
    background: rgba(0,0,0,0.5);
    animation: blink 1s infinite step-end;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; border-color: #ffd700; color: #ffd700; }
    50% { opacity: 0.2; border-color: #ff0000; color: #ff0000; }
  }

  .balrog-pit {
    position: absolute;
    bottom: -5vh;
    left: 0;
    right: 0;
    height: 25vh;
    background: linear-gradient(to top, #ff0000, #ff7700 40%, transparent);
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    font-size: clamp(3rem, 10vw, 8rem);
    border-top: 10px solid #ff4400;
    box-shadow: 0 -20px 100px 20px rgba(255, 0, 0, 0.8);
    pointer-events: none;
    z-index: 99998;
    padding-top: 20px;
  }

  .fire-emoji {
    animation: flicker 0.2s infinite alternate;
  }
  .fire-emoji:nth-child(even) {
    animation-delay: 0.1s;
    animation-duration: 0.3s;
  }

  @keyframes flicker {
    0% { transform: scale(1) translateY(0) rotate(-5deg); opacity: 0.8; }
    100% { transform: scale(1.2) translateY(-10px) rotate(5deg); opacity: 1; }
  }

  .falling-text {
    position: absolute;
    top: -20vh;
    color: white;
    font-size: clamp(1rem, 3vw, 2rem);
    background: repeating-linear-gradient(45deg, #222, #222 10px, #444 10px, #444 20px);
    padding: 20px;
    border: 5px solid #666;
    border-radius: 10px;
    max-width: 80%;
    word-break: break-all;
    box-shadow: inset 0 0 20px black, 0 0 20px rgba(255,255,255,0.5);
    /* Animation drops it all the way down into the pit */
    animation: fallIntoPit 4s cubic-bezier(0.5, 0, 1, 1) forwards;
    z-index: 99997; /* Behind Gandalf, in front of pit */
  }

  @keyframes fallIntoPit {
    0% { 
      top: -20vh; 
      transform: rotate(0deg) scale(1.5); 
    }
    20% { 
      top: 10vh; 
      transform: rotate(-10deg) scale(1.2); 
    }
    60% { 
      top: 50vh; 
      transform: rotate(45deg) scale(0.8); 
      opacity: 1;
    }
    90% { 
      top: 110vh; 
      transform: rotate(180deg) scale(0.3); 
      opacity: 1;
    }
    100% { 
      top: 120vh; 
      transform: rotate(360deg) scale(0); 
      opacity: 0;
    }
  }
</style>
