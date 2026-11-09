import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { TrackingContent } from "./tracking-content";

export default function TrackingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <TrackingContent />
      </main>
      <SiteFooter />
    </div>
  );
}
