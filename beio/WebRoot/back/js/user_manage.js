// 删除选中行
function delRow(){
	var row = $('#users_datagrid').datagrid('getSelected');
	if(!row){$.messager.alert('提示', '请选中后操作');return;}
	$.messager.confirm('提示', '确定要删除此记录吗？', function(flag){
		if(flag){
			// 访问后台删除数据
			$.ajax({
				url : '/beio/sys/delUser',
				data : {
					'user.id' : row.id
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					if('200' == data.status){
						$.messager.alert('提示', '删除成功');
						$('#users_datagrid').datagrid('reload');
					}else if('100' == data.status){
						$.messager.alert('提示', '删除失败，请联系管理员。');
					}else{
						$.messager.alert('提示', tip('400'));
					};
				},
				error : function() {
					$.messager.alert('提示', tip('500'));
				}
			});
		}
	});
	
}

/**
 * 新增后台用户
 */
function addUser(){
	$.ajax({
		url : '/beio/sys/addUser',
		data : {
			'user.username' : $('#user_add_username').val(),
			'user.password' : $('#user_add_password').val(),
			'user.nickName' : $('#user_add_nickName').val(),
			'user.email' : $('#user_add_email').val()
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if('200' == data.status){
				clearUserAddForm();
				$('#goods_add').window('close');
				$.messager.alert('提示', '新增成功');
				$('#users_datagrid').datagrid('reload');
			}else if('99' == data.status){
				$.messager.alert('提示', '此用户名存在！');
			}else if('100' == data.status) {
				$.messager.alert('提示', '删除失败，请联系管理员。');
			}else{
				$.messager.alert('提示', tip('400'));
			};
		},
		error : function() {
			$.messager.alert(tip('500'));
		}
	});
}


// 展示用户修改信息
function updateUserWindowShow(){
	var row = $('#users_datagrid').datagrid('getSelected');
	if(!row){$.messager.alert('提示', '请选中后操作');return;}
	$('#user_update').window('open');
	
}

/**
 * 清空用户form并关闭窗口
 */
function clearUserAddForm(){
	$('#user_add_form').form('clear');
	$('#user_add').window('close');
}

/**
 * 根据id获取后台用户信息
 * @param id
 */
function getUserById(id){
	$.ajax({
		url : '/beio/sys/getUserById',
		data : {
			'user.id' : id
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if('200' == data.status){
				clearUserAddForm();
				$('#goods_add').window('close');
				$.messager.alert('提示', '新增成功');
				$('#users_datagrid').datagrid('reload');
			}else if('99' == data.status){
				$.messager.alert('提示', '此用户名存在！');
			}else if('100' == data.status) {
				$.messager.alert('提示', '删除失败，请联系管理员。');
			}else{
				$.messager.alert('提示', tip('400'));
			};
		},
		error : function() {
			$.messager.alert(tip('500'));
		}
	});
}