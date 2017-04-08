$(function(){
	// 菜单展开
	$('.all').hover(function(){$('.home_nav_l').slideDown(100);},false);
	$('.home_nav_l > .new_pub_nav > .navli').hover(function(){
		$('.navli').removeClass('on');
		$('.new_pub_nav_pop').css('display', 'none');
		$(this).addClass('on');
		$('#'+$(this).attr('id')+'_child').css('display', 'block');
	},false);
	// 菜单收起
	$('.home_nav_l').hover(null,function(){
		$('.home_nav_l').slideUp(100);
	});
});