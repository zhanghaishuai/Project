package com.beio.front.vo;

import net.sf.json.JSONObject;

import com.beio.front.entity.GdsDetails;

/**
 * 订单详情值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class DetailsVO extends GdsDetails{

	public void setJsonStr(String jsonStr) {
		JSONObject json = JSONObject.fromObject(jsonStr);
		this.setGoodsID(json.getString("goodsID"));
		this.setPrice(json.getString("price"));
		this.setQuantity(json.getString("quantity"));
		this.setFreight(json.getString("freight"));
		this.setTotalPrice(json.getString("totalPrice"));
	}

}
