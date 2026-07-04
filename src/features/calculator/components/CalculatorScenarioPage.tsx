"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { assetSelectionAssets } from "@/features/calculator/data/assetSelection";
import { getDefaultCalculatorScenarioAsset } from "@/features/calculator/lib/assets";
import { ArrowIcon } from "@/features/calculator/components/scenario/ArrowIcon";
import {
  AssetControl,
  InvestmentControls,
} from "@/features/calculator/components/scenario/ScenarioControls";
import { ScenarioPreviewPanel } from "@/features/calculator/components/scenario/ScenarioPreviewPanel";
import { ScenarioTopBar } from "@/features/calculator/components/scenario/ScenarioTopBar";
import {
  calculateScenarioResult,
  createPendingScenarioResult,
} from "@/features/calculator/lib/scenarioResult";
import {
  buildScenarioTimeline,
  chartXFromProgress,
  chartYAtX,
  clampProgress,
  dateToProgress,
  formatShortDate,
  getActiveScenarioRangePresetId,
  getAvailableScenarioRangePresets,
  getDefaultScenarioDates,
  getScenarioDatesForRangePreset,
  isoDateFromDate,
  minimumRangeProgress,
  monthLabels,
  progressFromChartX,
  progressToDate,
  shiftDatePart,
  type DatePart,
  type ScenarioRangePresetId,
  type ScenarioTimelineModel,
} from "@/features/calculator/lib/scenarioTimelineModel";
import type {
  CalculatorAssetHistoryPoint,
  CalculatorScenarioAsset,
} from "@/features/calculator/types";

function formatChartPriceLabel(value: string | null) {
  const numericValue = Number(value ?? "");

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return "--";
  }

  const maximumFractionDigits =
    numericValue >= 1000 ? 0 : numericValue >= 1 ? 2 : numericValue >= 0.01 ? 4 : 6;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(numericValue);
}

function findHistoryPointForDate(
  history: CalculatorAssetHistoryPoint[],
  date: Date,
) {
  const targetDate = isoDateFromDate(date);
  let selectedPoint = history[0] ?? null;

  for (const point of history) {
    if (point.date > targetDate) {
      break;
    }

    selectedPoint = point;
  }

  return selectedPoint ?? history[history.length - 1] ?? null;
}

function MarketChartModule({
  history,
  timeline,
  isDataReady,
  startDate,
  endDate,
  activeRangePresetId,
  onRangePresetSelect,
  onStartDateChange,
  onEndDateChange,
}: {
  history: CalculatorAssetHistoryPoint[];
  timeline: ScenarioTimelineModel;
  isDataReady: boolean;
  startDate: Date;
  endDate: Date;
  activeRangePresetId: ScenarioRangePresetId | null;
  onRangePresetSelect: (presetId: ScenarioRangePresetId) => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const safeStart = dateToProgress(startDate, timeline);
  const safeEnd = dateToProgress(endDate, timeline);
  const startChartX = chartXFromProgress(safeStart, timeline);
  const endChartX = chartXFromProgress(safeEnd, timeline);
  const chartLinePoints = timeline.chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const chartAreaPoints = `${chartLinePoints} 96,100 6,100`;
  const chartStartX = timeline.chartPoints[0]?.x ?? 6;
  const chartEndX = timeline.chartPoints[timeline.chartPoints.length - 1]?.x ?? 96;
  const availableRangePresets = getAvailableScenarioRangePresets(timeline);
  const handles = [
    {
      id: "start-handle",
      label: "Start date position",
      x: startChartX,
      y: chartYAtX(startChartX, timeline),
      progress: safeStart,
      priceLabelClassName:
        "left-[calc(100%-0.1rem)] sm:left-[calc(100%-0.1rem)]",
      priceLabel: formatChartPriceLabel(
        findHistoryPointForDate(history, startDate)?.closePrice ?? null,
      ),
    },
    {
      id: "end-handle",
      label: "End date position",
      x: endChartX,
      y: chartYAtX(endChartX, timeline),
      progress: safeEnd,
      priceLabelClassName:
        "right-[calc(100%-0.1rem)] sm:right-[calc(100%-0.1rem)]",
      priceLabel: formatChartPriceLabel(
        findHistoryPointForDate(history, endDate)?.closePrice ?? null,
      ),
    },
  ];

  function getProgressFromPointer(clientX: number) {
    const slider = sliderRef.current;

    if (!slider) {
      return 0;
    }

    const bounds = slider.getBoundingClientRect();
    const xPercent = ((clientX - bounds.left) / bounds.width) * 100;

    return clampProgress(progressFromChartX(xPercent, timeline));
  }

  function updateHandlePosition(handle: "start" | "end", nextProgress: number) {
    if (handle === "start") {
      onStartDateChange(
        progressToDate(Math.min(nextProgress, safeEnd - minimumRangeProgress), timeline),
      );
      return;
    }

    onEndDateChange(
      progressToDate(Math.max(nextProgress, safeStart + minimumRangeProgress), timeline),
    );
  }

  function handleSliderPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!isDataReady) {
      return;
    }

    const nextProgress = getProgressFromPointer(event.clientX);
    const nearestHandle =
      Math.abs(nextProgress - safeStart) <= Math.abs(nextProgress - safeEnd)
        ? "start"
        : "end";

    updateHandlePosition(nearestHandle, nextProgress);
  }

  function handlePointerDown(
    handle: "start" | "end",
    event: PointerEvent<HTMLButtonElement>,
  ) {
    if (!isDataReady) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateHandlePosition(handle, getProgressFromPointer(event.clientX));
  }

  function handlePointerMove(
    handle: "start" | "end",
    event: PointerEvent<HTMLButtonElement>,
  ) {
    if (!isDataReady || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    updateHandlePosition(handle, getProgressFromPointer(event.clientX));
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleKeyDown(
    handle: "start" | "end",
    event: KeyboardEvent<HTMLButtonElement>,
  ) {
    if (!isDataReady) {
      return;
    }

    const step = event.shiftKey ? 5 : 1;
    const direction =
      event.key === "ArrowRight" || event.key === "ArrowUp"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowDown"
          ? -1
          : 0;

    if (direction === 0) {
      return;
    }

    event.preventDefault();
    updateHandlePosition(
      handle,
      clampProgress((handle === "start" ? safeStart : safeEnd) + direction * step),
    );
  }

  return (
    <section className="mt-2.5 flex min-h-0 flex-1 flex-col rounded-[1rem] border border-[color:var(--color-border-ui-subtle)] bg-white/88 p-3 shadow-[0_14px_30px_rgba(24,24,27,0.035)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="type-title text-[0.9rem] font-semibold text-zinc-950">
            Choose your time in the market
          </h2>
          <p className="mt-0.5 text-[0.66rem] text-[var(--color-text-ui-soft)]">
            Drag the handles or use the wheels to pick your start and end dates.
          </p>
        </div>
        <div className="flex items-center gap-1 overflow-hidden rounded-[0.6rem] border border-[color:var(--color-border-ui-subtle)] p-0.5 text-[0.6rem] font-semibold text-zinc-600">
          {availableRangePresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              disabled={!isDataReady}
              onClick={() => onRangePresetSelect(preset.id)}
              className={`min-h-6 rounded-[0.45rem] px-1.5 transition-colors ${
                activeRangePresetId === preset.id
                  ? "bg-[var(--color-brand)] text-white"
                  : "bg-white text-zinc-600"
              } ${isDataReady ? "" : "cursor-not-allowed opacity-60"}`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {!isDataReady ? (
        <div className="mt-2 rounded-[0.8rem] border border-[color:var(--color-border-ui-subtle)] bg-[var(--color-surface-ui-muted)] px-3 py-2 text-[0.68rem] text-[var(--color-text-ui-soft)]">
          Historical price data is still syncing for this asset. The chart will unlock as
          soon as the first history batch is available.
        </div>
      ) : null}

      <div className="relative mt-3.5 min-h-[8.3rem] flex-1 overflow-x-clip overflow-y-visible rounded-[0.8rem] bg-[linear-gradient(180deg,#ffffff_0%,#fbf9ff_100%)]">
        <div className="absolute inset-y-3 left-0 z-10 w-16 pr-2 text-right text-[0.56rem] text-[var(--color-text-ui-muted)]">
          {timeline.priceAxisLabels.map((tick, index) => (
            <span
              key={`${tick}-${index}`}
              className="absolute left-0"
              style={{ top: `${4 + index * 26}%` }}
            >
              {tick}
            </span>
          ))}
        </div>

        <div className="absolute inset-y-3 right-0 left-16">
          {[16, 42, 68, 94].map((top) => (
            <span
              key={top}
              className="absolute inset-x-0 border-t border-dashed border-[color:var(--color-border-ui-subtle)]"
              style={{ top: `${top}%` }}
            />
          ))}
        </div>

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="scenario-chart-fill" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(111,67,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <polygon points={chartAreaPoints} fill="url(#scenario-chart-fill)" />
          <polyline
            points={chartLinePoints}
            fill="none"
            stroke="rgba(124,58,237,0.14)"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={chartLinePoints}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {handles.map((handle) => (
          <div
            key={`${handle.id}-chart`}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${handle.x}%`, top: `${handle.y}%` }}
          >
            <div
              className={`pointer-events-none absolute bottom-[calc(100%+0.38rem)] whitespace-nowrap rounded-full border border-[color:var(--color-brand-border)] bg-white/96 px-2 py-0.5 text-[0.58rem] font-semibold text-[var(--color-brand-strong)] shadow-[0_10px_18px_rgba(111,67,255,0.14)] ${handle.priceLabelClassName}`}
            >
              {handle.priceLabel}
            </div>
            <button
              type="button"
              role="slider"
              aria-label={handle.label}
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(handle.progress)}
              aria-disabled={!isDataReady}
              className={`grid h-7 w-7 touch-none place-items-center rounded-full border-2 border-[var(--color-brand)] bg-white shadow-[0_8px_18px_rgba(111,67,255,0.2)] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] ${
                isDataReady
                  ? "cursor-grab active:scale-105 active:cursor-grabbing"
                  : "cursor-not-allowed opacity-60"
              }`}
              onPointerDown={(event) =>
                handlePointerDown(handle.id === "start-handle" ? "start" : "end", event)
              }
              onPointerMove={(event) =>
                handlePointerMove(handle.id === "start-handle" ? "start" : "end", event)
              }
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={(event) =>
                handleKeyDown(handle.id === "start-handle" ? "start" : "end", event)
              }
            >
              <span className="pointer-events-none h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
            </button>
          </div>
        ))}

        <div className="absolute inset-x-9 bottom-2 flex justify-between text-[0.56rem] text-[var(--color-text-ui-muted)]">
          {timeline.yearLabels.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
      </div>

      <div
        ref={sliderRef}
        className="relative mt-1.5 h-[2rem] touch-none overflow-x-hidden overflow-y-visible"
        onPointerDown={handleSliderPointerDown}
      >
        <div
          className="absolute top-2.5 h-1.5 rounded-full bg-[var(--color-brand-soft-strong)]"
          style={{ left: `${chartStartX}%`, right: `${100 - chartEndX}%` }}
        />
        <div
          className="absolute top-2.5 h-1.5 rounded-full bg-[var(--color-brand)]"
          style={{ left: `${startChartX}%`, right: `${100 - endChartX}%` }}
        />
        {handles.map((handle) => (
          <button
            key={handle.id}
            type="button"
            role="slider"
            aria-label={handle.label}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(handle.progress)}
            aria-disabled={!isDataReady}
            className={`absolute -top-1 grid h-8 w-8 -translate-x-1/2 touch-none place-items-center rounded-full border-2 border-[var(--color-brand)] bg-white shadow-[0_10px_20px_rgba(111,67,255,0.2)] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] ${
              isDataReady
                ? "cursor-grab active:scale-105 active:cursor-grabbing"
                : "cursor-not-allowed opacity-60"
            }`}
            style={{ left: `${handle.x}%` }}
            onPointerDown={(event) =>
              handlePointerDown(handle.id === "start-handle" ? "start" : "end", event)
            }
            onPointerMove={(event) =>
              handlePointerMove(handle.id === "start-handle" ? "start" : "end", event)
            }
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={(event) =>
              handleKeyDown(handle.id === "start-handle" ? "start" : "end", event)
            }
          >
            <span className="pointer-events-none h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
          </button>
        ))}
        <div className="absolute inset-x-0 bottom-0 flex justify-between text-[0.58rem] text-[var(--color-text-ui-soft)]">
          <span className="rounded-full border border-[color:var(--color-border-ui-subtle)] bg-white px-2 py-0.5">
            {formatShortDate(startDate)}
          </span>
          <span className="rounded-full border border-[color:var(--color-border-ui-subtle)] bg-white px-2 py-0.5">
            {formatShortDate(endDate)}
          </span>
        </div>
      </div>
    </section>
  );
}

function DateWheel({
  timeline,
  isDataReady,
  title,
  date,
  onDateChange,
}: {
  timeline: ScenarioTimelineModel;
  isDataReady: boolean;
  title: string;
  date: Date;
  onDateChange: (date: Date) => void;
}) {
  const dayItems = [-2, -1, 0, 1, 2].map((offset) => ({
    id: `day-${offset}`,
    offset,
    label: String(shiftDatePart(date, "day", offset, timeline).getDate()),
  }));
  const monthItems = [-2, -1, 0, 1, 2].map((offset) => {
    const itemDate = shiftDatePart(date, "month", offset, timeline);

    return {
      id: `month-${offset}`,
      offset,
      label: monthLabels[itemDate.getMonth()],
    };
  });
  const yearItems = [-2, -1, 0, 1, 2].map((offset) => ({
    id: `year-${offset}`,
    offset,
    label: String(shiftDatePart(date, "year", offset, timeline).getFullYear()),
  }));
  const dayWheelRef = useRef<HTMLDivElement>(null);
  const monthWheelRef = useRef<HTMLDivElement>(null);
  const yearWheelRef = useRef<HTMLDivElement>(null);

  function updateDatePart(part: DatePart, offset: number) {
    if (!isDataReady || offset === 0) {
      return;
    }

    onDateChange(shiftDatePart(date, part, offset, timeline));
  }

  useEffect(() => {
    if (!isDataReady) {
      return;
    }

    const wheelBindings = [
      { ref: dayWheelRef, part: "day" as const },
      { ref: monthWheelRef, part: "month" as const },
      { ref: yearWheelRef, part: "year" as const },
    ];

    const cleanups = wheelBindings
      .map(({ ref, part }) => {
        const element = ref.current;

        if (!element) {
          return null;
        }

        const handleWheelEvent = (event: WheelEvent) => {
          event.preventDefault();
          event.stopPropagation();
          onDateChange(
            shiftDatePart(date, part, event.deltaY > 0 ? 1 : -1, timeline),
          );
        };

        element.addEventListener("wheel", handleWheelEvent, { passive: false });

        return () => {
          element.removeEventListener("wheel", handleWheelEvent);
        };
      })
      .filter((cleanup): cleanup is () => void => cleanup !== null);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [date, isDataReady, onDateChange, timeline]);

  function renderWheelColumn(
    ref: RefObject<HTMLDivElement | null>,
    part: DatePart,
    items: Array<{ id: string; offset: number; label: string }>,
  ) {
    return (
      <div
        ref={ref}
        className={`grid py-1 overscroll-contain select-none touch-none ${
          isDataReady ? "" : "opacity-60"
        }`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={!isDataReady}
            onClick={() => updateDatePart(part, item.offset)}
            className={`relative z-10 grid min-h-[1rem] place-items-center ${
              item.offset === 0 ? "font-semibold text-[var(--color-brand)]" : ""
            } ${isDataReady ? "" : "cursor-not-allowed"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <section className="min-w-0">
      <div className="mb-1 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
        <h3 className="type-title text-[0.72rem] font-semibold text-zinc-950">{title}</h3>
      </div>
      <div className="relative grid h-[5.55rem] grid-cols-[0.75fr_1.1fr_0.9fr] overflow-hidden rounded-[0.75rem] bg-white/30 text-center text-[0.66rem] text-[var(--color-text-ui-soft)] overscroll-contain">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[1.625rem] -translate-y-1/2 rounded-[0.7rem] bg-[var(--color-brand-soft)]/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]" />
        {renderWheelColumn(dayWheelRef, "day", dayItems)}
        {renderWheelColumn(monthWheelRef, "month", monthItems)}
        {renderWheelColumn(yearWheelRef, "year", yearItems)}
      </div>
    </section>
  );
}

function DateWheelModule({
  timeline,
  isDataReady,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  timeline: ScenarioTimelineModel;
  isDataReady: boolean;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}) {
  return (
    <section className="mt-2.5 grid gap-2.5 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <DateWheel
        timeline={timeline}
        isDataReady={isDataReady}
        title="Start Date"
        date={startDate}
        onDateChange={onStartDateChange}
      />
      <button
        type="button"
        aria-label="Swap dates"
        className="mx-auto hidden h-8 w-8 place-items-center rounded-full border border-[color:var(--color-border-ui-subtle)] bg-white text-[var(--color-brand)] shadow-[0_10px_22px_rgba(24,24,27,0.04)] md:grid"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 7h8" />
          <path d="m11 4 3 3-3 3" />
          <path d="M14 13H6" />
          <path d="m9 10-3 3 3 3" />
        </svg>
      </button>
      <DateWheel
        timeline={timeline}
        isDataReady={isDataReady}
        title="End Date"
        date={endDate}
        onDateChange={onEndDateChange}
      />
    </section>
  );
}

function LeftScenarioBuilder({
  asset,
  history,
  timeline,
  isDataReady,
  amount,
  onAmountChange,
  startDate,
  endDate,
  activeRangePresetId,
  onRangePresetSelect,
  onStartDateChange,
  onEndDateChange,
  onCalculate,
}: {
  asset: CalculatorScenarioAsset;
  history: CalculatorAssetHistoryPoint[];
  timeline: ScenarioTimelineModel;
  isDataReady: boolean;
  amount: string;
  onAmountChange: (amount: string) => void;
  startDate: Date;
  endDate: Date;
  activeRangePresetId: ScenarioRangePresetId | null;
  onRangePresetSelect: (presetId: ScenarioRangePresetId) => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onCalculate: () => void;
}) {
  function handleStartDateChange(nextDate: Date) {
    const nextProgress = dateToProgress(nextDate, timeline);
    const endProgress = dateToProgress(endDate, timeline);

    onStartDateChange(
      progressToDate(
        Math.min(nextProgress, endProgress - minimumRangeProgress),
        timeline,
      ),
    );
  }

  function handleEndDateChange(nextDate: Date) {
    const nextProgress = dateToProgress(nextDate, timeline);
    const startProgress = dateToProgress(startDate, timeline);

    onEndDateChange(
      progressToDate(
        Math.max(nextProgress, startProgress + minimumRangeProgress),
        timeline,
      ),
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col rounded-[1.45rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,247,255,0.94)_100%)] p-4 shadow-[0_22px_54px_rgba(24,24,27,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="type-title flex items-center gap-2 text-[1.24rem] font-semibold text-zinc-950">
            <span className="text-[var(--color-brand)]">*</span>
            Build your regret scenario
          </h1>
          <p className="mt-0.5 text-[0.78rem] leading-5 text-[var(--color-text-ui-soft)]">
            Set your investment and the time range you wish you had.
          </p>
        </div>
        <AssetControl asset={asset} />
      </div>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col">
        <InvestmentControls amount={amount} onAmountChange={onAmountChange} />
        <MarketChartModule
          history={history}
          timeline={timeline}
          isDataReady={isDataReady}
          startDate={startDate}
          endDate={endDate}
          activeRangePresetId={activeRangePresetId}
          onRangePresetSelect={onRangePresetSelect}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        <DateWheelModule
          timeline={timeline}
          isDataReady={isDataReady}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      </div>

      <button
        type="button"
        disabled={!isDataReady}
        onClick={onCalculate}
        className={`mt-2.5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[0.85rem] px-5 text-[0.84rem] font-semibold text-white ${
          isDataReady
            ? "bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] shadow-[0_14px_30px_rgba(111,67,255,0.24)]"
            : "cursor-not-allowed bg-zinc-300 shadow-none"
        }`}
      >
        <span>Calculate Your Regret</span>
        <ArrowIcon />
      </button>
      <p className="mt-1 text-center text-[0.64rem] text-[var(--color-text-ui-muted)]">
        {isDataReady
          ? "Past performance, pure regret."
          : "Waiting for historical price sync."}
      </p>
    </section>
  );
}

export function CalculatorScenarioPage({
  asset = getDefaultCalculatorScenarioAsset(assetSelectionAssets),
  history = [],
}: {
  asset?: CalculatorScenarioAsset;
  history?: CalculatorAssetHistoryPoint[];
}) {
  const previewPanelRef = useRef<HTMLDivElement>(null);
  const timeline = buildScenarioTimeline(history);
  const initialDates = getDefaultScenarioDates(timeline);
  const isDataReady = history.length > 1;
  const [amount, setAmount] = useState("1000");
  const [startDate, setStartDate] = useState(() => initialDates.startDate);
  const [endDate, setEndDate] = useState(() => initialDates.endDate);
  const [hasCalculated, setHasCalculated] = useState(false);
  const activeRangePresetId = getActiveScenarioRangePresetId(startDate, endDate, timeline);

  const scenarioResult = calculateScenarioResult({
    amount: Number(amount || "0"),
    startDate,
    endDate,
    history,
    timeline,
  });
  const previewResult =
    hasCalculated && isDataReady
      ? scenarioResult
      : createPendingScenarioResult(scenarioResult);

  function handleAmountChange(nextAmount: string) {
    setHasCalculated(false);
    setAmount(nextAmount);
  }

  function handleStartDateChange(nextDate: Date) {
    setHasCalculated(false);
    setStartDate(nextDate);
  }

  function handleEndDateChange(nextDate: Date) {
    setHasCalculated(false);
    setEndDate(nextDate);
  }

  function handleRangePresetSelect(presetId: ScenarioRangePresetId) {
    const nextDates = getScenarioDatesForRangePreset(presetId, timeline);
    setHasCalculated(false);
    setStartDate(nextDates.startDate);
    setEndDate(nextDates.endDate);
  }

  function scrollToPreviewPanel() {
    if (window.matchMedia("(min-width: 1280px)").matches) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        previewPanelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  function handleCalculate() {
    if (!isDataReady) {
      return;
    }

    setHasCalculated(true);
    scrollToPreviewPanel();
  }

  return (
    <main className="min-h-[calc(100dvh-4.5rem)] overflow-x-clip bg-[linear-gradient(180deg,#ffffff_0%,#faf8ff_100%)] text-zinc-950 xl:h-[calc(100dvh-4.5rem)] xl:min-h-0 xl:overflow-hidden">
      <section className="mx-auto max-w-[96rem] overflow-x-clip px-4 pt-0 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-8 xl:h-full xl:pb-4">
        <div className="grid gap-4 xl:h-full xl:grid-cols-[minmax(0,1fr)_30rem] xl:items-stretch">
          <div className="grid min-h-0 gap-3 xl:h-full xl:grid-rows-[auto_minmax(0,1fr)]">
            <ScenarioTopBar asset={asset} />
            <LeftScenarioBuilder
              asset={asset}
              history={history}
              timeline={timeline}
              isDataReady={isDataReady}
              amount={amount}
              onAmountChange={handleAmountChange}
              startDate={startDate}
              endDate={endDate}
              activeRangePresetId={activeRangePresetId}
              onRangePresetSelect={handleRangePresetSelect}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              onCalculate={handleCalculate}
            />
          </div>
          <div ref={previewPanelRef} className="scroll-mt-24">
            <ScenarioPreviewPanel asset={asset} result={previewResult} />
          </div>
        </div>
      </section>
    </main>
  );
}
