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