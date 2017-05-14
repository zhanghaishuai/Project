package com.beio.back.service;

import com.beio.back.vo.BackGdsGoodsFileVO;
import com.beio.back.vo.BackGdsImageVO;
import com.beio.base.service.BaseIbaitsService;

/**
 * 后台商品信息业务接口
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public interface BackGdsGoodsService extends BaseIbaitsService {
	
	/**
	 * 增加商品信息
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 2017-05-06
	 * @param gfv
	 * @return
	 * @throws Exception
	 */
	public boolean addGoods(BackGdsGoodsFileVO gfv)throws Exception;
	
	/**
	 * 修改图片
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 
	 * @param biv
	 * @return
	 * @throws Exception
	 */
	public boolean updateImage(BackGdsImageVO biv)throws Exception;
	
	/**
	 * 新增图片
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 
	 * @return
	 * @throws Exception
	 */
	public boolean addImage(BackGdsImageVO biv)throws Exception;
	
	/**
	 * 删除图片
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 
	 * @return
	 * @throws Exception
	 */
	public boolean delImage(BackGdsImageVO biv)throws Exception;
}
