package com.beio.back.service;

import com.beio.back.vo.BackGdsGoodsFileVO;
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
}
