package com.beio.front.entity;

/**
 * 商品图片
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class GdsImage {

	private String id; // 主键
	
	private String orgPath; // 原图
	
	private String smaPath; // 小图
	
	private String midPath; // 中图
	
	private String bigPath; // 大图
	
	private String sortNum; // 排序号码
	
	private String goodsID; // 商品ID
	
	private String category; // 类型（0：预览、1：详情）
	
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

	public String getSmaPath() {
		return smaPath;
	}

	public void setSmaPath(String smaPath) {
		this.smaPath = smaPath;
	}

	public String getMidPath() {
		return midPath;
	}

	public void setMidPath(String midPath) {
		this.midPath = midPath;
	}

	public String getBigPath() {
		return bigPath;
	}

	public void setBigPath(String bigPath) {
		this.bigPath = bigPath;
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
