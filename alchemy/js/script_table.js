document.addEventListener('DOMContentLoaded', function() {
    var table = document.querySelector('table');
    var search = document.querySelector('.search');
    var recept1 = '';
    var recept2 = '';

    // заполняем таблицу строками из списка элементов
    elements.forEach(function(element, i) {
        recept1 = getRecept(i, 0);
		recept2 = getRecept(i, 1);

		var description = (element.description) ? element.description : '';
        $(table).append(`
            <tr>
                <td>`+element.text+`</td>
                <td>`+description+`</td>
                <td>`+recept1+`</td>
                <td>`+recept2+`</td>
            </tr>
        `);
    })
    function getRecept(index, variant) {
        var element = elements[index];
        if(!element.recept || !element.recept[variant]) return ''; // если нет рецептов вообще или нужного рецепта, то отдаем пустоту
        var recept = element.recept[variant]; // получаем 1 или 2 рецепт, в зависимости от аргумента variant
        var receptElem1 = translateElement(recept[0]); // получаем 1 слово из рецепта
        var receptElem2 = translateElement(recept[1]); // получаем 2 слово из рецепта
        return receptElem1+' + '+receptElem2; // отдаем переведенный рецепт
    }

    // переводчик названия элемента
    function translateElement(engName) {
        var res = '';
        elements.forEach(function(element, i) {
            if(element.class == engName) {
                res = element.text;
            }
        })
        return res;
    }

    // поиск по элементу
    search.addEventListener('input', function() {
        var value = this.value.toLowerCase(); // перевод входящего значения в нижний регистр
        var cells = Array.prototype.slice.call(table.querySelectorAll('td'), 0); // получаем все ячейки
        var cellText = '';
        var mainCellText = '';

        // берем из всех ячеек только заполненные
        cells = cells.filter(function(item) {
            return item.innerText !== '';
        });

        cells.forEach(function(cell) {
            cellText = cell.innerText.toLowerCase(); // переводим текст каждой ячейки в нижний регистр
            mainCellText = cell.parentNode.children[0].innerText.toLowerCase(); // тоже самое индивидуально для 1 столбца (целевой элемент)

            /* если в тексте ячейки есть вхождение из поискового запроса,
            то обращаемся к родителю ячейки (строке) и делаем ее видимой,
            иначе - скрываем */
            cell.parentNode.style.display = (cellText.indexOf(value) !== -1) ? 'table-row' : 'none'

            // если 1 ячейка в строке совпадает с искомым текстом, то принудительно выводим строку
            if( mainCellText.indexOf(value) !== -1 ) {
                cell.parentNode.style.display = 'table-row';
            }
        })
    })
});
