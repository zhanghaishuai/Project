package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysOrder;

/**
 * 下单值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class PreOrderVO extends SysOrder{

	// 订单详情
	private List<DetailsVO> details;

	public List<DetailsVO> getDetails() {
		return details;
	}

	public void setDetails(List<DetailsVO> details) {
		this.details = details;
	}

}
