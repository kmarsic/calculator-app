const selector = document.querySelector("#selector")
const form = document.querySelector(".theme-switch")
const themes = document.querySelectorAll("input");
const screen = document.querySelector(".screen")

themes.forEach(theme => {
    theme.addEventListener("change", (e) => {
        if (e.target.value === 'two') { 
            selector.classList.remove("first");
            selector.classList.remove("third");
            selector.classList.add("second");
        } else if (e.target.value === 'one') {
            selector.classList.remove("second");
            selector.classList.remove("third");
            selector.classList.add("first");
        } else if (e.target.value === 'three') {
            selector.classList.remove("second");
            selector.classList.remove("first");
            selector.classList.add("third");
        }


    })
})

function precise_round(num, decimals) {
    var t = Math.pow(10, decimals);   
    return (Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
 }


class Calculator {
    constructor(previousOperandElement, currentOperandElement, operatorOutputElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.operatorOutputElement = operatorOutputElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand.toString().length >= 33) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
      }
    
      chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
          this.compute();
        }
        this.operationOutput = operation;
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
      }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '/':
            computation = prev / current
            break
          default:
            return
        }
        if (computation === Infinity) {
            alert("You can't divide by zero!");
            this. currentOperand = '';
            this.operation = undefined;
            this.previousOperand = '';
            this.operationOutput = '';
            return
        }
        this.currentOperand = computation.toLocaleString('fullwide', {maximumFractionDigits: 7});
        this.operation = undefined;
        this.previousOperand = '';
        this.operationOutput = '';
      }
    updateDisplay() {
        this.currentOperandElement.classList.remove("small");
        if (this.currentOperand.toString().length > 16) {
            this.currentOperandElement.classList.add("small");
        };
        this.currentOperandElement.textContent = this.currentOperand; 
        if (this.operationOutput === undefined) this.previousOperandElement.textContent = this.previousOperand;
        else this.previousOperandElement.textContent = this.previousOperand + this.operationOutput;
        

    }
}

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const deleteKey = document.querySelector(".del");
const resetKey = document.querySelector(".reset");
const equalsKey = document.querySelector(".equals");
const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");
const operatorOutput = document.getElementById("operator-output")
const calculator = new Calculator(previousOperand,currentOperand,operatorOutput);

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerHTML);
        calculator.updateDisplay();
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.chooseOperation(operator.innerHTML);
        calculator.updateDisplay();
    })
})

resetKey.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteKey.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalsKey.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
