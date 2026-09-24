import Link from "next/link";

const SIZES = ["XL", "2XL", "3XL", "4XL", "5XL", "6XL"] as const;

const MEASUREMENTS: Record<string, { bust: [number, number]; waist: [number, number]; hip: [number, number]; upperArm: [number, number] }> = {
  XL:   { bust: [102, 107], waist: [86, 91],  hip: [107, 112], upperArm: [36, 38] },
  "2XL": { bust: [107, 112], waist: [91, 96],  hip: [112, 117], upperArm: [38, 40] },
  "3XL": { bust: [112, 117], waist: [96, 101], hip: [117, 122], upperArm: [40, 42] },
  "4XL": { bust: [117, 122], waist: [101, 106], hip: [122, 127], upperArm: [42, 44] },
  "5XL": { bust: [122, 127], waist: [106, 111], hip: [127, 132], upperArm: [44, 46] },
  "6XL": { bust: [127, 132], waist: [111, 116], hip: [132, 137], upperArm: [46, 48] },
};

function cmToIn(cm: number): string {
  return (cm / 2.54).toFixed(1);
}

function RangeCell({ range }: { range: [number, number] }) {
  return (
    <td className="px-4 py-3 text-sm text-center">
      <span>{range[0]}–{range[1]} cm</span>
      <br />
      <span className="text-c-text-secondary text-xs">{cmToIn(range[0])}–{cmToIn(range[1])}&quot;</span>
    </td>
  );
}

const GARMENT_NOTES = [
  {
    category: "Dresses",
    notes: [
      "A-line midis have extra room through the hip for a smooth drape.",
      "Wrap dresses are designed with a deeper wrap to stay secure across a fuller bust.",
    ],
  },
];

const MEASURE_POINTS = [
  { label: "Bust", instruction: "Measure around the fullest part of your bust, keeping the tape level across your back." },
  { label: "Waist", instruction: "Measure at your natural waist — the narrowest point of your torso, usually just above the belly button." },
  { label: "Hip", instruction: "Measure around the fullest part of your hips and seat, roughly 20 cm below your waist." },
  { label: "Upper Arm", instruction: "Measure around the fullest part of your upper arm, with your arm relaxed at your side." },
];

export const metadata = {
  title: "Size Guide — Contour",
  description: "Find your perfect fit. Measurement chart for XL to 6XL with garment-specific fit notes.",
};

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <h1 className="font-heading text-4xl sm:text-5xl font-bold">Size Guide</h1>
      <p className="mt-4 text-lg text-c-text-secondary max-w-2xl">
        Every Contour garment is graded for proportion — not just scaled up.
        Use the chart below to find your starting size, then check the garment-specific notes for each category.
      </p>

      {/* Measurement table */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold">Measurements</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-c-border">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-c-accent-light">
                <th className="px-4 py-3 text-sm font-semibold">Size</th>
                <th className="px-4 py-3 text-sm font-semibold text-center">Bust</th>
                <th className="px-4 py-3 text-sm font-semibold text-center">Waist</th>
                <th className="px-4 py-3 text-sm font-semibold text-center">Hip</th>
                <th className="px-4 py-3 text-sm font-semibold text-center">Upper Arm</th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size, i) => {
                const m = MEASUREMENTS[size];
                return (
                  <tr key={size} className={i % 2 === 0 ? "bg-c-surface" : "bg-c-bg"}>
                    <td className="px-4 py-3 text-sm font-semibold">{size}</td>
                    <RangeCell range={m.bust} />
                    <RangeCell range={m.waist} />
                    <RangeCell range={m.hip} />
                    <RangeCell range={m.upperArm} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-c-text-secondary">
          All measurements are body measurements in centimetres. If you&apos;re between sizes, we recommend sizing up for a more relaxed fit or checking the Fit Finder for personalised guidance.
        </p>
      </section>

      {/* How to measure */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold">How to Measure</h2>
        <p className="mt-2 text-sm text-c-text-secondary">
          Use a soft measuring tape. Stand naturally — don&apos;t pull the tape tight or hold your breath.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {MEASURE_POINTS.map((pt) => (
            <div key={pt.label} className="rounded-lg border border-c-border p-5">
              <h3 className="font-semibold text-sm uppercase tracking-wide">{pt.label}</h3>
              <p className="mt-2 text-sm text-c-text-secondary leading-relaxed">{pt.instruction}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Garment-specific fit notes */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold">Garment Fit Notes</h2>
        <p className="mt-2 text-sm text-c-text-secondary">
          Because we engineer each category differently, here&apos;s what to expect.
        </p>
        <div className="mt-6 space-y-6">
          {GARMENT_NOTES.map((g) => (
            <div key={g.category}>
              <h3 className="font-semibold text-lg">{g.category}</h3>
              <ul className="mt-2 space-y-1">
                {g.notes.map((n, i) => (
                  <li key={i} className="text-sm text-c-text-secondary pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-c-accent before:font-bold">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Fit Finder CTA */}
      <section className="mt-16 rounded-xl bg-c-accent-light p-8 sm:p-10 text-center">
        <h2 className="font-heading text-2xl font-semibold">Not Sure About Your Size?</h2>
        <p className="mt-3 text-c-text-secondary max-w-md mx-auto">
          Our Fit Finder recommends products based on your proportions and preferences — not just a number.
        </p>
        <Link
          href="/fit-finder"
          className="mt-6 inline-block px-8 py-3 rounded-full bg-c-accent text-white font-semibold text-sm uppercase tracking-wide hover:bg-c-accent-hover transition-colors"
        >
          Try the Fit Finder
        </Link>
      </section>
    </div>
  );
}
