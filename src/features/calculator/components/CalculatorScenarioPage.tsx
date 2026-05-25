"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
  useRef,
  useState,
} from "react";
import { selectedScenarioAsset } from "@/features/calculator/data/calculationScenario";
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
  chartXFromProgress,
  chartYAtX,
  clampProgress,
  dateToProgress,
  formatShortDate,
  minimumRangeProgress,
  monthLabels,
  progressFromChartX,
  progressToDate,
  scenarioChartPoints,
  shiftDatePart,
  type DatePart,
} from "@/features/calculator/lib/scenarioTimeline";
import type { CalculatorScenarioAsset } from "@/features/calculator/types";

function MarketChartModule({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const safeStart = dateToProgress(startDate);
  const safeEnd = dateToProgress(endDate);
  const startChartX = chartXFromProgress(safeStart);
  const endChartX = chartXFromProgress(safeEnd);
  const chartLinePoints = scenarioChartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const chartAreaPoints = `${chartLinePoints} 96,100 6,100`;
  const chartMarkers = [
    { id: "start-dot", x: startChartX, y: chartYAtX(startChartX) },
    { id: "end-dot", x: endChartX, y: chartYAtX(endChartX) },
  ];
  const handles = [
    { id: "start-handle", label: "Start date position", x: startChartX, progress: safeStart },
    { id: "end-handle", label: "End date position", x: endChartX, progress: safeEnd },
  ];

  function getProgressFromPointer(clientX: number) {
    const slider = sliderRef.current;

    if (!slider) {
      return 0;
    }

    const bounds = slider.getBoundingClientRect();
    const xPercent = ((clientX - bounds.left) / bounds.width) * 100;

    return clampProgress(progressFromChartX(xPercent));
  }

  function updateHandlePosition(handle: "start" | "end", nextProgress: number) {
    if (handle === "start") {
      onStartDateChange(progressToDate(Math.min(nextProgress, safeEnd - minimumRangeProgress)));
      return;
    }

    onEndDateChange(progressToDate(Math.max(nextProgress, safeStart + minimumRangeProgress)));
  }

  function handleSliderPointerDown(event: PointerEvent<HTMLDivElement>) {
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
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateHandlePosition(handle, getProgressFromPointer(event.clientX));
  }

  function handlePointerMove(
    handle: "start" | "end",
    event: PointerEvent<HTMLButtonElement>,
  ) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
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
        <div className="grid grid-cols-5 overflow-hidden rounded-[0.6rem] border border-[color:var(--color-border-ui-subtle)] text-[0.6rem] font-semibold text-zinc-600">
          {["1Y", "2Y", "3Y", "5Y", "ALL"].map((range) => (
            <button
              key={range}
              type="button"
              className={`min-h-6 px-1.5 ${range === "3Y" ? "bg-[var(--color-brand)] text-white" : "bg-white"}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-1.5 min-h-[7.6rem] flex-1 overflow-hidden rounded-[0.8rem] bg-[linear-gradient(180deg,#ffffff_0%,#fbf9ff_100%)]">
        <div className="absolute inset-y-3 left-0 z-10 w-12 text-[0.56rem] text-[var(--color-text-ui-muted)]">
          {[
            { label: "$100K", top: 4 },
            { label: "$10K", top: 30 },
            { label: "$1K", top: 56 },
            { label: "$100", top: 82 },
          ].map((tick) => (
            <span key={tick.label} className="absolute left-0" style={{ top: `${tick.top}%` }}>
              {tick.label}
            </span>
          ))}
        </div>

        <div className="absolute inset-y-3 right-0 left-12">
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
            stroke="#7c3aed"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {chartMarkers.map((marker) => (
          <span
            key={marker.id}
            className="absolute z-20 grid h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--color-brand)] bg-white shadow-[0_8px_18px_rgba(111,67,255,0.2)]"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          >
            <span className="h-1.75 w-1.75 rounded-full bg-[var(--color-brand)]" />
          </span>
        ))}

        <div className="absolute inset-x-9 bottom-2 flex justify-between text-[0.56rem] text-[var(--color-text-ui-muted)]">
          {["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"].map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
      </div>

      <div
        ref={sliderRef}
        className="relative mt-1.5 h-[2rem] touch-none"
        onPointerDown={handleSliderPointerDown}
      >
        <div className="absolute top-2.5 h-1.5 rounded-full bg-[var(--color-brand-soft-strong)]" style={{ left: `${scenarioChartPoints[0].x}%`, right: `${100 - scenarioChartPoints[scenarioChartPoints.length - 1].x}%` }} />
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
            className="absolute top-0 grid h-6 w-6 -translate-x-1/2 touch-none place-items-center rounded-full border-2 border-[var(--color-brand)] bg-white shadow-[0_10px_20px_rgba(111,67,255,0.2)] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] active:scale-105"
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
            <span className="h-2 w-2 rounded-full bg-[var(--color-brand)]" />
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
  title,
  date,
  onDateChange,
}: {
  title: string;
  date: Date;
  onDateChange: (date: Date) => void;
}) {
  const dayItems = [-2, -1, 0, 1, 2].map((offset) => ({
    id: `day-${offset}`,
    offset,
    label: String(shiftDatePart(date, "day", offset).getDate()),
  }));
  const monthItems = [-2, -1, 0, 1, 2].map((offset) => {
    const itemDate = shiftDatePart(date, "month", offset);

    return {
      id: `month-${offset}`,
      offset,
      label: monthLabels[itemDate.getMonth()],
    };
  });
  const yearItems = [-2, -1, 0, 1, 2].map((offset) => ({
    id: `year-${offset}`,
    offset,
    label: String(shiftDatePart(date, "year", offset).getFullYear()),
  }));

  function updateDatePart(part: DatePart, offset: number) {
    if (offset === 0) {
      return;
    }

    onDateChange(shiftDatePart(date, part, offset));
  }

  function handleWheel(part: DatePart, event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    onDateChange(shiftDatePart(date, part, event.deltaY > 0 ? 1 : -1));
  }

  return (
    <section className="min-w-0">
      <div className="mb-1 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
        <h3 className="type-title text-[0.72rem] font-semibold text-zinc-950">{title}</h3>
      </div>
      <div className="relative grid h-[5.55rem] grid-cols-[0.75fr_1.1fr_0.9fr] overflow-hidden rounded-[0.75rem] bg-white/30 text-center text-[0.66rem] text-[var(--color-text-ui-soft)]">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[1.625rem] -translate-y-1/2 rounded-[0.7rem] bg-[var(--color-brand-soft)]/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]" />
        <div className="grid py-1" onWheel={(event) => handleWheel("day", event)}>
          {dayItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateDatePart("day", item.offset)}
              className={`relative z-10 grid place-items-center ${
                item.offset === 0 ? "font-semibold text-[var(--color-brand)]" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid py-1" onWheel={(event) => handleWheel("month", event)}>
          {monthItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateDatePart("month", item.offset)}
              className={`relative z-10 grid place-items-center ${
                item.offset === 0 ? "font-semibold text-[var(--color-brand)]" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid py-1" onWheel={(event) => handleWheel("year", event)}>
          {yearItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateDatePart("year", item.offset)}
              className={`relative z-10 grid place-items-center ${
                item.offset === 0 ? "font-semibold text-[var(--color-brand)]" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function DateWheelModule({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}) {
  return (
    <section className="mt-2.5 grid gap-2.5 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <DateWheel title="Start Date" date={startDate} onDateChange={onStartDateChange} />
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
      <DateWheel title="End Date" date={endDate} onDateChange={onEndDateChange} />
    </section>
  );
}

function LeftScenarioBuilder({
  asset,
  amount,
  onAmountChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onCalculate,
}: {
  asset: CalculatorScenarioAsset;
  amount: string;
  onAmountChange: (amount: string) => void;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onCalculate: () => void;
}) {
  function handleStartDateChange(nextDate: Date) {
    const nextProgress = dateToProgress(nextDate);
    const endProgress = dateToProgress(endDate);

    onStartDateChange(
      progressToDate(Math.min(nextProgress, endProgress - minimumRangeProgress)),
    );
  }

  function handleEndDateChange(nextDate: Date) {
    const nextProgress = dateToProgress(nextDate);
    const startProgress = dateToProgress(startDate);

    onEndDateChange(
      progressToDate(Math.max(nextProgress, startProgress + minimumRangeProgress)),
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col rounded-[1.45rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,247,255,0.94)_100%)] p-4 shadow-[0_22px_54px_rgba(24,24,27,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="type-title flex items-center gap-2 text-[1.24rem] font-semibold text-zinc-950">
            <span className="text-[var(--color-brand)]">✦</span>
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
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        <DateWheelModule
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      </div>

      <button
        type="button"
        onClick={onCalculate}
        className="mt-2.5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[0.85rem] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] px-5 text-[0.84rem] font-semibold text-white shadow-[0_14px_30px_rgba(111,67,255,0.24)]"
      >
        <span>Calculate Your Regret</span>
        <ArrowIcon />
      </button>
      <p className="mt-1 text-center text-[0.64rem] text-[var(--color-text-ui-muted)]">
        Past performance, pure regret.
      </p>
    </section>
  );
}

export function CalculatorScenarioPage({
  asset = selectedScenarioAsset,
}: {
  asset?: CalculatorScenarioAsset;
}) {
  const [amount, setAmount] = useState("1000");
  const [startDate, setStartDate] = useState(() => new Date(2020, 3, 12));
  const [endDate, setEndDate] = useState(() => new Date(2024, 4, 12));
  const [hasCalculated, setHasCalculated] = useState(false);
  const scenarioResult = calculateScenarioResult({
    asset,
    amount: Number(amount || "0"),
    startDate,
    endDate,
  });
  const previewResult = hasCalculated
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

  return (
    <main className="min-h-[calc(100dvh-4.5rem)] bg-[linear-gradient(180deg,#ffffff_0%,#faf8ff_100%)] text-zinc-950 xl:h-[calc(100dvh-4.5rem)] xl:min-h-0 xl:overflow-hidden">
      <section className="mx-auto max-w-[96rem] px-4 pt-0 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-8 xl:h-full xl:pb-4">
        <div className="grid gap-4 xl:h-full xl:grid-cols-[minmax(0,1fr)_30rem] xl:items-stretch">
          <div className="grid min-h-0 gap-3 xl:h-full xl:grid-rows-[auto_minmax(0,1fr)]">
            <ScenarioTopBar asset={asset} />
            <LeftScenarioBuilder
              asset={asset}
              amount={amount}
              onAmountChange={handleAmountChange}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              onCalculate={() => setHasCalculated(true)}
            />
          </div>
          <ScenarioPreviewPanel asset={asset} result={previewResult} />
        </div>
      </section>
    </main>
  );
}
