package com.beio.base.interceptor;

import org.apache.log4j.Logger;

import com.beio.base.action.BaseAction;
import com.beio.base.action.ErrorAction;
import com.beio.base.entity.SysVisitLog;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

/**
 * 日志拦截器
 * @author zhs
 * @date 2017-04-03
 * @version 1.0.0
 */
public class LoggerInterceptor extends BaseAction implements Interceptor {
	
	private static final long serialVersionUID = 1L;
	
	public void init() {}

	public void destroy() {}
	
	public String intercept(ActionInvocation invocation){
		try {
			SysVisitLog svl = new SysVisitLog();
			// 填充日志数据
			svl.setIp(getIpAddress());
			svl.setAction(getRequest().getServletPath());
			svl.setParam(getRequsetParams());
			svl.setAddress(getRequest().getRequestURL().toString());
			svl.setCreator(sessionMemberID());
			svl.setCreateTime(curTimeStr());
			// 保存请求日志
			getBaseIbaitsService().insert("sys.insertVisitLog", svl);
			return invocation.invoke();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ERROR;
	}

}
