package com.beio.front.vo;

import java.util.List;

import com.beio.base.vo.Address;
import com.beio.front.entity.GdsBuycart;

/**
 * 订单值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class OrderVO extends GdsBuycart{

	private List<Address> address;
	
	private List<BuycartVO> carts;
	
	private String memberID;
	
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

	public String getMemberID() {
		return memberID;
	}

	public void setMemberID(String memberID) {
		this.memberID = memberID;
	}

	public String[] getCartIDs() {
		return cartIDs;
	}

	public void setCartIDs(String[] cartIDs) {
		this.cartIDs = cartIDs;
	}
	
}
