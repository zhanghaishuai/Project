package com.beio.base.entity;

import com.beio.base.vo.Page;

/**
 * 订单
 * @author zhs
 * @date 2017-04-15
 * @version 1.0.0
 */
public class SysOrder extends Page{

	private String id; // 主键
	
	private String orderNo; // 订单编号
	
	private String buyerID; // 买家ID
	
	private String addrName; // 收货人姓名
	
	private String addrMobile; // 收货人手机号
	
	private String addrTelephone; // 固定电话
	
	private String addrProvince; // 省区划代码
	
	private String addrCity; // 市区划代码
	
	private String addrCounty; // 县区划代码
	
	private String addrZipcode; // 邮政编码
	
	private String addrAddress; // 详细地址
	
	private String payID; // 付款ID
	
	private String payment; // 支付方式（0：微信支付）
	
	private String receipt; // 发票方式（0：不开发票、1：纸质发票、2：电子发票）
	
	private String goodsPrice; // 商品价格
	
	private String freight; // 运费
	
	private String totalPrice; // 订单金额
	
	private String category; // 类型（0：购物、1：会员免费、2：会员收费）
	
	private String status; // 订单状态（0：未付款、1：已付款、2：订单完成、3：订单取消、4：订单关闭、5：售后服务）
	
	private String enable; // 是否启用（0：否、1：是）
	
	private String exist; // 是否删除（0：否、1：是）
	
	private String creator; // 创建人
	
	private String createTime; // 创建时间
	
	private String modifier; // 修改人
	
	private String modifyTime; // 修改时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getBuyerID() {
		return buyerID;
	}

	public void setBuyerID(String buyerID) {
		this.buyerID = buyerID;
	}

	public String getAddrName() {
		return addrName;
	}

	public void setAddrName(String addrName) {
		this.addrName = addrName;
	}

	public String getAddrMobile() {
		return addrMobile;
	}

	public void setAddrMobile(String addrMobile) {
		this.addrMobile = addrMobile;
	}

	public String getAddrTelephone() {
		return addrTelephone;
	}

	public void setAddrTelephone(String addrTelephone) {
		this.addrTelephone = addrTelephone;
	}

	public String getAddrProvince() {
		return addrProvince;
	}

	public void setAddrProvince(String addrProvince) {
		this.addrProvince = addrProvince;
	}

	public String getAddrCity() {
		return addrCity;
	}

	public void setAddrCity(String addrCity) {
		this.addrCity = addrCity;
	}

	public String getAddrCounty() {
		return addrCounty;
	}

	public void setAddrCounty(String addrCounty) {
		this.addrCounty = addrCounty;
	}

	public String getAddrZipcode() {
		return addrZipcode;
	}

	public void setAddrZipcode(String addrZipcode) {
		this.addrZipcode = addrZipcode;
	}

	public String getAddrAddress() {
		return addrAddress;
	}

	public void setAddrAddress(String addrAddress) {
		this.addrAddress = addrAddress;
	}

	public String getPayID() {
		return payID;
	}

	public void setPayID(String payID) {
		this.payID = payID;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

	public String getReceipt() {
		return receipt;
	}

	public void setReceipt(String receipt) {
		this.receipt = receipt;
	}

	public String getGoodsPrice() {
		return goodsPrice;
	}

	public void setGoodsPrice(String goodsPrice) {
		this.goodsPrice = goodsPrice;
	}

	public String getFreight() {
		return freight;
	}

	public void setFreight(String freight) {
		this.freight = freight;
	}

	public String getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEnable() {
		return enable;
	}

	public void setEnable(String enable) {
		this.enable = enable;
	}

	public String getExist() {
		return exist;
	}

	public void setExist(String exist) {
		this.exist = exist;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	public String getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	
}
