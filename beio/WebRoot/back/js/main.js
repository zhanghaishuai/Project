$(function(){
	$.ajax({
		url : '/beio/sys/sessionBackUser',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				var array = new Array();
				$.each(data.result.menus, function(i, item){
					if(this.pid == '0') {
						var root = {};
						root.id = this.id;
						root.text = this.name;
						root.url = this.url;
						array[array.length] = root;
					}
				});
				$.each(array, function(i, item){
					recur(data.result.menus, this);
				});
				$('#menu').tree({
					data : array,
					animate : true,
					onClick : function(data){
						if (data.children == undefined) {
							addTab(data.text, data.url);
						}
					}
				});
			} else if(data.status == '170') {
				alert(tip('170'));
				window.location.href = 'login.html';
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
});

/**
 * 递归
 * @param data
 * @param arr
 */
function recur(data, root){
	$.each(data, function(i, item){
		if (this.pid == root.id) {
			if (root.children == undefined) {
				root.children = new Array();
			}
			var child = {};
			child.id = this.id;
			child.text = this.name;
			child.url = this.url;
			root.children[root.children.length] = child;
			recur(data, child);
		}
	});
}

/**
 * 增加标签页
 * @param title tabs提示
 * @param url 引入页面地址
 */
function addTab(title, url){
	if ($('#tabs').tabs('exists', title)){
		$('#tabs').tabs('select', title);
	} else {
		$('#tabs').tabs('add',{
			title:title,
			href: url,
			closable:true
		});
	}
}

function logout(){
	$.ajax({
		url : '/beio/sys/backLogout',
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200' || data.status == '170') {
				window.location.href = 'login.html';
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
}