package com.beio.back.action;


import net.sf.json.JSONArray;

import com.beio.back.service.BackGdsGoodsService;
import com.beio.back.vo.BackGdsBrandVO;
import com.beio.back.vo.BackGdsClassifyVO;
import com.beio.back.vo.BackGdsGoodsFileVO;
import com.beio.back.vo.BackGdsGoodsVO;
import com.beio.base.action.BaseAction;
import com.beio.base.util.ComUtil;

/**
 * 后台商品管理
 * @author Dashi
 * @version 1.0.0
 * @date
 */
public class BackGoodsAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	private final String imgspath = "E:/Project/Beio/images/goods/";
	
	private JSONArray jsonArray = new JSONArray();
	
	private BackGdsGoodsService bgs;
	
	private BackGdsGoodsVO gv = new BackGdsGoodsVO(); // 后台商品值对象
	
	private BackGdsGoodsFileVO gfv = new BackGdsGoodsFileVO(); // 后台商品带文件
	
	private BackGdsClassifyVO cv = new BackGdsClassifyVO(); // 后台分类
	
	private BackGdsBrandVO bv = new BackGdsBrandVO(); // 后台品牌
	
	/**
	 * 后台分页查询商品信息
	 * @return
	 * @throws Exception
	 */
	public String pageGoods()throws Exception{
		gv.setPage((Integer.valueOf(page) - 1) * Integer.valueOf(rows));
		gv.setRows(Integer.valueOf(rows));
		gv.setClassifyID(getRequest().getParameter("classifyid"));
		gv.setBrandID(getRequest().getParameter("brandid"));
		gv.setName(getRequest().getParameter("goodsname"));
		setBackPageRoot((int)bgs.selectOne("backGoods.countGoods", gv), JSONArray.fromObject(bgs.selectList("backGoods.pageGoods", gv)), "200");
		return JSON;
	}
	
	/**
	 * 获取全部分类
	 * @return
	 * @throws Exception
	 */
	public String getAllClassify()throws Exception{
		if(ComUtil.isEmpty(cv.getPid())){
			cv.setPid("0");
		}
		jsonArray = JSONArray.fromObject(bgs.selectList("backGoods.getAllClassifyByPid", cv));
		return JSON;
	}
	
	/**
	 * 获取所有品牌
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 2017-05-06
	 * @return
	 * @throws Exception
	 */
	public String getAllBrand()throws Exception{
		jsonArray = JSONArray.fromObject(bgs.selectList("backGoods.getAllBrand"));
		return JSON;
	}
	
	/**
	 * 增加商品
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 2017-05-07
	 * @return
	 * @throws Exception
	 */
	public String addGoods()throws Exception{
		
		// 展示图最少一张
		
		// 详情图最好一张
		if(bgs.addGoods(gfv)){
			setBackRoot("200");
		}else{
			setBackRoot("100");
		}
		return JSON;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	public BackGdsGoodsVO getGv() {
		return gv;
	}
	public void setGv(BackGdsGoodsVO gv) {
		this.gv = gv;
	}
	public BackGdsGoodsService getBgs() {
		return bgs;
	}
	public void setBgs(BackGdsGoodsService bgs) {
		this.bgs = bgs;
	}
	public BackGdsClassifyVO getCv() {
		return cv;
	}
	public void setCv(BackGdsClassifyVO cv) {
		this.cv = cv;
	}
	public BackGdsBrandVO getBv() {
		return bv;
	}
	public void setBv(BackGdsBrandVO bv) {
		this.bv = bv;
	}

	public JSONArray getJsonArray() {
		return jsonArray;
	}

	public void setJson(JSONArray jsonArray) {
		this.jsonArray = jsonArray;
	}

	public BackGdsGoodsFileVO getGfv() {
		return gfv;
	}

	public void setGfv(BackGdsGoodsFileVO gfv) {
		this.gfv = gfv;
	}

	
}
