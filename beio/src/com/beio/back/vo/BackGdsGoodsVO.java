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
	
	private String classifyPname; // 父级分类名称
	
	private String brand; // 品牌名称
	
	private String classify; // 分类名称
	
	
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

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getClassify() {
		return classify;
	}

	public void setClassify(String classify) {
		this.classify = classify;
	}

	public String getClassifyPID() {
		return classifyPID;
	}

	public void setClassifyPID(String classifyPID) {
		this.classifyPID = classifyPID;
	}

	public String getClassifyPname() {
		return classifyPname;
	}

	public void setClassifyPname(String classifyPname) {
		this.classifyPname = classifyPname;
	}

	
	
}
