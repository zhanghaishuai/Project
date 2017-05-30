package com.beio.back.action;

import java.util.List;

import net.sf.json.JSONArray;

import com.beio.back.service.BackGdsGoodsService;
import com.beio.back.vo.BackComboboxVO;
import com.beio.back.vo.BackGdsBrandVO;
import com.beio.back.vo.BackGdsClassifyVO;
import com.beio.back.vo.BackGdsGoodsVO;
import com.beio.back.vo.BackGdsImageVO;
import com.beio.back.vo.BackGdsOrderVO;
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
	
	private BackGdsBrandVO bbv = new BackGdsBrandVO(); // 后台品牌
	
	private BackGdsClassifyVO bcv = new BackGdsClassifyVO(); // 后台分类
	
	private BackGdsGoodsVO bgv = new BackGdsGoodsVO(); // 后台商品值对象

	private BackGdsImageVO biv = new BackGdsImageVO(); // 图片
	
	private BackGdsOrderVO bov = new BackGdsOrderVO(); // 订单

	private BackGdsGoodsService bgs;
	
	/**
	 * 查询品牌
	 * @return
	 * @throws Exception
	 */
	public String pageBrand() throws Exception {
		bbv.setPage((Integer.valueOf(page) - 1) * Integer.valueOf(rows));
		bbv.setRows(Integer.valueOf(rows));
		setBackPageRoot(
				(int) bgs.selectOne("backGoods.countBrand", bbv), 
				JSONArray.fromObject(bgs.selectList("backGoods.pageBrand", bbv)), 
				"200"
				);
		return JSON;
	}

	/**
	 * 保存品牌
	 * @return
	 * @throws Exception
	 */
	public String saveBrand() throws Exception {
		bbv.setCreator(sessionUserID());
		bbv.setCreateTime(curTimeStr());
		bbv.setModifier(sessionUserID());
		bbv.setModifyTime(curTimeStr());
		if (ComUtil.isEmpty(bbv.getId())) { // 新增
			if (1 > bgs.insert("backGoods.addBrand", bbv)) {
				setBackRoot("100");
			} else {
				setBackRoot("200");
			}
		} else { // 修改
			if (1 > bgs.update("backGoods.updBrand", bbv)) {
				setBackRoot("100");
			} else {
				setBackRoot("200");
			}
		}
		return JSON;
	}

	/**
	 * 删除品牌
	 * @return
	 * @throws Exception
	 */
	public String delBrand() throws Exception {
		bbv.setModifier(sessionUserID());
		bbv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.delBrand", bbv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushBrand");
			setBackRoot("200");
		}
		return JSON;
	}
	
	/**
	 * 品牌向上
	 * @return
	 * @throws Exception
	 */
	public String upBrand() throws Exception {
		bbv.setModifier(sessionUserID());
		bbv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.upBrand", bbv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushBrand");
			setBackRoot("200");
		}
		return JSON;
	}
	
	/**
	 * 品牌向下
	 * @return
	 * @throws Exception
	 */
	public String downBrand() throws Exception {
		bbv.setModifier(sessionUserID());
		bbv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.downBrand", bbv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushBrand");
			setBackRoot("200");
		}
		return JSON;
	}
	
	/**
	 * 查询分类
	 * @return
	 * @throws Exception
	 */
	public String pageClassify() throws Exception {
		bcv.setPage((Integer.valueOf(page) - 1) * Integer.valueOf(rows));
		bcv.setRows(Integer.valueOf(rows));
		setBackPageRoot(
				(int) bgs.selectOne("backGoods.countClassify", bcv), 
				JSONArray.fromObject(bgs.selectList("backGoods.pageClassify", bcv)), 
				"200"
				);
		return JSON;
	}

	/**
	 * 保存分类
	 * @return
	 * @throws Exception
	 */
	public String saveClassify() throws Exception {
		bcv.setCreator(sessionUserID());
		bcv.setCreateTime(curTimeStr());
		bcv.setModifier(sessionUserID());
		bcv.setModifyTime(curTimeStr());
		if (ComUtil.isEmpty(bcv.getId())) { // 新增
			if (1 > bgs.insert("backGoods.addClassify", bcv)) {
				setBackRoot("100");
			} else {
				setBackRoot(bcv, "200", "");
			}
		} else { // 修改
			if (1 > bgs.update("backGoods.updClassify", bcv)) {
				setBackRoot("100");
			} else {
				setBackRoot(bcv, "200", "");
			}
		}
		return JSON;
	}

	/**
	 * 删除分类
	 * @return
	 * @throws Exception
	 */
	public String delClassify() throws Exception {
		bcv.setModifier(sessionUserID());
		bcv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.delClassify", bcv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushClassify", bcv);
			setBackRoot("200");
		}
		return JSON;
	}
	
	/**
	 * 分类向上
	 * @return
	 * @throws Exception
	 */
	public String upClassify() throws Exception {
		bcv.setModifier(sessionUserID());
		bcv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.upClassify", bcv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushClassify", bcv);
			setBackRoot("200");
		}
		return JSON;
	}
	
	/**
	 * 分类向下
	 * @return
	 * @throws Exception
	 */
	public String downClassify() throws Exception {
		bcv.setModifier(sessionUserID());
		bcv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.downClassify", bcv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushClassify", bcv);
			setBackRoot("200");
		}
		return JSON;
	}
	
	
	
	

	public String pageGoods() throws Exception {
		bgv.setPage((Integer.valueOf(page) - 1) * Integer.valueOf(rows));
		bgv.setRows(Integer.valueOf(rows));
		setBackPageRoot(
				(int) bgs.selectOne("backGoods.countGoods", bgv),
				JSONArray.fromObject(bgs.selectList("backGoods.pageGoods", bgv)),
				"200");
		return JSON;
	}
	
	@SuppressWarnings("unchecked")
	public String getAllClassify() throws Exception {
		if (ComUtil.isEmpty(bcv.getPid())) {
			bcv.setPid("0");
		}
		List<BackComboboxVO> coms = bgs.selectList("backGoods.getAllClassifyByPid", bcv);
		BackComboboxVO com = new BackComboboxVO();
		com.setVal("");
		com.setText("全部");
		coms.add(0, com);
		jsonArray = JSONArray.fromObject(coms);
		return JSON;
	}

	@SuppressWarnings("unchecked")
	public String getAllBrand() throws Exception {
		List<BackComboboxVO> coms = bgs.selectList("backGoods.getAllBrand");
		BackComboboxVO com = new BackComboboxVO();
		com.setVal("");
		com.setText("全部");
		coms.add(0, com);
		jsonArray = JSONArray.fromObject(coms);
		return JSON;
	}
	
	public String saveGoods() throws Exception {
		bgv.setCreator(sessionUserID());
		bgv.setCreateTime(curTimeStr());
		bgv.setModifier(sessionUserID());
		bgv.setModifyTime(curTimeStr());
		bgv.setmPrice(getRequest().getParameter("bgv.mPrice"));
		bgv.setcPrice(getRequest().getParameter("bgv.cPrice"));
		if (ComUtil.isEmpty(bgv.getDescr())) {
			bgv.setDescr("");
		}
		if (ComUtil.isEmpty(bgv.getRemark())) {
			bgv.setRemark("");
		}
		if (ComUtil.isEmpty(bgv.getId())) { // 新增
			if (1 > bgs.insert("backGoods.addGoods", bgv)) {
				setBackRoot("100");
			} else {
				setBackRoot("200");
			}
		} else { // 修改
			if (1 > bgs.update("backGoods.updGoods", bgv)) {
				setBackRoot("100");
			} else {
				setBackRoot("200");
			}
		}
		return JSON;
	}
	
	public String delGoods() throws Exception {
		bgv.setModifier(sessionUserID());
		bgv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.delGoods", bgv)) {
			setBackRoot("100");
		} else {
			setBackRoot("200");
		}
		return JSON;
	}
	
	public String queryGoodsImg() throws Exception{
		jsonArray = JSONArray.fromObject(bgs.selectList("backGoods.queryGoodsImg", biv));
		return JSON;
	}
	
	public String saveGoodsImg() throws Exception {
		biv.setCreator(sessionUserID());
		biv.setCreateTime(curTimeStr());
		biv.setModifier(sessionUserID());
		biv.setModifyTime(curTimeStr());
		if (bgs.saveImage(biv) > 0) {
			setBackRoot("200");
		} else {
			setBackRoot("100");
		}
		return JSON;
	}
	
	public String delGoodsImg() throws Exception {
		biv.setModifier(sessionUserID());
		biv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.delGoodsImg", biv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushImage", biv);
			setBackRoot("200");
		}
		return JSON;
	}
	
	public String upGoodsImg() throws Exception {
		biv.setModifier(sessionUserID());
		biv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.upGoodsImg", biv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushImage", biv);
			setBackRoot("200");
		}
		return JSON;
	}
	
	public String downGoodsImg() throws Exception {
		biv.setModifier(sessionUserID());
		biv.setModifyTime(curTimeStr());
		if (1 > bgs.update("backGoods.downGoodsImg", biv)) {
			setBackRoot("100");
		} else {
			baseIbaitsService.update("flushImage", biv);
			setBackRoot("200");
		}
		return JSON;
	}
	
	
	
	
	
	public String pageOrder() throws Exception {
		bov.setPage((Integer.valueOf(page) - 1) * Integer.valueOf(rows));
		bov.setRows(Integer.valueOf(rows));
		setBackPageRoot(
				(int) bgs.selectOne("backGoods.countOrder", bov), 
				JSONArray.fromObject(bgs.selectList("backGoods.pageOrder", bov)), 
				"200"
				);
		return JSON;
	}
	
	public String sendGoods() throws Exception {
		bov.setCreator(sessionUserID());
		bov.setCreateTime(curTimeStr());
		bov.setModifier(sessionUserID());
		bov.setModifyTime(curTimeStr());
		if (1 > bgs.insert("backGoods.sendGoods", bov)) {
			setBackRoot("100");
		} else {
			setBackRoot("200");
		}
		return JSON;
	}
	
	public String cancelOrder() throws Exception {
		bov.setCreator(sessionUserID());
		bov.setCreateTime(curTimeStr());
		bov.setModifier(sessionUserID());
		bov.setModifyTime(curTimeStr());
		if (1 > bgs.insert("backGoods.cancelOrder", bov)) {
			setBackRoot("100");
		} else {
			setBackRoot("200");
		}
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

	public BackGdsOrderVO getBov() {
		return bov;
	}

	public void setBov(BackGdsOrderVO bov) {
		this.bov = bov;
	}

}
