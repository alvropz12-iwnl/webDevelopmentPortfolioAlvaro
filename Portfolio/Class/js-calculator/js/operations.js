// ==========================================
// 2. TODO: BASIC CALLBACK MATH FUNCTIONS (Students write these)
// ==========================================

// TODO: Write "add" callback expression (a, b) => ...
const add = (a, b) => {return a + b; }

// TODO: Write "subtract" callback expression (a, b) => ...
const subtract = (a, b) => {return a - b; }

// TODO: Write "multiply" callback expression (a, b) => ...
const multiply = (a, b) => {return a * b; }

// TODO: Write "divide" callback expression (a, b) => ...
// Rule: Guard against division-by-zero! Return an Error or string warning.
// Rule: Guard against division-by-zero! Return an Error or string warning.

const divide = (a, b) => {
    /* try {
    return a/b;
    } catch (error) {
    return -1;
    }**/

    if (b === 0){
        throw new Error("You can't divide by 0");
    }
    return a / b;
};
