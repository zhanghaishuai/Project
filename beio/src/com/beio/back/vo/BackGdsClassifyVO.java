package com.beio.back.vo;

import java.util.ArrayList;
import java.util.List;

import com.beio.back.entity.BackGdsClassify;

public class BackGdsClassifyVO extends BackGdsClassify {
	
	
	private List<BackGdsClassify> children = new ArrayList<BackGdsClassify>();

	public List<BackGdsClassify> getChildren() {
		return children;
	}

	public void setChildren(List<BackGdsClassify> children) {
		this.children = children;
	}
	
}
