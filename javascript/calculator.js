"use strict";
function getInputValues() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    return [num1, num2];
}
function displayResult(result) {
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.textContent = `Result: ${result}`;
    }
}
function add(a, b) { return a + b; }
function subtract(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b == 0)
        return 'Error: Cannot divide by 0';
    return a / b;
}
function setupCalculator() {
    document.getElementById('addBtn').addEventListener('click', () => {
        const [a, b] = getInputValues();
        displayResult(add(a, b));
    });
    document.getElementById('subBtn').addEventListener('click', () => {
        const [a, b] = getInputValues();
        displayResult(subtract(a, b));
    });
    document.getElementById('mulBtn').addEventListener('click', () => {
        const [a, b] = getInputValues();
        displayResult(multiply(a, b));
    });
    document.getElementById('divBtn').addEventListener('click', () => {
        const [a, b] = getInputValues();
        displayResult(divide(a, b));
    });
}
document.addEventListener('DOMContentLoaded', setupCalculator);
