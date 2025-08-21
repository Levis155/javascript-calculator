import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <div className="calculator">
        <div className="display">
          <span className="expression"></span>
          <span className="result"></span>
        </div>

        <div className="buttons-grid">
          <button className="clear span-2">AC</button>
          <button className="operator">/</button>
          <button className="operator">x</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button className="operator">-</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button className="operator">+</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button className="equal">=</button>
          <button className="zero">0</button>
          <button>.</button>
        </div>
      </div>

      <span>Designed and coded by <br /> <a href="https://www.linkedin.com/in/levis-mbui/" target="_blank">Levis Mbui</a></span>
    </div>
  );
}

export default App;
