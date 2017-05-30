package com.beio.back.vo;

import java.io.File;

import com.beio.back.entity.BackGdsImage;

/**
 * 图片键值对象
 * @author Dashi
 * @version 1.0.0
 * @date
 */
public class BackGdsImageVO extends BackGdsImage {
	
	private File img;
	
	private String imgFileName;

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
	
}
