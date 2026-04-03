<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let visible = true;
  
  let top = 50;
  let left = 50;
  let currentMessage = "It looks like you're trying to write coherent text. Would you like me to completely ruin it?";
  
  const messages = [
    "It looks like you're typing. Let me fix your spelling into Brainrot.",
    "Did you know? Clicking random buttons won't make you a better programmer.",
    "Have you considered using Internet Explorer 6 for this page?",
    "I'm not saying your vocabulary is bad, but even I wouldn't autocorrect that.",
    "Ooh, let me add some blinking text for you!",
    "Are you sure you don't want a <marquee> tag here?",
    "Error 404: Good ideas not found. Showing bad ones instead.",
    "It looks like you're writing code. Want me to delete it?",
    "Have you tried turning it off and leaving it off?",
    "I see you're not using table layouts. Big mistake.",
    "Updating your system... Please do not unplug your computer for 14 hours.",
    "Your password expires in 2 minutes. Better start panicking.",
    "Hey, wake up! It's time to randomly shake the screen!",
    "Did you save? Because I definitely didn't.",
    "I'm indexing your personal files so I can judge your music taste.",
    "You look like you need a 10th browser toolbar installed.",
    "To continue using this app, please insert Installation Disc 2.",
    "Looks like you're trying to ignore me. That only makes me stronger."
  ];

  let jumpInterval;
  let messageInterval;

  onMount(() => {
    jumpInterval = setInterval(() => {
      top = Math.random() * 80 + 10;
      left = Math.random() * 80 + 10;
    }, 5000 + Math.random() * 5000);

    messageInterval = setInterval(() => {
      currentMessage = messages[Math.floor(Math.random() * messages.length)];
    }, 8000);
  });

  onDestroy(() => {
    clearInterval(jumpInterval);
    clearInterval(messageInterval);
  });
  
  function dismiss() {
    visible = false;
    // He always comes back
    setTimeout(() => {
      visible = true;
      currentMessage = "You can't get rid of me that easily!";
      top = Math.random() * 80 + 10;
      left = Math.random() * 80 + 10;
    }, 15000);
  }
</script>

{#if visible}
  <div class="clippy-container" style="top: {top}%; left: {left}%;">
    <div class="speech-bubble">
      {currentMessage}
    </div>
    <!-- A very terrible representation of clippy -->
    <div class="clippy-body" on:click={dismiss}>
      📎
      <div class="eyes">👀</div>
    </div>
  </div>
{/if}

<style>
  .clippy-container {
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: all 0.5s ease-in-out;
    filter: drop-shadow(5px 5px 0px rgba(0,0,0,0.5));
    animation: float 3s infinite ease-in-out;
  }

  .speech-bubble {
    background-color: #ffffe1;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
    font-size: 14px;
    color: black;
    max-width: 200px;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 15px;
    box-shadow: 3px 3px 0px black;
  }

  .speech-bubble::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
  
  .speech-bubble::before {
    content: '';
    position: absolute;
    top: calc(100% - 3px);
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: #ffffe1 transparent transparent transparent;
    z-index: 1;
  }

  .clippy-body {
    font-size: 80px;
    position: relative;
    cursor: pointer;
  }

  .eyes {
    position: absolute;
    top: 25px;
    left: 15px;
    font-size: 30px;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translate(-50%, calc(-50% - 10px)); }
    50% { transform: translate(-50%, calc(-50% + 10px)); }
  }
</style>