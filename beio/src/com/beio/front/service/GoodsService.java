package com.beio.front.service;

import com.beio.base.entity.SysMember;
import com.beio.base.service.BaseIbaitsService;
import com.beio.front.entity.GdsBuycat;
import com.beio.front.vo.GoodsVO;
import com.beio.front.vo.IndexInfoVO;
import com.beio.front.vo.SearchInfoVO;
import com.beio.front.vo.TopInfoVO;

/**
 * 商品业务逻辑接口
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public interface GoodsService extends BaseIbaitsService{

	/**
	 * 查询头部信息
	 * @return
	 * @throws Exception
	 */
	public TopInfoVO queryTopInfo(SysMember member) throws Exception;
	
	/**
	 * 查询首页信息
	 * @return
	 * @throws Exception
	 */
	public IndexInfoVO queryIndexInfo() throws Exception;
	
	/**
	 * 查询搜索信息
	 * @return
	 * @throws Exception
	 */
	public SearchInfoVO querySearchInfo(SearchInfoVO condition) throws Exception;
	
	/**
	 * 查询商品详情
	 * @return
	 * @throws Exception
	 */
	public GoodsVO queryGoodsInfo(GoodsVO goodsVO) throws Exception;
	
	/**
	 * 加入购物车
	 * @param gdsBuycat
	 * @return
	 * @throws Exception
	 */
	public int joinBuycat(GdsBuycat gdsBuycat) throws Exception;
	
}
