$(document).ready(function(){

	// Windows 8 Hack
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	  var msViewportStyle = document.createElement('style')
	  msViewportStyle.appendChild(
		document.createTextNode(
		  '@-ms-viewport{width:auto!important}'
		)
	  )
	  document.querySelector('head').appendChild(msViewportStyle)
	}
	
	// Android <select> Hack
	var nua = navigator.userAgent
	var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%')
	}
	
	// Product Modal Window
	$('.item .content .button').click(function(){
		$('#quicklook .container').css({top: $(document).scrollTop(), left: ($(document).width() / 2) - ($('#quicklook .container').width() / 2) - 20});
		$('#quicklook').show();
	});
	$('#quicklook .cross').click(function(){
		$(this).parent().parent().hide();
	});
	
	// Product item hover
	$('.item').hover(function(){
		$(this).css('z-index', '9997');
	});
	$('.item').mouseleave(function(){
		$(this).css('z-index', 'auto');
	});
	
	// Accordions
	$('.side-menu > span, .side-menu-left > span').click(function(){
		$(this).parent().toggleClass('active');
	});
	
	// Resize Event
	$(window).resize(function(){
		resizeItem();
		// Top menu resize
		topMenuResize();
		
		// Position of product modal window
		$('#quicklook .container').css({left: ($(document).width() / 2) - ($('#quicklook .container').width() / 2) - 20});
		
		// Fill div's in top menu
		$('.sub-menu-main .gallery .fill').each(function(){
			$(this).height($(this).next().height());
		});
		
		// Resize preview image fill in product
		resizePreviewImgFill();
	});
	
	// Resize item container
	resizeItem();
	
	
	// Tab menu
	$('.tab-menu li').click(function(){
		if ($(this).parentsUntil('.container').next('.tab-menu-content').length) {
			var tab_menu_content = $(this).parentsUntil('.container').next('.tab-menu-content');
		}
		else {
			var tab_menu_content = $(this).parentsUntil('.container').prev('.tab-menu-content');
		}
		tab_menu_content.children('.active').each(function(){
			$(this).removeClass('active');
		});
		$(this).siblings().each(function(){
			$(this).removeClass('active');
		});
		
		tab_menu_content.children(':eq(' + $(this).index() + ')').addClass('active');
		$(this).addClass('active');
		
		$(this).siblings('.triangle').offset({left: $(this).offset().left + $(this).width() / 2});
		
		// Resize item container
		resizeItem();
	});
	
	// Search click
	$('.menu .search span').click(function(){
		$(this).parentsUntil('.menu').siblings('.menu-block').hide();
		$(this).parentsUntil('.menu').last().hide();
		$(this).parentsUntil('.menu').siblings('.search-active').show();
	});
	$('.menu .search-active span').click(function(){
		$(this).parentsUntil('.menu').siblings('.menu-block').show();
		$(this).parentsUntil('.menu').siblings('.search').show();
		$(this).parentsUntil('.menu').hide();
	});
	
	// Click on preview images in product
	$('.item-full .images .img, .item .images .img').click(function(){
		if ($(this).parent().hasClass('images')) {
			if ($(this).parent().parent().hasClass('content')) {
				$(this).parent().parent().prev().children('.img').children('img').attr('src', $(this).children('img').attr('src'));
				$(this).parent().children('.img').children('.active').removeClass('active');
				$(this).children('.fill').addClass('active');
			}
			else {
				if ($(this).parent().hasClass('visible-xs-block')) {
					$(this).parent().prev().children('.img').children().attr('src', $(this).children('img').attr('src'));
					$(this).parent().children('.img').children('.active').removeClass('active');
					$(this).children('.fill').addClass('active');
				}
				else {
					$(this).parent().next().children('.img').children().attr('src', $(this).children('img').attr('src'));
					$(this).parent().children('.img').children('.active').removeClass('active');
					$(this).children('.fill').addClass('active');
				}
			}
		}
		else {
			$(this).parent().parent().prev().children('.img').children().attr('src', $(this).attr('src'));
		}
	});
	
	// Resize preview image fill in product
	resizePreviewImgFill();
	function resizePreviewImgFill(){
		if ($('.item-full .images.visible-xs-block').length <= 0)
			return;
		if ($('.item-full .images.visible-xs-block').css('display') == 'block') {
			$('.item-full .images.visible-xs-block .fill').each(function(){
				$(this).width($(this).next('img').width());
			});
		}
	}
	
	// Slider
	$('.slider').bxSlider({
		controls: false
	});
	
	// Spinner
	spinner();
	
	// Checkbox
	$('input[type = "checkbox"]').iCheck({
		handle: 'checkbox'
	});
	
	// Top menu
	var manuConstructed = false;
	$('.menu .sub').click(function(){
		var thisIndex = $(this).index();
		$(this).siblings().each(function(){
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('.sub-menu-main .sub-menu-item:eq(' + $(this).index() + ')').hide();
			}
		});
		
		// Close menu
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.sub-menu-main').animate({
				opacity: 0
			}, 500, function(){
				$('.sub-menu-main').hide();
				$('.sub-menu-main .sub-menu-item:eq(' + thisIndex + ')').hide();
			});
		}
		// Open menu
		else {
			$(this).addClass('active');
			$('.sub-menu-main').show();
			$('.sub-menu-main').animate({
				opacity: 1
			}, 500);
			$('.sub-menu-main .sub-menu-item:eq(' + thisIndex + ')').show();
			$('.sub-menu-main .triangle').offset({left: $(this).offset().left + $(this).width() / 2 - 40});
			$('.sub-menu-main .gallery .fill').each(function(){
				$(this).height($(this).next().height());
			});
			
			if (!manuConstructed) {
				// Construct menu
				$('.sub-menu-main .border-container > ul > li > ul').each(function(){
					$(this).prepend('<li class="go-back"></li>');
					$(this).children('.go-back').click(function(){
						var parent = $(this).parent();
						$(this).parentsUntil('.border-container').last().animate({'left': '0px'}, 200, function() {
							parent.hide();
						});
					});
					$(this).parent().addClass('hasChild');
					$(this).css('left', $(this).parentsUntil('.border-container').last().innerWidth() +  'px');
					$(this).prev().click(function(){
						$(this).parent().parent().animate({'left': -$(this).parent().width() + 'px'}, 200);
						$(this).next().show();
					});
				});
			}
			// Align elements height
			$('.sub-menu-main .sub-menu-item:eq(' + thisIndex + ') .border-container').each(function(){
				$(this).height($(this).parent().height() - $(this).siblings('.all-category').innerHeight() - 35);
			});
			manuConstructed = true;
		}
	});
	
	// Animated services
	$('.services a').each(function(){
		$(this).css({opacity: 0});
	});
	$(document).scroll(function(){
		if (($(document).scrollTop() + $(window).height()) > $('.services').offset().top && $('.services').children(':first').css('opacity') < 0.1) {
			$('.services a').each(function(){
				$(this).animate({
					opacity: 1
				}, 2000);
			});
		}
	});
	$('.offers div').each(function(){
		$(this).css({opacity: 0});
	});
	$(document).scroll(function(){
		opacityChange();
	});
	opacityChange();
	function opacityChange(){
		if ($('.offers').length == 0) {
			return;
		}		
		if (($(document).scrollTop() + $(window).height()) > $('.offers').offset().top && $('.offers').children(':first').css('opacity') < 0.1) {
			$('.offers div').each(function(){
				$(this).animate({
					opacity: 1
				}, 800 * ($(this).index() + 1));
			});
		}
	}
	
	// Price slider
	if ($('#slider-range').length > 0) {
		var sliderAmount = $('#slider-amount');
		var sliderRange = $('#slider-range');
		sliderRange.slider({
		  range: true,
		  min: 0,
		  max: 3500,
		  values: [ 75, 3500 ],
		  slide: function( event, ui ) {
			sliderAmount.children().children('.min').val('$' + ui.values[ 0 ]);
			sliderAmount.children().children('.max').val('$' + ui.values[ 1 ]);
		  }
		});
		sliderAmount.children().children('.min').val('$' + sliderRange.slider('values', 0 ));
		sliderAmount.children().children('.max').val('$' + sliderRange.slider('values', 1 ));
		sliderAmount.children().children('.min').change(function(){
			if ($(this).val().charAt(0) != '$')
				$(this).val('$' + $(this).val());
			sliderRange.slider('values', 0, $(this).val().slice(1, $(this).val().lenght));
		});
		sliderAmount.children().children('.max').change(function(){
			if ($(this).val().charAt(0) != '$')
				$(this).val('$' + $(this).val());
			sliderRange.slider('values', 1, $(this).val().slice(1, $(this).val().lenght));
		});
		
		// Only numeric input
		sliderAmount.children().children().keydown(function(e){
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				(e.keyCode == 65 && e.ctrlKey === true) || 
				(e.keyCode >= 35 && e.keyCode <= 40)) {
					 return;
			}
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
	}
});

// All images loaded
$(window).load(function() {
	// Resize item container
	resizeItem();
});

// Resize item container
function resizeItem(){
	$('.item').each(function(){
		var thisPrice = $(this).children().children('.content').children('.price:last');
		$(this).height(thisPrice.position().top + thisPrice.height() - 10);
	});
}
// Top menu resize
function topMenuResize(){
	$('.sub-menu-main .border-container > ul > li > ul').each(function(){
		$(this).css('left', $(this).parentsUntil('.border-container').last().innerWidth() +  'px');
	});
	if ($('.menu .sub.active').length == 0) {
		return;
	}
	$('.sub-menu-main .triangle').offset({left: $('.menu .sub.active').offset().left + $('.menu .sub.active').width() / 2});
}

// Spinner
function spinner(){
	var spinner = $('.shopping-cart .spinner');
	spinner.after('<span class="btn plus"></span><span class="btn minus"></span>');
	$('.shopping-cart .form-group .btn').on('click', function() {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();

		if ($button.hasClass('plus')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
		// Don't allow decrementing below zero
		if (oldValue > 0) {
			var newVal = parseFloat(oldValue) - 1;
		} else {
			newVal = 0;
		}
	}
	  $button.parent().find('input').val(newVal);
	});
	
	// Only numeric input
	spinner.keydown(function(e){
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			(e.keyCode == 65 && e.ctrlKey === true) || 
			(e.keyCode >= 35 && e.keyCode <= 40)) {
				 return;
		}
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
}