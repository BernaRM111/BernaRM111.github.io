function addNumber(num) {
	var result = document.getElementById("result");
	result.value += num;
}

function addOperator(op) {
	var result = document.getElementById("result");
	result.value += op;
}

function addPi() {
  	var result = document.getElementById("result");
  	result.value += Math.PI.toFixed(10);
}

function clearResult() {
	var result = document.getElementById("result");
	result.value = "";
}

function deleteNumber() {
	var result = document.getElementById("result");
	result.value = result.value.slice(0, -1);
}

function calculate() {
	var result = document.getElementById("result");
	var expression = result.value;

	// Reemplazar símbolo de porcentaje con la operación correspondiente 
	expression = expression.replace(/%/g, "*0.01");

	// Si hay una raíz cuadrada en la expresión, calcularla
	while (expression.indexOf("√") != -1) {
		var index = expression.indexOf("√");
		var operand = "";
		var i = index + 1;
		while (i < expression.length && !isNaN(expression[i])) {
			operand += expression[i];
			i++;
		}
		expression = expression.substring(0, index) + Math.sqrt(parseFloat(operand)) + expression.substring(i);
	}

	// Si hay una potencia al cuadrado en la expresión, calcularla
	while (expression.indexOf("^2") != -1) {
		var index = expression.indexOf("^2");
		var operand = "";
		var i = index - 1;
		while (i >= 0 && !isNaN(expression[i])) {
			operand = expression[i] + operand;
			i--;
		}
		expression = expression.substring(0, i + 1) + Math.pow(parseFloat(operand), 2) + expression.substring(index + 2);
	}

	// Si hay una potencia en la expresión, calcularla
	while (expression.indexOf("^") != -1) {
		var index = expression.indexOf("^");
		var base = "";
		var exponent = "";
		var i = index - 1;
		while (i >= 0 && !isNaN(expression[i])) {
			base = expression[i] + base;
			i--;
		}
		var j = index + 1;
		while (j < expression.length && !isNaN(expression[j])) {
			exponent += expression[j];
			j++;
		}
		expression = expression.substring(0, i + 1) + Math.pow(parseFloat(base), parseFloat(exponent)) + expression.substring(j);
	}

	// Calcular el resultado de la expresión restante
	result.value = eval(expression);
}