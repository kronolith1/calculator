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
  if (y === 0) return 0;
  return x / y;
}

function operate(x, y, operator) {
  if (operator === 'add') return add(x, y);
  if (operator === 'subtract') return subtract(x, y);
  if (operator === 'multiply') return multiply(x, y);
  if (operator === 'divide') return divide(x, y);
}

function updateScreen(n) {
  document.getElementById('calculator-screen').value = n;
}

function numberFunction(n) {
  num += n;
  updateScreen(num);
}

function operatorFunction(n) {
  if (num.length > 0) numArray.push(num);
  operatorId = n;
  num = '';
}

function executeFunction() {
  if (num.length > 0) numArray.push(num);
  numArray.push(operate(parseFloat(numArray[numArray.length-2]), parseFloat(numArray[numArray.length-1]), operatorId));
  updateScreen(numArray[numArray.length-1]);
  num = '';
}

function decimalFunction() {
  num += '.';
  updateScreen(num);
}

function clearFunction(n) {
  num = '';
  numArray = []
  updateScreen(0);
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
}

let answer = '';
let num = '';
let numArray = [];
let operatorId = '';

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', buttonClicked));