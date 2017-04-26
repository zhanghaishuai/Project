package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysMember;

/**
 * 分类值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class CartInfoVO{

	private List<BuycartVO> buycarts;
	
	private SysMember member;

	public List<BuycartVO> getBuycarts() {
		return buycarts;
	}

	public void setBuycarts(List<BuycartVO> buycarts) {
		this.buycarts = buycarts;
	}

	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}
	
}
