"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Reveal ─── */
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
  return (<div ref={ref} className={`reveal-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

/* ─── Scroll detection ─── */
function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false);
  const handleScroll = useCallback(() => { setPast(window.scrollY > threshold); }, [threshold]);
  useEffect(() => { window.addEventListener("scroll", handleScroll, { passive: true }); return () => window.removeEventListener("scroll", handleScroll); }, [handleScroll]);
  return past;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); }, { rootMargin: "-35% 0px -60% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => { const onScroll = () => setOffset(window.scrollY * 0.3); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return offset;
}

/* ─── Data ─── */
const NAV_IDS = ["process", "results", "pricing", "team"];

const caseStudies = [
  {
    stat: "14",
    unit: "hrs/wk",
    label: "saved",
    client: "Real Estate Company",
    story: "Their team was buried in manual intake forms and scattered documents. Every new client meant hours of redundant data entry across three different systems.",
    solution: "We built a custom intake and document management app that centralized everything — eliminating duplicate entry and cutting processing time in half.",
    quote: "We've gotten more done in three months than we did all last year.",
    name: "Sarah M.",
    title: "Real Estate Broker",
  },
  {
    stat: "1,000+",
    unit: "",
    label: "employees trained",
    client: "Trinidad Benham",
    story: "They needed to roll out new internal software across a massive workforce on desktop and mobile — without grinding operations to a halt.",
    solution: "We built a custom LMS with 40+ instructional videos, presenter segments, and detailed tutorials. Mobile-friendly, with full content control for learning leaders.",
    quote: "The training platform made what could have been a nightmare rollout feel seamless.",
    name: "Operations Lead",
    title: "Trinidad Benham",
  },
  {
    stat: "Zero",
    unit: "",
    label: "admin overhead",
    client: "Executive Cohort",
    story: "Running a private executive cohort meant constant manual work — roster updates, member comms, content distribution. They needed a full-time admin but couldn't justify the hire.",
    solution: "We built a private member portal that runs the entire program — roster, content, communications — without a dedicated administrator.",
    quote: "They built something that actually fits how we work. No learning curve, no nonsense.",
    name: "James T.",
    title: "Program Director",
  },
];

const pricingTiers = [
  { name: "Audit", price: "$1,500", description: "We dig into your operations, find your biggest pain point, and hand you a clear roadmap to fix it.", features: ["Deep-dive into your workflows", "Identify your #1 time drain", "Actionable recommendations", "Delivered in one week"] },
  { name: "Sprint", price: "$7,500", highlight: true, description: "We diagnose the problem and build a custom solution — fast. One focused engagement, real results.", features: ["Everything in Audit", "Custom-built tool or system", "Hands-on implementation", "Training for your team"] },
  { name: "Overhaul", price: "$15,000+", description: "A full operational rebuild. Multiple systems, deeper integrations, bigger transformation.", features: ["Everything in Sprint", "Multiple systems addressed", "End-to-end integration", "Phased rollout & support"] },
];

const logos = [
  { src: "/logos/The Table Group Logo.jpeg", alt: "The Table Group" },
  { src: "/logos/trinidadbenhamlogo.png", alt: "Trinidad Benham" },
  { src: "/logos/BBB Lockup Stacked Light.png", alt: "Build Better Boards" },
  { src: "/logos/MCC.png", alt: "Mill City Church" },
  { src: "/logos/GS-black.png", alt: "Good Shepherd" },
  { src: "/logos/Peak - White - Horizontal.png", alt: "Peak" },
  { src: "/logos/Parallel Media Asset 5.png", alt: "Parallel Media" },
  { src: "/logos/panda-head-standalone.png", alt: "Panda" },
];

const capabilities = ["Strategy", "Design", "Development", "Video Production", "Finance & CPA", "Operations", "Change Management", "Data & Analytics", "Training & LMS", "Brand & Identity"];

/* ─── Page ─── */
export default function Home() {
  const active = useActiveSection(NAV_IDS);
  const showIsland = useScrollPast(500);
  const parallaxOffset = useParallax();

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#0d0d0d] overflow-x-hidden">
      <div className="grain" aria-hidden="true" />

      {/* ISLAND NAV — only nav, appears on scroll */}
      <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${showIsland ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="island-nav flex items-center gap-1 px-2 py-1.5 bg-[#0d0d0d]/90 backdrop-blur-xl rounded-full shadow-2xl shadow-black/20">
          {[{ id: "process", label: "Process" }, { id: "results", label: "Results" }, { id: "pricing", label: "Pricing" }, { id: "team", label: "Team" }].map((link) => (
            <a key={link.id} href={`#${link.id}`} className={`px-4 py-2.5 rounded-full text-[11px] font-sans tracking-[0.06em] transition-all duration-300 ${active === link.id ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}>
              {link.label}
            </a>
          ))}
          <Link href="/contact" className="ml-1 px-5 py-2.5 rounded-full bg-[#F5C842] text-[#0d0d0d] text-[11px] font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-all duration-300">
            Let&apos;s Talk
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════
          HERO — no nav, just the moment
          ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute top-0 right-0 w-[60vw] h-[70vh] opacity-25 pointer-events-none" style={{ background: "radial-gradient(ellipse at 75% 25%, #F5C842 0%, transparent 70%)", transform: `translateY(${parallaxOffset}px)` }} aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-20 pb-28 md:pt-28 md:pb-40 relative z-10">
          {/* Small logo mark */}

          <p className="hero-fade font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase text-[#0d0d0d]/25 mb-8">Human Solutions for a Robot World</p>

          <h1 className="hero-headline font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.96] tracking-tight max-w-5xl">
            You didn&apos;t start{" "}<span className="hidden md:inline"><br /></span>your business to{" "}<span className="hidden md:inline"><br /></span><span className="text-[#0d0d0d]/12">drown in busywork.</span>
          </h1>

          <p className="hero-fade hero-fade-2 font-sans text-lg md:text-xl text-[#0d0d0d]/40 mt-12 max-w-lg leading-relaxed">We build quiet tools that take the grunt work off your plate — so you can get back to the work only you can do.</p>

          <div className="hero-fade hero-fade-3 mt-14 flex items-center gap-5">
            <Link href="/contact" className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#F5C842] text-[#0d0d0d] text-sm font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-all duration-300 hover:shadow-lg hover:shadow-[#F5C842]/20">
              Book a Free Call<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
            <span className="text-[11px] font-sans text-[#0d0d0d]/18">15 min · No pitch · Just honest answers</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LOGO BAR
          ══════════════════════════════════════ */}
      <section className="border-y border-[#0d0d0d]/6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 md:py-12">
          <Reveal>
            <div className="flex items-center justify-between gap-6 md:gap-8 overflow-x-auto no-scrollbar">
              {logos.map((logo) => (
                <div key={logo.alt} className="logo-item flex-shrink-0 h-8 md:h-9 w-auto">
                  <Image src={logo.src} alt={logo.alt} height={36} width={130} className="h-full w-auto object-contain" style={{ maxWidth: "130px" }} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROCESS — dramatic, full-width rows
          ══════════════════════════════════════ */}
      <section id="process" className="bg-[#0d0d0d] text-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-32 md:py-44">
          <Reveal>
            <p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-white/20 mb-6">Process</p>
            <p className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-2xl mb-6">
              Good work, <span className="text-white/20">faster than you thought possible.</span>
            </p>
            <p className="font-sans text-sm text-white/25 max-w-md leading-relaxed mb-28">We move at the speed of your problem — not the speed of a committee. Real results, often in a week.</p>
          </Reveal>

          {[
            { num: "01", title: "Diagnose", text: "We sit down with you, ask the right questions, and find the one thing that's eating most of your time. No jargon. No upsell. Just clarity." },
            { num: "02", title: "Build", text: "We design and build a custom solution around how you actually work — not how some software company thinks you should. Fast, focused, and made to last." },
            { num: "03", title: "Sustain", text: "We hand it over with full training — or stay on to maintain, improve, and expand. We don't deliver and disappear." },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 120}>
              <div className="process-row grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 border-t border-white/6 items-baseline">
                <div className="md:col-span-1">
                  <span className="font-serif text-4xl md:text-5xl text-[#F5C842]/25">{step.num}</span>
                </div>
                <div className="md:col-span-3">
                  <p className="font-serif text-2xl md:text-3xl">{step.title}</p>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="font-sans text-base text-white/35 leading-relaxed">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          RESULTS — magazine-style case studies
          ══════════════════════════════════════ */}
      <section id="results">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-32 md:py-44">
          <Reveal>
            <p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/25 mb-6">Results</p>
            <p className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-2xl mb-28">
              Real-world results.{" "}<span className="text-[#0d0d0d]/15">Not hypotheticals.</span>
            </p>
          </Reveal>

          <div className="space-y-0">
            {caseStudies.map((study, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="case-study border-t border-[#0d0d0d]/8 py-16 md:py-20">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                    {/* Big stat */}
                    <div className="md:col-span-4">
                      <p className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none text-[#0d0d0d]">
                        {study.stat}
                      </p>
                      <p className="font-sans text-sm text-[#0d0d0d]/30 mt-3">
                        {study.unit && <span>{study.unit} </span>}{study.label}
                      </p>
                      <p className="font-sans text-xs text-[#0d0d0d]/20 mt-1 tracking-wide uppercase">{study.client}</p>
                    </div>

                    {/* Story */}
                    <div className="md:col-span-7 md:col-start-6 flex flex-col justify-between">
                      <div>
                        <p className="font-sans text-sm text-[#0d0d0d]/45 leading-relaxed mb-4">{study.story}</p>
                        <p className="font-sans text-sm text-[#0d0d0d]/55 leading-relaxed font-medium">{study.solution}</p>
                      </div>
                      <div className="mt-10 border-l-2 border-[#F5C842]/40 pl-5">
                        <p className="font-serif text-lg italic text-[#0d0d0d]/40 leading-snug">&ldquo;{study.quote}&rdquo;</p>
                        <p className="font-sans text-[11px] text-[#0d0d0d]/20 mt-3">{study.name}, {study.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-[#0d0d0d]/8" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
          ══════════════════════════════════════ */}
      <section id="pricing" className="border-t border-[#0d0d0d]/6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <Reveal>
            <p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/25 mb-5">Pricing</p>
            <p className="font-serif text-3xl md:text-4xl leading-snug tracking-tight max-w-lg mb-20">Simple pricing. <span className="text-[#0d0d0d]/15">No surprises.</span></p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 120}>
                <div className={`pricing-card relative p-9 md:p-10 flex flex-col min-h-[460px] ${tier.highlight ? "bg-[#0d0d0d] text-white pricing-card-highlight" : "bg-white/60 border border-[#0d0d0d]/6"}`}>
                  {tier.highlight && <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#F5C842]" />}
                  <div>
                    <p className={`font-sans text-[11px] font-medium tracking-[0.15em] uppercase ${tier.highlight ? "text-[#F5C842]" : "text-[#0d0d0d]/25"}`}>{tier.name}</p>
                    <p className="font-serif text-5xl md:text-6xl mt-4 tracking-tight">{tier.price}</p>
                    <p className={`font-sans text-sm mt-5 leading-relaxed ${tier.highlight ? "text-white/40" : "text-[#0d0d0d]/40"}`}>{tier.description}</p>
                  </div>
                  <ul className="mt-auto pt-10 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className={`font-sans text-sm flex items-start gap-3 ${tier.highlight ? "text-white/50" : "text-[#0d0d0d]/45"}`}>
                        <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${tier.highlight ? "bg-[#F5C842]" : "bg-[#0d0d0d]/12"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`mt-8 inline-block text-center py-3 rounded-full text-sm font-sans font-medium tracking-wide transition-all duration-300 ${tier.highlight ? "bg-[#F5C842] text-[#0d0d0d] hover:bg-[#e3b835] hover:shadow-lg hover:shadow-[#F5C842]/20" : "border border-[#0d0d0d]/10 text-[#0d0d0d]/45 hover:border-[#0d0d0d]/20 hover:text-[#0d0d0d]/65"}`}>
                    Get started →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}><p className="font-sans text-sm text-[#0d0d0d]/25 mt-10 text-center">Monthly retainer options available for ongoing support.</p></Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR TEAM — founders + deep bench merged
          ══════════════════════════════════════ */}
      <section id="team" className="bg-[#0d0d0d] text-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-32 md:py-44">
          <Reveal>
            <p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-white/20 mb-6">Our Team</p>
            <p className="font-serif text-4xl md:text-5xl leading-[1.08] tracking-tight max-w-xl mb-20">
              Real people.{" "}<span className="text-white/20">A deep bench of world-class talent.</span>
            </p>
          </Reveal>

          {/* Founders — Drew first */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-24">
            <Reveal delay={100}>
              <div className="flex gap-6">
                <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 overflow-hidden rounded-full">
                  <Image src="/Headshots/DM.jpeg" alt="Drew MacAlmon" width={112} height={112} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div>
                  <p className="font-serif text-xl mb-2">Drew MacAlmon</p>
                  <p className="font-sans text-sm text-white/30 leading-relaxed">15+ years producing documentaries, live events, and complex productions around the world. He makes complicated operations look effortless — and builds tools with that same precision.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex gap-6">
                <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 overflow-hidden rounded-full">
                  <Image src="/Headshots/CB.jpeg" alt="Casey Batezel" width={112} height={112} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div>
                  <p className="font-serif text-xl mb-2">Casey Batezel</p>
                  <p className="font-sans text-sm text-white/30 leading-relaxed">Background in photojournalism, master&apos;s in organizational leadership. He turns ambiguity into action — asking the right questions, building durable systems, and making teams faster.</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* The bench */}
          <Reveal>
            <div className="border-t border-white/6 pt-16">
              <p className="font-sans text-sm text-white/35 max-w-lg leading-relaxed mb-10">
                You don&apos;t just get us. We&apos;ve built a network of leading experts from across the country — designers, developers, finance professionals, CPAs, and operators. Whatever your business needs, we bring the right people to the table.
              </p>
              <div className="flex flex-wrap gap-3">
                {capabilities.map((cap, i) => (
                  <span key={cap} className="capability-tag px-5 py-2.5 border border-white/8 text-xs font-sans tracking-wide text-white/30 hover:border-[#F5C842]/40 hover:text-white/55 transition-all duration-500 cursor-default" style={{ transitionDelay: `${i * 40}ms` }}>
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════ */}
      <section className="bg-[#f5f0e8]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <Reveal>
            <p className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Stop drowning in<br /><span className="text-[#0d0d0d]/12">the day-to-day.</span>
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-sans text-sm text-[#0d0d0d]/35 mt-8 max-w-md mx-auto leading-relaxed">Book a free 15-minute call. We&apos;ll listen, ask the right questions, and tell you honestly whether we can help.</p>
          </Reveal>
          <Reveal delay={180}>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 mt-10 px-8 py-4 rounded-full bg-[#F5C842] text-[#0d0d0d] text-sm font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-all duration-300 hover:shadow-lg hover:shadow-[#F5C842]/20">
              Book a Free Call<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#0d0d0d]/6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span className="font-serif text-base text-[#0d0d0d]/25">AI Delivered</span>
          <div className="font-sans text-xs text-[#0d0d0d]/18 flex gap-6">
            <a href="mailto:drew@aidelivered.com" className="hover:text-[#0d0d0d]/40 transition-colors duration-300">drew@aidelivered.com</a>
            <a href="mailto:casey@aidelivered.com" className="hover:text-[#0d0d0d]/40 transition-colors duration-300">casey@aidelivered.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
