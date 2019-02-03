var n = parseInt(prompt("Enter n! value", "0"), 10);

let factorialCalc = (n) => {
    if (n === 0){
      return 1;
    }
    else {
      return n * factorialCalc( n - 1 );
    }
}

var result1 = factorialCalc(n);
window.alert(result1);
