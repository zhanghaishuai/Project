package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysMember;
import com.beio.base.vo.Page;
import com.beio.front.entity.GdsBrand;
import com.beio.front.entity.GdsClassify;

/**
 * 搜索值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class SearchInfoVO extends Page{
	
	private String order;
	
	private String brand;
	
	private String keyword;
	
	private String category;
	
	private Integer minPrice;
	
	private Integer maxPrice;
	
	private SysMember member;
	
	private List<GdsBrand> brands = null;
	
	private List<GdsClassify> classifys = null;
	
	private List<GdsClassify> navClassifys = null;

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(Integer minPrice) {
		this.minPrice = minPrice;
	}

	public Integer getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(Integer maxPrice) {
		this.maxPrice = maxPrice;
	}

	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}

	public List<GdsBrand> getBrands() {
		return brands;
	}

	public void setBrands(List<GdsBrand> brands) {
		this.brands = brands;
	}

	public List<GdsClassify> getClassifys() {
		return classifys;
	}

	public void setClassifys(List<GdsClassify> classifys) {
		this.classifys = classifys;
	}

	public List<GdsClassify> getNavClassifys() {
		return navClassifys;
	}

	public void setNavClassifys(List<GdsClassify> navClassifys) {
		this.navClassifys = navClassifys;
	}
	
}
