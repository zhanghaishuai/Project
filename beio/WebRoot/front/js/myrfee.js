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
					<div class="payamount">\
					    <div class="order" style="height: 40px;">\
							<span><label style="float: left;">会员续费：￥<em>360</em>元/年</label><!-- <label style="float: right;">续费时间：2017-04-04&nbsp;——&nbsp;2018-04-04</label> --></span>\
						</div>\
						<div>\
							<div class="wxpaylogo"><img alt="" src="image/WePayLogo.png" width="180px" height="50px"></div>\
							<div id="qrcode" class="wxqrcode"></div>\
							<div class="wxwordlogo"><img alt="" src="image/WeWordLogo.png" width="202px" height="66px"></div>\
						</div>\
					</div>\
				</div>\
			</div>');
		var qrcode = new QRCode($("#qrcode")[0], {
			width : 200,
			height : 200
		});
		qrcode.makeCode('http://www.baidu.com');
	}, true, false);
});