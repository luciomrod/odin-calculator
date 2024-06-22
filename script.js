document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('calculator-display');
    let firstOperand = '';
    let secondOperand = '';
    let currentOperator = null;
    let shouldResetDisplay = false;

    // Function to update the display value
    function updateDisplay(value) {
        if (shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;
        }
        display.textContent += value;
    }

    // Clear display and reset variables
    function clearCalculator() {
        display.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        currentOperator = null;
    }

    // Function to perform basic arithmetic operations
    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        if (b === 0) {
            return 'Error';
        }
        return a / b;
    }

    // Function to operate based on operator
    function operate(operator, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return add(a, b);
            case '-':
                return subtract(a, b);
            case '*':
                return multiply(a, b);
            case '/':
                return divide(a, b);
            default:
                return 'Error';
        }
    }

    // Event listeners for number buttons
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', function() {
            updateDisplay(button.textContent);
        });
    });

    // Event listener for decimal button
    document.getElementById('decimal').addEventListener('click', function() {
        if (!display.textContent.includes('.')) {
            updateDisplay('.');
        }
    });

    // Event listeners for operator buttons
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', function() {
            if (firstOperand === '') {
                firstOperand = display.textContent;
            } else if (secondOperand !== '') {
                firstOperand = operate(currentOperator, firstOperand, secondOperand);
                display.textContent = firstOperand;
            }
            currentOperator = button.textContent;
            shouldResetDisplay = true;
        });
    });

    // Event listener for equals button
    document.getElementById('equals').addEventListener('click', function() {
        if (currentOperator && firstOperand) {
            secondOperand = display.textContent;
            let result = operate(currentOperator, firstOperand, secondOperand);
            display.textContent = result;
            firstOperand = result;
            secondOperand = '';
            currentOperator = null;
            shouldResetDisplay = true;
        }
    });

    // Event listener for clear button
    document.getElementById('clear').addEventListener('click', clearCalculator);

    // Event listener for backspace button
    document.getElementById('backspace').addEventListener('click', function() {
        display.textContent = display.textContent.slice(0, -1);
    });
});
