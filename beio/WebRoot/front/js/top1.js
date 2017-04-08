
function search(keyword){
	$.ajax({
		url : '/beio/gdshotlog/search.action',
		data : {'ghl.keyword' : keyword},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.resp == '1') {
				window.location.href = 'search.html?keyword=' + keyword;
			}else {
				alert(data.msg);
			}
		},
		error : function() {}
	});
}

$(function(){
	if (sessionStorage.getItem('member') != null) {
		var helloWho = JSON.parse(sessionStorage.getItem('member')).nickName;
		if (helloWho == null || helloWho == '') {
			helloWho = JSON.parse(sessionStorage.getItem('member')).mobile;
		}
		$('.hi').html('尊敬的会员<span>'+helloWho+'</span>,欢迎观临。');
		$('.head_operate_nav').html('<li><a href="myhome_details.html">个人中心</a></li><li>\
				<a href="javascript:void(0);" id="logout">注销</a></li>');
	}
	$.ajax({
		url : '/beio/gdshotlog/hotKey.action',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.resp == '1') {
				$.each(data.data, function(index, item){
					if(index == 0){
						searchword = item.keyword;
						$('#searchInp').attr('placeholder', item.keyword);
					}
					$('.search_hot').append('<a href="javascript:void(0);">' + item.keyword + '</a>');
				});
			}else {
				alert(data.msg);
			}
		},
		error : function() {}
	});
	$.ajax({
		url : '/beio/gdscategory/queryCategory.action',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.resp == '1') {
				$.each(data.data, function(index, item){
					if(item.level == '0'){
						$('.nav_top > ul').append('<li><a href="'+item.url+'">'+item.name+'</a></li>');
					}else if(item.level == '1'){
						$('.new_pub_nav').append('<li id="nav_'+item.id+'" class="navli"><span class="nav"><a href="search.html?category='+item.id+'">'+item.name+'</a></span></li>');
						$('.new_pub_nav').after('<div id="nav_'+item.id+'_child" class="new_pub_nav_pop"><div class="pop_column"></div></div>');
					}else if (item.level == '2') {
						if($('#nav_'+item.pid+'_child') != null && $('#nav_'+item.pid+'_child') != undefined){
							$('#nav_'+item.pid+'_child > .pop_column').append('<div class="pop_row"><a href="search.html?category='+item.id+'">'+item.name+'</a></div>');
						}
					}
				});
			}else {
				alert(data.msg);
			}
		},
		error : function() {}
	});
	$('#logout').click(function(){
		$.ajax({
			url : '/beio/sysmember/logout.action',
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data) {
				if (data.resp == '1') {
					if (data.res == '0') {
						localStorage.removeItem('mobile');
						localStorage.removeItem('password');
						sessionStorage.removeItem('member');
						window.location.href = 'login.html';
					}
				}else {
					alert(data.msg);
				}
			},
			error : function() {}
		});
	});
	$('#searchBtn').click(function(){
		if (/^\S+$/.test($('#searchInp').val()) == true) {
			search($('#searchInp').val());
		}else {
			search($('#searchInp').attr('placeholder'));
		}
	});
	$('.search_hot > a:gt(0)').click(function(){
		search($(this).html());
	});
});