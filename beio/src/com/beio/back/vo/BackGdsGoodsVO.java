package com.beio.back.vo;

import com.beio.back.entity.BackGdsGoods;

/**
 * 后台商品值对象
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public class BackGdsGoodsVO extends BackGdsGoods{
	
	private int page; // 页码
	
	private int rows; // 每页行数
	
	private String classifyPID; // 父级分类
	
	private String classifyPName; // 父级分类名称
	
	private String brandName; // 品牌名称
	
	private String classifyName; // 分类名称
	
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getClassifyPID() {
		return classifyPID;
	}

	public void setClassifyPID(String classifyPID) {
		this.classifyPID = classifyPID;
	}

	public String getClassifyPName() {
		return classifyPName;
	}

	public void setClassifyPName(String classifyPName) {
		this.classifyPName = classifyPName;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getClassifyName() {
		return classifyName;
	}

	public void setClassifyName(String classifyName) {
		this.classifyName = classifyName;
	}

}
