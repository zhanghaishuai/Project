package com.beio.base.vo;

/**
 * 接口返回对象
 * 
 * @author zhs
 * @date 2017-04-04
 * @version 1.0.0
 */
public class Root {

	private Object result; // 请求结果

	private String status; // 响应状态

	private String message; // 消息提示

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Root() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Root(String status) {
		super();
		this.status = status;
	}

	public Root(Object result, String status) {
		super();
		this.result = result;
		this.status = status;
	}

	public Root(Object result, String status, String message) {
		super();
		this.result = result;
		this.status = status;
		this.message = message;
	}
	
}
