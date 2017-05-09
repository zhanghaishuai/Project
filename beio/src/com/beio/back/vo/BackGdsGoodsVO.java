package com.beio.back.vo;

import java.io.File;

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

//	public File getShow1() {
//		return show1;
//	}
//
//	public void setShow1(File show1) {
//		this.show1 = show1;
//	}
//
//	public File getShow2() {
//		return show2;
//	}
//
//	public void setShow2(File show2) {
//		this.show2 = show2;
//	}
//
//	public File getShow3() {
//		return show3;
//	}
//
//	public void setShow3(File show3) {
//		this.show3 = show3;
//	}
//
//	public File getShow4() {
//		return show4;
//	}
//
//	public void setShow4(File show4) {
//		this.show4 = show4;
//	}
//
//	public File getShow5() {
//		return show5;
//	}
//
//	public void setShow5(File show5) {
//		this.show5 = show5;
//	}
//
//	public File getDetaile1() {
//		return detaile1;
//	}
//
//	public void setDetaile1(File detaile1) {
//		this.detaile1 = detaile1;
//	}
	
	
}
