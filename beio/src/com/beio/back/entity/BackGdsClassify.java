package com.beio.back.entity;

/**
 * 后台商品分类
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public class BackGdsClassify {
	
	private String id; // 主键
	
	private String pid; // 上级
	
	private String sort; // 排序
	
	private String name; // 名称
	
	private String level; // 等级
	
	private String showIndex; // 首页展示（0：否、1：是）
	
	private String showAbeam; // 横向展示（0：否、1：是）
	
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

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getShowIndex() {
		return showIndex;
	}

	public void setShowIndex(String showIndex) {
		this.showIndex = showIndex;
	}

	public String getShowAbeam() {
		return showAbeam;
	}

	public void setShowAbeam(String showAbeam) {
		this.showAbeam = showAbeam;
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
