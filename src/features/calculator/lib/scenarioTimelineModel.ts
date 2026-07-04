import type { CalculatorAssetHistoryPoint, CalculatorScenarioChartPoint } from "@/features/calculator/types";

const chartPlotStart = 6;
const chartPlotEnd = 96;
const chartTop = 13;
const chartBottom = 79;

export const minimumRangeProgress = 0.35;

export const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type DatePart = "day" | "month" | "year";
export type ScenarioRangePresetId = "1Y" | "2Y" | "3Y" | "5Y" | "ALL";

export type ScenarioRangePreset = {
  id: ScenarioRangePresetId;
  label: ScenarioRangePresetId;
  years: number | null;
};

export type ScenarioTimelineModel = {
  chartPoints: readonly CalculatorScenarioChartPoint[];
  timelineStartDate: Date;
  timelineEndDate: Date;
  yearLabels: string[];
  priceAxisLabels: string[];
};

const scenarioRangePresets: readonly ScenarioRangePreset[] = [
  { id: "1Y", label: "1Y", years: 1 },
  { id: "2Y", label: "2Y", years: 2 },
  { id: "3Y", label: "3Y", years: 3 },
  { id: "5Y", label: "5Y", years: 5 },
  { id: "ALL", label: "ALL", years: null },
] as const;

const fallbackChartPoints: readonly CalculatorScenarioChartPoint[] = [
  { x: 6, y: 79 },
  { x: 14, y: 77 },
  { x: 22, y: 72 },
  { x: 29, y: 61 },
  { x: 34, y: 55 },
  { x: 40, y: 64 },
  { x: 46, y: 58 },
  { x: 52, y: 54 },
  { x: 59, y: 50 },
  { x: 65, y: 43 },
  { x: 71, y: 46 },
  { x: 77, y: 36 },
  { x: 84, y: 31 },
  { x: 91, y: 21 },
  { x: 96, y: 13 },
] as const;

function parseDateOnly(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

function formatDateOnly(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function sampleHistory(
  history: CalculatorAssetHistoryPoint[],
  sampleCount: number,
) {
  if (history.length <= sampleCount) {
    return history;
  }

  return Array.from({ length: sampleCount }, (_, index) => {
    const ratio = sampleCount === 1 ? 0 : index / (sampleCount - 1);
    const sampledIndex = Math.round(ratio * (history.length - 1));
    return history[sampledIndex];
  });
}

function buildYearLabels(startDate: Date, endDate: Date) {
  const labels: string[] = [];

  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year += 1) {
    labels.push(String(year));
  }

  if (labels.length <= 10) {
    return labels;
  }

  return Array.from({ length: 10 }, (_, index) => {
    const ratio = index / 9;
    const sampledIndex = Math.round(ratio * (labels.length - 1));
    return labels[sampledIndex];
  });
}

function formatPriceAxisLabel(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "--";
  }

  const maximumFractionDigits =
    value >= 1000 ? 0 : value >= 1 ? 2 : value >= 0.01 ? 4 : 6;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(value);
}

function buildPriceAxisLabels(minPrice: number, maxPrice: number) {
  if (!Number.isFinite(minPrice) || !Number.isFinite(maxPrice) || minPrice <= 0 || maxPrice <= 0) {
    return ["--", "", "", "--"];
  }

  if (Math.abs(maxPrice - minPrice) < 0.0000001) {
    const label = formatPriceAxisLabel(maxPrice);
    return [label, "", "", label];
  }

  const minLog = Math.log(minPrice);
  const maxLog = Math.log(maxPrice);
  const logRange = maxLog - minLog;

  return Array.from({ length: 4 }, (_, index) => {
    const ratio = index / 3;
    return formatPriceAxisLabel(Math.exp(maxLog - ratio * logRange));
  });
}

export function buildScenarioTimeline(history: CalculatorAssetHistoryPoint[]) {
  if (!history.length) {
    return {
      chartPoints: fallbackChartPoints,
      timelineStartDate: new Date(2016, 0, 1),
      timelineEndDate: new Date(2025, 11, 31),
      yearLabels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
      priceAxisLabels: ["--", "", "", "--"],
    } satisfies ScenarioTimelineModel;
  }

  const sampledHistory = sampleHistory(history, Math.min(15, history.length));
  const closePrices = history
    .map((point) => Number(point.closePrice))
    .filter((value) => Number.isFinite(value) && value > 0);

  const minLog = closePrices.length ? Math.min(...closePrices.map((value) => Math.log(value))) : 0;
  const maxLog = closePrices.length ? Math.max(...closePrices.map((value) => Math.log(value))) : 1;
  const logRange = maxLog - minLog || 1;

  const chartPoints = sampledHistory.map((point, index) => {
    const numericClosePrice = Number(point.closePrice);
    const normalized =
      Number.isFinite(numericClosePrice) && numericClosePrice > 0
        ? (Math.log(numericClosePrice) - minLog) / logRange
        : 0.5;

    return {
      x:
        sampledHistory.length === 1
          ? (chartPlotStart + chartPlotEnd) / 2
          : chartPlotStart +
            ((chartPlotEnd - chartPlotStart) * index) / (sampledHistory.length - 1),
      y: chartBottom - normalized * (chartBottom - chartTop),
    };
  });

  const timelineStartDate = parseDateOnly(history[0].date);
  const timelineEndDate = parseDateOnly(history[history.length - 1].date);

  return {
    chartPoints,
    timelineStartDate,
    timelineEndDate,
    yearLabels: buildYearLabels(timelineStartDate, timelineEndDate),
    priceAxisLabels: buildPriceAxisLabels(Math.min(...closePrices), Math.max(...closePrices)),
  } satisfies ScenarioTimelineModel;
}

export function getDateTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function clampDate(date: Date, timeline: ScenarioTimelineModel) {
  const dateTime = getDateTime(date);
  const minTime = getDateTime(timeline.timelineStartDate);
  const maxTime = getDateTime(timeline.timelineEndDate);

  return new Date(Math.min(maxTime, Math.max(minTime, dateTime)));
}

export function dateToProgress(date: Date, timeline: ScenarioTimelineModel) {
  const minTime = getDateTime(timeline.timelineStartDate);
  const maxTime = getDateTime(timeline.timelineEndDate);
  const clampedTime = getDateTime(clampDate(date, timeline));

  return ((clampedTime - minTime) / Math.max(1, maxTime - minTime)) * 100;
}

export function progressToDate(progress: number, timeline: ScenarioTimelineModel) {
  const minTime = getDateTime(timeline.timelineStartDate);
  const maxTime = getDateTime(timeline.timelineEndDate);
  const nextTime = minTime + ((maxTime - minTime) * clampProgress(progress)) / 100;

  return new Date(nextTime);
}

export function chartXFromProgress(progress: number, timeline: ScenarioTimelineModel) {
  const plotStart = timeline.chartPoints[0]?.x ?? chartPlotStart;
  const plotEnd = timeline.chartPoints[timeline.chartPoints.length - 1]?.x ?? chartPlotEnd;

  return plotStart + ((plotEnd - plotStart) * progress) / 100;
}

export function chartYAtX(x: number, timeline: ScenarioTimelineModel) {
  for (let index = 0; index < timeline.chartPoints.length - 1; index += 1) {
    const current = timeline.chartPoints[index];
    const next = timeline.chartPoints[index + 1];

    if (x >= current.x && x <= next.x) {
      const segmentProgress = (x - current.x) / Math.max(0.0001, next.x - current.x);
      return current.y + (next.y - current.y) * segmentProgress;
    }
  }

  return timeline.chartPoints[timeline.chartPoints.length - 1]?.y ?? chartBottom;
}

export function progressFromChartX(x: number, timeline: ScenarioTimelineModel) {
  const plotStart = timeline.chartPoints[0]?.x ?? chartPlotStart;
  const plotEnd = timeline.chartPoints[timeline.chartPoints.length - 1]?.x ?? chartPlotEnd;

  return ((x - plotStart) / Math.max(0.0001, plotEnd - plotStart)) * 100;
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function createSafeDate(
  year: number,
  month: number,
  day: number,
  timeline: ScenarioTimelineModel,
) {
  const safeDay = Math.min(day, getDaysInMonth(year, month));

  return clampDate(new Date(year, month, safeDay), timeline);
}

export function shiftDatePart(
  date: Date,
  part: DatePart,
  direction: number,
  timeline: ScenarioTimelineModel,
) {
  const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (part === "day") {
    nextDate.setDate(nextDate.getDate() + direction);
    return clampDate(nextDate, timeline);
  }

  if (part === "month") {
    return createSafeDate(
      nextDate.getFullYear(),
      nextDate.getMonth() + direction,
      nextDate.getDate(),
      timeline,
    );
  }

  return createSafeDate(
    nextDate.getFullYear() + direction,
    nextDate.getMonth(),
    nextDate.getDate(),
    timeline,
  );
}

export function formatShortDate(date: Date) {
  return `${monthLabels[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function getDefaultScenarioDates(timeline: ScenarioTimelineModel) {
  const endDate = timeline.timelineEndDate;
  const startCandidate = new Date(endDate.getFullYear() - 3, endDate.getMonth(), endDate.getDate());

  return {
    startDate: clampDate(startCandidate, timeline),
    endDate,
  };
}

export function getAvailableScenarioRangePresets(timeline: ScenarioTimelineModel) {
  const totalDays = Math.max(
    1,
    Math.round(
      (getDateTime(timeline.timelineEndDate) - getDateTime(timeline.timelineStartDate)) / 86400000,
    ),
  );

  return scenarioRangePresets.filter((preset) => {
    if (preset.years === null) {
      return true;
    }

    return totalDays >= preset.years * 365 - 30;
  });
}

export function getScenarioDatesForRangePreset(
  presetId: ScenarioRangePresetId,
  timeline: ScenarioTimelineModel,
) {
  const endDate = timeline.timelineEndDate;

  if (presetId === "ALL") {
    return {
      startDate: timeline.timelineStartDate,
      endDate,
    };
  }

  const preset = scenarioRangePresets.find((item) => item.id === presetId);

  if (!preset?.years) {
    return {
      startDate: timeline.timelineStartDate,
      endDate,
    };
  }

  return {
    startDate: clampDate(
      new Date(endDate.getFullYear() - preset.years, endDate.getMonth(), endDate.getDate()),
      timeline,
    ),
    endDate,
  };
}

export function getActiveScenarioRangePresetId(
  startDate: Date,
  endDate: Date,
  timeline: ScenarioTimelineModel,
) {
  if (getDateTime(endDate) !== getDateTime(timeline.timelineEndDate)) {
    return null;
  }

  const availablePresets = getAvailableScenarioRangePresets(timeline);

  for (const preset of availablePresets) {
    const presetDates = getScenarioDatesForRangePreset(preset.id, timeline);

    if (getDateTime(presetDates.startDate) === getDateTime(startDate)) {
      return preset.id;
    }
  }

  return null;
}

export function dateOnlyFromIso(value: string) {
  return parseDateOnly(value);
}

export function isoDateFromDate(date: Date) {
  return formatDateOnly(date);
}
