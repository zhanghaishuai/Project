package com.beio.front.action;

import com.beio.base.action.BaseAction;
import com.beio.front.dao.GoodsService;
import com.beio.front.entity.GdsSearch;
import com.beio.front.vo.TopInfoVO;

/**
 * 商品控制器
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class GoodsAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	GoodsService goodsService;
	
	private GdsSearch gdsSearch;
	
	/**
	 * 商品搜索
	 * @return
	 * @throws Exception
	 */
	public String search() throws Exception{
		gdsSearch.setCreator(sessionMemberID());
		gdsSearch.setCreateTime(curTimeStr());
		baseIbaitsService.insert("goods.insertSearch", gdsSearch);
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 头部信息
	 * @return
	 */
	public String queryTopInfo() throws Exception{
		TopInfoVO top = goodsService.queryTopInfo();
		top.setLogin(sessionMember() != null ? true : false);
		setRoot(top, "200");
		return JSON;
	}
	
	/**
	 * 商品轮播
	 * @return
	 * @throws Exception
	 */
	public String queryIndexInfo() throws Exception{
		setRoot(goodsService.queryIndexInfo(), "200");
		return JSON;
	}

	public GoodsService getGoodsService() {
		return goodsService;
	}

	public void setGoodsService(GoodsService goodsService) {
		this.goodsService = goodsService;
	}

	public GdsSearch getGdsSearch() {
		return gdsSearch;
	}

	public void setGdsSearch(GdsSearch gdsSearch) {
		this.gdsSearch = gdsSearch;
	}
	
}
