$(function(){
	initHtml();
	var search = window.location.search.substring(1);
	var params = search.split("&");
	var brand = '', category = '', keyword = '';
	$.each(params, function(index, item){
		param = item.split("=");
		if(param[0] == 'category'){
			category = param[1];
		}else if(param[0] == 'brand'){
			brand = param[1];
		}else if(param[0] == 'keyword'){
			keyword = decodeURI(param[1]);
		}
	});
	$.ajax({
		url : '/beio/goods/querySearchInfo',
		data : {
			'searchInfo.brand' : brand,
			'searchInfo.category' : category, 
			'searchInfo.keyword' : keyword},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				$('.a').attr('href', 'search.html?brand='+brand+'&keyword='+keyword);
				$.each(data.result.navClassifys, function(i, item){
					$('.crumbs_fb_left').append('<span class="sp">&gt;</span><span class="sp"><a href="search.html?brand='+
							brand+'&category='+item.id+'&keyword='+keyword+'" class="a">'+item.name+'</a></span>');
				});
				$.each(data.result.classifys, function(i, item){
					$('.classify').append('<span><a href="search.html?brand='+brand+'&category='+
							item.id+'&keyword='+keyword+'" title="'+item.name+'"><em></em>'+item.name+'</a></span>');
				});
				$('.classify').append('<span></span>');
				$.each(data.result.brands, function(i, item){
					$('.brands').append('<span><a href="search.html?brand='+item.id+'&category='+
							category+'&keyword='+keyword+'" title="'+item.name+'"><em></em>'+item.name+'</a></span>');
				});
			} else {
				alert(tip('400'));
			}
		},
		error : function() {
			alert(tip('500'));
		}
	});
	// 排序悬浮事件
	$('.tools_to_float:not(.price)').hover(function(){
		$(this).addClass('hover');
	}, function(){
		$(this).removeClass('hover');
	});
	// 排序点击事件
	$('.tools_to_float:not(.price)').click(function(){
		$('.tools_to_float').removeClass('on');
		$(this).addClass('on');
	});
	// 价格获取焦点事件
	$('.interval > .inner > .text').focus(function(){
		$('.interval').addClass('interval_on');
		$('.interval > .inner > .text').addClass('text_hover');
	});
	// 价格失去焦点事件
	$('.interval').hover(null, function(){
		$('.interval').removeClass('interval_on');
		$('.interval > .inner > .text').removeClass('text_hover');
		$('.interval > .inner > .text').blur();
	});
	// 清空价格
	$('.btn_clear').click(function(){
		$('.interval > .inner > .text').val('');
	});
});