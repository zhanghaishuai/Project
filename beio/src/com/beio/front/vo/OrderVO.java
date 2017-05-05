package com.beio.front.vo;

import java.util.List;

import net.sf.json.JSONObject;

import com.beio.base.util.Constant;
import com.beio.front.entity.GdsImage;
import com.beio.front.entity.GdsOrder;

/**
 * 订单值对象
 * @author zhs
 * @date 2017-04-22
 * @version 1.0.0
 */
public class OrderVO extends GdsOrder{
	
	private List<GdsImage> shows;
	
	public void setJsonStr(String jsonStr) {
		JSONObject json = JSONObject.fromObject(jsonStr);
		if (json.containsKey("id")) {
			this.setId(json.getString("id"));
		}
		if (json.containsKey("addrName")) {
			this.setAddrName(json.getString("addrName"));
		}
		if (json.containsKey("addrMobile")) {
			this.setAddrMobile(json.getString("addrMobile"));	
		}
		if (json.containsKey("addrTelephone")) {
			this.setAddrTelephone(json.getString("addrTelephone"));
		}
		if (json.containsKey("addrProvince")) {
			this.setAddrProvince(json.getString("addrProvince"));
		}
		if (json.containsKey("addrCity")) {
			this.setAddrCity(json.getString("addrCity"));
		}
		if (json.containsKey("addrCounty")) {
			this.setAddrCounty(json.getString("addrCounty"));
		}
		if (json.containsKey("addrZipcode")) {
			this.setAddrZipcode(json.getString("addrZipcode"));
		}
		if (json.containsKey("addrAddress")) {
			this.setAddrAddress(json.getString("addrAddress"));
		}
		if (json.containsKey("receiptStatus")) {
			this.setReceiptStatus(json.getString("receiptStatus"));
		}
		if (json.containsKey("receiptType")) {
			this.setReceiptType(json.getString("receiptType"));
		}
		if (json.containsKey("receiptTitle")) {
			this.setReceiptTitle(json.getString("receiptTitle"));
		}
		if (json.containsKey("goodsID")) {
			this.setGoodsID(json.getString("goodsID"));
		}
		if (json.containsKey("goodsName")) {
			this.setGoodsName(json.getString("goodsName"));
		}
		if (json.containsKey("goodsPrice")) {
			this.setGoodsPrice(json.getString("goodsPrice"));
		}
		if (json.containsKey("goodsFreight")) {
			this.setGoodsFreight(json.getString("goodsFreight"));
		}
		if (json.containsKey("goodsQuantity")) {
			this.setGoodsQuantity(json.getString("goodsQuantity"));
		}
		if (json.containsKey("totalPrice")) {
			this.setTotalPrice(json.getString("totalPrice"));
		}
		this.setStatus(Constant.ORDERSTATUSUNPAID);
	}

	public List<GdsImage> getShows() {
		return shows;
	}

	public void setShows(List<GdsImage> shows) {
		this.shows = shows;
	}
	
}
