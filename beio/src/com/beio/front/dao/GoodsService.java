package com.beio.front.dao;

import com.beio.front.vo.IndexInfoVO;
import com.beio.front.vo.TopInfoVO;

/**
 * 商品业务逻辑接口
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public interface GoodsService {

	/**
	 * 查询头部信息
	 * @return
	 * @throws Exception
	 */
	public TopInfoVO queryTopInfo() throws Exception;
	
	/**
	 * 查询首页信息
	 * @return
	 * @throws Exception
	 */
	public IndexInfoVO queryIndexInfo() throws Exception;
	
}
