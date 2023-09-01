/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/

var Operation;
(function (Operation) {
    Operation["None"] = "none";
    Operation["Ac"] = "AC";
    Operation["Sign"] = "+/-";
    Operation["Percent"] = "%";
    Operation["Divide"] = "\u00F7";
    Operation["Multiplication"] = "x";
    Operation["Minus"] = "-";
    Operation["Plus"] = "+";
    Operation["Equal"] = "=";
})(Operation || (Operation = {}));
var TypeButton;
(function (TypeButton) {
    TypeButton[TypeButton["None"] = 0] = "None";
    TypeButton[TypeButton["Digital"] = 1] = "Digital";
    TypeButton[TypeButton["Action"] = 2] = "Action";
})(TypeButton || (TypeButton = {}));
const chain = {
    acc: 0,
    val: 0,
    opn: "none" /* Operation.None */
};
let previousKeyPress = 0 /* TypeButton.None */;
document.addEventListener("click", (event) => {
    if (event.target instanceof HTMLButtonElement) {
        const display = document.getElementById("display");
        const button = event.target;
        const currOperation = button.value;
        // checking click to digital button or comma button
        if (button.dataset.digit != undefined) {
            if (previousKeyPress === 2 /* TypeButton.Action */) {
                display.innerHTML = "";
                previousKeyPress = 1 /* TypeButton.Digital */;
            }
            display.innerHTML = (display.innerHTML === "0" && button.value !== ",") ? "" : display.innerHTML;
            if (button.value === ",") {
                if (!/,/.test(display.innerHTML)) {
                    display.innerHTML += button.value;
                }
            }
            else {
                display.innerHTML += button.value;
            }
        }
        // checking click to math operation button
        if (button.dataset.action != undefined) {
            // initialization of acc and op fields for structure "Chain"
            if (chain.opn === "none" /* Operation.None */) {
                chain.opn = currOperation;
                chain.acc = toCalc(display.innerHTML);
            }
            else {
                // this branch is executed if previous button was digital button. 
                // This code relializes chain "digit" + "math operation" + "digit" + ...
                if (previousKeyPress === 1 /* TypeButton.Digital */) {
                    chain.val = toCalc(display.innerHTML);
                    math_calculator(chain);
                }
                else {
                    // this is branch was added for realize functional of button "equal"
                    if (currOperation === "=" /* Operation.Equal */) {
                        math_calculator(chain);
                    }
                }
                display.innerHTML = toDispay(chain.acc);
                if (currOperation !== "=" /* Operation.Equal */) {
                    chain.opn = currOperation;
                }
            }
            if (currOperation === "+/-" /* Operation.Sign */) {
                chain.acc = toCalc(display.innerHTML) * (-1);
                display.innerHTML = toDispay(chain.acc);
            }
            if (currOperation === "%" /* Operation.Percent */) {
                chain.val = 100;
                chain.opn = "\u00F7" /* Operation.Divide */;
                math_calculator(chain);
                display.innerHTML = toDispay(chain.acc);
            }
            previousKeyPress = 2 /* TypeButton.Action */;
        }
    }
});
function math_calculator(chain) {
    switch (chain.opn) {
        case "\u00F7" /* Operation.Divide */:
            chain.acc /= chain.val;
            break;
        case "x" /* Operation.Multiplication */:
            chain.acc *= chain.val;
            break;
        case "-" /* Operation.Minus */:
            chain.acc -= chain.val;
            break;
        case "+" /* Operation.Plus */:
            chain.acc += chain.val;
            break;
    }
}
function toCalc(value) {
    return Number(value.replace(",", "."));
}
function toDispay(value) {
    return Number(value.toPrecision(15)).toString().replace(".", ",");
}

/******/ })()
;
//# sourceMappingURL=bundle.js.map