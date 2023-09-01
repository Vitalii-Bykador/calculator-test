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
var TypeKey;
(function (TypeKey) {
    TypeKey[TypeKey["None"] = 0] = "None";
    TypeKey[TypeKey["Digital"] = 1] = "Digital";
    TypeKey[TypeKey["Action"] = 2] = "Action";
})(TypeKey || (TypeKey = {}));
const chain = {
    acc: 0,
    opn: "none" /* Operation.None */
};
// let flgClearDisplay = false;
// let flgWhatKeyWasPress = 
let previousKeyPress = 0 /* TypeKey.None */;
document.addEventListener("click", (event) => {
    if (event.target instanceof HTMLButtonElement) {
        const display = document.getElementById("display");
        const button = event.target;
        // проверка "клика" по кнопке цифровой/кнопке с ","
        if (button.dataset.digit != undefined) {
            if ( /*flgClearDisplay*/previousKeyPress === 2 /* TypeKey.Action */) {
                display.innerHTML = "";
                //flgClearDisplay = false;
                previousKeyPress = 1 /* TypeKey.Digital */;
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
        // проверка "клика" по кнопке с действием/математической операцией
        if (button.dataset.action != undefined) {
            if (chain.opn === "none" /* Operation.None */) {
                chain.opn = button.value;
                chain.acc = toCalc(display.innerHTML);
            }
            else {
                if (previousKeyPress === 1 /* TypeKey.Digital */) {
                    const val = toCalc(display.innerHTML);
                    switch (chain.opn) {
                        case "\u00F7" /* Operation.Divide */:
                            chain.acc /= val;
                            break;
                        case "x" /* Operation.Multiplication */:
                            chain.acc *= val;
                            break;
                        case "-" /* Operation.Minus */:
                            chain.acc -= val;
                            break;
                        case "+" /* Operation.Plus */:
                            chain.acc += val;
                            break;
                    }
                }
                display.innerHTML = toDispay(chain.acc);
                chain.opn = button.value;
            }
            //flgClearDisplay = true;
            previousKeyPress = 2 /* TypeKey.Action */;
        }
    }
});
function toCalc(value) {
    return Number(value.replace(",", "."));
}
function toDispay(value) {
    return Number(value.toPrecision(15)).toString().replace(".", ",");
}

/******/ })()
;
//# sourceMappingURL=bundle.js.map