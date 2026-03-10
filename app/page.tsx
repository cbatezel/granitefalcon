const CAL_LINK = "https://cal.com";

const caseStudies = [
  {
    result: "14 hrs/week",
    resultLabel: "saved",
    client: "Real Estate Company",
    description:
      "Custom client intake and document management app that eliminated manual data entry and cut processing time in half.",
  },
  {
    result: "3x faster",
    resultLabel: "reporting",
    client: "Wine Bottling Facility",
    description:
      "Operations dashboard that consolidated three separate tracking systems into a single real-time view.",
  },
  {
    result: "Zero",
    resultLabel: "admin overhead",
    client: "Executive Cohort",
    description:
      "Private member roster and portal that runs the entire program without a dedicated administrator.",
  },
];

const testimonials = [
  {
    quote:
      "They didn't just build us software — they understood our business first. We've gotten more done in three months than we did all last year.",
    name: "Sarah M.",
    title: "Real Estate Broker",
  },
  {
    quote:
      "I was skeptical about AI tools, but Casey and Drew built something that actually fits how we work. No learning curve, no nonsense.",
    name: "James T.",
    title: "Small Business Owner",
  },
];

const logoPlaceholders = [
  "Real Estate",
  "Hospitality",
  "Wine & Spirits",
  "Executive Education",
  "Professional Services",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#0d0d0d]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#f5f0e8] border-b border-[#0d0d0d]/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <span className="font-serif text-xl tracking-tight">
            AI Delivered
          </span>
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-sans font-medium text-[#0d0d0d] hover:text-[#F5C842] transition-colors"
            style={{ color: "#F5C842" }}
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-24 md:pt-44 md:pb-36">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-4xl">
          Human Solutions
          <br />
          for a Robot World
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#0d0d0d]/60 mt-8 max-w-lg">
          Custom tools for small business owners.
        </p>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 px-8 py-4 bg-[#F5C842] text-[#0d0d0d] text-sm font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-colors"
        >
          Book a Free Call
        </a>
      </section>

      {/* FOUNDERS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-36">
        <p className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/40 mb-16">
          Who We Are
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="bg-[#0d0d0d]/5 aspect-[4/5] w-full max-w-sm mb-6" />
            <p className="font-serif text-2xl">Casey</p>
            <p className="font-sans text-sm text-[#0d0d0d]/50 mt-1">
              Owner of [Business]
            </p>
          </div>
          <div>
            <div className="bg-[#0d0d0d]/5 aspect-[4/5] w-full max-w-sm mb-6" />
            <p className="font-serif text-2xl">Drew MacAlmon</p>
            <p className="font-sans text-sm text-[#0d0d0d]/50 mt-1">
              Owner of [Business]
            </p>
          </div>
        </div>
        <p className="font-sans text-lg text-[#0d0d0d]/60 mt-16 max-w-2xl">
          We&apos;re business owners who built these tools for ourselves first.
        </p>
      </section>

      {/* CASE STUDIES */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-36">
        <p className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/40 mb-16">
          Work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudies.map((study) => (
            <div
              key={study.client}
              className="bg-[#0d0d0d] text-white p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <p className="font-serif text-4xl md:text-5xl text-[#F5C842]">
                  {study.result}
                </p>
                <p className="font-sans text-sm text-white/50 mt-1">
                  {study.resultLabel}
                </p>
              </div>
              <div className="mt-auto pt-12">
                <p className="font-sans text-sm font-medium text-white/80">
                  {study.client}
                </p>
                <p className="font-sans text-sm text-white/40 mt-2 leading-relaxed">
                  {study.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-36">
        <p className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/40 mb-16">
          What Clients Say
        </p>
        <div className="space-y-20">
          {testimonials.map((t) => (
            <div key={t.name} className="max-w-3xl">
              <blockquote className="font-serif text-2xl md:text-4xl italic leading-snug">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="font-sans text-sm text-[#0d0d0d]/50 mt-6">
                {t.name}, {t.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LOGOS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-36">
        <p className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[#0d0d0d]/40 mb-16">
          Businesses We&apos;ve Worked With
        </p>
        <div className="flex flex-wrap gap-4">
          {logoPlaceholders.map((label) => (
            <div
              key={label}
              className="bg-[#0d0d0d]/5 px-8 py-5 font-sans text-xs text-[#0d0d0d]/30 tracking-wide"
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#0d0d0d]/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <span className="font-serif text-lg">AI Delivered</span>
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#F5C842] text-[#0d0d0d] text-sm font-sans font-medium tracking-wide hover:bg-[#e3b835] transition-colors"
          >
            Book a Call
          </a>
          <div className="font-sans text-sm text-[#0d0d0d]/40 space-y-1">
            <p>drew@aidelivered.com</p>
            <p>casey@aidelivered.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
