$(function(){
	initHtml();
	autologin(function(member){
		var qrcode = new QRCode($("#qrcode")[0], {
			width : 200,
			height : 200
		});
		qrcode.makeCode('http://www.baidu.com');
	});
});