package com.beio.front.entity;

import com.beio.base.vo.Page;

/**
 * 商品热搜
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class GdsSearch extends Page{

	private String id; // 主键
	
	private String keyword; // 名称
	
	private String creator; // 创建人
	
	private String createTime; // 创建时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
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
