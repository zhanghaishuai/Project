package com.beio.base.entity;

/**
 * 提示信息
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysTipMsg {

	private String id; // 主键
	
	private String code; // 错误代码
	
	private String tip; // 提示信息

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}
	
}
