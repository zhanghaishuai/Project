package com.beio.base.vo;

import com.beio.base.entity.SysMember;

public class Member extends SysMember{

	private String imgVerifyCode; // 图片验证码
	
	private String smsVerifyCode; // 短信验证码
	
	private String sysInviteCode; // 内邀激活码
	
	private String autoLoginMark; // 自动登录标记
	
	private String category; // 类型
	
	private SysMember member; // 会员信息
	
	private String mrfeeTurnon; // 开通会员时间
	
	private String payID; // 支付ID
	
	private String trade_state; // 支付状态

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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}

	public String getMrfeeTurnon() {
		return mrfeeTurnon;
	}

	public void setMrfeeTurnon(String mrfeeTurnon) {
		this.mrfeeTurnon = mrfeeTurnon;
	}

	public String getPayID() {
		return payID;
	}

	public void setPayID(String payID) {
		this.payID = payID;
	}

	public String getTrade_state() {
		return trade_state;
	}

	public void setTrade_state(String trade_state) {
		this.trade_state = trade_state;
	}

}
