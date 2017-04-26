/**
 * 登录
 */
$(function(){
	$('#td').append(base.btmHtml);
	// 换验证码
	$('.changeCode,.verify-code').click(function(){
		$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr'+new Date().getTime());
	});
	// 自动登录
	$('#autoLogin').click(function(){
		if($('#autoLogin').attr('checked') == 'checked'){
			$('.msg-warn').removeClass('hide');
			$('.msg-warn').html('<b></b>公共场所不建议自动登录，以防账号丢失');
		}else{
			$('.msg-warn').addClass('hide');
			$('.msg-warn').html('');
		}
	});
	// 提交登录
	$('#loginsubmit').click(function(){
		$('.msg-error').addClass('hide');
		if (new RegExp(regex('empty')).test($('#login_mobile').val()) == false) {
			$('.msg-error').removeClass('hide');
			$('.msg-error').html('<b></b>' + tip('120'));
			return false;
		}
		if (new RegExp(regex('empty')).test($('#login_pwd').val()) == false) {
			$('.msg-error').removeClass('hide');
			$('.msg-error').html('<b></b>' + tip('122'));
			return false;
		}
		if (new RegExp(regex('empty')).test($('#login_code').val()) == false) {
			$('.msg-error').removeClass('hide');
			$('.msg-error').html('<b></b>' + tip('124'));
			return false;
		}
		$.ajax({
			url : '/beio/sys/login',
			data : {
				'mr.mobile' : $('#login_mobile').val(), 
				'mr.password' : $('#login_pwd').val(), 
				'mr.imgVerifyCode' : $('#login_code').val(), 
			},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					if($('#autoLogin').attr('checked') == 'checked'){
						localStorage.setItem('mobile', data.result.mobile);
						localStorage.setItem('password', data.result.password);
					}
					window.location.href = 'index.html';
				} else if (data.status == '120' || data.status == '122' || data.status == '124' || 
						data.status == '125' || data.status == '195' || data.status == '192' || data.status == '193') {
					$('.msg-error').removeClass('hide');
					$('.msg-error').html('<b></b>' + tip(data.status));
				} else {
					alert(tip('400'));
				};
			},
			error : function() {
				alert(tip('500'));
			}
		});
	});
});
