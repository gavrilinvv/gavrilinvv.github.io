document.addEventListener("DOMContentLoaded", () => {
	var field = document.querySelector('.field'),
			btnClear = document.querySelector('.clear'),
			btnCalc = document.querySelector('.calc'),
			btnBack = document.querySelector('.back'),
			btnOperand = [...document.querySelectorAll('.operand')],
			btnNumber = [...document.querySelectorAll('.num')];

	btnNumber.map(function(item) {
		item.addEventListener('click', input);
	});
	btnOperand.map(function(item) {
		item.addEventListener('click', input);
	});
	btnClear.addEventListener('click', clear);
	btnCalc.addEventListener('click', calc);
	btnBack.addEventListener('click', back);

	function input() {
		field.value = field.value + this.innerText;
	}
	function clear() {
		field.value = '';
	}
	function back() {
		field.value = field.value.substring(0,field.value.length-1);
	}
	function calc() {
		try {
			field.value = eval(field.value);
			if(field.value == 'Infinity') {field.value = 'Error';}
		} catch(err) {
			alert('В выражении ошибка');
		}
	}
});