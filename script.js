function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) return 'ERROR';
  return x / y;
}

function operate(x, y, operator) {
  if (operator === 'add') return add(x, y);
  if (operator === 'subtract') return subtract(x, y);
  if (operator === 'multiply') return multiply(x, y);
  if (operator === 'divide') return divide(x, y);
}

function updateScreen(n) {
  if (n.toString().length > 11) {
    n = Number.parseFloat(n).toExponential(6);
  }
  document.getElementById('calculator-screen').value = n;
}

function numberFunction(n) {
  if (clickedButtonClass === 'equal-sign') {
    input = n;
    inputArray = [];
    updateScreen(input);
  }
  else {
    input += n;
    lastFullInput = input;
    updateScreen(input);
  }
}

function operatorFunction(n) {
  if (clickedButtonClass === 'number') {
    if (input.length > 0) inputArray.push(input);

    if (inputArray.length === 2) {
      inputArray.push(operate(parseFloat(inputArray[0]), parseFloat(inputArray[1]), clickedOperator));
      updateScreen(inputArray[inputArray.length - 1]);
      input = '';
      clickedOperator = n;
      return;
    }

    if (inputArray.length > 2) {
      inputArray.push(operate(parseFloat(inputArray[inputArray.length-2]), parseFloat(inputArray[inputArray.length-1]), clickedOperator));
      updateScreen(inputArray[inputArray.length-1]);
    }
  }

  if (clickedButtonClass === '') {
    return;
  }
  clickedOperator = n;
  input = '';
  decimalButton.disabled = false;
}

function executeFunction() {
  console.log(clickedButtonClass);

  if (clickedButtonClass === 'number') {
    if (input.length > 0) inputArray.push(input);

    if (inputArray.length > 1) {
      inputArray.push(operate(parseFloat(inputArray[inputArray.length-2]), parseFloat(inputArray[inputArray.length-1]), clickedOperator));
      updateScreen(inputArray[inputArray.length-1]);
    }
  }

  if (clickedButtonClass === 'equal-sign') {
    inputArray.push(operate(parseFloat(inputArray[inputArray.length-1]), parseFloat(lastFullInput), clickedOperator));
    updateScreen(inputArray[inputArray.length-1]);
  }
  input = ''
  decimalButton.disabled = false;
}

function decimalFunction() {
  num += '.';
  decimalButton.disabled = true;
  updateScreen(num);
}

function clearFunction() {
  inputArray = [];
  input = '';
  updateScreen(0);
  decimalButton.disabled = false;
}

function deleteFunction() {
  if (input.length === 0) {
    updateScreen(0);
    return;
  } 
  if (input[input.length-1] === '.' ) {
    decimalButton.disabled = false;
  }
  input = input.slice(0, -1);
  updateScreen(input);
}

function buttonClicked(e) {
  // Number keys
  if (this.className === 'number') {
    numberFunction(this.value);
  }
  // Operator keys
  if (this.className === 'operator') {
    operatorFunction(this.value);
  }
  // Equal sign
  if (this.className === 'equal-sign') {
    executeFunction();
  }
  // Decimal key
  if (this.className === 'decimal') {
    decimalFunction();
  }
  // Clear-all key
  if (this.className === 'all-clear') {
    clearFunction();
  }
  // Delete one char
  if (this.className === 'one-clear all-clear') {
    deleteFunction();
  }
  clickedButtonClass = this.className;
}

let clickedButtonClass = '';
let clickedOperator = '';
let input = '';
let inputArray = [];
let lastFullInput = '';

const decimalButton = document.getElementById('decimal');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', buttonClicked));
