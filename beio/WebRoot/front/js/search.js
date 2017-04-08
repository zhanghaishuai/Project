$(function(){
	var search = window.location.search.substring(1);
	var params = search.split("&");
	var category = '', keyword = '';
	$.each(params, function(index, item){
		param = item.split("=");
		if(param[0] == 'category'){
			category = param[1];
		}else if(param[0] == 'keyword'){
			keyword = decodeURI(param[1]);
		}
	});
	if (category != '') {
		$.ajax({
			url : '/beio/gdscategory/querySearchTopCategory.action',
			data : {'gcg.id' : category},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.resp == '1') {
					$.each(data.data, function(index, item){
						
					});
				}else {
					alert(data.msg);
				}
			},
			error : function(){}
		});
	}
	
	
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