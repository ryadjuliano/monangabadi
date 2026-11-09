"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="card mt-6 grid gap-3 md:max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const name = String(fd.get("name") || "").trim();
        const email = String(fd.get("email") || "").trim();
        const message = String(fd.get("message") || "").trim();
        const subject = encodeURIComponent(`Website contact from ${name || "visitor"}`);
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\n${message}`,
        );
        window.location.href = `mailto:monangabadi@gmail.com?subject=${subject}&body=${body}`;
        setSent(true);
      }}
    >
      <input name="name" required placeholder="Name" className="rounded border border-slate-300 px-3 py-2" />
      <input
        name="email"
        required
        type="email"
        placeholder="Email"
        className="rounded border border-slate-300 px-3 py-2"
      />
      <textarea
        name="message"
        required
        placeholder="Message"
        className="min-h-28 rounded border border-slate-300 px-3 py-2"
      />
      <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">
        Send message
      </button>
      {sent ? (
        <p className="text-sm text-slate-600">
          If your email app did not open, check your browser settings or email us directly at
          monangabadi@gmail.com
        </p>
      ) : null}
    </form>
  );
}
