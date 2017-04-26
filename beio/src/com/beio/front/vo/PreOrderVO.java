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

	private List<OrderVO> orders;
	
	private SysMember member;
	
	private String currentTime;

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

}
