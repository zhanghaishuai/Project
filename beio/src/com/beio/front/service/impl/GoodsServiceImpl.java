package com.beio.front.service.impl;

import java.util.List;

import com.beio.base.entity.SysMember;
import com.beio.base.service.impl.BaseIbatisServiceImpl;
import com.beio.base.util.ComUtil;
import com.beio.base.util.Constant;
import com.beio.base.vo.Root;
import com.beio.front.entity.GdsBuycart;
import com.beio.front.entity.GdsClassify;
import com.beio.front.entity.GdsGoods;
import com.beio.front.service.GoodsService;
import com.beio.front.vo.BuycartVO;
import com.beio.front.vo.ClassifyVO;
import com.beio.front.vo.DetailsVO;
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
		// 装载热搜关键字
		top.setSearchs(selectList("goods.queryHotKeyword"));
		// 装载商品导航
		if (ComUtil.isEmpty(top.getNavbars())) {
			initNavbars(top);
		}
		// 装载商品分类
		if (ComUtil.isEmpty(top.getClassifys())) {
			initTopClassifys(top);
		}
		// 装载购买数量
		top.setCartNum(String.valueOf(selectOne("goods.buycartQuantity", member)));
		// 装载订单数量
		top.setOrderNum("0");
		// TODO Auto-generated method stub
		return top;
	}
	
	@Override
	public IndexInfoVO queryIndexInfo() throws Exception {
		IndexInfoVO index = new IndexInfoVO();
		index.setBanners(selectList("goods.queryBanners"));
		GdsClassify classify = new GdsClassify();
		classify.setLevel("1");
		classify.setIsShow("1");
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
	public List<BuycartVO> queryBuycart(SysMember member) throws Exception {
		// TODO Auto-generated method stub
		List<BuycartVO> carts = selectList("goods.queryBuycart", member);
		if (ComUtil.isNotEmpty(carts)) {
			for (BuycartVO cart : carts) {
				cart.setGoods(queryGoods(cart.getGoodsID()));
			}
		}
		return carts;
	}
	
	@Override
	public SettlementVO settlement(SettlementVO settlementVO) throws Exception {
		// TODO Auto-generated method stub
		settlementVO.setAddress(selectList("sys.queryAddrByMID", settlementVO.getMemberID()));
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
		orderVO.setDetails(selectList("goods.queryOrderDetails", orderVO));
		if (ComUtil.isNotEmpty(orderVO.getDetails())) {
			for (DetailsVO details : orderVO.getDetails()) {
				details.setGoods(queryGoods(details.getGoodsID()));
			}
		}
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
	
	/**
	 * 初始化商品导航
	 * @param top
	 * @throws Exception
	 */
	private void initNavbars(TopInfoVO top) throws Exception {
		synchronized (this) {
			if (ComUtil.isEmpty(top.getNavbars())) {
				top.setNavbars(selectList("goods.queryNavbars"));
			}
		}
	}
	
	/**
	 * 初始化商品分类
	 * @param top
	 * @throws Exception
	 */
	private void initTopClassifys(TopInfoVO top) throws Exception {
		synchronized (this) {
			if (ComUtil.isEmpty(top.getClassifys())) {
				top.setClassifys(selectList("goods.queryClassifys"));
			}
		}
	}

	@Override
	public Root preOrder(PreOrderVO preOrderVO) throws Exception {
		// TODO Auto-generated method stub
		// 订单为空
		if (preOrderVO == null) {
			return new Root("301");
		}
		// 详情为空
		if (ComUtil.isEmpty(preOrderVO.getDetails())) {
			return new Root("302");
		}
		// 声明商品总额、总运费、订单总额
		Float goodsPrice = 0f, freight = 0f, totalPrice = 0f, singleTotalPrice;
		// 校验商品准确性
		for (DetailsVO detail : preOrderVO.getDetails()) {
			// 查询订单对应商品
			GdsGoods goods = (GdsGoods) selectOne("goods.queryGoodsByID", detail.getGoodsID());
			// 商品不存在
			if (goods == null) {
				return new Root("303");
			}
			// 计算单个商品总价
			singleTotalPrice = Float.valueOf(goods.getmPrice())*Integer.valueOf(detail.getQuantity());
			// 计算商品总额
			goodsPrice += singleTotalPrice;
			// 计算总运费
			freight += Constant.TEMPORARYFREIGHT;
			// 价格不对等
			if (!Float.valueOf(goods.getmPrice()).equals(Float.valueOf(detail.getPrice()))) {
				return new Root("304");
			}
			// 库存不足
			if (Integer.valueOf(goods.getStock()) < Integer.valueOf(detail.getQuantity())) {
				return new Root("305");
			}
			// 单个商品价格计算异常
			if (!singleTotalPrice.equals(Float.valueOf(detail.getTotalPrice()))) {
				return new Root("306");
			}
		}
		// 商品总额异常
		if (!goodsPrice.equals(Float.valueOf(preOrderVO.getGoodsPrice()))) {
			return new Root("306");
		}
		// 总运费异常
		if (!freight.equals(Float.valueOf(preOrderVO.getFreight()))) {
			return new Root("307");
		}
		// 计算订单总额
		totalPrice += goodsPrice + freight;
		// 订单总额异常
		if (!totalPrice.equals(Float.valueOf(preOrderVO.getTotalPrice()))) {
			System.out.println(totalPrice);
			System.out.println(Float.valueOf(preOrderVO.getTotalPrice()));
			return new Root("308");
		}
		// 生成订单号
		preOrderVO.setOrderNo(ComUtil.generateOrderNO());
		// 购物订单下单
		insert("goods.preOrder", preOrderVO);
		// 查询订单ID
		preOrderVO.setId(String.valueOf(selectOne("sys.queryid")));
		// 订单详情下单
		insert("goods.preDetails", preOrderVO);
		// 购物车下单
		update("goods.preBuycart", preOrderVO);
		// 商品下单
		update("goods.preGoods", preOrderVO);
		// 返回成功结果
		return new Root(preOrderVO, "200");
	}

}
