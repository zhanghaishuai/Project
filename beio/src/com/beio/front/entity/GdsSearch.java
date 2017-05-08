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

}
