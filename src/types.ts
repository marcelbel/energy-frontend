export type EnergyMixResponse = {
  date: string;
  generationMix: Record<string, number>;
  cleanEnergyPercentage: number;
};

export type ChargingWindowResponse = {
  start: string;
  end: string;
  cleanEnergyPercentage: number;
};