"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Same-document scroll for `/#section` without relying on the browser alone (helps Next client nav). */
export function scrollToSectionFromHref(href: string): boolean {
  const match = href.match(/^\/#([\w-]+)$/);
  if (!match) return false;
  const el = document.getElementById(match[1]);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", href);
  return true;
}

/** After navigation to `/` with a hash, scroll the target section into view once the home tree exists. */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    let cancelled = false;
    const r1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!cancelled) {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(r1);
    };
  }, [pathname]);

  return null;
}
