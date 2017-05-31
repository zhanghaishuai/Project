package com.beio.back.entity;

import com.beio.base.util.ComUtil;
import com.beio.base.util.PathUtil;

public class BackGdsBanner {

	private String id; // 主键

	private String url; // 地址

	private String path; // 路径
	
	private String sort; // 排序号码

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

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getPath() {
		return path;
	}

	public String getHttpPath() {
		if (ComUtil.isNotEmpty(path)) {
			try {
				return PathUtil.serverPath(path);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
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
