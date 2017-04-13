$(function(){
	initHtml();
	var search = window.location.search.substring(1);
	var params = search.split("&");
	var brand = '', category = '', keyword = '', pageIndex = ''
		, order = '', minPrice = '', maxPrice = '';
	$.each(params, function(index, item){
		param = item.split("=");
		if(param[0] == 'category'){
			category = param[1];
		}else if(param[0] == 'brand'){
			brand = param[1];
		}else if(param[0] == 'keyword'){
			keyword = decodeURI(param[1]);
		}else if(param[0] == 'index'){
			pageIndex = param[1];
		}else if(param[0] == 'order'){
			order = param[1];
		}else if(param[0] == 'minPrice'){
			minPrice = param[1];
		}else if(param[0] == 'maxPrice'){
			maxPrice = param[1];
		}
	});
	if(keyword!=''&&keyword!=null&&keyword!=undefined){
		$('#searchInp').val(keyword);
		$('#searchInp').attr('placeholder', keyword);
	}
	$.ajax({
		url : '/beio/goods/querySearchInfo',
		data : {
			'searchInfo.brand' : brand,
			'searchInfo.category' : category, 
			'searchInfo.keyword' : keyword,
			'searchInfo.pageIndex' : pageIndex,
			'searchInfo.order' : order,
			'searchInfo.minPrice' : minPrice,
			'searchInfo.maxPrice' : maxPrice
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				$('.a').attr('href', 'search.html?brand='+brand+'&category=&keyword='+keyword);
				$.each(data.result.navClassifys, function(i, item){
					$('.crumbs_fb_left').append('<span class="sp">&gt;</span><span class="sp"><a href="search.html?brand='+
							brand+'&category='+item.id+'&keyword='+keyword+'" class="a">'+item.name+'</a></span>');
				});
				if (data.result.classifys.length > 0) {
					$.each(data.result.classifys, function(i, item){
						$('.classify').append('<span><a href="search.html?brand='+brand+'&category='+item.id+'&keyword='+
								keyword+'" title="'+item.name+'"><em></em>'+item.name+'</a></span>');
					});
				}else {
					$('.classifytop').remove();
				}
				$.each(data.result.brands, function(i, item){
					$('.brands').append('<span><a href="search.html?brand='+item.id+'&category='+category+'&keyword='+
							keyword+'" title="'+item.name+'"><em></em>'+item.name+'</a></span>');
				});
				if(data.result.order == '1') {
					$('.tools_to_float.price').addClass('top');
				}else if(data.result.order == '2') {
					$('.tools_to_float.new').addClass('on');
				}else if(data.result.order == '3') {
					$('.tools_to_float.new').addClass('top');
				}else {
					$('.tools_to_float.price').addClass('on');
				}
				$('.min').val(data.result.minPrice);
				$('.max').val(data.result.maxPrice);
				if (data.result.pageTotal > 0) {
					$.each(data.result.pageList, function(i, item){
						var priceH = data.result.login ? 
								'<span class="price_n">'+item.mPrice+'</span><span class="price_r">'+item.cPrice+'</span>'
									: '<span class="price_n">'+item.cPrice+'</span>';
						$('.cloth_shoplist').append('\
							<li>\
								<a href="goods.html?goods='+item.id+'" title="'+item.name+'">\
								<img src="'+(item.shows.length>0?item.shows[0].midPath:"")+'"/>\
							</a>\
							<p class="price">'+priceH+'</p>\
							<p class="name">\
								<a title="'+item.name+'" href="goods.html?goods='+item.id+'">\
									<span class="skcolor_ljg">'+item.name+'</span>\
								</a>\
							</p>\
							<p class="search_hot_word">'+item.descr+'</p>\
							</li>');
					});
					$('.paging > ul').append('<li class="prev"><a href="'+(data.result.pageIndex==1?"javascript:void(0);"
							:"search.html?brand="+brand+"&category="+category+"&keyword="+keyword+"&index="+(data.result.pageIndex - 1))
								+"&order="+order+"&minPrice="+minPrice+"&maxPrice="+maxPrice+'" title="上一页">上一页</a></li>');
					var begin = data.result.pageIndex<4||data.result.pageCount<6
						?1:data.result.pageCount-data.result.pageIndex<2
							?data.result.pageCount-4:data.result.pageIndex-2;
					var end = data.result.pageCount<6?data.result.pageCount:5;
					for(var i = 0; i < end; i++){
						$('.paging > ul').append('<li><a class='+(data.result.pageIndex==(begin+i)?"current":"1")+' href="'
							+(data.result.pageIndex==(begin+i)?"javascript:void(0);":"search.html?brand="+brand+"&category="+category+"&keyword="
								+keyword+"&index="+(begin+i))+"&order="+order+"&minPrice="+minPrice+"&maxPrice="+maxPrice+'">'+(begin+i)+'</a></li>');
					}
					$('.paging > ul').append('<li class="next"><a href="'+(data.result.pageIndex==data.result.pageCount?"javascript:void(0);"
							:"search.html?brand="+brand+"&category="+category+"&keyword="+keyword+"&index="+(data.result.pageIndex + 1))
								+"&order="+order+"&minPrice="+minPrice+"&maxPrice="+maxPrice+'" title="下一页">下一页</a></li>');
					$('.paging > ul').append('\
						<li class="page_input">\
            				<span>到第</span>\
            				<input id="t__cp" type="text" class="number" value="'+data.result.pageIndex+'">\
            				<span>页，共'+data.result.pageCount+'页</span>\
            				<input class="button jump" value="确定" type="button">\
            			</li>');
				}else {
					$('.cloth_good_sort').html('<div class="crumbs_fb clearfix" style="font-size:20px;margin-top:15px;">抱歉，没有找到相关商品！</div>');
				}
			} else {
				alert(tip('400'));
			}
		},
		error : function() {
			alert(tip('500'));
		}
	});
	$('.cloth_shoplist > li').hover(function(){
		$(this).css('border', '1px solid #ff0000');
	}, function(){
		$(this).css('border', '1px solid #ecebeb');
	});
	// 排序悬浮事件
	$('.tools_to_float').hover(function(){
		$(this).addClass('hover');
	}, function(){
		$(this).removeClass('hover');
	});
	// 排序点击事件
	$('.tools_to_float').click(function(){
		var o;
		if ($(this).hasClass('new')) {
			o = $(this).hasClass('top') ? "2" : "3";
		}else {
			o = $(this).hasClass('top') ? "" : "1";
		}
		window.location.href = "search.html?brand="+brand+"&category="+category+"&keyword="
			+keyword+"&index="+$('.number').val()+"&order="+o;
	});
	// 清空价格
	$('.btn_yes').click(function(){
		if (new RegExp(regex('empty')).test($('.min').val()) && new RegExp(regex('money')).test($('.min').val()) == false) {
			$('.min').select();
		}else if (new RegExp(regex('empty')).test($('.max').val()) && new RegExp(regex('money')).test($('.max').val()) == false) {
			$('.max').select();
		}else {
			window.location.href="search.html?brand="+brand+"&category="+category+"&keyword="
				+keyword+"&index=1"+"&order="+order+"&minPrice="+$('.min').val()+"&maxPrice="+$('.max').val();
		}
	});
	$('.jump').click(function(){
		if (new RegExp(regex('page')).test($('.number').val()) == false) {
			$('.number').select();
		}else {
			window.location.href="search.html?brand="+brand+"&category="+category+"&keyword="
				+keyword+"&index="+$('.number').val()+"&order="+order+"&minPrice="+minPrice+"&maxPrice="+maxPrice;
		}
	});
});