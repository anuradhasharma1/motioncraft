import SmoothScroll from "./components/SmoothScroll";
import Hero from "./components/sections/Hero";
import Intro from "./components/sections/Intro";
import Easings from "./components/sections/Easings";
import Transforms from "./components/sections/Transforms";
import Performance from "./components/sections/Performance";
import Playground from "./components/sections/PlayGround";

function App() {
  return (
    <SmoothScroll>
      <main className="relative selection:bg-black selection:text-white antialiased">
        <Hero />
        <div className="relative z-10">
          <Intro />
          <Easings />
          <Transforms />
          <Performance />
          <Playground />
        </div>
        <footer className="py-20 px-6 text-center bg-black text-white border-t border-zinc-900">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
            By{" "}
            <a
              href="https://my-portfolio-five-smoky-45.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity duration-300 underline underline-offset-4"
            >
              Anuradha Sharma
            </a>
          </p>
        </footer>
      </main>
    </SmoothScroll>
  );
}

export default App;
