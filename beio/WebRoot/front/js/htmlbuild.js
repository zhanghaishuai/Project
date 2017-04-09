var htmlbuild = {
	topHtml : '\
	<div id="hd">\
		<div id="tools">\
			<div class="tools">\
				<div class="head_operate">\
					<ul class="head_operate_nav"></ul>\
					<div class="head_welcome">\
						<span class="hi">欢迎光临，请<a href="login.html">登录</a>成为会员</span>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class="logo_line_out">\
			<div class="logo_line">\
				<div class="logo" onclick=window.location.href="index.html"></div>\
				<div class="search">\
					<form action="" method="post">\
						<input type="text" id="searchInp" class="text gray" maxLength="50" autocomplete="off" /> \
						<input type="button" id="searchBtn" class="button"/>\
					</form>\
				</div>\
				<div class="search_bottom">\
					<div class="search_hot">\
						<a href="#" style="margin-right: 0;">热搜</a>: \
					</div>\
				</div>\
				<div class="new_cart">\
					<a href="car.html"><i class="icon_card"></i>购物车<b id="cart_num"></b></a>\
				</div>\
				<div class="new_order">\
					<a href="myhome_order.html">我的订单<b id="order_num"></b></a>\
				</div>\
			</div>\
		</div>\
		<div class="nav_top">\
			<ul>\
				<li class="all"><a href="javascript:void(0);">全部商品分类</a></li>\
			</ul>\
		</div>\
		<div class="home_nav">\
			<div class="home_nav_l">\
				<ul class="new_pub_nav"></ul>\
			</div>\
		</div>\
	</div>',
	btmHtml : '\
	<div class="footer J_f mod_footer" id="footer">\
		<div class="mod_service">\
			<div class="grid_c1 mod_service_inner">\
				<ul class="mod_service_list">\
					<li class="mod_service_item">\
						<div class="mod_service_unit">\
							<h5 class="mod_service_tit mod_service_duo">多</h5>\
							<p class="mod_service_txt">品类齐全，轻松购物</p>\
						</div>\
					</li>\
					<li class="mod_service_item">\
						<div class="mod_service_unit">\
							<h5 class="mod_service_tit mod_service_kuai">快</h5>\
							<p class="mod_service_txt">多仓直发，极速配送</p>\
						</div>\
					</li>\
					<li class="mod_service_item">\
						<div class="mod_service_unit">\
							<h5 class="mod_service_tit mod_service_hao">好</h5>\
							<p class="mod_service_txt">正品行货，精致服务</p>\
						</div>\
					</li>\
					<li class="mod_service_item">\
						<div class="mod_service_unit">\
							<h5 class="mod_service_tit mod_service_sheng">省</h5>\
							<p class="mod_service_txt">天天低价，畅选无忧</p>\
						</div>\
					</li>\
				</ul>\
			</div>\
		</div>\
		<div class="mod_help">\
			<div class="grid_c1 mod_help_inner">\
				<div class="mod_help_list">\
					<div class="mod_help_nav">\
						<h5 class="mod_help_nav_tit">购物指南</h5>\
						<ul class="mod_help_nav_con">\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">购物流程</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">会员介绍</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">生活旅行</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">常见问题</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">大家电</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">联系客服</a></li>\
						</ul>\
					</div>\
					<div class="mod_help_nav">\
						<h5 class="mod_help_nav_tit">配送方式</h5>\
						<ul class="mod_help_nav_con">\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">上门自提</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">211限时达</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">配送服务查询</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">配送费收取标准</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">海外配送</a></li>\
						</ul>\
					</div>\
					<div class="mod_help_nav">\
						<h5 class="mod_help_nav_tit">支付方式</h5>\
						<ul class="mod_help_nav_con">\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">货到付款</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">在线支付</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">分期付款</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">邮局汇款</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">公司转账</a></li>\
						</ul>\
					</div>\
					<div class="mod_help_nav">\
						<h5 class="mod_help_nav_tit">售后服务</h5>\
						<ul class="mod_help_nav_con">\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">售后政策</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">价格保护</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">退款说明</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">返修/退换货</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">取消订单</a></li>\
						</ul>\
					</div>\
					<div class="mod_help_nav">\
						<h5 class="mod_help_nav_tit">特色服务</h5>\
						<ul class="mod_help_nav_con">\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">夺宝岛</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">DIY装机</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">延保服务</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">京东E卡</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">京东通信</a></li>\
							<li><a href="//help.jd.com/user/issue/list-29.html" target="_blank">京东JD+</a></li>\
						</ul>\
					</div>\
					<div class="mod_help_cover">\
						<h5 class="mod_help_cover_tit">京东自营覆盖区县</h5>\
						<div class="mod_help_cover_con">\
							<p class="mod_help_cover_info">京东已向全国2661个区县提供自营配送服务，支持货到付款、POS机刷卡和售后上门服务。</p>\
							<p class="mod_help_cover_more"><a href="//help.jd.com/user/issue/103-983.html" target="_blank">查看详情<i class="iconfont"></i></a></p>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class="mod_copyright">\
			<div class="grid_c1 mod_copyright_inner">\
				<p class="mod_copyright_links">\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">关于我们</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">联系我们</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">联系客服</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">合作招商</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">营销中心</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">手机京东</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">友情链接</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">销售联盟</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">京东社区</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">风险监测</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">隐私政策</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">京东公益</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">English Site</a><span class="mod_copyright_split">|</span>\
					<a href="//www.jd.com/intro/about.aspx" target="_blank">Contrat Us</a>\
				</p>\
				<div class="mod_copyright_info">\
					<p>\
						<a href="#" target="_blank">京公网安备11000002000088号</a>\
						<span class="mod_copyright_split">|</span>\
						<span>京ICP证070359号</span>\
						<span class="mod_copyright_split">|</span>\
						<a href="#" target="_blank">互联网药品信息服务资格证编号(京)-经营性-2014-0008</a>\
						<span class="mod_copyright_split">|</span>\
						<span>新出发京零&nbsp;字第大120007号</span>\
					</p>\
					<p>\
						<span>互联网出版许可证编号新出网证(京)字150号</span>\
						<span class="mod_copyright_split">|</span>\
						<a href="#" target="_blank">出版物经营许可证</a>\
						<span class="mod_copyright_split">|</span>\
						<a href="#" target="_blank">网络文化经营许可证京网文[2014]2148-348号</a>\
						<span class="mod_copyright_split">|</span>\
						<span>违法和不良信息举报电话：4006561155</span>\
					</p>\
					<p>\
						<span>Copyright&nbsp;©&nbsp;2004&nbsp;-&nbsp;2017&nbsp;&nbsp;京东JD.com&nbsp;版权所有</span>\
						<span class="mod_copyright_split">|</span>\
						<span>消费者维权热线：4006067733</span>\
						<a href="//sale.jd.com/act/7Y0Rp81MwQqc.html" target="_blank" class="mod_copyright_license">经营证照</a>\
					</p>\
					<p>\
						<span>京东旗下网站：</span><a href="https://www.jdpay.com/" target="_blank">京东钱包</a>\
						<span class="mod_copyright_split">|</span>\
						<a href="http://www.jcloud.com " target="_blank">京东云</a>\
					</p>\
				</div>\
				<p class="mod_copyright_auth">\
					<a class="mod_copyright_auth_ico mod_copyright_auth_ico_1" href="#" target="_blank">经营性网站备案中心</a>\
					<a class="mod_copyright_auth_ico mod_copyright_auth_ico_2" href="#" target="_blank">可信网站信用评估</a>\
					<a class="mod_copyright_auth_ico mod_copyright_auth_ico_3" href="#" target="_blank">网络警察提醒你</a>\
					<a class="mod_copyright_auth_ico mod_copyright_auth_ico_4" href="#" target="_blank">诚信网站</a>\
					<a class="mod_copyright_auth_ico mod_copyright_auth_ico_5" href="#" target="_blank">中国互联网举报中心</a>\
					<a class="mod_copyright_auth_ico mod_copyright_auth_ico_6" href="#" target="_blank">网络举报APP下载</a>\
				</p>\
			</div>\
		</div>\
	</div>',
	loginBox :'\
	<div class="shadow login-shadow "></div>\
	<div class="shadow login-form" style="position:absolute; border: 1px solid #ccc; top: 250px; left: 40%; z-index: 10030;">\
        <div class="login-tab login-tab-l" >\
			<a href="javascript:void(0)" class="checked" id="login_box_btn">账户登录</a>\
		</div>\
		<div class="login-tab login-tab-r">\
		    <a href="javascript:void(0)" id="qrcode_login_btn"><!-- 微信登录 --></a>\
		</div>\
		<div id="login_box" class="login-box" style="display: block; visibility: visible;">\
		    <div class="mt tab-h"></div>\
		    <div class="msg-wrap" >\
				<div id="msg-warn" class="msg-warn hide"></div>\
				<div class="msg-error hide"><b></b></div>\
		    </div>\
		    <div class="mc">\
		        <div class="form" >\
		            <form id="formlogin" method="post" onsubmit="return false;" >\
						<div class="item item-fore1">\
		                    <label for="login_mobile" class="login-label name-label"></label>\
		                    <input id="login_mobile" type="text" class="itxt" autocomplete="off" maxlength="11" placeholder="已注册手机号"/>\
		                </div>\
						<div class="item item-fore1">\
							<label for="login_pwd" class="login-label pwd-label"></label>\
							<input id="login_pwd" type="password" class="itxt" autocomplete="off" maxlength="20" placeholder="密码"/>\
						</div>\
		                <div id="o-authcode" class="item item-vcode item-fore3">\
		                    <input id="login_code" type="text" class="itxt itxt02" autocomplete="off" maxlength="4" placeholder="验证码" />\
		                    <img class="verify-code" src="/beio/image/verifyCode" alt="验证码"/>\
		                    <a href="javascript:void(0)" id="changeCode">看不清换一张</a>\
		                </div>\
						<div class="item item-fore4">\
							<div class="safe">\
								<span>\
									<input id="autoLogin" name="chkRememberMe" type="checkbox" class="jdcheckbox">\
		                            <label for="">自动登录</label>\
								</span>\
								<span class="forget-pw-safe">\
									<a href="forget.html" class="" >忘记密码</a>\
								</span>\
		                 	</div>\
		                </div>\
		                <div class="item item-fore5">\
		                    <div class="login-btn">\
		                        <a href="javascript:void(0);" id="loginsubmit" class="btn-img btn-entry">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>\
		                    </div>\
		                </div>\
		            </form>\
		        </div>\
		    </div>\
		</div>\
		<div id="qrcode_login" class="qrcode-login" style="display: none; visibility: hidden;">\
		    <div class="mc">\
		        <div class="qrcode-error-2016">\
		            <div class="qrcode-error-mask">\
		            </div>\
		            <p class="err-cont">服务器出错</p>\
		            <a href="javascript:void(0)" class="refresh-btn">刷新</a>\
		        </div>\
		        <div class="qrcode-main">\
		            <div class="qrcode-img">\
		                <img src="image/548faf09N1acc240e.png" alt="">\
		            </div>\
		            <div class="qrcode-help" style="display: none; "></div>\
		        </div>\
		        <div class="qrcode-panel">\
		            <ul>\
		                <li class="fore1">\
							<span>打开</span>\
		                    <a href="javascript:void(0)" target="_blank">\
							<span class="red">微信App</span></a>\
		                </li>\
						<li>扫描二维码</li>\
		            </ul>\
		        </div>\
		        <div class="coagent qr-coagent" id="qrCoagent">\
		            <ul>\
		                <li><b></b><em>免输入</em></li>\
		                <li><b class="faster"></b><em>更快&nbsp;</em></li>\
		                <li><b class="more-safe"></b><em>更安全</em></li>\
		            </ul>\
		        </div>\
		    </div>\
		</div>\
		<div class="coagent" id="kbCoagent">\
		    <ul>\
		    <!-- \
				<li>\
					<b></b>\
		            <a href="javascript:void(0)" onclick="" class="pdl">\
		            	<b class="QQ-icon"></b>\
		            	<span>QQ</span>\
		            </a>\
		            <span class="line">|</span>\
				</li>\
		        <li>\
					<a href="javascript:void(0)" onclick="" class="pdl">\
						<b class="weixin-icon"></b>\
						<span>微信</span>\
					</a>\
				</li>\
					 -->\
		        <li class="extra-r">\
		            <div>\
		                <div class="regist-link">\
		                	<a href="register.html"><b></b>立即注册</a>\
		                </div>\
		            </div>\
		        </li>\
		    </ul>\
		</div>\
	</div>'
};
//自动登陆
function initHtml(){
	autologin(function(member){
		if (member != '' && member != null && member != undefined) {
			$('.hi').html('尊敬的会员<span>'+(member.nickName == '' ? member.mobile : member.nickName)+'</span>,您好。');
			$('.head_operate_nav').html('<li><a href="myhome_info.html">个人中心</a></li><li><a href="javascript:void(0);" id="logout">注销</a></li>');
		}
		$.ajax({
			url : '/beio/goods/queryTopInfo',
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$.each(data.result.searchs, function(i, item){
						if(i == 0){
							$('#searchInp').attr('placeholder', item.keyword);
						}
						$('.search_hot').append('<a href="javascript:void(0);">' + item.keyword + '</a>');
					});
					$.each(data.result.classifys, function(i, item){
						if(item.level == '1'){
							$('.new_pub_nav').append('<li id="nav_'+item.id+'" class="navli"><span class="nav"><a href="search.html?category='+item.id+'">'+item.name+'</a></span></li>');
							$('.new_pub_nav').after('<div id="nav_'+item.id+'_child" class="new_pub_nav_pop"><div class="pop_column"></div></div>');
						}else if(item.level == '2'){
							if($('#nav_'+item.pid+'_child') != null && $('#nav_'+item.pid+'_child') != undefined){
								$('#nav_'+item.pid+'_child > .pop_column').append('<div class="pop_row"><a href="search.html?category='+item.id+'">'+item.name+'</a></div>');
							}
						}
					});
					$.each(data.result.navbars, function(i, item){
						$('.nav_top > ul').append('<li><a href="'+item.url+'">'+item.name+'</a></li>');
					});
					if(data.result.login == true){
						$('#cart_num').html(data.result.cartNum);
						$('#order_num').html(data.result.orderNum);
					}
				} else {
					alert(tip('400'));
				};
			},
			error : function() {
				alert(tip('500'));
			}
		});
	}, false);
	
	// 显示分类菜单
	$('.home_nav_l').css('display', 'block');
	// 显示详细菜单
	$('.home_nav_l > .new_pub_nav > .navli').hover(function(){
		$('.navli').removeClass('on');
		$('.new_pub_nav_pop').css('display', 'none');
		$(this).addClass('on');
		$('#'+$(this).attr('id')+'_child').css('display', 'block');
	},false);
	// 隐藏详细菜单
	$('.home_nav_l').hover(null,function(){
		$('.new_pub_nav_pop').css('display', 'none');
		$('.navli').removeClass('on');
	});
	
	// 搜索
	$('#searchBtn').click(function(){
		if (/^\S+$/.test($('#searchInp').val()) == true) {
			search($('#searchInp').val());
		}else {
			search($('#searchInp').attr('placeholder'));
		}
	});
	// 热搜
	$('.search_hot > a:gt(0)').click(function(){
		search($(this).html());
	});
	
	// 注销
	$('#logout').click(function(){
		$.ajax({
			url : '/beio/sys/logout',
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					localStorage.removeItem('mobile');
					localStorage.removeItem('password');
					window.location.href = 'login.html';
				} else {
					alert(tip('400'));
				};
			},
			error : function() {
				alert(tip('500'));
			}
		});
	});
}
// 热搜
function search(keyword){
	$.ajax({
		url : '/beio/goods/search',
		data : {'gdsSearch.keyword' : keyword},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				window.location.href = 'search.html?keyword=' + keyword;
			}else {
				alert(tip('400'));
			}
		},
		error : function() {
			alert(tip('500'));
		}
	});
}