package com.beio.front.action;

import com.beio.base.action.BaseAction;
import com.beio.front.entity.GdsSearch;
import com.beio.front.service.GoodsService;
import com.beio.front.vo.GoodsVO;
import com.beio.front.vo.IndexInfoVO;
import com.beio.front.vo.SearchInfoVO;
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
	
	private SearchInfoVO searchInfo;
	
	private GoodsVO goodsVO;
	
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
	 * 首页信息
	 * @return
	 * @throws Exception
	 */
	public String queryIndexInfo() throws Exception{
		IndexInfoVO index = goodsService.queryIndexInfo();
		index.setLogin(sessionMember() != null ? true : false);
		setRoot(index, "200");
		return JSON;
	}
	
	/**
	 * 搜索信息
	 * @return
	 * @throws Exception
	 */
	public String querySearchInfo() throws Exception{
		searchInfo.setPageSize(25);
		searchInfo.setLogin(sessionMember() != null ? true : false);
		setRoot(goodsService.querySearchInfo(searchInfo), "200");
		return JSON;
	}
	
	/**
	 * 商品详情
	 * @return
	 * @throws Exception
	 */
	public String queryGoodsInfo() throws Exception{
		goodsVO = goodsService.queryGoodsInfo(goodsVO);
		goodsVO.setLogin(sessionMember() != null ? true : false);
		setRoot(goodsVO, "200");
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

	public SearchInfoVO getSearchInfo() {
		return searchInfo;
	}

	public void setSearchInfo(SearchInfoVO searchInfo) {
		this.searchInfo = searchInfo;
	}

	public GoodsVO getGoodsVO() {
		return goodsVO;
	}

	public void setGoodsVO(GoodsVO goodsVO) {
		this.goodsVO = goodsVO;
	}

}
