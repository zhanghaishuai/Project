package com.beio.base.entity;

/**
 * 请求日志
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysVisitLog {

	private String id; // 主键
	
	private String ip; // IP地址
	
	private String action; // 请求接口
	
	private String param; // 请求参数
	
	private String address; // 请求地址
	
	private String creator; // 创建人
	
	private String createTime; // 创建时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
