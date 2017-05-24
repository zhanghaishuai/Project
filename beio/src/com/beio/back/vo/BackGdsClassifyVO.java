package com.beio.back.vo;

import java.util.ArrayList;
import java.util.List;

import com.beio.back.entity.BackGdsClassify;

public class BackGdsClassifyVO extends BackGdsClassify {
	
	private int page; // 页码
	
	private int rows; // 每页行数
	
	private String creatorName; // 创建人
	
	private String modifierName; // 修改人
	
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

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public String getModifierName() {
		return modifierName;
	}

	public void setModifierName(String modifierName) {
		this.modifierName = modifierName;
	}

	private List<BackGdsClassify> children = new ArrayList<BackGdsClassify>();

	public List<BackGdsClassify> getChildren() {
		return children;
	}

	public void setChildren(List<BackGdsClassify> children) {
		this.children = children;
	}
	
}
