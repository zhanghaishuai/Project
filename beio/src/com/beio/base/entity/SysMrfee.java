package com.beio.base.entity;

/**
 * 会员信息
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysMrfee {

	private String id; // 主键
	
	private String memberID; // 会员ID
	
	private String payID; // 支付ID
	
	private String category; // 类型

	private String turnonTime; // 开通时间
	
	private String expireTime; // 到期时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMemberID() {
		return memberID;
	}

	public void setMemberID(String memberID) {
		this.memberID = memberID;
	}

	public String getPayID() {
		return payID;
	}

	public void setPayID(String payID) {
		this.payID = payID;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTurnonTime() {
		return turnonTime;
	}

	public void setTurnonTime(String turnonTime) {
		this.turnonTime = turnonTime;
	}

	public String getExpireTime() {
		return expireTime;
	}

	public void setExpireTime(String expireTime) {
		this.expireTime = expireTime;
	}

}
