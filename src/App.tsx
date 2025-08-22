import { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<number | string>(0);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const operands = [
    { value: "AC", id: "clear" },
    { value: "/", id: "divide" },
    { value: "x", id: "multiply" },
    { value: "7", id: "seven" },
    { value: "8", id: "eight" },
    { value: "9", id: "nine" },
    { value: "-", id: "subtract" },
    { value: "4", id: "four" },
    { value: "5", id: "five" },
    { value: "6", id: "six" },
    { value: "+", id: "add" },
    { value: "1", id: "one" },
    { value: "2", id: "two" },
    { value: "3", id: "three" },
    { value: "=", id: "equals" },
    { value: "0", id: "zero" },
    { value: ".", id: "decimal" },
  ];

  const handleClick = (value: string) => {
    console.log("click!");
    if (value === "AC") {
      setExpression("");
      setResult(0);
      setJustEvaluated(false);
      return;
    }

    if (value === "=") {
      const safeExpr = expression.replace(/x/g, "*");
      const rawResult = Function(`return ${safeExpr}`)();

      const rounded = parseFloat(rawResult.toFixed(10));

      let displayResult: string;
      if (Number.isInteger(rounded)) {
        displayResult = rounded.toString();
      } else {
        displayResult = rounded.toFixed(10).replace(/\.?0+$/, "");
        if (
          !displayResult.includes(".") ||
          displayResult.split(".")[1].length < 4
        ) {
          displayResult = rounded.toFixed(4);
        }
      }

      setResult(displayResult);
      setJustEvaluated(true);

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

    if (value === "0") {
      const parts = expression.split(/[\+\-x\/]/);
      const currentNumber = parts[parts.length - 1];
      if (currentNumber === "0") {
        return;
      }
    }

    if (/^[0-9]$/.test(value)) {
      const parts = expression.split(/[\+\-x\/]/);
      const currentNumber = parts[parts.length - 1];
      if (
        currentNumber === "0" &&
        value !== "0" &&
        !currentNumber.includes(".")
      ) {
        setExpression((prev) => prev.slice(0, -1) + value);
        setResult(value);
        return;
      }
    }

    if (value === ".") {
      const parts = expression.split(/[\+\-x\/]/);
      const currentNumber = parts[parts.length - 1];
      if (currentNumber.includes(".")) {
        return;
      }
      if (
        currentNumber === "" ||
        ["+", "-", "x", "/"].includes(expression.slice(-1))
      ) {
        setExpression((prev) => prev + "0.");
        setResult("0.");
        return;
      }
    }

    if (["+", "-", "x", "/"].includes(value)) {
      const lastChar = expression.slice(-1);

      if (!expression && value !== "-") {
        return;
      }

      if (["+", "-", "x", "/"].includes(lastChar)) {
        if (value === "-" && lastChar !== "-") {
          setExpression((prev) => prev + value);
          setResult(value);
          return;
        }

        setExpression((prev) => prev.slice(0, -1) + value);
        setResult(value);
        return;
      }

      setExpression((prev) => prev + value);
      setResult(value);
      return;
    }

    setExpression((prev) => prev + value);
    const parts = (expression + value).split(/[\+\-x\/]/);
    setResult(parts[parts.length - 1]);
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light-purple">
      <div className="calculator">
        <div className="display d-flex flex-column gap-0 justify-content-center">
          <div className="expression">{expression}</div>
          <div className="result" id="display">
            {result}
          </div>
        </div>

        <div className="buttons-grid">
          {operands.map((operand, i) => {
            if (operand.value === "AC") {
              return (
                <button
                  key={i}
                  className="clear span-2"
                  id={operand.id}
                  onClick={() => {
                    handleClick(operand.value);
                  }}
                >
                  {operand.value}
                </button>
              );
            } else if (operand.value === "=") {
              return (
                <button
                  key={i}
                  className="equal"
                  id={operand.id}
                  onClick={() => {
                    handleClick(operand.value);
                  }}
                >
                  {operand.value}
                </button>
              );
            } else if (operand.value === "0") {
              return (
                <button
                  key={i}
                  className="span-2"
                  id={operand.id}
                  onClick={() => {
                    handleClick(operand.value);
                  }}
                >
                  {operand.value}
                </button>
              );
            } else {
              return (
                <button
                  key={i}
                  id={operand.id}
                  onClick={() => {
                    handleClick(operand.value);
                  }}
                >
                  {operand.value}
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
