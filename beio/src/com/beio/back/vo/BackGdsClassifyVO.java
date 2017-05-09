package com.beio.back.vo;

import com.beio.back.entity.BackGdsClassify;

public class BackGdsClassifyVO extends BackGdsClassify {
	
	private int page; // 页码
	
	private int rows; // 每页行数

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
	
}
