package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysPay;

/**
 * 下单值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class PreOrderVO extends SysPay{

	private List<OrderVO> orders;
	
	public List<OrderVO> getOrders() {
		return orders;
	}

	public void setOrders(List<OrderVO> orders) {
		this.orders = orders;
	}

}
