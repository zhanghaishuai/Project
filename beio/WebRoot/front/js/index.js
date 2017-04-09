$(function(){
	initHtml(true);
	$.ajax({
		url : '/beio/goods/queryIndexInfo',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				JSON.stringify(data);
				$.each(data.result.banners, function(i, item){
					$('#slidecontent').append('<li><a href="'+item.url+'"><img src="'+item.path+'" width="772" height="310"></a></li>');
					$('#slidelabel_nav').append('<li>'+(++i)+'</li>');
				});
				$.each(data.result.classifys, function(i, item){
					if((item.goods != null && item.goods.length > 0)){
						$('.shoplist').append('<div class="home_classify"><div class="head"><span class="title">'+item.name+'</span></div><ul class="bigimg cloth_shoplist"></ul></div>');
						$.each(item.goods, function(i, item){
							var picPath = (item.shows != null && item.shows.length > 0) ? picPath = item.shows[0].midPath : "";
							var priceHM = data.result.login ? 
								'<span class="price_n">'+item.mPrice+'</span><span class="price_r">'+item.cPrice+'</span>'
									: '<span class="price_n">'+item.cPrice+'</span>';
							$('.cloth_shoplist:last').append('<li><a href="goods.html?goods='
									+item.id+'" class="pic" title="'+item.name+'"><img src="'
									+picPath+'" width="200" height="200"></a><p class="price">'
									+priceHM+'</p><p class="name"><a href="goods.html?goods='
									+item.id+'">'+item.name+'</a></p><p class="search_hot_word">'
									+item.descr+'</p></li>');
						});
					}
				});
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
	var bi = setInterval("linbo()", 4000);
	// 轮播首图
	if($('.pic > li').size() == 1){
		$('.pic > li').eq(0).fadeIn();
		$('.tab > li').eq(0).addClass('on');
	}
	// 自动轮播图
	if($('.pic > li').size() > 1){
		$('.pic > li').eq(0).fadeIn();
		$('.tab > li').eq(0).addClass('on');
	};
	// 轮播按钮事件
	$('.tab > li').hover(function(){
		window.clearInterval(bi);
		$('.pic > li').fadeOut();
		$('.pic > li').eq($(this).index()).fadeIn();
		$('.tab > li').removeClass('on');
		$(this).addClass('on');
	}, function(){
		bi = setInterval("linbo()", 4000);
	});
	// 轮播图片事件
	$('.pic > li').hover(function(){
		window.clearInterval(bi);
	}, function(){
		bi = setInterval("linbo()", 4000);
	});
});
function linbo(){
	$('.pic > li').each(function(){
		if($(this).css('display') == 'list-item'){
			$(this).fadeToggle();
			$('.tab > li').eq($(this).index()).removeClass('on');
			if($(this).index() == ($('.pic > li').size()-1)){
				$('.pic > li').eq(0).fadeToggle();
				$('.tab > li').eq(0).addClass('on');
			}else{
				$(this).next().fadeToggle();
				$('.tab > li').eq($(this).next().index()).addClass('on');
			}
			return false;
		}
	});
};