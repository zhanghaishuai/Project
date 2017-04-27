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
							<dd><a class="j-menuItem on" href="javascript:void(0);">个人信息</a></dd>\
							<dd><a class="j-menuItem " href="myrfee.html">会员续费</a></dd>\
							<dd><a class="j-menuItem " href="myrpwd.html">重置密码</a></dd>\
							<dd><a class="j-menuItem " href="mymmbl.html">修改手机</a></dd>\
							<dd><a class="j-menuItem " href="myaddr.html">收货地址</a></dd>\
							<dt>我的交易</dt>\
							<dd><a class="j-menuItem " href="myorder.html">我的订单</a></dd>\
							<dt>关于我们</dt>\
							<dd><a class="j-menuItem " href="myabout.html">关于我们</a></dd>\
						</dl>\
					</div>\
				</div>\
				<div class="my_main">\
					<div class="account_right">\
						<div>\
							<div class="archives_title">\
								<h2>编辑个人档案<span class=" gray666 f12 bnone"> (带<span class="red">*</span>号的项目为必填项)</span></h2>\
							</div>\
							<div class="edit_message1">\
								<div class="mesage_list">\
									<div class="list_title">会员时间：</div>\
									<div class="list_title" style="width: auto;">\
										&nbsp;&nbsp;<span id="turnonTime"></span>&nbsp;&nbsp;——&nbsp;&nbsp;<span id="expireTime"></span>\
									</div>\
									<div class="empty_box_left"></div>\
								</div>\
								<div class="mesage_list">\
									<div class="list_title">会员昵称：</div>\
									<div class="list_edit">\
										<input id="nickName" type="text" value="" maxlength="20" class="field nickname" />\
										<span class="errMsg" id="nickName_s"></span>\
									</div>\
									<div class="empty_box_left"></div>\
								</div>\
								<div class="mesage_list">\
									<div class="list_title"><em>*</em>会员邮箱：</div>\
									<div class="list_edit">\
										<input id="email" type="text" value="" maxlength="50" class="field email" />\
										<span class="errMsg" id="email_s"></span>\
									</div>\
									<div class="empty_box_left"></div>\
								</div>\
								<div class="mesage_list">\
									<div class="list_title">性别：</div>\
									<div class="list_edit add_edit_h">\
										<input name="sex" value="1" type="radio" class="field radio_button"/>\
										<span class="choice_cont">男</span>\
										<input name="sex" value="0" type="radio" class="field radio_button"/>\
										<span class="choice_cont">女</span>\
										<div id="notice_3" style="visibility: hidden;"></div>\
									</div>\
									<div class="empty_box_left"></div>\
								</div>\
								<div class="mesage_list">\
									<div class="list_title">生日：</div>\
									<div class="list_edit">\
										<select id="birthYear" class="birthday model_select"></select>\
										<span class="model_span"> 年 </span>\
										<select id="birthMonth" class="birthday model_select"></select>\
										<span class="model_span"> 月 </span>\
										<select id="birthDay" class="birthday model_select"></select>\
										<span class="model_span"> 日 </span>\
										<span class="errMsg" id="birthday_s"></span>\
									</div>\
									<div class="empty_box_left"></div>\
								</div>\
								<div class="mesage_list">\
									<div class="list_title">兴趣爱好：</div>\
									<div class="list_edit">\
										<textarea id="hobby" class="field text_interest" rows="2" cols="20" ></textarea><br/>\
										<span class="errMsg" id="hobby_s"></span>\
									</div>\
									<div class="empty_box_left"></div>\
								</div>\
								<div class="mesage_list">\
									<input type="submit" value="保存基本信息" class="save_info" /><br/><br/>\
									<span class="sucMsg succcess hide" id="hobby_s" style="line-height: 22px; font-size: 14px; margin-left: 110px">个人信息修改成功</span>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>');
		$('#turnonTime').html(dateMilliFormat(member.turnonTime, 'Date'));
		$('#expireTime').html(dateMilliFormat(member.expireTime, 'Date'));
		$('#nickName').val(member.nickName);
		$('#email').val(member.email);
		$('input[name=sex][value='+member.sex+']').attr('checked','checked');
		$('#birthYear').attr('rel', dateMilliFormat(member.birthday, 'YEAR'));
		$('#birthMonth').attr('rel', dateMilliFormat(member.birthday, 'MONTH'));
		$('#birthDay').attr('rel', dateMilliFormat(member.birthday, 'DAY'));
		$('#hobby').html(member.hobby);
		$.ms_DatePicker(); 
		$('.field').focus(function() {
			$('.succcess').addClass('hide');
			$('#' + $(this).attr('id') + '_s').addClass('hide');
		});
		$('.birthday').click(function() {
			$('.succcess').addClass('hide');
			$('#birthday_s').addClass('hide');
		});
		$('.save_info').click(function(){
			$('.succcess').addClass('hide');
			var flag = true;
			if (new RegExp(regex('nickName')).test($('#nickName').val()) == false) {
				$('#nickName_s').html('<i class="i-def"></i>' + tip('133'));
				$('#nickName_s').removeClass('hide');
				flag = false;
			}
			if (new RegExp(regex('email')).test($('#email').val()) == false) {
				$('#email_s').html('<i class="i-def"></i>' + tip('132'));
				$('#email_s').removeClass('hide');
				flag = false;
			}
			if (new RegExp(regex('empty')).test($('#email').val()) == false) {
				$('#email_s').html('<i class="i-def"></i>' + tip('131'));
				$('#email_s').removeClass('hide');
				flag = false;
			}
			if (new RegExp(regex('date')).test($.gs_DatePicker()) == false) {
				$('#birthday_s').html('<i class="i-def"></i>' + tip('135'));
				$('#birthday_s').removeClass('hide');
				flag = false;
			}
			if (new RegExp(regex('hobby')).test($('#hobby').val()) == false) {
				$('#hobby_s').html('<i class="i-def"></i>' + tip('134'));
				$('#hobby_s').removeClass('hide');
				flag = false;
			}
			if(flag == true){
				$.ajax({
					url : '/beio/sys/modifyMemberInfo',
					data : {
						'mr.nickName' : $('#nickName').val(), 
						'mr.email' : $('#email').val(), 
						'mr.sex' : $('input[name=sex]:checked').val(), 
						'mr.birthday' : $.gs_DatePicker(), 
						'mr.hobby' : $('#hobby').val(), 
					},
					type : 'POST',
					async : false,
					cache : true,
					dataType : 'json',
					success : function(data) {
						if (data.status == '200') {
							sessionStorage.setItem('member', JSON.stringify(data.result));
							$('.succcess').removeClass('hide');
						}else if (data.status == '133') {
							$('#nickName_s').html('<i class="i-def"></i>' + tip('133'));
							$('#nickName_s').removeClass('hide');
						}else if (data.status == '132' ||data.status == '131') {
							$('#email_s').html('<i class="i-def"></i>' + tip('132'));
							$('#email_s').removeClass('hide');
						}else if (data.status == '135'){
							$('#birthday_s').html('<i class="i-def"></i>' + tip('135'));
							$('#birthday_s').removeClass('hide');
						}else if (data.status == '134') {
							$('#hobby_s').html('<i class="i-def"></i>' + tip('134'));
							$('#hobby_s').removeClass('hide');
						}else if (data.status == '100') {
							alert(tip(data.status));
						}else if (data.status == '170') {
							alert(tip(data.status));
							autologin(function(member){
								$('#turnonTime').html(dateMilliFormat(member.turnonTime, 'Date'));
								$('#expireTime').html(dateMilliFormat(member.expireTime, 'Date'));
								$('#nickName').val(member.nickName);
								$('#email').val(member.email);
								$('input[name=sex][value='+member.sex+']').attr('checked','checked');
								$('#birthYear').attr('rel', dateMilliFormat(member.birthday, 'YEAR'));
								$('#birthMonth').attr('rel', dateMilliFormat(member.birthday, 'MONTH'));
								$('#birthDay').attr('rel', dateMilliFormat(member.birthday, 'DAY'));
								$('#hobby').html(member.hobby);
								$.ms_DatePicker(); 
							});
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
	}, true, false);
});