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
							<dd><a class="j-menuItem " href="mymmbl.html">修改手机</a></dd>\
							<dd><a class="j-menuItem " href="myaddr.html">收货地址</a></dd>\
							<dt>我的交易</dt>\
							<dd><a class="j-menuItem " href="myorder.html">我的订单</a></dd>\
							<dt>关于我们</dt>\
							<dd><a class="j-menuItem on" href="javascript:void(0);">关于我们</a></dd>\
						</dl>\
					</div>\
				</div>\
				<div class="my_main" >\
					<div style="padding: 50px">关于我们……</div>\
				</div>\
			</div>');
	}, true, false);
});
