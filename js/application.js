function parseResponse(response) {
	if (response.error) {
		showError(response.error);
	}
	if (response.refresh) {
		window.location.reload(true);
	}
	if (response.redirect) {
		window.location.href = response.redirect;
	}
	if (response.replaces instanceof Array) {
		for (var i = 0, ilen = response.replaces.length; i < ilen; i++) {
			$(response.replaces[i].what).replaceWith(response.replaces[i].data);
		}
	}
	if (response.append instanceof Array) {
		for (i = 0, ilen = response.append.length; i < ilen; i++) {
			$(response.append[i].what).append(response.append[i].data);
		}
	}
	if (response.js) {
		$("body").append(response.js);
	}
	jsFunctionsAssign();
}
function jsFunctionsAssign() {

}
function showError(error) {
	alert(error);
}
// yii submit form
function submitForm(element, url, params) {
	var f = $(element).parents('form')[0];
	if (!f) {
		f = document.createElement('form');
		f.style.display = 'none';
		element.parentNode.appendChild(f);
		f.method = 'POST';
	}
	if (typeof url == 'string' && url != '') {
		f.action = url;
	}
	if (element.target != null) {
		f.target = element.target;
	}

	var inputs = [];
	$.each(params, function (name, value) {
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", name);
		input.setAttribute("value", value);
		f.appendChild(input);
		inputs.push(input);
	});

	// remember who triggers the form submission
	// this is used by jquery.yiiactiveform.js
	$(f).data('submitObject', $(element));

	$(f).trigger('submit');

	$.each(inputs, function () {
		f.removeChild(this);
	});
}
$(function () {
    //отркытие ссылки в новом окне браузера Муха
    $(document).on('click', '.new_browser_window', function (event) {
        var targetVal = $(this).attr('target');
        if(targetVal == '_new'){
            event.preventDefault();
            //alert($(this).attr('href'))
            window.open($(this).attr('href'), 'window name', 'fulscreen=yes, toolbar=yes');
        }
    });
	//make category items clicked
	$(document).on('click', '.tabs > .item > a > i', function (event) {
		parent = $(this).parent();
		window.location.href = parent.attr('href');
	});
	$(document).on('submit', 'form.ajax-form', function (event) {
		event.preventDefault();
		var that = this;
		jQuery.ajax({
			'cache': false,
			'type': 'POST',
			'dataType': 'json',
			'data': $(that).serialize(),
			'success': function (response) {
				parseResponse(response);
			},
			'error': function (response) {
				alert(response.responseText);
			},
			'beforeSend': function () {

			},
			'complete': function () {

			},
			'url': this.action
		});
		return false;
	});
	$(document).on('click', 'a.submit-form-link', function (event) {
		var that = this;
		if (!$(that).data('confirm') || confirm($(that).data('confirm'))) {
			submitForm(
				that,
				that.href,
				$(that).data('params')
			);
			return false;
		} else {
			return false;
		}
	});
	$(document).on('click', 'a.ajax-link', function (event) {
		event.preventDefault();
		var that = this;
		if ($(that).data('confirm') && !confirm($(that).data('confirm'))) {
			return false;
		}
		jQuery.ajax({
			'cache': false,
			'type': 'POST',
			'dataType': 'json',
			'data': $(that).data('params'),
			'success': function (response) {
				parseResponse(response);
			},
			'error': function (response) {
				alert(response.responseText);
			},
			'beforeSend': function () {

			},
			'complete': function () {

			},
			'url': that.href
		});
		return false;
	});

	$('.columnize').columnize({columns: 2});

	$(document).on('ifChecked', 'input[type=checkbox].filter-checkbox', function (event) {
		event.preventDefault();
		var that = this;
		window.location.href = $(that).data('check-url');
	});

	$(document).on('ifUnchecked', 'input[type=checkbox].filter-checkbox', function (event) {
		event.preventDefault();
		var that = this;
		window.location.href = $(that).data('uncheck-url');
	});

	$(document).on('click', 'a.all', function (event) {
		event.preventDefault();
		$(this).toggleClass("active");
		var $inputCh = $(this).parent().parent().find("li input[type=checkbox]");
		if ($(this).is(".active")) {
			//$inputCh.iCheck('check');
			console.log($(this).data('check-url'));
			window.location.href = $(this).data('check-url')
		}
		else {
			console.log($(this).data('uncheck-url'));
			window.location.href = $(this).data('uncheck-url')
		}
	});


	$(document).ready(function () {
		if ($('.brands-checkbox').length == $('.brands-checkbox:checked').length) {
			$('a.all.brands').addClass('active');
		}
		if ($('.brands-series-checkbox').length == $('.brands-series-checkbox:checked').length) {
			$('a.all.brands-series').addClass('active');
		}
		if ($('.sub-cat-checkbox').length == $('.sub-cat-checkbox:checked').length) {
			$('a.all.sub-cat').addClass('active');
		}
	});


	$(document).on('click', 'a.deactivated', function (event) {
		event.preventDefault();
	});

	$(document).on('click', '#main-block .section .slide', function () {
		var h = $(this).data('href');

		location.href = h;
	});

});
