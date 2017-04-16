$(function(){
	autologin(function(member){
		if (sessionStorage.getItem('orderBuyIDs') != null) {
			$.ajax({
				url : '/beio/goods/settlement',
				data : {'settlementVO.cartIDs' : sessionStorage.getItem('orderBuyIDs').split(',')},
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
										<input type="hidden" class="provinceCode" value="'+item.province+'"/>\
										<input type="hidden" class="cityCode" value="'+item.city+'"/>\
										<input type="hidden" class="countyCode" value="'+item.county+'"/>\
										<input type="hidden" class="telephone" value="'+item.telephone+'"/>\
										<input type="hidden" class="zipcode" value="'+item.zipcode+'"/>\
										<h1><em class="name">'+item.name+'</em><span class="mobile">'+item.mobile+'</span></h1>\
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
								<tr class="goods" id="'+item.goods.id+'">\
									<td class="img"><img src="'+img+'" width="70" height="70"></td>\
									<td class="name">\
										<a href="goods.html?goods='+item.goods.id+'" title="'+item.goods.name+'" \
											target="_blank" style="word-break:break-all;  word-wrap:break-word;">'+item.goods.name+'</a>\
										<p class="seven">支持7天无理由退换货</p>\
									</td>\
									<td>￥<em class="price">'+parseFloat(item.goods.mPrice).toFixed(2)+'</em></td>\
									<td><em class="quantity">'+item.quantity+'</em></td>\
									<td>￥<em class="totalprice">'+(item.goods.mPrice*item.quantity).toFixed(2)+'</em></td>\
									<td>￥<em class="freight">15.00</em></td>\
								</tr>');
						});
						$('.goodsnum').html(quantities);
						$('.prices').html(prices.toFixed(2));
						$('.freights').html(freight.toFixed(2));
						$('.totalprices').html((prices + freight).toFixed(2));
						$('#newAddr').click(function(){
							buildAddr('', function(addr){
								$('.addr_list > ul > li').removeClass('active');
								$('.addr_list > ul > li .delete,.addr_list > ul > li .us').css('display', 'inline-block');
								$('.addr_list > ul').prepend('\
									<li id="'+addr.id+'" class="addr operate active">\
										<input type="hidden" class="provinceCode" value="'+addr.province+'"/>\
										<input type="hidden" class="cityCode" value="'+addr.city+'"/>\
										<input type="hidden" class="countyCode" value="'+addr.county+'"/>\
										<input type="hidden" class="telephone" value="'+item.telephone+'"/>\
										<input type="hidden" class="zipcode" value="'+item.zipcode+'"/>\
										<h1><em class="name">'+addr.name+'</em><span class="mobile">'+addr.mobile+'</span></h1>\
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
						$('#submit').click(preOrder);
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
		ele.find('.name').html(addr.name);
		ele.find('.mobile').html(addr.mobile);
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

// 下单
function preOrder(){
	if ($('.addr_list > ul > .active').length != 1) {
		alert(tip('146'));
		return false;
	}
	var jsonArr = new Array();
	$.each($('.list .goods'), function(i, item){
		var json = {};
		json.goodsID = $(item).attr('id');
		json.price = $(item).find('.price').html();
		json.quantity = $(item).find('.quantity').html();
		json.freight = $(item).find('.freight').html();
		json.totalPrice = $(item).find('.totalprice').html();
		jsonArr[i] = JSON.stringify(json);
	});
	$.ajax({
		url : '/beio/goods/preOrder',
		data : {
			'preOrderVO.addrName' : $('.active .name').html(),
			'preOrderVO.addrMobile' : $('.active .mobile').html(),
			'preOrderVO.addrTelephone' : $('.active .telephone').val(),
			'preOrderVO.addrProvince' : $('.active .provinceCode').val(),
			'preOrderVO.addrCity' : $('.active .cityCode').val(),
			'preOrderVO.addrCounty' : $('.active .countyCode').val(),
			'preOrderVO.addrZipcode' : $('.active .zipcode').val(),
			'preOrderVO.addrAddress' : $('.active .address').html(),
			'preOrderVO.payment' : '0',
			'preOrderVO.receipt' : $('input[name=receipt]:checked').val(),
			'preOrderVO.goodsPrice' : $('.prices').html(),
			'preOrderVO.freight' : $('.freights').html(),
			'preOrderVO.totalPrice' : $('.totalprices').html(),
			'preOrderVO.details.jsonStr' : jsonArr
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		traditional : true,
		success : function(data) {
			if (data.status == '200') {
				sessionStorage.removeItem('orderBuyIDs');
				window.location.href = "pay.html";
			} else if (data.status == '301' || data.status == '302' || data.status == '303' 
				|| data.status == '304' || data.status == '305' || data.status == '306' 
					|| data.status == '307' || data.status == '308' || data.status == '170') {
				alert(tip(data.status));
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
};