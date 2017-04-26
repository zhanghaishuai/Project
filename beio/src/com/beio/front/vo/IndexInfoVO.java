package com.beio.front.vo;

import java.util.List;

import com.beio.base.entity.SysMember;
import com.beio.base.vo.Page;
import com.beio.front.entity.GdsBanner;

/**
 * 首页值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class IndexInfoVO extends Page{
	
	private SysMember member;

	private List<GdsBanner> banners = null;
	
	private List<ClassifyVO> classifys = null;
	
	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}

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

}
