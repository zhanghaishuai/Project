$(function(){
	autologin(function(member){
		$('#turnonTime').html(dataMilliFormat(member.turnonTime, 'Date'));
		$('#expireTime').html(dataMilliFormat(member.expireTime, 'Date'));
		$('#nickName').val(member.nickName);
		$('#email').val(member.email);
		$('input[name=sex][value='+member.sex+']').attr('checked','checked');
		$('#birthYear').attr('rel', dataMilliFormat(member.birthday, 'YEAR'));
		$('#birthMonth').attr('rel', dataMilliFormat(member.birthday, 'MONTH'));
		$('#birthDay').attr('rel', dataMilliFormat(member.birthday, 'DAY'));
		$('#hobby').html(member.hobby);
		$.ms_DatePicker(); 
	});
	$('.field').focus(function() {
		$('.succcess').addClass('hide');
		$('#' + $(this).attr('id') + '_s').addClass('hide');
	});
	$('.birthday').click(function() {
		$('.succcess').addClass('hide');
		$('#birthday_s').addClass('hide');
	});
	$('.save_info').click(function(){
		$('.succcess').addClass('hide');
		var flag = true;
		if (new RegExp(regex('nickName')).test($('#nickName').val()) == false) {
			$('#nickName_s').html('<i class="i-def"></i>' + tip('133'));
			$('#nickName_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('email')).test($('#email').val()) == false) {
			$('#email_s').html('<i class="i-def"></i>' + tip('132'));
			$('#email_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('empty')).test($('#email').val()) == false) {
			$('#email_s').html('<i class="i-def"></i>' + tip('131'));
			$('#email_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('date')).test($.gs_DatePicker()) == false) {
			$('#birthday_s').html('<i class="i-def"></i>' + tip('135'));
			$('#birthday_s').removeClass('hide');
			flag = false;
		}
		if (new RegExp(regex('hobby')).test($('#hobby').val()) == false) {
			$('#hobby_s').html('<i class="i-def"></i>' + tip('134'));
			$('#hobby_s').removeClass('hide');
			flag = false;
		}
		
		if(flag == true){
			$.ajax({
				url : '/beio/sys/modifyMemberInfo',
				data : {
					'mr.nickName' : $('#nickName').val(), 
					'mr.email' : $('#email').val(), 
					'mr.sex' : $('input[name=sex]:checked').val(), 
					'mr.birthday' : $.gs_DatePicker(), 
					'mr.hobby' : $('#hobby').val(), 
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					if (data.status == '200') {
						sessionStorage.setItem('member', JSON.stringify(data.result));
						$('.succcess').removeClass('hide');
					}else if (data.status == '133') {
						$('#nickName_s').html('<i class="i-def"></i>' + tip('133'));
						$('#nickName_s').removeClass('hide');
					}else if (data.status == '132' ||data.status == '131') {
						$('#email_s').html('<i class="i-def"></i>' + tip('132'));
						$('#email_s').removeClass('hide');
					}else if (data.status == '135'){
						$('#birthday_s').html('<i class="i-def"></i>' + tip('135'));
						$('#birthday_s').removeClass('hide');
					}else if (data.status == '134') {
						$('#hobby_s').html('<i class="i-def"></i>' + tip('134'));
						$('#hobby_s').removeClass('hide');
					}else if (data.status == '100') {
						alert(tip(data.status));
					}else if (data.status == '170') {
						alert(tip(data.status));
						autologin(function(member){
							$('#turnonTime').html(dataMilliFormat(member.turnonTime, 'Date'));
							$('#expireTime').html(dataMilliFormat(member.expireTime, 'Date'));
							$('#nickName').val(member.nickName);
							$('#email').val(member.email);
							$('input[name=sex][value='+member.sex+']').attr('checked','checked');
							$('#birthYear').attr('rel', dataMilliFormat(member.birthday, 'YEAR'));
							$('#birthMonth').attr('rel', dataMilliFormat(member.birthday, 'MONTH'));
							$('#birthDay').attr('rel', dataMilliFormat(member.birthday, 'DAY'));
							$('#hobby').html(member.hobby);
							$.ms_DatePicker(); 
						});
					}else {
						alert(tip('400'));
					}
				},
				error : function() {
					alert(tip('500'));
				}
			});
		} 
	});
});