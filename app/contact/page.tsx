"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
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
  return (<div ref={ref} className={`reveal-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false);
  const handleScroll = useCallback(() => { setPast(window.scrollY > threshold); }, [threshold]);
  useEffect(() => { window.addEventListener("scroll", handleScroll, { passive: true }); return () => window.removeEventListener("scroll", handleScroll); }, [handleScroll]);
  return past;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); }, { rootMargin: "-40% 0px -55% 0px" });
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

const NAV_IDS = ["process", "work", "pricing", "team", "about"];

const stats = [
  { number: "14", unit: "hrs/wk", label: "saved" },
  { number: "3x", unit: "", label: "faster reporting" },
  { number: "1,000+", unit: "", label: "employees trained" },
  { number: "Zero", unit: "", label: "admin overhead" },
];

const caseStudies = [
  { client: "Real Estate Company", stat: "14 hrs/week saved", problem: "The team was buried in manual intake forms and scattered documents across three different systems. Every new client meant hours of redundant data entry.", solution: "We built a custom client intake and document management app that centralized everything — eliminating duplicate entry and cutting processing time in half.", quote: "We've gotten more done in three months than we did all last year.", name: "Sarah M.", title: "Real Estate Broker" },
  { client: "Trinidad Benham", stat: "1,000+ employees trained", problem: "They needed to roll out a new internal software system across a massive workforce — on desktop and mobile — without grinding operations to a halt.", solution: "We built a custom LMS with 40+ professional instructional videos, presenter segments, and detailed tutorials. Mobile-friendly, with full content control for learning leaders.", quote: "The training platform made what could have been a nightmare rollout feel seamless.", name: "Operations Lead", title: "Trinidad Benham" },
  { client: "Executive Cohort Program", stat: "Zero admin overhead", problem: "Running a private executive cohort meant constant manual work — roster updates, member communications, content distribution. They needed a full-time admin but couldn't justify the hire.", solution: "We built a private member portal that handles the entire program — roster, content, communications — without a dedicated administrator.", quote: "They built something that actually fits how we work. No learning curve, no nonsense.", name: "James T.", title: "Program Director" },
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

export default function Home() {
  const active = useActiveSection(NAV_IDS);
  const showIsland = useScrollPast(600);
  const parallaxOffset = useParallax();
  const [expandedStudy, setExpandedStudy] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#0d0d0d] overflow-x-hidden">
      <div className="grain" aria-hidden="true" />

      {/* TOP NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#f5f0e8]/80 border-b border-[#0d0d0d]/5 transition-all duration-500 ${showIsland ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100"}`}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-14">
          <span className="font-serif text-lg tracking-tight">AI Delivered</span>
          <Link href="/contact" className="text-xs font-sans font-medium px-4 py-2 bg-[#F5C842] text-[#0d0d0d] hover:bg-[#e3b835] transition-all duration-300">
            Let&apos;s Talk
          </Link>
        </div>
      </nav>

      {/* ISLAND NAV */}
      <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${showIsland ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="island-nav flex items-center gap-1 px-2 py-1.5 bg-[#0d0d0d]/90 backdrop-blur-xl rounded-full shadow-2xl shadow-black/20">
          {[{ id: "process", label: "Process" }, { id: "work", label: "Work" }, { id: "pricing", label: "Pricing" }, { id: "team", label: "Team" }, { id: "about", label: "About" }].map((link) => (
            <a key={link.id} href={`#${link.id}`} className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-[0.06em] transition-all duration-300 ${active === link.id ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}>
              {link.label}
            </a>
          ))}
          <Link href="/contact" className="ml-1 px-4 py-1.5 rounded-full bg-[#F5C842] text-[#0d0d0d] text-[11px] font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-all duration-300">
            Let&apos;s Talk
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute top-0 right-0 w-[60vw] h-[70vh] opacity-25 pointer-events-none" style={{ background: "radial-gradient(ellipse at 75% 25%, #F5C842 0%, transparent 70%)", transform: `translateY(${parallaxOffset}px)` }} aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-36 pb-28 md:pt-44 md:pb-40 relative z-10">
          <p className="hero-fade font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase text-[#0d0d0d]/30 mb-8">Human Solutions for a Robot World</p>
          <h1 className="hero-headline font-serif text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.98] tracking-tight max-w-5xl">
            You didn&apos;t start<br />your business to<br /><span className="text-[#0d0d0d]/15">drown in busywork.</span>
          </h1>
          <p className="hero-fade hero-fade-2 font-sans text-lg md:text-xl text-[#0d0d0d]/45 mt-10 max-w-lg leading-relaxed">We build quiet tools that take the grunt work off your plate — so you can get back to the work only you can do.</p>
          <div className="hero-fade hero-fade-3 mt-12 flex items-center gap-5">
            <Link href="/contact" className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#F5C842] text-[#0d0d0d] text-sm font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-all duration-300 hover:shadow-lg hover:shadow-[#F5C842]/20">
              Book a Free Call<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
            <span className="text-[11px] font-sans text-[#0d0d0d]/20">15 min · No pitch · Just honest answers</span>
          </div>
        </div>
      </section>

      {/* LOGO BAR */}
      <section className="border-t border-[#0d0d0d]/6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-14">
          <Reveal>
            <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#0d0d0d]/20 text-center mb-10">Teams we&apos;ve worked with</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
              {logos.map((logo) => (
                <div key={logo.alt} className="logo-mono relative h-7 md:h-8 w-auto">
                  <Image src={logo.src} alt={logo.alt} height={32} width={120} className="h-full w-auto object-contain" style={{ maxWidth: "120px" }} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="bg-[#0d0d0d] text-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-24">
              <div>
                <p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-white/20 mb-5">Process</p>
                <p className="font-serif text-3xl md:text-4xl leading-snug max-w-md">Good work, <span className="text-white/25">faster than you thought possible.</span></p>
              </div>
              <p className="font-sans text-sm text-white/25 max-w-xs leading-relaxed">We move at the speed of your problem — not the speed of a committee.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
            {[{ num: "01", title: "Diagnose", text: "We find your #1 operational pain point. No jargon, no upsell — just the right questions." }, { num: "02", title: "Build", text: "A custom solution that eliminates or dramatically reduces the problem. Built around how you actually work." }, { num: "03", title: "Sustain", text: "We hand it over — or stay on to maintain and expand. We don't deliver and disappear." }].map((step, i) => (
              <Reveal key={step.num} delay={i * 140}>
                <div className="border-t border-white/8 pt-8">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-serif text-2xl text-[#F5C842]/40">{step.num}</span>
                    <p className="font-serif text-xl">{step.title}</p>
                  </div>
                  <p className="font-sans text-sm text-white/30 leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36">
        <Reveal><p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/30 mb-20">Work</p></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mb-24">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div>
                <p className="font-serif text-4xl md:text-5xl tracking-tight">{s.number}{s.unit && <span className="text-[#0d0d0d]/20 text-2xl md:text-3xl ml-1">{s.unit}</span>}</p>
                <p className="font-sans text-xs text-[#0d0d0d]/25 mt-2 tracking-wide uppercase">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="space-y-0">
          {caseStudies.map((study, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="border-t border-[#0d0d0d]/8">
                <button onClick={() => setExpandedStudy(expandedStudy === i ? null : i)} className="w-full py-8 md:py-10 flex flex-col md:flex-row md:items-baseline justify-between gap-3 text-left group cursor-pointer">
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-serif text-2xl md:text-3xl group-hover:text-[#F5C842] transition-colors duration-500">{study.stat}</span>
                    <span className="font-sans text-sm text-[#0d0d0d]/30">{study.client}</span>
                  </div>
                  <span className={`font-sans text-lg text-[#0d0d0d]/20 transition-transform duration-500 leading-none ${expandedStudy === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${expandedStudy === i ? "grid-rows-[1fr] opacity-100 pb-10" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pt-2">
                      <div className="md:col-span-4">
                        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#0d0d0d]/20 mb-3">The Problem</p>
                        <p className="font-sans text-sm text-[#0d0d0d]/40 leading-relaxed">{study.problem}</p>
                      </div>
                      <div className="md:col-span-4">
                        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#0d0d0d]/20 mb-3">What We Built</p>
                        <p className="font-sans text-sm text-[#0d0d0d]/40 leading-relaxed">{study.solution}</p>
                      </div>
                      <div className="md:col-span-4">
                        <div className="border-l-2 border-[#F5C842]/40 pl-5">
                          <p className="font-serif text-base md:text-lg italic text-[#0d0d0d]/45 leading-snug">&ldquo;{study.quote}&rdquo;</p>
                          <p className="font-sans text-[11px] text-[#0d0d0d]/20 mt-3">{study.name}, {study.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-[#0d0d0d]/8" />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-[#0d0d0d]/6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <Reveal>
            <p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/30 mb-5">Pricing</p>
            <p className="font-serif text-3xl md:text-4xl leading-snug tracking-tight max-w-lg mb-20">Simple pricing. <span className="text-[#0d0d0d]/20">No surprises.</span></p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 120}>
                <div className={`pricing-card relative p-9 md:p-10 flex flex-col min-h-[460px] ${tier.highlight ? "bg-[#0d0d0d] text-white pricing-card-highlight" : "bg-white/60 border border-[#0d0d0d]/6"}`}>
                  {tier.highlight && <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#F5C842]" />}
                  <div>
                    <p className={`font-sans text-[11px] font-medium tracking-[0.15em] uppercase ${tier.highlight ? "text-[#F5C842]" : "text-[#0d0d0d]/30"}`}>{tier.name}</p>
                    <p className="font-serif text-5xl md:text-6xl mt-4 tracking-tight">{tier.price}</p>
                    <p className={`font-sans text-sm mt-5 leading-relaxed ${tier.highlight ? "text-white/40" : "text-[#0d0d0d]/40"}`}>{tier.description}</p>
                  </div>
                  <ul className="mt-auto pt-10 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className={`font-sans text-sm flex items-start gap-3 ${tier.highlight ? "text-white/50" : "text-[#0d0d0d]/45"}`}>
                        <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${tier.highlight ? "bg-[#F5C842]" : "bg-[#0d0d0d]/15"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`mt-8 inline-block text-center py-3 text-sm font-sans font-medium tracking-wide transition-all duration-300 ${tier.highlight ? "bg-[#F5C842] text-[#0d0d0d] hover:bg-[#e3b835] hover:shadow-lg hover:shadow-[#F5C842]/20" : "border border-[#0d0d0d]/10 text-[#0d0d0d]/50 hover:border-[#0d0d0d]/25 hover:text-[#0d0d0d]/70"}`}>
                    Get started →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}><p className="font-sans text-sm text-[#0d0d0d]/30 mt-10 text-center">Monthly retainer options available for ongoing support.</p></Reveal>
        </div>
      </section>

      {/* YOUR TEAM */}
      <section id="team" className="bg-[#0d0d0d] text-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <Reveal>
            <p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-white/20 mb-5">Your Team</p>
            <p className="font-serif text-3xl md:text-4xl leading-snug max-w-xl mb-8">You don&apos;t just get us. <span className="text-white/25">You get an entire bench of world-class experts.</span></p>
            <p className="font-sans text-sm text-white/30 max-w-lg leading-relaxed mb-16">We&apos;ve built a network of leading designers, developers, finance professionals, CPAs, and operators from across the country. Whatever your business needs, we know the people — and we bring them to bear for you.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3">
              {capabilities.map((cap, i) => (
                <span key={cap} className="capability-tag px-5 py-2.5 border border-white/8 text-xs font-sans tracking-wide text-white/35 hover:border-[#F5C842]/40 hover:text-white/60 transition-all duration-500 cursor-default" style={{ transitionDelay: `${i * 50}ms` }}>
                  {cap}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT — Drew first */}
      <section id="about">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <Reveal><p className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/30 mb-16">About</p></Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
              <div className="md:col-span-3 flex md:flex-col gap-4">
                <div className="w-20 h-20 md:w-full md:h-auto md:aspect-[4/3] overflow-hidden">
                  <Image src="/Headshots/DM.jpeg" alt="Drew MacAlmon" width={400} height={300} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="w-20 h-20 md:w-full md:h-auto md:aspect-[4/3] overflow-hidden">
                  <Image src="/Headshots/CB.jpeg" alt="Casey Batezel" width={400} height={300} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="font-serif text-2xl md:text-3xl leading-snug mb-8">Drew MacAlmon &amp; Casey Batezel</p>
                <div className="font-sans text-sm text-[#0d0d0d]/40 leading-relaxed space-y-5 max-w-xl">
                  <p>Drew has spent 15+ years producing everything from documentaries to large-scale live events around the world — LED walls, livestreams, multi-camera captures, stage design. He knows what it takes to make complex operations look effortless, and brings that same precision to building tools that actually work.</p>
                  <p>Casey brings clarity to complexity. With a background in photojournalism and a master&apos;s in organizational leadership, he helps leaders turn ambiguity into action — asking the right questions, building durable systems, and making teams move faster without losing the human side.</p>
                  <p className="text-[#0d0d0d]/55">We&apos;re not a tech company. We&apos;re business owners and problem-solvers who got tired of watching good people waste hours on work a machine should handle.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0d0d0d] text-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <Reveal><p className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">Stop drowning in<br /><span className="text-white/20">the day-to-day.</span></p></Reveal>
          <Reveal delay={100}><p className="font-sans text-sm text-white/30 mt-8 max-w-md mx-auto leading-relaxed">Book a free 15-minute call. We&apos;ll listen, ask the right questions, and tell you honestly whether we can help.</p></Reveal>
          <Reveal delay={180}>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 mt-10 px-8 py-4 bg-[#F5C842] text-[#0d0d0d] text-sm font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-all duration-300 hover:shadow-lg hover:shadow-[#F5C842]/20">
              Book a Free Call<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/6 bg-[#0d0d0d] text-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span className="font-serif text-base text-white/30">AI Delivered</span>
          <div className="font-sans text-xs text-white/15 flex gap-6">
            <span>drew@aidelivered.com</span>
            <span>casey@aidelivered.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
