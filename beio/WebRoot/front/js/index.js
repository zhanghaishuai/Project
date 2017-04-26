$(function(){
	init(function(){
		$.ajax({
			url : '/beio/goods/queryIndexInfo',
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$('#bd').append('\
						<div class="con bd_body">\
							<div class="home_circle_c">\
								<div class="focus_box hover">\
									<div id="slidecontentbox">\
										<ul class="pic" id="slidecontent"></ul>\
									</div>\
							        <ul class="tab" id="slidelabel_nav"></ul>\
							    </div>\
							</div>\
							<div class="con shoplist"></div>\
						</div>');
					$.each(data.result.banners, function(i, item){
						$('#slidecontent').append('<li><a href="'+item.url+'"><img src="'+item.path+'" width="772" height="310"></a></li>');
						$('#slidelabel_nav').append('<li>'+(++i)+'</li>');
					});
					$.each(data.result.classifys, function(i, item){
						if((item.goods != null && item.goods.length > 0)){
							$('.shoplist').append('<div class="home_classify"><div class="head"><span class="title">'+item.name+'</span></div><ul class="bigimg cloth_shoplist"></ul></div>');
							$.each(item.goods, function(i, item){
								var picPath = (item.shows != null && item.shows.length > 0) ? picPath = item.shows[0].midPath : "";
								var priceHM = '<span class="price_n">'+parseFloat(item.cPrice).toFixed(2)+'</span>';
								if(data.result.member != null && data.result.member != undefined && data.result.member.expire == false){
									priceHM = '<span class="price_n">'+parseFloat(item.mPrice).toFixed(2)+'</span><span class="price_r">'+parseFloat(item.cPrice).toFixed(2)+'</span>';
								}
								$('.cloth_shoplist:last').append('<li><a href="goods.html?goods='
										+item.id+'" class="pic" title="'+item.name+'"><img src="'
										+picPath+'" width="200" height="200"></a><p class="price">'
										+priceHM+'</p><p class="name"><a href="goods.html?goods='
										+item.id+'">'+item.name+'</a></p><p class="search_hot_word">'
										+item.descr+'</p></li>');
							});
						}
					});
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
	}, false, true);
});

// 轮播
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