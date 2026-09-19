import { fuelSavingTips, fuelSavingTipCategoryLabels, type FuelSavingTipCategory } from "@/lib/data/fuel-saving-tips";
import { FuelSavingTipCard } from "@/components/save-money/FuelSavingTipCard";

const categoryOrder: FuelSavingTipCategory[] = ["driving-technique", "tyres", "weight-aero", "air-conditioning"];

export function FuelSavingTipsGrid() {
  return (
    <div className="space-y-10">
      {categoryOrder.map((category) => (
        <div key={category}>
          <h3 className="text-lg font-bold uppercase tracking-wide text-navy-900">{fuelSavingTipCategoryLabels[category]}</h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {fuelSavingTips
              .filter((tip) => tip.category === category)
              .map((tip) => (
                <FuelSavingTipCard key={tip.slug} tip={tip} />
              ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-charcoal-600">
        Actual fuel savings vary by vehicle, journey and driving conditions — none of the figures above are
        a guaranteed percentage for your car.
      </p>
    </div>
  );
}
