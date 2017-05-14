/**
 * 加载二级分类
 */

function loadBgc_two(){
	var pid = $('#bgc_one').combobox('getValue');
	$('#bgc_two').combobox({
	    url:'/beio/backGoods/getAllClassify?bcv.pid=' + pid,
	    valueField:'val',
	    textField:'text'
	});
}
function loadBgc_add_two(){
	var pid = $('#bgc_add_one').combobox('getValue');
	$('#bgc_add_two').combobox({
	    url:'/beio/backGoods/getAllClassify?bcv.pid=' + pid,
	    valueField:'val',
	    textField:'text'
	});
}

/**
 * 查询商品信息
 */
function searchGoods(){
//	if(null != $('#bgc_one').combobox('getValue') && '' != $('#bgc_one').combobox('getValue')){
//		if(null == $('#bgc_two').combobox('getValue') || '' == $('#bgc_two').combobox('getValue')){
//			$.messager.alert('提示', '请选择二级分类');
//			return;
//		}
//	}
	$('#goods_datagrid').datagrid('load',{
		classifyPID : $('#bgc_one').combobox('getValue'),
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
 * 新增商品信息
 */
function addGoods(){
	if(!$('#goods_add_form').form('validate')){
		return;
	}
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
				clearGoodsAddForm();
				$.messager.alert('提示', '新增成功');
				$('#goods_datagrid').datagrid('reload');
			}else if('170' == data.status) {
				$.messager.alert('提示', '登录失效，请重新登录');
				window.location.href = 'login.html';
			}else if('100' == data.status) {
				$.messager.alert('提示', '新增失败');
			}else{
				$.messager.alert('提示', tip('400'));
			};
		},
		error : function() {
			$.messager.alert(tip('500'));
		}
	});
	
}


function loadBgc_update_two(){
	var pid = $('#bgc_update_one').combobox('getValue');
	$('#bgc_update_two').combobox({
	    url:'/beio/backGoods/getAllClassify?bcv.pid=' + pid,
	    valueField:'val',
	    textField:'text'
	});
}


/**
 * 根据id获取商品信息
 * @param id
 */
function getGoodsById(id){
	$.ajax({
		url : '/beio/backGoods/getGoodsByID',
		data : {
			'bgv.id' : id
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if('200' == data.status){
				var goods = data.result;
				$('#goods_update_id').val(goods.id);
				$('#goods_update_brand').combobox('select', goods.brandID);
				$('#bgc_update_one').combobox('select', goods.classifyPID);
				$('#bgc_update_two').combobox('select', goods.classifyID);
				$('#goods_update_name').textbox('setValue', goods.name);
				$('#goods_update_descr').textbox('setValue', goods.descr);
				$('#goods_update_mPrice').numberbox('setValue', goods.mPrice);
				$('#goods_update_cPrice').numberbox('setValue', goods.cPrice);
				$('#goods_update_weight').numberbox('setValue', goods.weight);
				$('#goods_update_stock').numberbox('setValue', goods.stock);
			}else if('170' == data.status) {
				$.messager.alert('提示', '登录失效，请重新登录');
				window.location.href = 'login.html';
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
 * 修改商品信息
 */
function updateGoods(){
	if(!$('#goods_update_form').form('validate')){
		return;
	}
	var form = new FormData(document.getElementById("goods_update_form"));
	$.ajax({
		url : '/beio/backGoods/updateGoods',
		data : form,
		type : 'POST',
		async : false,
		cache : false,
		processData: false,
		contentType: false,
		success : function(data) {
			if('200' == data.status){
				clearGoodsUpdateForm();
				$.messager.alert('提示', '修改成功');
				$('#goods_datagrid').datagrid('reload');
			}else if('170' == data.status) {
				$.messager.alert('提示', '登录失效，请重新登录');
				window.location.href = 'login.html';
			}else if('100' == data.status) {
				$.messager.alert('提示', '修改失败');
			}else{
				$.messager.alert('提示', tip('400'));
			};
		},
		error : function() {
			$.messager.alert(tip('500'));
		}
	});
}

//启用选中商品
function activateGoods(){
	var row = $('#goods_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	
	if(1 == row.enable){
		$.messager.alert('提示', '此商品已启用');
		return;
	}
	
	$.messager.confirm('提示', '确定要启用此商品吗？', function(flag){
		if(flag){
			// 访问后台删除数据
			$.ajax({
				url : '/beio/backGoods/controlGoodsEnable',
				data : {
					'bgv.id' : row.id
					, 'bgv.enable' : '1'
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					if('200' == data.status){
						$.messager.alert('提示', '操作成功');
						$('#goods_datagrid').datagrid('reload');
					}else if('100' == data.status){
						$.messager.alert('提示', '操作失败');
					}else if('170' == data.status) {
						$.messager.alert('提示', '登录失效，请重新登录');
						window.location.href = 'login.html';
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

//禁用选中商品
function forbiddenGoods(){
	var row = $('#goods_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	if(0 == row.enable){
		$.messager.alert('提示', '此商品已禁用');
		return;
	}
	
	$.messager.confirm('提示', '确定要禁用此商品吗？', function(flag){
		if(flag){
			// 访问后台删除数据
			$.ajax({
				url : '/beio/backGoods/controlGoodsEnable',
				data : {
					'bgv.id' : row.id
					, 'bgv.enable' : '0'
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					if('200' == data.status){
						$.messager.alert('提示', '操作成功');
						$('#goods_datagrid').datagrid('reload');
					}else if('100' == data.status){
						$.messager.alert('提示', '操作失败');
					}else if('170' == data.status) {
						$.messager.alert('提示', '登录失效，请重新登录');
						window.location.href = 'login.html';
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
 * 清空商品form并关闭窗口
 */
function clearGoodsAddForm(){
	$('#goods_add_form').form('clear');
	$('#goods_add').window('close');
}

function clearGoodsUpdateForm(){
	$('#goods_update_form').form('clear');
	$('#goods_update').window('close');
}

// 清空文件上传窗口并关闭
function clearImageUpdateForm(){
	$('#images_update_file_form').form('clear');
	$('#images_update_file').window('close');
}


/**
 * 显示增加商品信息页面
 */
function addGoodsWindowShow(){
	$('#goods_add_form').form('clear');
	$('#goods_add').window('open');
}

//展示商品信息修改页面
function updateGoodsWindowShow(){
	var row = $('#goods_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	$('#goods_update').window('open');
	getGoodsById(row.id);
	
}

// 显示商品图片修改窗口
function updateImagesWindowShow(){
	var row = $('#goods_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	$('#images_update').window('open');
	$('#images_datagrid').datagrid({
		url : '/beio/backGoods/getGoodsImagesByID?bgv.id=' + row.id
	});
}

// 修改商品图片
function showUpdateImage(){
	var row = $('#images_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	$('#images_update_file_form').form('clear');
	$('#images_update_file').window('open');
}

// 显示增加图片窗口
function showAddImage(){
	$('#images_add_file').window('open');
}

// 关闭增加图片窗口
function clearImageAddForm(){
	$('#images_add_file_form').form('clear');
	$('#images_add_file').window('close');
}

// 增加商品图片
function addImage(){
	if(null == $('input:radio[name=biv_category]:checked').val()){
		$.messager.alert('提示', '请选择图片类型');
	}
	
	// 展示图最多五张
	if('0' == $('input:radio[name=biv_category]:checked').val()){
		var rows = $('#images_datagrid').datagrid('getRows');
		var count = 0;
		for(var i = 0; i < rows.length; i++){
			if('0' == rows[i].category){
				count++;
			}
		}
		
		if(5 <= count){
			$.messager.alert('提示', '展示图最多录入5张');
			return;
		}
	}
	
	if(!$('#images_add_file_form').form('validate')){
		return;
	}
	var form = new FormData(document.getElementById("images_add_file_form"));
	form.append('biv.goodsID', $('#images_datagrid').datagrid('getRows')[0].goodsID);
	form.append('biv.category', $('input:radio[name=biv_category]:checked').val());
	$.ajax({
		url : '/beio/backGoods/addGoodsImage',
		data : form,
		type : 'POST',
		cache : false,
		processData: false,
		contentType: false,
		success : function(data) {
			if('200' == data.status){
				clearImageAddForm();
				$.messager.alert('提示', '操作成功');
				$('#images_datagrid').datagrid('reload');
			}else if('170' == data.status) {
				$.messager.alert('提示', '登录失效，请重新登录');
				window.location.href = 'login.html';
			}else if('100' == data.status) {
				$.messager.alert('提示', '操作失败');
			}else{
				$.messager.alert('提示', tip('400'));
			};
		},
		error : function() {
			$.messager.alert(tip('500'));
		}
	}); 
	
}

// 修改指定图片
function updateImage(){
	
	var form = new FormData(document.getElementById("images_update_file_form"));
	form.append('biv.id', $('#images_datagrid').datagrid('getSelected').id);
	$.ajax({
		url : '/beio/backGoods/updateGoodsImage',
		data : form,
		type : 'POST',
		async : false,
		cache : false,
		processData: false,
		contentType: false,
		success : function(data) {
			if('200' == data.status){
				$.messager.alert('提示', '修改成功');
				$('#images_datagrid').datagrid('reload');
			}else if('170' == data.status) {
				$.messager.alert('提示', '登录失效，请重新登录');
				window.location.href = 'login.html';
			}else if('100' == data.status) {
				$.messager.alert('提示', '修改失败');
				window.location.href = 'login.html';
			}else{
				$.messager.alert('提示', tip('400'));
			};
		},
		error : function() {
			$.messager.alert(tip('500'));
		}
	});
	clearImageUpdateForm();
}


// 删除商品图片
function delImage(){
	var row = $('#images_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	if('0' == row.sortNum){
		$.messager.alert('提示', '排序为1的图片不能删除');
		return;
	}
	$.messager.confirm('提示', '确定要此图片？', function(flag){
		if(!flag){
			return;
		}
		$.ajax({
			url : '/beio/backGoods/delGoodsImage',
			data : {
				'biv.id' : row.id
				, 'biv.orgPath' : row.orgPath
				, 'biv.bigPath' : row.bigPath
				, 'biv.midPath' : row.midPath
				, 'biv.smaPath' : row.smaPath
				
			},
			type : 'POST',
			async : false,
			cache : false,
			dataType : 'json',
			success : function(data) {
				if('200' == data.status){
					$.messager.alert('提示', '操作成功');
					$('#images_datagrid').datagrid('reload');
				}else if('170' == data.status) {
					$.messager.alert('提示', '登录失效，请重新登录');
					window.location.href = 'login.html';
				}else if('100' == data.status) {
					$.messager.alert('提示', '操作失败');
					window.location.href = 'login.html';
				}else{
					$.messager.alert('提示', tip('400'));
				};
			},
			error : function() {
				$.messager.alert(tip('500'));
			}
		});
	});
}