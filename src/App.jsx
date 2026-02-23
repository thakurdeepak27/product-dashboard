import { useState } from "react";
import { Products } from "./pages";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Products />
    </div>
  );
}

export default App;
