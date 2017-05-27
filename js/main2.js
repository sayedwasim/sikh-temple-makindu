$(document).ready(function($){	

	

	$('a[href*=#]:not([href=#])').bind('touchstart click', function() {

		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

			var target = $(this.hash);

			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

			if (target.length) {

				

				$('html,body').animate({

					 scrollTop: target.offset().top - 70

					}, 1000);

				 				

				return false;

			}

		}

	});

	

	/*--- HOME: Latest Events ---*/

	if ($('#latest_events_list').length){

		$('#latest_events_list').owlCarousel({

			lazyLoad:true,

			nav:true,

			navText:['',''],

			dots:false,

			slideBy:3,

			margin:45

		});

	}

	

	/*--- HOME: Latest Photos ---*/

	if($(window).width() > 320){

		if ($('#photos').length){

			new AnimOnScroll( document.getElementById('photos'), {

				minDuration : 0.4,

				maxDuration : 0.7,

				viewportFactor : 0.2

			});

		}

	}

	

	$(".fancybox").fancybox({

		openEffect	: 'elastic',

		closeEffect	: 'elastic',

		helpers: {

			overlay: {

				locked: false

			}

		}

	});

	

	/*--- GALLERY ---*/

	if ($('#album_list').length){

		$('#album_list').owlCarousel({

			lazyLoad:true,

			nav:true,

			navText:['',''],

			dots:false,

			items:4,

			slideBy:4,

			autoWidth:true,

			margin:11

		});

	};

	

	/*--- FLOATED MENU ---*/

	var menu_offset = 400;

	$floated_menu = $('.main-menu.floated');

	$initial_menu = $('.main-menu.initial');

	

	$(window).scroll(function(){

		($(this).scrollTop() > menu_offset ) ? $initial_menu.addClass('is-hidden') : $initial_menu.removeClass('is-hidden');

		($(this).scrollTop() > menu_offset ) ? $floated_menu.addClass('is-visible') : $floated_menu.removeClass('is-visible');

	});

	

	/*--- BACK TO TOP ---*/

	var offset = 300,

	scroll_top_duration = 700,

	$back_to_top = $('.back-to-top');



	$(window).scroll(function(){

		($(this).scrollTop() > offset ) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible');

	});



	$back_to_top.on('click', function(event){

		event.preventDefault();

		$('body,html').animate({

			scrollTop: 0 ,

		 	}, scroll_top_duration

		);

	});


	/*----- Contact Us -----*/

	$(".input-wrapper").click(function(e) {

    $(this).find(".input").focus();

  });

	

	if( $('.floating-labels').length > 0 ) floatLabels();



	function floatLabels() {

		var inputFields = $('.floating-labels .input');

		inputFields.each(function(){

			var singleInput = $(this);

			//check if user is filling one of the form fields 

			checkVal(singleInput);

			singleInput.on('change keyup', function(){

				checkVal(singleInput);	

			});

		});

	}



	function checkVal(inputField) {

		( inputField.val() == '' ) ? inputField.closest(".input-container").find('label').removeClass('float') : inputField.closest(".input-container").find('label').addClass('float');

	}

	

	$(".btn-contact-submit").click(function(e) {

		e.preventDefault();

  });

	

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	

	$("#fullname").blur(function(e) {

		if(!$.trim($(this).val())) {

			$(this).addClass("error");

    }

		else{

			$(this).removeClass("error");

		}

  });

	

	$("#email").blur(function(e) {

		if(!$.trim($(this).val())) {

			$(this).addClass("error");

    }

		else{

			$(this).removeClass("error");

		}

		if(reg.test($.trim($(this).val())) == false) {

			$(this).addClass("error");

		}

		else{

			$(this).removeClass("error");

		}

  });

	

	$("#message").blur(function(e) {

		if(!$.trim($(this).val())) {

			$(this).addClass("error");

    }

		else{

			$(this).removeClass("error");

		}

  });

	

	

});



/*--- Form submission ---*/

function submit_form()

{

	//Variable declaration and assignment

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	var fullname = $.trim($("#fullname").val());

	var email =  $.trim($("#email").val());

	var message =  $.trim($("#message").val());

	var target = $("#response_brought");

	var $btn= $(".btn-contact-submit");

	

	if( fullname == "" ) //Validation against empty field for fullname

	{

		$("#response_brought").html('<div class="msg-info">Your name is required.</div>');

		$("#contact_form input").removeClass("error");

		$("#fullname").addClass("error");

		$('html,body').animate({

			scrollTop: target.offset().top - 120

		}, 1000);

	}

	else if( email == "" ) //Validation against empty field for email address

	{

		$("#response_brought").html('<div class="msg-info">E-mail address is required.</div>');

		$("#contact_form input").removeClass("error");

		$("#email").addClass("error");

		$('html,body').animate({

			scrollTop: target.offset().top - 120

		}, 1000);

	}

	else if(reg.test(email) == false) //Validation for working email address

	{

		$("#response_brought").html('<div class="msg-info">Invalid e-mail address.</div>');

		$("#contact_form input").removeClass("error");

		$("#email").addClass("error");

		$('html,body').animate({

			scrollTop: target.offset().top - 120

		}, 1000);

	}

	else if( message == "" ) //Validation against empty field for email message

	{

		$("#response_brought").html('<div class="msg-info">Your message is required.</div>');

		$("#contact_form input").removeClass("error");

		$("#message").addClass("error");

		$('html,body').animate({

			scrollTop: target.offset().top - 120

		}, 1000);

	}

	else

	{

		$("#submitted").val(1);

		var dataString = $("#contact_form").serialize();

		$.ajax({  

			type: "POST",  

			url: BASE_URL + "/contact_form.php",  

			data: dataString,

			beforeSend: function() 

			{

				//Disable button click and show progress

				$btn.removeAttr('onClick').html("<span>Sending...</span>");

				

			},  

			success: function(response)

			{

				//Check to see if the message is sent or not

				var response_brought = response.indexOf('Thank');

				if( response_brought != -1 )

				{

					// Enable the button

					$btn.attr('onClick','submit_form()').html("<span>Send Message</span>");

					

					//Clear all form fields on success

					$("#fullname").val('').removeClass("error");

					$("#email").val('').removeClass("error");

					$("#message").val('').removeClass("error");

					$(".field label").removeClass("float");

					

					grecaptcha.reset();					

					//Display success message if the message is sent

					$("#response_brought").html(response);

					$('html,body').animate({

						scrollTop: target.offset().top - 120

					}, 1000);

					

					//Remove the success message also after a while of displaying the message to the user

					setTimeout(function() {

						$("#response_brought").html('');

						$('html,body').animate({

							scrollTop: 0

						}, 1000);

					},10000);					

					

				}  

				else  

				{

					// Enable the button

					$btn.attr('onClick','submit_form()').html("<span>Send Message</span>");

					

					grecaptcha.reset();

					//Display error message if the message is not sent

					$("#response_brought").html(response);

					$('html,body').animate({

						scrollTop: target.offset().top - 120

					}, 1000);

					

				}

			}

		});

	}



}



$(window).load(function() {

	$("#loader-wrapper").fadeOut();

	$("body").addClass("loaded");

	$(".banner-content .logo").addClass("fadeIn");

	$(".banner-content h1").addClass("fadeInUp");

});