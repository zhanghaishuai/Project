$(function(){
	$('#newAddr').click(function(){
		$('#divDialog').css('display', 'block');
	});
	$('#cancelAdd').click(function(){
		$('#divDialog').css('display', 'none');
	});
	$('.addr .edit').click(function(){
		$('#divDialog').css('display', 'block');
	});
	$('.addr .delete').click(function(){
		$(this).parents('.addr').remove();
	});
	$('.addr .us').click(function(){
		$('.addr .us').css('display', 'inline-block');
		$(this).css('display', 'none');
		$('.addr .delete').css('display', 'inline-block');
		$(this).prev().css('display', 'none');
		$('.addr').removeClass('active');
		$(this).parents('.addr').addClass('active');
	});
	$('.submit').click(function(){
		// $('.shadow').css('display', 'block');
		window.location.href = "pay.html";
	});
});