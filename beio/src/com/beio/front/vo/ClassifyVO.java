package com.beio.front.vo;

import java.util.List;

import com.beio.front.entity.GdsClassify;

/**
 * 分类值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class ClassifyVO extends GdsClassify{

	private List<GoodsVO> goods = null;

	public List<GoodsVO> getGoods() {
		return goods;
	}

	public void setGoods(List<GoodsVO> goods) {
		this.goods = goods;
	}
	
}
