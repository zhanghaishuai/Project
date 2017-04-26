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
					<a href="buycart.html"><i class="icon_card"></i>购物车<b id="cart_num"></b></a>\
				</div>\
				<div class="new_order">\
					<a href="myorder.html">我的订单<b id="order_num"></b></a>\
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
	<div class="footer">\
		<div class="mod_service">\
			<div class="grid_c1 mod_service_inner">\
				<ul class="mod_service_list">\
					<li class="mod_service_item">\
						<div class="mod_service_unit">\
							<h5 class="mod_service_tit mod_service_duo">多</h5>\
							<p class="mod_service_txt">品类齐全</p>\
						</div>\
					</li>\
					<li class="mod_service_item">\
						<div class="mod_service_unit">\
							<h5 class="mod_service_tit mod_service_kuai">快</h5>\
							<p class="mod_service_txt">极速配送</p>\
						</div>\
					</li>\
					<li class="mod_service_item">\
						<div class="mod_service_unit">\
							<h5 class="mod_service_tit mod_service_hao">好</h5>\
							<p class="mod_service_txt">正品行货</p>\
						</div>\
					</li>\
					<li class="mod_service_item">\
						<div class="mod_service_unit">\
							<h5 class="mod_service_tit mod_service_sheng">省</h5>\
							<p class="mod_service_txt">天天低价</p>\
						</div>\
					</li>\
				</ul>\
			</div>\
		</div>\
		<div class="mod_copyright">\
			<div class="grid_c1 mod_copyright_inner">\
				<p class="mod_copyright_links">\
					<a href="#" target="_blank">关于我们</a><span class="mod_copyright_split">|</span>\
					<a href="#" target="_blank">联系我们</a><span class="mod_copyright_split">|</span>\
					<a href="#" target="_blank">联系客服</a><span class="mod_copyright_split">|</span>\
					<a href="#" target="_blank">友情链接</a><span class="mod_copyright_split">|</span>\
					<a href="#" target="_blank">销售联盟</a><span class="mod_copyright_split">|</span>\
					<a href="#" target="_blank">隐私政策</a>\
				</p>\
			</div>\
			<div class="grid_c1 mod_copyright_inner">\
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
		    <a href="javascript:void(0)" id="qrcode_login_btn"></a>\
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
		                    <a href="javascript:void(0)" class="changeCode">看不清换一张</a>\
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
		<div class="coagent" id="kbCoagent">\
		    <ul>\
		        <li class="extra-r">\
		            <div>\
		                <div class="regist-link">\
		                	<a href="register.html"><b></b>立即注册</a>\
		                </div>\
		            </div>\
		        </li>\
		    </ul>\
		</div>\
	</div>',
	addrBox : '\
	<div id="divDialog">\
		<div class="pop">\
			<a href="javascript:void(0)" class="addr_close close"></a>\
				<div class="pop_title">编辑收货地址</div>\
				<div class="pop_con info_list">\
					<ul>\
						<li>\
							<span class="name">收货人</span>\
							<input id="addr_name" class="addr_filed addr_name" type="text" value="" maxlength="8">\
							<div class="alart_tip addr_name_s hide"></div>\
						</li>\
						<li>\
							<span class="name">手机号码</span>\
							<input id="addr_mobile" class="addr_filed addr_mobile" type="text" value="" maxlength="11">\
							<span class="name">或固定电话</span>\
							<input id="addr_telephone" class="addr_filed addr_telephone" type="text" value="" maxlength="20">\
							<div class="alart_tip addr_mobile_s addr_telephone_s hide"></div>\
						</li>\
						<li>\
							<span class="name">所在地区</span>\
							<select id="addr_province" class="addr_filed addr_province" style="width:130px;">\
								<option value="" selected="">请选择</option>\
							</select>\
							<select id="addr_city" class="addr_filed addr_city" style="width:130px;">\
								<option value="" selected="">请选择</option>\
							</select>\
							<select id="addr_county" class="addr_filed addr_county" style="width:130px;">\
								<option value="" selected="">请选择</option>\
							</select>\
							<div class="alart_tip addr_province_s addr_city_s addr_county_s hide"></div>\
						</li>\
						<li>\
							<span class="name">详细地址</span>\
							<input id="addr_address" class="addr_filed addr_address" type="text" style="width:413px;" value="" maxlength="150"/>\
							<div class="alart_tip addr_address_s hide"></div>\
						</li>\
						<li>\
							<span class="name">邮编</span>\
							<input id="addr_zipcode" class="addr_filed addr_zipcode" type="text" value="" maxlength="6"/>\
							<div class="alart_tip addr_zipcode_s hide"></div>\
						</li>\
					</ul>\
				<div class="btn_bar">\
				 	<a href="javascript:void(0)" class="btn_red addr_submit">确认</a>\
					<a href="javascript:void(0)" class="btn addr_cancel">取消</a>\
				</div>\
			</div>\
		</div>\
	</div>'
};

//自动登陆
function initHtml(index){
	autologin(function(member){
		if (member != '' && member != null && member != undefined) {
			$('.hi').html('尊敬的会员<span>'+(member.nickName == '' ? member.mobile : member.nickName)+'</span>,您好。');
			$('.head_operate_nav').html('<li><a href="myinfo.html">个人中心</a></li><li><a href="javascript:void(0);" id="logout">注销</a></li>');
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
						$('#cart_num').html(data.result.cartNum > 99 ? '99+' : data.result.cartNum);
						$('#order_num').html(data.result.orderNum > 99 ? '99+' : data.result.orderNum);
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
	
	if(index != true) {
		// 菜单展开
		$('.all').hover(function(){$('.home_nav_l').slideDown(100);},false);
		$('.home_nav_l > .new_pub_nav > .navli').hover(function(){
			$('.navli').removeClass('on');
			$('.new_pub_nav_pop').css('display', 'none');
			$(this).addClass('on');
			$('#'+$(this).attr('id')+'_child').css('display', 'block');
		},false);
		// 菜单收起
		$('.home_nav_l').hover(null,function(){
			$('.home_nav_l').slideUp(100);
		});
	} else {
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
	}
	
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