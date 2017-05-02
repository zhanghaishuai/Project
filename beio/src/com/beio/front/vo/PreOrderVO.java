package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysMember;

/**
 * 下单值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class PreOrderVO {

	private String payID;
	
	private String payUrl;
	
	private SysMember member;
	
	private String currentTime;
	
	private List<OrderVO> orders;
	
	public List<OrderVO> getOrders() {
		return orders;
	}

	public void setOrders(List<OrderVO> orders) {
		this.orders = orders;
	}

	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}

	public String getCurrentTime() {
		return currentTime;
	}

	public void setCurrentTime(String currentTime) {
		this.currentTime = currentTime;
	}

	public String getPayID() {
		return payID;
	}

	public void setPayID(String payID) {
		this.payID = payID;
	}

	public String getPayUrl() {
		return payUrl;
	}

	public void setPayUrl(String payUrl) {
		this.payUrl = payUrl;
	}

}
