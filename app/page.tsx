import { SilhouetteBadge } from "@/components/SilhouetteBadge";
import type { FitObjective } from "@/lib/types";

const TAGS: FitObjective[] = ["smooth", "define", "balance", "lengthen", "enhance", "skim", "structure"];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight uppercase">
          Fashion That Fits Your Shape.
        </h1>
        <p className="mt-4 text-lg text-c-text-secondary max-w-xl mx-auto">
          Trendy silhouettes. Thoughtful construction. XL&ndash;6XL.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {TAGS.map((tag) => (
            <SilhouetteBadge key={tag} tag={tag} />
          ))}
        </div>
      </section>
    </div>
  );
}
