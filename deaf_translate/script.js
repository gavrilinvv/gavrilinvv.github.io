document.addEventListener("DOMContentLoaded", function() {
	var input = document.querySelector('input'),
		form = document.querySelector('#translator'),
		hint = document.querySelector('.hint'),
		result = document.querySelector('.result');
		
	// перевод по словам
	function translateByWord(val) {
		var container = document.createElement('div');
		container.style.display = 'inline-block';

		var subtitle = document.createElement('div');
		subtitle.innerHTML = val.raw.toUpperCase();
		subtitle.classList.add('subtitle');

		var img = document.createElement('img');
		img.classList.add('img');
		img.src = 'img/words/'+decodeURI(val.static)+'.jpg';

		container.appendChild(img);
		container.appendChild(subtitle);
		result.appendChild(container);
	}

	// перевод по буквам
	function translateByLetters(val) {
		for(var i = 0; i<val.length; i++) {	
			var container = document.createElement('div');
			container.style.display = 'inline-block';

			var subtitle = document.createElement('div');
			subtitle.innerHTML = val[i].toUpperCase();;
			subtitle.classList.add('subtitle');

			var img = document.createElement('img');
			img.classList.add('img');
			img.src = 'img/letters/'+val[i].toUpperCase()+'.jpg';

			container.appendChild(img);
			container.appendChild(subtitle);

			result.appendChild(container);
		}
	}

	// добавление пробела
	function createSpace() {
		var space = document.createElement('div');
		space.style.display = 'inline-block';
		space.style.width = '50px';
		result.appendChild(space);
	}

	function searchWord(word) {
		for(var i = 0; i<words.length; i++) {
			if( words[i].vars.indexOf(word) != -1 ) {

				// возвращаем слово в инфинитиве и то, что ввел пользователь
				return {
					static: words[i].src,
					raw: word
				}
			}
		}
	}

	function reset() {
		result.innerHTML = '';
		hint.innerHTML = '';
		hint.classList.add('hidden');
	}

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		reset();
		var val = input.value.trim();

		var regex = new RegExp('[А-ЯЁ][а-яё]', 'gi');
		if(!regex.test(val)) {
			hint.innerHTML = '!Можно вводить только кириллицу!';
			hint.classList.remove('hidden');
			return false;
		}

		var word = val.split(' ');
		for(var i = 0; i<word.length; i++) {
			if(i!=0) createSpace();
			if(searchWord(word[i])) {
				translateByWord(searchWord(word[i]));
			} else {
				translateByLetters(word[i]);
			}
		}
	})
})
