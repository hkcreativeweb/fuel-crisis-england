export type MaintenanceItem = {
  title: string;
  detail: string;
};

export const maintenanceItems: MaintenanceItem[] = [
  { title: "Regular servicing", detail: "Follow your manufacturer's recommended service schedule — servicing intervals are usually stated in time and/or mileage." },
  { title: "Correct engine oil", detail: "Use the oil specification (grade and standard) stated in your handbook, not just any oil that fits." },
  { title: "Air filter", detail: "Have the air filter checked and replaced when required — a restricted filter can make the engine work harder." },
  { title: "Fuel-system maintenance", detail: "Have the fuel system checked where appropriate, particularly if you notice rough running, reduced power, or warning lights." },
  { title: "Tyre pressures", detail: "Check regularly against the manufacturer's recommended pressures, ideally when tyres are cold." },
  { title: "Wheel alignment", detail: "Have this checked if you notice uneven tyre wear, the vehicle pulling to one side, or after hitting a pothole or kerb." },
  { title: "Brakes", detail: "Have brakes checked as part of routine servicing — dragging brakes can increase fuel consumption as well as being a safety issue." },
  { title: "Warning lights", detail: "Don't ignore dashboard warning lights — some, like the engine management light, can indicate a fault that is actively reducing fuel efficiency." },
];

export const servicingKeyMessage =
  "A well-maintained vehicle is more likely to operate efficiently than a poorly maintained vehicle, and regular servicing can also identify faults before they become more expensive.";
