package com.beio.front.dao.impl;

import java.util.List;

import com.beio.base.service.impl.BaseIbatisServiceImpl;
import com.beio.base.util.CacheUtil;
import com.beio.base.util.ComUtil;
import com.beio.front.dao.GoodsService;
import com.beio.front.entity.GdsClassify;
import com.beio.front.entity.GdsImage;
import com.beio.front.vo.ClassifyVO;
import com.beio.front.vo.GoodsVO;
import com.beio.front.vo.IndexInfoVO;
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
	public TopInfoVO queryTopInfo() throws Exception {
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
		top.setCartNum("0");
		// 装载订单数量
		top.setOrderNum("0");
		// TODO Auto-generated method stub
		return top;
	}
	
	@Override
	public IndexInfoVO queryIndexInfo() throws Exception {
		Object obj = CacheUtil.getCache(CacheUtil.GLOBALINDEXINFO);
		if (obj == null) {
			synchronized (this) {
				IndexInfoVO index = new IndexInfoVO();
				index.setBanners(selectList("goods.queryBanners"));
				GdsClassify classify = new GdsClassify();
				classify.setLevel("1");
				classify.setIsShow("1");
				List<ClassifyVO> cvs = selectList("goods.queryClassifys", classify);
				if (ComUtil.isNotEmpty(cvs)) {
					for (ClassifyVO classifyVO : cvs) {
						List<GoodsVO> gvs = selectList("goods.queryGoodsByClassify", classifyVO);
						if (ComUtil.isNotEmpty(gvs)) {
							classifyVO.setGoods(gvs);
							for (GoodsVO goodsVO : gvs) {
								List<GdsImage> shows = selectList("goods.queryShowsByGoods", goodsVO);
								if (ComUtil.isNotEmpty(shows)) {
									goodsVO.setShows(shows);
								}
							}
						}
					}
				}
				index.setClassifys(cvs);
				CacheUtil.setCache(CacheUtil.GLOBALINDEXINFO, index);
			}
		}
		return (IndexInfoVO) CacheUtil.getCache(CacheUtil.GLOBALINDEXINFO);
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
