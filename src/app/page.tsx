import { LandingPage } from "@/components/public/landing-page";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { createPublicReadonlyClient } from "@/lib/supabase/public-readonly";

export default async function Home() {
  const supabase = createPublicReadonlyClient();
  const [{ data: services }, { data: testimonials }, { data: logos }, { data: companyValues }, { data: sections }] =
    await Promise.all([
      supabase
        .from("services")
        .select("id,name,description,translations,icon_url,is_active")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("testimonials")
        .select("id,name,testimonial_text,company,rating,translations,is_visible")
        .eq("is_visible", true)
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("client_logos")
        .select("id,name,logo_url,is_visible")
        .eq("is_visible", true)
        .order("display_order", { ascending: true })
        .limit(12),
      supabase
        .from("company_values")
        .select("id,title,description,icon_name,translations,is_visible")
        .eq("is_visible", true)
        .order("display_order", { ascending: true })
        .limit(6),
      supabase
        .from("site_content")
        .select("section_key,title,description,image_url,translations,metadata"),
    ]);

  const dbContent = {
    services: services ?? [],
    testimonials: testimonials ?? [],
    logos: logos ?? [],
    companyValues: companyValues ?? [],
    sections: sections ?? [],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <LandingPage dbContent={dbContent} />
      </main>
      <SiteFooter />
    </div>
  );
}
