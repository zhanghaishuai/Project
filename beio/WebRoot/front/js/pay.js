$(function(){
	autologin(function(member){
		$('#hd1').append('\
			<div class="logo_line">\
				<div class="w960">\
					<div class="shopping_procedure"><span>我的购物车</span><span>填写订单</span><span class="current">完成订单</span></div>\
					<div class="logo1"><a href="index.html"><img src="image/logo1.png" height="72" style="margin-top: 10px;"></a></div>\
				</div>\
			</div>');
		$('#td').append(base.btmHtml);
		var search = window.location.search.substring(1);
		var params = search.split("&");
		var payno = '', interval = undefined;
		$.each(params, function(index, item){
			param = item.split("=");
			if(param[0] == 'payno'){
				payno = param[1];
			}
		});
		$.ajax({
			url : '/beio/sys/queryPay.action',
			data : {'pay.id' : payno},
			type : 'POST',
			cache : true,
			async : false,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$('#bd').append('\
						<div class="payamount">\
						    <div class="cashier">收银台</div>\
						    <div class="order">\
								<span id="descr">待支付金额&nbsp;<em style="font-size: 24px; color: #f00;">'+(data.result.total_fee/100).toFixed(2)+'</em>&nbsp;元，剩余支付时间&nbsp;<em id="timer" style="font-size: 18px; color: #f00;">600</em>&nbsp;秒。</span>\
							</div>\
							<div id="bo">\
								<div class="wxpaylogo"><img alt="" src="image/WePayLogo.png" width="180px" height="50px"></div>\
								<div id="qrcode" class="wxqrcode"></div>\
								<div class="wxwordlogo"><img alt="" src="image/WeWordLogo.png" width="202px" height="66px"></div>\
							</div>\
						</div>');
					var qrcode = new QRCode($("#qrcode")[0], {
						width : 200,
						height : 200
					});
					qrcode.makeCode(data.result.code_url);
					interval = setInterval(function(){
						$.ajax({
							url : '/beio/goods/payOrder.action',
							data : {'pay.id' : payno},
							type : 'POST',
							cache : true,
							async : false,
							dataType : 'json',
							success : function(data) {
								if (data.status == '200') {
									if ('SUCCESS' == data.result) {
										window.clearInterval(interval);
										$('#bo').css('display', 'none');
										$('#descr').html('订单支付成功，商品进入待发货状态，请到&nbsp;&nbsp;<a href="myorder.html">我的订单</a>&nbsp;&nbsp;进行查询。');
									}else if ('NOTPAY' == data.result) {
										var timer = $('#timer').html();
										if(timer > 0){
											$('#timer').html(timer-1);
										}else {
											qrcode.makeCode('');
											$('#descr').html('订单支付超时，转到我的订单重新支付，5秒后自动跳转。');
											setTimeout(function(){
												window.location.href = 'myorder.html';
											}, 5000);
										}
									}else {
										window.clearInterval(interval);
										alert(tip('309'));
										window.location.href = 'index.html';
									}
								}else if (data.status == '170') {
									alert(tip(data.status));
								}else {
									alert(tip('400'));
								}
							},
							error : function() {
								alert(tip('500'));
							}
						});
					}, 1000);
				}else if (data.status == '170') {
					alert(tip(data.status));
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
