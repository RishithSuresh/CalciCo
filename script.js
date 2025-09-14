// Select display by id
const display = document.getElementById("display");
// Select all calculator buttons (numbers, operators, etc.)
const buttons = document.querySelectorAll(".btn-number, .btn-operator, .btn-equals");
const calculator = document.querySelector(".Calculator, .calculator");

// --- History Panel Feature ---
// Create history panel if not present
let historyPanel = document.getElementById("history-panel");
if (!historyPanel) {
    historyPanel = document.createElement("div");
    historyPanel.id = "history-panel";
    historyPanel.style.maxHeight = "120px";
    historyPanel.style.overflowY = "auto";
    historyPanel.style.background = "rgba(0,0,0,0.05)";
    historyPanel.style.margin = "10px 0 0 0";
    historyPanel.style.padding = "8px";
    historyPanel.style.borderRadius = "8px";
    historyPanel.style.fontSize = "16px";
    historyPanel.style.color = "#333";
    calculator.parentNode.appendChild(historyPanel);
}
let history = [];
function addToHistory(expr, result) {
    history.unshift({ expr, result });
    if (history.length > 10) history.pop();
    historyPanel.innerHTML = history.map(h => `<div><span style='color:#888'>${h.expr}</span> = <b>${h.result}</b></div>`).join("");
}

// Button click logic
buttons.forEach((item) => {
    item.onclick = () => {
        const value = item.textContent.trim();
        if(item.id === "clear") {
            display.textContent = "";
        } else if(item.id === "backspace") {
            let string = display.textContent.toString();
            display.textContent = string.substr(0, string.length - 1);
        } else if(item.id === "equals") {
            if(display.textContent !== "") {
                try {
                    const expr = display.textContent;
                    const result = Function('"use strict";return (' + expr + ')')();
                    display.textContent = result;
                    addToHistory(expr, result);
                } catch {
                    display.textContent = "Error";
                    setTimeout(() => (display.textContent = ""), 2000);
                }
            } else {
                display.textContent = "Empty!";
                setTimeout(() => (display.textContent = ""), 2000);
            }
        } else if(item.id === "percentage") {
            // Add percentage logic
            if(display.textContent !== "") {
                try {
                    display.textContent = (parseFloat(display.textContent) / 100).toString();
                } catch {
                    display.textContent = "Error";
                    setTimeout(() => (display.textContent = ""), 2000);
                }
            }
        } else if(item.id === "negate") {
            // Negate logic
            if(display.textContent !== "") {
                if(display.textContent.startsWith("-")) {
                    display.textContent = display.textContent.substring(1);
                } else {
                    display.textContent = "-" + display.textContent;
                }
            }
        } else {
            // For numbers and operators, use button text
            display.textContent += value;
        }
    };
});

// Keyboard support for calculator
window.addEventListener("keydown", function(e) {
    const key = e.key;
    if (!calculator) return;
    if (key >= "0" && key <= "9") {
        display.textContent += key;
    } else if (["+", "-", "*", "/", "."].includes(key)) {
        display.textContent += key;
    } else if (key === "Enter" || key === "=") {
        if(display.textContent !== "") {
            try {
                const expr = display.textContent;
                const result = Function('"use strict";return (' + expr + ')')();
                display.textContent = result;
                addToHistory(expr, result);
            } catch {
                display.textContent = "Error";
                setTimeout(() => (display.textContent = ""), 2000);
            }
        }
    } else if (key === "Backspace") {
        let string = display.textContent.toString();
        display.textContent = string.substr(0, string.length - 1);
    } else if (key === "%") {
        if(display.textContent !== "") {
            try {
                display.textContent = (parseFloat(display.textContent) / 100).toString();
            } catch {
                display.textContent = "Error";
                setTimeout(() => (display.textContent = ""), 2000);
            }
        }
    } else if (key === "c" || key === "C") {
        display.textContent = "";
    }
});