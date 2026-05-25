import type {
  CalculatorScenarioStep,
  InvestmentPreset,
} from "@/features/calculator/types";
import {
  getCalculatorScenarioSteps,
  getDefaultCalculatorScenarioAsset,
} from "@/features/calculator/lib/assets";

export const selectedScenarioAsset = getDefaultCalculatorScenarioAsset();

export const calculatorScenarioSteps: CalculatorScenarioStep[] =
  getCalculatorScenarioSteps(selectedScenarioAsset);

export const investmentPresets: InvestmentPreset[] = [
  { id: "100", label: "$100", value: 100 },
  { id: "500", label: "$500", value: 500 },
  { id: "1000", label: "$1k", value: 1000 },
  { id: "5000", label: "$5k", value: 5000 },
  { id: "10000", label: "$10k", value: 10000 },
];
