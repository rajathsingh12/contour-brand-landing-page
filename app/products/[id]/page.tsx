import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dresses } from "@/data/dresses";
import { CATEGORY_LABELS } from "@/lib/shop/categories";
import { ProductDetail } from "@/components/product";

export function generateStaticParams() {
  return dresses.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dress = dresses.find((d) => d.id === id);
  if (!dress) return { title: "Not found — Contour" };
  return {
    title: `${dress.name} — ${CATEGORY_LABELS[dress.fitCategory]} — Contour`,
    description: dress.whyItWorks[0],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dress = dresses.find((d) => d.id === id);
  if (!dress) notFound();
  return <ProductDetail dress={dress} />;
}
