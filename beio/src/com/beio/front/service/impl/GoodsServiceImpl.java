package com.beio.front.service.impl;

import java.util.List;

import com.beio.base.entity.SysMember;
import com.beio.base.service.impl.BaseIbatisServiceImpl;
import com.beio.base.util.ComUtil;
import com.beio.front.entity.GdsBuycart;
import com.beio.front.entity.GdsClassify;
import com.beio.front.service.GoodsService;
import com.beio.front.vo.BuycartVO;
import com.beio.front.vo.ClassifyVO;
import com.beio.front.vo.GoodsVO;
import com.beio.front.vo.IndexInfoVO;
import com.beio.front.vo.SettlementVO;
import com.beio.front.vo.SearchInfoVO;
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
		goodsVO = (GoodsVO) selectOne("goods.queryGoodsByID", goodsVO);
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
				cart.setGoods(queryGoods(cart));
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
				cart.setGoods(queryGoods(cart));
			}
		}
		return settlementVO;
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
	private void queryGoods(SearchInfoVO searchInfoVO) throws Exception{
		selectPage("goods.queryGoodsBySearch", searchInfoVO);
		if (ComUtil.isNotEmpty(searchInfoVO.getPageList())) {
			for (Object goodsVO : searchInfoVO.getPageList()) {
				((GoodsVO)goodsVO).setShows(selectList("goods.queryShowsByGoods", goodsVO));
			}
		}
	}
	
	/**
	 * 查询商品信息
	 * @param classify
	 * @return
	 * @throws Exception
	 */
	private GoodsVO queryGoods(BuycartVO buycartVO) throws Exception{
		GoodsVO goods = (GoodsVO) selectOne("goods.queryGoodsByID", buycartVO.getGoodsID());
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

}
