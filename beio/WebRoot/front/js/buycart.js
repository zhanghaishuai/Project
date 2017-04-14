$(function(){
	autologin(function(member){
		$.ajax({
			url : '/beio/goods/queryBuycart',
			type : 'POST',
			cache : true,
			async : false,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$.each(data.result, function(i, item){
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
														<a href="#">\
															<img src="'+smaImg+'" width="80" height="80">\
														</a>\
													</td>\
													<td class="row_name">\
														<div class="name">\
															<a href="#" title="'+item.goods.name+'" style="word-break:break-all;word-wrap:break-word;">'+item.goods.name+'</a>\
														</div>\
													</td>\
													<td class="row_single row3">\
														<span class="red">¥<em class="mprice">'+item.goods.mPrice+'</em></span>\
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
							'gdsBuycart.id' : $(this).parents('.bb_none').attr('id'), 
							'gdsBuycart.quantity' : goodsNum
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
							'gdsBuycart.id' : $(this).parents('.bb_none').attr('id'), 
							'gdsBuycart.exist' : '0'
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
								'gdsBuycart.id' : ele.attr('id'), 
								'gdsBuycart.exist' : '0'
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
					
					// 商品结算
					$('.fn-checkout').click(function(){
						$.each($('.fn-product-check.check_on').parents('.bb_none'), function(i, item){
							var ele = $(item);
							editBuycart({
								'gdsBuycart.id' : ele.attr('id'), 
								'gdsBuycart.exist' : '0'
							}, function(){
								ele.parents('.fn-shop').remove();
							});
						});
					});
					
					// 刷新价格
					refreshPrice();
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