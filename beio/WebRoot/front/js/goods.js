$(function(){
	initHtml();
	var search = window.location.search.substring(1);
	var params = search.split("&"), goodsid = '', showImgs = [], detailsImgs = [], timer;
	$.each(params, function(index, item){
		param = item.split("=");
		if(param[0] == 'goods'){
			goodsid = param[1];
		}
	});
	$.ajax({
		url : '/beio/goods/queryGoodsInfo',
		data : {'goodsVO.id' : goodsid},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				showImgs = data.result.shows;
				if (showImgs.length > 0) {
					$('.largePic').attr('src', showImgs[0].midPath);
					$.each(showImgs, function(i, item){
						$('.dp_slide_box > ul').append('<li><img class="small" src="'+item.smaPath+'"></li>');
					});
				}
				timer = setInterval(function(){
					$.each(showImgs, function(i, item){
						if($('.largePic').attr('src') == item.midPath){
							$('.largePic').attr('src', showImgs[i==(showImgs.length-1)?0:(i+1)].midPath);
							return false;
						}
					});
				}, 4000);
				$('.largePic').hover(function(){
					window.clearInterval(timer);
				}, function(){
					timer = setInterval(function(){
						$.each(showImgs, function(i, item){
							if($('.largePic').attr('src') == item.midPath){
								$('.largePic').attr('src', showImgs[i==(showImgs.length-1)?0:(i+1)].midPath);
								return false;
							}
						});
					}, 4000);
				});
				$('.small').hover(function(){
					window.clearInterval(timer);
					var ele = $(this);
					$.each(showImgs, function(i, item){
						if(ele.attr('src') == item.smaPath){
							$('.largePic').attr('src', item.midPath);
							return false;
						}
					});
				}, function(){
					timer = setInterval(function(){
						$.each(showImgs, function(i, item){
							if($('.largePic').attr('src') == item.midPath){
								$('.largePic').attr('src', showImgs[i==(showImgs.length-1)?0:(i+1)].midPath);
								return false;
							}
						});
					}, 4000);
				});
				$('.name_info > h1').html(data.result.name);
				$('.name_info > h2 > span').html(data.result.descr);
				var priceElement = '';
				if(data.result.login){
					priceElement = '\
						<div class="price_d">\
	        				<p class="t">现价</p>\
	        				<p><span class="yen">¥</span>'+data.result.mPrice+'</p>\
	        			</div>\
	        			<div class="price_m price_m_t">原价</div>\
	        			<div class="price_m" id="original-price">\
							<span class="yen">¥</span>499.00'+data.result.cPrice+'\
						</div>';
				}else {
					priceElement = '\
						<div class="price_d">\
	        				<p class="t">现价</p>\
	        				<p><span class="yen">¥</span>'+data.result.cPrice+'</p>\
	        			</div>';
				}
				$('.price_pc').html(priceElement);
				$('.stock').html(data.result.stock);
				if (data.result.stock <= 0) {
					$('.buy_box_btn').html('<a href="javascript:;" class="btn btn_red btn_disabled">卖光了</a>');
				}else {
					$('.buy_box_btn').html('<a href="javascript:;" class="btn btn_red btn_cat hide">\
						<i class="cart"></i>加入购物车</a>\
							<!--<a href="javascript:;" class="btn btn_b btn_b_red">立即购买</a>-->');
				}
				detailsImgs = data.result.details;
				$.each(detailsImgs, function(i, item){
					$('.descrip > p').append('<img src="'+item.orgPath+'" width="930"><br/>');
				});
				$(".btn_cat").click(function(event){
					if (data.result.login) {
						var catSrc = $('.small').attr('src');
						var flyer = $('<img src="'+catSrc+'">');
						$.ajax({
							url : '/beio/goods/buyGoods',
							data : {
								'gdsBuycart.goodsID' : goodsid,
								'gdsBuycart.quantity' : $('#buy-num').val()
							},
							type : 'POST',
							async : false,
							cache : true,
							dataType : 'json',
							success : function(data) {
								if (data.status == '200') {
									cartNum = data.result;
									flyer.fly({
										start: {
											left: event.pageX - 27,
											top: event.pageY - 27
										},
										end: {
											left: $(".new_cart").offset().left+50,
											top: $(".new_cart").offset().top+50,
											width: 0,
											height: 0
										},
										onEnd: function(){
											$('#cart_num').html(cartNum > 99 ? '99+' : cartNum);
										}
									});
								}else if (data.status == '170' || data.status == '136') {
									alert(tip('170'));
								}else {
									alert(tip('400'));
								}
							},
							error : function() {
								alert(tip('500'));
							}
						});
					}else {
						alert(tip('194'));
					}
				});
				$('.num_add').click(function(){
					if(!isNaN(parseInt($('#buy-num').val()))){
						if (parseInt($('#buy-num').val()) <= parseInt($('.stock').html())) {
							$('#buy-num').val(parseInt($('#buy-num').val())+1);
						}
					}
				});
				$('.num_del').click(function(){
					if(!isNaN(parseInt($('#buy-num').val()))){
						if (parseInt($('#buy-num').val()) > 1) {
							$('#buy-num').val(parseInt($('#buy-num').val())-1);
						}
					}
				});
				$('#buy-num').blur(function(){
					$(this).val($(this).val().replace(/[^0-9]/g, ''));
					if (parseInt($('#buy-num').val()) > parseInt($('.stock').html())) {
						$(this).val($('.stock').html());
					} else if (new RegExp(regex('buyNum')).test($(this).val()) == false) {
						$(this).val('1');
					}
				});
				$('#buy-num').keyup(function(){
					$(this).val($(this).val().replace(/[^0-9]/g, ''));
					if (parseInt($('#buy-num').val()) > parseInt($('.stock').html())) {
						$(this).val($('.stock').html());
					} else if (new RegExp(regex('buyNum')).test($(this).val()) == false) {
						$(this).val('1');
					}
				});
				if(localStorage.getItem('historygoods') != null){
					var goods = JSON.stringify(data.result);
					var history = localStorage.getItem('historygoods').split('&&&&&', 5);
					$.each(history, function(i, item){
						var see = JSON.parse(item);
						var seeImg = see.shows.length>0?see.shows[0].smaPath:'';
						var seePrice = see.login?see.mPrice:see.cPrice;
						$('.list04').append('\
							<li>\
								<p class="pic">\
									<a href="#">\
										<img src="'+seeImg+'" title="'+see.name+'">\
									</a>\
								</p>\
								<p class="name">\
									<a href="goods.html?goods='+see.id+'" title="'+see.name+'">'+see.name+'</a>\
								</p>\
								<p class="price">\
									<span class="price_d">¥'+seePrice+'</span>\
								</p>\
							</li>');
						goods += '&&&&&'+item;
					});
					localStorage.setItem('historygoods', goods);
				}else {
					localStorage.setItem('historygoods', JSON.stringify(data.result));
				}
			} else {
				alert(tip('400'));
			}
		},
		error : function() {
			alert(tip('500'));
		}
	});
});