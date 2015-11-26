/*
** jQuery Controller
** triadiprabowo.xyz
** Developed by Triadi Prabowo
*/

// Init function
tpBackTop();

$('#btn-submit-contact').click(function() {
	var email = $('#f_email').val();
	var fullname = $('#f_fullname').val();
	var msgbody = $('#f_msgbody').val();
	var email_pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;

	if(email != '' && fullname != '' && msgbody != '') {
		if(!email_pattern.test(email)) {
			console.error('Error F01: Bad Email Format')
		}
		else {
			$.ajax({
				url: './api/email/post',
				method: 'POST',
				data: {
					email: email,
					full_name: fullname,
					body: msgbody
				},
				success: function(data) {
					$('#f_email').val('');
					$('#f_fullname').val('');
					$('#f_msgbody').val('');

					alert(data.message);
				},
				error: function(data) {
					// DO NOTHING
				}
			});
		}
	}
});

function tpBackTop() {
	$(document).ready(function() {
		if($('#tp-backtop').length == 0) {
			var content = '<div id=tp-backtop class=hvr-pulse>&#9650;</div>';
			$('body').append(content);
			$('#tp-backtop').hide();
		}

		$('#tp-backtop').click(function() {
			$('html, body').animate({
	        	scrollTop: $('body').offset().top
	    	}, 800);
		});
	});
	$(window).scroll(function() {
		$this = $(this);
		
		if($this.scrollTop() > 200) {
			$('#tp-backtop').show("slide", {
				direction: "up"
			}, 200);
		}	

		else if($this.scrollTop() < 200) {
			$('#tp-backtop').hide("slide", {
				direction: "down"
			}, 100);
		}
	});
}

/* Mobile Menu Toggle Clicked */
$('.m-menu-toggle').click(function(e) {
	$('.m-head-nav').slideToggle(250);
	$('.m-menu-toggle').hide();
	e.stopPropagation();
});

$(document).click(function() {
	if($('.m-menu-toggle').is(':hidden')) {
		$('.m-head-nav').slideToggle(250);
		$('.m-menu-toggle').show();
	}
});

$(document).ready(function() {
	$.ajax({
		url: './api/github/me/repos',
		method: 'GET',		
		success: function(data) {
			var returnedData = [];

			for(var i=0; i < data.length; i++) {
				if(data[i].owner.login != 'buzzteam') {					
					$('#repos-list').append('<li>'+data[i].name+'</li>');
				}				
			}
		},
		error: function(data) {
			// DO NOTHING
		}
	});
});