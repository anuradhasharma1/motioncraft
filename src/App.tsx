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
          <Playground/>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
