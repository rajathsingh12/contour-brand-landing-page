import { EditorialPage } from "@/components/editorial/EditorialPage";
import { copy } from "@/data/copy";

export const metadata = {
  title: "Why Contour — Contour",
  description: copy.home.about.body[0],
};

export default function AboutPage() {
  const { headline, body } = copy.home.about;
  const [lede, ...rest] = body;

  return <EditorialPage headline={headline} lede={lede} paragraphs={rest} />;
}
