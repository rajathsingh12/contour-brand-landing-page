import Link from "next/link";
import { SIZES, type Size } from "@/data/dresses";
import { Heading, Text, Divider } from "@/components/ui";
import { EditorialPage } from "@/components/editorial/EditorialPage";
import { copy } from "@/data/copy";

type Range = readonly [number, number];

const MEASUREMENTS: Record<Size, { bust: Range; waist: Range; hip: Range; upperArm: Range }> = {
  L: { bust: [97, 102], waist: [81, 86], hip: [102, 107], upperArm: [34, 36] },
  XL: { bust: [102, 107], waist: [86, 91], hip: [107, 112], upperArm: [36, 38] },
  "2XL": { bust: [107, 112], waist: [91, 96], hip: [112, 117], upperArm: [38, 40] },
  "3XL": { bust: [112, 117], waist: [96, 101], hip: [117, 122], upperArm: [40, 42] },
  "4XL": { bust: [117, 122], waist: [101, 106], hip: [122, 127], upperArm: [42, 44] },
};

function cmToIn(cm: number): string {
  return (cm / 2.54).toFixed(1);
}

function RangeCell({ range }: { range: Range }) {
  return (
    <td className="px-4 py-3 text-sm text-center">
      <span>{range[0]}–{range[1]} cm</span>
      <br />
      <span className="text-gray-600 text-xs">{cmToIn(range[0])}–{cmToIn(range[1])}&quot;</span>
    </td>
  );
}

const MEASURE_POINTS = [
  { label: "Bust", instruction: "Measure around the fullest part of your bust, keeping the tape level across your back." },
  { label: "Waist", instruction: "Measure at your natural waist — the narrowest point of your torso, usually just above the belly button." },
  { label: "Hip", instruction: "Measure around the fullest part of your hips and seat, roughly 20 cm below your waist." },
  { label: "Upper Arm", instruction: "Measure around the fullest part of your upper arm, with your arm relaxed at your side." },
];

const GARMENT_NOTES = [
  "A-line midis carry extra room through the hip for a smooth, uninterrupted drape.",
  "Wrap dresses are cut with a deeper wrap so they stay secure and considered across a fuller bust.",
];

export const metadata = {
  title: "Size Guide — Contour",
  description: "Body-measurement guidance for L–4XL, with the same price across every size.",
};

export default function SizeGuidePage() {
  return (
    <EditorialPage headline={copy.home.sizePrice.headline} lede={copy.home.sizePrice.body}>
      <section>
        <Heading as="h2" size="md">Measurements</Heading>
        <Text variant="secondary" className="mt-2 max-w-prose leading-relaxed">
          Every Contour dress is graded for proportion — not simply scaled up. Use the chart to find your
          starting size; all figures are body measurements.
        </Text>
        <div className="mt-6 overflow-x-auto border border-gray-200">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream">
                <th scope="col" className="px-4 py-3 text-sm font-medium">Size</th>
                <th scope="col" className="px-4 py-3 text-sm font-medium text-center">Bust</th>
                <th scope="col" className="px-4 py-3 text-sm font-medium text-center">Waist</th>
                <th scope="col" className="px-4 py-3 text-sm font-medium text-center">Hip</th>
                <th scope="col" className="px-4 py-3 text-sm font-medium text-center">Upper Arm</th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size, i) => {
                const m = MEASUREMENTS[size];
                return (
                  <tr key={size} className={i % 2 === 0 ? "bg-warm-white" : "bg-ivory"}>
                    <th scope="row" className="px-4 py-3 text-sm font-medium">{size}</th>
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
        <Text as="p" size="xs" variant="secondary" className="mt-3">
          Between sizes? We recommend sizing up for a more relaxed fit.
        </Text>
      </section>

      <Divider className="my-12" />

      <section>
        <Heading as="h2" size="md">How to Measure</Heading>
        <Text variant="secondary" className="mt-2 max-w-prose leading-relaxed">
          Use a soft measuring tape and stand naturally — don&apos;t pull the tape tight or hold your breath.
        </Text>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {MEASURE_POINTS.map((pt) => (
            <div key={pt.label} className="border border-gray-200 p-5">
              <Heading as="h3" size="sm">{pt.label}</Heading>
              <Text variant="secondary" size="sm" className="mt-2 leading-relaxed">{pt.instruction}</Text>
            </div>
          ))}
        </div>
      </section>

      <Divider className="my-12" />

      <section>
        <Heading as="h2" size="md">Garment Fit Notes</Heading>
        <Text variant="secondary" className="mt-2 max-w-prose leading-relaxed">
          Because each silhouette is designed differently, here&apos;s what to expect.
        </Text>
        <ul className="mt-4 space-y-2">
          {GARMENT_NOTES.map((note) => (
            <li key={note} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-black">
              <Text as="span" variant="secondary" className="leading-relaxed">{note}</Text>
            </li>
          ))}
        </ul>
      </section>

      <Divider className="my-12" />

      <Text variant="secondary" className="leading-relaxed">
        Not sure where you fall?{" "}
        <Link href="/fit-finder" className="text-black underline underline-offset-4 hover:text-charcoal">
          Try the Fit Finder
        </Link>{" "}
        for guidance around your proportions.
      </Text>
    </EditorialPage>
  );
}
