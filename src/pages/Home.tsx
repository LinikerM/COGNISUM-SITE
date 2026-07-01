import { HeroSection } from '../components/HeroSection';
import { BentoGrid } from '../components/BentoGrid';
import { KPIs } from '../components/KPIs';
import { Timeline } from '../components/Timeline';
import { TargetAudience } from '../components/TargetAudience';
import { CallToAction } from '../components/CallToAction';

export function Home() {
  return (
    <div className="bg-[var(--background)]">
      <HeroSection />
      <BentoGrid />
      <KPIs />
      <Timeline />
      <TargetAudience />
      <CallToAction />
    </div>
  );
}
