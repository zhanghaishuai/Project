package com.beio.back.entity;

/**
 * 商品订单
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class BackGdsOrder {

	private String id; // 主键

	private String payID; // 付款ID

	private String buyerID; // 买家ID

	private String goodsID; // 商品ID

	private String orderNo; // 订单编号

	private String addrName; // 收货人姓名

	private String addrMobile; // 收货人手机号

	private String addrTelephone; // 收货人电话

	private String addrProvince; // 收货人省区划代码

	private String addrCity; // 收货人市区划代码

	private String addrCounty; // 收货人县区划代码

	private String addrZipcode; // 收货人邮政编码

	private String addrAddress; // 收货人详细地址

	private String receiptStatus; // 发票方式（0：不开发票、1：普通发票）
	
	private String receiptType; // 发票方式（0：个人、1：单位）

	private String receiptTitle; // 发票抬头

	private String goodsName; // 商品名称

	private String goodsPrice; // 商品价格
	
	private String goodsFreight; // 商品运费

	private String goodsQuantity; // 商品数量
	
	private String totalPrice; // 应付总额

	private String status; // 订单状态（0：未付款、1：待发货、2：已发货、3：已完成）
	
	private String waybillNo; // 运单号

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

	public String getPayID() {
		return payID;
	}

	public void setPayID(String payID) {
		this.payID = payID;
	}

	public String getBuyerID() {
		return buyerID;
	}

	public void setBuyerID(String buyerID) {
		this.buyerID = buyerID;
	}

	public String getGoodsID() {
		return goodsID;
	}

	public void setGoodsID(String goodsID) {
		this.goodsID = goodsID;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
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

	public String getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(String receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	public String getReceiptType() {
		return receiptType;
	}

	public void setReceiptType(String receiptType) {
		this.receiptType = receiptType;
	}

	public String getReceiptTitle() {
		return receiptTitle;
	}

	public void setReceiptTitle(String receiptTitle) {
		this.receiptTitle = receiptTitle;
	}

	public String getGoodsName() {
		return goodsName;
	}

	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	public String getGoodsPrice() {
		return goodsPrice;
	}

	public void setGoodsPrice(String goodsPrice) {
		this.goodsPrice = goodsPrice;
	}

	public String getGoodsFreight() {
		return goodsFreight;
	}

	public void setGoodsFreight(String goodsFreight) {
		this.goodsFreight = goodsFreight;
	}

	public String getGoodsQuantity() {
		return goodsQuantity;
	}

	public void setGoodsQuantity(String goodsQuantity) {
		this.goodsQuantity = goodsQuantity;
	}

	public String getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getWaybillNo() {
		return waybillNo;
	}

	public void setWaybillNo(String waybillNo) {
		this.waybillNo = waybillNo;
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
