import "./App.css";

function App() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light-purple">
      <div className="calculator h-50">
        <div className="display d-flex flex-column gap-0 justify-content-center">
          <div className="expression">333 + 333</div>
          <div className="result">666</div>
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
