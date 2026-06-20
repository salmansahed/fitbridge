import BMICalculator from "@/components/home/BMICalculator";
import CorePillars from "@/components/home/CorePillars";
import CTACommunity from "@/components/home/CTACommunity";
import HeroBanner from "@/components/home/HeroBanner";
import LatestForumPosts from "@/components/home/LatestForumPosts";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="mt-20 mx-auto">
      <HeroBanner />
      <CorePillars />
      <LatestForumPosts />
      <BMICalculator />
      <CTACommunity />
      <Newsletter />
    </div>
  );
}
