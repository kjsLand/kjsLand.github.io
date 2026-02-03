import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Work from "@/app/sections/Work";
import Education from "@/app/sections/Education";
import Projects from "@/app/sections/Projects";
import Papers from "@/app/sections/Papers";
import Skills from "./sections/Skills";
import Contact from "@/app/sections/Contact";
import Footer from "@/app/components/Footer";
import CrtTerminalPanel from "@/app/components/terminal";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <main>
        {/* Keep your Hero component; make sure it matches theme or add theme classes there */}
        <Hero />

        {/* <div className="max-w-3xl w-full">
        <CrtTerminalPanel
          title="kevin@terminal:~$ whoami"
          subtitle="Full-stack dev building fast web apps and AI tools."
          tags={["CONNECTED", "SECURE", "ONLINE"]}
          primaryHref="#work"
          primaryText="View Work"
          secondaryHref="#contact"
          secondaryText="Contact"
        >
          <p>$ ls projects</p>
          <p className="mt-2 text-emerald-50/70">
            vendorfinder • rateit • thescribbler • portfolio
          </p>
        </CrtTerminalPanel>
      </div> */}

      <Work />
      
      <Education />

      <Projects />

      <Papers />

      <Skills />

      <Contact />
      </main>

      <Footer />
    </div>
  );
}
