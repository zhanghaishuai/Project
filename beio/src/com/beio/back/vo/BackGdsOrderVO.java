package com.beio.back.vo;

import com.beio.back.entity.BackGdsOrder;

/**
 * 后台商品值对象
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public class BackGdsOrderVO extends BackGdsOrder{
	
	private int page; // 页码
	
	private int rows; // 每页行数
	
	private String buyerName; // 买家昵称
	
	private String addrProvinceName; // 省
	
	private String addrCityName; // 市
	
	private String addrCountyName; // 县
	
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getBuyerName() {
		return buyerName;
	}

	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}

	public String getAddrProvinceName() {
		return addrProvinceName;
	}

	public void setAddrProvinceName(String addrProvinceName) {
		this.addrProvinceName = addrProvinceName;
	}

	public String getAddrCityName() {
		return addrCityName;
	}

	public void setAddrCityName(String addrCityName) {
		this.addrCityName = addrCityName;
	}

	public String getAddrCountyName() {
		return addrCountyName;
	}

	public void setAddrCountyName(String addrCountyName) {
		this.addrCountyName = addrCountyName;
	}

}
