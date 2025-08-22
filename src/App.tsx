import { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<number | string>(0);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleClick = (value: string) => {
    console.log("click!");
    if (value === "AC") {
      setExpression("");
      setResult(0);
      setJustEvaluated(false);
      return;
    }

    if (value === "=") {
      try {
        const safeExpr = expression.replace(/x/g, "*");
        const evalResult = Function(`return ${safeExpr}`)();
        setResult(evalResult.toString());
        setJustEvaluated(true);
      } catch (error) {
        setResult("Error");
      }
      return;
    }

    if (justEvaluated) {
      if (["+", "-", "x", "/"].includes(value)) {
        setExpression(result + value);
        setResult(value);
        setJustEvaluated(false);
      } else {
        setExpression(value);
        setResult(value);
        setJustEvaluated(false);
      }
      return;
    }

    setResult(value);
    setExpression((prev) => prev + value);
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light-purple">
      <div className="calculator">
        <div className="display d-flex flex-column gap-0 justify-content-center">
          <div className="expression">{expression}</div>
          <div className="result">{result}</div>
        </div>

        <div className="buttons-grid">
          {[
            "AC",
            "/",
            "x",
            "7",
            "8",
            "9",
            "-",
            "4",
            "5",
            "6",
            "+",
            "1",
            "2",
            "3",
            "=",
            "0",
            ".",
          ].map((operand, i) => {
            if (operand === "AC") {
              return (
                <button
                  key={i}
                  className="clear span-2"
                  onClick={() => {
                    handleClick(operand);
                  }}
                >
                  {operand}
                </button>
              );
            } else if (operand === "=") {
              return (
                <button
                  key={i}
                  className="equal"
                  onClick={() => {
                    handleClick(operand);
                  }}
                >
                  {operand}
                </button>
              );
            } else if (operand === "0") {
              return (
                <button
                  key={i}
                  className="span-2"
                  onClick={() => {
                    handleClick(operand);
                  }}
                >
                  {operand}
                </button>
              );
            } else {
              return (
                <button
                  key={i}
                  onClick={() => {
                    handleClick(operand);
                  }}
                >
                  {operand}
                </button>
              );
            }
          })}
        </div>
      </div>

      <span>
        Designed and coded by <br />{" "}
        <a href="https://www.linkedin.com/in/levis-mbui/" target="_blank">
          Levis Mbui
        </a>
      </span>
    </div>
  );
}

export default App;
