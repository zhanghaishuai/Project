package com.beio.base.service.impl;

import com.beio.base.entity.SysAddr;
import com.beio.base.entity.SysMember;
import com.beio.base.service.SysService;
import com.beio.base.util.ComUtil;
import com.beio.base.util.Constant;

/**
 * 商品业务逻辑实现
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class SysServiceImpl extends BaseIbatisServiceImpl implements SysService {

	@Override
	public int register(SysMember sysMember) throws Exception {
		// TODO Auto-generated method stub
		if (update("sys.useInvite", sysMember) < 1) {
			return 0;
		}
		return insert("sys.register", sysMember);
	}
	
	@Override
	public int editAddr(SysAddr sysAddr) throws Exception {
		// TODO Auto-generated method stub
		if (ComUtil.isNotEmpty(sysAddr.getId())) {
			// 重置地址
			update("sys.resetAddr", sysAddr);
			// 编辑地址
			return update("sys.editAddr", sysAddr);
		}
		// 地址上限
		if((int)selectOne("sys.queryTotalAddr", sysAddr) >= Constant.MAXTOTALADDR){
			return -1;
		}
		// 重置地址
		update("sys.resetAddr", sysAddr);
		// 新增地址
		int result = insert("sys.addAddr", sysAddr);
		sysAddr.setId(String.valueOf(selectOne("sys.queryid")));
		return result;
	}

	@Override
	public int defaultAddr(SysAddr sysAddr) throws Exception {
		// TODO Auto-generated method stub
		// 重置地址
		update("sys.resetAddr", sysAddr);
		// 编辑地址
		return update("sys.defaultAddr", sysAddr);
	}

}
