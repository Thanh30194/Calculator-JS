/* jshint esversion: 6 */
const handleEquals = (input) => {
	// turn input to an array of number and operator
	let box = input.split(' ').map(inputData => {
		return inputData.match(/\d/) ? parseFloat(inputData) : inputData;
	});
	// loop through the expression to calculate
    for (let i = 0; i < box.length; i++) {
    	// set i = 0 to loop from the first index until no operator left
        // calculate multiply and divide 
    	if (box[i] == '*') {
    		box.splice(i - 1, 3, box[i-1] * box[i+1]);
    		i = 0;
    	} else if (box[i] == '/') {
    		box.splice(i - 1, 3, box[i-1] / box[i+1]);
    		i = 0;
    	}
    	// calculate addition and subtraction after finishing '*' and '/'
    	if (box.indexOf('*') == -1 && box.indexOf('/') == -1) {
	    	if (box[i] == '+') {
	            box.splice(i - 1, 3, box[i-1] + box[i+1]);
	            i = 0;
	        } else if (box[i] == '-') {
	            box.splice(i - 1, 3, box[i-1] - box[i+1]);
	            i = 0;
	        } 
	    }
	}      
    return box[0];
};

var countDot = 1; // count the number of dot left to be added
var startExpression = true; // mark the beginning point 
const display = document.querySelector('#display');

const clearButton = document.querySelector('#clear').addEventListener('click', () => {
	// reset everything
	display.value = '0'; 
	countDot = 1;
	startExpression = true;
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
	button.addEventListener('click', () => {
		// remove the previous operator if a new one is clicked
		if (display.value.length > 2) {
			let checkOperator = display.value[display.value.length - 2];
			if (checkOperator.match(/[\+\-\*\/]/)) {
				display.value = display.value.slice(0, display.value.length - 3);
			} 
		} 
		// add operator
		display.value += ' ' + button.value + ' ';
		// can make a new float number after each operator
		if (countDot == 0) {
			countDot = 1;
		}
		// the expression is no longer at the beginning point
		startExpression = false;
	});
});

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		// start a new calculation if a number being clicked,
		// it can start with a float number
		if (startExpression == true) {
			display.value = button.value;
			countDot = 1;
		} else if (display.value == '0' || display.value.slice(-2) == ' 0') {
			// only a number which is > -1 and < 1 can start with a '0'   
			display.value = display.value.slice(0, display.value.length - 1);
			display.value += button.value;
		} else {
			display.value += button.value;
		}
		// the expression is no longer at the beginning point
		startExpression = false;
	});
});

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
	let checkNumber = display.value[display.value.length - 1]; 
	//only accept one dot behind a number
	if (countDot == 1 && checkNumber.match(/\d/)) {
		display.value += decimalButton.value;
		countDot = 0;
		// the expression is no longer at the beginning point
		// if a dot is added
		startExpression = false;
	} 
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {
	// calculate and display the result, using function created on top
	var result = handleEquals(display.value);
	result = Math.round(result * 1000000000) / 1000000000;
	display.value = result.toString();
	// if the result is a float number, avoid beginning
	// a new calculation with a dot
	if (display.value.indexOf('.') !== -1) {
		countDot = 0;
	} else {
		countDot = 1;
	}
	// the next button being clicked will start a new expression
	startExpression = true;
});