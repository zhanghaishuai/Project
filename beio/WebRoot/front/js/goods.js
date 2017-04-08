$(function(){
	var imgIndex = 0;
	// 自动轮播图
	if($('.dp_slide_box > ul > li > img').size() > 1){
		$('.largePic').attr('src', $('.dp_slide_box > ul > li > img').eq(imgIndex).attr('source'));
		setInterval(function(){
			if(++imgIndex == $('.dp_slide_box > ul > li > img').size()){
				imgIndex = 0;
			}
			$('.largePic').attr('src', $('.dp_slide_box > ul > li > img').eq(imgIndex).attr('source'));
		}, 4000);
	};
	// 轮播按钮事件
	$('.dp_slide_box > ul > li > img').hover(function(){
		imgIndex = $(this).parent().index();
		$('.largePic').attr('src', $(this).attr('source'));
	},function(){return false;});
	// 选择颜色、型号、大小
	$('.jia_gou_e').click(function(){
		$(this).parent().children().removeClass('chosen');
		$(this).addClass('chosen');
	});
	// 切换详情
	$('.detail').click(function(){
		$('.clearfix > li').removeClass('hover');
		$(this).addClass('hover');
		$('#detail').css('display', 'block');
		$('#comment_all').css('display', 'block');
		$('#question_all').css('display', 'block');
	});
	// 切换评论
	$('.common').click(function(){
		$('.clearfix > li').removeClass('hover');
		$(this).addClass('hover');
		$('#detail').css('display', 'none');
		$('#comment_all').css('display', 'block');
		$('#question_all').css('display', 'none');
	});
	// 切换问答
	$('.qa').click(function(){
		$('.clearfix > li').removeClass('hover');
		$(this).addClass('hover');
		$('#detail').css('display', 'none');
		$('#comment_all').css('display', 'none');
		$('#question_all').css('display', 'block');
	});
});