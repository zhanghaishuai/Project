$(function(){
	init(function(member){
		$('#bd').append('\
			<div class="home_nav">\
				<div class="my_left">\
					<div class="my_menu">\
						<h3 class="my_menu_title" >\
							<a id="J_myhomeBtn"  href="javascript:void(0);">个人中心</a>\
						</h3>\
						<dl>\
							<dt>个人中心</dt>\
							<dd><a class="j-menuItem " href="myinfo.html">个人信息</a></dd>\
							<dd><a class="j-menuItem " href="myrfee.html">会员续费</a></dd>\
							<dd><a class="j-menuItem " href="myrpwd.html">重置密码</a></dd>\
							<dd><a class="j-menuItem " href="mymmbl.html">修改手机</a></dd>\
							<dd><a class="j-menuItem " href="myaddr.html">收货地址</a></dd>\
							<dt>我的交易</dt>\
							<dd><a class="j-menuItem on" href="javascript:void(0);">我的订单</a></dd>\
							<dt>关于我们</dt>\
							<dd><a class="j-menuItem " href="myabout.html">关于我们</a></dd>\
						</dl>\
					</div>\
				</div>\
				<div class="my_main">\
					<div class="mod-main mod-comm">\
						<div class="mt">\
							<button class="search_btn">搜&nbsp;&nbsp;索</button>\
							<input class="search_no" type="text" placeholder="可输入订单号进行查询"/>\
							<select class="search_status">\
								<option value="">全部订单</option>\
								<option value="0">未付款</option>\
								<option value="1">待发货</option>\
								<option value="2">已发货</option>\
								<option value="3">已完成</option>\
								<option value="4">售后中</option>\
								<option value="5">已关闭</option>\
							</select>\
							<label class="status">订单状态：</label>\
							<label class="title">我的订单</label>\
						</div>\
						<div class="mc"></div>\
					</div>\
				</div>\
			</div>');
		$('.search_btn').click(function(){
			$('.search_no').attr('data', $('.search_no').val());
			$('.search_status').attr('data', $('.search_status').val());
			query();
		});
		query();
	}, true, false);
});

// 变量
var scrollFlag = true, pageIndex = 1;

// 查询
function query(){
	$.ajax({
		url : '/beio/goods/myOrder',
		data : {
			'orderVO.status': $('.search_status').attr('data'),
			'orderVO.orderNo': $('.search_no').attr('data')
		},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				if (data.result.pageTotal > 0) {
					$('.mc').html('\
						<table>\
							<thead>\
								<tr>\
									<th style="width: 20px;"><input type="checkbox" name="checkAll" onchange="checkAll()"/></th>\
									<th style="width: 70px;"><button style="border:1px solid #bcbcbc;" onclick="mergePay()">合并支付</button></th>\
									<th style="width: 340px;">商品信息</th>\
									<th style="width: 150px;">下单时间</th>\
									<th style="width: 100px;">订单总额</th>\
									<th style="width: 100px;">交易状态</th>\
									<th style="width: 100px;">操作</th>\
								</tr>\
							</thead>\
							<tbody class="order_info"></tbody>\
							<tfoot>\
								<tr>\
									<td colspan="7">向下滚动加载更多订单</td>\
								</tr>\
							</tfoot>\
						</table>');
					$.each(data.result.pageList, function(i, item){
						var img = item.shows.length > 0 ? item.shows[0].smaPath : '';
						var status = '', btn = '', check = '';
						if (item.status == '0') {
							status = '未付款';
							btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="againOrder(this, '+item.id+')">付款</button>\
								</br><button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="cannelOrder(this, '+item.id+')">取消</button>';
							check = '<input id="'+item.id+'" type="checkbox" name="check" onclick="check()"/>';
						}else if (item.status == '1') {
							status = '待发货';
							btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+item.id+')">查看详情</button>';
						}else if (item.status == '2') {
							status = '已发货';
							btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="receive(this, '+item.id+')">确认收货</button>';
						}else if (item.status == '3') {
							status = '已完成';
							btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="service(this, '+item.id+')">申请售后</button>';
						}else if (item.status == '4') {
							status = '售后中';
							btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+item.id+')">查看详情</button>';
						}else if (item.status == '5') {
							status = '已关闭';
							btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+item.id+')">查看详情</button>';
						}
						$('.order_info').append('\
							<tr>\
								<td colspan="7" class="orderNo">订单号：<a href="javascript:detail('+item.id+')">'+item.orderNo+'</a></td>\
							</tr>\
							<tr>\
								<th style="width: 10px;">'+check+'</th>\
								<td style="width: 70px;"><img onclick="goods('+item.goodsID+')" src="'+img+'" width="70" height="70"></td>\
								<td style="width: 360px;"><a href="javascript:goods('+item.goodsID+')">'+item.goodsName+'</a></td>\
								<td>'+dateMilliFormat(item.createTime, 'TIME')+'</td>\
								<td>￥'+item.totalPrice+'</td>\
								<td>'+status+'</td>\
								<td>'+btn+'</td>\
							</tr>');
					});
	                $(window).scroll(function() { 
	                    var scroll = ($(document.body).height() - $(window).height() - $(window).scrollTop()) / $(window).height();
	                    if(scrollFlag == false){
	                    	if (scroll == 0) {
	                    		scrollFlag = true;
	                    		$.ajax({
	                    			url : '/beio/goods/myOrder',
	                    			data : {
	                    				'orderVO.status': $('.search_status').attr('data'),
	                    				'orderVO.orderNo': $('.search_no').attr('data'),
	                    				'orderVO.pageIndex': ++pageIndex
	                    			},
	                    			type : 'POST',
	                    			async : false,
	                    			cache : true,
	                    			dataType : 'json',
	                    			success : function(data) {
	                    				if (data.status == '200') {
	                    					if (data.result.pageList.length > 0) {
	                    						$.each(data.result.pageList, function(i, item){
	                    							var img = item.shows.length > 0 ? item.shows[0].smaPath : '';
	                    							var status = '', btn = '', check = '';
	                    							if (item.status == '0') {
	                    								status = '未付款';
	                    								btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="againOrder(this, '+item.id+')">付款</button>\
	                    									</br><button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="cannelOrder(this, '+item.id+')">取消</button>';
	                    								check = '<input id="'+item.id+'" type="checkbox" name="check" onclick="check()"/>';
	                    							}else if (item.status == '1') {
	                    								status = '待发货';
	                    								btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+item.id+')">查看详情</button>';
	                    							}else if (item.status == '2') {
	                    								status = '已发货';
	                    								btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="receive(this, '+item.id+')">确认收货</button>';
	                    							}else if (item.status == '3') {
	                    								status = '已完成';
	                    								btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="service(this, '+item.id+')">申请售后</button>';
	                    							}else if (item.status == '4') {
	                    								status = '售后中';
	                    								btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+item.id+')">查看详情</button>';
	                    							}else if (item.status == '5') {
	                    								status = '已关闭';
	                    								btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+item.id+')">查看详情</button>';
	                    							}
	                    							$('.order_info').append('\
	                    								<tr>\
	                    									<td colspan="7" class="orderNo">订单号：<a href="javascript:detail('+item.id+')">'+item.orderNo+'</a></td>\
	                    								</tr>\
	                    								<tr>\
	                    									<th style="width: 10px;">'+check+'</th>\
	                    									<td style="width: 70px;"><img onclick="goods('+item.goodsID+')" src="'+img+'" width="70" height="70"></td>\
	                    									<td style="width: 360px;"><a href="javascript:goods('+item.goodsID+')">'+item.goodsName+'</a></td>\
	                    									<td>'+dateMilliFormat(item.createTime, 'TIME')+'</td>\
	                    									<td>￥'+item.totalPrice+'</td>\
	                    									<td>'+status+'</td>\
	                    									<td>'+btn+'</td>\
	                    								</tr>');
	                    						});
	                    						scrollFlag = false;
	                    					}else {  
            	                                $("tfoot > tr > td").html('到底了');  
            	                                return false;  
            	                            }
	                    				} else {
	                    					alert(tip('400'));
	                    				};
	                    			},
	                    			error : function() {
	                    				alert(tip('500'));
	                    			}
	                    		});
							}
	                    }
	                });
				}else {
					$('.mc').html('<div class="crumbs_fb clearfix" style="font-size:20px;margin-top:15px;">没有相关订单！</div>');
				};
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
	scrollFlag = false;
};

// 全选
function checkAll(){
	// 全选
	if ($('[name=checkAll]').attr('checked') == 'checked') {
		$('[name=check]').attr('checked', 'checked');
	}else {
		$('[name=check]').removeAttr('checked');
	}
};

// 单选
function check(){
	var checkFlag = true;
	$('[name=check]').each(function(i, item){
		if($(this).attr('checked') != 'checked'){
			checkFlag = false;
		}
	});
	if(checkFlag == true){
		$('[name=checkAll]').attr('checked', 'checked');
	}else {
		$('[name=checkAll]').removeAttr('checked');
	}
};

// 合并支付
function mergePay(){
	if($('[name=check]:checked').size() < 1){
		alert(tip('310'));
		return;
	}
	var jsonArr = new Array();
	$.each($('[name=check]:checked'), function(i, item){
		var json = {};
		json.id = $(this).attr('id');
		jsonArr[i] = JSON.stringify(json);
	});
	$.ajax({
		url : '/beio/goods/mergePay',
		data : {'preOrderVO.orders.jsonStr' : jsonArr},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		traditional : true,
		success : function(data) {
			if (data.status == '200') {
				window.location.href = "pay.html?payno="+data.result.id;
			} else if (data.status == '301' || data.status == '302' || data.status == '303' 
				|| data.status == '304' || data.status == '305' || data.status == '306' 
					|| data.status == '307' || data.status == '308' || data.status == '170') {
				alert(tip(data.status));
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
};

// 重新支付
function againOrder(ele, id){
	var jsonArr = new Array();
	var json = {};
	json.id = id;
	jsonArr[0] = JSON.stringify(json);
	$.ajax({
		url : '/beio/goods/mergePay',
		data : {'preOrderVO.orders.jsonStr' : jsonArr},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		traditional : true,
		success : function(data) {
			if (data.status == '200') {
				window.location.href = "pay.html?payno="+data.result.id;
			} else if (data.status == '301' || data.status == '302' || data.status == '303' 
				|| data.status == '304' || data.status == '305' || data.status == '306' 
					|| data.status == '307' || data.status == '308' || data.status == '170') {
				alert(tip(data.status));
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
};

//取消订单
function cannelOrder(ele, id){
	$.ajax({
		url : '/beio/goods/cannelOrder',
		data : {'orderVO.id' : id},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data){
			if (data.status == '200') {
				$(ele).parent().prev().html('已关闭');
				$(ele).parent().parent().children().eq(0).html('');
				$(ele).parent().html('<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+id+')">查看详情</button>');
			}else {
				alert(top('400'));
			}
		},
		error : function(){
			alert(tip('500'));
		}
	});
};

// 确认收货
function receive(ele, id){
	if (confirm("确定要收货吗？") == true) {
		$.ajax({
			url : '/beio/goods/receive',
			data : {'orderVO.id' : id},
			type : 'POST',
			async : false,
			cache : true,
			dataType : 'json',
			success : function(data){
				if (data.status == '200') {
					$(ele).parent().prev().html('已完成');
					$(ele).parent().parent().children().eq(0).html('');
					$(ele).parent().html('<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="service(this, '+id+')">申请售后</button>');
				}else if (data.status == '100'){
					alert(tip(data.status));
				}else {
					alert(top('400'));
				}
			},
			error : function(){
				alert(tip('500'));
			}
		});
	}
};

// 申请售后
function service(ele, id){
	$('body').append(base.serviceBox);
	$('.service_cancel,.service_close').click(function(){
		$('.shadow').remove();
	});
	$('.service_submit').click(function(){
		var flag = true;
		$('.addr_address_s').addClass('hide');
		if (new RegExp(regex('empty')).test($('.addr_address').val()) == false) {
			$('.addr_address_s').html(tip('153'));
			$('.addr_address_s').removeClass('hide');
			flag = false;
		}
		if (flag == true) {
			$.ajax({
				url : '/beio/goods/service',
				data : {
					'service.orderID' : id,
					'service.content' : $('#addr_address').val()
				},
				type : 'POST',
				async : false,
				cache : true,
				dataType : 'json',
				success : function(data){
					if (data.status == '200') {
						$('.shadow').remove();
						$(ele).parent().prev().html('售后中');
						$(ele).parent().parent().children().eq(0).html('');
						$(ele).parent().html('<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+id+')">查看详情</button>');
					}else if (data.status == '100'){
						alert(tip(data.status));
					}else {
						alert(top('400'));
					}
				},
				error : function(){
					alert(tip('500'));
				}
			});
		}
	});
};

// 订单详情
function detail(id){
	$.ajax({
		url : '/beio/goods/detail',
		data : {'detailVO.id': id},
		type : 'POST',
		async : false,
		cache : true,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				$('.mc').html('\
					<div id="detail" style="border: 1px dashed #ccc; width: 920px; margin: 0 auto; padding: 5px 10px;">\
						<button style="float: right; padding: 2px 10px;border:1px solid #bcbcbc;" onclick="query()">返回</button>\
						<div style="border-bottom: 1px dashed #ccc;padding: 10px 0px;">\
							<span style="padding: 0px 25px 10px 10px;">收&nbsp;&nbsp;货&nbsp;人：&nbsp;'+data.result.addrName+'&nbsp;&nbsp;'+data.result.addrMobile+'</span><br/><br/>\
							<span style="padding: 0px 25px 10px 10px;">收货地址：&nbsp;'+data.result.provinceName+'&nbsp;'+data.result.cityName+'&nbsp;'+data.result.countyName+'&nbsp;'+data.result.addrAddress+'</span><br/>\
						</div>\
						<div style="border-bottom: 1px dashed #ccc;padding: 10px 0px;">\
							<span style="padding: 0px 25px 10px 10px;">商品信息：\
								<img src="'+data.result.showImg+'" width="70" height="70" onclick="goods('+data.result.goodsID+')"/>\
								<a style="margin: 0px 10px -5px 0px; max-width: 500px; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow:ellipsis; cursor: pointer;" onclick="goods('+data.result.goodsID+')">'+data.result.goodsName+'</a>\
								<label style="padding: 0px 25px 10px 10px;">数量：&nbsp;'+data.result.goodsQuantity+'</label>\
							</span><br/>\
						</div>\
						<div style="border-bottom: 1px dashed #ccc;padding: 10px 0px;">\
							<span style="padding: 0px 25px 10px 10px;">订单状态：&nbsp;'+(data.result.status == '0' ? "付款" : data.result.status == '1' ? "待发货" : data.result.status == '2' ? "已发货" : data.result.status == '3' ? "已完成" : data.result.status == '4' ? "售后中" : "已关闭")+'</span><br/><br/>\
							<span style="padding: 0px 25px 10px 10px;">订单编号：&nbsp;'+data.result.orderNo+'</span><br/><br/>\
							<span style="padding: 0px 25px 10px 10px;">下单时间：&nbsp;'+dateMilliFormat(data.result.createTime, 'TIME')+'</span><br/><br/>\
							<span style="padding: 0px 25px 10px 10px;">发票信息：&nbsp;'+(data.result.receiptStatus == '0' ? "不开发票" : (data.result.receiptType == '0' ? "个人" : "单位") + "&nbsp;&nbsp;" + data.result.receiptTitle)+'</span><br/><br/>\
						</div>\
						<div style="border-bottom: 1px dashed #ccc;padding: 10px 0px;">\
							<span style="padding: 0px 25px 10px 10px;">商品总额：&nbsp;￥'+parseFloat(data.result.totalPrice).toFixed(2)+'</span><br/><br/>\
							<span style="padding: 0px 25px 10px 10px;">运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：&nbsp;￥'+parseFloat(data.result.goodsFreight).toFixed(2)+'</span><br/><br/>\
							<span style="padding: 0px 25px 10px 10px;">'+(data.result.status == '0' || data.result.status == '5' ? "应" : "实")+'&nbsp;&nbsp;付&nbsp;款：&nbsp;<em>￥'+(parseFloat(data.result.totalPrice) + parseFloat(data.result.goodsFreight)).toFixed(2)+'</em></span><br/><br/>\
						</div>\
					</div>');
				$.each(data.result.services, function(i, item){
					$('#detail').append('\
						<div style="border-bottom: 1px dashed #ccc;padding: 10px 0px;">\
							<span style="padding: 0px 25px 10px 10px;">售后描述：&nbsp;'+item.content+'</span><br/><br/>\
							<span style="padding: 0px 25px 10px 10px;">售后反馈：&nbsp;'+item.feedback+'</span><br/><br/>\
						</div>');
				});
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
	scrollFlag = false;
};

// 商品展示
function goods(id){
	window.location.href = "goods.html?goods=" + id;
};
