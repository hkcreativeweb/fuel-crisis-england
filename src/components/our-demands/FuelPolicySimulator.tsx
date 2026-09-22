"use client";

import { useMemo, useState } from "react";
import { calculateScenario } from "@/lib/calculator/fuel-policy-simulator";
import { calculateFuelCost } from "@/lib/calculator/fuel-cost";
import { currentDutyPencePerLitre, currentVatPercent, fiscalBaselineMeta } from "@/lib/data/fiscal-baseline";
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
  "More money retained by households/businesses",
  "Potential spending & operating-cost changes",
  "Potential wider economic effects",
  "Possible effects on economic activity & tax receipts",
];

function WiderEconomyFlow() {
  return (
    <>
      {/* Mobile: vertical */}
      <ol className="mt-4 space-y-2 lg:hidden">
        {FLOW_STEPS.map((step, i) => (
          <li key={step}>
            <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-extrabold text-white">{i + 1}</span>
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
      {/* Desktop: horizontal */}
      <ol className="mt-4 hidden items-stretch gap-2 lg:flex">
        {FLOW_STEPS.map((step, i) => (
          <li key={step} className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 flex-col gap-1.5 rounded-md border border-slate-200 bg-slate-50 p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-extrabold text-white">{i + 1}</span>
              <span className="text-xs leading-snug text-charcoal-700">{step}</span>
            </div>
            {i < FLOW_STEPS.length - 1 ? (
              <span className="shrink-0 text-slate-400" aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </>
  );
}

function PresetButtons<T>({
  options,
  isActive,
  onSelect,
  labelOf,
}: {
  options: T[];
  isActive: (o: T) => boolean;
  onSelect: (o: T) => void;
  labelOf: (o: T) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={labelOf(o)}
          type="button"
          onClick={() => onSelect(o)}
          aria-pressed={isActive(o)}
          className={cn(
            "border px-3 py-1.5 text-xs font-bold transition-colors",
            isActive(o) ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
          )}
        >
          {labelOf(o)}
        </button>
      ))}
    </div>
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

  const directFiscalEffect = scenario.dutyRevenueDeltaGBPBillion + scenario.vatRevenueDeltaGBPBillion;

  return (
    <div className="border border-slate-200 bg-white p-6 sm:p-8">
      {/* Controls + results, side by side on desktop */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Fuel Duty</p>
            <div className="mt-3">
              <PresetButtons
                options={DUTY_PRESETS}
                labelOf={(p) => p.label}
                isActive={(p) => dutyMode === "preset" && dutyPreset === p.deltaPence}
                onSelect={(p) => {
                  setDutyMode("preset");
                  setDutyPreset(p.deltaPence);
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => setDutyMode("custom")}
              aria-pressed={dutyMode === "custom"}
              className={cn(
                "mt-2 border px-3 py-1.5 text-xs font-bold transition-colors",
                dutyMode === "custom" ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              Custom
            </button>
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
            <div className="mt-3">
              <PresetButtons
                options={VAT_PRESETS}
                labelOf={(v) => `${v}%`}
                isActive={(v) => vatMode === "preset" && vatPreset === v}
                onSelect={(v) => {
                  setVatMode("preset");
                  setVatPreset(v);
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => setVatMode("custom")}
              aria-pressed={vatMode === "custom"}
              className={cn(
                "mt-2 border px-3 py-1.5 text-xs font-bold transition-colors",
                vatMode === "custom" ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              Custom
            </button>
            {vatMode === "custom" ? (
              <div className="mt-3 max-w-[220px]">
                <NumberField id="custom-vat" label="VAT rate" suffix="%" value={customVat} onChange={setCustomVat} min={0} max={25} step={0.5} />
              </div>
            ) : (
              <p className="mt-2 text-xs text-charcoal-500">Current verified rate: {currentVatPercent}%. Scenario rate: {vatPercent}%.</p>
            )}
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border border-slate-200 p-4">
              <p className="text-xs font-semibold text-charcoal-600">Current pump price</p>
              <p className="mt-1.5 text-xl font-extrabold tabular-nums text-navy-900">
                £{(scenario.baselinePencePerLitre / 100).toFixed(2)}
                <span className="text-xs">/L</span>
              </p>
            </div>
            <div className="border-2 border-petrol-500 bg-petrol-50 p-4">
              <p className="text-xs font-semibold text-petrol-700">Scenario pump price</p>
              <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-petrol-700">
                £{(scenario.scenarioPencePerLitre / 100).toFixed(2)}
                <span className="text-sm">/L</span>
              </p>
            </div>
            <div className="border border-slate-200 p-4">
              <p className="text-xs font-semibold text-charcoal-600">Change per litre</p>
              <p className={cn("mt-1.5 text-xl font-extrabold tabular-nums", scenario.changePencePerLitre <= 0 ? "text-emerald-700" : "text-red-700")}>
                {scenario.changePencePerLitre > 0 ? "+" : ""}
                {scenario.changePencePerLitre.toFixed(1)}p/L
              </p>
            </div>
          </div>

          {/* Mechanical effect mini-flow */}
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-md bg-slate-50 p-3 text-xs font-semibold text-charcoal-600">
            <span>Tax change</span>
            <span aria-hidden="true">→</span>
            <span>Tax component changes</span>
            <span aria-hidden="true">→</span>
            <span>Illustrative pump-price effect</span>
          </div>
          <p className="mt-2 text-xs font-bold text-navy-900">This is a mechanical illustration, not a forecast.</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-3 text-sm">
              <p className="font-semibold text-charcoal-700">20-litre fill</p>
              <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(scenario.fill20LSaving)}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-3 text-sm">
              <p className="font-semibold text-charcoal-700">50-litre tank</p>
              <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(scenario.fill50LSaving)}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-3 text-sm">
              <p className="font-semibold text-charcoal-700">1,000 litres/year</p>
              <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(scenario.yearly1000LSaving)}</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-charcoal-500">
            This does not assume the saving (or cost) is guaranteed to be passed through to motorists in
            full — wholesale prices, retailer margins, distribution costs and competition also affect the
            pump price.
          </p>
        </div>
      </div>

      {/* Household + business calculators, side by side on desktop */}
      <div className="mt-10 grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-navy-900">What could this mean for your vehicle?</p>
          <div className="mt-3">
            <PresetButtons
              options={HOUSEHOLD_PRESETS}
              labelOf={(p) => p.label}
              isActive={(p) => presetLabel === p.label}
              onSelect={(p) => {
                setAnnualMileage(p.annualMileage);
                setMpg(p.mpg);
                setVehicles(p.vehicles);
                setPresetLabel(p.label);
              }}
            />
          </div>
          <p className="mt-2 text-xs text-charcoal-500">Presets are illustrative assumptions, not claims about a &quot;typical&quot; driver.</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-charcoal-700">Annual fuel use</p>
                <p className="mt-1 font-bold tabular-nums text-navy-900">{Math.round(householdResult.annualFuelUse).toLocaleString("en-GB")}L</p>
              </div>
              <div className="rounded-md bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-charcoal-700">Annual saving</p>
                <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(householdResult.annualSaving)}</p>
              </div>
              <div className="rounded-md bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-charcoal-700">Monthly saving</p>
                <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(householdResult.monthlySaving)}</p>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-sm font-bold text-navy-900">What could this mean for a business?</p>
          <p className="mt-1 text-xs text-charcoal-500">Illustrative calculation — not an economic forecast.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <NumberField id="fleet-vehicles" label="Number of vehicles" suffix="vehicles" value={fleetVehicles} onChange={setFleetVehicles} min={1} max={1000} step={1} />
            <NumberField id="fleet-mileage" label="Mileage per vehicle" suffix="miles/yr" value={fleetMileage} onChange={setFleetMileage} min={0} max={100000} step={500} />
            <NumberField id="fleet-mpg" label="Average MPG" suffix="UK mpg" value={fleetMpg} onChange={setFleetMpg} min={5} max={150} step={1} />
          </div>
          {fleetResult ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-charcoal-700">Annual fuel use</p>
                <p className="mt-1 font-bold tabular-nums text-navy-900">{Math.round(fleetResult.annualFuelUse).toLocaleString("en-GB")} litres</p>
              </div>
              <div className="rounded-md bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-charcoal-700">Annual fuel-cost saving</p>
                <p className="mt-1 font-bold tabular-nums text-navy-900">{formatGBP(fleetResult.annualSaving)}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Government revenue effect */}
      <div className="mt-10 border-t border-slate-200 pt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Government Revenue Effect</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="border border-slate-200 p-5">
            <p className="text-xs font-semibold text-charcoal-600">Fuel Duty revenue</p>
            <p className={cn("mt-1.5 text-xl font-extrabold tabular-nums", scenario.dutyRevenueDeltaGBPBillion < 0 ? "text-red-700" : "text-emerald-700")}>
              {scenario.dutyRevenueDeltaGBPBillion >= 0 ? "+" : ""}
              {scenario.dutyRevenueDeltaGBPBillion.toFixed(2)}bn/year
            </p>
          </div>
          <div className="border border-slate-200 p-5">
            <p className="text-xs font-semibold text-charcoal-600">VAT-on-fuel revenue</p>
            <p className={cn("mt-1.5 text-xl font-extrabold tabular-nums", scenario.vatRevenueDeltaGBPBillion < 0 ? "text-red-700" : "text-emerald-700")}>
              {scenario.vatRevenueDeltaGBPBillion >= 0 ? "+" : ""}
              {scenario.vatRevenueDeltaGBPBillion.toFixed(2)}bn/year
            </p>
          </div>
          <div className="border-2 border-navy-900 p-5">
            <p className="text-xs font-semibold text-charcoal-600">Direct fiscal effect</p>
            <p className={cn("mt-1.5 text-xl font-extrabold tabular-nums", directFiscalEffect < 0 ? "text-red-700" : "text-emerald-700")}>
              {directFiscalEffect >= 0 ? "+" : ""}
              {directFiscalEffect.toFixed(2)}bn/year
            </p>
          </div>
        </div>

        <details className="group mt-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-petrol-600">
            <span className="group-open:hidden">How is this calculated? →</span>
            <span className="hidden group-open:inline">Hide calculation detail</span>
          </summary>
          <p className="mt-2 text-xs leading-relaxed text-charcoal-500">
            Based on {fiscalBaselineMeta.receiptsAmountGBPBillion.toFixed(2)}bn in published Fuel Duty receipts
            ({fiscalBaselineMeta.receiptsPeriodLabel}), divided by the current {currentDutyPencePerLitre.toFixed(2)}p/litre rate to
            imply the annual litres taxed, then multiplied by the rate change. This direct arithmetic
            illustration does not claim a tax reduction pays for itself, and does not assume the wider economy
            will generate enough additional revenue to offset it.
          </p>
        </details>

        <div className="mt-8">
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
      <details className="group mt-10 border-t border-slate-200 pt-6">
        <summary className="cursor-pointer list-none">
          <span className="text-sm font-bold text-navy-900">Assumptions &amp; limitations</span>
          <span className="ml-2 text-xs font-semibold text-petrol-600 group-open:hidden">Show →</span>
          <span className="ml-2 hidden text-xs font-semibold text-petrol-600 group-open:inline">Hide</span>
        </summary>
        <div className="mt-3 border-l-2 border-sky-500 pl-4 text-sm leading-relaxed text-charcoal-700">
          <p>
            These calculations illustrate the mechanical effect of changing tax rates. They do not assume
            that every penny of a tax reduction is passed through to motorists, and they do not forecast the
            wider economic response. Actual pump prices also depend on wholesale prices, retailer margins,
            distribution costs, competition, demand and other factors. The government revenue calculation is
            a direct arithmetic illustration, not a full fiscal forecast.
          </p>
          <p className="mt-3 font-semibold text-navy-900">
            Why this matters: the calculator intentionally avoids presenting uncertain economic effects as
            guaranteed savings, so the numbers above should be read as illustrations, not promises.
          </p>
        </div>
      </details>

      <p className="mt-6 text-xs text-charcoal-500">
        Baseline pump price and Fuel Duty rate — last verified {formatDate(fiscalBaselineMeta.pumpPriceAsOf)}, GOV.UK / DESNZ.
      </p>
    </div>
  );
}
