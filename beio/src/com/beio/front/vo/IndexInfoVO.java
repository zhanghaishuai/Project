package com.beio.front.vo;

import java.util.List;

import com.beio.front.entity.GdsBanner;

/**
 * 头部值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class IndexInfoVO {

	private List<GdsBanner> banners = null;
	
	private List<ClassifyVO> classifys = null;
	
	private boolean login;

	public List<GdsBanner> getBanners() {
		return banners;
	}

	public void setBanners(List<GdsBanner> banners) {
		this.banners = banners;
	}

	public List<ClassifyVO> getClassifys() {
		return classifys;
	}

	public void setClassifys(List<ClassifyVO> classifys) {
		this.classifys = classifys;
	}

	public boolean isLogin() {
		return login;
	}

	public void setLogin(boolean login) {
		this.login = login;
	}
	
}
