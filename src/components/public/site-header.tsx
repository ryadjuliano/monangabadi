"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { scrollToSectionFromHref } from "@/components/providers/hash-scroll";
import { useLanguage } from "@/components/providers/language-provider";
import { copy, languageLabels } from "@/lib/i18n";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);
  const { locale, setLocale } = useLanguage();
  const t = copy[locale];
  const adminLoginHref = (() => {
    const base = process.env.NEXT_PUBLIC_ADMIN_SITE_URL?.replace(/\/$/, "");
    return base ? `${base}/admin/login` : null;
  })();
  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.contact, href: "/contact" },
  ];
  const serviceCardTitles = copy[locale].services.cards.map((item) => item.split("|")[0]);
  const splitAt = Math.ceil(serviceCardTitles.length / 2);
  const serviceGroups = [
    {
      title: t.nav.visaImmigration,
      items: serviceCardTitles.slice(0, splitAt),
    },
    {
      title: t.nav.legalPermits,
      items: serviceCardTitles.slice(splitAt),
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src="/assets/logomonang.jpeg"
              alt="Monang Abadi logo"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="font-serif text-lg font-semibold text-slate-950">
              Monang Eka Abadi
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {t.nav.legalConsulting}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition hover:text-[#190054]"
              onClick={(e) => {
                if (pathname === "/" && scrollToSectionFromHref(item.href)) {
                  e.preventDefault();
                  setServicesOpen(false);
                }
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative" ref={servicesMenuRef}>
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-[#190054]"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onClick={() => setServicesOpen((prev) => !prev)}
            >
              {t.nav.services}
              <ChevronDown className="h-4 w-4" />
            </button>

            {servicesOpen ? (
              <div className="absolute left-1/2 top-full mt-4 w-[720px] -translate-x-1/2 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.3)]">
                <div className="grid gap-5 md:grid-cols-[1.15fr_1fr]">
                  <div className="rounded-[1.25rem] bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#190054]">
                      {t.nav.featuredServices}
                    </p>
                    <div className="mt-4 space-y-3">
                      {serviceGroups[0].items.map((item, index) => (
                        <div
                          key={item}
                          className={`rounded-2xl px-4 py-3 text-sm ${
                            index === 0
                              ? "bg-slate-950 text-white"
                              : "bg-white text-slate-700"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {serviceGroups.map((group) => (
                      <div key={group.title}>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {group.title}
                        </p>
                        <div className="mt-3 grid gap-2">
                          {group.items.map((item) => (
                            <Link
                              key={item}
                              href="/#services"
                              className="rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-[#190054]"
                              onClick={(e) => {
                                setServicesOpen(false);
                                if (pathname === "/" && scrollToSectionFromHref("/#services")) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <select
            value={locale}
            onChange={(e) =>
              setLocale(e.target.value as keyof typeof languageLabels)
            }
            className="h-9 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm outline-none focus:border-[#190054] focus:ring-1 focus:ring-[#190054]"
          >
            {(
              Object.keys(languageLabels) as Array<keyof typeof languageLabels>
            ).map((lang) => (
              <option key={lang} value={lang}>
                {languageLabels[lang]}
              </option>
            ))}
          </select>
          <Link
            href="/tracking"
            className="rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            {t.nav.tracking}
          </Link>
          {adminLoginHref ? (
            <Link
              href={adminLoginHref}
              className="text-sm font-medium text-slate-700 transition hover:text-[#190054]"
            >
              {t.nav.login}
            </Link>
          ) : null}
          <Link
            href="/contact"
            className="rounded-full bg-[#190054] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#12003d]"
          >
            {t.nav.consultation}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#190054]"
                onClick={(e) => {
                  if (pathname === "/" && scrollToSectionFromHref(item.href)) {
                    e.preventDefault();
                  }
                  setOpen(false);
                  setServicesOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t.nav.services}
              </p>
              <div className="mt-2 grid gap-1">
                {serviceGroups
                  .flatMap((group) => group.items)
                  .map((item) => (
                    <Link
                      key={item}
                      href="/#services"
                      className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-[#190054]"
                      onClick={(e) => {
                        setOpen(false);
                        if (pathname === "/" && scrollToSectionFromHref("/#services")) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {item}
                    </Link>
                  ))}
              </div>
            </div>
            <Link
              href="/tracking"
              className="mt-2 rounded-full bg-red-700 px-5 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {t.nav.tracking}
            </Link>
            <div className="mt-2 flex items-center justify-center">
              <select
                value={locale}
                onChange={(e) =>
                  setLocale(e.target.value as keyof typeof languageLabels)
                }
                className="h-10 w-full max-w-[180px] rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm outline-none focus:border-[#190054] focus:ring-1 focus:ring-[#190054]"
              >
                {(
                  Object.keys(languageLabels) as Array<
                    keyof typeof languageLabels
                  >
                ).map((lang) => (
                  <option key={lang} value={lang}>
                    {languageLabels[lang]}
                  </option>
                ))}
              </select>
            </div>
            <Link
              href="/contact"
              className="mt-2 rounded-full bg-[#190054] px-5 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {t.nav.consultation}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
