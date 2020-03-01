window.onload= function (){
	// window onload loads the html and css elements before loading the javascript to locate the elements
	const resultEl = document.getElementById('result');
	const lengthEl = document.getElementById('length');
	const uppercaseEl = document.getElementById('uppercase');
	const lowercaseEl = document.getElementById('lowercase');
	const numbersEl = document.getElementById('numbers');
	const symbolsEl = document.getElementById('symbols');
	const generateEl = document.getElementById('generate');
	const clipboard = document.getElementById('clipboard');
// created variables to locate different element ids of the page

	const randomFunc = {
		lower: getRandomLower,
		upper: getRandomUpper,
		number: getRandomNumber,
		symbol: getRandomSymbol
	}
// loads the settings uppercase, lowercase, numerical, and special character settings funtion into a function for creating the password

// click operator to copy the password	
	clipboard.addEventListener('click', () => {
		const textarea = document.createElement('textarea');
		const password = resultEl.innerText;
		
		if(!password) { return; }
		
		textarea.value = password;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		textarea.remove();
		alert('Copied!');
	});

// click operator to generate a password
	generate.addEventListener('click', () => {
		const length = +lengthEl.value;
		const hasLower = lowercaseEl.checked;
		const hasUpper = uppercaseEl.checked;
		const hasNumber = numbersEl.checked;
		const hasSymbol = symbolsEl.checked;
	// if the settings are checkes, then the correlating function will run
		resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
	});
	// it does what it says, generates the password provided the different settings 
	function generatePassword(lower, upper, number, symbol, length) {
		let generatedPassword = '';
		const typesCount = lower + upper + number + symbol;
		const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
		
		// function if the are no selected settings; there will be no value return
		if(typesCount === 0) {
			return '';
		}
		
	// created a loop for the length of the password to choose specific elements at random for the provided length
		for(let i=0; i<length; i+=typesCount) {
			typesArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				generatedPassword += randomFunc[funcName]();
			});
		}
		
		const finalPassword = generatedPassword.slice(0, length);
		
		return finalPassword;
	}
	// used character codes to locate specific characters
	// the functions below generate the selected setting to include in the random password

	function getRandomUpper() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}
	function getRandomLower() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}
	function getRandomNumber() {
		return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
	}
	
	function getRandomSymbol() {
		const symbols = '?\:;"!@#$%^&*(){}[]=<>/,|.'
		return symbols[Math.floor(Math.random() * symbols.length)];
		// created a string variable of symbols since there is a wide variety of character codes
	}
	
}