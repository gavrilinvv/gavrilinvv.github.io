$(document).ready(function() {

	var notcompList = $('.notcomp'),
			compList = $('.comp'),
			tempTaskNotComp = '<div class="task task-notcomp"></div>',
			tempTaskComp = '<div class="task task-comp"></div>',
			searchField = $('.txt');

	searchField.on('keyup', function(e) {
		if(e.keyCode == '13' && $('.txt').val() != '') {
			var btnDel = $('<i class="task__icon fa fa-trash"></i>').click(del),
					btnCheck = $('<i class="task__icon fa fa-check"></i>').click(check);

			notcompList.append( $(tempTaskNotComp).text(e.target.value).append(btnDel, btnCheck) );
			$(this).val('');
			checkEmpty();
		}
	});

	function del() {
		$(this).parents('.task').remove();
		checkEmpty();
	}
	function check() {
		var btnDel = $('<i class="task__icon fa fa-trash"></i>').click(del),
				btnCheck = $('<i class="task__icon fa fa-check"></i>').click(check),
				text = $(this).parents('.task').text().trim(),
				task = $(tempTaskComp).text(text).append(btnDel);
		compList.append(task);
		$(this).parents('.task').remove();
		checkEmpty();
	}

	function checkEmpty() {
		notcompList.find('.empty-list')[ (notcompList.find('.task').length == 0) ? 'show' : 'hide' ]();
		compList.find('.empty-list')[ (compList.find('.task').length == 0) ? 'show' : 'hide' ]();
	}
})