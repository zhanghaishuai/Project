package com.beio.back.vo;

import java.io.File;

import com.beio.back.entity.BackGdsBanner;

public class BackGdsBannerVO extends BackGdsBanner {
	
	private int page; // 页码
	
	private int rows; // 每页行数
	
	private File img;
	
	private String imgFileName;
	
	private String creatorName; // 创建人
	
	private String modifierName; // 修改人

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

	public File getImg() {
		return img;
	}

	public void setImg(File img) {
		this.img = img;
	}

	public String getImgFileName() {
		return imgFileName;
	}

	public void setImgFileName(String imgFileName) {
		this.imgFileName = imgFileName;
	}

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public String getModifierName() {
		return modifierName;
	}

	public void setModifierName(String modifierName) {
		this.modifierName = modifierName;
	}
	
}
