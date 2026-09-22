"use client";

import { useMemo, useState } from "react";
import { calculateScenario } from "@/lib/calculator/fuel-policy-simulator";
import { calculateFuelCost } from "@/lib/calculator/fuel-cost";
import { currentDutyPencePerLitre, currentVatPercent, fiscalBaselineMeta } from "@/lib/data/fiscal-baseline";
import { Alert } from "@/components/ui/Alert";
import { formatGBP, formatDate, cn } from "@/lib/utils";

const DUTY_PRESETS = [
  { label: "Current rate", deltaPence: 0 },
  { label: "-1p/L", deltaPence: -1 },
  { label: "-2p/L", deltaPence: -2 },
  { label: "-5p/L", deltaPence: -5 },
  { label: "-10p/L", deltaPence: -10 },
  { label: "-15p/L", deltaPence: -15 },
];

const VAT_PRESETS = [20, 19, 18, 17];

const HOUSEHOLD_PRESETS = [
  { label: "Typical household", annualMileage: 8000, mpg: 45, vehicles: 1 },
  { label: "Commuter", annualMileage: 12000, mpg: 42, vehicles: 1 },
  { label: "Taxi / private-hire driver", annualMileage: 30000, mpg: 38, vehicles: 1 },
  { label: "Delivery driver", annualMileage: 25000, mpg: 35, vehicles: 1 },
  { label: "Small business", annualMileage: 15000, mpg: 32, vehicles: 2 },
];

function NumberField({
  id,
  label,
  suffix,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  id: string;
  label: string;
  suffix: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-navy-900">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2 border border-slate-300 bg-white px-3 py-2 focus-within:border-petrol-500">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className="w-full min-w-0 border-0 bg-transparent p-0 text-sm text-navy-900 focus:outline-none focus:ring-0"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number.isFinite(e.target.valueAsNumber) ? e.target.valueAsNumber : 0)}
        />
        <span className="shrink-0 text-xs text-charcoal-500">{suffix}</span>
      </div>
    </div>
  );
}

const FLOW_STEPS = [
  "Lower fuel costs",
  "Households and businesses retain more money",
  "Potential changes in spending and operating costs",
  "Potential wider economic effects",
  "Possible effects on other economic activity and tax receipts",
];

function WiderEconomyFlow() {
  return (
    <ol className="mt-4 space-y-2">
      {FLOW_STEPS.map((step, i) => (
        <li key={step}>
          <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-extrabold text-white">
              {i + 1}
            </span>
            <span className="text-sm text-charcoal-700">{step}</span>
          </div>
          {i < FLOW_STEPS.length - 1 ? (
            <div className="py-1 pl-[1.9rem] text-slate-400" aria-hidden="true">
              ↓
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function FuelPolicySimulator() {
  const [dutyPreset, setDutyPreset] = useState(0);
  const [customDuty, setCustomDuty] = useState(currentDutyPencePerLitre);
  const [dutyMode, setDutyMode] = useState<"preset" | "custom">("preset");

  const [vatPreset, setVatPreset] = useState(currentVatPercent);
  const [customVat, setCustomVat] = useState(currentVatPercent);
  const [vatMode, setVatMode] = useState<"preset" | "custom">("preset");

  const dutyPencePerLitre = dutyMode === "custom" ? customDuty : Math.max(0, currentDutyPencePerLitre + dutyPreset);
  const vatPercent = vatMode === "custom" ? customVat : vatPreset;

  const scenario = useMemo(() => calculateScenario({ dutyPencePerLitre, vatPercent }), [dutyPencePerLitre, vatPercent]);

  const [annualMileage, setAnnualMileage] = useState(HOUSEHOLD_PRESETS[0].annualMileage);
  const [mpg, setMpg] = useState(HOUSEHOLD_PRESETS[0].mpg);
  const [vehicles, setVehicles] = useState(HOUSEHOLD_PRESETS[0].vehicles);
  const [presetLabel, setPresetLabel] = useState<string | null>(HOUSEHOLD_PRESETS[0].label);

  const householdResult = useMemo(() => {
    const before = calculateFuelCost({ milesPerWeek: annualMileage / 52, mpg, pencePerLitre: scenario.baselinePencePerLitre, weeks: 52 });
    const after = calculateFuelCost({ milesPerWeek: annualMileage / 52, mpg, pencePerLitre: scenario.scenarioPencePerLitre, weeks: 52 });
    if (!before || !after) return null;
    return {
      annualFuelUse: before.litresPerWeek * 52 * vehicles,
      annualCost: before.annualCost * vehicles,
      annualSaving: (before.annualCost - after.annualCost) * vehicles,
      monthlySaving: (before.monthlyCost - after.monthlyCost) * vehicles,
    };
  }, [annualMileage, mpg, vehicles, scenario]);

  const [fleetVehicles, setFleetVehicles] = useState(10);
  const [fleetMileage, setFleetMileage] = useState(18000);
  const [fleetMpg, setFleetMpg] = useState(35);

  const fleetResult = useMemo(() => {
    const before = calculateFuelCost({ milesPerWeek: fleetMileage / 52, mpg: fleetMpg, pencePerLitre: scenario.baselinePencePerLitre, weeks: 52 });
    const after = calculateFuelCost({ milesPerWeek: fleetMileage / 52, mpg: fleetMpg, pencePerLitre: scenario.scenarioPencePerLitre, weeks: 52 });
    if (!before || !after) return null;
    return {
      annualFuelUse: before.litresPerWeek * 52 * fleetVehicles,
      annualSaving: (before.annualCost - after.annualCost) * fleetVehicles,
    };
  }, [fleetMileage, fleetMpg, fleetVehicles, scenario]);

  return (
    <div className="border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-sm leading-relaxed text-charcoal-700">
        Explore illustrative scenarios by changing Fuel Duty and VAT. See the mechanical effect on fuel
        prices, motorists and government revenue.
      </p>

      {/* Controls */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Fuel Duty</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DUTY_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setDutyMode("preset");
                  setDutyPreset(p.deltaPence);
                }}
                aria-pressed={dutyMode === "preset" && dutyPreset === p.deltaPence}
                className={cn(
                  "border px-3 py-1.5 text-xs font-bold transition-colors",
                  dutyMode === "preset" && dutyPreset === p.deltaPence
                    ? "border-petrol-500 bg-petrol-500 text-white"
                    : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
                )}
              >
                {p.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setDutyMode("custom")}
              aria-pressed={dutyMode === "custom"}
              className={cn(
                "border px-3 py-1.5 text-xs font-bold transition-colors",
                dutyMode === "custom" ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              Custom
            </button>
          </div>
          {dutyMode === "custom" ? (
            <div className="mt-3 max-w-[220px]">
              <NumberField id="custom-duty" label="Fuel Duty rate" suffix="pence/litre" value={customDuty} onChange={setCustomDuty} min={0} max={100} step={0.1} />
            </div>
          ) : (
            <p className="mt-2 text-xs text-charcoal-500">
              Current verified rate: {currentDutyPencePerLitre.toFixed(2)}p/litre. Scenario rate: {dutyPencePerLitre.toFixed(2)}p/litre.
            </p>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">VAT</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {VAT_PRESETS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setVatMode("preset");
                  setVatPreset(v);
                }}
                aria-pressed={vatMode === "preset" && vatPreset === v}
                className={cn(
                  "border px-3 py-1.5 text-xs font-bold transition-colors",
                  vatMode === "preset" && vatPreset === v ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
                )}
              >
                {v}%
              </button>
            ))}
            <button
              type="button"
              onClick={() => setVatMode("custom")}
              aria-pressed={vatMode === "custom"}
              className={cn(
                "border px-3 py-1.5 text-xs font-bold transition-colors",
                vatMode === "custom" ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              Custom
            </button>
          </div>
          {vatMode === "custom" ? (
            <div className="mt-3 max-w-[220px]">
              <NumberField id="custom-vat" label="VAT rate" suffix="%" value={customVat} onChange={setCustomVat} min={0} max={25} step={0.5} />
            </div>
          ) : (
            <p className="mt-2 text-xs text-charcoal-500">Current verified rate: {currentVatPercent}%. Scenario rate: {vatPercent}%.</p>
          )}
        </div>
      </div>

      {/* Pump price result */}
      <div className="mt-8 border-t border-slate-200 pt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">What could different tax policies mean at the pump?</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="border border-slate-200 p-5">
            <p className="text-xs font-semibold text-charcoal-600">Current illustrative pump price</p>
            <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-navy-900">£{(scenario.baselinePencePerLitre / 100).toFixed(2)}<span className="text-sm">/L</span></p>
          </div>
          <div className="border border-petrol-200 bg-petrol-50 p-5">
            <p className="text-xs font-semibold text-petrol-700">Scenario pump price</p>
            <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-petrol-700">£{(scenario.scenarioPencePerLitre / 100).toFixed(2)}<span className="text-sm">/L</span></p>
          </div>
          <div className="border border-slate-200 p-5">
            <p className="text-xs font-semibold text-charcoal-600">Illustrative change</p>
            <p className={cn("mt-1.5 text-2xl font-extrabold tabular-nums", scenario.changePencePerLitre <= 0 ? "text-emerald-700" : "text-red-700")}>
              {scenario.changePencePerLitre > 0 ? "+" : ""}
              {scenario.changePencePerLitre.toFixed(1)}p/L
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-charcoal-700">20-litre fill</p>
            <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(scenario.fill20LSaving)} saving</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-charcoal-700">50-litre tank</p>
            <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(scenario.fill50LSaving)} saving</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-charcoal-700">1,000 litres/year</p>
            <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(scenario.yearly1000LSaving)} saving</p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-charcoal-500">
          This is a mechanical illustration of the tax change only. It does not assume the saving (or cost)
          is guaranteed to be passed through to motorists in full — wholesale prices, retailer margins and
          competition also affect the pump price.
        </p>
      </div>

      {/* Household calculator */}
      <div className="mt-8 border-t border-slate-200 pt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Personal / household calculator</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {HOUSEHOLD_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setAnnualMileage(p.annualMileage);
                setMpg(p.mpg);
                setVehicles(p.vehicles);
                setPresetLabel(p.label);
              }}
              aria-pressed={presetLabel === p.label}
              className={cn(
                "border px-3 py-1.5 text-xs font-bold transition-colors",
                presetLabel === p.label ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-charcoal-500">Presets are illustrative assumptions, not claims about a &quot;typical&quot; driver.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <NumberField
            id="hh-mileage"
            label="Annual mileage"
            suffix="miles/yr"
            value={annualMileage}
            onChange={(v) => {
              setAnnualMileage(v);
              setPresetLabel(null);
            }}
            min={0}
            max={100000}
            step={500}
          />
          <NumberField
            id="hh-mpg"
            label="Vehicle MPG"
            suffix="UK mpg"
            value={mpg}
            onChange={(v) => {
              setMpg(v);
              setPresetLabel(null);
            }}
            min={5}
            max={150}
            step={1}
          />
          <NumberField
            id="hh-vehicles"
            label="Number of vehicles"
            suffix="vehicles"
            value={vehicles}
            onChange={(v) => {
              setVehicles(v);
              setPresetLabel(null);
            }}
            min={1}
            max={10}
            step={1}
          />
        </div>

        {householdResult ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-charcoal-700">Estimated annual fuel use</p>
              <p className="mt-1 font-bold tabular-nums text-navy-900">{Math.round(householdResult.annualFuelUse).toLocaleString("en-GB")} litres</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-charcoal-700">Estimated annual saving</p>
              <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(householdResult.annualSaving)}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-charcoal-700">Estimated monthly saving</p>
              <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(householdResult.monthlySaving)}</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Business / fleet */}
      <div className="mt-8 border-t border-slate-200 pt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Business / fleet scenario</p>
        <p className="mt-1 text-xs text-charcoal-500">An illustrative calculation, not an economic forecast.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <NumberField id="fleet-vehicles" label="Number of vehicles" suffix="vehicles" value={fleetVehicles} onChange={setFleetVehicles} min={1} max={1000} step={1} />
          <NumberField id="fleet-mileage" label="Annual mileage per vehicle" suffix="miles/yr" value={fleetMileage} onChange={setFleetMileage} min={0} max={100000} step={500} />
          <NumberField id="fleet-mpg" label="Average MPG" suffix="UK mpg" value={fleetMpg} onChange={setFleetMpg} min={5} max={150} step={1} />
        </div>
        {fleetResult ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-charcoal-700">Estimated annual fuel use</p>
              <p className="mt-1 font-bold tabular-nums text-navy-900">{Math.round(fleetResult.annualFuelUse).toLocaleString("en-GB")} litres</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-charcoal-700">Estimated annual fuel-cost saving</p>
              <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(fleetResult.annualSaving)}</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Government revenue effect */}
      <div className="mt-8 border-t border-slate-200 pt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Government Revenue Effect</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="border border-slate-200 p-5">
            <p className="text-xs font-semibold text-charcoal-600">Estimated direct Fuel Duty revenue change</p>
            <p className={cn("mt-1.5 text-xl font-extrabold tabular-nums", scenario.dutyRevenueDeltaGBPBillion < 0 ? "text-red-700" : "text-emerald-700")}>
              {scenario.dutyRevenueDeltaGBPBillion >= 0 ? "+" : ""}
              {scenario.dutyRevenueDeltaGBPBillion.toFixed(2)}bn/year
            </p>
          </div>
          <div className="border border-slate-200 p-5">
            <p className="text-xs font-semibold text-charcoal-600">Estimated direct VAT-on-fuel revenue change</p>
            <p className={cn("mt-1.5 text-xl font-extrabold tabular-nums", scenario.vatRevenueDeltaGBPBillion < 0 ? "text-red-700" : "text-emerald-700")}>
              {scenario.vatRevenueDeltaGBPBillion >= 0 ? "+" : ""}
              {scenario.vatRevenueDeltaGBPBillion.toFixed(2)}bn/year
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-charcoal-500">
          Based on {fiscalBaselineMeta.receiptsAmountGBPBillion.toFixed(2)}bn in published Fuel Duty receipts
          ({fiscalBaselineMeta.receiptsPeriodLabel}), divided by the current {currentDutyPencePerLitre.toFixed(2)}p/litre rate to
          imply the annual litres taxed, then multiplied by the rate change. This direct arithmetic
          illustration does not claim a tax reduction pays for itself, and does not assume the wider economy
          will generate enough additional revenue to offset it.
        </p>

        <div className="mt-6">
          <p className="text-sm font-bold text-navy-900">Could lower fuel costs help the wider economy?</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-charcoal-500">Illustrative economic scenario — not a forecast</p>
          <WiderEconomyFlow />
          <p className="mt-3 text-xs leading-relaxed text-charcoal-500">
            This is a possible economic transmission mechanism, not a guaranteed outcome. The size of any
            wider effect depends on behaviour, prices, demand, margins and other economic conditions.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <div className="mt-8">
        <Alert tone="info" title="Assumptions and limitations">
          These calculations illustrate the mechanical effect of changing tax rates. They do not assume that
          every penny of a tax reduction is passed through to motorists, and they do not forecast the wider
          economic response. Actual pump prices also depend on wholesale prices, retailer margins,
          distribution costs, competition, demand and other factors. The government revenue calculation is a
          direct arithmetic illustration, not a full fiscal forecast.
        </Alert>
      </div>

      <p className="mt-6 text-xs text-charcoal-500">
        Baseline pump price and Fuel Duty rate as of {formatDate(fiscalBaselineMeta.pumpPriceAsOf)} — GOV.UK / DESNZ.
      </p>
    </div>
  );
}
