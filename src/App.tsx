import type { Component, createSignal } from "solid-js";

import Face from "./components/Face";

const text = "a a a a a a a a a";

const App: Component = () => {
  return (
    <div>
      <Face text={text} />
    </div>
  );
};

export default App;
