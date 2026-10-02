import "server-only";
import { redis, redisPipeline } from "@/lib/server/redis";

/** The last price set that passed validation, kept so a failed fetch never blanks the site. */
export type StoredFuelPrices = {
  date: string; // week commencing, ISO
  petrol: number;
  diesel: number;
  previousDate: string | null;
  previousPetrol: number | null;
  previousDiesel: number | null;
  checkedAt: string; // ISO timestamp of the successful check
  source: string;
};

export type FuelPriceHistoryRecord = {
  date: string;
  petrol: number;
  diesel: number;
  source: string;
  recordedAt: string;
};

const LATEST_KEY = "fce:fuel:latest";
const HISTORY_KEY = "fce:fuel:history";

export async function readLastGoodPrices(): Promise<StoredFuelPrices | null> {
  const raw = await redis<string>(["GET", LATEST_KEY]);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredFuelPrices;
  } catch {
    return null;
  }
}

export async function saveLastGoodPrices(value: StoredFuelPrices): Promise<boolean> {
  return (await redis(["SET", LATEST_KEY, JSON.stringify(value)])) !== null;
}

/** HSETNX per date: an existing record is never overwritten. */
export async function appendHistory(records: FuelPriceHistoryRecord[]): Promise<boolean> {
  if (records.length === 0) return true;
  const result = await redisPipeline(records.map((r) => ["HSETNX", HISTORY_KEY, r.date, JSON.stringify(r)]));
  return result !== null;
}

export async function readHistory(): Promise<FuelPriceHistoryRecord[]> {
  const raw = await redis<string[]>(["HVALS", HISTORY_KEY]);
  if (!raw) return [];
  return raw
    .map((s) => {
      try {
        return JSON.parse(s) as FuelPriceHistoryRecord;
      } catch {
        return null;
      }
    })
    .filter((r): r is FuelPriceHistoryRecord => r !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
}
