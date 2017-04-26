$(function(){
	autologin(function(member){
		$('#hd1').append('\
			<div class="logo_line">\
			    <div class="w960">\
			        <div class="shopping_procedure"><span class="current">我的购物车</span><span>填写订单</span><span>完成订单</span></div>\
			        <div class="logo1"><a href="index.html"><img src="image/logo1.png" height="72" style="margin-top: 10px;"></a></div>\
			    </div>\
			</div>');
		$('#td').append(base.btmHtml);
		$.ajax({
			url : '/beio/goods/queryBuycart',
			type : 'POST',
			cache : true,
			async : false,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					if (data.result.member != null && data.result.member != undefined && data.result.member.expire == false) {
						$('#bd').append('\
							<div class="w960 real">\
								 <div class="checkout_tip"></div>\
							    <ul class="shopping_title">\
							        <li class="f1">&nbsp;</li>\
							        <li class="f2">商品信息</li>\
							        <li class="f3">单价（元）</li>\
							        <li class="f4">数量</li>\
							        <li class="f4">金额（元）</li>\
							        <li class="f5">操作</li>\
							    </ul>\
							    <div class="shoppingcart_loading"></div>\
							</div>\
							<div class="real" style="position:static;bottom:-20px;z-index:101;width:100%;left:0px;">\
							  <div class="shopping_total">\
							    <div class="shopping_total_right">\
							        <a class="total_btn fn-checkout" href="javascript:void(0);">结&nbsp;&nbsp;算</a>\
							        <div class="subtotal">\
							            <p><span class="cartsum">总计(不含运费)：</span><span style="color:#ff2832;font-size:18px;">¥<em id="payAmount" class="price">0.00</em></span></p>\
							        </div>\
							    </div>\
							    <div class="shopping_total_left">\
							        <a href="javascript:void(0)" class="checknow fn-checkall check_on"></a>全选\
							        <a href="javascript:void(0)" class="fn-batch-remove">批量删除</a>\
							        <span>已选择<span style="color:red" class="totalGoodsNum">0</span>件商品</span>\
							        <div style="z-index:-1;left:0px;display:none;" class="pop_del">\
							        	<p>您确定要批量删除商品吗？</p>\
							        	<a href="javascript:;" class="pop_btn fn-confirm-batchremovebox">确定</a>\
							        	<a href="javascript:;" class="pop_btn fn-close-batchremovebox">取消</a>\
							        </div>\
							    </div>\
							  </div>\
							</div>\
							<div class="w960">\
							    <div class="empty" id="empty" style="display: none;">\
							        <p>您的购物车还是空的，您可以：</p>\
							        <a href="index.html" class="btn">去逛逛</a>\
							    </div>\
							</div>');
						$.each(data.result.buycarts, function(i, item){
							if(item.goods != null) {
								var smaImg = item.goods.shows.length>0?item.goods.shows[0].smaPath:'';
								$('.shopping_title').after('\
									<div class="fn-shop">\
								    	<div class="shopping_list">\
								    		<table>\
								    			<tbody>\
								    				<tr id="'+item.id+'" class="bb_none">\
								    					<td class="row_check row1">\
															<a href="javascript:void(0)" class="fn-product-check checknow check_on">选中</a>\
														</td>\
														<td class="row_img">\
															<a href="goods.html?goods='+item.goodsID+'">\
																<img src="'+smaImg+'" width="80" height="80">\
															</a>\
														</td>\
														<td class="row_name">\
															<div class="name">\
																<a href="goods.html?goods='+item.goodsID+'" title="'+item.goods.name+'" style="word-break:break-all;word-wrap:break-word;">'+item.goods.name+'</a>\
															</div>\
														</td>\
														<td class="row_single row3">\
															<span class="red">¥<em class="mprice">'+parseFloat(item.goods.mPrice).toFixed(2)+'</em></span>\
														</td>\
														<td class="fn-count-tip row3">\
															<span class="amount fn-updatecount">\
																<a href="javascript:void(0)">-</a>\
																<input class="goodsNum" value="'+item.quantity+'" type="text">\
																<a href="javascript:void(0)">+</a>\
															</span>\
														</td>\
														<td class="row_amount row4">\
															<span class="red">¥<em class="aprice">'+(item.goods.mPrice*item.quantity).toFixed(2)+'</em></span>\
														</td>\
														<td class="row_delete row5">\
															<span>\
																<a href="javascript:void(0)" class="fn-remove-product">删除</a>\
															</span>\
														</td>\
													</tr>\
												</tbody>\
											</table>\
										</div>\
									</div>');
							}
						});
						
						// 选择
						$('.fn-product-check, .fn-checkall').click(function(){
							if($(this).hasClass('check_on')){
								$(this).removeClass('check_on');
							}else{
								$(this).addClass('check_on');
							}
							if($(this).hasClass('fn-checkall') == true){
								if($(this).hasClass('check_on') == true){
									$('.fn-product-check').addClass('check_on');
								}else{
									$('.fn-product-check').removeClass('check_on');
								}
							} else {
								var isAll = true;
								$('.fn-product-check').each(function(){
									if($(this).hasClass('check_on') == false){
										isAll = false;
									}
								});
								isAll ? $('.fn-checkall').addClass('check_on') 
										: $('.fn-checkall').removeClass('check_on');
							}
							refreshPrice();
						});
						
						// 数量
						$('.fn-count-tip a').click(function(){
							var ele = $(this);
							var goodsNum = parseInt($(this).siblings('.goodsNum').val());
							if($(this).index() == 0){
								goodsNum = goodsNum <= 1 ? 1 : --goodsNum;
							}else{
								++goodsNum;
							}
							editBuycart({
								'buycartVO.id' : $(this).parents('.bb_none').attr('id'), 
								'buycartVO.quantity' : goodsNum
							}, function(buycart){
								ele.siblings('.goodsNum').val(buycart.quantity);
								ele.parents('.bb_none').find('.aprice').html((buycart.quantity * 
										ele.parents('.bb_none').find('.mprice').html()).toFixed(2));
							});
							refreshPrice();
						});
						
						// 删除
						$('.fn-remove-product').click(function(){
							var ele = $(this);
							editBuycart({
								'buycartVO.id' : $(this).parents('.bb_none').attr('id'), 
								'buycartVO.exist' : '0'
							}, function(){
								ele.parents('.fn-shop').remove();
							});
							refreshPrice();
						});
						
						// 批量删除
						$('.fn-batch-remove').click(function(){
							if($('.pop_del').css('display') == 'none'){
								$('.pop_del').css('display', 'block');
							}else{
								$('.pop_del').css('display', 'none');
							}
						});
						
						// 确定删除
						$('.fn-confirm-batchremovebox').click(function(){
							$.each($('.fn-product-check.check_on').parents('.bb_none'), function(i, item){
								var ele = $(item);
								editBuycart({
									'buycartVO.id' : ele.attr('id'), 
									'buycartVO.exist' : '0'
								}, function(){
									ele.parents('.fn-shop').remove();
								});
							});
							$('.pop_del').css('display', 'none');
							refreshPrice();
						});
						
						// 取消删除
						$('.fn-close-batchremovebox').click(function(){
							$('.pop_del').css('display', 'none');
						});
						// 刷新价格
						refreshPrice();
					}else {
						alert('只有会员才可以购买商品，请先开通会员。');
						window.location.href = 'myrfee.html';
					}
				} else if (data.status == '170') {
					alert(tip(data.status));
				} else {
					alert(tip('400'));
				};
			},
			error : function() {
				alert(tip('500'));
			}
		});
	});
});

// 刷新价格
function refreshPrice(){
	var priveAmount = 0, goodsNum = 0;
	$('.row_check > a').each(function(){
		if($(this).hasClass('check_on') == true){
			goodsNum += parseInt($(this).parents('.bb_none').find('.goodsNum').val());
			priveAmount += parseInt($(this).parents('.bb_none').find('.aprice').html());
		}
	});
	$('.price').html(priveAmount.toFixed(2));
	$('.totalGoodsNum').html(goodsNum);
	if($('.fn-shop').size() < 1){
		$('.real').css('display', 'none');
		$('.empty').css('display', 'block');
	};
	// 商品结算
	if ($('.fn-product-check.check_on').parents('.bb_none').size() > 0) {
		$('.fn-checkout').removeClass('adisabled');
		$('.fn-checkout').click(function(){
			var params = new Array();
			$.each($('.fn-product-check.check_on').parents('.bb_none'), function(i, item){
				var ele = $(item);
				params[i] = ele.attr('id');
			});
			sessionStorage.setItem('orderBuyIDs', params);
			window.location.href='order.html';
		});
	}else {
		$('.fn-checkout').addClass('adisabled');
		$('.fn-checkout').unbind();
	}
}

// 编辑购物车
function editBuycart(options, callback){
	$.ajax({
		url : '/beio/goods/editBuycart',
		data : options,
		type : 'POST',
		cache : true,
		async : false,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				callback(data.result);
			} else if (data.status == '170' || data.status == '136') {
				alert(tip(data.status));
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
}