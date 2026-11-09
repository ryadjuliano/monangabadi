"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, Mail, MapPin, Phone, Send } from "lucide-react";
import { scrollToSectionFromHref } from "@/components/providers/hash-scroll";
import { useLanguage } from "@/components/providers/language-provider";
import { copy } from "@/lib/i18n";

export function SiteFooter() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const t = copy[locale];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="section grid gap-10 py-14 lg:grid-cols-[1.1fr_0.6fr_0.7fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#190054] text-sm font-semibold text-white">
              MA
            </div>
            <div>
              <p className="font-serif text-xl font-semibold text-slate-950">Monang Eka Abadi</p>
              <p className="text-sm text-slate-500">{t.footer.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md leading-7 text-slate-600">
            {t.footer.description}
          </p>
          <div className="mt-6 flex gap-3">
            {[Globe2, Mail, Send].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#190054]/30 hover:text-[#190054]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t.footer.navigation}</h3>
          <div className="mt-5 grid gap-3 text-slate-600">
            <Link href="/">{t.nav.home}</Link>
            <Link
              href="/#about"
              onClick={(e) => {
                if (pathname === "/" && scrollToSectionFromHref("/#about")) {
                  e.preventDefault();
                }
              }}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/#services"
              onClick={(e) => {
                if (pathname === "/" && scrollToSectionFromHref("/#services")) {
                  e.preventDefault();
                }
              }}
            >
              {t.nav.services}
            </Link>
            <Link href="/contact">{t.nav.contact}</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t.footer.contact}</h3>
          <div className="mt-5 grid gap-4 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-[#190054]" />
              <p>Monang Eka Abadi</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-[#190054]" />
              <p>085710022015</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-[#190054]" />
              <p>monangabadi@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Monang Eka Abadi. {t.footer.copyright}
      </div>
    </footer>
  );
}
