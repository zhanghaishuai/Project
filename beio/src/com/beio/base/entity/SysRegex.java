package com.beio.base.entity;

/**
 * 正则表达式
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysRegex {

	private String id; // 主键
	
	private String name; // 代码
	
	private String regex; // 值

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRegex() {
		return regex;
	}

	public void setRegex(String regex) {
		this.regex = regex;
	}
	
}
