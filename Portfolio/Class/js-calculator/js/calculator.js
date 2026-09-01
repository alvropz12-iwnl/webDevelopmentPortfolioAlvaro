 // ==========================================
// 1. UI SELECTORS
// ==========================================
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultStatus = document.getElementById('result-status');



// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE (Students write this)
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: numA (Number), numB (Number), callback (Function)
// Checks:
//   - Is numA and numB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(numA, numB)
const calculator = (numA, numB, callback) => {
    return callback(numA, numB);
};

const sayHello = (name) => {
    return `Hello ${name}`;
};


// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener('click', () => {
    try {
        // alert('Hello there!');
        // TODO: Extract values from the inputs and parse them as floats.
        const valA = parseFloat(num1Input.value);
        const valB = parseFloat(num2Input.value);
        // TODO: Retrieve the selected operation string value.
        const operation = operationSelect.value;
        if (num1Input.value === "" || num2Input.value === ""){
            throw new Error("You need to enter valid numbers");
        }
        if(!operation ){
            throw new Error("You need to select a valid operation");
        }
        // TODO: Match the selected operation string to its corresponding function reference.
        let targetCallback;
        switch (operation){
            case "add":
                targetCallback = add;
                break;
            case "subtract":
                targetCallback = subtract;
                break;
            case "multiply":
                targetCallback = multiply;
                break;
            case "divide":
                targetCallback = divide;
                break;
            default:
                throw new Error("Invalid operation");
        }
        // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.
        const result = calculator(valA, valB, targetCallback);
        // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
        resultStatus.className = "alert alert-success text-center";
        resultStatus.textContent = `Result: ${result}`;
    } catch (error) {
        resultStatus.className = "alert alert-danger text-center";
        resultStatus.textContent = `Error: ${error.message}`;
    }
});