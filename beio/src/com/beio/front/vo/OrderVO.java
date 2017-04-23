package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysOrder;

/**
 * 订单值对象
 * @author zhs
 * @date 2017-04-22
 * @version 1.0.0
 */
public class OrderVO extends SysOrder{

	// 订单详情
	private List<DetailsVO> details;

	public List<DetailsVO> getDetails() {
		return details;
	}

	public void setDetails(List<DetailsVO> details) {
		this.details = details;
	}

}
