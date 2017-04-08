$(function(){
	$.ajax({
		url : '/beio/gdslinbo/queryLinbo.action',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.resp == '1') {
				$.each(data.data, function(index, item){
					$('#slidecontent').append('<li><a href="'+item.url+'"><img src="'+item.picPath+'" width="772" height="310"></a></li>');
					$('#slidelabel_nav').append('<li>'+(index+1)+'</li>');
				});
			}else {
				alert(data.msg);
			}
		},
		error : function(){}
	});
	$.ajax({
		url : '/beio/gdscategory/queryIndexHotGoods.action',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.resp == '1') {
				var ms = data.res;
				$.each(data.data, function(index, item){
					if(item.gdvs.length > 0){
						$('.shoplist').append('<div class="home_classify"><div class="head"><span class="title">'+item.name+'</span></div><ul class="bigimg cloth_shoplist"></ul></div>');
						$.each(item.gdvs, function(index, item){
							var picPath = item.pics.length > 0 ? picPath = item.pics[0].midPath : "";
							var priceHM = ms == '0' 
								? '<span class="price_n">'+item.mPrice+'</span><span class="price_r">'+item.cPrice+'</span>'
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
			}else {
				alert(data.msg);
			}
		},
		error : function(){}
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
	// 轮播首图展示
	if($('.pic > li').size() == 1){
		$('.pic > li').eq(0).fadeIn();
		$('.tab > li').eq(0).addClass('on');
	}
	// 自动轮播图
	if($('.pic > li').size() > 1){
		$('.pic > li').eq(0).fadeIn();
		$('.tab > li').eq(0).addClass('on');
		setInterval(function(){
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
		}, 4000);
	};
	// 轮播按钮事件
	$('.tab > li').hover(function(){
		$('.pic > li').fadeOut();
		$('.pic > li').eq($(this).index()).fadeIn();
		$('.tab > li').removeClass('on');
		$(this).addClass('on');
	},function(){return false;});
});