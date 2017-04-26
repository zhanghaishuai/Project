function initTip() {
	$.ajax({
		url : '/beio/sys/queryTip.action',
		type : 'POST',
		cache : true,
		async : false,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				sessionStorage.setItem('tips', JSON.stringify(data.result));
			}
		}
	});
}
function initRegex() {
	$.ajax({
		url : '/beio/sys/queryRegex.action',
		type : 'POST',
		cache : true,
		async : false,
		dataType : 'json',
		success : function(data) {
			if (data.status == '200') {
				sessionStorage.setItem('regexs', JSON.stringify(data.result));
			}
		}
	});
}
function dateMilliFormat(dateMilliStr, pattern) {
	if (dateMilliStr == '' || dateMilliStr == null || dateMilliStr == undefined) {
		return '';
	}
	if (pattern != '' && pattern != null && pattern != undefined) {
		if ('TIME' == pattern.toUpperCase()) {
			return dateMilliStr.substring(0, 19);
		}
		if ('DATE' == pattern.toUpperCase()) {
			return dateMilliStr.substring(0, 11);
		}
		if ('DAY' == pattern.toUpperCase()) {
			return dateMilliStr.substring(8, 11);
		}
		if ('MONTH' == pattern.toUpperCase()) {
			return dateMilliStr.substring(5, 7);
		}
		if ('YEAR' == pattern.toUpperCase()) {
			return dateMilliStr.substring(0, 4);
		}
	}
	return dateMilliStr.substring(0, dateMilliStr.indexOf('.'));
}
function tip(key) {
	return JSON.parse(sessionStorage.getItem('tips'))[key].tip;
}
function regex(key) {
	return JSON.parse(sessionStorage.getItem('regexs'))[key].regex;
}
$(function() {
	if (sessionStorage.getItem('tips') == null) {
		initTip();
	}
	if (sessionStorage.getItem('regexs') == null) {
		initRegex();
	}
});