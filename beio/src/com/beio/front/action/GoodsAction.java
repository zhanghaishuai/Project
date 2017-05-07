package com.beio.front.action;

import com.beio.base.action.BaseAction;
import com.beio.base.entity.SysPay;
import com.beio.base.util.ComUtil;
import com.beio.front.entity.GdsService;
import com.beio.front.service.GoodsService;
import com.beio.front.vo.BuycartVO;
import com.beio.front.vo.CartInfoVO;
import com.beio.front.vo.DetailVO;
import com.beio.front.vo.GoodsVO;
import com.beio.front.vo.OrderVO;
import com.beio.front.vo.PreOrderVO;
import com.beio.front.vo.SearchInfoVO;
import com.beio.front.vo.SettlementVO;

/**
 * 商品控制器
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class GoodsAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	private GoodsService goodsService;
	
	private SearchInfoVO searchInfo = new SearchInfoVO();
	
	private GoodsVO goodsVO = new GoodsVO();
	
	private BuycartVO buycartVO = new BuycartVO();
	
	private CartInfoVO cartInfoVO = new CartInfoVO();
	
	private SettlementVO settlementVO = new SettlementVO();
	
	private PreOrderVO preOrderVO = new PreOrderVO();
	
	private OrderVO orderVO = new OrderVO();
	
	private SysPay pay = new SysPay();
	
	private GdsService service = new GdsService();
	
	private DetailVO detailVO = new DetailVO();
	
	/**
	 * 头部信息
	 * @return
	 */
	public String queryTop() throws Exception{
		setRoot(goodsService.queryTopInfo(sessionMember()), "200");
		return JSON;
	}
	
	/**
	 * 首页信息
	 * @return
	 * @throws Exception
	 */
	public String queryIndexInfo() throws Exception{
		setRoot(goodsService.queryIndexInfo(sessionMember()), "200");
		return JSON;
	}
	
	/**
	 * 搜索信息
	 * @return
	 * @throws Exception
	 */
	public String querySearchInfo() throws Exception{
		searchInfo.setPageSize(25);
		searchInfo.setMember(sessionMember());
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
		goodsVO.setMember(sessionMember());
		setRoot(goodsVO, "200");
		return JSON;
	}
	
	/**
	 * 购买商品
	 * @return
	 * @throws Exception
	 */
	public String buyGoods() throws Exception{
		if (ComUtil.isNotMatches(getRegex("buyNum").getRegex(), buycartVO.getQuantity())) {
			setRoot("136");
			return JSON;
		}
		buycartVO.setMember(sessionMember());
		buycartVO.setBuyerID(sessionMemberID());
		buycartVO.setCreator(sessionMemberID());
		buycartVO.setCreateTime(curTimeStr());
		buycartVO.setModifier(sessionMemberID());
		buycartVO.setModifyTime(curTimeStr());
		if (goodsService.joinBuycat(buycartVO) < 1) {
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
		cartInfoVO.setMember(sessionMember());
		setRoot(goodsService.queryBuycart(cartInfoVO), "200");
		return JSON;
	}
	
	/**
	 * 编辑购物车
	 * @return
	 * @throws Exception
	 */
	public String editBuycart() throws Exception{
		if (ComUtil.isNotEmpty(buycartVO.getQuantity()) && ComUtil.isNotMatches(
				getRegex("buyNum").getRegex(), buycartVO.getQuantity())) {
			setRoot("136");
			return JSON;
		}
		buycartVO.setModifier(sessionMemberID());
		buycartVO.setModifyTime(curTimeStr());
		if (goodsService.update("goods.editBuycart", buycartVO) < 1) {
			setRoot("100");
			return JSON;
		}
		setRoot(buycartVO, "200");
		return JSON;
	}
	
	/**
	 * 购物车结算
	 * @return
	 * @throws Exception
	 */
	public String settlement() throws Exception{
		settlementVO.setMember(sessionMember());
		setRoot(goodsService.settlement(settlementVO), "200");
		return JSON;
	}
	
	/**
	 * 商品下单
	 * @return
	 * @throws Exception
	 */
	public String preOrder() throws Exception{
		preOrderVO.setCreator(sessionMemberID());
		preOrderVO.setCreateTime(curTimeStr());
		preOrderVO.setModifier(sessionMemberID());
		preOrderVO.setModifyTime(curTimeStr());
		preOrderVO.setPre_time(curTimeStr());
		root = goodsService.preOrder(preOrderVO);
		return JSON;
	}
	
	/**
	 * 查询运费
	 * @return
	 * @throws Exception
	 */
	public String freight() throws Exception{
		settlementVO.setMember(sessionMember());
		setRoot(goodsService.freight(settlementVO), "200");
		return JSON;
	}
	
	/**
	 * 我的订单
	 * @return
	 * @throws Exception
	 */
	public String myOrder() throws Exception{
		orderVO.setOrderNo(ComUtil.trim(orderVO.getOrderNo()));
		orderVO.setBuyerID(sessionMemberID());
		setRoot(goodsService.myOrder(orderVO), "200");
		return JSON;
	}
	
	/**
	 * 支付订单
	 * @return
	 * @throws Exception
	 */
	public String payOrder() throws Exception{
		pay.setModifier(sessionMemberID());
		pay.setModifyTime(curTimeStr());
		pay.setPay_time(curTimeStr());
		root = goodsService.payOrder(pay);
		return JSON;
	}
	
	/**
	 * 取消订单
	 * @return
	 * @throws Exception
	 */
	public String cannelOrder() throws Exception{
		orderVO.setModifier(sessionMemberID());
		orderVO.setModifyTime(curTimeStr());
		root = goodsService.cancelOrder(orderVO);
		return JSON;
	}
	
	/**
	 * 合并支付
	 * @return
	 * @throws Exception
	 */
	public String mergePay() throws Exception{
		preOrderVO.setCreator(sessionMemberID());
		preOrderVO.setCreateTime(curTimeStr());
		preOrderVO.setModifier(sessionMemberID());
		preOrderVO.setModifyTime(curTimeStr());
		preOrderVO.setPre_time(curTimeStr());
		root = goodsService.mergePay(preOrderVO);
		return JSON;
	}
	
	/**
	 * 确认收货
	 * @return
	 * @throws Exception
	 */
	public String receive() throws Exception{
		orderVO.setModifier(sessionMemberID());
		orderVO.setModifyTime(curTimeStr());
		if (baseIbaitsService.update("goods.receive", orderVO) < 1) {
			setRoot("100");
		}else {
			setRoot("200");
		}
		return JSON;
	}
	
	/**
	 * 售后服务
	 * @return
	 * @throws Exception
	 */
	public String service() throws Exception{
		service.setCreator(sessionMemberID());
		service.setCreateTime(curTimeStr());
		service.setModifier(sessionMemberID());
		service.setModifyTime(curTimeStr());
		if (baseIbaitsService.update("goods.service", service) < 1) {
			setRoot("100");
		}else {
			setRoot("200");
		}
		return JSON;
	}
	
	/**
	 * 订单详情
	 * @return
	 * @throws Exception
	 */
	public String detail() throws Exception{
		root = goodsService.detail(detailVO);
		return JSON;
	}

	public GoodsService getGoodsService() {
		return goodsService;
	}

	public void setGoodsService(GoodsService goodsService) {
		this.goodsService = goodsService;
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

	public BuycartVO getBuycartVO() {
		return buycartVO;
	}

	public void setBuycartVO(BuycartVO buycartVO) {
		this.buycartVO = buycartVO;
	}

	public SettlementVO getSettlementVO() {
		return settlementVO;
	}

	public void setSettlementVO(SettlementVO settlementVO) {
		this.settlementVO = settlementVO;
	}

	public PreOrderVO getPreOrderVO() {
		return preOrderVO;
	}

	public void setPreOrderVO(PreOrderVO preOrderVO) {
		this.preOrderVO = preOrderVO;
	}

	public OrderVO getOrderVO() {
		return orderVO;
	}

	public void setOrderVO(OrderVO orderVO) {
		this.orderVO = orderVO;
	}

	public CartInfoVO getCartInfoVO() {
		return cartInfoVO;
	}

	public void setCartInfoVO(CartInfoVO cartInfoVO) {
		this.cartInfoVO = cartInfoVO;
	}

	public SysPay getPay() {
		return pay;
	}

	public void setPay(SysPay pay) {
		this.pay = pay;
	}

	public GdsService getService() {
		return service;
	}

	public void setService(GdsService service) {
		this.service = service;
	}

	public DetailVO getDetailVO() {
		return detailVO;
	}

	public void setDetailVO(DetailVO detailVO) {
		this.detailVO = detailVO;
	}

}
