import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ContactCta } from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <ContactCta />
    </main>
  );
}
