package com.beio.base.vo;

import com.beio.base.entity.SysUser;


public class User extends SysUser {
	private String imgVerifyCode; // 图片验证码
	
	private int page; // 页码
	
	private int rows; // 每页行数

	public String getImgVerifyCode() {
		return imgVerifyCode;
	}

	public void setImgVerifyCode(String imgVerifyCode) {
		this.imgVerifyCode = imgVerifyCode;
	}

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
