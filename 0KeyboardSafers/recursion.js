/*
A computer programming technique involving the use of a procedure, subroutine,
function, or algorithm that calls itself one or more times until a specified
condition is met at which time the rest of each repetition is processed from
the last one called to the first.
*/


 // * n must be non-negative integer

let countdown = (n) => {        // notice ES6 syntax
    if (n === 0) {
        console.log("0 and Blastoff!");
    } else {
        console.log(n);
        countdown(n-1);
    }
}

// Fibonacci example

let fib = (n) => {
    if (n === 0 || n === 1) {
        return n;
    }
    return fib(n - 2) + fib(n - 1);
}
