package com.beio.base.vo;

import com.beio.base.entity.SysAddr;

public class Address extends SysAddr{

	private String provinceName; // 省名称
	
	private String cityName; // 市名称
	
	private String countyName; // 县名称

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

}
