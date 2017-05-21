package com.beio.back.vo;

import com.beio.back.entity.BackGdsBrand;

/**
 * 后台商品品牌值对象
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public class BackGdsBrandVO extends BackGdsBrand {
	
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
	
}
