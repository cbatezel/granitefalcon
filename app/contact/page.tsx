"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("revealed"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false);
  const handleScroll = useCallback(() => { setPast(window.scrollY > threshold); }, [threshold]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return past;
}

export default function ContactPage() {
  const showIsland = useScrollPast(200);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire up to actual email/form service
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#0d0d0d] overflow-x-hidden">
      <div className="grain" aria-hidden="true" />

      {/* TOP NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#f5f0e8]/80 border-b border-[#0d0d0d]/5 transition-all duration-500 ${showIsland ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100"}`}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-14">
          <Link href="/" className="font-serif text-lg tracking-tight">AI Delivered</Link>
          <Link href="/" className="text-xs font-sans font-medium text-[#0d0d0d]/40 hover:text-[#0d0d0d]/70 transition-colors duration-300">
            ← Back
          </Link>
        </div>
      </nav>

      {/* ISLAND NAV */}
      <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${showIsland ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="island-nav flex items-center gap-1 px-2 py-1.5 bg-[#0d0d0d]/90 backdrop-blur-xl rounded-full shadow-2xl shadow-black/20">
          <Link href="/" className="px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-[0.06em] text-white/40 hover:text-white/70 transition-all duration-300">
            ← Home
          </Link>
        </div>
      </div>

      {/* HEADER */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-36 pb-16 md:pt-44 md:pb-20">
        <p className="hero-fade font-sans text-[11px] tracking-[0.2em] uppercase text-[#0d0d0d]/30 mb-8">Get in touch</p>
        <h1 className="hero-headline font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.98] tracking-tight max-w-3xl">
          Let&apos;s figure out<br /><span className="text-[#0d0d0d]/15">what you actually need.</span>
        </h1>
        <p className="hero-fade hero-fade-2 font-sans text-base md:text-lg text-[#0d0d0d]/40 mt-8 max-w-md leading-relaxed">
          No pitch. No pressure. Tell us what&apos;s slowing you down and we&apos;ll give you an honest answer.
        </p>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pb-32 md:pb-44">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-10">

          {/* FORM */}
          <div className="md:col-span-7">
            <Reveal>
              {status === "sent" ? (
                <div className="py-16">
                  <p className="font-serif text-3xl md:text-4xl mb-4">We&apos;ll be in touch.</p>
                  <p className="font-sans text-sm text-[#0d0d0d]/40 leading-relaxed max-w-sm">
                    Thanks for reaching out. Expect to hear from us within one business day.
                  </p>
                  <Link href="/" className="inline-block mt-8 text-xs font-sans font-medium text-[#0d0d0d]/30 hover:text-[#0d0d0d]/60 transition-colors duration-300 tracking-wide">
                    ← Back to home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#0d0d0d]/30">
                        Name <span className="text-[#F5C842]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-white/60 border border-[#0d0d0d]/8 px-4 py-3 font-sans text-sm text-[#0d0d0d] placeholder-[#0d0d0d]/20 focus:outline-none focus:border-[#0d0d0d]/25 transition-colors duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#0d0d0d]/30">
                        Email <span className="text-[#F5C842]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="bg-white/60 border border-[#0d0d0d]/8 px-4 py-3 font-sans text-sm text-[#0d0d0d] placeholder-[#0d0d0d]/20 focus:outline-none focus:border-[#0d0d0d]/25 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#0d0d0d]/30">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Where do you work?"
                      className="bg-white/60 border border-[#0d0d0d]/8 px-4 py-3 font-sans text-sm text-[#0d0d0d] placeholder-[#0d0d0d]/20 focus:outline-none focus:border-[#0d0d0d]/25 transition-colors duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#0d0d0d]/30">
                      What&apos;s slowing you down? <span className="text-[#F5C842]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe the problem you're trying to solve — even if it's messy or not fully formed yet."
                      className="bg-white/60 border border-[#0d0d0d]/8 px-4 py-3 font-sans text-sm text-[#0d0d0d] placeholder-[#0d0d0d]/20 focus:outline-none focus:border-[#0d0d0d]/25 transition-colors duration-300 resize-none leading-relaxed"
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-sans text-xs text-red-500/70">Something went wrong. Try emailing us directly at drew@aidelivered.com.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#F5C842] text-[#0d0d0d] text-sm font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-all duration-300 hover:shadow-lg hover:shadow-[#F5C842]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending…" : <>Send Message<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span></>}
                  </button>
                </form>
              )}
            </Reveal>
          </div>

          {/* SIDEBAR */}
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={150}>
              <div className="space-y-10">
                <div>
                  <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#0d0d0d]/25 mb-3">Prefer email?</p>
                  <a href="mailto:drew@aidelivered.com" className="font-sans text-sm text-[#0d0d0d]/50 hover:text-[#0d0d0d]/80 transition-colors duration-300 block">drew@aidelivered.com</a>
                  <a href="mailto:casey@aidelivered.com" className="font-sans text-sm text-[#0d0d0d]/50 hover:text-[#0d0d0d]/80 transition-colors duration-300 block mt-1">casey@aidelivered.com</a>
                </div>
                <div className="border-t border-[#0d0d0d]/6 pt-10">
                  <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#0d0d0d]/25 mb-3">What to expect</p>
                  <ul className="space-y-3">
                    {[
                      "Response within one business day",
                      "A 15-min call to hear your problem",
                      "Honest feedback — even if we can't help",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 font-sans text-sm text-[#0d0d0d]/35 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-[#F5C842] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#0d0d0d]/6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span className="font-serif text-base text-[#0d0d0d]/30">AI Delivered</span>
          <div className="font-sans text-xs text-[#0d0d0d]/20 flex gap-6">
            <span>drew@aidelivered.com</span>
            <span>casey@aidelivered.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
