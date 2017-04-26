package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysMember;
import com.beio.front.entity.GdsClassify;
import com.beio.front.entity.GdsSearch;

/**
 * 头部值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class TopInfoVO {
	
	private String cartNum;
	
	private String orderNum;
	
	private SysMember member;

	private List<GdsSearch> searchs = null;
	
	private List<GdsClassify> classifys = null;

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

	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}

	public List<GdsSearch> getSearchs() {
		return searchs;
	}

	public void setSearchs(List<GdsSearch> searchs) {
		this.searchs = searchs;
	}

	public List<GdsClassify> getClassifys() {
		return classifys;
	}

	public void setClassifys(List<GdsClassify> classifys) {
		this.classifys = classifys;
	}
	
}
