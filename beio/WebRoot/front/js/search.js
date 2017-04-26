$(function(){
	init(function(){
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
			}else if(param[0] == 'order'){
				order = param[1];
			}else if(param[0] == 'index'){
				pageIndex = param[1];
			}else if(param[0] == 'keyword'){
				keyword = decodeURI(param[1]);
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
				'searchInfo.order' : order,
				'searchInfo.brand' : brand,
				'searchInfo.category' : category, 
				'searchInfo.keyword' : keyword,
				'searchInfo.pageIndex' : pageIndex,
				'searchInfo.minPrice' : minPrice,
				'searchInfo.maxPrice' : maxPrice
			},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$('#bd').append('\
						<div class="con contain">\
							<div class="spacer"></div>\
							<div class="crumbs_fb clearfix">\
					  			<div class="crumbs_fb_left">\
					      			<span class="sp"><a href="search.html" class="a">所有分类</a></span>\
					  			</div>\
							</div>\
							<div class="spacer"></div>\
							<div class="filtrate_box clearfix">\
					       		<ul class="filtrate_list first_sort" style="height: auto;">\
					       			<li class="child_li" style="display:block;">\
					                   <div class="list_left" title="品牌">品牌</div>\
					                   <div class="list_right">\
					                       <div class="list_content fix_list">\
					                           <div class="clearfix brands"></div>\
					                       </div>\
					                   </div>\
					               	</li>\
									<li class="child_li classifytop" style="display:block;">\
					                   <div class="list_left" title="分类">分类</div>\
					                   <div class="list_right">\
					                       <div class="list_content fix_list">\
					                           <div class="clearfix classify"></div>\
					                       </div>\
					                   </div>\
					               	</li>\
					           	</ul>\
							</div>\
							<div class="spacer"></div>\
							<div>\
								<div class="tools_box bg_change">\
					   				<div class="top">\
								        <ul class="sorting_box">\
								            <li class="tools_to_float price" style="width: 66px;">\
								                <a href="#" class="sorting_box_a" title="点击后按价格由低到高">价格<span class="icon"></span></a>\
								            </li>\
								            <li class="price">\
								                <div class="interval">\
								                    <div class="inner">\
								                        <input type="text" class="min text" title="最低价" value="">\
								                        	<span>-</span>\
								                        <input type="text" class="max text" title="最高价" value="">\
								                    </div>\
								                </div>\
								                <input type="button" class="button btn_yes" value="确定">\
								            </li>\
								        </ul>\
									</div>\
								</div>\
							</div>\
							<div class="spacer"></div>\
						</div>\
						<div class="spacer"></div>\
						<div class="con cloth_good_sort clearfix">\
							<div class="col cloth_good_left">\
								<div class="spacer"></div>\
								<div class="">\
									<div class="con shoplist">\
										<div id="search_nature_rg">\
											<ul class="bigimg cloth_shoplist"></ul>\
										</div>\
									</div>\
								</div>\
								<div class="spacer"></div>\
								<div class="">\
									<div class="con paginating clearfix">\
					   					<div class="paging">\
					       					<ul></ul>\
										</div>\
									</div>\
								</div>\
							</div>\
						</div>');
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
						if (data.result.brand == item.id) {
							$('.brands').append('<span><a style="border: 1px solid #35679a;background-color:#f5f5f5" href="search.html?brand='+item.id+'&category='+category+'&keyword='+
									keyword+'" title="'+item.name+'"><em></em>'+item.name+'</a></span>');
						}else {
							$('.brands').append('<span><a href="search.html?brand='+item.id+'&category='+category+'&keyword='+
									keyword+'" title="'+item.name+'"><em></em>'+item.name+'</a></span>');
						}
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
							var priceH = '<span class="price_n">'+parseFloat(item.cPrice).toFixed(2)+'</span>';
							if(data.result.member != null && data.result.member != undefined && data.result.member.expire == false){
								priceH = '<span class="price_n">'+parseFloat(item.mPrice).toFixed(2)+'</span><span class="price_r">'+parseFloat(item.cPrice).toFixed(2)+'</span>';
							}
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
			$(this).css('border', '1px solid #35679a');
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
		//  跳转
		$('.jump').click(function(){
			if (new RegExp(regex('page')).test($('.number').val()) == false) {
				$('.number').select();
			}else {
				window.location.href="search.html?brand="+brand+"&category="+category+"&keyword="
					+keyword+"&index="+$('.number').val()+"&order="+order+"&minPrice="+minPrice+"&maxPrice="+maxPrice;
			}
		});
	}, false);
});