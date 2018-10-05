/* jshint esversion: 6 */
const handleEquals = (input) => {
	// turn input to an array of number and operator
	let box = input.split(' ').map(inputData => {
		if (inputData.match(/\d/)) {
			return parseFloat(inputData);
		} else {
			return inputData;
		}
	});
	// calculate all the multiply and divide 
    while (box.indexOf('*') != -1 || box.indexOf('/') != -1) {
        for (let i = 1; i < box.length; i++) {
            if (box[i] === '*') {
                box.splice(i - 1, 3, box[i-1] * box[i+1]);
            } else if (box[i] === '/') {
                box.splice(i - 1, 3, box[i-1] / box[i+1]);
            }
        }
    }
    // calculate all the addition and subtract
    while (box.indexOf('+') != -1 || box.indexOf('-') != -1) {
        for (let i = 1; i < box.length; i++) {
            if (box[i] === '+') {
                box.splice(i - 1, 3, box[i-1] + box[i+1]);
            } else if (box[i] === '-') {
                box.splice(i - 1, 3, box[i-1] - box[i+1]);
            }
        }
    }
    return box[0];
};

var countDot = 1; // avoid typing 2 dots in a same number
var checkClickEquals = ''; // After clicking the equals button, if you type a number, the calc begin a new expression
const display = document.querySelector('#display');

const clearButton = document.querySelector('#clear').addEventListener('click', () => {
	display.value = '0'; 
	countDot = 1;
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
	button.addEventListener('click', () => {
		// take the last operator has been clicked
		if (display.value.length > 2) {
			let checkOperator = display.value[display.value.length - 2];
			if (checkOperator.match(/[\+\-\*\/]/)) {
				display.value = display.value.slice(0, display.value.length - 3);
			} 
		} 
		display.value += ' ' + button.value + ' ';
		if (countDot == 0) {
			countDot = 1;
		}
		checkClickEquals = '';
	});
});

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (checkClickEquals === '=') {
			display.value = button.value;
		} else {
			if (display.value === '0' || display.value.slice(-2) === ' 0') {
				display.value = display.value.slice(0, display.value.length - 1);
		} 
			display.value += button.value;
		}
		checkClickEquals = '';
	});
});

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
	let checkNumber = display.value[display.value.length - 1]; //only type dot after a number
	if (countDot == 1 && checkNumber.match(/\d/)) {
		display.value += decimalButton.value;
		countDot = 0;
	}
	checkClickEquals = '';
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {
	var result = handleEquals(display.value);
	result = Math.round(result * 1000000000) / 1000000000;
	display.value = result.toString();
	countDot = 1;
	checkClickEquals = '=';
});