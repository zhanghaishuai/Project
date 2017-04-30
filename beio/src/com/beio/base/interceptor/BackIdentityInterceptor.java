package com.beio.base.interceptor;

import net.sf.json.JSONObject;

import com.beio.base.action.BaseAction;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

/**
 * 后台身份拦截器
 * @author Dashi
 * @date 2017-04-30
 * @version 1.0.0
 */
public class BackIdentityInterceptor extends BaseAction implements Interceptor {

	private static final long serialVersionUID = 1L;
	
	public void init() {}

	public void destroy() {}
	
	public String intercept(ActionInvocation invocation){
		try {
			if (sessionUser() == null) {
				setRoot("170");
				print(JSONObject.fromObject(root));
			}else {
				return invocation.invoke();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return JSON;
	}

}
