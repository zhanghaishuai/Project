package com.beio.base.vo;

import com.beio.base.entity.SysInvite;

public class Invite extends SysInvite{

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

