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
								<option value="5">已关闭</option>\
								<option value="4">售后服务</option>\
							</select>\
							<label class="status">订单状态：</label>\
							<label class="title">我的订单</label>\
						</div>\
						<div class="mc"></div>\
					</div>\
				</div>\
			</div>');
		query();
		$('.search_btn').click(function(){
			query({
				"orderVO.status":$('.search_status').val(), 
				"orderVO.orderNo":$('.search_no').val()
			});
		});
	}, true, false);
});

// 查询订单
function query(options){
	$.ajax({
		url : '/beio/goods/myOrder',
		data : options,
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
									<td colspan="7">\
										<div class="con paginating clearfix">\
						   					<div class="paging">\
						       					<ul></ul>\
											</div>\
										</div>\
									</td>\
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
							btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;" onclick="detail('+item.id+')">查看详情</button>';
						}else if (item.status == '3') {
							status = '已完成';
							btn = '<button style="padding: 2px 10px;border:1px solid #bcbcbc;">售后服务</button>';
						}else if (item.status == '4') {
							status = '售后服务';
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
					$('.paging > ul').empty();
					$('.paging > ul').append('<li class="prev"><a href="javascript:void(0);" title="上一页">上一页</a></li>');
					var begin = data.result.pageIndex<4||data.result.pageCount<6
						?1:data.result.pageCount-data.result.pageIndex<2
							?data.result.pageCount-4:data.result.pageIndex-2;
					var end = data.result.pageCount<6?data.result.pageCount:5;
					for(var i = 0; i < end; i++){
						$('.paging > ul').append('<li class="item"><a class='+(data.result.pageIndex==(begin+i)?"current":"1")+' href="javascript:void(0);">'+(begin+i)+'</a></li>');
					}
					$('.paging > ul').append('<li class="next"><a href="javascript:void(0);" title="下一页">下一页</a></li>');
					$('.paging > ul').append('\
						<li class="page_input">\
            				<span>到第</span>\
            				<input id="t__cp" type="text" class="number" value="'+data.result.pageIndex+'">\
            				<span>页，共'+data.result.pageCount+'页</span>\
            				<input class="button jump" value="确定" type="button">\
            			</li>');
					if (data.result.pageIndex != 1) {
						$('.paging > ul > .prev').click(function(){
							query({
								"orderVO.status":$('.search_status').val(), 
								"orderVO.orderNo":$('.search_no').val()
							});
						});
					}
					if (data.result.pageIndex != data.result.pageCount) {
						$('.paging > ul > .next').click(function(){
							query({
								"orderVO.status":$('.search_status').val(), 
								"orderVO.orderNo":$('.search_no').val(),
								"orderVO.pageIndex":data.result.pageCount
							});
						});
					}
					$('.paging > ul > .item').click(function(){
						if (data.result.pageIndex != $(this).find('a').html()) {
							query({
								"orderVO.status":$('.search_status').val(), 
								"orderVO.orderNo":$('.search_no').val(),
								"orderVO.pageIndex":$(this).find('a').html()
							});
						}
					});
					$('.paging > ul >li > .jump').click(function(){
						if (new RegExp(regex('page')).test($('.number').val()) == false) {
							$('.number').select();
						}else {
							query({
								"orderVO.status":$('.search_status').val(), 
								"orderVO.orderNo":$('.search_no').val(),
								"orderVO.pageIndex":$('.number').val()
							});
						}
					});
				}else {
					$('.mc').html('<div class="crumbs_fb clearfix" style="font-size:20px;margin-top:15px;">没有相关订单！</div>');
				};
				pageScroll();
			} else {
				alert(tip('400'));
			};
		},
		error : function() {
			alert(tip('500'));
		}
	});
}

// 全选
function checkAll(){
	// 全选
	if ($('[name=checkAll]').attr('checked') == 'checked') {
		$('[name=check]').attr('checked', 'checked');
	}else {
		$('[name=check]').removeAttr('checked');
	}
}

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
}

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
}

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
}

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
			}
		},
		error : function(){
			alert(tip('500'));
		}
	});
};

// 商品展示
function goods(id){
	window.location.href = "goods.html?goods=" + id;
}



// 显示详情
function detail(id){
	alert('detail');
};

// 页面滚动
function pageScroll(){
    //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
    window.scrollBy(0,-50);
    //延时递归调用，模拟滚动向上效果
    scrolldelay = setTimeout('pageScroll()',20);
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
    if(sTop==0) clearTimeout(scrolldelay);
};