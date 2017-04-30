package com.beio.base.vo;

/**
 * 后台接口返回对象
 * 
 * @author zhs
 * @date 2017-04-04
 * @version 1.0.0
 */
public class BackRoot {

	private Object result; // 请求结果

	private String status; // 响应状态

	private String message; // 消息提示
	
	private Integer total; // 总行数
	
	private Object rows; // 返回数据
	
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

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Object getRows() {
		return rows;
	}

	public void setRows(Object rows) {
		this.rows = rows;
	}

	public BackRoot() {
		super();
		// TODO Auto-generated constructor stub
	}	
	
	
	
}
