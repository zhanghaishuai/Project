package com.beio.front.vo;

import com.beio.base.entity.SysMember;
import com.beio.front.entity.GdsBuycart;

/**
 * 分类值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class BuycartVO extends GdsBuycart{

	// 运费
	private String fee;
	
	// 商品详情
	private GoodsVO goods;
	
	// 会员信息
	private SysMember member;
	
	public String getFee() {
		return fee;
	}

	public void setFee(String fee) {
		this.fee = fee;
	}

	public GoodsVO getGoods() {
		return goods;
	}

	public void setGoods(GoodsVO goods) {
		this.goods = goods;
	}

	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}
	
}
