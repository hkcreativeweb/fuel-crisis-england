export type FuelSavingTipCategory = "driving-technique" | "tyres" | "weight-aero" | "air-conditioning";

export type FuelSavingTip = {
  slug: string;
  category: FuelSavingTipCategory;
  title: string;
  whatToDo: string;
  whyItWorks: string;
  howMuchItMayHelp: string;
  assumptions: string;
};

export const fuelSavingTipCategoryLabels: Record<FuelSavingTipCategory, string> = {
  "driving-technique": "Driving Technique",
  tyres: "Tyres",
  "weight-aero": "Vehicle Weight & Aerodynamics",
  "air-conditioning": "Air Conditioning & Electrical Load",
};

export const fuelSavingTips: FuelSavingTip[] = [
  {
    slug: "drive-smoothly",
    category: "driving-technique",
    title: "Drive smoothly",
    whatToDo: "Accelerate smoothly, avoid unnecessary hard acceleration, anticipate traffic ahead, and avoid unnecessary heavy braking. Look further ahead and ease off the accelerator early instead of braking late.",
    whyItWorks: "Harsh acceleration burns noticeably more fuel than gradual acceleration, and heavy braking wastes the energy you just spent speeding up. This effect is most pronounced in stop-start urban traffic.",
    howMuchItMayHelp: "There's no single universal percentage. The saving depends heavily on your usual driving style and the roads you drive on. It tends to matter most in congested, stop-start conditions and least on a steady motorway run.",
    assumptions: "Varies with driving style, traffic conditions, journey type, and vehicle.",
  },
  {
    slug: "avoid-idling",
    category: "driving-technique",
    title: "Avoid unnecessary idling",
    whatToDo: "Turn the engine off when safely parked and stationary for more than a minute or so, rather than leaving it running.",
    whyItWorks: "An idling engine burns fuel while producing no useful distance travelled.",
    howMuchItMayHelp: "The saving scales directly with how long you'd otherwise have idled. A few minutes here and there adds up over a year, though the total is small relative to overall driving fuel use.",
    assumptions: "Doesn't apply where idling is needed for safety, traffic conditions, demisting the windscreen, or where your vehicle manufacturer advises otherwise.",
  },
  {
    slug: "combine-journeys",
    category: "driving-technique",
    title: "Combine journeys",
    whatToDo: "Group errands into a single trip rather than making several separate short journeys, and avoid repeated cold short trips where practical.",
    whyItWorks: "A cold engine is less fuel-efficient for the first few miles, so several short separate trips can use more fuel in total than one longer combined trip covering the same destinations.",
    howMuchItMayHelp: "This matters most for very short trips where the engine barely warms up. The more separate short trips you can combine, the more this adds up.",
    assumptions: "Depends on how many separate short trips you'd otherwise make and how far apart your destinations are.",
  },
  {
    slug: "avoid-excessive-speed",
    category: "driving-technique",
    title: "Avoid excessive speed",
    whatToDo: "Keep to a steady, legal speed appropriate for the road, rather than driving faster than necessary.",
    whyItWorks: "Aerodynamic drag increases sharply as speed increases, so fuel consumption tends to rise faster than speed itself at higher speeds, particularly on motorways.",
    howMuchItMayHelp: "There is no single 'best' speed that applies to every vehicle and road. The relationship depends on your specific vehicle's aerodynamics and gearing. Always follow the speed limit and drive to conditions regardless of any fuel-saving consideration.",
    assumptions: "Vehicle-specific; varies with road type, wind, and load.",
  },
  {
    slug: "cruise-control",
    category: "driving-technique",
    title: "Use cruise control appropriately",
    whatToDo: "Consider using cruise control to maintain a steady speed on suitable roads, such as motorways in light-to-moderate traffic.",
    whyItWorks: "A constant speed avoids the small, repeated accelerations that can happen when manually maintaining speed.",
    howMuchItMayHelp: "Benefits are most likely on flat, steady roads; cruise control may be less suitable on hilly or winding roads, or in heavy or unpredictable traffic, where it can behave less efficiently than an attentive driver.",
    assumptions: "Road type and traffic conditions dependent. Use your judgement about when it's appropriate and safe.",
  },
  {
    slug: "plan-journeys",
    category: "driving-technique",
    title: "Plan routes and avoid unnecessary detours",
    whatToDo: "Check traffic conditions before you set off, combine stops where practical, avoid unnecessary detours, and use navigation tools to find sensible routes. Consider public transport or walking for short, suitable journeys.",
    whyItWorks: "Avoiding congestion and unnecessary distance directly reduces the fuel used for a given set of errands.",
    howMuchItMayHelp: "Highly variable, and depends entirely on how much your planning avoids traffic or unnecessary mileage compared with your usual routine.",
    assumptions: "Depends on route options available and how much flexibility you have in timing.",
  },
  {
    slug: "tyre-pressures",
    category: "tyres",
    title: "Check tyre pressures regularly",
    whatToDo: "Check your tyre pressures regularly against the manufacturer's recommended pressures, usually found in your vehicle handbook or on the sticker on the driver's door pillar or fuel filler flap. Check pressures when tyres are cold where possible, for the most accurate reading.",
    whyItWorks: "Under-inflated tyres increase rolling resistance, meaning the engine has to work harder to move the car the same distance.",
    howMuchItMayHelp: "The effect depends on how under-inflated the tyres were to begin with. Correctly inflated tyres also improve safety, handling, and tyre wear.",
    assumptions: "Always use your vehicle's specified pressure. Never increase pressure beyond manufacturer guidance in an attempt to save more fuel, as this can affect grip, braking, and ride safety.",
  },
  {
    slug: "wheel-alignment",
    category: "tyres",
    title: "Maintain correct wheel alignment",
    whatToDo: "Have your wheel alignment checked where necessary, for example after hitting a pothole or kerb, or if you notice uneven tyre wear or the vehicle pulling to one side.",
    whyItWorks: "Misaligned wheels can increase rolling resistance and cause tyres to drag slightly rather than roll freely, which can increase fuel consumption as well as wearing tyres unevenly.",
    howMuchItMayHelp: "The effect depends on how far out of alignment the wheels are. This is best diagnosed and corrected by a garage rather than estimated at home.",
    assumptions: "Not something to check or adjust without the right equipment. This is a job for a garage.",
  },
  {
    slug: "remove-weight",
    category: "weight-aero",
    title: "Remove unnecessary heavy items",
    whatToDo: "Take unnecessary heavy items out of the boot or cabin rather than carrying them around permanently.",
    whyItWorks: "A heavier vehicle takes more energy to accelerate and to maintain speed, especially on hilly routes or in stop-start driving.",
    howMuchItMayHelp: "The effect is generally small for typical household items, but can add up for consistently heavy loads (e.g. tools, equipment) carried on every journey.",
    assumptions: "Only remove items you don't actually need for the journey. Don't compromise on safety equipment.",
  },
  {
    slug: "roof-equipment",
    category: "weight-aero",
    title: "Remove unused roof racks and boxes",
    whatToDo: "Take off roof boxes, roof bars, or bike racks when they're not in use.",
    whyItWorks: "Roof-mounted equipment increases aerodynamic drag, which the engine has to overcome. This effect grows with speed, so it matters most on motorways and dual carriageways.",
    howMuchItMayHelp: "The impact varies with the size and shape of the equipment and your typical driving speed; it's generally more noticeable at higher, sustained speeds than in slow urban driving.",
    assumptions: "Varies by equipment size, vehicle shape, and typical speed.",
  },
  {
    slug: "air-conditioning",
    category: "air-conditioning",
    title: "Use air conditioning intelligently",
    whatToDo: "Be mindful that air conditioning and other electrical loads use engine energy, but always prioritise comfort, safety, and clear visibility.",
    whyItWorks: "Running the air conditioning compressor draws power from the engine, which can slightly increase fuel consumption, particularly at low speeds. Modern vehicles manage electrical loads (lighting, heating, infotainment, hybrid/electric systems) differently, so the effect is not identical across all vehicles.",
    howMuchItMayHelp: "The effect is generally modest and varies with outside temperature, how hard the system is working, and the vehicle. We do not exaggerate this effect: for most journeys it is a secondary consideration next to driving style and maintenance.",
    assumptions: "Never avoid using air conditioning or demisting functions for fuel-saving reasons where they're needed for clear visibility or safety.",
  },
];
