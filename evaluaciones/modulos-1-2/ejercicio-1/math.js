function suma(a, b) {
    return a + b;
}

function sumar() {
    let numeros = Array.from(arguments);
    let resultado = 0;
    numeros.forEach((num) => (resultado += num));
    return resultado;
}

function resta(a, b) {
    return a - b;
}

function restar() {
    let numeros = Array.from(arguments);
    let resultado = 0;
    numeros.forEach((num) => (resultado -= num));
    return resultado;
}

function multiplica(a, b) {
    return a * b;
}

function multiplicar() {
    let numeros = Array.from(arguments);
    let resultado = 1;
    numeros.forEach((num) => (resultado = resultado * num));
    return resultado;
}

function divide(a, b) {
    return a / b;
}

function dividir() {
    let numeros = Array.from(arguments);
    let resultado = numeros.shift();
    numeros.forEach((num) => (resultado = resultado / num));
    return resultado;
}

console.log(suma(10, 6));
console.log(sumar(10, 5, 6));
console.log(resta(10, 6));
console.log(restar(10, 5, 6));
console.log(multiplica(10, 6));
console.log(multiplicar(10, 5, 6));
console.log(divide(10, 2));
console.log(dividir(10, 5, 2));
