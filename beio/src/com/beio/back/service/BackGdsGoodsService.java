package com.beio.back.service;

import com.beio.back.vo.BackGdsImageVO;
import com.beio.base.service.BaseIbaitsService;

/**
 * 后台商品信息业务接口
 * 
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public interface BackGdsGoodsService extends BaseIbaitsService {
	
	/**
	 * 新增图片
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @return
	 * @throws Exception
	 */
	public int saveImage(BackGdsImageVO biv) throws Exception;
	
}
