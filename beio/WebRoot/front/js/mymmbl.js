$(function(){
	init(function(member){
		$('#bd').append('\
			<div class="home_nav">\
				<div class="my_left">\
					<div class="my_menu">\
						<h3 class="my_menu_title" >\
							<a id="J_myhomeBtn"  href="javascript:void(0);">个人中心</a>\
						</h3>\
						<dl>\
							<dt>个人中心</dt>\
							<dd><a class="j-menuItem " href="myinfo.html">个人信息</a></dd>\
							<dd><a class="j-menuItem " href="myrfee.html">会员续费</a></dd>\
							<dd><a class="j-menuItem " href="myrpwd.html">重置密码</a></dd>\
							<dd><a class="j-menuItem on" href="javascript:void(0);">修改手机</a></dd>\
							<dd><a class="j-menuItem " href="myaddr.html">收货地址</a></dd>\
							<dt>我的交易</dt>\
							<dd><a class="j-menuItem " href="myorder.html">我的订单</a></dd>\
							<dt>关于我们</dt>\
							<dd><a class="j-menuItem " href="myabout.html">关于我们</a></dd>\
						</dl>\
					</div>\
				</div>\
				<div class="my_main">\
					<div class="mod-main mod-comm">\
						<div class="mt">\
							<h1>修改手机</h1>\
						</div>\
						<div class="mc">\
						<div id="sflex03" class="stepflex">\
							<dl id="l_fp_t_2" class="normal">\
							    <dt class="s-num">2</dt>\
							    <dd class="s-text">验证手机号<s></s><b></b></dd>\
							</dl>\
							<dl id="l_fp_t_3" class="normal">\
							    <dt class="s-num">3</dt>\
							    <dd class="s-text">更换手机号<s></s><b></b></dd>\
							</dl>\
							<dl id="l_fp_t_4" class="last">\
							    <dt class="s-num">&nbsp;</dt>\
							    <dd class="s-text">完成<s></s><b></b></dd>\
							</dl>\
						</div>\
			                <div id="l_fp_b_1" class="formpwd formno" style="width: 65%;margin-left: 30%;">\
			                    <div class="item">\
			                        <span class="label">账户名：</span>\
			                        <div class="fl">\
			                            <input type="text" id="find_mobile" class="itxt" maxlength="11" placeholder="已注册手机号" />\
			                            <div class="clr"></div>\
			                            <div class="input-tip" style="height: 18px;">\
			                    			<span id="find_mobile_s" class="errMsg"></span>\
			                    		</div>\
			                        </div>\
			                        <div class="clr"></div>\
			                    </div>\
			                    <div class="item">\
			                    	<span class="label">验证码：</span>\
			                    	<div class="fl">\
			                    		<div style="float: left; height: 100%;"><input type="text" id="find_code" class="itxt" maxlength="4" placeholder="请输入验证码" /></div>\
			                    		<div style="float: left; height: 100%;"><img class="verify-code" style="margin-left:5px;cursor:pointer;width:100px;height:36px;" alt="验证码" src="/beio/image/verifyCode"/></div>\
			                    		<div style="float: left; height: 100%;"><span style="margin-left:5px;line-height:36px;">看不清？<a class="ftx-05" href="javascript:void(0);">换一张</a></span></div>\
			                    		<div class="clr"></div>\
			                    		<div class="input-tip" style="height: 18px;">\
			                    			<span id="find_code_s" class="errMsg"></span>\
			                    		</div>\
			                    	</div>\
			                    	<div class="clr"></div>\
			                    </div>\
			                    <div class="item">\
			                        <span class="label">&nbsp;</span>\
			                        <div class="fl">\
			                            <a href="javascript:void(0);" class="btn-5" id="login_findPwd_btn1">提交</a>\
			                        </div>\
			                        <div class="clr"></div>\
			                    </div>\
			                </div>\
							<div id="l_fp_b_2" class="formpwd formno hide" style="width: 65%;margin-left: 30%;">\
								<div class="item">\
									<span class="label">验证手机号：</span>\
									<div class="fl">\
										<strong id="valid_mobile" class="ftx-un"></strong>\
										<div class="clr"></div>\
									</div>\
									<div class="clr"></div>\
								</div>\
								<div class="item">\
									<span class="label">手机校验码：</span>\
									<div class="fl">\
										<input type="text" id="valid_code" class="itxt" maxlength="6" placeholder="请输入手机验证码"/>\
										<a href="javascript:void(0);" id="valid_mobile_code" class="btn btn-10 ml10" style="width:90px;text-align:center;">获取短信校验码</a>\
										<div class="clr"></div>\
										<div class="input-tip" style="height: 18px;">\
			                    			<span id="valid_code_s" class="errMsg"></span>\
			                    		</div>\
									</div>\
									<div class="clr"></div>\
								</div>\
			                    <div class="item">\
			                        <span class="label">&nbsp;</span>\
			                        <div class="fl">\
			                            <a href="javascript:void(0);" class="btn-5" id="login_findPwd_btn2">提交</a>\
			                        </div>\
			                        <div class="clr"></div>\
			                    </div>\
			                </div>\
							<div id="l_fp_b_3" class="formpwd formno hide" style="width: 65%;margin-left: 30%;">\
			                    <div class="item">\
			                    	<span class="label">新手机号码：</span>\
			                        <div class="fl">\
			                            <input type="text" id="set_mobile" class="itxt" maxlength="11" placeholder="新手机号码" />\
			                            <div class="clr"></div>\
			                            <div class="input-tip" style="height: 18px;">\
			                    			<span id="set_mobile_s" class="errMsg"></span>\
			                    		</div>\
			                        </div>\
			                        <div class="clr"></div>\
			                    </div>\
			                    <div class="item">\
									<span class="label">手机校验码：</span>\
									<div class="fl">\
										<input type="text" id="set_code" class="itxt" maxlength="6" placeholder="请输入手机验证码"/>\
										<a href="javascript:void(0);" id="set_mobile_code" class="btn btn-10 ml10" style="width:90px;text-align:center;">获取短信校验码</a>\
										<div class="clr"></div>\
										<div class="input-tip" style="height: 18px;">\
			                    			<span id="set_code_s" class="errMsg"></span>\
			                    		</div>\
									</div>\
									<div class="clr"></div>\
								</div>\
			                    <div class="item">\
			                        <span class="label">&nbsp;</span>\
			                        <div class="fl">\
			                            <a href="javascript:void(0);" class="btn-5" id="login_findPwd_btn3">提交</a>\
			                        </div>\
			                        <div class="clr"></div>\
			                    </div>\
			                </div>\
			                <div id="l_fp_b_4" class="formpwd formno hide" style="width: 65%;margin-left: 30%;">\
			                	<s class="icon-succ02 m-icon"></s>\
			                    <div class="fore">\
			                        <h3 class="ftx-02">手机号换绑成功！</h3>\
			                    </div>\
			                </div>\
			            </div>\
					</div>\
				</div>\
			</div>');
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
		// 验证身份
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
		// 修改手机号
		$('#login_findPwd_btn3').click(function(){
			$('#set_code_s').removeClass('sucMsg').removeClass('errMsg');
			$('#set_code_s').addClass('errMsg');
			var flag = true;
			if (new RegExp(regex('mobile')).test($('#set_mobile').val()) == false) {
				$('#set_mobile_s').removeClass('hide');
				$('#set_mobile_s').html('<i class="i-def"></i>' + tip('121'));
				flag = false;
			}
			if (new RegExp(regex('empty')).test($('#set_mobile').val()) == false) {
				$('#set_mobile_s').removeClass('hide');
				$('#set_mobile_s').html('<i class="i-def"></i>' + tip('120'));
				flag = false;
			}
			if (new RegExp(regex('empty')).test($('#set_code').val()) == false) {
				$('#set_code_s').removeClass('hide');
				$('#set_code_s').html('<i class="i-def"></i>' + tip('124'));
				flag = false;
			}
			if (flag == true) {
				$.ajax({
					url : '/beio/sys/changeMblMyCenter',
					data : {
						'mr.mobile' : $('#set_mobile').val(), 
						'mr.smsVerifyCode' : $('#set_code').val()
					},
					type : 'POST',
					async : false,
					cache : true,
					dataType : 'json',
					success : function(data) {
						$('#set_mobile_s').addClass('hide');
						$('#set_code_s').addClass('hide');
						if (data.status == '200') {
							$('#l_fp_t_3').attr('class', 'done');
							$('#l_fp_t_4').addClass('last doing');
							$("#l_fp_b_3").addClass('hide');	
							$("#l_fp_b_4").removeClass('hide');	
						}else if (data.status == '120' || data.status == '121') {
							$('#set_mobile_s').html('<i class="i-def"></i>' + tip(data.status));
							$('#set_mobile_s').removeClass('hide');
						}else if (data.status == '124' || data.status == '125') {
							$('#set_code_s').html('<i class="i-def"></i>' + tip(data.status));
							$('#set_code_s').removeClass('hide');
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
		$('.itxt').focus(function() {
			$('#' + $(this).attr('id') + '_s').addClass('hide');
		});
		$('.ftx-05').click(function(){
			$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr='+new Date().getTime());
		});
		$('#valid_mobile_code').click(validSms);
		$('#set_mobile_code').click(setSms);
	}, true, false);
});

function validSms(){
	$.ajax({
		url : '/beio/sys/sendSmsVerifyCode',
		data : {'mr.mobile' : $('#find_mobile').val(), 'mr.exist' : '1'},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				$('#valid_mobile_code').unbind();
				$('#valid_mobile_code').html('60');
				var timer1 = setInterval(function(){
					var surplus = $('#valid_mobile_code').html();
					$('#valid_mobile_code').html(--surplus);
					if (surplus <= 0) {
						window.clearInterval(timer1);
						$('#valid_mobile_code').click(validSms);
						$('#valid_mobile_code').html('获取短信校验码');
					}
				}, 1000);
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
}

function setSms(){
	$.ajax({
		url : '/beio/sys/sendSmsVerifyCode',
		data : {'mr.mobile' : $('#set_mobile').val(), 'mr.exist' : '0'},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				$('#set_mobile_code').unbind();
				$('#set_mobile_code').html('60');
				var timer2 = setInterval(function(){
					var surplus = $('#set_mobile_code').html();
					$('#set_mobile_code').html(--surplus);
					if (surplus <= 0) {
						window.clearInterval(timer2);
						$('#set_mobile_code').click(setSms);
						$('#set_mobile_code').html('获取短信校验码');
					}
				}, 1000);
				$('#set_code_s').removeClass('errMsg');
				$('#set_code_s').addClass('sucMsg');
				$('#set_code_s').html('<i class="i-def"></i>' + tip('202'));
				$('#set_code_s').removeClass('hide');
			}else if (data.status == '121' || data.status == '190' || data.status == '191' || 
					data.status == '192' || data.status == '193') {
				alert(tip(data.status));
			}else if (data.status == '128'){
				$('#set_code_s').removeClass('sucMsg');
				$('#set_code_s').addClass('errMsg');
				$('#set_code_s').html('<i class="i-def"></i>' + tip(data.status));
				$('#set_code_s').removeClass('hide');
			}else {
				alert(tip('400'));
			}
		},
		error : function() {
			alert(tip('500'));
		}
	});
}