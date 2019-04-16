$(function(){
	$('.chosen-select').chosen({disable_search_threshold: 10}); 
	$('.chosen-select-no-search').chosen({disable_search: true}); 


	adjustButtons();
	// adjestHelperHeight();
	setTimeout(adjustButtons,500);
	setTimeout(adjustButtons,1000);
	// setTimeout(adjestHelperHeight,500);
	// setTimeout(adjestHelperHeight,1000);

	// if ($(document).height() > $(window).height()) {
	// 	var buttons = $('.bottom-buttons');
	//     buttons.css('box-shadow', '0 -10px 10px -10px gray');
	// }else{
	// 	var buttons = $('.bottom-buttons');
	//     buttons.css('box-shadow', 'none');
	// }

	function adjustButtons() {
		// var child=":nth-child()"
		var container = $('.content-container');
		console.log('adjustButtons');
		console.log(container.offset());
		if(container.offset()){
			var buttons = $('.bottom-buttons');
			var leftOffset = container.offset().left;
			console.log("leftOffset "+leftOffset);	
			var width = container.width();
			buttons.css('left', leftOffset - 30 + 'px');
			buttons.css('width', width + 30+ 'px');
		}
		if ($(document).height() > $(window).height()) {
			var buttons = $('.bottom-buttons');
		    buttons.css('box-shadow', '0 -10px 10px -10px gray');
		}else{
			var buttons = $('.bottom-buttons');
		    buttons.css('box-shadow', 'none');
		}
	}

	function adjestHelperHeight(){
		var container = $('.content-container');
		if(container){
			console.log(container);
			var helper = $('#helper-content');
			var viewportHeight = $(window).height();
			var containerHeight = container.height()+260;
			if(viewportHeight >containerHeight){
				helper.css('height', viewportHeight+'px');
			}else{
				helper.css('height', containerHeight+'px');				
			}
		}
	}
	$(window).on('resize', function(){
		adjustButtons();
		adjestHelperHeight();
	});

	$(window).on('scroll',function(){
		var buttons = $('.bottom-buttons');
		 if($(window).scrollTop() + $(window).height() == $(document).height()) {
	       buttons.css('box-shadow', 'none')
		   }else{
		   	 buttons.css('box-shadow', '0 -10px 10px -10px gray')
		   }
	})
	    //box-shadow: 0 -15px 10px -10px gray;

	var helper = $('#helper-content');
	var body = $('body');
	var overlay = $('.overlay');
	$('.help-button').click(function() {
		$('.overlay .helper-container').html(helper.html());
		overlay.fadeIn(100);
		body.css('overflow', 'hidden');
		window.scrollTo(0,0);
	});

	$('.overlay .close-button').click(function() {
		overlay.fadeOut(100);
		body.css('overflow', 'auto');
	});



	// Text count

	$('.count-text textarea').keyup(function() {
		var maxLength = $(this).attr('maxlength');
		var length = $(this).val().length;
		var remaining = maxLength - length;

		$(this).parent().find('.counter').html(remaining);
	});
});


function TagBox(id) {

	var t, tagBox;

	// We call taggingJS init on all "#tag" divs
	t = $('#' + id + ' .tagging').tagging({
		'tag-on-blur': true,
		'no-duplicate': true,
		'tag-char': '',
		'tags-input-name': id,
		'case-sensitive': true,
		'edit-on-delete': false,
		'no-duplicate-text': 'มีข้อความนี้ไปแล้ว',
		'type-zone-class': 'type-zone',
		'type-zone-placeholder': $('#' + id + ' .tagging').data('placeholder')
	});

	// This is the tagBox object of the first captured div
	tagBox = t[0];

	$('#' + id + ' .suggestion button').click(function() {
		var text = $(this).html();
		$(this).remove();
		console.log(text);
		tagBox.tagging("add", text);
	});

}

function Slider(name, range, min, max, step) {
	var minInput = $('#' + name + ' .min-val');
	var maxInput = $('#' + name + ' .max-val');
	var minText = $('#' + name + ' .min');
	var maxText = $('#' + name + ' .max');
	var gender_women = $('#gender .women');
	gender_women.val(50);
	gender_women.html(50);

	var defaultMin = minInput.val();
	var defaultMax = maxInput.val();

	$('#' + name + ' .slider').slider({
		range: range,
		min: min,
		max: max,
		values: range ? [ defaultMin, defaultMax ] : null,
		value: range ? null : defaultMin,
		slide: function( event, ui ) {
			if (range) {
				minInput.val(ui.values[0]);
				minText.html(ui.values[0]);
				maxInput.val(ui.values[1]);
				maxText.html(ui.values[1]);
			} else {
				minInput.val(ui.value);
				minText.html(ui.value);
				gender_women.val(100 - ui.value);
				gender_women.html(100 - ui.value);
			}
		},
		step: step
	});
}

function Spinner(container) {
	function doSpinner(el, diff, defaultVal) {
		var container = $(el).parent();
		var data = container.find('.data');
		var preview = container.find('.preview');
		var suffix = preview.data('suffix');
		var currentVal = parseInt(data.val());
		var newVal = currentVal > 0 ? currentVal + diff : defaultVal;
		data.val(newVal);
		preview.val(newVal + suffix);
		// console.log("Do spin");
	}
	$(container + ' .add').click(function() {
		doSpinner(this, 1, 1);
	});
	$(container + ' .minus').click(function() {
		doSpinner(this, -1, 0);
	});

	// $(container + ' .add').on('mousedown', function() {
	//     timeoutId = setTimeout(doSpinner(this, 1, 1), 100);
	//     console.log("mousedown")
	// }).on('mouseup mouseleave', function() {
	//     clearTimeout(timeoutId);
	// });

	// $(container + ' .minus').on('mousedown', function() {
	//     timeoutId = setTimeout(doSpinner(this, -1, 0), 100);
	// }).on('mouseup mouseleave', function() {
	//     clearTimeout(timeoutId);
	// });

	$(container + ' .preview').focus(function (e) {
		var container = $(this).parent();
		var data = container.find('.data');
		var preview = $(this);
		var currentVal = data.val();
		preview.val(currentVal);
	});
	$(container + ' .preview').blur(function (e) {
		var container = $(this).parent();
		var data = container.find('.data');
		var preview = $(this);
		var suffix = preview.data('suffix');
		var currentVal = parseInt($(this).val());
		currentVal = currentVal >= 0 ? currentVal : 0;

		preview.val(currentVal + suffix);
		data.val(currentVal);
	});
}