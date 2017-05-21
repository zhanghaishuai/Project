package com.beio.base.vo;

import java.util.List;

import com.beio.base.entity.SysMenu;
import com.beio.base.entity.SysRole;

/**
 * 
 * @author 27100
 *
 */
public class Role extends SysRole{

	private String userID;
	
	private List<SysMenu> menus;
	
	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public List<SysMenu> getMenus() {
		return menus;
	}

	public void setMenus(List<SysMenu> menus) {
		this.menus = menus;
	}
	
}
