import { Canvas } from "./canvas/Canvas";
import { Customizer } from "./pages/Customizer";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <>
      <main className="app transition-all ease-in">
        <Home />
        {/* <Canvas />
        <Customizer /> */}
      </main>
    </>
  );
};
