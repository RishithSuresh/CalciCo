// Select display by id
const display = document.getElementById("display");
// Select all calculator buttons (numbers, operators, etc.)
const buttons = document.querySelectorAll(".btn-number, .btn-operator, .btn-equals");
const calculator = document.querySelector(".Calculator, .calculator");

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
                    display.textContent = Function('"use strict";return (' + display.textContent + ')')();
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
                display.textContent = Function('"use strict";return (' + display.textContent + ')')();
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