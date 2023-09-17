import type { Component, createSignal } from "solid-js";

import Face from "./components/Face";

const text = "hello i am BMO. and i want to learn how to talk";

const App: Component = () => {
  var msg = new SpeechSynthesisUtterance();
  msg.text = "Hello World";
  window.speechSynthesis.speak(msg);
  return (
    <div>
      <Face text={text} />
    </div>
  );
};

export default App;
