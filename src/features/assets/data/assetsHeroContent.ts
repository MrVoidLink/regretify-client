import type { AssetsTopMoverItem } from "@/features/assets/types";

export const assetsTopMovers: AssetsTopMoverItem[] = [
  {
    id: "doge",
    ticker: "DOGE",
    name: "Dogecoin",
    moveLabel: "+38.4%",
    mark: "D",
    markClassName:
      "bg-[linear-gradient(180deg,#efcf73_0%,#d8ab30_100%)] text-zinc-950 shadow-[0_10px_22px_rgba(216,171,48,0.22)]",
  },
  {
    id: "pepe",
    ticker: "PEPE",
    name: "Pepe",
    moveLabel: "+27.6%",
    mark: "P",
    markClassName:
      "bg-[linear-gradient(180deg,#74d86d_0%,#2ea043_100%)] text-white shadow-[0_10px_22px_rgba(46,160,67,0.22)]",
  },
  {
    id: "floki",
    ticker: "FLOKI",
    name: "Floki",
    moveLabel: "+21.7%",
    mark: "F",
    markClassName:
      "bg-[linear-gradient(180deg,#ffb66e_0%,#ff7d0a_100%)] text-white shadow-[0_10px_22px_rgba(255,125,10,0.2)]",
  },
  {
    id: "btc",
    ticker: "BTC",
    name: "Bitcoin",
    moveLabel: "+8.9%",
    mark: "B",
    markClassName:
      "bg-[linear-gradient(180deg,#ffb74d_0%,#ff7d0a_100%)] text-white shadow-[0_10px_22px_rgba(255,125,10,0.22)]",
  },
  {
    id: "eth",
    ticker: "ETH",
    name: "Ethereum",
    moveLabel: "+6.2%",
    mark: "E",
    markClassName:
      "bg-[linear-gradient(180deg,#556180_0%,#1e2433_100%)] text-white shadow-[0_10px_22px_rgba(30,36,51,0.22)]",
  },
];
