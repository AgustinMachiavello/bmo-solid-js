import type { Component, createSignal } from "solid-js";

import Face from "./components/Face";

const text = "hello i am BMO. and i want to learn how to talk";

const App: Component = () => {
  return (
    <div>
      <Face text={text} />
    </div>
  );
};

export default App;
