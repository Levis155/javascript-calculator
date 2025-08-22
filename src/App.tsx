import { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<number | string>("0");
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
    if (value === "AC") {
      setExpression("");
      setResult("0");
      setJustEvaluated(false);
      return;
    }

    if (value === "=") {
      try {
        const safeExpr = expression.replace(/x/g, "*");
        const evaluation = new Function(`return ${safeExpr}`)();
        const rounded = parseFloat(evaluation.toFixed(10));

        let displayResult: string;
        if (Number.isInteger(rounded)) {
          displayResult = rounded.toString();
        } else {
          displayResult = rounded.toString();
          if (displayResult.includes(".")) {
            displayResult = displayResult.replace(/\.?0+$/, "");
          }
        }

        setResult(displayResult);
        setExpression(displayResult);
        setJustEvaluated(true);
      } catch (error) {
        setResult("Error");
        setJustEvaluated(true);
      }
      return;
    }

    if (justEvaluated) {
      if (["+", "-", "x", "/"].includes(value)) {
        setExpression(result + value);
        setResult(value);
      } else {
        setExpression(value);
        setResult(value);
      }
      setJustEvaluated(false);
      return;
    }

    if (value === ".") {
      const parts = expression.split(/[+\-x/]/);
      const currentNumber = parts[parts.length - 1] || "";

      if (currentNumber.includes(".")) {
        return;
      }

      if (currentNumber === "" || expression === "") {
        setExpression((prev) => prev + "0.");
        setResult("0.");
        return;
      }

      setExpression((prev) => prev + ".");
      setResult((prev) => prev + ".");
      return;
    }

    if (/^[0-9]$/.test(value)) {
      if (result === "0" && value === "0") {
        return;
      }

      if (result === "0" && value !== "0") {
        setExpression(value);
        setResult(value);
        return;
      }

      setExpression((prev) => prev + value);
      setResult((prev) => {
        if (["+", "-", "x", "/"].includes(prev as string)) {
          return value;
        }
        return prev + value;
      });
      return;
    }

    if (["+", "-", "x", "/"].includes(value)) {
      const lastChar = expression.slice(-1);
      const secondLastChar = expression.slice(-2, -1);

      if (value === "-") {
        if (["+", "x", "/"].includes(lastChar)) {
          setExpression((prev) => prev + value);
          setResult(value);
          return;
        }
        if (lastChar === "-" && ["+", "x", "/"].includes(secondLastChar)) {
          setExpression((prev) => prev.slice(0, -1) + value);
          setResult(value);
          return;
        }
      }

      if (["+", "-", "x", "/"].includes(lastChar)) {
        if (lastChar === "-" && ["+", "x", "/"].includes(secondLastChar)) {
          setExpression((prev) => prev.slice(0, -2) + value);
          setResult(value);
        } else {
          setExpression((prev) => prev.slice(0, -1) + value);
          setResult(value);
        }
        return;
      }

      setExpression((prev) => prev + value);
      setResult(value);
      return;
    }
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
                  onClick={() => handleClick(operand.value)}
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
                  onClick={() => handleClick(operand.value)}
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
                  onClick={() => handleClick(operand.value)}
                >
                  {operand.value}
                </button>
              );
            } else {
              return (
                <button
                  key={i}
                  id={operand.id}
                  onClick={() => handleClick(operand.value)}
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
