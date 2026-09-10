import { SilhouetteBadge } from "@/components/SilhouetteBadge";
import type { FitObjective } from "@/lib/types";

export const metadata = {
  title: "Our Approach — Contour",
  description: "How Contour engineers fashion for women XL–6XL. The strategy, the system, the difference.",
};

const SILHOUETTE_TAGS: { tag: FitObjective; meaning: string }[] = [
  { tag: "smooth", meaning: "Smoother visual line around midsection" },
  { tag: "define", meaning: "Creates waist definition" },
  { tag: "balance", meaning: "Visually balances shoulders and hips" },
  { tag: "lengthen", meaning: "Longer-looking leg/body line" },
  { tag: "enhance", meaning: "Adds visual emphasis where you want it" },
  { tag: "skim", meaning: "Falls over the body rather than clings" },
  { tag: "structure", meaning: "Provides shape rather than simply hanging" },
];

const FOUR_LAYERS = [
  {
    number: "01",
    title: "Extended Sizing",
    desc: "XL to 6XL — every size graded on its own pattern block, not scaled from a smaller size.",
  },
  {
    number: "02",
    title: "Proportion-Aware Construction",
    desc: "Patterns graded for bust, waist, hip, abdomen, thigh, upper arm, shoulder, torso, rise, and length — independently.",
  },
  {
    number: "03",
    title: "Silhouette Engineering",
    desc: "Every garment has intentional design objectives: what it smooths, defines, balances, or enhances.",
  },
  {
    number: "04",
    title: "Fashion",
    desc: "The result looks like something a fashionable 25-year-old wants to wear — not “the plus-size version.”",
  },
];

const COMPETITORS = [
  { name: "Myntra Plus-Size", fit: "Generic", fashion: "Mixed", price: "₹800–3,000+", approach: "Marketplace aggregation" },
  { name: "plusS", fit: "Standard grading", fashion: "Conservative", price: "₹600–1,500", approach: "Basic extended sizing" },
  { name: "WOMEN PLUS", fit: "Standard grading", fashion: "Trend-led", price: "₹400–1,200", approach: "Fast-fashion scaling" },
  { name: "Contour", fit: "Proportion-aware", fashion: "Engineered editorial", price: "₹599–1,499", approach: "Silhouette engineering + fit data" },
];

const BUSINESS_FLOW = [
  { stage: "Design", detail: "Proportion-aware patterns, silhouette-tagged construction" },
  { stage: "Manufacture", detail: "D2C — no marketplace middlemen, no wholesale margin" },
  { stage: "Discover", detail: "Instagram content, creator partnerships, real-body styling" },
  { stage: "Trust", detail: "Creator reviews, Fit Finder, transparent sizing" },
  { stage: "Convert", detail: "Website + Fit Finder → right product, right size, first time" },
  { stage: "Retain", detail: "CRM + WhatsApp — fit data improves every repurchase" },
];

const KPIS = [
  { metric: "CAC", target: "< ₹350", why: "D2C + organic content keeps acquisition efficient" },
  { metric: "Conversion Rate", target: "> 3.5%", why: "Fit Finder reduces size uncertainty at checkout" },
  { metric: "Return Rate", target: "< 8%", why: "Proportion-aware fit = fewer wrong-size returns" },
  { metric: "AOV", target: "> ₹1,100", why: "Co-ords and multi-piece styling drive basket size" },
  { metric: "Repeat Purchase", target: "> 35% @ 6mo", why: "Fit data flywheel makes each purchase better" },
  { metric: "Contribution Margin", target: "> 55%", why: "D2C pricing + ₹599–1,499 band sustains margin" },
];

export default function OurApproachPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Campaign headline */}
      <p className="text-sm font-semibold uppercase tracking-widest text-c-accent">
        Our Approach
      </p>
      <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
        Your Body Isn&apos;t Difficult.<br />The Fit Was.
      </h1>

      {/* Section 1: Brand story */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
          We Don&apos;t Tell You What Your Body Should Look Like
        </h2>
        <p className="mt-4 text-lg text-c-text-secondary leading-relaxed max-w-2xl">
          We design clothes around the way you want to look and feel. You choose the silhouette.
          We engineer the fit. That&apos;s the deal.
        </p>
        <p className="mt-4 text-c-text-secondary leading-relaxed max-w-2xl">
          Contour exists because good clothes should fit properly — regardless of the number on
          the label. No body-positive slogans. No apologies. Just fashion that accounts for how
          your body actually works.
        </p>
      </section>

      {/* Section 2: The problem */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
          The Problem
        </h2>
        <div className="mt-6 rounded-xl border border-c-border p-6 sm:p-8 bg-c-surface">
          <p className="text-lg font-medium">
            Most clothing is designed around standardised proportions — then simply scaled up.
          </p>
          <p className="mt-4 text-c-text-secondary leading-relaxed">
            A size 2XL isn&apos;t a size M with bigger numbers. Proportions shift: bust-to-waist
            ratios change, upper arms need different ease, torso length varies, abdomen shape
            differs. Scaling a pattern up produces garments that technically &ldquo;fit&rdquo; but
            sit wrong, pull in the wrong places, and make you look like you&apos;re wearing
            someone else&apos;s clothes.
          </p>
          <p className="mt-4 text-c-text-secondary leading-relaxed">
            The market already has plus-size availability. Availability is not the problem.
            The problem is that availability without proportion-aware construction is just
            more badly-fitting clothes in bigger numbers.
          </p>
        </div>
      </section>

      {/* Section 3: Four-layer differentiation */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
          Four Layers Deep
        </h2>
        <p className="mt-3 text-c-text-secondary">
          Most brands stop at layer one. We go to four.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FOUR_LAYERS.map((layer) => (
            <div key={layer.number} className="rounded-xl border border-c-border p-6 bg-c-surface">
              <span className="text-3xl font-heading font-bold text-c-accent">{layer.number}</span>
              <h3 className="mt-2 font-semibold text-lg">{layer.title}</h3>
              <p className="mt-2 text-sm text-c-text-secondary leading-relaxed">{layer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Silhouette Engineering */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
          Silhouette Engineering&trade;
        </h2>
        <p className="mt-3 text-c-text-secondary max-w-2xl">
          Every Contour garment is tagged with its design objectives — what it&apos;s
          engineered to do for your silhouette. These aren&apos;t marketing labels.
          They&apos;re construction commitments.
        </p>
        <div className="mt-8 space-y-4">
          {SILHOUETTE_TAGS.map(({ tag, meaning }) => (
            <div key={tag} className="flex items-start gap-4">
              <SilhouetteBadge tag={tag} size="md" />
              <p className="text-sm text-c-text-secondary pt-1">{meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Competitive positioning */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
          Where We Sit
        </h2>
        <p className="mt-3 text-c-text-secondary">
          Availability is table stakes. The differentiator is fit + fashion + price.
        </p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-c-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-c-accent-light">
                <th className="px-4 py-3 font-semibold">Brand</th>
                <th className="px-4 py-3 font-semibold">Fit Approach</th>
                <th className="px-4 py-3 font-semibold">Fashion</th>
                <th className="px-4 py-3 font-semibold">Price Range</th>
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((c, i) => (
                <tr
                  key={c.name}
                  className={`${
                    c.name === "Contour" ? "bg-c-accent-light font-medium" : i % 2 === 0 ? "bg-c-surface" : "bg-c-bg"
                  }`}
                >
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.fit}</td>
                  <td className="px-4 py-3">{c.fashion}</td>
                  <td className="px-4 py-3">{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6: Target customer */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
          Who We Design For
        </h2>
        <div className="mt-6 rounded-xl border border-c-border p-6 sm:p-8 bg-c-surface">
          <p className="text-lg font-medium">Fashion-conscious. Price-conscious. Digitally active.</p>
          <ul className="mt-4 space-y-2 text-c-text-secondary">
            <li className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-c-accent before:font-bold">
              Women aged 25–34, sizes XL to 6XL
            </li>
            <li className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-c-accent before:font-bold">
              Know what looks good — frustrated that their size range doesn&apos;t get the same options
            </li>
            <li className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-c-accent before:font-bold">
              Price-sensitive but willing to pay for fit — sweet spot ₹599–₹1,499
            </li>
            <li className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-c-accent before:font-bold">
              Discover brands on Instagram, validate through creator content, buy on mobile
            </li>
            <li className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-c-accent before:font-bold">
              Current alternatives: Myntra marketplace, plusS, WOMEN PLUS, local tailoring
            </li>
          </ul>
        </div>
      </section>

      {/* Section 7: Business model */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
          How It Works
        </h2>
        <p className="mt-3 text-c-text-secondary">
          D2C from design to doorstep. No marketplace commission, no wholesale margin, no diluted brand.
        </p>
        <div className="mt-8 space-y-0">
          {BUSINESS_FLOW.map((step, i) => (
            <div key={step.stage} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-c-accent text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                {i < BUSINESS_FLOW.length - 1 && (
                  <div className="w-px flex-1 bg-c-border" />
                )}
              </div>
              <div className="pb-6">
                <h3 className="font-semibold">{step.stage}</h3>
                <p className="text-sm text-c-text-secondary mt-1">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: Fit-data flywheel + KPIs */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
          The Fit-Data Flywheel
        </h2>
        <p className="mt-3 text-c-text-secondary max-w-2xl">
          Every purchase generates fit data. Every data point improves the next pattern.
          The flywheel compounds: design better → sell better → learn more → design better.
        </p>

        {/* Flywheel visual */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Design", "Sell", "Collect Fit Data", "Improve Patterns", "Redesign", "Sell Better"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-c-accent-light text-sm font-semibold">{step}</span>
              {i < arr.length - 1 && (
                <span className="text-c-accent font-bold">&rarr;</span>
              )}
            </div>
          ))}
        </div>

        {/* KPIs */}
        <h3 className="mt-12 font-heading text-xl font-semibold">Key Metrics</h3>
        <div className="mt-4 overflow-x-auto rounded-lg border border-c-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-c-accent-light">
                <th className="px-4 py-3 font-semibold">Metric</th>
                <th className="px-4 py-3 font-semibold">Target</th>
                <th className="px-4 py-3 font-semibold">Why</th>
              </tr>
            </thead>
            <tbody>
              {KPIS.map((kpi, i) => (
                <tr key={kpi.metric} className={i % 2 === 0 ? "bg-c-surface" : "bg-c-bg"}>
                  <td className="px-4 py-3 font-medium">{kpi.metric}</td>
                  <td className="px-4 py-3">{kpi.target}</td>
                  <td className="px-4 py-3 text-c-text-secondary">{kpi.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
