$(function(){
	// 换验证码
	$('.changeCode,.verify-code').click(function(){
		$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr'+new Date().getTime());
	});
	// 点击登录
	$('#login').click(function(){login();});
	
	// 回车登录
	$(document).keydown(function(event){
		if(event.keyCode==13){
			$('#login').click();
		}
	}); 
});

/**
 * 登录
 * @returns {Boolean}
 */
function login(){
	
	if (new RegExp(regex('empty')).test($('#userLogin_username').val()) == false) {
		$.messager.alert('提示信息', '帐号不能为空');
		return false;
	}
	if (new RegExp(regex('empty')).test($('#userLogin_password').val()) == false) {
		$.messager.alert('提示信息', '密码不能为空');
		return false;
	}
	$.ajax({
		url : '/beio/sys/userLogin',
		data : {
			'user.username' : $('#userLogin_username').val(), 
			'user.password' : $('#userLogin_password').val(),
			'user.imgVerifyCode' : $('#userLogin_code').val()
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				window.location.href = 'main.html';
			} else if (data.status == '120') {
				$.messager.alert('提示信息', '帐号不能为空');
				$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr'+new Date().getTime());
			} else if (data.status == '122' || data.status == '124' || 
					data.status == '125' || data.status == '195' || data.status == '192' || data.status == '193') {
				$.messager.alert('提示信息', tip(data.status));
				$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr'+new Date().getTime());
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
}