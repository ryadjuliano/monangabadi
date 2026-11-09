"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Files,
  Globe2,
  Home,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { scrollToSectionFromHref } from "@/components/providers/hash-scroll";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/public/reveal";
import { copy } from "@/lib/i18n";

type TranslationObject = {
  id?: { [key: string]: string };
  en?: { [key: string]: string };
  cn?: { [key: string]: string };
} | null;

type LandingDbContent = {
  services: Array<{
    id: string;
    name: string;
    description: string | null;
    translations: TranslationObject;
    icon_url?: string | null;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    testimonial_text: string;
    company: string | null;
    translations: TranslationObject;
  }>;
  logos: Array<{
    id: string;
    name: string;
    logo_url: string | null;
  }>;
  companyValues: Array<{
    id: string;
    title: string;
    description: string;
    icon_name?: string | null;
    translations: TranslationObject;
  }>;
  sections: Array<{
    section_key: string;
    title: string | null;
    description: string | null;
    image_url: string | null;
    translations: TranslationObject;
    metadata: Record<string, unknown> | null;
  }>;
};

const services = [
  {
    icon: Home,
    title: "Residency Application",
    description:
      "KITAS/KITAP pathways, spouse-linked stays, and long-term residence filings with structured documentation.",
  },
  {
    icon: Files,
    title: "Document Processing",
    description:
      "Certified translations, attestations, and complete submission packages for immigration authorities.",
  },
  {
    icon: ShieldCheck,
    title: "Immigration Support",
    description:
      "Compliance guidance, status monitoring, and liaison support throughout your stay in Indonesia.",
  },
  {
    icon: Globe2,
    title: "Visa Consultation",
    description:
      "Expert routing for tourism, family visit, transit, work trials, Second Home (E33), and meeting visas.",
  },
];

const advantages = [
  {
    icon: Clock3,
    title: "Fast Process",
    description:
      "Clear workflows, disciplined follow-up, and milestone-based execution reduce avoidable delays.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Service",
    description:
      "A professional partner for individuals and companies that value compliance and transparency.",
  },
  {
    icon: Sparkles,
    title: "Professional Team",
    description:
      "Consultants who communicate clearly, document carefully, and focus on client confidence.",
  },
];

const testimonials = [
  {
    quote:
      "Monang Abadi helped our team secure documentation faster with a process that felt structured and dependable.",
    name: "Rina Wibowo",
    role: "HR Manager, Global Trade Co.",
  },
  {
    quote:
      "Their communication was prompt, professional, and easy to understand even for complex permit requirements.",
    name: "Daniel Hartono",
    role: "Director, Nusantara Ventures",
  },
  {
    quote:
      "We needed a legal partner we could trust. The experience felt corporate, organized, and genuinely helpful.",
    name: "Melissa Tan",
    role: "Operations Lead, Archipelago Group",
  },
];

const localClientLogos = [
  { name: "AIS", file: "AIS.png" },
  { name: "APOLLO", file: "APOLLO.png" },
  { name: "BATAM XINGRUI", file: "BATAM XINGRUI .jpeg" },
  { name: "EPSON", file: "epson .png" },
  { name: "FIRST FILTER", file: "first_filter.jpeg" },
  { name: "NE SOLAR", file: "NE_SOLAR.png" },
  { name: "SHAPESHELL", file: "shapeshell.png" },
  { name: "SIMNGATAC", file: "SIMNGATAC.png" },
  { name: "ZINWI", file: "ZINWI.jpeg" },
  {
    name: "China Communications Construction Company",
    file: "China_Communications_Construction_Company_logo.svg",
  },
];

const valueIconMap = {
  Clock3,
  BadgeCheck,
  Sparkles,
  ShieldCheck,
  Users,
  Globe2,
} as const;

function translatedText(
  locale: "id" | "en" | "cn",
  translations: TranslationObject,
  key: string,
  fallback: string,
) {
  if (locale === "id") return fallback;
  const fromTranslations = translations?.[locale]?.[key];
  return typeof fromTranslations === "string" && fromTranslations.trim()
    ? fromTranslations
    : fallback;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.07 2C6.61 2 2.17 6.44 2.17 11.9c0 1.75.46 3.46 1.33 4.97L2 22l5.28-1.39a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9a9.8 9.8 0 0 0-2.93-7.02Zm-6.98 15.26h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.27-4.4c0-4.54 3.69-8.23 8.24-8.23 2.2 0 4.27.85 5.82 2.41a8.16 8.16 0 0 1 2.4 5.83c0 4.54-3.69 8.23-8.21 8.23Zm4.51-6.17c-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.16.24-.64.81-.78.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.25-.74-.66-1.24-1.47-1.38-1.72-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.12-.14.16-.24.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.24-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.16 1.74 2.66 4.22 3.72.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.17.21-.58.21-1.07.14-1.17-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function LandingPage({ dbContent }: { dbContent?: LandingDbContent }) {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const t = copy[locale];
  const serviceCards = (
    dbContent?.services?.length
      ? dbContent.services
      : t.services.cards.map((item, index) => {
          const [title, description] = item.split("|");
          return { ...services[index], title, description };
        })
  ).map((service, index) => {
    const icon =
      "icon" in service ? service.icon : services[index % services.length].icon;
    if ("id" in service) {
      return {
        icon,
        title: translatedText(
          locale,
          service.translations,
          "name",
          service.name,
        ),
        description: translatedText(
          locale,
          service.translations,
          "description",
          service.description ?? "",
        ),
      };
    }
    return service;
  });

  const whyItems = (
    dbContent?.companyValues?.length
      ? dbContent.companyValues
      : t.why.items.map((item, index) => {
          const [title, description] = item.split("|");
          return { ...advantages[index], title, description };
        })
  ).map((item, index) => {
    if ("id" in item) {
      const iconKey = (item.icon_name ||
        "ShieldCheck") as keyof typeof valueIconMap;
      return {
        icon:
          valueIconMap[iconKey] ?? advantages[index % advantages.length].icon,
        title: translatedText(locale, item.translations, "title", item.title),
        description: translatedText(
          locale,
          item.translations,
          "description",
          item.description,
        ),
      };
    }
    return item;
  });
  const stats = t.hero.stats.map((item) => item.split("|"));
  const previewSteps = t.hero.previewSteps.map((item) => item.split("|"));
  const aboutSection = dbContent?.sections?.find(
    (section) => section.section_key === "about",
  );
  const testimonialsData = (
    dbContent?.testimonials?.length
      ? dbContent.testimonials.map((item) => ({
          quote: translatedText(
            locale,
            item.translations,
            "testimonial_text",
            item.testimonial_text,
          ),
          name: translatedText(locale, item.translations, "name", item.name),
          role: item.company || "-",
        }))
      : testimonials
  ).slice(0, 6);
  const clientLogosData = dbContent?.logos?.length
    ? dbContent.logos
    : localClientLogos.map((item, index) => ({
        id: `${index}`,
        name: item.name,
        logo_url: encodeURI(`/assets/clients/${item.file}`),
      }));

  return (
    <div className="overflow-x-clip">
      <section className="relative min-h-[78vh] overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(25,0,84,0.28),_transparent_30%),linear-gradient(90deg,_rgba(2,6,23,0.86)_0%,_rgba(2,6,23,0.72)_35%,_rgba(2,6,23,0.5)_65%,_rgba(2,6,23,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[url('/globe.svg')] bg-[length:480px] bg-[position:85%_20%] bg-no-repeat opacity-10" />
        <div className="absolute inset-y-0 right-0 hidden w-[48%] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] lg:block" />
        <div className="section relative grid items-center gap-12 py-20 lg:min-h-[78vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-violet-100 shadow-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              {t.hero.badge}
            </div>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              {t.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                {t.hero.primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                onClick={(e) => {
                  if (pathname === "/" && scrollToSectionFromHref("/#about")) {
                    e.preventDefault();
                  }
                }}
              >
                {t.hero.secondary}
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-sm backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-sm text-slate-300">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-red-700/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-5 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03))]" />
              <div className="relative rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.45),rgba(15,23,42,0.8))] p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-violet-100">
                      {t.hero.previewLabel}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      {t.hero.previewTitle}
                    </h2>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-violet-100">
                    Monang Abadi
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  {previewSteps.map(([title, desc], index) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-white/10 bg-white/6 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-red-400" />
                        <div>
                          <p className="font-medium">{title}</p>
                          <p className="mt-1 text-sm text-slate-200">{desc}</p>
                        </div>
                      </div>
                      {index < 2 ? (
                        <div className="ml-[4px] mt-3 h-6 border-l border-dashed border-white/20" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Reveal className="section py-8">
        <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#190054]">
              {t.built.label}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-slate-950">
              {t.built.title}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {t.built.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <section id="services" className="section">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#190054]">
              {t.services.label}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-slate-950 sm:text-4xl">
              {t.services.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t.services.description}
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="group h-full rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#190054]/8 text-[#190054] transition group-hover:bg-[#190054] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {service.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-14 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 md:p-10">
            <h3 className="font-serif text-2xl font-semibold text-slate-950">
              {t.services.detailTitle}
            </h3>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
                  <tr>
                    {t.services.visaTableHeaders.map((header) => (
                      <th key={header} className="border-b border-slate-200 px-4 py-3">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.services.visaTableRows.map((row) => {
                    const [indexVisa, purpose, type, stay] = row.split("|");
                    return (
                      <tr key={row} className="odd:bg-white even:bg-slate-50/60">
                        <td className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900">
                          {indexVisa}
                        </td>
                        <td className="border-b border-slate-200 px-4 py-3">{purpose}</td>
                        <td className="border-b border-slate-200 px-4 py-3">{type}</td>
                        <td className="border-b border-slate-200 px-4 py-3">{stay}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {t.services.detailItems.map((item) => (
                <li key={item} className="text-sm text-slate-600">
                  - {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section id="about" className="section">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(160deg,_rgba(25,0,84,0.12)_0%,_#ffffff_55%,_#e2e8f0_100%)] p-8 shadow-sm">
              <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.2em] text-[#190054]">
                  Monang Abadi
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-950 p-5 text-white">
                    <p className="text-3xl font-semibold">10+</p>
                    <p className="mt-2 text-sm text-slate-300">
                      {t.about.years}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-3xl font-semibold text-slate-950">
                      1000+
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {t.about.cases}
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">
                    {t.about.positioning}
                  </p>
                  <p className="mt-2 text-lg font-medium text-slate-900">
                    {t.about.positioningText}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#190054]">
              {t.about.label}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-slate-950 sm:text-4xl">
              {aboutSection
                ? translatedText(
                    locale,
                    aboutSection.translations,
                    "title",
                    aboutSection.title ?? t.about.title,
                  )
                : t.about.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {aboutSection
                ? translatedText(
                    locale,
                    aboutSection.translations,
                    "description",
                    aboutSection.description ?? t.about.description1,
                  )
                : t.about.description1}
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              {t.about.description2}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#190054]">
              {t.why.label}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-slate-950 sm:text-4xl">
              {t.why.title}
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {whyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.07}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#190054] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#190054]">
                {t.testimonials.label}
              </p>
              <h2 className="mt-3 font-serif text-3xl text-slate-950 sm:text-4xl">
                {t.testimonials.title}
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {clientLogosData.map((logo) => (
            <div
              key={logo.id}
              className="flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {logo.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.logo_url}
                  alt={`Client logo ${logo.name}`}
                  className="max-h-12 w-auto object-contain"
                />
              ) : (
                <p className="text-center text-sm font-medium text-slate-500">
                  {logo.name}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonialsData.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.07}>
              <motion.blockquote
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-lg leading-8 text-slate-700">
                  “{item.quote}”
                </p>
                <footer className="mt-6">
                  <p className="font-semibold text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    {item.role || t.testimonials.roles[index] || "-"}
                  </p>
                </footer>
              </motion.blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-4">
        <Reveal>
          <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-[0_35px_70px_-30px_rgba(15,23,42,0.45)] sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
                  {t.cta.label}
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  {t.cta.title}
                </h2>
                <p className="mt-4 text-slate-300">{t.cta.description}</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#190054] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#12003d]"
              >
                {t.cta.button}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Link
        href="https://wa.me/6285710022015"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_-18px_rgba(37,211,102,0.8)] transition hover:scale-105 hover:bg-[#1ebe5d]"
        aria-label="WhatsApp 085710022015"
        title="Chat on WhatsApp: 085710022015"
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span>Contact Us</span>
      </Link>
    </div>
  );
}
