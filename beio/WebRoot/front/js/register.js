/**
 * 注册
 */
$(function() {
	$('#td').append(base.btmHtml);
	$('.btn-register').click(function(){
		var flag = true;
		if (new RegExp(regex('mobile')).test($('#reg_mobile').val()) == false) {
			$('#reg_mobile_s').html('<i class="i-def"></i>' + tip('121'));
			$('#reg_mobile_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('#reg_mobile').val()) == false) {
			$('#reg_mobile_s').html('<i class="i-def"></i>' + tip('120'));
			$('#reg_mobile_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('password')).test($('#reg_pwd').val()) == false) {
			$('#reg_pwd_s').html('<i class="i-def"></i>' + tip('123'));
			$('#reg_pwd_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('#reg_pwd').val()) == false) {
			$('#reg_pwd_s').html('<i class="i-def"></i>' + tip('122'));
			$('#reg_pwd_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('#reg_equal_pwd').val()) == false || 
				$('#reg_equal_pwd').val() != $('#reg_pwd').val()) {
			$('#reg_equal_pwd_s').html('<i class="i-def"></i>' + tip('129'));
			$('#reg_equal_pwd_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('email')).test($('#reg_email').val()) == false) {
			$('#reg_email_s').html('<i class="i-def"></i>' + tip('132'));
			$('#reg_email_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('#reg_email').val()) == false) {
			$('#reg_email_s').html('<i class="i-def"></i>' + tip('131'));
			$('#reg_email_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('#reg_mobile_code').val()) == false) {
			$('#reg_mobile_code_s').html('<i class="i-def"></i>' + tip('126'));
			$('#reg_mobile_code_s').removeClass('hide');
			flag = false;
		}
		if($('#reg_agree').attr('checked') != 'checked'){
			$('#reg_agree_s').html('<i class="i-def"></i>' + tip('130'));
			$('#reg_agree_s').removeClass('hide');
			flag = false;
		}
		if (flag == true) {
			$.ajax({
				url : '/beio/sys/register',
				data : {
					'mr.mobile' : $('#reg_mobile').val(), 
					'mr.password' : $('#reg_pwd').val(), 
					'mr.email' : $('#reg_email').val(), 
					'mr.smsVerifyCode' : $('#reg_mobile_code').val()
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					if (data.status == '200') {
						alert(tip('201'));
						window.location.href = 'login.html';
					}else if (data.status == '120' || data.status == '121' || data.status == '191') {
						$('#reg_mobile_s').html('<i class="i-def"></i>' + tip(data.status));
						$('#reg_mobile_s').removeClass('hide');
					}else if (data.status == '122' || data.status == '123') {
						$('#reg_pwd_s').html('<i class="i-def"></i>' + tip(data.status));
						$('#reg_pwd_s').removeClass('hide');
					}else if (data.status == '131' || data.status == '132') {
						$('#reg_email_s').html('<i class="i-def"></i>' + tip(data.status));
						$('#reg_email_s').removeClass('hide');
					}else if (data.status == '124' || data.status == '125') {
						$('#reg_verify_code_s').html('<i class="i-def"></i>' + tip(data.status));
						$('#reg_verify_code_s').removeClass('hide');
					}else if (data.status == '126' || data.status == '127') {
						$('#reg_mobile_code_s').removeClass('sucMsg').removeClass('errMsg');
						$('#reg_mobile_code_s').addClass('errMsg');
						$('#reg_mobile_code_s').html('<i class="i-def"></i>' + tip(data.status));
						$('#reg_mobile_code_s').removeClass('hide');
					}else if (data.status == '100') {
						alert(tip(data.status));
					}else {
						alert(tip('400'));
					}
				},
				error : function() {
					alert(tip('500'));
				}
			});
		}
	});
	$('.field').focus(function() {
		$('#' + $(this).attr('id') + '_s').addClass('hide');
	});
	$('#reg_agree').click(function(){
		if($('#reg_agree').attr('checked') == 'checked'){
			$('#' + $(this).attr('id') + '_s').addClass('hide');
		}
	});
	$('.btn-phonecode').click(function(){
		$.ajax({
			url : '/beio/sys/sendSmsVerifyCode',
			data : {'mr.mobile' : $('#reg_mobile').val(), 'mr.exist' : '0'},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$('#reg_mobile_code_s').removeClass('errMsg');
					$('#reg_mobile_code_s').addClass('sucMsg');
					$('#reg_mobile_code_s').html('<i class="i-def"></i>' + tip('202'));
					$('#reg_mobile_code_s').removeClass('hide');
				}else if (data.status == '121' || data.status == '190' || data.status == '191' || 
						data.status == '192' || data.status == '193') {
					$('#reg_mobile_s').html('<i class="i-def"></i>' + tip(data.status));
					$('#reg_mobile_s').removeClass('hide');
				}else if (data.status == '128'){
					$('#reg_mobile_code_s').removeClass('sucMsg');
					$('#reg_mobile_code_s').addClass('errMsg');
					$('#reg_mobile_code_s').html('<i class="i-def"></i>' + tip(data.status));
					$('#reg_mobile_code_s').removeClass('hide');
				}else {
					alert(tip('400'));
				}
			},
			error : function() {
				alert(tip('500'));
			}
		});
	});
});