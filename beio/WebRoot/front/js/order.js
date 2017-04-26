$(function(){
	autologin(function(member){
		$('#hd1').append('\
			<div class="logo_line">\
			    <div class="w960">\
			        <div class="shopping_procedure"><span>我的购物车</span><span class="current">填写订单</span><span>完成订单</span></div>\
			        <div class="logo1"><a href="index.html"><img src="image/logo1.png" height="72" style="margin-top: 10px;"></a></div>\
			    </div>\
			</div>');
		$('#td').append(base.btmHtml);
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
						if (data.result.member != null && data.result.member != undefined && data.result.member.expire == false) {
							$('#bd').append('\
								<div class="w960">\
								    <div class="checkout_tip"></div>\
									<div class="address">\
										<h1 class="title">收货人信息</h1>\
										<div class="addr_list" id="address_content"><ul></ul></div>\
										<p><a id="newAddr" href="javascript:void(0)" class="btn">新增收货地址<em class="bicon"></em></a></p>\
									</div>\
									<div id="payment_div" class="w960">\
										<div>\
											<h1 class="title">支付方式</h1>\
										</div>\
										<div class="payment">\
											<ul>\
												<li>\
													<div id="payment_online_div0">\
														<a href="javascript:void(0)" class="btn_pay current">微信支付</a>\
														<div class="info">\
															<span id="payment_online_tips">目前仅支持微信支付方式</span>\
														</div>\
													</div>\
												</li>\
											</ul>\
										</div>\
									</div>\
									<div id="shipments_div" class="w960">\
										<div class="shipping">\
											<div id="shipment_0_0_div">\
												<div class="ship_box">\
													<div class="main">\
														<div class="right clearfix">\
															<div class="subpackage_title">\
																<h1 class="title"><a href="buycart.html" class="fr modify">返回购物车</a>送货清单</h1>\
															</div>\
															<table class="list" style="width: 100%;">\
																<tbody>\
																	<tr>\
																		<th colspan="2" scope="col" class="th_name">商品名称</th>\
																		<th scope="col">商品单价</th>\
																		<th scope="col">商品数量</th>\
																		<th scope="col">商品总价</th>\
																		<th scope="col">商品运费</th>\
																	</tr>\
																</tbody>\
															</table>\
														</div>\
													</div>\
													<div id="shipment_sub_0_0_div" class="sub">\
														<div class="sub_left">\
															<p>是否开具发票：</p>\
															<p class="receiptbox">\
																不开发票：<input name="receipt" type="radio" value="0" style="vertical-align:middle; margin-top:-3px;" checked="checked"/>\
																&nbsp;&nbsp;\
																普通发票：<input name="receipt" type="radio" value="1" style="vertical-align:middle; margin-top:-3px;"/>\
																&nbsp;&nbsp;\
																<em class="receiptdetail" receiptType="" receiptTitle=""></em>\
															</p>\
														</div>\
														<div class="sub_right">\
															<p><span class="tab">商品金额：￥<em class="prices">0.00</em></span><span class="tab">运费：￥<em class="freights">0.00</em></span><span class="tab"></span></p>\
															<p><span class="tab">应付金额：￥</span><span class="red totalprices">0.00</span></p>\
														</div>\
													</div>\
												</div>\
											</div>\
										</div>\
									</div>\
								</div>\
								<div>\
									<div class="submit">\
										<div class="box">共<span class="red goodsnum">1</span>件商品<span class="price">应付金额：<span class="red totalprices">0.00</span></span>(含运费<span class="red freights">0.00</span>元)<a id="submit" href="javascript:void(0)" class="btn_red">提交订单</a></div>\
									</div>\
								</div>');
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
								buildAddr('', function(addr){
									$('.addr_list > ul > li').removeClass('active');
									$('.addr_list > ul > li .delete,.addr_list > ul > li .us').css('display', 'inline-block');
									$('.addr_list > ul').prepend('\
										<li id="'+addr.id+'" class="addr operate active">\
											<input type="hidden" class="provinceCode" value="'+addr.province+'"/>\
											<input type="hidden" class="cityCode" value="'+addr.city+'"/>\
											<input type="hidden" class="countyCode" value="'+addr.county+'"/>\
											<input type="hidden" class="telephone" value="'+addr.telephone+'"/>\
											<input type="hidden" class="zipcode" value="'+addr.zipcode+'"/>\
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
							}
							var prices = 0, quantities = 0, freight = 0;
							$.each(data.result.carts, function(i, item){
								prices += (item.goods.mPrice*item.quantity);
								quantities += parseFloat(item.quantity);
								freight += parseFloat(item.goods.freight);
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
										<td>￥<em class="freight">'+parseFloat(item.goods.freight).toFixed(2)+'</em></td>\
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
											<input type="hidden" class="telephone" value="'+addr.telephone+'"/>\
											<input type="hidden" class="zipcode" value="'+addr.zipcode+'"/>\
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
							$('[name="receipt"]').click(function(){
								if ($(this).val() == "1") {
									showReceipt();
								}else {
									hideReceipt();
								}
							});
							$('#submit').click(preOrder);
						} else {
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
		} else {
			alert(tip('145'));
			window.location.href = 'index.html';
		}
	});
});

// 不开发票
function hideReceipt(){
	$('.receiptdetail').attr('receiptType', '');
	$('.receiptdetail').attr('receiptTitle', '');
	$('.receiptdetail').html('');
}

// 普通发票
function showReceipt(){
	$('.receiptdetail').attr('receiptType', '0');
	$('.receiptdetail').attr('receiptTitle', $('.active .name').html());
	$('.receiptdetail').html('【个人:'+$('.active .name').html()+'】<a href="javascript:void(0);" class="modify receiptedit">编辑</a>');
	$('.receiptedit').click(editReceipt);
}

// 编辑发票
function editReceipt(){
	$('body').append(base.receiptBox);
	$('input[name=receipt_type][value='+$('.receiptdetail').attr('receiptType')+']').attr('checked','checked');
	$('.receipt_title').val($('.receiptdetail').attr('receiptTitle'));
	$('.receipt_cancel,.receipt_close').click(function(){
		$('.shadow').remove();
	});
	$('.receipt_submit').click(function(){
		var flag = true;
		$('.receipt_title_s').addClass('hide');
		if (new RegExp(regex('empty')).test($('.receipt_title').val()) == false) {
			$('.receipt_title_s').html('<i class="i-def"></i>' + tip('147'));
			$('.receipt_title_s').removeClass('hide');
			flag = false;
		}
		if (flag == true) {
			$('.receiptdetail').attr('receiptType', $('input[name=receipt_type]:checked').val());
			$('.receiptdetail').attr('receiptTitle', $('.receipt_title').val());
			if ($('input[name=receipt_type]:checked').val() == '0') {
				$('.receiptdetail').html('【个人:'+$('.receipt_title').val()+'】<a href="javascript:void(0);" class="modify receiptedit">编辑</a>');
			}else {
				$('.receiptdetail').html('【单位:'+$('.receipt_title').val()+'】<a href="javascript:void(0);" class="modify receiptedit">编辑</a>');
			}
			$('.receiptedit').click(editReceipt);
			$('.shadow').remove();
		}
	});
}

// 选中收货地址
function checkAddr(){
	$('.addr_list > ul > li').removeClass('active');
	$(this).addClass('active');
	showReceipt();
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
		json.addrName = $('.active .name').html();
		json.addrMobile = $('.active .mobile').html();
		json.addrTelephone = $('.active .telephone').val();
		json.addrProvince = $('.active .provinceCode').val();
		json.addrCity = $('.active .cityCode').val();
		json.addrCounty = $('.active .countyCode').val();
		json.addrZipcode = $('.active .zipcode').val();
		json.addrAddress = $('.active .address').html();
		json.receiptStatus = $('input[name=receipt]:checked').val();
		json.receiptType = $('.receiptdetail').attr('receiptType');
		json.receiptTitle = $('.receiptdetail').attr('receiptTitle');
		json.goodsID = $(item).attr('id');
		json.goodsName = $(item).find('.name > a').attr('title');
		json.goodsPrice = $(item).find('.price').html();
		json.goodsFreight = $(item).find('.freight').html();
		json.goodsQuantity = $(item).find('.quantity').html();
		json.totalPrice = $(item).find('.totalprice').html();
		jsonArr[i] = JSON.stringify(json);
	});
	$.ajax({
		url : '/beio/goods/preOrder',
		data : {'preOrderVO.orders.jsonStr' : jsonArr},
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

function buildReceipt(callback){
	$('body').append(base.receiptBox);
	$('.addr_cancel,.addr_close').click(function(){
		$('#divDialog').remove();
	});
	area('000000', function(area){
		$('.addr_province').html('<option value="">请选择</option>');
		$('.addr_city').html('<option value="">请选择</option>');
		$('.addr_county').html('<option value="">请选择</option>');
		$.each(area, function(i, item){
			$('.addr_province').append('<option value="'+item.code+'">'+item.name+'</option>');
		});
	});
	$('.addr_province').change(function(){
		area($(this).val(), function(area){
			$('.addr_city').html('<option value="">请选择</option>');
			$('.addr_county').html('<option value="">请选择</option>');
			$.each(area, function(i, item){
				$('.addr_city').append('<option value="'+item.code+'">'+item.name+'</option>');
			});
		});
	});
	$('.addr_city').change(function(){
		area($(this).val(), function(area){
			$('.addr_county').html('<option value="">请选择</option>');
			$.each(area, function(i, item){
				$('.addr_county').append('<option value="'+item.code+'">'+item.name+'</option>');
			});
		});
	});
	if (id != '' && id != undefined && id != '') {
		$.ajax({
			url : '/beio/sys/queryAddr',
			data : {'addr.id' : id},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$('.addr_name').val(data.result.name);
					$('.addr_mobile').val(data.result.mobile);
					$('.addr_telephone').val(data.result.telephone);
					$('.addr_province').val(data.result.province);
					area(data.result.province, function(area){
						$('.addr_city').html('<option value="">请选择</option>');
						$('.addr_county').html('<option value="">请选择</option>');
						$.each(area, function(i, item){
							$('.addr_city').append('<option value="'+item.code+'">'+item.name+'</option>');
						});
					});
					$('.addr_city').val(data.result.city);
					area(data.result.city, function(area){
						$('.addr_county').html('<option value="">请选择</option>');
						$.each(area, function(i, item){
							$('.addr_county').append('<option value="'+item.code+'">'+item.name+'</option>');
						});
					});
					$('.addr_county').val(data.result.county);
					$('.addr_address').val(data.result.address);
					$('.addr_zipcode').val(data.result.zipcode);
				} else if (data.status == '170' || data.status == '139') {
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
	$('.addr_submit').click(function(){
		var flag = true;
		$('.addr_filed').focus(function(){
			$('.'+$(this).attr('id')+'_s').addClass('hide');
		});
		if (new RegExp(regex('empty')).test($('.addr_name').val()) == false) {
			$('.addr_name_s').html('<i class="i-def"></i>' + tip('137'));
			$('.addr_name_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('mobile')).test($('.addr_mobile').val()) == false) {
			$('.addr_mobile_s').html('<i class="i-def"></i>' + tip('121'));
			$('.addr_mobile_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('.addr_mobile').val()) == false) {
			$('.addr_mobile_s').html('<i class="i-def"></i>' + tip('120'));
			$('.addr_mobile_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('.addr_county').val()) == false) {
			$('.addr_county_s').html('<i class="i-def"></i>' + tip('143'));
			$('.addr_county_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('.addr_city').val()) == false) {
			$('.addr_city_s').html('<i class="i-def"></i>' + tip('142'));
			$('.addr_city_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('.addr_province').val()) == false) {
			$('.addr_province_s').html('<i class="i-def"></i>' + tip('141'));
			$('.addr_province_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('.addr_address').val()) == false) {
			$('.addr_address_s').html('<i class="i-def"></i>' + tip('144'));
			$('.addr_address_s').removeClass('hide');
			flag = false;
		}
		if (flag == true) {
			$.ajax({
				url : '/beio/sys/editAddr',
				data : {
					'addr.id' : id, 
					'addr.name' : $('.addr_name').val(), 
					'addr.mobile' : $('.addr_mobile').val(), 
					'addr.telephone' : $('.addr_telephone').val(), 
					'addr.province' : $('.addr_province').val(), 
					'addr.city' : $('.addr_city').val(), 
					'addr.county' : $('.addr_county').val(), 
					'addr.address' : $('.addr_address').val(), 
					'addr.zipcode' : $('.addr_zipcode').val(),
					'addr.provinceName' : $('.addr_province').find('option:selected').text(), 
					'addr.cityName' : $('.addr_city').find('option:selected').text(), 
					'addr.countyName' : $('.addr_county').find('option:selected').text() 
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					if (data.status == '200') {
						$('#divDialog').remove();
						callback(data.result);
					} else if (data.status == '137') {
						$('.addr_name_s').html('<i class="i-def"></i>' + tip(data.status));
						$('.addr_name_s').removeClass('hide');
						flag = false;
					} else if (data.status == '120' || data.status == '121') {
						$('.addr_mobile_s').html('<i class="i-def"></i>' + tip(data.status));
						$('.addr_mobile_s').removeClass('hide');
						flag = false;
					} else if (data.status == '141' || data.status == '142' || data.status == '143') {
						$('.addr_province_s').html('<i class="i-def"></i>' + tip(data.status));
						$('.addr_province_s').removeClass('hide');
						flag = false;
					} else if (data.status == '144') {
						$('.addr_address_s').html('<i class="i-def"></i>' + tip(data.status));
						$('.addr_address_s').removeClass('hide');
						flag = false;
					} else if (data.status == '170' || data.status == '140' || data.status == '100') {
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
	});
}

