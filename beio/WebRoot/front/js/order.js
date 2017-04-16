$(function(){
	autologin(function(member){
		if (sessionStorage.getItem('orderBuyIDs') != null) {
			$.ajax({
				url : '/beio/goods/settlement',
				data : {'orderVO.cartIDs' : sessionStorage.getItem('orderBuyIDs').split(',')},
				type : 'POST',
				cache : true,
				async : false,
				dataType : 'json',
				traditional: true,
				success : function(data) {
					if (data.status == '200') {
						if(data.result.address.length > 0){
							$.each(data.result.address, function(i, item){
								var acv = item.isdefault == '1' ? 'active' : '';
								var def = item.isdefault == '1' ? 'style="display: none;"' : '';
								$('.addr_list > ul').append('\
									<li id="'+item.id+'" class="addr operate '+acv+'">\
										<h1 class="name">'+item.name+'<span class="mobile">'+item.mobile+'</span></h1>\
										<p class="area">'+item.provinceName+' '+item.cityName+' '+item.countyName+' </p>\
										<p class="address">'+item.address+'</p>\
										<div>\
											<a href="javascript:void(0)" class="edit">编辑</a>\
											<a href="javascript:void(0)" class="delete" '+def+'>删除 </a>\
											<a href="javascript:void(0)" class="us" '+def+'>设为默认地址</a>\
										</div>\
									</li>');
							});
						} else {
							$('#divDialog').css('display', 'block');
						}
						var prices = 0, quantities = 0, freight = 0;
						$.each(data.result.carts, function(i, item){
							prices += (item.goods.mPrice*item.quantity);
							quantities += parseFloat(item.quantity);
							freight += 15.00;
							var img = item.goods.shows.length > 0 ? item.goods.shows[0].smaPath : '';
							$('.list > tbody').append('\
								<tr>\
									<td class="img"><img src="'+img+'" width="70" height="70"></td>\
									<td class="name">\
										<a href="goods.html?goods='+item.goods.id+'" title="'+item.goods.name+'" \
											target="_blank" style="word-break:break-all;  word-wrap:break-word;">'+item.goods.name+'</a>\
										<p class="seven">支持7天无理由退换货</p>\
									</td>\
									<td>￥'+parseFloat(item.goods.mPrice).toFixed(2)+'</td>\
									<td>￥'+item.quantity+'</td>\
									<td>￥15.00</td>\
									<td>￥'+(item.goods.mPrice*item.quantity).toFixed(2)+'</td>\
								</tr>');
						});
						$('.prices').html(prices.toFixed(2));
						$('.freight').html(freight.toFixed(2));
						$('.amount').html((prices + freight).toFixed(2));
						$('.goodsnum').html(quantities);
						$('#newAddr').click(function(){
							buildAddr('', function(addr){
								$('.addr_list > ul > li').removeClass('active');
								$('.addr_list > ul > li .delete,.addr_list > ul > li .us').css('display', 'inline-block');
								$('.addr_list > ul').prepend('\
									<li id="'+addr.id+'" class="addr operate active">\
										<h1 class="name">'+addr.name+'<span class="mobile">'+addr.mobile+'</span></h1>\
										<p class="area">'+addr.provinceName+' '+addr.cityName+' '+addr.countyName+' </p>\
										<p class="address">'+addr.address+'</p>\
										<div>\
											<a href="javascript:void(0)" class="edit">编辑</a>\
											<a href="javascript:void(0)" class="delete" style="display: none;">删除 </a>\
											<a href="javascript:void(0)" class="us" style="display: none;">设为默认地址</a>\
										</div>\
									</li>');
								$('#'+addr.id+' .edit').click(editAddr);
								$('#'+addr.id+' .delete').click(deleteAddr);
								$('#'+addr.id+' .us').click(defaultAddr);
								$('#'+addr.id).click(checkAddr);
							});
						});
						$('.addr .edit').click(editAddr);
						$('.addr .delete').click(deleteAddr);
						$('.addr .us').click(defaultAddr);
						$('.addr_list > ul > li').click(checkAddr);
						$('#submit').click(function(){
							$.ajax({
								url : '/beio/goods/preOrder',
								data : {
									'addr.id' : ele.attr('id'), 
									'addr.exist' : '0' 
								},
								type : 'POST',
								async : false,
								cache : true,
								dataType : 'json',
								success : function(data) {
									if (data.status == '200') {
										ele.remove();
									} else if (data.status == '170' || data.status == '100') {
										alert(tip(data.status));
									} else {
										alert(tip('400'));
									};
								},
								error : function() {
									alert(tip('500'));
								}
							});
							window.location.href = "pay.html";
						});
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
		} else {
			alert(tip('145'));
			window.location.href = 'index.html';
		}
	});
});

// 选中收货地址
function checkAddr(){
	$('.addr_list > ul > li').removeClass('active');
	$(this).addClass('active');
}

// 编辑收货地址
function editAddr(){
	var ele = $(this).parents('.addr');
	buildAddr(ele.attr('id'), function(addr){
		$('.addr_list > ul > li').removeClass('active');
		$('.addr_list > ul > li .delete,.addr_list > ul > li .us').css('display', 'inline-block');
		ele.addClass('active');
		ele.find('.delete,.us').css('display', 'none');
		ele.find('.name').html(addr.name+'<span class="mobile">'+addr.mobile+'</span>');
		ele.find('.area').html(addr.provinceName + ' ' + addr.cityName + ' ' + addr.countyName);
		ele.find('.address').html(addr.address);
	});
}

// 删除收货地址
function deleteAddr(){
	if (confirm('确定删除该收货地址吗？')) {
		var ele = $(this).parents('.addr');
		$.ajax({
			url : '/beio/sys/delAddr',
			data : {
				'addr.id' : ele.attr('id'), 
				'addr.exist' : '0' 
			},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					ele.remove();
				} else if (data.status == '170' || data.status == '100') {
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
}

// 默认收货地址
function defaultAddr(){
	var ele = $(this).parents('.addr');
	$.ajax({
		url : '/beio/sys/defaultAddr',
		data : {
			'addr.id' : ele.attr('id'), 
			'addr.isdefault' : '1' 
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				$('.addr').removeClass('active');
				$('.addr .us,.addr .delete').css('display', 'inline-block');
				ele.addClass('active');
				ele.find('.delete,.us').css('display', 'none');
			} else if (data.status == '170' || data.status == '100') {
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