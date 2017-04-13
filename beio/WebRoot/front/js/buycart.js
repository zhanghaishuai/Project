$(function(){
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
		var price = parseInt($(this).siblings('input').val());
		if($(this).index() == 0){
			prive = price <= 1 ? 1 : --price;
		}else{
			++price;
		}
		$(this).siblings('input').val(price);
		$(this).parents('.fn-count-tip').siblings('.row_amount').find('span')
				.html('¥' + (price * parseFloat($(this).parents('.fn-count-tip')
				.siblings('.row_single').find('span').html().replace('¥',''))).toFixed(2));
		refreshPrice();
	});
	
	// 删除
	$('.fn-remove-product').click(function(){
		$(this).parents('.fn-shop').remove();
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
	
	// 取消删除
	$('.fn-close-batchremovebox').click(function(){
		$('.pop_del').css('display', 'none');
	});
	
	// 确定删除
	$('.fn-confirm-batchremovebox').click(function(){
		$('.fn-product-check.check_on').parents('.fn-shop').remove();
		$('.pop_del').css('display', 'none');
		refreshPrice();
	});
});

// 刷新价格
function refreshPrice(){
	var priveAmount = 0, goodsNum = 0;
	$('.row_check > a').each(function(){
		if($(this).hasClass('check_on') == true){
			goodsNum += parseInt($(this).parent()
				.siblings('.fn-count-tip').find('input').val());
			priveAmount += parseFloat($(this).parent()
				.siblings('.row_amount').find('span').html().replace('¥',''));
		}
	});
	$('.price').html(priveAmount.toFixed(2));
	$('.totalGoodsNum').html(goodsNum);
	if($('.fn-shop').size() < 1){
		$('.real').css('display', 'none');
		$('.empty').css('display', 'block');
	};
}