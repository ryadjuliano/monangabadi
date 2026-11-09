"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { useLanguage } from "@/components/providers/language-provider";
import { copy } from "@/lib/i18n";

export default function ServicesPage() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const cards = t.services.cards.map((c) => {
    const [name, description] = c.split("|");
    return { name, description };
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="section">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#190054]">{t.services.label}</p>
        <h1 className="mt-2 font-serif text-3xl text-slate-950 sm:text-4xl">{t.services.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{t.services.description}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {cards.map((item) => (
            <article key={item.name} className="card h-full">
              <h2 className="text-xl font-semibold text-slate-950">{item.name}</h2>
              <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 md:p-10">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">{t.services.detailTitle}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.services.detailItems.map((line) => (
              <li key={line} className="flex gap-3 text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#190054]" aria-hidden />
                <span className="leading-7">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-[#190054] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#12003d]"
          >
            {t.nav.consultation}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
