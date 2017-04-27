/**
 * 展示元素
 */
var base = {
	topHtml : '\
		<div id="tools">\
			<div class="tools">\
				<div class="head_operate">\
					<ul class="head_operate_nav"></ul>\
					<div class="head_welcome">\
						<span class="hi"><b>欢迎光临，请<a href="login.html">登录</a>，或<a href="register.html">免费注册</a></b></span>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class="logo_line_out">\
			<div class="logo_line">\
				<div class="logo" onclick=window.location.href="index.html"></div>\
					<div class="search">\
					<input type="text" id="searchInp" class="searchtext" maxLength="20" autocomplete="off"/>\
					<span type="button" id="searchBtn" value="提交" class="searchbtn"></span>\
				</div>\
				<div class="search_bottom"><div class="search_hot"></div></div>\
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
		<div class="shadow">\
		<div class="login-form" style="border:1px solid #ccc; top:18%; left:38%; z-index:9999;">\
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
			                	<a href="register.html">立即注册</a>\
			                </div>\
			            </div>\
			        </li>\
			    </ul>\
			</div>\
		</div>\
		</div>',
	addrBox : '\
		<div id="addrBox" class="shadow">\
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
		</div>\
		</div>',
	receiptBox : '\
		<div id="receiptBox" class="shadow">\
		<div id="divDialog">\
			<div class="pop">\
				<a href="javascript:void(0)" class="receipt_close close"></a>\
					<div class="pop_title">编辑发票信息</div>\
					<div class="pop_con info_list">\
						<ul>\
							<li>\
								<span style="width:200px">\
									个人：<input name="receipt_type" type="radio" value="0" style="vertical-align:middle; margin-top:-3px;" checked="checked"/>&nbsp;&nbsp;\
									单位：<input name="receipt_type" type="radio" value="1" style="vertical-align:middle; margin-top:-3px;"/>&nbsp;&nbsp;\
								</span>\
								<input class="addr_filed receipt_title" type="text" style="width:300px;" value="" maxlength="150"/>\
								<div class="alart_tip receipt_title_s hide" style="left: 170px;"></div>\
							</li>\
						</ul>\
					<div class="btn_bar">\
					 	<a href="javascript:void(0)" class="btn_red receipt_submit">确认</a>\
						<a href="javascript:void(0)" class="btn receipt_cancel">取消</a>\
					</div>\
				</div>\
			</div>\
		</div>\
		</div>'
};

/**
 * 自动登录
 * @param callback
 * @param marker
 */
function autologin(callback, marker){
	$.ajax({
		url : '/beio/sys/querySessionMember',
		type : 'POST',
		async : true,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				callback(data.result);
			} else if (data.status == '170') {
				if (localStorage.getItem('mobile') != null && localStorage.getItem('password') != null) {
					$.ajax({
						url : '/beio/sys/login',
						data : {
							'mr.mobile' : localStorage.getItem('mobile'), 
							'mr.password' : localStorage.getItem('password'), 
							'mr.autoLoginMark' : 'autologin', 
						},
						type : 'POST',
						async : false,
						cache : true,
						dataType : 'json',
						success : function(data) {
							if (data.status == '200') {
								if(marker != false){
									$('.shadow').remove();
								}
								callback(data.result);
							} else if (data.status == '120' || data.status == '122' || data.status == '124'
									|| data.status == '125' || data.status == '195' || data.status == '192'
									|| data.status == '193') {
								marker != false ? buildlogin(callback) : callback();
							} else {
								alert(tip('400'));
							};
						},
						error : function() {
							alert(tip('500'));
						}
					});
				}else {
					marker != false ? buildlogin(callback) : callback();
				}
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
};

/**
 * 构建登录框
 * @param callback
 */
function buildlogin(callback){
	// 显示登录
	$('body').append(base.loginBox);
	// 换验证码
	$('.changeCode').click(function(){
		$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr'+new Date().getTime());
	});
	// 换验证码
	$('.verify-code').click(function(){
		$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr'+new Date().getTime());
	});
	// 自动登录
	$('#autoLogin').click(function(){
		if($('#autoLogin').attr('checked') == 'checked'){
			$('.msg-warn').removeClass('hide');
			$('.msg-warn').html('<b></b>公共场所不建议自动登录，以防账号丢失');
		}else{
			$('.msg-warn').addClass('hide');
			$('.msg-warn').html('');
		}
	});
	// 提交登录
	$('#loginsubmit').click(function(){
		$('.msg-error').addClass('hide');
		if (new RegExp(regex('empty')).test($('#login_mobile').val()) == false) {
			$('.msg-error').removeClass('hide');
			$('.msg-error').html('<b></b>' + tip('120'));
			return false;
		}
		if (new RegExp(regex('empty')).test($('#login_pwd').val()) == false) {
			$('.msg-error').removeClass('hide');
			$('.msg-error').html('<b></b>' + tip('122'));
			return false;
		}
		if (new RegExp(regex('empty')).test($('#login_code').val()) == false) {
			$('.msg-error').removeClass('hide');
			$('.msg-error').html('<b></b>' + tip('124'));
			return false;
		}
		$.ajax({
			url : '/beio/sys/login',
			data : {
				'mr.mobile' : $('#login_mobile').val(), 
				'mr.password' : $('#login_pwd').val(), 
				'mr.imgVerifyCode' : $('#login_code').val(), 
			},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					if($('#autoLogin').attr('checked') == 'checked'){
						localStorage.setItem('mobile', data.result.mobile);
						localStorage.setItem('password', data.result.password);
					}
					$('.shadow').remove();
					callback(data.result);
				} else if (data.status == '120' || data.status == '122' || data.status == '124' || 
						data.status == '125' || data.status == '195' || data.status == '192' || data.status == '193') {
					$('.msg-error').removeClass('hide');
					$('.msg-error').html('<b></b>' + tip(data.status));
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

//初始化
function init(callback, marker, isIx){
	// 调用自动登录
	autologin(function(member){
		$('#hd').append(base.topHtml);
		$('#td').append(base.btmHtml);
		if (member != '' && member != null && member != undefined) {
			if (member.expire == false) {
				$('.logo_line').append('\
					<div class="new_cart">\
						<a href="buycart.html"><i class="icon_card"></i>购物车<b id="cart_num"></b></a>\
					</div>\
					<div class="new_order">\
						<a href="myorder.html">我的订单<b id="order_num"></b></a>\
					</div>');
				$('.hi').html('<b>尊敬的会员<span>'+(member.nickName == '' ? member.mobile : member.nickName)+'</span>,您好。</b>');
			}else {
				$('.hi').html('<b>尊敬的用户<span>'+(member.nickName == '' ? member.mobile : member.nickName)+'</span>,您好。</b>');
			}
			$('.head_operate_nav').html('<b><li><a href="myinfo.html">个人中心</a></li><li><a href="javascript:void(0);" id="logout">注销</a></li></b>');
		}
		// 初始话头部
		$.ajax({
			url : '/beio/goods/queryTop',
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					// 热搜
					$.each(data.result.searchs, function(i, item){
						$('.search_hot').append('<a href="javascript:void(0);">' + item.keyword + '</a>');
					});
					// 分类
					$.each(data.result.classifys, function(i, item){
						if(item.level == '1' && item.showAbeam == '1'){
							$('.nav_top > ul').append('<li><a href="search.html?category='+item.id+'">'+item.name+'</a></li>');
						}
						if(item.level == '1'){
							$('.new_pub_nav').append('<li id="nav_'+item.id+'" class="navli"><span class="nav"><a href="search.html?category='+item.id+'">'+item.name+'</a></span></li>');
							$('.new_pub_nav').after('<div id="nav_'+item.id+'_child" class="new_pub_nav_pop"><div class="pop_column"></div></div>');
						}else if(item.level == '2'){
							if($('#nav_'+item.pid+'_child') != null && $('#nav_'+item.pid+'_child') != undefined){
								$('#nav_'+item.pid+'_child > .pop_column').append('<div class="pop_row"><a href="search.html?category='+item.id+'">'+item.name+'</a></div>');
							}
						}
					});
					// 购物车
					if(data.result.member != null && data.result.member != undefined && data.result.member.expire == false){
						$('#cart_num').html(data.result.cartNum > 99 ? '99+' : data.result.cartNum);
					}
					var hideMenu = undefined;
					// 非首页
					if(isIx != true) {
						// 菜单展开
						$('.all').hover(function(){
							window.clearTimeout(hideMenu);
							$('.home_nav_l').css('display', 'block');
						}, function(){
							hideMenu = setTimeout(function(){
								$('.home_nav_l').css('display', 'none');
							}, 100);
						});
						// 菜单收起
						$('.home_nav_l').hover(function(){
							window.clearTimeout(hideMenu);
						}, function(){
							hideMenu = setTimeout(function(){
								$('.home_nav_l').css('display', 'none');
							}, 100);
						});
						// 二级菜单
						$('.home_nav_l > .new_pub_nav > .navli').hover(function(){
							$('.navli').removeClass('on');
							$('.new_pub_nav_pop').css('display', 'none');
							$(this).addClass('on');
							$('#'+$(this).attr('id')+'_child').css('display', 'block');
						}, function(){return false;});
					}
					// 搜索
					$('#searchBtn').click(function(){
						window.location.href = 'search.html?keyword=' + $('#searchInp').val();
					});
					// 热搜
					$('.search_hot > a').click(function(){
						window.location.href = 'search.html?keyword=' + $(this).html();
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
					// 回调
					callback(data.result.member);
				} else {
					alert(tip('400'));
				};
			},
			error : function() {
				alert(tip('500'));
			}
		});
	}, marker);
}
