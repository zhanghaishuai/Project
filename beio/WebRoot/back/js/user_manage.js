// 删除选中行
function delRow(){
	var row = $('#goods_datagrid').datagrid('getSelected');
	if(row){
		// 访问后台删除数据
		alert(row.itemid);
    	var rowIndex = $('#goods_datagrid').datagrid('getRowIndex', row);
		$('#goods_datagrid').datagrid('deleteRow', rowIndex);  
	}
}
// 修改选中行数据
function updateRow(){
	
}