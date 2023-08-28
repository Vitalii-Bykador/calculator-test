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
const chain = {
    acc: 0,
    opn: "none" /* Operation.None */
};
let flgClearDisplay = false;
document.addEventListener("click", (event) => {
    if (event.target instanceof HTMLButtonElement) {
        const display = document.getElementById("display");
        const button = event.target;
        // проверка "клика" по кнопке цифровой/кнопке с ","
        if (button.dataset.digit != undefined) {
            if (flgClearDisplay) {
                display.innerHTML = "";
                flgClearDisplay = false;
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
            //alert(`flgClearDisplay = ${flgClearDisplay}\n acc = ${chain.acc} opn = ${chain.opn}`);
            // if (chain.opn === Operation.None) {
            //     chain.acc = toCalc(display.innerHTML);
            //     chain.opn = (button.value as Operation);
            //     flgClearDisplay = true;
            // } else {
            //     chain.val = toCalc(display.innerHTML);
            //     switch (chain.opn) {
            //     case Operation.Divide:
            //         chain.acc /= chain.val;
            //         break;
            //     case Operation.Multiplication:
            //         chain.acc *= chain.val;
            //         break;
            //     case Operation.Minus:
            //         chain.acc -= chain.val;
            //         break;
            //     case Operation.Plus:
            //         chain.acc += chain.val;
            //         break;
            //     }
            //     display.innerHTML = toDispay(chain.acc);
            //     // chain.opn = Operation.None;
            //     flgClearDisplay = true;
            // }
            if (chain.opn === "none" /* Operation.None */) {
                chain.opn = button.value;
                chain.acc = toCalc(display.innerHTML);
            }
            else {
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
                display.innerHTML = toDispay(chain.acc);
                chain.opn = button.value;
            }
            flgClearDisplay = true;
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