
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
const enum TypeKey {
    None,
    Digital,
    Action,
}

const chain: {
    acc: number,
    opn: Operation,
} = {
    acc: 0,
    opn: Operation.None
};

let previousKeyPress = TypeKey.None;

document.addEventListener("click", (event: Event) => {
    if (event.target instanceof HTMLButtonElement) {
        const display = (document.getElementById("display") as HTMLDivElement);
        const button = event.target;
        // проверка "клика" по кнопке цифровой/кнопке с ","
        if (button.dataset.digit != undefined) {
            if (previousKeyPress === TypeKey.Action) {
                display.innerHTML = "";
                previousKeyPress = TypeKey.Digital;
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

        // проверка "клика" по кнопке с действием/математической операцией
        if (button.dataset.action != undefined) {
            if (chain.opn === Operation.None) {
                chain.opn = (button.value as Operation);
                chain.acc = toCalc(display.innerHTML);
            } else {
                if (previousKeyPress === TypeKey.Digital) {
                    const val = toCalc(display.innerHTML);
                    switch (chain.opn) {
                    case Operation.Divide: chain.acc /= val; break;
                    case Operation.Multiplication: chain.acc *= val; break;
                    case Operation.Minus: chain.acc -= val; break;
                    case Operation.Plus: chain.acc += val; break;
                    }
                }
                display.innerHTML = toDispay(chain.acc);
                chain.opn = (button.value as Operation);
            }
            previousKeyPress = TypeKey.Action;
        }
    }
});

function toCalc(value: string): number { 
    return Number(value.replace(",", "."));
}

function toDispay(value: number): string {
    return Number(value.toPrecision(15)).toString().replace(".", ",");
}