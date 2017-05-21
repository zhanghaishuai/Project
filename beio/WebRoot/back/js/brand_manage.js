
var editRow = null;
// 增加行
function addBrandRow(){
	if(null == editRow){
		$('#brand_datagrid').datagrid('insertRow', {index : 0, row : {enable: '1'}});
		var editRow = 0;
		$('#brand_datagrid').datagrid('beginEdit', editRow);
	}else{
		$.messager.alert('提示', '已有可编辑行，请先保存当前编辑');
	}
}

// 开启修改
function updateBrandRow(){
	if(null != editRow){
		$.messager.alert('提示', '已有可编辑行，请先保存当前编辑');
		return;
	}
	var row = $('#brand_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	
	editRow = $('#brand_datagrid').datagrid('getRowIndex', row);
	$('#brand_datagrid').datagrid('beginEdit', editRow);
	
}

// 保存
function saveBrand(){
	if(null != editRow){
		$('#brand_datagrid').datagrid('endEdit', editRow);
		$.messager.progress();
		var row = $('#brand_datagrid').datagrid('getRows')[editRow];
		$.ajax({
			url : '/beio/backGoods/saveBrand'
			, data : {'bbv.id' : row.id, 'bbv.name' : row.name}
			, type : 'POST'
			, cache : false
			, async : false
			, dataType : 'json'
			, success : function(data){
				var status = data.status;
				if('170' == status){
					alert('登录失效，请重新登录');
					window.location.href = 'login.html';
				}else if('200' == status){
					$.messager.alert('提示', '操作成功');
					$('#brand_datagrid').datagrid('reload');
				}else if('100' == status){
					$.messager.alert('提示', '操作失败');
					$('#brand_datagrid').datagrid('deleteRow', editRow);
				}else{
					$.messager.alert('提示', tip('400'));
				}
			}
			, error : function(){
				$.messager.alert('提示', tip('500'));
				$('#brand_datagrid').datagrid('deleteRow', editRow);
			}
		});
		editRow = null;
		$.messager.progress('close');
	}
}

//启用选中品牌
function activateBrand(){
	var row = $('#brand_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	
	if(1 == row.enable){
		$.messager.alert('提示', '此品牌已启用');
		return;
	}
	
	$.messager.confirm('提示', '确定要启用此品牌吗？', function(flag){
		if(flag){
			// 访问后台删除数据
			$.ajax({
				url : '/beio/backGoods/enableBrand',
				data : {
					'bbv.id' : row.id
					, 'bbv.enable' : '1'
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					if('200' == data.status){
						$.messager.alert('提示', '操作成功');
						$('#brand_datagrid').datagrid('reload');
					}else if('100' == data.status){
						$.messager.alert('提示', '操作失败');
					}else if('170' == data.status) {
						alert('登录失效，请重新登录');
						window.location.href = 'login.html';
					}else{
						$.messager.alert('提示', tip('400'));
					}
				},
				error : function() {
					$.messager.alert('提示', tip('500'));
				}
			});
		}
	});
}

//禁用选中品牌
function forbiddenBrand(){
	var row = $('#brand_datagrid').datagrid('getSelected');
	if(!row){
		$.messager.alert('提示', '请选中后操作');
		return;
	}
	if(0 == row.enable){
		$.messager.alert('提示', '此品牌已禁用');
		return;
	}
	
	$.messager.confirm('提示', '确定要禁用此品牌吗？', function(flag){
		if(flag){
			// 访问后台删除数据
			$.ajax({
				url : '/beio/backGoods/enableBrand',
				data : {
					'bbv.id' : row.id
					, 'bbv.enable' : '0'
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data) {
					if('200' == data.status){
						$.messager.alert('提示', '操作成功');
						$('#brand_datagrid').datagrid('reload');
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

/* 遮罩
function load() {  
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");  
    $("<div class=\"datagrid-mask-msg\"></div>").html("数据请求中，请稍候。。。").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });  
}


function disLoad() {  
    $(".datagrid-mask").remove();  
    $(".datagrid-mask-msg").remove();  

}
*/
// 按名称查询
function searchbarnd(){
	$('#brand_datagrid').datagrid('load',{
		brandName : $('#search_brandName').val()
	});
}