$(function(){
	initHtml();
	autologin(function(member){
		$.ajax({
			url : '/beio/sys/queryAllAddr',
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$.each(data.result, function(i, item){
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
						});
					});
					$('.addr .edit').click(editAddr);
					$('.addr .delete').click(deleteAddr);
					$('.addr .us').click(defaultAddr);
				}else if (data.status == '170') {
					alert(tip(data.status));
				}else {
					alert(tip('400'));
				}
			},
			error : function() {
				alert(tip('500'));
			}
		});
	});
});

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