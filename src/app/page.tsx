import Hero from '@/components/Hero';
import SectorsBar from '@/components/sections/SectorsBar';
import ProcessSection from '@/components/sections/ProcessSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import NuovoUsato from '@/components/sections/NuovoUsato';
import MateriaSection from '@/components/sections/MateriaSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ContactCTA from '@/components/sections/ContactCTA';

/**
 * Homepage Arredo Chef
 *
 * Ordine sezioni:
 * 1. Hero — proposta di valore + CTA
 * 2. SectorsBar — settori serviti (marquee)
 * 3. CategoriesSection — accesso rapido ai reparti
 * 4. FeaturedProducts — prodotti in evidenza (rail)
 * 5. ProcessSection — come lavoriamo (4 step)
 * 6. NuovoUsato — nuovo vs usato
 * 7. MateriaSection — servizi + stats
 * 8. ReviewsSection — recensioni Google
 * 9. ContactCTA — conversione finale
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SectorsBar />
      <CategoriesSection />
      <FeaturedProducts />
      <ProcessSection />
      <NuovoUsato />
      <MateriaSection />
      <ReviewsSection />
      <ContactCTA />
    </>
  );
}
