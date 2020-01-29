document.addEventListener('DOMContentLoaded', function() {
    var table = document.querySelector('table');
    var search = document.querySelector('.search');
    var recept1 = '';
    var recept2 = '';

    elements.forEach(function(element, i) {
        recept1 = getRecept(i, 0);
        recept2 = getRecept(i, 1);
        $(table).append(`
            <tr>
                <td>`+element.text+`</td>
                <td>`+recept1+`</td>
                <td>`+recept2+`</td>
            </tr>
        `);
    })
    function getRecept(index, variant) {
        var element = elements[index];
        if(!element.recept || !element.recept[variant]) return '';
        var recept = element.recept[variant];
        var receptElem1 = translateElement(recept[0]);
        var receptElem2 = translateElement(recept[1]);
        return receptElem1+' + '+receptElem2;
    }

    function translateElement(engName) {
        var res = '';
        elements.forEach(function(element, i) {
            if(element.class == engName) {
                res = element.text;
            }
        })
        return res;
    }

    search.addEventListener('input', function(e) {
        var value = this.value.toLowerCase();
        var cells = table.querySelectorAll('td');
        var cellText = '';

        cells = $(cells).filter(function(i, item) {
            return item.innerText !== '';
        });

        $(cells).each(function(i, cell) {
            cellText = $(cell).text().toLowerCase();

            $(cell).parent().css({display: (cellText.indexOf(value) !== -1) ? 'table-row' : 'none'});
        })
    })
});