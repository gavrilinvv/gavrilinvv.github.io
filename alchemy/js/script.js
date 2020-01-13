document.addEventListener('DOMContentLoaded', function() {
    var mc = new Hammer.Manager(document);
    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan')]);        
    mc.add( new Hammer.Tap({event: 'doubletap', taps: 2 }));
    mc.add(new Hammer.Tap( { event: 'singletap' } ));
    mc.add( new Hammer.Swipe()).recognizeWith( [mc.get('pan')] );

    var mcElem;

    var counter = document.querySelector('.counter');
    var notice = document.querySelector('.notice');
    var area = document.querySelector('.area');
    var trash = document.querySelector('.tool__remove');
    var catalogTool = document.querySelector('.tool__catalog');
    var infoTool = document.querySelector('.tool__info');
    var LSName = 'alData:openedElems';
    var scrollBar = '';
    var elements = [
        {
            "id": 1,
            "isBase": true,
            "class": "fire",
            "text": "Огонь"
        },
        {
            "id": 2,
            "isBase": true,
            "class": "water",
            "text": "Вода"
        },
        {
            "id": 3,
            "isBase": true,
            "class": "air",
            "text": "Воздух"
        },
        {
            "id": 4,
            "isBase": true,
            "class": "ground",
            "text": "Земля"
        },
        {
            "id": 5,
            "class": "volcano",
            "text": "Вулкан",
            "recept": [["fire", "ground"]]
        },
        {
            "id": 6,
            "class": "swamp",
            "text": "Болото",
            "recept": [["water", "ground"]]
        },
        {
            "id": 7,
            "class": "meteor",
            "text": "Метеорит",
            "recept": [["air", "fire"]]
        },
        {
            "id": 8,
            "class": "ferrum",
            "text": "Железо",
            "recept": [["meteor", "ground"]]
        },
        {
            "id": 9,
            "class": "sea",
            "text": "Море",
            "recept": [["salt", "water"],["water", "water"]]
        },
        {
            "id": 10,
            "class": "wind",
            "text": "Ветер",
            "recept": [["air", "air"]]
        },
        {
            "id": 11,
            "class": "steam",
            "text": "Пар",
            "recept": [["fire", "water"]]
        },
        {
            "id": 12,
            "class": "cloud",
            "text": "Облако",
            "recept": [["steam", "air"]]
        },
        {
            "id": 13,
            "class": "sky",
            "text": "Небо",
            "recept": [["cloud", "air"]]
        },
        {
            "id": 14,
            "class": "pressure",
            "text": "Давление",
            "recept": [["ground", "ground"]]
        },
        {
            "id": 15,
            "class": "energy",
            "text": "Энергия",
            "recept": [["air", "fire"]]
        }
    ];

    initLocalStorage();
    initEvents();
    updateCounter();
    initSimpleBar();
    initCatalog();
    initInfo();

    function initEvents() {
        dblClickCreateBaseElems();
        removeElement();
    }

    function removeElement() {
        $(trash).droppable({
            hoverClass: 'tool__remove-hover',
            drop: function(e, ui) {                
                $(ui.draggable[0]).remove();
                $(trash).hide();
            }
        });
    }

    function initInfo() {
        var catalog = document.querySelector('.catalog');
        var info = document.querySelector('.info');
        var bg = document.querySelector('.bg');
        var open = document.querySelector('.tool__info');
        var close = document.querySelector('.info__close');

        close.addEventListener('click', function() {
            info.classList.remove('_opened');
            bg.classList.remove('_show');
        });
        
        open.addEventListener('click', function() {
            catalog.classList.remove('_opened');
            info.classList.add('_opened');
            bg.classList.add('_show');
        });
    }

    function initCatalog() {
        var catalog = document.querySelector('.catalog');
        var info = document.querySelector('.info');
        var bg = document.querySelector('.bg');
        var open = document.querySelector('.tool__catalog');
        var container = document.querySelector('.catalog__content');
        var close = document.querySelector('.catalog__close');
        var btnAdd = document.querySelector('.catalog__btn');
        var selectedElements = [];
        var flatElementIds = [];
        var index;
        var saves;

        close.addEventListener('click', function() {
            catalog.classList.remove('_opened');
            bg.classList.remove('_show');
        });
        open.addEventListener('click', function() {
            saves = JSON.parse(localStorage.getItem(LSName));
            info.classList.remove('_opened');
            catalog.classList.add('_opened');
            bg.classList.add('_show');

            container.innerText = '';
            for(var i = 0; i < saves.length; i++) {
                var element = _getElementByID(saves[i]);
                container.appendChild(_createBoxElement(element));
            }
        });
        
        btnAdd.addEventListener('click', function() {
            addElement(selectedElements);
            selectedElements = [];
            catalog.classList.remove('_opened');
            bg.classList.remove('_show');
            // TODO сделать сброс выбранных элементов в каталоге
        })

        function _createBoxElement(elem) {
            var box = document.createElement('div');
            box.classList.add('catalog-elem');
            box.setAttribute('data-id', elem.id);
            
            var img = document.createElement('div');
            img.classList.add('catalog-elem__img');
            img.style.backgroundImage = 'url(img/elements/'+elem.class+'.png)';

            var title = document.createElement('p');
            title.classList.add('catalog-elem__txt');
            if(isLastElem(elem)) {
                title.classList.add('catalog-elem__txt-final');
            }
            title.innerText = elem.text;

            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.classList.add('catalog-elem__check');

            box.addEventListener('click', function() {
                var check = $(this).find('.catalog-elem__check');
                check.trigger('click');
                if(check.is(':checked')) {
                    this.classList.add('_selected');
                    selectedElements = _updateSelectedCatalog(this, selectedElements, 'add');
                } else {
                    this.classList.remove('_selected');
                    selectedElements = _updateSelectedCatalog(this, selectedElements, 'del');
                }
            })

            box.appendChild(img);
            box.appendChild(title);
            box.appendChild(checkbox);

            return box;
        }

        // обвновляет массив выбранных элементов в каталоге
        function _updateSelectedCatalog(elem, arr, action) {
            if(!action) {
                throw 'attribute `action` is not found';
            }

            var id = elem.getAttribute('data-id');
            var index = '';

            if(action == 'add') {
                arr.push(_getElementByID(id));
            }
            if(action == 'del') {
                index = arr.indexOf(id);
                arr.splice(index, 1);
            }
            return arr;
        }
    }

    // добавление элемента на страницу
    function addElement(elems, coords) {
        // проверяем пришел ли массив в качестве аргумента
        if(Array.isArray(elems)) {
            for(var i = 0; i < elems.length; i++) {
                _creating(elems[i]);
                if(!isMobile()) {
                    _animationElement();
                }
                updateLocalStorage(elems[i].id);
                updateCounter();
            }
        } else {
            _creating(elems, coords);
            if(!isMobile()) {
                _animationElement();
            }
            updateLocalStorage(elems.id);
            updateCounter();
        }

        function _creating(elem, coords) {
            var elemDOM = _creatingElement(elem, coords);
            area.appendChild(elemDOM);

            $('[data-name='+elem.class+']').draggable({
                start: function(e, ui) {
                    $(trash).show();
                    $(catalogTool).hide();
                    $(infoTool).hide();
                },
                stop: function(e, ui) {
                    $(trash).hide();
                    $(catalogTool).show();
                    $(infoTool).show();
                }
            });
            $('[data-name='+elem.class+']').droppable({
                drop: function(e, ui) {
                    checkNewElement(e.target, ui.draggable[0], {x: e.pageX, y: e.pageY})
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
            if(!isMobile()) {
                elem.classList.add('_normal-scaling');
                elem.classList.add('_scaling');
            }
            elem.setAttribute('data-name', className);
            elem.setAttribute('data-text', text);
            elem.setAttribute('data-id', id);
            var img = document.createElement('div');
            img.classList.add('element__img');

            img.style.backgroundImage = 'url(img/elements/'+className+'.png)';

            var name = document.createElement('div');
            name.classList.add('element__name');

            if(isFinalElem) {
                name.classList.add('element__name-final');
            }

            name.innerText = text;

            // генерируем координаты на основе размеров поля, если не указаны конкретно
            if(!coords) {
                coords = genRandomCoord(area.offsetWidth, area.offsetHeight);
            } else {
                /* т.к. координаты нового элемента будут считаться от верхнего левого угла,
                а координаты события находятся в центре элементов-родителей,
                новый элемент будет смещаться вниз и вправо.
                поэтому смещаем координаты обратно на половину размера иконки */
                elementWidth = $('.element').css('width').replace('px', '')
                elementHeight = $('.element').css('height').replace('px', '')
                coords.x = coords.x - (elementWidth/2);
                coords.y = coords.y - (elementHeight/2);
            }
            
            elem.setAttribute('style', 'left:'+coords.x+'px;top:'+coords.y+'px');

            elem.appendChild(img);
            elem.appendChild(name);
            return elem;
        }

        function _animationElement() {
            $('.element').removeClass('_scaling'); // анимация появления
            setTimeout(function() {
                $('.element').css({transition: '0s'}); // убираем плавность чтобы не отразилось на последующем перемещении элемента
            }, 400);
        }
    }

    function dblClickCopyElem(elemDOM) {
        mcElem = new Hammer.Manager(elemDOM);
        mcElem.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
        mcElem.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mcElem.get('pan')]);        
        mcElem.add( new Hammer.Tap({event: 'doubletap', taps: 2 }));
        mcElem.add(new Hammer.Tap( { event: 'singletap' } ));
        mcElem.add( new Hammer.Swipe()).recognizeWith( [mcElem.get('pan')] );

        mcElem.on("doubletap", function(e) {
            copyElem = _getElementByID(e.target.parentNode.getAttribute('data-id'));
            addElement(copyElem, {x: e.srcEvent.pageX+40, y: e.srcEvent.pageY+40});
        });
    }
    
    function genRandomCoord(w, h) {
        // у меньшаем площадь на 150px чтобы элементы никак не заходили за границы поля
        w = w - 150;
        h = h - 150;

        var width = Math.floor(Math.random() * (w - 0 + 1)) + 0;
        var height = Math.floor(Math.random() * (h - 0 + 1)) + 0;
        return {x: width, y: height};
    }

    // проверка совместимости элементов
    function checkNewElement(a, b, coords) {
        var elemA = a.getAttribute('data-name');
        var elemB = b.getAttribute('data-name');
        var recepts, recept, elem;
        var msg = '';
        for(var i = 0; i < elements.length; i++) { // все элементы
            if(!elements[i].recept) continue; // если нет рецепта, пропускаем
            elem = elements[i]; // элемент в переменной
            recepts = elem.recept; // рецепты в элементы
            for(var j = 0; j < recepts.length; j++) { // все рецепты
                recept = recepts[j]; // рецепт
                if( recept && // если есть рецепт

                    // если элементы разные и оба элемента есть в рецепте
                    ((elemA !== elemB && recept.indexOf(elemA) !== -1 && recept.indexOf(elemB) !== -1) ||

                    // если элементы одинаковые и оба элемента есть и на 1 и на 2 месте рецепта
                    (elemA == elemB && recept[0] == elemA && recept[1] == elemB ))
                    ) {
                    msg = createNoticeNewElem(a, b, elem); // генерируем сообщение (элемент1 + элемент2 = элемент3)
                    newNotice(msg); // выводим уведомление
    
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
        return 'Новый элемент:<br>'+a.getAttribute('data-text')+' + '+b.getAttribute('data-text')+' = '+result.text+'<br>';
    }

    function isLastElem(target) {
        var recepts, recept; // объявление переменных
        for(var i = 0; i < elements.length; i++) { // бежим по всем элементам
            if(!elements[i].recept) continue; // если у текущего элемента нет рецепта, то пропускаем
            recepts = elements[i].recept; // для удобства записываем массив с доступными рецептами в ранее объявленную переменную
            for(var j = 0; j < recepts.length; j++) { // бежим по рецептам текущего элемента
                recept = recepts[j]; // записываем текущий рецепт текущего элемента в ранее объявленную переменную
                if(recept && recept.indexOf(target.class) !== -1) { // если есть рецепт и внутри него есть икомый элемент, но он НЕ последний
                    return false;
                }
            }
        }
        return true;
    }

    function initLocalStorage() {
        if(localStorage.getItem(LSName)) {
            checkToOldElements();

            // сделать загрузку открытых элементов
        } else {
            var saves = [];
            localStorage.setItem(LSName, JSON.stringify(saves));
        }
    }

    // проверка на наличие недействительных элементов в сохранениях по отношению к актуальному массиву элементов
    function checkToOldElements() {
        var saves = JSON.parse(localStorage.getItem(LSName)),
            flatElementIds = [],
            save,
            index;

        // приводим все id элементов в один массив
        flatElementIds = flattingElementIds(flatElementIds);

        // проверяем каждый элемент из сохранений на наличие в актуальном массиве элементов
        for(var i = 0; i < saves.length; i++) {
            save = saves[i];

            if(flatElementIds.indexOf(save) == -1) { // если его нет в актуальном массиве
                index = saves.indexOf(save); // узнаем его индекс
                saves.splice(index, 1); // удаляем из массива по индексу
                localStorage.setItem(LSName, JSON.stringify(saves)); // записываем в localStorge обновленный массив
            }
        }
    }

    function flattingElementIds(arr) {
        elements.forEach(function(element) {
            arr.push(element.id);
        });
        return arr;
    }

    // получение элемента по ID
    function _getElementByID(id) {
        return elements.filter(function(item) {
            return item.id == id;
        })[0];
    }

    function updateLocalStorage(data) {
        var saves = JSON.parse(localStorage.getItem(LSName));

        // если элемента с id не существует в хранилище, то добавляем
        if(saves.indexOf(data) == -1) {
            saves.push(data);
            localStorage.setItem(LSName, JSON.stringify( saves ));
        }
    }

    // создание 4 базовых элемента при двойном клике на поле
    function dblClickCreateBaseElems() {
        document.addEventListener('dblclick', function(e) {
            var coords = {x: e.pageX, y: e.pageY};
            if(arguments[0] == 'firstEvent') {
                coords = {x: area.pageX, y: area.pageY};
            }
            elems = elements.filter(function(item) {return item.isBase;}) // фильтруем только по базовым
            addElement(elems, coords);
        }('firstEvent'));
        mc.on("doubletap", function(e) {
            // отменяем функцию, если тапаем по элементу
            if(e.target.parentNode && e.target.parentNode.classList.contains('element')) return false;
            var coords = {x: e.pageX, y: e.pageY};
            elems = elements.filter(function(item) {return item.isBase;}) // фильтруем только по базовым
            addElement(elems, coords);
        });
    }

    function updateCounter() {
        var count = localStorage.getItem(LSName);
        count = JSON.parse(count).length;
        counter.innerText = count+'/'+elements.length;
    }

    function newNotice(msg) {
        var noticeContainer = document.querySelectorAll('.tools__section')[0];
        notice.innerHTML += msg+'<br>';
        //noticeContainer.scrollTop = noticeContainer.scrollHeight;
        scrollBar.getScrollElement().scrollTop = 100;
        // $(notice).delay(3000).fadeOut(1000, function() {
        //     $(this).text('');
        // }).fadeIn(1);
    }

    // определение устройства
    function isMobile() {
        return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera)
    }

    function initSimpleBar() {
        scrollBar = new SimpleBar(document.querySelector('.tools__section'), { autoHide: false });
    }
})