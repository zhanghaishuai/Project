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
							<dd><a class="j-menuItem on" href="javascript:void(0);">会员续费</a></dd>\
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
					<div style="line-height: 24px; font-size: 16px; font-weight: bold; margin: 10px 15px;">\
						<input type="radio" name="category" value="0" checked="checked" style="width: 16px; height: 16px;margin-top: -3px;"/>&nbsp;内邀码开通/续费\
						&nbsp;&nbsp;\
						<input type="radio" name="category" value="1" style="width: 16px; height: 16px;margin-top: -3px;"/>&nbsp;微信开通/续费\
					</div>\
					<div class="payamount">\
					    <div class="order" style="height: 40px;">\
							<span>\
								<label style="float: left;">会员开通/续费：内邀码&nbsp;个/年</label>\
							</span>\
						</div>\
						<div>\
							<div style="margin: 15px 15px;">\
								<label style="">内邀码：</label>\
								<input name="invite" type="text" style="border: 1px solid #ccc; width: 200px; height: 18px; margin-top: -3px;"/>\
								<button id="mrfee_btn" style="border: 1px solid #ccc; height: 20px; margin-left: 25px;">&nbsp;开通/续费&nbsp;</button>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>');
		$('#mrfee_btn').click(inviteActive);
		$('[name=category]').click(function(){
			if ($(this).val() == '0') {
				$('.payamount').html('\
					<div class="order" style="height: 40px;">\
						<span>\
							<label style="float: left;">会员开通/续费：内邀码&nbsp;个/年</label>\
						</span>\
					</div>\
					<div>\
						<div style="margin: 15px 15px;">\
							<label style="">内邀码：</label>\
							<input name="invite" type="text" style="border: 1px solid #ccc; width: 200px; height: 18px; margin-top: -3px;"/>\
							<button id="mrfee_btn" style="border: 1px solid #ccc; height: 20px; margin-left: 25px;">&nbsp;开通/续费&nbsp;</button>\
						</div>\
					</div>');
				$('#mrfee_btn').click(inviteActive);
			}else {
				$('.payamount').html('\
					<div class="order" style="height: 40px;">\
						<span>\
							<label id="descr" style="float: left;">会员开通/续费：￥<em>360</em>元/年</label>\
						</span>\
					</div>\
					<div>\
						<div class="wxpaylogo"><img alt="" src="image/WePayLogo.png" width="180px" height="50px"></div>\
						<div id="qrcode" class="wxqrcode"></div>\
						<div class="wxwordlogo"><img alt="" src="image/WeWordLogo.png" width="202px" height="66px"></div>\
					</div>');
				feeActive();
			}
		});
	}, true, false);
});

/**
 * 内邀码
 */
function inviteActive(){
	if (new RegExp(regex('empty')).test($('[name=invite]').val()) == false) {
		alert(tip('152'));
		return;
	}
	$.ajax({
		url : '/beio/sys/mrfeeInvite',
		data : {
			'mr.sysInviteCode' : $('[name=invite]').val()
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				alert('开通/续费成功！会员到期时间'+dateMilliFormat(data.result.expireTime, 'Date'));
				window.location.href = "myinfo.html";
			}else {
				alert(tip(data.status));
			}
		},
		error : function() {
			alert(tip('500'));
		}
	});
}

/**
 * 付费
 */
function feeActive(){
	$("#qrcode").html('');
	var qrcode = new QRCode($("#qrcode")[0], {
		width : 200,
		height : 200
	});
	$.ajax({
		url : '/beio/sys/preMrfee',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			var payno = data.result.id;
			if (data.status == '200') {
				$('#descr').html('待支付金额&nbsp;<em style="font-size: 24px; color: #f00;">'+(data.result.total_fee/100).toFixed(2)+'</em>&nbsp;元，剩余支付时间&nbsp;<em id="timer" style="font-size: 18px; color: #f00;">600</em>&nbsp;秒。');
				qrcode.makeCode(data.result.code_url);
				interval = setInterval(function(){
					$.ajax({
						url : '/beio/sys/payMrfee',
						data : {'pay.id' : payno},
						type : 'POST',
						cache : true,
						async : false,
						dataType : 'json',
						success : function(data) {
							if (data.status == '200') {
								if ('SUCCESS' == data.result.trade_state) {
									window.clearInterval(interval);
									qrcode.makeCode('');
									alert('开通/续费成功！会员到期时间'+dateMilliFormat(data.result.expireTime, 'Date'));
									window.location.href = "myinfo.html";
								}else if ('NOTPAY' == data.result.trade_state) {
									var timer = $('#timer').html();
									if(timer > 0){
										$('#timer').html(timer-1);
									}else {
										window.clearInterval(interval);
										qrcode.makeCode('');
										$('#descr').html('支付超时。点击&nbsp;<a href="javascript:feeActive();">刷新</a>&nbsp;重新支付。');
									}
								}else {
									window.clearInterval(interval);
									qrcode.makeCode('');
									$('#descr').html('支付超时。点击&nbsp;<a href="javascript:feeActive();">刷新</a>&nbsp;重新支付。');
								}
							}else {
								alert(tip(data.status));
							}
						},
						error : function() {
							alert(tip('500'));
						}
					});
				}, 1000);	
			}else {
				alert(tip(data.status));
			}
		},
		error : function() {
			alert(tip('500'));
		}
	});
}