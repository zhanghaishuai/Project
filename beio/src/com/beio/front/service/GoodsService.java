package com.beio.front.service;

import com.beio.base.entity.SysMember;
import com.beio.base.entity.SysPay;
import com.beio.base.service.BaseIbaitsService;
import com.beio.base.vo.Root;
import com.beio.front.entity.GdsBuycart;
import com.beio.front.vo.CartInfoVO;
import com.beio.front.vo.GoodsVO;
import com.beio.front.vo.IndexInfoVO;
import com.beio.front.vo.OrderVO;
import com.beio.front.vo.PreOrderVO;
import com.beio.front.vo.SearchInfoVO;
import com.beio.front.vo.SettlementVO;
import com.beio.front.vo.TopInfoVO;

/**
 * 商品业务逻辑接口
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public interface GoodsService extends BaseIbaitsService{

	/**
	 * 查询头部
	 * @return
	 * @throws Exception
	 */
	public TopInfoVO queryTopInfo(SysMember member) throws Exception;
	
	/**
	 * 查询首页
	 * @return
	 * @throws Exception
	 */
	public IndexInfoVO queryIndexInfo(SysMember member) throws Exception;
	
	/**
	 * 查询搜索
	 * @return
	 * @throws Exception
	 */
	public SearchInfoVO querySearchInfo(SearchInfoVO condition) throws Exception;
	
	/**
	 * 查询商品
	 * @return
	 * @throws Exception
	 */
	public GoodsVO queryGoodsInfo(GoodsVO goodsVO) throws Exception;
	
	/**
	 * 加入购物车
	 * @param gdsBuycart
	 * @return
	 * @throws Exception
	 */
	public int joinBuycat(GdsBuycart gdsBuycart) throws Exception;
	
	/**
	 * 查询购物车
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public CartInfoVO queryBuycart(CartInfoVO cartInfoVO) throws Exception;
	
	/**
	 * 购物车结算
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public SettlementVO settlement(SettlementVO settlementVO) throws Exception;
	
	/**
	 * 商品下单
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public Root preOrder(PreOrderVO preOrderVO) throws Exception;
	
	/**
	 * 我的订单
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public OrderVO myOrder(OrderVO orderVO) throws Exception;
	
	/**
	 * 查询运费
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public SettlementVO freight(SettlementVO settlementVO) throws Exception;
	
	/**
	 * 支付订单
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public Root payOrder(SysPay pay) throws Exception;
	
	/**
	 * 取消订单
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public Root cancelOrder(OrderVO orderVO) throws Exception;
	
	/**
	 * 合并支付
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public Root mergePay(PreOrderVO preOrderVO) throws Exception;
	
}
