$(function(){
	// 删除
//	$('.del-btn').click(function(e){
//		if(confirm('确定要删除该收货地址吗？')){
//			$(this).parent().parent().parent().remove();
//		}
//	});
	
	
	$('#newAddr').click(function(){
		$('#divDialog').css('display', 'block');
	});
	$('#cancelAdd').click(function(){
		$('#divDialog').css('display', 'none');
	});
});


// 删除收货地址 默认收货地址不显示删除按钮
function delAddr(addr_div_id){
	if(confirm('确定要删除该收货地址吗？')){
		$("#" + addr_div_id).remove();
	}
}

// 设置为默认
function makeAddrDefault(addr_div_id){
	alert(addr_div_id);
	/*原默认收货地址*/
	// 获取div_id
	var former_id = $('.smt > h3 > span').parent().parent().parent().attr('id');
	// 删除默认地址标记
	$('.smt > h3 > span').remove();
	// 显示 设置默认按钮
	$('#' + former_id).find('div[class=item-rcol]').find('div').find('a').before($('<a class="ml10 ftx-05" href="javascript:makeAddrDefault('+addr_div_id+');">设为默认</a>'));
	// 增加删除按钮
	$('#' + former_id + " > div[class=smt] > div[class=extra]").append($('<a class="del-btn" href="javascript:void(0);" onclick="delAddr(' + addr_div_id +')">删除</a>'));
	
	/*新默认收货地址*/
	// 增加新默认标记
	$('#' + addr_div_id + ' > .smt > h3').append($('<span class="ftx-04 ml10">默认地址</span>'));
	// 隐藏 设置默认地址按钮
	$('#' + addr_div_id).find('div[class=item-rcol]').find('div').find('a').first().remove();
	// 隐藏删除按钮
	$('#' + addr_div_id + " > div[class=smt] > div[class=extra] > a").remove();
	
	// 互换位置
	$('#' + addr_div_id).insertBefore($('#' + former_id));
	$('#' + addr_div_id).attr('id', 'addr_div_id_0');
	$('#' + former_id).attr('id', addr_div_id);
	$('#addr_div_id_0').attr('id', former_id);
};



//function alertDelAddressDiag(addressId){
//	jQuery.jdThickBox({
//		type: "text",
//		title: "删除",
//		width: 300,
//		height: 100,
//		source: '<div class="m flexbox">'
//    		+ '<div class="mc">'
//    		+ '<div class="tip-box icon-box">'
//    		+ '<span class="warn-icon m-icon"></span>'
//    		+ '<div class="item-fore">'
//    		+ 	'<h3 class="ftx04">您确定要删除该收货地址吗？'
//    		+ 	'</h3>'
//    		+ '<div class="op-btns">'
//    		+ '<a href="javascript:void(0);" class="btn-9" onclick="delAddress(' + addressId + ')">确定</a>'
//    		+ '<a href="javascript:void(0);" class="btn-9 ml10" onclick="jdThickBoxclose()">取消</a>'
//    		+ '</div></div></div></div></div>'
//	});
//};
//
//function delAddress(addressId){
//	var actionUrl = appDomain + "address/deleteAddress.action";
//	jQuery.ajax( {
//	    type : "POST",
//	    dataType : "text",
//	    url : actionUrl,
//	    data : "addressId=" + addressId,
//	    cache : false,
//	    success : function(dataResult) {
//			if(isUserNotLogin(dataResult)){
//				goToLogin();
//				return;
//			}
//			if(dataResult || dataResult=="true"){
//				//隐藏删除的地址
//				$("#addresssDiv-"+addressId).hide();
//				//修改页面的显示数量
//				var addressNum = parseInt($("#addressNum_top").text());
//				if(addressNum>0){
//					addressNum--;
//				}
//				$("#addressNum_top").text(addressNum);
//				$("#addressNum_botton").text(addressNum);
//				//如果是最后一个地址，把最下面的添加新地址删除
//				if(addressNum==0){
//					$("#addAddressDiv_bottom").hide();
//				}
//			}
//		},
//		error : function(XMLHttpResponse) {
//		}
//	});
//	jdThickBoxclose();
//};