package com.beio.base.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.beio.base.entity.SysTipMsg;

/**
 * 提示工具类
 * @author zhs
 * @date 2017.04.03
 * @version 1.0.0
 */
public class TipMsgUtil extends SqlSessionDaoSupport{
	
	private static Map<String, SysTipMsg> tipMsgs = new HashMap<String, SysTipMsg>();

	/**
	 * 初始化正则
	 */
	public void initTipMsgs() {
		synchronized (this) {
			if (ComUtil.isEmpty(tipMsgs)) {
				List<SysTipMsg> list = getSqlSession().selectList("sys.queryTipMsg");
				for (SysTipMsg tipMsg : list) {
					tipMsgs.put(tipMsg.getCode(), tipMsg);
				}
			}
		}
	}

	public SysTipMsg getTip(String key) {
		if (ComUtil.isEmpty(tipMsgs)) {
			initTipMsgs();
		}
		return tipMsgs.get(key);
	}
	
	public Map<String, SysTipMsg> getTips() {
		if (ComUtil.isEmpty(tipMsgs)) {
			initTipMsgs();
		}
		return tipMsgs;
	}

}
