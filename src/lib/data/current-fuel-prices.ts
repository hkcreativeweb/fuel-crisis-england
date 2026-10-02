import "server-only";
import { desnzWeeklySource, getLatestUkWeeklyAverage } from "@/lib/data/desnz-weekly-prices";
import { buildPumpPriceBreakdown } from "@/lib/data/pump-price-breakdown";
import type { WeeklyFigure } from "@/lib/data/hero-fuel-snapshot";
import type { FuelType, PumpPriceBreakdown } from "@/lib/types";

/** Figures older than this have missed a weekly GOV.UK publication and are flagged as possibly out of date. */
export const STALE_AFTER_DAYS = 10;

export type CurrentFuelPrice = {
  price: number;
  unit: "pence per litre";
  /** Week the price applies to (ISO date, week commencing). */
  updatedAt: string;
  source: string;
  sourceUrl: string;
  previous: number | null;
};

export type CurrentFuelPrices = {
  petrol: CurrentFuelPrice;
  diesel: CurrentFuelPrice;
  weekLabel: string;
  /** ISO timestamp of the last successful, validated check against GOV.UK. */
  lastSuccessfulUpdate: string | null;
  /** The last check failed; the last verified prices are being shown. */
  awaitingUpdate: boolean;
  /** The figures are older than the expected weekly publication cycle. */
  stale: boolean;
  fromLiveSource: boolean;
  figures: Record<FuelType, WeeklyFigure>;
};

/**
 * THE single source of truth for current UK petrol and diesel prices.
 * Every page and component reads from here (or from getLatestUkWeeklyAverage,
 * which this wraps); nothing else holds a current price.
 */
export async function getCurrentFuelPrices(): Promise<CurrentFuelPrices> {
  const { figures, fromLiveSource, awaitingUpdate, lastSuccessfulUpdate } = await getLatestUkWeeklyAverage();
  const toPrice = (fuel: FuelType): CurrentFuelPrice => ({
    price: figures[fuel].current,
    unit: "pence per litre",
    updatedAt: figures[fuel].lastUpdated,
    source: desnzWeeklySource.name,
    sourceUrl: desnzWeeklySource.url,
    previous: figures[fuel].previous,
  });
  const ageDays = (Date.now() - Date.parse(`${figures.petrol.lastUpdated}T00:00:00Z`)) / 86_400_000;
  return {
    petrol: toPrice("petrol"),
    diesel: toPrice("diesel"),
    weekLabel: figures.petrol.dataPeriod,
    lastSuccessfulUpdate,
    awaitingUpdate,
    stale: ageDays > STALE_AFTER_DAYS,
    fromLiveSource,
    figures,
  };
}

/** Pump-price splits calculated from the current prices above. */
export async function getPumpPriceBreakdowns(): Promise<Record<FuelType, PumpPriceBreakdown>> {
  const { petrol, diesel } = await getCurrentFuelPrices();
  return {
    petrol: buildPumpPriceBreakdown("petrol", petrol.price, petrol.updatedAt),
    diesel: buildPumpPriceBreakdown("diesel", diesel.price, diesel.updatedAt),
  };
}
