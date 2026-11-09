import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

export default function BlogPage() {
  const posts = [
    { title: "New Immigration Policy 2026", excerpt: "Key policy updates for employers and expats." },
    { title: "Permit Submission Checklist", excerpt: "How to reduce delays with complete documents." },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="section">
        <h1 className="font-serif text-3xl">News & Insights</h1>
        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <article key={post.title} className="card">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-slate-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
