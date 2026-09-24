import { EditorialPage } from "@/components/editorial/EditorialPage";
import { copy } from "@/data/copy";

export const metadata = {
  title: "Our Approach — Contour",
  description: copy.home.thoughtThrough.body[0],
};

export default function OurApproachPage() {
  const { headline, body } = copy.home.thoughtThrough;
  const [lede, ...rest] = body;

  return <EditorialPage headline={headline} lede={lede} paragraphs={rest} />;
}
