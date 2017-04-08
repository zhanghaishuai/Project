package com.beio.base.util;

import org.apache.commons.lang.StringUtils;

public class SmsUtil{

	/**
	 * 获取短信验证码
	 * @param len
	 * @return
	 */
	public static String smsVerifyCode(int len){
		int random = (int) (Math.random() * Math.pow(10, len));
		String code = String.valueOf(random);
		return StringUtils.repeat("0", len - code.length()) + code;
	}
	
	/**
	 * 发送验证码（待实现）
	 * @param len
	 * @return
	 */
	public static String sendSms(String mobile, String msg){
		
		return "0";
	}
	
}
