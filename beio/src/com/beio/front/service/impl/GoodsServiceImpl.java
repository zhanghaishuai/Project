package com.beio.front.service.impl;

import java.util.List;

import com.beio.base.entity.SysMember;
import com.beio.base.service.impl.BaseIbatisServiceImpl;
import com.beio.base.util.ComUtil;
import com.beio.base.vo.Root;
import com.beio.front.entity.GdsBuycart;
import com.beio.front.entity.GdsClassify;
import com.beio.front.entity.GdsGoods;
import com.beio.front.service.GoodsService;
import com.beio.front.vo.BuycartVO;
import com.beio.front.vo.CartInfoVO;
import com.beio.front.vo.ClassifyVO;
import com.beio.front.vo.GoodsVO;
import com.beio.front.vo.IndexInfoVO;
import com.beio.front.vo.OrderVO;
import com.beio.front.vo.PreOrderVO;
import com.beio.front.vo.SearchInfoVO;
import com.beio.front.vo.SettlementVO;
import com.beio.front.vo.TopInfoVO;

/**
 * 商品业务逻辑实现
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
@SuppressWarnings({ "unchecked" })
public class GoodsServiceImpl extends BaseIbatisServiceImpl implements GoodsService {

	@Override
	public TopInfoVO queryTopInfo(SysMember member) throws Exception {
		TopInfoVO top = new TopInfoVO();
		// 装载会员信息
		top.setMember(member);
		// 装载热搜关键字
		top.setSearchs(selectList("goods.querySearchs"));
		// 装载商品分类
		top.setClassifys(selectList("goods.queryClassifys"));
		// 装载购物车数量
		top.setCartNum(String.valueOf(selectOne("goods.buycartQuantity", member)));
		// TODO Auto-generated method stub
		return top;
	}
	
	@Override
	public IndexInfoVO queryIndexInfo(SysMember member) throws Exception {
		IndexInfoVO index = new IndexInfoVO();
		// 装载会员信息
		index.setMember(member);
		index.setBanners(selectList("goods.queryBanners"));
		GdsClassify classify = new GdsClassify();
		classify.setLevel("1");
		classify.setShowIndex("1");
		index.setClassifys(queryClassify(classify));
		return index;
	}
	
	@Override
	public SearchInfoVO querySearchInfo(SearchInfoVO searchInfoVO) throws Exception {
		searchInfoVO.setBrands(selectList("goods.queryBrands"));
		searchInfoVO.setClassifys(selectList("goods.queryClassifysBySearch", searchInfoVO));
		searchInfoVO.setNavClassifys(selectList("goods.queryClassifyNavBar", searchInfoVO));
		queryGoods(searchInfoVO);
		return searchInfoVO;
	}
	
	@Override
	public GoodsVO queryGoodsInfo(GoodsVO goodsVO) throws Exception {
		// TODO Auto-generated method stub
		goodsVO = (GoodsVO) selectOne("goods.queryGoodsByID", goodsVO.getId());
		goodsVO.setShows(selectList("goods.queryShowsByGoods", goodsVO));
		goodsVO.setDetails(selectList("goods.queryDetailsByGoods", goodsVO));
		return goodsVO;
	}
	
	@Override
	public int joinBuycat(GdsBuycart gdsBuycart) throws Exception {
		// TODO Auto-generated method stub
		if (update("goods.updtBuycart", gdsBuycart) < 1) {
			if (insert("goods.joinBuycart", gdsBuycart) < 1) {
				return 0;
			}
		}
		return 1;
	}
	
	@Override
	public CartInfoVO queryBuycart(CartInfoVO cartInfoVO) throws Exception {
		// TODO Auto-generated method stub
		cartInfoVO.setBuycarts(selectList("goods.queryBuycart", cartInfoVO.getMember()));
		if (ComUtil.isNotEmpty(cartInfoVO.getBuycarts())) {
			for (BuycartVO cart : cartInfoVO.getBuycarts()) {
				cart.setGoods(queryGoods(cart.getGoodsID()));
			}
		}
		return cartInfoVO;
	}
	
	@Override
	public SettlementVO settlement(SettlementVO settlementVO) throws Exception {
		// TODO Auto-generated method stub
		if (settlementVO.getMember() != null) {
			settlementVO.setAddress(selectList("sys.queryAddrByMID", settlementVO.getMember().getId()));
		}
		settlementVO.setCarts(selectList("goods.settlement", settlementVO));
		if (ComUtil.isNotEmpty(settlementVO.getCarts())) {
			for (BuycartVO cart : settlementVO.getCarts()) {
				cart.setGoods(queryGoods(cart.getGoodsID()));
			}
		}
		return settlementVO;
	}
	
	@Override
	public OrderVO myOrder(OrderVO orderVO) throws Exception {
		// TODO Auto-generated method stub
		selectPage("goods.queryOrder", orderVO);
		if (ComUtil.isNotEmpty(orderVO.getPageList())) {
			for (Object order : orderVO.getPageList()) {
				queryOrderDetails((OrderVO)order);
			}
		}
		return orderVO;
	}
	
	/**
	 * 查询订单详情
	 * @param orderVO
	 * @throws Exception
	 */
	private OrderVO queryOrderDetails(OrderVO orderVO) throws Exception{
//		orderVO.setDetails(selectList("goods.queryOrderDetails", orderVO));
//		if (ComUtil.isNotEmpty(orderVO.getDetails())) {
//			for (DetailsVO details : orderVO.getDetails()) {
//				details.setGoods(queryGoods(details.getGoodsID()));
//			}
//		}
		return orderVO;
	}
	
	/**
	 * 查询商品分类
	 * @param classify
	 * @return
	 * @throws Exception
	 */
	private List<ClassifyVO> queryClassify(GdsClassify classify) throws Exception{
		List<ClassifyVO> cvs = selectList("goods.queryClassifys", classify);
		if (ComUtil.isNotEmpty(cvs)) {
			for (ClassifyVO classifyVO : cvs) {
				classifyVO.setGoods(queryGoods(classifyVO));
			}
		}
		ClassifyVO hot = new ClassifyVO();
		hot.setName("热门商品");
		hot.setGoods(queryGoods(hot));
		cvs.add(0, hot);
		return cvs;
	}
	
	/**
	 * 查询商品信息
	 * @param classify
	 * @return
	 * @throws Exception
	 */
	private List<GoodsVO> queryGoods(GdsClassify classify) throws Exception{
		List<GoodsVO> gvs = selectList("goods.queryGoodsByClassify", classify);
		if (ComUtil.isNotEmpty(gvs)) {
			for (GoodsVO goodsVO : gvs) {
				goodsVO.setShows(selectList("goods.queryShowsByGoods", goodsVO));
			}
		}
		return gvs;
	}
	
	/**
	 * 查询商品信息
	 * @param classify
	 * @return
	 * @throws Exception
	 */
	private SearchInfoVO queryGoods(SearchInfoVO searchInfoVO) throws Exception{
		selectPage("goods.queryGoodsBySearch", searchInfoVO);
		if (ComUtil.isNotEmpty(searchInfoVO.getPageList())) {
			for (Object goodsVO : searchInfoVO.getPageList()) {
				((GoodsVO)goodsVO).setShows(selectList("goods.queryShowsByGoods", goodsVO));
			}
		}
		return searchInfoVO;
	}
	
	/**
	 * 查询商品信息
	 * @param classify
	 * @return
	 * @throws Exception
	 */
	private GoodsVO queryGoods(String goodsID) throws Exception{
		GoodsVO goods = (GoodsVO) selectOne("goods.queryGoodsByID", goodsID);
		if (goods != null) {
			goods.setShows(selectList("goods.queryShowsByGoods", goods));
		}
		return goods;
	}
	
	@Override
	public Root preOrder(PreOrderVO preOrderVO) throws Exception {
		// TODO Auto-generated method stub
		// 订单为空
		if (preOrderVO == null || ComUtil.isEmpty(preOrderVO.getOrders())) {
			return new Root("301");
		}
		// 声明商品总额、总运费、订单总额
		Float goodsPrice = 0f, freight = 0f, singleTotalPrice;
		int k = 0;
		// 校验商品准确性
		for (OrderVO order : preOrderVO.getOrders()) {
			// 查询订单对应商品
			GdsGoods goods = (GdsGoods) selectOne("goods.queryGoodsByID", order.getGoodsID());
			// 商品不存在
			if (goods == null) {
				return new Root("303");
			}
			// 计算单个商品总价
			singleTotalPrice = Float.valueOf(goods.getmPrice())*Integer.valueOf(order.getGoodsQuantity());
			// 计算商品总额
			goodsPrice += singleTotalPrice;
			// 计算总运费
			freight += Float.valueOf(goods.getFreight());
			// 价格不对等
			if (!Float.valueOf(goods.getmPrice()).equals(Float.valueOf(order.getGoodsPrice()))) {
				return new Root("304");
			}
			// 库存不足
			if (Integer.valueOf(goods.getStock()) < Integer.valueOf(order.getGoodsQuantity())) {
				return new Root("305");
			}
			// 单个商品价格计算异常
			if (!singleTotalPrice.equals(Float.valueOf(order.getTotalPrice()))) {
				return new Root("306");
			}
			// 生成订单号
			order.setOrderNo(ComUtil.generateOrderNO(++k));
			// 填充购买人
			order.setBuyerID(preOrderVO.getMember().getId());
		}
		// 商品下单
		update("goods.preGoods", preOrderVO);
		// 购物车下单
		update("goods.preBuycart", preOrderVO);
		// 购物订单下单
		insert("goods.preOrder", preOrderVO);
		// 返回成功结果
		return new Root(preOrderVO, "200");
	}

}
