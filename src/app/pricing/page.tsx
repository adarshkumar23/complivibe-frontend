import Nav from "@/components/Nav";
import ROICalculator from "@/components/ROICalculator";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <div className="pt-24 pb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-compliance-green/20 bg-compliance-green/5 px-4 py-1.5 text-xs text-compliance-green font-medium">
            Calculate your fine exposure first.
          </div>
        </div>
        <ROICalculator />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
