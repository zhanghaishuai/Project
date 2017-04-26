package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysMember;
import com.beio.base.vo.Address;
import com.beio.front.entity.GdsBuycart;

/**
 * 结算值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class SettlementVO extends GdsBuycart{

	private List<Address> address;
	
	private List<BuycartVO> carts;
	
	private SysMember member;
	
	private String[] cartIDs;

	public List<Address> getAddress() {
		return address;
	}

	public void setAddress(List<Address> address) {
		this.address = address;
	}

	public List<BuycartVO> getCarts() {
		return carts;
	}

	public void setCarts(List<BuycartVO> carts) {
		this.carts = carts;
	}

	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}

	public String[] getCartIDs() {
		return cartIDs;
	}

	public void setCartIDs(String[] cartIDs) {
		this.cartIDs = cartIDs;
	}
	
}
