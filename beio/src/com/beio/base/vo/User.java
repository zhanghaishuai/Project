package com.beio.base.vo;

import java.util.List;

import com.beio.base.entity.SysMenu;
import com.beio.base.entity.SysRole;
import com.beio.base.entity.SysUser;

public class User extends SysUser {
	
	private int page; // 页码
	
	private int rows; // 每页行数
	
	private List<SysRole> roles; // 角色
	
	private List<SysMenu> menus; // 菜单
	
	private String imgVerifyCode; // 图片验证码

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

	public List<SysRole> getRoles() {
		return roles;
	}

	public void setRoles(List<SysRole> roles) {
		this.roles = roles;
	}

	public List<SysMenu> getMenus() {
		return menus;
	}

	public void setMenus(List<SysMenu> menus) {
		this.menus = menus;
	}
	
	public String getImgVerifyCode() {
		return imgVerifyCode;
	}

	public void setImgVerifyCode(String imgVerifyCode) {
		this.imgVerifyCode = imgVerifyCode;
	}
	
}
