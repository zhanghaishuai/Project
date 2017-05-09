/**
 * 加载二级分类
 */

function loadBgc_two(){
	var pid = $('#bgc_one').combobox('getValue');
	$('#bgc_two').combobox({
	    url:'/beio/backGoods/getAllClassify?cv.pid=' + pid,
	    valueField:'val',
	    textField:'text'
	});
}
function loadBgc_add_two(){
	var pid = $('#bgc_add_one').combobox('getValue');
	$('#bgc_add_two').combobox({
	    url:'/beio/backGoods/getAllClassify?cv.pid=' + pid,
	    valueField:'val',
	    textField:'text'
	});
}

/**
 * 查询商品信息
 */
function searchGoods(){
	if(null != $('#bgc_one').combobox('getValue') && '' != $('#bgc_one').combobox('getValue')){
		if(null == $('#bgc_two').combobox('getValue') || '' == $('#bgc_two').combobox('getValue')){
			$.messager.alert('提示', '请选择二级分类');
			return;
		}
	}
	$('#goods_datagrid').datagrid('load',{
		classifyid : $('#bgc_two').combobox('getValue'),
		brandid : $('#goodsbrand').combobox('getValue'),
		goodsname: $('#goodsname').val()
	});
}

/**
 * 校验二级分类是否选择
 * @returns
 */
function verifyCid(){
	if(null == $('#bgc_two').combobox('getValue') || '' == $('#bgc_two').combobox('getValue')){
		if(null == $('#bgc_one').combobox('getValue') || '' == $('#bgc_one').combobox('getValue')){
			return null;
		}else{
			return $('#bgc_one').combobox('getValue');
		}
	}else{
		return $('#bgc_two').combobox('getValue');
	}

}

/**
 * 显示增加商品信息页面
 */
function addGoodsWindowShow(){
	$('#goods_add').window('open');
}

/**
 * 新增商品信息
 */
function addGoods(){
//	if(!$('#goods_add_form').form('validate')){
//		return;
//	}
//	if (new RegExp(regex('password')).test($('#user_add_username').val()) == false) {
//		$.messager.alert('提示', '用户名只能输入数字、字母及可见字符，长度6-20位');
//		return;
//	}
//	if (new RegExp(regex('password')).test($('#user_add_password').val()) == false) {
//		$.messager.alert('提示', tip('123'));
//		return;
//	}
//	if (new RegExp(regex('empty')).test($('#user_add_nickName').val()) == true) {
//		if (new RegExp(regex('password')).test($('#user_add_nickName').val()) == false) {
//			$.messager.alert('提示', tip('133'));
//			return;
//		}
//	}
//	if (new RegExp(regex('empty')).test($('#user_update_email').val()) == true) {
//		if (new RegExp(regex('email')).test($('#user_add_email').val()) == false) {
//			$.messager.alert('提示', tip('132'));
//			return;
//		}
//	}
	var form = new FormData(document.getElementById("goods_add_form"));
	$.ajax({
		url : '/beio/backGoods/addGoods',
		data : form,
		type : 'POST',
		cache : false,
		processData: false,
		contentType: false,
		success : function(data) {
			if('200' == data.status){
				clearUserAddForm();
				$('#goods_add').window('close');
				$.messager.alert('提示', '新增成功');
				$('#goods_datagrid').datagrid('reload');
			}else if('97' == data.status){
				$.messager.alert('提示', '用户只能输入数字、字母及特殊符号，长度6-20位！');
			}else if('98' == data.status){
				$.messager.alert('提示', '用户名不能为空！');
			}else if('99' == data.status){
				$.messager.alert('提示', '此用户名存在！');
			}else if('122' == data.status){
				$.messager.alert('提示', tip('122'));
			}else if('123' == data.status){
				$.messager.alert('提示', tip('123'));
			}else if('132' == data.status){
				$.messager.alert('提示', tip('132'));
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



// 展示用户修改信息
function updateUserWindowShow(){
	var row = $('#users_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	$('#user_update').window('open');
	getUserById(row.id);
	
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
				var user = data.result;
				$('#user_update_id').val(user.id);
				$('#user_update_username').textbox('setValue', user.username);
				$('#user_update_password').textbox('setValue', user.password);
				$('#user_update_nickName').textbox('setValue', user.nickName);
				$('#user_update_email').textbox('setValue', user.email);
				$('input:radio[name=user_update_enable][value='+user.enable+']').attr('checked', true);
			}else if('100' == data.status) {
				$.messager.alert('提示', '获取失败，请联系管理员。');
			}else{
				$.messager.alert('提示', '服务异常，请联系管理员。');
			};
		},
		error : function() {
			$.messager.alert(tip('500'));
		}
	});
}

/**
 * 修改后台用户信息
 */
function updateUser(){
	if(!$('#user_update_form').form('validate')){
		return;
	}
	if (new RegExp(regex('password')).test($('#user_update_password').val()) == false) {
		$.messager.alert('提示', tip('123'));
		return;
	}
	if (new RegExp(regex('empty')).test($('#user_update_nickName').val()) == true) {
		if (new RegExp(regex('nickName')).test($('#user_update_nickName').val()) == false) {
			$.messager.alert('提示', tip('133'));
			return;
		}
	}
	if (new RegExp(regex('empty')).test($('#user_update_email').val()) == true) {
		if (new RegExp(regex('email')).test($('#user_update_email').val()) == false) {
			$.messager.alert('提示', tip('132'));
			return;
		}
	}
	$.ajax({
		url : '/beio/sys/updateUser',
		data : {
			'user.id' : $('#user_update_id').val(),
			'user.password' : $('#user_update_password').val(),
			'user.nickName' : $('#user_update_nickName').val(),
			'user.email' : $('#user_update_email').val(),
			'user.enable' : $('input[name=user_update_enable]:checked').val()
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if('200' == data.status){
				clearUserAddForm();
				$('#user_update').window('close');
				$.messager.alert('提示', '修改成功');
				$('#users_datagrid').datagrid('reload');
			}else if('122' == data.status){
				$.messager.alert('提示', tip('122'));
			}else if('123' == data.status){
				$.messager.alert('提示', tip('123'));
			}else if('132' == data.status){
				$.messager.alert('提示', tip('132'));
			}else if('111' == data.status){
				$.messager.alert('提示', '可用状态必选');
			}else if('112' == data.status){
				$.messager.alert('提示', '无效可用状态');
			}else if('100' == data.status) {
				$.messager.alert('提示', '修改失败，请联系管理员。');
			}else{
				$.messager.alert('提示', tip('400'));
			};
		},
		error : function() {
			$.messager.alert(tip('500'));
		}
	});
}

/**
 * 清空用户form并关闭窗口
 */
function clearUserUpdateForm(){
	$('#user_update_form').form('clear');
	$('#user_update').window('close');
}

