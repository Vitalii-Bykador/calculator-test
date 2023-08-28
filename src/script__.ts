// const enum Operation {
//     None            = "none",
//     Ac              = "AC",
//     Sign            = "+/-",
//     Percent         = "%",
//     Divide          = "÷",
//     Multiplication  = "x",
//     Minus           = "-",
//     Plus            = "+",
//     Equal           = "=",
// }

// let accumulator = 0;
// let op = Operation.None;
// let flgClearDisplay = false;
// let flgNewOp = true;

// document.addEventListener("click", (event: Event) => {
//     const display = (document.getElementById("display") as HTMLDivElement);
//     if (event.target instanceof HTMLButtonElement) {
//         const button = event.target;
//         // проверка "клика" по кнопке цифровой/кнопке с ","
//         if (button.dataset.digit != undefined) {
//             if (flgClearDisplay) {
//                 display.innerHTML = "";
//                 flgClearDisplay = false;
//             }
//             display.innerHTML = (display.innerHTML === "0" && button.value !== ",") ? "" : display.innerHTML;

//             if (button.value === ",") {
//                 if (!/,/.test(display.innerHTML)) {
//                     display.innerHTML += button.value;
//                 }
//             } else {
//                 display.innerHTML += button.value;
//             }
//             flgNewOp = true;
//         }

//         // проверка "клика" по кнопке с действием/математической операцией
//         if (button.dataset.action != undefined) {
//             if ((button.value as Operation) === Operation.Ac) {
//                 accumulator = 0;
//                 display.innerHTML = toDispay(accumulator);
//                 flgNewOp = true;
//             }
//             if ((button.value as Operation) === Operation.Sign) {
//                 accumulator = totalResult(toCalc(display.innerHTML), -1, Operation.Sign);
//                 display.innerHTML = toDispay(accumulator);
//                 flgNewOp = true;
//             }
//             if ((button.value as Operation) === Operation.Percent) {
//                 accumulator = totalResult(toCalc(display.innerHTML), 100, Operation.Percent);
//                 display.innerHTML = toDispay(accumulator);
//                 flgNewOp = true;
//             }
            
//             document.getElementById("test1")!.innerHTML = String(flgNewOp);
//             document.getElementById("test2")!.innerHTML = String(op);

//             if (flgNewOp) {
//                 if (op === Operation.Divide) {
//                     const val = toCalc(display.innerHTML);
//                     accumulator = totalResult(accumulator, val, op);
//                     display.innerHTML = toDispay(accumulator);
//                 }
//                 if (op === Operation.Multiplication) {
//                     const val = toCalc(display.innerHTML);
//                     accumulator = totalResult(accumulator, val, op);
//                     display.innerHTML = toDispay(accumulator);              
//                 }
//                 if (op === Operation.Minus) {
//                     const val = toCalc(display.innerHTML);
//                     accumulator = totalResult(accumulator, val, op);
//                     display.innerHTML = toDispay(accumulator);
//                 }
//                 if (op === Operation.Plus) {
//                     const val = toCalc(display.innerHTML);
//                     accumulator = totalResult(accumulator, val, op);
//                     display.innerHTML = toDispay(accumulator);
//                 }
//                 op = (button.value as Operation);
//                 accumulator = toCalc(display.innerHTML);
//                 [flgClearDisplay, flgNewOp] = [true, false];
//             }
//         }
//     }
// });

// function toCalc(value: string): number {
//     return Number(value.replace(",", "."));
// }

// function toDispay(value: number): string {
//     return Number(value.toPrecision(15)).toString().replace(".", ",");
// }

// function totalResult(acc: number, val: number, op: Operation): number {
//     switch (op) {
//     case Operation.Percent:
//         return acc / val;
//     case Operation.Divide:
//         return acc / val;
//     case Operation.Sign:
//     case Operation.Multiplication:
//         return acc * val;
//     case Operation.Minus:
//         return acc - val;
//     case Operation.Plus:
//         return acc + val;
//     default:
//         throw new Error("В функцию equal передана не бинарная операция.");
//     }
// }


// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
// // Прочитайте все комментарии!

// // Далее требуется переписать данный код в виде класса, так как требуются
// // глобальные соостояния, например, "флаг" flgMathOp должен быть хранить между
// // "кликами".
// // Как реализовать обработку событий через класс показанно здесь: https://learn.javascript.ru/event-delegation

// // const enum Operation {
// //     Ac              = "AC",
// //     Sign            = "+/-",
// //     Percent         = "%",
// //     Divide          = "÷",
// //     Multiplication  = "x",
// //     Minus           = "-",
// //     Plus            = "+",
// //     Equal           = "=",
// // }

// // let accumulator = 0;
// // let flgClearDisplay = false;
// // let flgMathOp = false;
// // let operation: Operation;

// // document.addEventListener("click", (event: Event) => {
// //     const display = (document.getElementById("display") as HTMLDivElement);

// //     if (event.target instanceof HTMLButtonElement) {
// //         const button = event.target;
// //         // проверка "клика" по кнопке цифровой/кнопке с ","
// //         if (button.dataset.digit != undefined) {
// //             // если была нажата кнопка математической операции, то необходимо
// //             // подготовить поле вывода к отображению нового числа.
// //             if (flgClearDisplay) {
// //                 display.innerHTML = "";
// //                 flgClearDisplay = false;
// //             }

// //             // если в поле вывода отображается нуль (это происходит при запуске приложения) 
// //             // и нажата кнопка "," то необходимо добавить "," к нулю.
// //             // Иначе, нуль удаляется для ввод нового числа.
// //             display.innerHTML = (display.innerHTML === "0" && button.value !== ",") ? "" : display.innerHTML;

// //             // следующие два вложенных условия не допускают ввода двух запятых
// //             if (button.value === ",") {
// //                 if (!/,/.test(display.innerHTML)) {
// //                     display.innerHTML += button.value;
// //                 }
// //             } else {
// //                 // этот код выполняется для ввода обычных чисел,
// //                 // то есть когда выполнены все проверки
// //                 display.innerHTML += button.value;
// //             }
// //         }

// //         // проверка "клика" по кнопке с действием/математической операцией
// //         if (button.dataset.action != undefined) {
// //             switch (button.value as Operation) {
// //             case Operation.Ac: 
// //                 display.innerHTML = "0";
// //                 flgMathOp = false;
// //                 break;
// //             case Operation.Sign: display.innerHTML = (display.innerHTML !== "0") ? `-${display.innerHTML}` : display.innerHTML;
// //                 break;
// //             case Operation.Percent:
// //                 accumulator = toCalc(display.innerHTML);
// //                 display.innerHTML = toDispay(accumulator / 100);
// //                 break;
// //             case Operation.Equal:
// //                 display.innerHTML = toDispay(totalResult(accumulator, toCalc(display.innerHTML), operation));
// //                 [flgClearDisplay, flgMathOp] = [true, false];
// //                 break;
// //             default: // математические операции: ÷, x, -, +
// //                 if (flgMathOp) {
// //                     display.innerHTML = toDispay(totalResult(accumulator, toCalc(display.innerHTML), operation));
// //                 }
// //                 accumulator = toCalc(display.innerHTML);
// //                 [flgClearDisplay, flgMathOp] = [true, true];
// //                 operation = (button.value as Operation);
// //                 break;
// //             }
// //         }
// //     }
// // });



// // function totalResult(value1: number, value2: number, op: Operation): number {
// //     switch (op) {
// //     case Operation.Divide:
// //         return value1 / value2;
// //     case Operation.Multiplication:
// //         return value1 * value2;
// //     case Operation.Minus:
// //         return value1 - value2;
// //     case Operation.Plus:
// //         return value1 + value2;
// //     default:
// //         throw new Error("В функцию equal передана не бинарная операция.");
// //     }
// // }

