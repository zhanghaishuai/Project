package com.beio.base.service;

import com.beio.base.entity.SysAddr;
import com.beio.base.entity.SysPay;
import com.beio.base.vo.Member;
import com.beio.base.vo.Root;

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
	
	/**
	 * 查询订单信息
	 * @return
	 * @throws Exception
	 */
	public int orderquery(SysPay pay) throws Exception;
	
	/**
	 * 开通续费会员
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public Root mrfeeInvite(Member member) throws Exception;
	
	/**
	 * 微信会员下单
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public Root preMrfee(Member member) throws Exception;
	
	/**
	 * 微信会员支付
	 * @param member
	 * @return
	 * @throws Exception
	 */
	public Root payMrfee(Member member, SysPay sysPay) throws Exception;
	
}
