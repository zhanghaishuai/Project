package com.beio.front.vo;

import java.util.List;

import com.beio.base.vo.Page;
import com.beio.front.entity.GdsClassify;
import com.beio.front.entity.GdsNavbar;
import com.beio.front.entity.GdsSearch;

/**
 * 头部值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class TopInfoVO extends Page{

	private List<GdsSearch> searchs = null;
	
	private static List<GdsNavbar> navbars = null;
	
	private static List<GdsClassify> classifys = null;
	
	private String cartNum;
	
	private String orderNum;
	
	private boolean login;

	public List<GdsSearch> getSearchs() {
		return searchs;
	}

	public void setSearchs(List<GdsSearch> searchs) {
		this.searchs = searchs;
	}

	public List<GdsNavbar> getNavbars() {
		return navbars;
	}

	public void setNavbars(List<GdsNavbar> navbars) {
		TopInfoVO.navbars = navbars;
	}

	public List<GdsClassify> getClassifys() {
		return classifys;
	}

	public void setClassifys(List<GdsClassify> classifys) {
		TopInfoVO.classifys = classifys;
	}

	public String getCartNum() {
		return cartNum;
	}

	public void setCartNum(String cartNum) {
		this.cartNum = cartNum;
	}

	public String getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}

	public boolean isLogin() {
		return login;
	}

	public void setLogin(boolean login) {
		this.login = login;
	}

}
