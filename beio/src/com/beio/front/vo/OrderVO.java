package com.beio.front.vo;

import net.sf.json.JSONObject;

import com.beio.base.util.Constant;
import com.beio.front.entity.GdsOrder;

/**
 * 订单值对象
 * @author zhs
 * @date 2017-04-22
 * @version 1.0.0
 */
public class OrderVO extends GdsOrder{

	public void setJsonStr(String jsonStr) {
		JSONObject json = JSONObject.fromObject(jsonStr);
		this.setAddrName(json.getString("addrName"));
		this.setAddrMobile(json.getString("addrMobile"));
		this.setAddrTelephone(json.getString("addrTelephone"));
		this.setAddrProvince(json.getString("addrProvince"));
		this.setAddrCity(json.getString("addrCity"));
		this.setAddrCounty(json.getString("addrCounty"));
		this.setAddrZipcode(json.getString("addrZipcode"));
		this.setAddrAddress(json.getString("addrAddress"));
		this.setReceiptStatus(json.getString("receiptStatus"));
		this.setReceiptType(json.getString("receiptType"));
		this.setReceiptTitle(json.getString("receiptTitle"));
		this.setGoodsID(json.getString("goodsID"));
		this.setGoodsName(json.getString("goodsName"));
		this.setGoodsPrice(json.getString("goodsPrice"));
		this.setGoodsFreight(json.getString("goodsFreight"));
		this.setGoodsQuantity(json.getString("goodsQuantity"));
		this.setTotalPrice(json.getString("totalPrice"));
		this.setStatus(Constant.ORDERSTATUSUNPAID);
	}

}
