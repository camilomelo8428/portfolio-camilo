import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Tech } from "@/components/Tech";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Tech />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
