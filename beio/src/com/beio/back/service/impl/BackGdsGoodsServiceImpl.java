package com.beio.back.service.impl;

import java.io.File;
import java.util.UUID;

import com.beio.back.service.BackGdsGoodsService;
import com.beio.back.vo.BackGdsGoodsFileVO;
import com.beio.base.service.impl.BaseIbatisServiceImpl;
import com.beio.base.util.Constant;
import com.beio.base.util.DateUtil;

/**
 * 后台商品信息业务接口实现类
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public class BackGdsGoodsServiceImpl extends BaseIbatisServiceImpl implements BackGdsGoodsService{

	/**
	 * 增加商品信息
	 * V1.0.0
	 * 2017-05-07
	 */
	public boolean addGoods(BackGdsGoodsFileVO gfv) throws Exception {
		// ……/goods/${date}
		String imgspath = Constant.IMGSPATH + "/" + DateUtil.formatDate(DateUtil.getDate(), DateUtil.PATTERNNONEDATE);
		mkdirFolder(imgspath);
		// ……/goods/${date}/org
		String orgpath = imgspath + "/org";
		mkdirFolder(orgpath);
		// 循环导入展示图
		orgpath += "/";
		String showPath;
		for(int i = 0; i < gfv.getShow().length; i++){
			showPath = orgpath + UUID.randomUUID().toString().replace("-", "") + "." + gfv.getShowFileName()[i].split("[.]")[1];
			gfv.getShow()[i].renameTo(new File(showPath));
		}
		
		// 循环导入详情图
		String detailePath;
		for(int i = 0; i < gfv.getDetaile().size(); i++){
			detailePath = orgpath + UUID.randomUUID().toString().replace("-", "") + "." + gfv.getDetaileFileName().get(i).split("[.]")[1];
			gfv.getDetaile().get(i).renameTo(new File(detailePath));
		}
		
		// 
		return false;
	}
	
	/**
	 * 校验文件夹
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 
	 * @param path
	 */
	private void mkdirFolder(String path){
		File folder = new File(path);
		if(!folder.exists() && !folder.isDirectory()){
			folder.mkdir();
		}
	}
	
	/**
	 * 创建文件
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 
	 * @param file
	 */
	private void delFile(File file)throws Exception{
		 if(file.exists()){  
			 file.delete();
	     } 
	}
	
	public static void main(String[] args) {
		System.out.println(UUID.randomUUID().toString());
	}
}
