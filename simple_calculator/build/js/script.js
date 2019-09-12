"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener("DOMContentLoaded", function () {
  var field = document.querySelector('.field'),
      btnClear = document.querySelector('.clear'),
      btnCalc = document.querySelector('.calc'),
      btnBack = document.querySelector('.back'),
      btnOperand = [].concat(_toConsumableArray(document.querySelectorAll('.operand'))),
      btnNumber = [].concat(_toConsumableArray(document.querySelectorAll('.num')));
  btnNumber.map(function (item) {
    item.addEventListener('click', input);
  });
  btnOperand.map(function (item) {
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
    field.value = field.value.substring(0, field.value.length - 1);
  }

  function calc() {
    try {
      field.value = eval(field.value);
    } catch (err) {
      alert('В выражении ошибка');
    }
  }
});