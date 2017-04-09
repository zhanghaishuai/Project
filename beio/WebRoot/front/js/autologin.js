function autologin(callback, marker){
	$.ajax({
		url : '/beio/sys/querySessionMember',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				callback(data.result);
			} else if (data.status == '170') {
				if (localStorage.getItem('mobile') != null && 
						localStorage.getItem('password') != null) {
					$.ajax({
						url : '/beio/sys/login',
						data : {
							'mr.mobile' : localStorage.getItem('mobile'), 
							'mr.password' : localStorage.getItem('password'), 
							'mr.autoLoginMark' : 'autologin', 
						},
						type : 'POST',
						async : false,
						cache : true,
						dataType : 'json',
						success : function(data) {
							if (data.status == '200') {
								if(marker != false){
									$('.shadow').remove();
								}
								callback(data.result);
							} else if (data.status == '120' || data.status == '122' || data.status == '124' || 
									data.status == '125' || data.status == '190' || data.status == '192' || data.status == '193') {
								if(marker != false){
									$('body').append(htmlbuild.loginBox);
									buildlogin(callback);
								}else {
									callback();
								}
							} else {
								alert(tip('400'));
							};
						},
						error : function() {
							alert(tip('500'));
						}
					});
				}else {
					if (marker != false) {
						$('body').append(htmlbuild.loginBox);
						buildlogin(callback);
					}else {
						callback();
					}
				}
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
};

function buildlogin(callback){
	$('#loginsubmit').click(function(){
		if (new RegExp(regex('empty')).test($('#login_mobile').val()) == false) {
			$('#msg-warn').removeClass('hide');
			$('#msg-warn').html('<b></b>' + tip('120'));
			return false;
		}
		if (new RegExp(regex('empty')).test($('#login_pwd').val()) == false) {
			$('#msg-warn').removeClass('hide');
			$('#msg-warn').html('<b></b>' + tip('122'));
			return false;
		}
		if (new RegExp(regex('empty')).test($('#login_code').val()) == false) {
			$('#msg-warn').removeClass('hide');
			$('#msg-warn').html('<b></b>' + tip('124'));
			return false;
		}
		$.ajax({
			url : '/beio/sys/login',
			data : {
				'mr.mobile' : $('#login_mobile').val(), 
				'mr.password' : $('#login_pwd').val(), 
				'mr.imgVerifyCode' : $('#login_code').val(), 
			},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.status == '200') {
					$('.shadow').remove();
					callback(data.result);
				} else if (data.status == '120' || data.status == '122' || data.status == '124' || 
						data.status == '125' || data.status == '190' || data.status == '192' || data.status == '193') {
					$('#msg-warn').removeClass('hide');
					$('#msg-warn').html('<b></b>' + tip(data.status));
				} else {
					alert(tip('400'));
				};
			},
			error : function() {
				alert(tip('500'));
			}
		});
	});
}

