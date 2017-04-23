package com.beio.base.vo;

import com.beio.base.entity.SysMember;

public class Member extends SysMember{

	private String imgVerifyCode; // 图片验证码
	
	private String smsVerifyCode; // 短信验证码
	
	private String sysInviteCode; // 内邀激活码
	
	private String autoLoginMark; // 自动登录标记

	public String getImgVerifyCode() {
		return imgVerifyCode;
	}

	public void setImgVerifyCode(String imgVerifyCode) {
		this.imgVerifyCode = imgVerifyCode;
	}

	public String getSmsVerifyCode() {
		return smsVerifyCode;
	}

	public void setSmsVerifyCode(String smsVerifyCode) {
		this.smsVerifyCode = smsVerifyCode;
	}

	public String getSysInviteCode() {
		return sysInviteCode;
	}

	public void setSysInviteCode(String sysInviteCode) {
		this.sysInviteCode = sysInviteCode;
	}

	public String getAutoLoginMark() {
		return autoLoginMark;
	}

	public void setAutoLoginMark(String autoLoginMark) {
		this.autoLoginMark = autoLoginMark;
	}

}
