<script>
  import { onMount, onDestroy } from "svelte";

  const ABSURD_TIMEZONES = [
    { name: "Chatham Islands",        offset: [13, 37, 42] },
    { name: "Kiribati Line Islands",  offset: [14,  0,  0] },
    { name: "Baker Island",           offset: [-12,  0,  0] },
    { name: "Somewhere In Nepal",     offset: [5, 45, 30] },
    { name: "Lord Howe Island",       offset: [10, 30,  0] },
    { name: "Marquesas Islands",      offset: [-9, 30,  0] },
    { name: "North Korea Standard",   offset: [8, 30,  0] },
    { name: "Antarctica (Troll)",     offset: [2,  0,  0] },
    { name: "Australian Central West",offset: [8, 45,  0] },
    { name: "Eucla, Australia",       offset: [8, 45,  0] },
  ];

  const tz = ABSURD_TIMEZONES[Math.floor(Math.random() * ABSURD_TIMEZONES.length)];
  const OFFSET_MS = ((tz.offset[0] * 60 + tz.offset[1]) * 60 + tz.offset[2]) * 1000;
  const UTC_SIGN = tz.offset[0] >= 0 ? "+" : "-";
  const UTC_LABEL = `UTC${UTC_SIGN}${String(Math.abs(tz.offset[0])).padStart(2, '0')}:${String(tz.offset[1]).padStart(2, '0')}`;

  let microsecondTime = "00:00:00.000000";
  let animationFrameId;

  function updateAbsurdTime() {
    const absurdDate = new Date(Date.now() + OFFSET_MS);
    const hrs   = String(absurdDate.getUTCHours()).padStart(2, '0');
    const mins  = String(absurdDate.getUTCMinutes()).padStart(2, '0');
    const secs  = String(absurdDate.getUTCSeconds()).padStart(2, '0');
    const micros = String(Math.floor((performance.now() * 1000) % 1000000)).padStart(6, '0');

    microsecondTime = `${hrs}:${mins}:${secs}.${micros}`;
    animationFrameId = requestAnimationFrame(updateAbsurdTime);
  }

  onMount(() => { updateAbsurdTime(); });
  onDestroy(() => { cancelAnimationFrame(animationFrameId); });
</script>

<div class="absurd-time-badge">
  ⏱️ {tz.name} ({UTC_LABEL}) MicroTime: <b>{microsecondTime}</b>
</div>

<style>
  .absurd-time-badge {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    color: #0f0;
    padding: 0.5rem 1rem;
    font-family: monospace;
    font-size: 1.1rem;
    border-radius: 5px;
    border: 2px solid cyan;
    z-index: 999;
    white-space: nowrap;
    text-shadow: 0 0 5px cyan;
    pointer-events: none;
    max-width: calc(100vw - 200px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    .absurd-time-badge {
      top: 10px;
      right: 10px;
      left: auto;
      transform: none;
      top: auto;
      bottom: 70px;
      right: 5px;
      max-width: calc(100vw - 10px);
      font-size: 0.6rem;
      padding: 3px 6px;
      white-space: normal;
      text-align: right;
      line-height: 1.3;
    }
  }
</style>
