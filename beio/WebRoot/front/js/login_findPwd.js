$(function(){
//	$('').(function(){});
	// 填写手机号模块 提交
	$('#login_findPwd_btn1').click(function(){
		// 提交请求到服务器 验证手机号
		// 通过验证后展示验证身份模块
		$('#l_fp_t_1').attr('class', 'first done');
		$('#l_fp_t_2').addClass('doing');
		$("#l_fp_b_1").addClass('hide');	
		$("#l_fp_b_2").removeClass('hide');	
	});
	// 验证身份模块 提交
	$('#login_findPwd_btn2').click(function(){
		// 提交请求到服务器 验证手机号验证码
		// 通过验证后 展示输入新密码页
		$('#l_fp_t_2').attr('class', 'done');
		$('#l_fp_t_3').addClass('doing');
		$("#l_fp_b_2").addClass('hide');	
		$("#l_fp_b_3").removeClass('hide');	
	});
	
	// 新密码模块 提交
	$('#login_findPwd_btn3').click(function(){
		// 提交请求到服务器 验证手机号验证码
		// 通过验证后 展示输入新密码页
		$('#l_fp_t_3').attr('class', 'done');
		$('#l_fp_t_4').addClass('last doing');
		$("#l_fp_b_3").addClass('hide');	
		$("#l_fp_b_4").removeClass('hide');	
	});
});