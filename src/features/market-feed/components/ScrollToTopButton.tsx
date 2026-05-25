"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 720);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 bottom-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-strong)_100%)] text-white shadow-[0_18px_36px_rgba(90,40,223,0.28)] transition-all duration-200 hover:-translate-y-0.5 ${
        isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5.5 11 4.5-4.5 4.5 4.5" />
      </svg>
    </button>
  );
}
