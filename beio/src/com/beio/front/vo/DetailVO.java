package com.beio.front.vo;

import java.util.List;

import com.beio.front.entity.GdsOrder;
import com.beio.front.entity.GdsService;

/**
 * 订单详情值对象
 * @author zhs
 * @date 2017-04-22
 * @version 1.0.0
 */
public class DetailVO extends GdsOrder{
	
	private String showImg;
	
	private String provinceName;
	
	private String cityName;
	
	private String countyName;
	
	private List<GdsService> services;

	public String getShowImg() {
		return showImg;
	}

	public void setShowImg(String showImg) {
		this.showImg = showImg;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getCountyName() {
		return countyName;
	}

	public void setCountyName(String countyName) {
		this.countyName = countyName;
	}

	public List<GdsService> getServices() {
		return services;
	}

	public void setServices(List<GdsService> services) {
		this.services = services;
	}
	
}
