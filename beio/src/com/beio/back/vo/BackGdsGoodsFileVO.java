package com.beio.back.vo;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.beio.back.entity.BackGdsGoods;
import com.beio.base.util.Constant;

public class BackGdsGoodsFileVO extends BackGdsGoods {
	
	private File[] show = new File[Constant.SHOWFILE_LENGTH];
	
	private String[] showFileName = new String[Constant.SHOWFILE_LENGTH];
	
	private List<File> detaile = new ArrayList<File>();
	
	private List<String> detaileFileName = new ArrayList<String>();
	public File[] getShow() {
		return show;
	}

	public void setShow(File[] show) {
		this.show = show;
	}

	public String[] getShowFileName() {
		return showFileName;
	}

	public void setShowFileName(String[] showFileName) {
		this.showFileName = showFileName;
	}

	public List<File> getDetaile() {
		return detaile;
	}

	public void setDetaile(List<File> detaile) {
		this.detaile = detaile;
	}

	public List<String> getDetaileFileName() {
		return detaileFileName;
	}

	public void setDetaileFileName(List<String> detaileFileName) {
		this.detaileFileName = detaileFileName;
	}

}
