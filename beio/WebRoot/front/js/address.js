function buildAddr(id, callback){
	$('body').append(base.addrBox);
	$('.addr_cancel,.addr_close').click(function(){
		$('.shadow').remove();
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

function area(code, callback){
	$.ajax({
		url : '/beio/sys/queryArea',
		data : {'area.code' : code},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				callback(data.result);
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
}

