import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import WhyTalklaws from "@/components/WhyTalklaws";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Insights from "@/components/Insights";
import AskCS from "@/components/AskCS";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg)]">
        <Navbar />
        <main>
          <Hero />
          <TrustedBy />
          <WhyTalklaws />
          <Services />
          <Industries />
          <About />
          <Founder />
          <Insights />
          <AskCS />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
