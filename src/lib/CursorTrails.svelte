<script>
  import { onMount, onDestroy } from 'svelte';

  let trails = [];
  const maxTrails = 15;
  
  // Retro 90s cursors (sparkles, stars, hourglass)
  const cursorChars = ['✨', '⭐', '💫', '⏳', '💻', '💾'];
  let currentCursor = '✨';

  function onMouseMove(e) {
    const fresh_trail = {
      id: Math.random().toString(36).substr(2, 9),
      x: e.clientX,
      y: e.clientY,
      char: currentCursor,
      opacity: 1,
      scale: 1,
      rotation: Math.random() * 360
    };

    trails = [fresh_trail, ...trails].slice(0, maxTrails);
    
    // Change character randomly sometimes
    if (Math.random() < 0.05) {
      currentCursor = cursorChars[Math.floor(Math.random() * cursorChars.length)];
    }
  }

  let animationFrame;
  function updateTrails() {
    trails = trails.map(t => ({
      ...t,
      opacity: t.opacity - 0.05,
      scale: t.scale * 0.95,
      rotation: t.rotation + 5,
      y: t.y + 2
    })).filter(t => t.opacity > 0);
    
    animationFrame = requestAnimationFrame(updateTrails);
  }

  onMount(() => {
    window.addEventListener('mousemove', onMouseMove);
    animationFrame = requestAnimationFrame(updateTrails);
  });

  onDestroy(() => {
    window.removeEventListener('mousemove', onMouseMove);
    cancelAnimationFrame(animationFrame);
  });
</script>

{#each trails as trail (trail.id)}
  <div
    class="trail-particle"
    style="
      left: {trail.x}px;
      top: {trail.y}px;
      opacity: {trail.opacity};
      transform: translate(-50%, -50%) scale({trail.scale}) rotate({trail.rotation}deg);
    "
  >
    {trail.char}
  </div>
{/each}

<style>
  .trail-particle {
    position: fixed;
    pointer-events: none;
    z-index: 99999;
    font-size: 24px;
    text-shadow: 0 0 5px white;
    user-select: none;
  }
</style>