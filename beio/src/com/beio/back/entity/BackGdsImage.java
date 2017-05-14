package com.beio.back.entity;

/**
 * 后台商品图片
 * @author Dashi
 * @version 1.0.0
 * @date
 */
public class BackGdsImage {
	
	private String id; // id
	
	private String orgPath; // 原图地址
	
	private String bigPath; // 大图地址
	
	private String midPath; // 中图地址
	
	private String smaPath; // 小图地址
	
	private String sortNum; // 排序号码
	
	private String goodsID; // 商品ID
	
	private String category; // 类型（0：预览、1：详情）
	
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

	public String getOrgPath() {
		return orgPath;
	}

	public void setOrgPath(String orgPath) {
		this.orgPath = orgPath;
	}

	public String getBigPath() {
		return bigPath;
	}

	public void setBigPath(String bigPath) {
		this.bigPath = bigPath;
	}

	public String getMidPath() {
		return midPath;
	}

	public void setMidPath(String midPath) {
		this.midPath = midPath;
	}

	public String getSmaPath() {
		return smaPath;
	}

	public void setSmaPath(String smaPath) {
		this.smaPath = smaPath;
	}

	public String getSortNum() {
		return sortNum;
	}

	public void setSortNum(String sortNum) {
		this.sortNum = sortNum;
	}

	public String getGoodsID() {
		return goodsID;
	}

	public void setGoodsID(String goodsID) {
		this.goodsID = goodsID;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
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
