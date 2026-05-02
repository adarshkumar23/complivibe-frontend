import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import DemoVideo from "@/components/DemoVideo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ROICalculator from "@/components/ROICalculator";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <Hero />
        <LogoCloud />
        <Stats />
        <Features />
        <DemoVideo />
        <Testimonials />
        <Pricing />
        <ROICalculator />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
