import { MarketFeedInteractivePanel } from "@/features/market-feed/components/MarketFeedInteractivePanel";
import { ScrollToTopButton } from "@/features/market-feed/components/ScrollToTopButton";
import {
  marketFeedExploreItems,
  marketFeedPopularTags,
  marketFeedSidebarCategories,
} from "@/features/market-feed/data/feedItems";
import type {
  MarketFeedCard,
  MarketFeedCategoryId,
  MarketFeedSidebarItem,
  MarketFeedSidebarTag,
  MarketFeedViewMode,
} from "@/features/market-feed/types";

function SidebarSectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="type-title text-[0.8rem] font-semibold text-zinc-950">{children}</h2>;
}

function SidebarListItem({ item }: { item: MarketFeedSidebarItem }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between gap-2 rounded-[0.8rem] px-2.25 py-1.75 text-left text-[0.76rem] transition-colors ${
        item.isActive
          ? "bg-[linear-gradient(180deg,var(--color-brand-soft)_0%,var(--color-brand-soft-strong)_100%)] text-[var(--color-brand-strong)]"
          : "text-[var(--color-text-ui-soft)] hover:bg-[var(--color-brand-soft)]"
      }`}
    >
      <span className="font-medium">{item.label}</span>
      {item.value ? <span className="text-[0.72rem] text-zinc-400">{item.value}</span> : null}
    </button>
  );
}

function SidebarTag({ tag }: { tag: MarketFeedSidebarTag }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-7.5 items-center rounded-full border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] px-2.25 text-[0.68rem] font-medium text-[var(--color-text-ui-soft)] transition-colors hover:bg-[var(--color-brand-soft)]"
    >
      {tag.label}
    </button>
  );
}

function DesktopSidebar() {
  return (
    <aside className="hidden self-start xl:block">
      <div className="xl:fixed xl:top-24 xl:left-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:w-[15.5rem]">
        <div className="sidebar-scrollbar max-h-[calc(100vh-7rem)] space-y-2.5 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
          <section className="overflow-hidden rounded-[1.2rem] bg-[linear-gradient(180deg,#8a5bff_0%,#632dff_100%)] p-2.75 text-white shadow-[0_18px_44px_rgba(99,45,255,0.22)]">
            <p className="text-[0.8rem] leading-4.5 font-semibold tracking-[-0.04em]">
              Ad Space
            </p>
            <p className="mt-1 text-[0.68rem] leading-4 text-white/78">
              Reserved for sponsored placement inside the Pulse feed.
            </p>
            <button
              type="button"
              className="mt-2 inline-flex min-h-7.5 items-center rounded-full bg-white px-2.75 text-[0.7rem] font-medium text-[var(--color-brand-strong)] shadow-[0_10px_22px_rgba(24,24,27,0.12)]"
            >
              Advertise here
            </button>
          </section>

          <section className="rounded-[1.1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] p-2.75 shadow-[0_14px_32px_rgba(24,24,27,0.04)]">
            <SidebarSectionTitle>Explore</SidebarSectionTitle>
            <div className="mt-1.75 space-y-0">
              {marketFeedExploreItems.map((item) => (
                <SidebarListItem key={item.id} item={item} />
              ))}
            </div>
          </section>

          <section className="rounded-[1.1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] p-2.75 shadow-[0_14px_32px_rgba(24,24,27,0.04)]">
            <SidebarSectionTitle>Categories</SidebarSectionTitle>
            <div className="mt-1.75 space-y-0">
              {marketFeedSidebarCategories.map((item) => (
                <SidebarListItem key={item.id} item={item} />
              ))}
            </div>
          </section>

          <section className="rounded-[1.1rem] border border-[color:var(--color-border-ui-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,249,255,0.94)_100%)] p-2.75 shadow-[0_14px_32px_rgba(24,24,27,0.04)]">
            <SidebarSectionTitle>Popular Tags</SidebarSectionTitle>
            <div className="mt-1.75 flex flex-wrap gap-1">
              {marketFeedPopularTags.map((tag) => (
                <SidebarTag key={tag.id} tag={tag} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}

type MarketFeedPageProps = {
  initialCards: MarketFeedCard[];
  initialCategory: MarketFeedCategoryId;
  initialPage: number;
  totalPages: number;
  initialViewMode: MarketFeedViewMode;
};

export function MarketFeedPage({
  initialCards,
  initialCategory,
  initialPage,
  totalPages,
  initialViewMode,
}: MarketFeedPageProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7ff_0%,#ffffff_18%,#ffffff_100%)] text-zinc-950">
      <section className="mx-auto max-w-[96rem] px-4 pt-2 pb-7 sm:px-7 sm:pt-3 sm:pb-8 lg:px-8 lg:pt-3 lg:pb-10">
        <div className="xl:grid xl:grid-cols-[15.5rem_minmax(0,1fr)] xl:items-start xl:gap-6">
          <DesktopSidebar />

          <MarketFeedInteractivePanel
            initialCards={initialCards}
            initialCategory={initialCategory}
            initialPage={initialPage}
            totalPages={totalPages}
            initialViewMode={initialViewMode}
          />
        </div>
      </section>

      <ScrollToTopButton />
    </main>
  );
}
