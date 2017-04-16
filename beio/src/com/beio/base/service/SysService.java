package com.beio.base.service;

import com.beio.base.entity.SysAddr;

/**
 * 系统业务逻辑接口
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public interface SysService extends BaseIbaitsService{

	/**
	 * 编辑收货地址
	 * @return
	 * @throws Exception
	 */
	public int editAddr(SysAddr sysAddr) throws Exception;
	
	/**
	 * 默认收货地址
	 * @return
	 * @throws Exception
	 */
	public int defaultAddr(SysAddr sysAddr) throws Exception;
	
}
