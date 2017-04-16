package com.beio.base.entity;

/**
 * 行政区划
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysArea {

	private String code; // 区划代码
	
	private String name; // 区划名称
	
	private String level; // 区划等级（1：省、2：市、3:县）
	
	private String parent; // 上级区划

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

}
