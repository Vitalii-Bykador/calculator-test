
const enum Operation {
    None            = "none",
    Ac              = "AC",
    Sign            = "+/-",
    Percent         = "%",
    Divide          = "÷",
    Multiplication  = "x",
    Minus           = "-",
    Plus            = "+",
    Equal           = "=",
}
const enum TypeButton {
    None,
    Digital,
    Action,
}

type Chain = {acc: number, val: number, opn: Operation};

const chain: Chain = {
    acc: 0,
    val: 0,
    opn: Operation.None
};

let previousKeyPress = TypeButton.None;

document.addEventListener("click", (event: Event) => {
    if (event.target instanceof HTMLButtonElement) {
        const display = (document.getElementById("display") as HTMLDivElement);
        const button = event.target;
        const currOperation = (button.value as Operation);
        // checking click to digital button or comma button
        if (button.dataset.digit != undefined) {
            if (previousKeyPress === TypeButton.Action) {
                display.innerHTML = "";
                previousKeyPress = TypeButton.Digital;
            }
            display.innerHTML = (display.innerHTML === "0" && button.value !== ",") ? "" : display.innerHTML;

            if (button.value === ",") {
                if (!/,/.test(display.innerHTML)) {
                    display.innerHTML += button.value;
                }
            } else {
                display.innerHTML += button.value;
            }
        }

        // checking click to math operation button
        if (button.dataset.action != undefined) {
            // initialization of acc and op fields for structure "Chain"
            if (chain.opn === Operation.None) {
                chain.opn = currOperation;
                chain.acc = toCalc(display.innerHTML);
            } else {
                // this branch is executed if previous button was digital button. 
                // This code relializes chain "digit" + "math operation" + "digit" + ...
                if (previousKeyPress === TypeButton.Digital) {
                    chain.val = toCalc(display.innerHTML);
                    math_calculator(chain);
                } else {
                    // this is branch was added for realize functional of button "equal"
                    if (currOperation === Operation.Equal) {
                        math_calculator(chain);
                    }
                }
                display.innerHTML = toDispay(chain.acc);
                if (currOperation !== Operation.Equal) {
                    chain.opn = currOperation;                    
                }
            }
            if (currOperation === Operation.Sign) {
                chain.acc = toCalc(display.innerHTML) * (-1);
                display.innerHTML = toDispay(chain.acc);
            }
            if (currOperation === Operation.Percent) {
                chain.val = 100;
                chain.opn = Operation.Divide;
                math_calculator(chain);
                display.innerHTML = toDispay(chain.acc);
            }
            previousKeyPress = TypeButton.Action;
        }
    }
});

function math_calculator(chain: Chain): void {
    switch (chain.opn) {
        case Operation.Divide: chain.acc /= chain.val; break;
        case Operation.Multiplication: chain.acc *= chain.val; break;
        case Operation.Minus: chain.acc -= chain.val; break;
        case Operation.Plus: chain.acc += chain.val; break;
    }
}

function toCalc(value: string): number { 
    return Number(value.replace(",", "."));
}

function toDispay(value: number): string {
    return Number(value.toPrecision(15)).toString().replace(".", ",");
}