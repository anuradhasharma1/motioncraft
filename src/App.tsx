import SmoothScroll from "./components/SmoothScroll";
import Hero from "./components/sections/Hero";

function App() {
  return (
    <SmoothScroll>
      <main className="relative selection:bg-black selection:text-white antialiased">
        <Hero />
      </main>
    </SmoothScroll>
  );
}

export default App;
