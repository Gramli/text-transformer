import { writable, get } from "svelte/store";
import { badges, inflateBadge } from "./badgeData.js";

const STATS_KEY = "absurdStats";
const BADGES_KEY = "absurdBadges";
const DEFAULT_STATS = { visits: 0, transforms: 0, prestigeLevel: 0 };
const TOAST_DURATION_MS = 5000;

function loadJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function createBadgeStore() {
  const stats = writable(loadJSON(STATS_KEY, { ...DEFAULT_STATS }));
  const earnedIds = writable(loadJSON(BADGES_KEY, []));
  const recentBadge = writable(null);
  const showPrestige = writable(false);

  let badgeTimeout;

  function persist() {
    stats.subscribe(v => localStorage.setItem(STATS_KEY, JSON.stringify(v)))();
    earnedIds.subscribe(v => localStorage.setItem(BADGES_KEY, JSON.stringify(v)))();
  }

  function checkNewBadges(triggerType) {
    const currentStats = get(stats);
    const currentEarned = get(earnedIds);
    const val = triggerType === "visit" ? currentStats.visits : currentStats.transforms;
    const prestige = currentStats.prestigeLevel || 0;

    const newlyEarned = badges
      .map(b => inflateBadge(b, prestige))
      .filter(b => b.type === triggerType && b.limit <= val && !currentEarned.includes(b.id));

    if (newlyEarned.length === 0) return;

    const updated = [...currentEarned, ...newlyEarned.map(b => b.id)];
    earnedIds.set(updated);

    recentBadge.set(newlyEarned[newlyEarned.length - 1]);
    clearTimeout(badgeTimeout);
    badgeTimeout = setTimeout(() => recentBadge.set(null), TOAST_DURATION_MS);

    if (updated.length >= badges.length) {
      stats.update(s => ({ ...s, prestigeLevel: (s.prestigeLevel || 0) + 1 }));
      earnedIds.set([]);
      showPrestige.set(true);
    }

    persist();
  }

  function recordVisit() {
    stats.update(s => ({ ...s, visits: s.visits + 1 }));
    persist();
    checkNewBadges("visit");
  }

  function recordTransform() {
    stats.update(s => ({ ...s, transforms: s.transforms + 1 }));
    persist();
    checkNewBadges("transform");
  }

  return {
    stats,
    earnedIds,
    recentBadge,
    showPrestige,
    recordVisit,
    recordTransform,
  };
}

export const badgeStore = createBadgeStore();
