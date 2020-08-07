document.addEventListener('DOMContentLoaded', function () {
	var mc = new Hammer.Manager(document);
	var doubletap = new Hammer.Tap({
		event: 'doubletap',
		taps: 2,
		threshold: 80,
		posThreshold: 80
	});
	mc.add([doubletap]);

	var mcElem;

	var counter = document.querySelector('.counter');
	var notice = document.querySelector('.notice');
	var area = document.querySelector('.area');

	// tools
	var trash = document.querySelector('.tool__remove');
	var catalogTool = document.querySelector('.tool__catalog');
	var infoTool = document.querySelector('.tool__info');
	var sortTool = document.querySelector('.tool__sort');
	var clearTool = document.querySelector('.tool__clear');

	// общая информация
	var infoClose = document.querySelector('.info__close');
	var infoBlock = document.querySelector('.info');

	// каталог
	var catalogBlock = document.querySelector('.catalog');
	var catalogClose = document.querySelector('.catalog__close');
	var search = document.querySelector('.catalog__search input');
	var catalogInfo = document.querySelector('.catalog__info');
	var catalogInfoBack = document.querySelector('.catalog__info-back');
	var catalogInfoTitle = document.querySelector('.catalog__info-title');
	var catalogInfoContent = document.querySelector('.catalog__info-content');
	var catalogInfoDescription = document.querySelector('.catalog__info-desc');
	var receptsList = document.querySelector('.recepts-list');
	var btnAdd = document.querySelector('.catalog__btn-add');
	var btnInfo = document.querySelector('.catalog__btn-info');

	var bg = document.querySelector('.bg');
	var LSName_opened = 'alData:openedElems';
	var LSName_abandoned = 'alData:abandonedElems';
	var scrollBar = '';

	if (findGetParameter('dev')) {
		localStorage.setItem(LSName_opened, JSON.stringify(flattingElementIds([])));
	}

	initLocalStorage();
	initEvents();
	updateCounter();
	// initSimpleBar();
	initCatalog();
	initInfo();
	initPreloader();
	loadingAbandonedElems();

	function initEvents() {
		dblClickCreateBaseElems();
		removeElement();
	}

	function removeElement() {
		$(trash).droppable({
			hoverClass: 'tool__remove-hover',
			drop: function (e, ui) {
				$(ui.draggable[0]).remove();
				$(trash).hide();
			}
		});
	}

	function initSearch() {
		var items = document.querySelectorAll('.catalog-elem');
		var name;
		var val;
		search.addEventListener('input', function () {
			val = this.value.toLowerCase();
			items.forEach(function (item) {
				name = item.querySelector('.catalog-elem__txt').innerText.toLowerCase();
				if (name.indexOf(val) == -1) {
					item.style.display = 'none';
				} else {
					item.style.display = 'flex';
				}
			})
		})
	}

	function initInfo() {
		infoClose.addEventListener('click', function () {
			infoBlock.classList.remove('_opened');
			bg.classList.remove('_show');
		});

		infoTool.addEventListener('click', function () {
			catalogBlock.classList.remove('_opened');
			infoBlock.classList.add('_opened');
			bg.classList.add('_show');
		});

		sortTool.addEventListener('click', function () {
			sortElementsOnBoard();
		});

		clearTool.addEventListener('click', function () {
			clearElementsOnBoard();
		});
	}

	function initCatalog() {
		var containerElems = document.querySelector('.catalog__elems');
		var selectedElements = [];
		var saves;

		catalogClose.addEventListener('click', function () {
			catalogBlock.classList.remove('_opened');
			bg.classList.remove('_show');
			btnInfo.style.display = 'none';
			containerElems.style.display = 'flex';
			search.style.display = 'block';
			search.value = '';
			catalogInfo.style.display = 'none';
			catalogInfoContent.style.display = 'none';
			selectedElements = [];
		});
		catalogTool.addEventListener('click', function () {
			saves = JSON.parse(localStorage.getItem(LSName_opened));
			infoBlock.classList.remove('_opened');
			catalogBlock.classList.add('_opened');
			bg.classList.add('_show');

			containerElems.innerText = '';
			for (var i = 0; i < saves.length; i++) {
				var element = _getElemByID(saves[i]);
				containerElems.appendChild(_createBoxElement(element));
			}

			// сортировка по алфавиту
			_sortCatalogElems();

			// запускаем поиск по созданным элементам
			initSearch();
		});

		btnAdd.addEventListener('click', function () {
			addElement(selectedElements);
			selectedElements = [];
			catalogBlock.classList.remove('_opened');
			bg.classList.remove('_show');
			btnInfo.style.display = 'none';
			search.value = '';
		})

		btnInfo.addEventListener('click', function () {
			var targetElem = _getElemByID(selectedElements[0].id); // объект выбранного элемента

			containerElems.style.display = 'none';
			search.style.display = 'none';
			catalogInfo.style.display = 'block';
			catalogInfoContent.style.display = 'block';

			catalogInfoTitle.innerText = '';
			catalogInfoDescription.innerHTML = '';
			receptsList.innerHTML = '';

			catalogInfoTitle.innerText = targetElem.text;
			if (targetElem.description) {
				catalogInfoDescription.innerHTML = targetElem.description;
			}
			catalogInfo.appendChild(catalogInfoTitle);

			translateRecept(targetElem.recept, targetElem.text);

			// функция перевода рецерта из id в удобночитаемый
			function translateRecept(recepts, target) {
				var recept, elem1, elem2;
				for(var i = 0; i<recepts.length; i++) {
					recept = recepts[i];
					elem1 = _getElemByClass(recept[0]).text;
					elem2 = _getElemByClass(recept[1]).text;

					// если оба элемента открыты пользователем, тогда генерируем рецепт
					if( isCreatedElement(_getElemByClass(recept[0]).id) && isCreatedElement(_getElemByClass(recept[1]).id )) {
						var receptElement = document.createElement('li');
						receptElement.innerText = target + ' = ' + elem1 + ' + ' + elem2;
						receptsList.appendChild(receptElement);
					} else {
						receptsList.innerHTML = '&mdash;';
					}

				}
			}
		})

		// клик на кнопку "НАЗАД" в каталоге
		catalogInfoBack.addEventListener('click', function () {
			containerElems.style.display = 'flex';
			search.style.display = 'block';
			catalogInfo.style.display = 'none';
			catalogInfoContent.style.display = 'none';
		})

		// сортировка по алфавиту
		function _sortCatalogElems() {
			var elems = document.querySelectorAll('.catalog-elem');
			var elemsArray = Array.prototype.slice.call(elems, 0);
			var containerElems = document.querySelector('.catalog__elems');
			elemsArray.sort(function (a, b) {
				a = a.querySelector('.catalog-elem__txt').innerText;
				b = b.querySelector('.catalog-elem__txt').innerText;

				if (a > b) {return 1;}
				if (a < b) {return -1;}
				return 0;
			});
			elemsArray.forEach(function (elem) {
				containerElems.appendChild(elem);
			})
		}

		function _createBoxElement(elem) {
			var box = document.createElement('div');
			box.classList.add('catalog-elem');
			box.setAttribute('data-id', elem.id);
			box.setAttribute('title', elem.text);

			var img = document.createElement('div');
			img.classList.add('catalog-elem__img');
			img.style.backgroundImage = 'url(img/elements/' + elem.class + '.png)';

			var title = document.createElement('p');
			title.classList.add('catalog-elem__txt');
			if (elem.text.length > 10) {
				title.style.fontSize = '12px';
			}
			if (isLastElem(elem)) {
				title.classList.add('catalog-elem__txt-final');
			}
			title.innerText = elem.text;

			var checkbox = document.createElement('input');
			checkbox.setAttribute('type', 'checkbox');
			checkbox.classList.add('catalog-elem__check');

			box.addEventListener('click', function () {
				var check = $(this).find('.catalog-elem__check');
				check.trigger('click');
				if (check.is(':checked')) {
					this.classList.add('_selected');
					selectedElements = _updateSelectedCatalog(this, selectedElements, 'add');
				} else {
					this.classList.remove('_selected');
					selectedElements = _updateSelectedCatalog(this, selectedElements, 'del');
				}

				//если выбран 1 элемент (не более), то показываем кнопку.
				btnInfo.style.display = 'none';
				if (selectedElements.length == 1) {
					btnInfo.style.display = 'inline-block';
				}
			})

			box.appendChild(img);
			box.appendChild(title);
			box.appendChild(checkbox);

			return box;
		}

		// обвновляет массив выбранных элементов в каталоге
		function _updateSelectedCatalog(elem, arr, action) {
			if (!action) {
				throw 'attribute `action` is not found';
			}

			var id = elem.getAttribute('data-id');
			var index = '';

			if (action == 'add') {
				arr.push(_getElemByID(id));
			}
			if (action == 'del') {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].id == id) {
						index = i;
					}
				};
				arr.splice(index, 1);
			}
			return arr;
		}
	}

	// добавление элемента на страницу
	/*
		elems - элементы. массив или 1 элемент (обязательный)
		coords - координаты. объект со свойствами x и y. (необязательный)
		isOrder - устанавливается в порядке. boolean. (необязательный)
	*/
	function addElement(elems, coords, isOrder) {
		isOrder = isOrder || false;

		// проверяем пришел ли массив в качестве аргумента
		if (Array.isArray(elems)) {
			for (var i = 0; i < elems.length; i++) {
				_creating(elems[i], null);
				if (!isMobile()) {
					_animateShowElement();
				}
				_animateNewElement();
				updateLocalStorage(elems[i].id);
				updateCounter();
			}
		} else {
			_creating(elems, coords);
			if (!isMobile()) {
				_animateShowElement();
			}
			_animateNewElement();
			updateLocalStorage(elems.id);
			updateCounter();
		}

		function _creating(elem, coords, isOrder) {
			var elemDOM = _creatingElement(elem, coords, isOrder);
			area.appendChild(elemDOM);

			$('[data-name=' + elem.class + ']').draggable({
				start: function (e, ui) {
					// текущий элемент становится выше остальных
					$('.element').css({
						zIndex: 1
					});
					e.target.style.zIndex = 2;

					$(trash).show();
					$(catalogTool).hide();
					$(infoTool).hide();
					$(sortTool).hide();
					$(clearTool).hide();
				},
				stop: function (e, ui) {
					$(trash).hide();
					$(catalogTool).show();
					$(infoTool).show();
					$(sortTool).show();
					$(clearTool).hide();
				}
			});
			$('[data-name=' + elem.class + ']').droppable({
				//greedy: true,
				drop: function (e, ui) {
					checkNewElement(e.target, ui.draggable[0], {
						x: e.pageX,
						y: e.pageY
					})
				}
			});

			// привязывание события для копирования элемента
			dblClickCopyElem(elemDOM);
		}

		// создание DOM-элемента
		function _creatingElement(elemObj, coords) {
			var className = elemObj.class;
			var text = elemObj.text;
			var id = elemObj.id;
			var isFinalElem = isLastElem(elemObj);

			// высота и ширина элемента. нужна для координат
			var elementWidth;
			var elementHeight;

			var elem = document.createElement('div');
			elem.classList.add('element');
			if (!isMobile()) {
				elem.classList.add('_normal-scaling');
				elem.classList.add('_scaling');
			}
			elem.setAttribute('data-name', className);
			elem.setAttribute('data-text', text);
			elem.setAttribute('data-id', id);
			var img = document.createElement('div');
			img.classList.add('element__img');

			img.style.backgroundImage = 'url(img/elements/' + className + '.png)';

			var name = document.createElement('div');
			name.classList.add('element__name');

			if (isFinalElem) {
				name.classList.add('element__name-final');
			}

			name.innerText = text;

			var newEffect = document.createElement('div');
			newEffect.classList.add('element__new');

			// генерируем координаты на основе размеров поля, если не указаны конкретно
			if (!coords) {
				coords = genRandomCoord(area.offsetWidth, area.offsetHeight);
			} else {
				/* т.к. координаты нового элемента будут считаться от верхнего левого угла,
				а координаты события находятся в центре элементов-родителей,
				новый элемент будет смещаться вниз и вправо.
				поэтому смещаем координаты обратно на половину размера иконки */
				if( !isOrder ) {
					elementWidth = $('.element').css('width').replace('px', '');
					elementHeight = $('.element').css('height').replace('px', '');
					coords.x = coords.x - (elementWidth / 2);
					coords.y = coords.y - (elementHeight / 2);
				}
			}

			elem.setAttribute('style', 'left:' + coords.x + 'px;top:' + coords.y + 'px');

			elem.appendChild(img);
			elem.appendChild(name);
			if (_isNewElement(id)) {
				elem.appendChild(newEffect);
			}
			return elem;
		}

		function _isNewElement(id) {
			var saves = JSON.parse(localStorage.getItem(LSName_opened));
			return saves.indexOf(id) == -1;
		}

		function _animateShowElement() {
			$('.element').removeClass('_scaling'); // анимация появления
			setTimeout(function () {
				$('.element').css({
					transition: '0s'
				}); // убираем плавность чтобы не отразилось на последующем перемещении элемента
			}, 400);
		}

		function _animateNewElement() {
			setTimeout(function () {
				$('.element__new').remove();
			}, 300);
		}
	}

	function dblClickCopyElem(elemDOM) {
		mcElem = new Hammer.Manager(elemDOM);
		var mcDoubletap = new Hammer.Tap({
			event: 'mcDoubletap',
			taps: 2,
			threshold: 80,
			posThreshold: 80
		});
		mcElem.add([mcDoubletap]);

		mcElem.on("mcDoubletap", function (e) {
			copyElem = _getElemByID(e.target.parentNode.getAttribute('data-id'));
			addElement(copyElem, {
				x: e.srcEvent.pageX + 40,
				y: e.srcEvent.pageY + 40
			});
		});
	}

	function genRandomCoord(w, h) {
		// у меньшаем площадь на 150px чтобы элементы никак не заходили за границы поля
		w = w - 150;
		h = h - 150;

		var width = Math.floor(Math.random() * (w - 0 + 1)) + 0;
		var height = Math.floor(Math.random() * (h - 0 + 1)) + 0;
		return {
			x: width,
			y: height
		};
	}

	// проверка совместимости элементов
	function checkNewElement(a, b, coords) {
		var elemA = a.getAttribute('data-name');
		var elemB = b.getAttribute('data-name');
		var recepts, recept, elem;
		var msg = '';
		for (var i = 0; i < elements.length; i++) { // все элементы
			if (!elements[i].recept) continue; // если нет рецепта, пропускаем
			elem = elements[i]; // элемент в переменной
			recepts = elem.recept; // рецепты в элементы
			for (var j = 0; j < recepts.length; j++) { // все рецепты
				recept = recepts[j]; // рецепт
				if (recept && // если есть рецепт

					// если элементы разные и оба элемента есть в рецепте
					((elemA !== elemB && recept.indexOf(elemA) !== -1 && recept.indexOf(elemB) !== -1) ||

						// если элементы одинаковые и оба элемента есть и на 1 и на 2 месте рецепта
						(elemA == elemB && recept[0] == elemA && recept[1] == elemB))
				) {

					var saves = JSON.parse(localStorage.getItem(LSName_opened));
					if (saves.indexOf(elem.id) == -1) {
						msg = createNoticeNewElem(a, b, elem); // генерируем сообщение (элемент1 + элемент2 = элемент3)
						newNotice(msg); // выводим уведомление
					}

					addElement(elem, coords); // добавляем элемент на страницу в соответствующем месте

					// удаляем элементы-производители
					$(a).remove();
					$(b).remove();
				}
			}
		}
	}

	// создание сообщения о создании нового элемента
	function createNoticeNewElem(a, b, result) {
		return 'Новый элемент: ' + a.getAttribute('data-text') + ' + ' + b.getAttribute('data-text') + ' = ' + result.text + '<br>';
	}

	function isLastElem(target) {
		var recepts, recept; // объявление переменных
		for (var i = 0; i < elements.length; i++) { // бежим по всем элементам
			if (!elements[i].recept) continue; // если у текущего элемента нет рецепта, то пропускаем
			recepts = elements[i].recept; // для удобства записываем массив с доступными рецептами в ранее объявленную переменную
			for (var j = 0; j < recepts.length; j++) { // бежим по рецептам текущего элемента
				recept = recepts[j]; // записываем текущий рецепт текущего элемента в ранее объявленную переменную
				if (recept && recept.indexOf(target.class) !== -1) { // если есть рецепт и внутри него есть икомый элемент, но он НЕ последний
					return false;
				}
			}
		}
		return true;
	}

	function initLocalStorage() {
		if (localStorage.getItem(LSName_opened)) {
			filterToOldElements();

			// сделать загрузку открытых элементов
		} else {
			var saves = [];
			localStorage.setItem(LSName_opened, JSON.stringify(saves));
		}
	}

	// проверка на то, что элемент уже открыт пользователем
	function isCreatedElement(id) {
		var saves = JSON.parse(localStorage.getItem(LSName_opened));

		return (saves.indexOf(id) !== -1) ? true : false;
	};

	// проверка на наличие недействительных элементов в сохранениях по отношению к актуальному массиву элементов
	function filterToOldElements() {
		var saves = JSON.parse(localStorage.getItem(LSName_opened)),
			flatElementIds = [],
			save,
			index;

		// приводим все id элементов в один массив
		flatElementIds = flattingElementIds(flatElementIds);

		// проверяем каждый элемент из сохранений на наличие в актуальном массиве элементов
		for (var i = 0; i < saves.length; i++) {
			save = saves[i];

			if (flatElementIds.indexOf(save) == -1) { // если его нет в актуальном массиве
				index = saves.indexOf(save); // узнаем его индекс
				saves.splice(index, 1); // удаляем из массива по индексу
				localStorage.setItem(LSName_opened, JSON.stringify(saves)); // записываем в localStorge обновленный массив
			}
		}
	}

	function flattingElementIds(arr) {
		elements.forEach(function (element) {
			arr.push(element.id);
		});
		return arr;
	}

	// возвращает уникальные элементы массива
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	// получение элемента по классу
	function _getElemByClass(className) {
		return elements.filter(function (item) {
			return item.class == className;
		})[0];
	}

	// получение элемента по ID
	function _getElemByID(id) {
		return elements.filter(function (item) {
			return item.id == id;
		})[0];
	}

	function updateLocalStorage(data) {
		var saves = JSON.parse(localStorage.getItem(LSName_opened));

		// если элемента с id не существует в хранилище, то добавляем
		if (saves.indexOf(data) == -1) {
			saves.push(data);
			localStorage.setItem(LSName_opened, JSON.stringify(saves));
		}
	}

	// сортированное размещение элементов на доске
	function sortElementsOnBoard() {
		var elems = getAbandonedElems();
		var areaX = area.offsetWidth, areaY = area.offsetHeight;
		var x = 0, y = 50;

		elems.forEach(function(elem) {
			elem.style.transition = '.5s';
			elem.style.left = x + 'px';
			elem.style.top = y + 'px';
			setTimeout(function () {
				elem.style.transition = 'none';
			}, 500);

			if(x <= areaX-200) {
				x += 140;
			} else {
				x = 0;
				y += 140;
			}
		});
	}

	function clearElementsOnBoard() {
		getAbandonedElems().forEach(function(elem) {
			elem.remove();
		});
	}

	// размещение элементов на доске
	function setElementsOnBoard(elems) {
		elems = elems.map(function(id) {
			return _getElemByID(id);
		})

		addElement(elems);
	}

	// загрузка оставленных элементов после последнего закрытия окна браузера
	function loadingAbandonedElems() {
		var elemIds = JSON.parse(localStorage.getItem(LSName_abandoned));
		if(!elemIds) return;

		setElementsOnBoard(elemIds);
	}

	// получение элементов с рабочего стола
	function getAbandonedElems() {
		return  Array.prototype.slice.call(document.querySelectorAll('.area .element'), 0);
	}

	// сохранение элементов, которые остались на рабочем столе
	window.addEventListener("beforeunload", function () {
		var elems = getAbandonedElems();
		elems = elems.map(function(item) {
			return parseInt(item.getAttribute('data-id'));
		}).filter(onlyUnique);
		localStorage.setItem(LSName_abandoned, JSON.stringify(elems)); // записываем в localStorge
	});

	// создание 4 базовых элемента при двойном клике на поле
	function dblClickCreateBaseElems() {
		var coords = {
			x: area.pageX,
			y: area.pageY
		};
		elems = elements.filter(function (item) {
			return item.isBase;
		}) // фильтруем только по базовым
		//addElement(elems, coords);

		mc.on("doubletap", function (e) {
			if (e.target.parentNode && e.target.parentNode.classList.contains('element')) return false;
			var coords = {
				x: e.pageX,
				y: e.pageY
			};
			elems = elements.filter(function (item) {
				return item.isBase;
			}) // фильтруем только по базовым
			addElement(elems, coords);
		});

		// document.addEventListener('dblclick', function(e) {
		//     var coords = {x: e.pageX, y: e.pageY};
		//     if(arguments[0] == 'firstEvent') {
		//         coords = {x: area.pageX, y: area.pageY};
		//     }
		//     elems = elements.filter(function(item) {return item.isBase;}) // фильтруем только по базовым
		//     addElement(elems, coords);
		// }('firstEvent'));
		// mc.on("doubletap", function(e) {
		//     // отменяем функцию, если тапаем по элементу
		//     if(e.target.parentNode && e.target.parentNode.classList.contains('element')) return false;
		//     var coords = {x: e.pageX, y: e.pageY};
		//     elems = elements.filter(function(item) {return item.isBase;}) // фильтруем только по базовым
		//     addElement(elems, coords);
		// });
	}

	function updateCounter() {
		var count = localStorage.getItem(LSName_opened);
		count = JSON.parse(count).length;
		counter.innerText = count + '/' + elements.length;
	}

	function newNotice(msg) {
		// var noticeContainer = document.querySelectorAll('.notice')[0];
		// notice.innerHTML += msg;
		// scrollBar.getScrollElement().scrollTop = noticeContainer.scrollHeight;

		var logger = document.querySelectorAll('.logger')[0];
		logger.innerHTML = msg;
		logger.style.opacity = '1';
		setTimeout(function() {
			logger.style.opacity = '0';
		}, 5000)
	}

	// определение устройства
	function isMobile() {
		return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera)
	}

	function initSimpleBar() {
		scrollBar = new SimpleBar(document.querySelector('.tools__section'), {
			autoHide: false
		});
	}

	// предзагрузка изображений
	function initPreloader() {
		$.preloadImages = function () {
			for (var i = 0; i < arguments.length; i++) {
				$('<img>').attr('src', arguments[i]);
			}
		};
		elements.forEach(function (elem) {
			$.preloadImages('./img/elements/' + elem.class + '.png');
		});
		$.preloadImages('./img/new_effect.png');
		$.preloadImages('./img/list.png');
		$.preloadImages('./img/info.png');
		$.preloadImages('./img/remove.svg');
	}

	function findGetParameter(parameterName) {
		var result = null,
			tmp = [];
		location.search
			.substr(1)
			.split("&")
			.forEach(function (item) {
				tmp = item.split("=");
				if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
			});
		return result;
	}
})
