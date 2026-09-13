import type { HistoricalEvent } from "@/types/game";

export const GAME_LENGTH = 10;

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

/**
 * A seed produces the same order for every player. A future Daily Challenge can
 * pass an ISO date here; regular games get a fresh random seed.
 */
export function createRoundOrder(
  events: HistoricalEvent[],
  options: { length?: number; seed?: string } = {},
): HistoricalEvent[] {
  const { length = GAME_LENGTH, seed = crypto.randomUUID() } = options;
  const random = mulberry32(hashSeed(seed));
  const shuffled = [...events];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }

  return shuffled.slice(0, Math.min(length, shuffled.length));
}
