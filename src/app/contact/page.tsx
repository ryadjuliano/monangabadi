import { ContactForm } from "./contact-form";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="section">
        <h1 className="font-serif text-3xl">Contact Us</h1>
        <ContactForm />
      </main>
      <SiteFooter />
    </div>
  );
}
