package com.beio.front.vo;

import java.util.List;

import com.beio.front.entity.GdsGoods;
import com.beio.front.entity.GdsImage;

/**
 * 首页值对象
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class GoodsVO extends GdsGoods{

	private List<GdsImage> shows = null;
	
	private List<GdsImage> details = null;
	
	private boolean login;
	
	public List<GdsImage> getShows() {
		return shows;
	}

	public void setShows(List<GdsImage> shows) {
		this.shows = shows;
	}
	
	public List<GdsImage> getDetails() {
		return details;
	}

	public void setDetails(List<GdsImage> details) {
		this.details = details;
	}

	public boolean isLogin() {
		return login;
	}

	public void setLogin(boolean login) {
		this.login = login;
	}

}
