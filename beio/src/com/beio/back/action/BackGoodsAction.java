package com.beio.back.action;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.beio.back.entity.BackGdsGoods;
import com.beio.back.entity.BackGdsImage;
import com.beio.back.service.BackGdsGoodsService;
import com.beio.back.vo.BackComboboxVO;
import com.beio.back.vo.BackGdsBrandVO;
import com.beio.back.vo.BackGdsClassifyVO;
import com.beio.back.vo.BackGdsGoodsFileVO;
import com.beio.back.vo.BackGdsGoodsVO;
import com.beio.back.vo.BackGdsImageVO;
import com.beio.base.action.BaseAction;
import com.beio.base.util.ComUtil;

/**
 * 后台商品管理
 * 
 * @author Dashi
 * @version 1.0.0
 * @date
 */
public class BackGoodsAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private JSONArray jsonArray = new JSONArray();

	private BackGdsGoodsService bgs;

	private BackGdsGoodsVO bgv = new BackGdsGoodsVO(); // 后台商品值对象

	private BackGdsGoodsFileVO bgfv = new BackGdsGoodsFileVO(); // 后台商品带文件

	private BackGdsClassifyVO bcv = new BackGdsClassifyVO(); // 后台分类

	private BackGdsBrandVO bbv = new BackGdsBrandVO(); // 后台品牌

	private BackGdsImageVO biv = new BackGdsImageVO(); // 图片

	/**
	 * 后台分页查询商品信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String pageGoods() throws Exception {
		bgv.setPage((Integer.valueOf(page) - 1) * Integer.valueOf(rows));
		bgv.setRows(Integer.valueOf(rows));
		bgv.setClassifyPID(getRequest().getParameter("classifyPID"));
		bgv.setClassifyID(getRequest().getParameter("classifyid"));
		bgv.setBrandID(getRequest().getParameter("brandid"));
		bgv.setName(getRequest().getParameter("goodsname"));
		setBackPageRoot(
				(int) bgs.selectOne("backGoods.countGoods", bgv),
				JSONArray.fromObject(bgs.selectList("backGoods.pageGoods", bgv)),
				"200");
		return JSON;
	}

	/**
	 * 获取全部分类
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllClassify() throws Exception {
		if (ComUtil.isEmpty(bcv.getPid())) {
			bcv.setPid("0");
		}
		@SuppressWarnings("unchecked")
		List<BackComboboxVO> coms = bgs.selectList(
				"backGoods.getAllClassifyByPid", bcv);
		BackComboboxVO com = new BackComboboxVO();
		com.setVal("");
		com.setText("全部");
		coms.add(0, com);
		jsonArray = JSONArray.fromObject(coms);
		return JSON;
	}

	/**
	 * 获取所有品牌
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date 2017-05-06
	 * @return
	 * @throws Exception
	 */
	public String getAllBrand() throws Exception {
		@SuppressWarnings("unchecked")
		List<BackComboboxVO> coms = bgs.selectList("backGoods.getAllBrand");
		BackComboboxVO com = new BackComboboxVO();
		com.setVal("");
		com.setText("全部");
		coms.add(0, com);
		jsonArray = JSONArray.fromObject(coms);
		return JSON;
	}

	/**
	 * 增加商品
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date 2017-05-07
	 * @return
	 * @throws Exception
	 */
	public String addGoods() throws Exception {

		// 展示图最少一张

		// 详情图最少一张

		bgfv.setmPrice(getRequest().getParameter("bgfv.mPrice"));
		bgfv.setcPrice(getRequest().getParameter("bgfv.cPrice"));
		bgfv.setCreator(sessionUser().getId());
		bgfv.setCreateTime(curTimeStr());
		if (bgs.addGoods(bgfv)) {
			setBackRoot("200");
		} else {
			setBackRoot("100");
		}
		return JSON;
	}

	/**
	 * 根据id获取商品
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String getGoodsByID() throws Exception {
		BackGdsGoods goods = (BackGdsGoods) bgs.selectOne(
				"backGoods.getGoodsByID", bgv.getId());
		if (null != goods && !ComUtil.isEmpty(goods.getId())) {
			setBackRoot(JSONObject.fromObject(goods), "200", "OK");
		} else {
			setBackRoot("100");
		}
		return JSON;
	}

	/**
	 * 修改商品信息
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String updateGoods() throws Exception {
		bgv.setmPrice(getRequest().getParameter("bgv.mPrice"));
		bgv.setcPrice(getRequest().getParameter("bgv.cPrice"));
		bgv.setModifier(sessionUser().getId());
		bgv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.updateGoods", bgv)) {
			setBackRoot("100");
		} else {
			setBackRoot("200");
		}
		return JSON;
	}

	/**
	 * 获取图片信息
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String getGoodsImagesByID() throws Exception {
		@SuppressWarnings("unchecked")
		List<BackGdsImage> imgs = bgs.selectList(
				"backGoods.getGoodsImagesByID", bgv.getId());
		setBackPageRoot(imgs.size(), JSONArray.fromObject(imgs), "200");
		return JSON;
	}

	/**
	 * 增加商品图片
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String addGoodsImage() throws Exception {
		biv.setCreator(sessionUser().getId());
		biv.setCreateTime(curTimeStr());
		if (bgs.addImage(biv)) {
			setBackRoot("200");
		} else {
			setBackRoot("100");
		}
		return JSON;
	}

	/**
	 * 修改商品图片信息
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String updateGoodsImage() throws Exception {
		biv.setModifier(sessionUser().getId());
		biv.setModifyTime(curTimeStr());
		if (bgs.updateImage(biv)) {
			setBackRoot("200");
		} else {
			setBackRoot("100");
		}
		return JSON;
	}

	/**
	 * 删除商品图片
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String delGoodsImage() throws Exception {
		biv.setModifier(sessionUser().getId());
		biv.setModifyTime(curTimeStr());
		if (bgs.delImage(biv)) {
			setBackRoot("200");
		} else {
			setBackRoot("100");
		}
		return JSON;
	}

	/**
	 * 操作商品启用/禁用
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String controlGoodsEnable() throws Exception {
		bgv.setModifier(sessionUser().getId());
		bgv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.controlGoodsEnable", bgv)) {
			setBackRoot("100");
		} else {
			setBackRoot("200");
		}
		return JSON;

	}

	/********************************************************************************************/
	/***************************** 品牌管理 *********************************************/
	/********************************************************************************************/

	/**
	 * 分页查询品牌
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date 2017-05-18
	 * @return
	 * @throws Exception
	 */
	public String pageBrand() throws Exception {
		bbv.setPage((Integer.valueOf(page) - 1) * Integer.valueOf(rows));
		bbv.setRows(Integer.valueOf(rows));
		bbv.setName(getRequest().getParameter("brandName"));
		setBackPageRoot(
				(int) bgs.selectOne("backGoods.countBrand", bbv),
				JSONArray.fromObject(bgs.selectList("backGoods.pageBrand", bbv)),
				"200");
		return JSON;
	}

	/**
	 * 保存品牌信息
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date 2017-05-20
	 * @return
	 * @throws Exception
	 */
	public String saveBrand() throws Exception {
		if (ComUtil.isEmpty(bbv.getId())) { // 新增
			bbv.setCreator(sessionUser().getId());
			bbv.setCreateTime(curTimeStr());
			if (1 > bgs.insert("backGoods.addBrand", bbv)) {
				setBackRoot("100");
			} else {
				setBackRoot("200");
			}
		} else { // 修改
			bbv.setModifier(sessionUser().getId());
			bbv.setModifyTime(curTimeStr());
			if (1 > bgs.update("backGoods.updateBrand", bbv)) {
				setBackRoot("100");
			} else {
				setBackRoot("200");
			}
		}
		return JSON;
	}

	/**
	 * 禁用/启用 品牌
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String enableBrand() throws Exception {
		bbv.setModifier(sessionUser().getId());
		bbv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.enableBrand", bbv)) {
			setBackRoot("100");
		} else {
			setBackRoot("200");
		}
		return JSON;
	}

	/**
	 * 删除/恢复
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String existBrand() throws Exception {
		bbv.setModifier(sessionUser().getId());
		bbv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.existBrand", bbv)) {
			setBackRoot("100");
		} else {
			setBackRoot("200");
		}
		return JSON;
	}

	/**
	 * 获取全部分类
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public String allClassify() throws Exception {
		jsonArray = JSONArray.fromObject(bgs.allClassify(bcv));
		return JSON;
	}

	public BackGdsGoodsService getBgs() {
		return bgs;
	}

	public void setBgs(BackGdsGoodsService bgs) {
		this.bgs = bgs;
	}

	public JSONArray getJsonArray() {
		return jsonArray;
	}

	public void setJson(JSONArray jsonArray) {
		this.jsonArray = jsonArray;
	}

	public BackGdsGoodsVO getBgv() {
		return bgv;
	}

	public void setBgv(BackGdsGoodsVO bgv) {
		this.bgv = bgv;
	}

	public BackGdsGoodsFileVO getBgfv() {
		return bgfv;
	}

	public void setBgfv(BackGdsGoodsFileVO bgfv) {
		this.bgfv = bgfv;
	}

	public BackGdsClassifyVO getBcv() {
		return bcv;
	}

	public void setBcv(BackGdsClassifyVO bcv) {
		this.bcv = bcv;
	}

	public BackGdsBrandVO getBbv() {
		return bbv;
	}

	public void setBbv(BackGdsBrandVO bbv) {
		this.bbv = bbv;
	}

	public BackGdsImageVO getBiv() {
		return biv;
	}

	public void setBiv(BackGdsImageVO biv) {
		this.biv = biv;
	}

}
