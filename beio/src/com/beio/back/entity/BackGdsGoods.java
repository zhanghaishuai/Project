package com.beio.back.entity;


/**
 * 商品详情
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public class BackGdsGoods{

	private String id; // 主键
	
	private String name; // 名称
	
	private String descr; // 描述
	
	private String mPrice; // 会员价
	
	private String cPrice; // 普通价
	
	private String weight; // 重量
	
	private String salds; // 已售数量
	
	private String stock; // 库存数量
	
	private String heatUp; // 热度
	
	private String brandID; // 品牌ID
	
	private String classifyID; // 分类ID
	
	private String remark; // 备注
	
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescr() {
		return descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getSalds() {
		return salds;
	}

	public void setSalds(String salds) {
		this.salds = salds;
	}

	public String getStock() {
		return stock;
	}

	public void setStock(String stock) {
		this.stock = stock;
	}

	public String getHeatUp() {
		return heatUp;
	}

	public void setHeatUp(String heatUp) {
		this.heatUp = heatUp;
	}

	public String getBrandID() {
		return brandID;
	}

	public void setBrandID(String brandID) {
		this.brandID = brandID;
	}

	public String getClassifyID() {
		return classifyID;
	}

	public void setClassifyID(String classifyID) {
		this.classifyID = classifyID;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getmPrice() {
		return mPrice;
	}

	public void setmPrice(String mPrice) {
		this.mPrice = mPrice;
	}

	public String getcPrice() {
		return cPrice;
	}

	public void setcPrice(String cPrice) {
		this.cPrice = cPrice;
	}

}
