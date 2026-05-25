import type { CalculatorScenarioChartPoint } from "@/features/calculator/types";

export const scenarioChartPoints: readonly CalculatorScenarioChartPoint[] = [
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

export const timelineStartDate = new Date(2016, 0, 1);
export const timelineEndDate = new Date(2025, 11, 31);
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

export function chartXFromProgress(progress: number) {
  const plotStart = scenarioChartPoints[0].x;
  const plotEnd = scenarioChartPoints[scenarioChartPoints.length - 1].x;

  return plotStart + ((plotEnd - plotStart) * progress) / 100;
}

export function chartYAtX(x: number) {
  for (let index = 0; index < scenarioChartPoints.length - 1; index += 1) {
    const current = scenarioChartPoints[index];
    const next = scenarioChartPoints[index + 1];

    if (x >= current.x && x <= next.x) {
      const segmentProgress = (x - current.x) / (next.x - current.x);

      return current.y + (next.y - current.y) * segmentProgress;
    }
  }

  return scenarioChartPoints[scenarioChartPoints.length - 1].y;
}

export function progressFromChartX(x: number) {
  const plotStart = scenarioChartPoints[0].x;
  const plotEnd = scenarioChartPoints[scenarioChartPoints.length - 1].x;

  return ((x - plotStart) / (plotEnd - plotStart)) * 100;
}

export function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function getDateTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function clampDate(date: Date) {
  const dateTime = getDateTime(date);
  const minTime = getDateTime(timelineStartDate);
  const maxTime = getDateTime(timelineEndDate);

  return new Date(Math.min(maxTime, Math.max(minTime, dateTime)));
}

export function dateToProgress(date: Date) {
  const minTime = getDateTime(timelineStartDate);
  const maxTime = getDateTime(timelineEndDate);
  const clampedTime = getDateTime(clampDate(date));

  return ((clampedTime - minTime) / (maxTime - minTime)) * 100;
}

export function progressToDate(progress: number) {
  const minTime = getDateTime(timelineStartDate);
  const maxTime = getDateTime(timelineEndDate);
  const nextTime = minTime + ((maxTime - minTime) * clampProgress(progress)) / 100;

  return new Date(nextTime);
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function createSafeDate(year: number, month: number, day: number) {
  const safeDay = Math.min(day, getDaysInMonth(year, month));

  return clampDate(new Date(year, month, safeDay));
}

export function shiftDatePart(date: Date, part: DatePart, direction: number) {
  const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (part === "day") {
    nextDate.setDate(nextDate.getDate() + direction);
    return clampDate(nextDate);
  }

  if (part === "month") {
    return createSafeDate(
      nextDate.getFullYear(),
      nextDate.getMonth() + direction,
      nextDate.getDate(),
    );
  }

  return createSafeDate(
    nextDate.getFullYear() + direction,
    nextDate.getMonth(),
    nextDate.getDate(),
  );
}

export function formatShortDate(date: Date) {
  return `${monthLabels[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
}
