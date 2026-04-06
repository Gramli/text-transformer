const RESET_DELAY_MS = 2000;

export function copyToClipboard(text, onStart, onEnd) {
  navigator.clipboard.writeText(text);
  onStart();
  setTimeout(onEnd, RESET_DELAY_MS);
}
