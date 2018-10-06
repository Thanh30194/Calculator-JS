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

const display = document.querySelector('#display');
var countDot = 1; // count the number of dot left to be added
var startExpression = true; // mark the beginning point 

// AC button
document.querySelector('#clear').addEventListener('click', () => {
	display.value = '0'; 
	countDot = 1;
	startExpression = true;
});

// operator buttons
document.querySelectorAll('.operator').forEach((button) => {
	button.addEventListener('click', () => {
		// remove the previous operator if a new one is clicked
		if (display.value.slice(-3).match(/^\s[\+\-\*\/]\s$/)) {
			display.value = display.value.slice(0, -3);
		}
		display.value += ' ' + button.value + ' '; // add operator		
		countDot = 1; // can make a new float number after each operator		
		// the expression is no longer at the beginning point
		startExpression = false;
	});
});

// number buttons
document.querySelectorAll('.number').forEach((button) => {
	button.addEventListener('click', () => {
		// start a new calculation if a number being clicked
		if (startExpression == true) {
			display.value = button.value;
			countDot = 1; // it can start with a float number
		} else if (display.value == '0' || display.value.slice(-2) == ' 0') {
			// only a number which is > -1 and < 1 can start with a '0'   
			display.value = display.value.slice(0, -1) + button.value;
		} else {
			display.value += button.value;
		}
		// the expression is no longer at the beginning point
		startExpression = false;
	});
});

// decimal button
document.querySelector('#decimal').addEventListener('click', () => {
	//only accept one dot behind a number
	if (countDot == 1 && display.value.slice(-1).match(/\d/)) {
		display.value += '.';
		countDot = 0;
		// if a dot is added, the expression is no longer at the beginning point
		startExpression = false;
	} 
});

// equals button
document.querySelector('#equals').addEventListener('click', () => {
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