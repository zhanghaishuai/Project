$(function(){
	
	/*// 切换账户登录
	$('#login_box_btn').click(function(){
		// <a> 选中
		$('#qrcode_login_btn').attr('class', '');
		$('#login_box_btn').attr('class', 'checked');
		// 隐藏微信登录相关
		$('#qrcode_login').attr('style', 'display: none; visibility: hidden;');
		// 显示账户登录相关
		$('#login_box').attr('style', 'display: block; visibility: visible;');
	});
	
	// 切换微信登录
	$('#qrcode_login_btn').click(function(){
		// <a> 选中
		$('#login_box_btn').attr('class', '');
		$('#qrcode_login_btn').attr('class', 'checked');
		// 隐藏账户登录相关
		$('#login_box').attr('style', 'display: none; visibility: hidden;');
		// 显示微信登录相关
		$('#qrcode_login').attr('style', 'display: block; visibility: visible;');
	});*/
	
	// 自动登录
	$('#autoLogin').click(function(){
		if($('#autoLogin').attr('checked') == 'checked'){
			$('#msg-warn').removeClass('hide');
			$('#msg-warn').html('<b></b>公共场所不建议自动登录，以防账号丢失');
		}else{
			$('#msg-warn').addClass('hide');
			$('#msg-warn').html('');
		}
	});
	
	$('#changeCode').click(function(){
		$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr'+new Date().getTime());
	});
	
	$('.verify-code').click(function(){
		$('.verify-code').attr('src', '/beio/image/verifyCode?flushStr'+new Date().getTime());
	});
	
	$('#loginsubmit').click(function(){
		if (new RegExp(regex('empty')).test($('#login_mobile').val()) == false) {
			$('#msg-warn').removeClass('hide');
			$('#msg-warn').html('<b></b>' + tip('120'));
			return false;
		}
		if (new RegExp(regex('empty')).test($('#login_pwd').val()) == false) {
			$('#msg-warn').removeClass('hide');
			$('#msg-warn').html('<b></b>' + tip('122'));
			return false;
		}
		if (new RegExp(regex('empty')).test($('#login_code').val()) == false) {
			$('#msg-warn').removeClass('hide');
			$('#msg-warn').html('<b></b>' + tip('124'));
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
					window.location.href = 'index.html';
				} else if (data.status == '120' || data.status == '122' || data.status == '124' || 
						data.status == '125' || data.status == '190' || data.status == '192' || data.status == '193') {
					$('#msg-warn').removeClass('hide');
					$('#msg-warn').html('<b></b>' + tip(data.status));
				} else {
					alert(tip('400'));
				};
			},
			error : function() {
				alert(tip('500'));
			}
		});
	});
	
	/* 登录页动态推荐
	var data = [{src:"image/58bd1926N9e73f2b7.jpg"
		,bgColor:"#EBE4DA"
		,weight: ""}
	,{src:"image/58be4405N80058035.jpg"
		,bgColor:"#E93854"
		,weight: ""}
	,{src:"image/58c66d01Neeb9cf5a.jpg"
		,bgColor:"#386eda"
		,weight: "4"}						
	,{src:"image/58c5fc23N6d55df66.jpg"
		,bgColor:"#E93854"
		,weight: ""}];						         
	var getRandom = function (arr){
		var _temp = 0, _random = 0, _weight, _newArr = [];						
		for (var i = 0; i < arr.length; i++) {
			_weight = arr[i].weight ? parseInt(arr[i].weight) : 1;				
			_newArr[i] = [];				
			_newArr[i].push(_temp);				
			_temp += _weight;				
			_newArr[i].push(_temp);			
		}						
		_random = Math.ceil(_temp * Math.random());						
		for (var i = 0; i< _newArr.length; i++){				
			if(_random > _newArr[i][0] && _random <= _newArr[i][1]){					
				return arr[i];				
			}			
		}
	};				
	var tpl = '<div class="login-banner" style="background-color: {bgColor}">\
					<div class="w">\
						<div id="banner-bg" class="i-inner" style="background: url({imgURI}) 0px 0px no-repeat;background-color: {bgColor}"></div>\
					</div>\
				</div>';							
	var bgData = getRandom(data);		
	var bannerHtml = tpl.replace(/{bgColor}/g, bgData.bgColor).replace(/{imgURI}/g, bgData.src);				
	$('.login-banner').replaceWith(bannerHtml); */
});
