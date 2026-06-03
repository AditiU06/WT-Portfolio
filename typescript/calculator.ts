function getInputValues(): [number, number] {
    const num1 = parseFloat((document.getElementById('num1') as HTMLInputElement).value);
    const num2 = parseFloat((document.getElementById('num2') as HTMLInputElement).value);
    return [num1, num2];
}

function displayResult(result: number | string){
    const resultElement = document.getElementById('result');
    if(resultElement){
        resultElement.textContent = `Result: ${result}` ;
    }
}

function add(a: number, b: number): number { return a + b; }
function subtract(a: number, b: number): number {return a + b; }
function multiply(a: number, b: number): number {return a * b; }
function divide(a: number, b: number): string | number {
    if (b==0) return 'Error: Cannot divide by 0';
    return a / b;
} 

function setupCalculator() {
    (document.getElementById('addBtn') as HTMLButtonElement).addEventListener('click', () => {
        const [a, b] = getInputValues();
        displayResult(add(a,b));
    }
    );

    (document.getElementById('subBtn') as HTMLButtonElement).addEventListener('click', () => {
        const [a, b] = getInputValues();
        displayResult(subtract(a,b));
    }
    );

    (document.getElementById('mulBtn') as HTMLButtonElement).addEventListener('click', () => {
        const [a, b] = getInputValues();
        displayResult(multiply(a,b));
    }
    );

    (document.getElementById('divBtn') as HTMLButtonElement).addEventListener('click', () => {
        const [a, b] = getInputValues();
        displayResult(divide(a,b));
    }
    );
}
document.addEventListener('DOMContentLoaded', setupCalculator);