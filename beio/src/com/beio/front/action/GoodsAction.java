package com.beio.front.action;

import com.beio.base.action.BaseAction;
import com.beio.base.entity.SysMember;
import com.beio.base.util.ComUtil;
import com.beio.front.entity.GdsBuycart;
import com.beio.front.entity.GdsSearch;
import com.beio.front.service.GoodsService;
import com.beio.front.vo.GoodsVO;
import com.beio.front.vo.IndexInfoVO;
import com.beio.front.vo.OrderVO;
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
	
	private GoodsService goodsService;
	
	private GdsSearch gdsSearch;
	
	private SearchInfoVO searchInfo;
	
	private GoodsVO goodsVO;
	
	private GdsBuycart gdsBuycart;
	
	private OrderVO orderVO;
	
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
		SysMember m = sessionMember();
		TopInfoVO top = goodsService.queryTopInfo(m);
		top.setLogin(m != null ? true : false);
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
	
	/**
	 * 购买商品
	 * @return
	 * @throws Exception
	 */
	public String buyGoods() throws Exception{
		if (ComUtil.isNotMatches(getRegex("buyNum").getRegex(), gdsBuycart.getQuantity())) {
			setRoot("136");
			return JSON;
		}
		gdsBuycart.setBuyerID(sessionMemberID());
		gdsBuycart.setCreator(sessionMemberID());
		gdsBuycart.setCreateTime(curTimeStr());
		gdsBuycart.setModifier(sessionMemberID());
		gdsBuycart.setModifyTime(curTimeStr());
		if (goodsService.joinBuycat(gdsBuycart) < 1) {
			setRoot("100");
			return JSON;
		}
		setRoot(goodsService.selectOne("goods.buycartQuantity", sessionMember()), "200");
		return JSON;
	}
	
	/**
	 * 查询购物车
	 * @return
	 * @throws Exception
	 */
	public String queryBuycart() throws Exception{
		setRoot(goodsService.queryBuycart(sessionMember()), "200");
		return JSON;
	}
	
	/**
	 * 编辑购物车
	 * @return
	 * @throws Exception
	 */
	public String editBuycart() throws Exception{
		if (ComUtil.isNotEmpty(gdsBuycart.getQuantity()) && ComUtil.isNotMatches(
				getRegex("buyNum").getRegex(), gdsBuycart.getQuantity())) {
			setRoot("136");
			return JSON;
		}
		gdsBuycart.setModifier(sessionMemberID());
		gdsBuycart.setModifyTime(curTimeStr());
		if (goodsService.update("goods.editBuycart", gdsBuycart) < 1) {
			setRoot("100");
			return JSON;
		}
		setRoot(gdsBuycart, "200");
		return JSON;
	}
	
	/**
	 * 购物车结算
	 * @return
	 * @throws Exception
	 */
	public String settlement() throws Exception{
		orderVO.setMemberID(sessionMemberID());
		setRoot(goodsService.settlement(orderVO), "200");
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

	public GdsBuycart getGdsBuycart() {
		return gdsBuycart;
	}

	public void setGdsBuycart(GdsBuycart gdsBuycart) {
		this.gdsBuycart = gdsBuycart;
	}

	public OrderVO getOrderVO() {
		return orderVO;
	}

	public void setOrderVO(OrderVO orderVO) {
		this.orderVO = orderVO;
	}

}
