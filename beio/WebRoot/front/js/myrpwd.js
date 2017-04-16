$(function(){
	initHtml();
	autologin(function(member){
		$.ajax({
			url : '/beio/sys/findPwdMyCenter',
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				$('#find_mobile_s').addClass('hide');
				$('#find_code_s').addClass('hide');
				if (data.status == '200') {
					$('#l_fp_t_1').attr('class', 'first done');
					$('#l_fp_t_2').addClass('doing');
					$('#l_fp_b_1').addClass('hide');	
					$('#l_fp_b_2').removeClass('hide');
					$('#find_mobile').val(data.result.mobile);
					$('#valid_mobile').html(data.result.mobile);
				}else if (data.status == '120' || data.status == '121' || data.status == '190') {
					$('#find_mobile_s').html('<i class="i-def"></i>' + tip(data.status));
					$('#find_mobile_s').removeClass('hide');
				}else if (data.status == '124' || data.status == '125') {
					$('#find_code_s').html('<i class="i-def"></i>' + tip(data.status));
					$('#find_code_s').removeClass('hide');
				}else {
					alert(tip('400'));
				}
			},
			error : function() {
				alert(tip('500'));
			}
		});
	});
	// 验证身份模块 提交
	$('#login_findPwd_btn2').click(function(){
		$('#valid_code_s').removeClass('sucMsg').removeClass('errMsg');
		$('#valid_code_s').addClass('errMsg');
		var flag = true;
		if (new RegExp(regex('empty')).test($('#valid_code').val()) == false) {
			$('#valid_code_s').removeClass('hide');
			$('#valid_code_s').html('<i class="i-def"></i>' + tip('126'));
			flag = false;
		}
		if (flag == true) {
			$.ajax({
				url : '/beio/sys/findPwdValidIdentity',
				data : {
					'mr.mobile' : $('#find_mobile').val(), 
					'mr.smsVerifyCode' : $('#valid_code').val()
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					$('#valid_code_s').addClass('hide');
					if (data.status == '200') {
						$('#l_fp_t_2').attr('class', 'done');
						$('#l_fp_t_3').addClass('doing');
						$("#l_fp_b_2").addClass('hide');	
						$("#l_fp_b_3").removeClass('hide');	
					}else if (data.status == '171') {
						alert(tip(data.status));
					}else if (data.status == '126' || data.status == '127') {
						$('#valid_code_s').html('<i class="i-def"></i>' + tip(data.status));
						$('#valid_code_s').removeClass('hide');
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
	// 新密码模块 提交
	$('#login_findPwd_btn3').click(function(){
		var flag = true;
		if (new RegExp(regex('password')).test($('#set_pwd').val()) == false) {
			$('#set_pwd_s').removeClass('hide');
			$('#set_pwd_s').html('<i class="i-def"></i>' + tip('123'));
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('#set_pwd').val()) == false) {
			$('#set_pwd_s').removeClass('hide');
			$('#set_pwd_s').html('<i class="i-def"></i>' + tip('122'));
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('#set_equal_pwd').val()) == false || 
				$('#set_equal_pwd').val() != $('#set_pwd').val()) {
			$('#set_equal_pwd_s').html('<i class="i-def"></i>' + tip('129'));
			$('#set_equal_pwd_s').removeClass('hide');
			flag = false;
		}
		if (flag == true) {
			$.ajax({
				url : '/beio/sys/findPwdResetPwd',
				data : {
					'mr.password' : $('#set_pwd').val()
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					$('#valid_code_s').addClass('hide');
					if (data.status == '200') {
						$('#l_fp_t_3').attr('class', 'done');
						$('#l_fp_t_4').addClass('last doing');
						$("#l_fp_b_3").addClass('hide');	
						$("#l_fp_b_4").removeClass('hide');	
					}else if (data.status == '100' || data.status == '171') {
						alert(tip(data.status));
					}else if (data.status == '122' || data.status == '123') {
						$('#set_pwd_s').html('<i class="i-def"></i>' + tip(data.status));
						$('#set_pwd_s').removeClass('hide');
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
	$('.itxt').focus(function() {
		$('#' + $(this).attr('id') + '_s').addClass('hide');
	});
	$('.ftx-05').click(function(){
		$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr='+new Date().getTime());
	});
	$('#mobileCode').click(function(){
		$.ajax({
			url : '/beio/sys/sendSmsVerifyCode',
			data : {'mr.mobile' : $('#find_mobile').val(), 'mr.exist' : '1'},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$('#valid_code_s').removeClass('errMsg');
					$('#valid_code_s').addClass('sucMsg');
					$('#valid_code_s').html('<i class="i-def"></i>' + tip('202'));
					$('#valid_code_s').removeClass('hide');
				}else if (data.status == '121' || data.status == '190' || data.status == '191' || 
						data.status == '192' || data.status == '193') {
					alert(tip(data.status));
				}else if (data.status == '128'){
					$('#valid_code_s').removeClass('sucMsg');
					$('#valid_code_s').addClass('errMsg');
					$('#valid_code_s').html('<i class="i-def"></i>' + tip(data.status));
					$('#valid_code_s').removeClass('hide');
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