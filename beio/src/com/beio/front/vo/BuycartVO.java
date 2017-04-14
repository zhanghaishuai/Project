package com.beio.front.vo;

import com.beio.front.entity.GdsBuycart;

/**
 * 分类值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class BuycartVO extends GdsBuycart{

	// 商品详情
	private GoodsVO goods;

	public GoodsVO getGoods() {
		return goods;
	}

	public void setGoods(GoodsVO goods) {
		this.goods = goods;
	}
	
}
