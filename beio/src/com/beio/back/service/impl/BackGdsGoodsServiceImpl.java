package com.beio.back.service.impl;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import com.beio.back.entity.BackGdsImage;
import com.beio.back.service.BackGdsGoodsService;
import com.beio.back.vo.BackGdsClassifyVO;
import com.beio.back.vo.BackGdsGoodsFileVO;
import com.beio.back.vo.BackGdsImageVO;
import com.beio.base.service.impl.BaseIbatisServiceImpl;
import com.beio.base.util.ComUtil;
import com.beio.base.util.ConfigUtil;
import com.beio.base.util.Constant;
import com.beio.base.util.DateUtil;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

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
		// 插入商品获取商品id
		insert("backGoods.addBackGoods", gfv);
		if(null == gfv.getId() || "".equals(gfv.getId())){
			return false;
		}
		
		// ……/goods/${date}
		String imgsPath = ConfigUtil.getProperties("IMGSPATH") + "/" + DateUtil.formatDate(DateUtil.getDate(), DateUtil.PATTERNNONEDATE);
		mkdirFolder(imgsPath);
		
		// ……/goods/${date}/org
		String orgPath = imgsPath + "/org"; // 原图地址
		mkdirFolder(orgPath);
		
		// ……/goods/${date}/big
		String bigPath = imgsPath + "/big"; // 大图地址  400*400
		mkdirFolder(bigPath);
		
		// ……/goods/${date}/mid
		String midPath = imgsPath + "/mid"; // 中图地址  200*200
		mkdirFolder(midPath);
		
		// ……/goods/${date}/sma
		String smaPath = imgsPath + "/sma"; // 小图地址  100*100
		mkdirFolder(smaPath);
		
		// 商品图片
		List<BackGdsImage> imgs = new ArrayList<BackGdsImage>();
		List<BackGdsImage> show = new ArrayList<BackGdsImage>();
		List<BackGdsImage> detaile = new ArrayList<BackGdsImage>();
		
		String formerName;
		
		// 展示图
		for(int i = 0; i < gfv.getShow().length; i++){
			if(null != gfv.getShow()[i] && null != gfv.getShowFileName()[i] && -1 != gfv.getShowFileName()[i].indexOf(".") && 1 < gfv.getShowFileName()[i].length() - gfv.getShowFileName()[i].lastIndexOf(".")){
				formerName = gfv.getShowFileName()[i];
				BackGdsImage img = new BackGdsImage();
				img.setGoodsID(gfv.getId());
				img.setOrgPath(orgPath + "/" + getNewFileName(formerName));
				img.setBigPath(bigPath + "/" + getNewFileName(formerName));
				img.setMidPath(midPath + "/" + getNewFileName(formerName));
				img.setSmaPath(smaPath + "/" + getNewFileName(formerName));
				img.setSortNum(i + "");
				img.setCategory("0");
				img.setCreator(gfv.getCreator());
				img.setCreateTime(gfv.getCreateTime());
				imgs.add(img);
				show.add(img);
			}
		}
		
		// 详情图
		for(int i = 0; i < gfv.getDetaile().size(); i++){
			if(null != gfv.getDetaile().get(i) && null != gfv.getDetaileFileName().get(i) && -1 != gfv.getDetaileFileName().get(i).indexOf(".") && 1 < gfv.getDetaileFileName().get(i).length() - gfv.getDetaileFileName().get(i).lastIndexOf(".")){
				formerName = gfv.getDetaileFileName().get(i);
				BackGdsImage img = new BackGdsImage();
				img.setGoodsID(gfv.getId());
				img.setOrgPath(orgPath + "/" + getNewFileName(formerName));
				img.setBigPath(bigPath + "/" + getNewFileName(formerName));
				img.setMidPath(midPath + "/" + getNewFileName(formerName));
				img.setSmaPath(smaPath + "/" + getNewFileName(formerName));
				img.setSortNum(i + "");
				img.setCategory("1");
				img.setCreator(gfv.getCreator());
				img.setCreateTime(gfv.getCreateTime());
				imgs.add(img);
				detaile.add(img);
			}
		}
		
		// 插入商品图片信息
		if(imgs.size() != insert("backGoods.batchInsertGdsImages", imgs)){
			delete("delBackGdsGoods", gfv);
			return false;
		}
		
		File formerFile;
		
		
		// 复制展示图
		
		for(int i = 0; i < gfv.getShow().length; i++){
			if(null != gfv.getShow()[i]){
				// 原图
				formerFile = new File(show.get(i).getOrgPath());
				gfv.getShow()[i].renameTo(formerFile);
				
				// 大图 400*400
				resizeFix(formerFile, show.get(i).getBigPath(), 400, 400);
				
				// 中图 200*200
				resizeFix(formerFile, show.get(i).getMidPath(), 200, 200);
				
				// 小图 100*100
				resizeFix(formerFile, show.get(i).getSmaPath(), 100, 100);
			}
		}
		
		
//		// 复制详情图
		
		
		
		for(int i = 0; i < gfv.getDetaile().size(); i++){
			// 原图
			formerFile = new File(detaile.get(i).getOrgPath());
			gfv.getDetaile().get(i).renameTo(formerFile);
			
			// 大图 400*400
			resizeFix(formerFile, detaile.get(i).getBigPath(), 400, 400);
			
			// 小图 200*200
			resizeFix(formerFile, detaile.get(i).getMidPath(), 200, 200);
			
			// 小图 100*100
			resizeFix(formerFile, detaile.get(i).getSmaPath(), 100, 100);
			
		}
		return true;
	}
	

	@Override
	public boolean updateImage(BackGdsImageVO biv) throws Exception {
		
		// 修改数据库地址
		
		// ……/goods/${date}
		String imgsPath = ConfigUtil.getProperties("IMGSPATH") + "/" + DateUtil.formatDate(DateUtil.getDate(), DateUtil.PATTERNNONEDATE);
		mkdirFolder(imgsPath);
		
		// ……/goods/${date}/org
		String orgPath = imgsPath + "/org"; // 原图地址
		mkdirFolder(orgPath);
		
		// ……/goods/${date}/big
		String bigPath = imgsPath + "/big"; // 大图地址  400*400
		mkdirFolder(bigPath);
		
		// ……/goods/${date}/mid
		String midPath = imgsPath + "/mid"; // 中图地址  200*200
		mkdirFolder(midPath);
		
		// ……/goods/${date}/sma
		String smaPath = imgsPath + "/sma"; // 小图地址  100*100
		mkdirFolder(smaPath);
		
		BackGdsImage former = new BackGdsImage();
		
		former.setOrgPath(biv.getOrgPath());
		former.setBigPath(biv.getBigPath());
		former.setMidPath(biv.getMidPath());
		former.setSmaPath(biv.getSmaPath());
		
//		BackGdsImage temp = new BackGdsImage(); 
		
//		temp.setOrgPath(orgPath + "/" + getNewFileName(biv.getImgFileName()));
//		temp.setBigPath(bigPath + "/" + getNewFileName(biv.getImgFileName()));
//		temp.setMidPath(midPath + "/" + getNewFileName(biv.getImgFileName()));
//		temp.setSmaPath(smaPath + "/" + getNewFileName(biv.getImgFileName()));
		
		biv.setOrgPath(orgPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setBigPath(bigPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setMidPath(midPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setSmaPath(smaPath + "/" + getNewFileName(biv.getImgFileName()));
		
		if(1 > update("backGoods.updateGoodsImage", biv)){
			return false;
		}
		
		// 删除原图
		File file = new File(former.getOrgPath());
		if(file.exists()){
			file.delete();
		}
		file = new File(former.getBigPath());
		if(file.exists()){
			file.delete();
		}
		file = new File(former.getMidPath());
		if(file.exists()){
			file.delete();
		}
		file = new File(former.getSmaPath());
		if(file.exists()){
			file.delete();
		}
		
		// 增加新图
		File formerFile = new File(biv.getOrgPath());
		biv.getImg().renameTo(formerFile);
		
		// 大图 400*400
		resizeFix(formerFile, biv.getBigPath(), 400, 400);
		
		// 中图 200*200
		resizeFix(formerFile, biv.getMidPath(), 200, 200);
		
		// 小图 100*100
		resizeFix(formerFile, biv.getSmaPath(), 100, 100);
		
		
		return true;
	}

	@Override
	public boolean addImage(BackGdsImageVO biv) throws Exception {
		// ……/goods/${date}
		String imgsPath = ConfigUtil.getProperties("IMGSPATH") + "/" + DateUtil.formatDate(DateUtil.getDate(), DateUtil.PATTERNNONEDATE);
		mkdirFolder(imgsPath);
		
		// ……/goods/${date}/org
		String orgPath = imgsPath + "/org"; // 原图地址
		mkdirFolder(orgPath);
		
		// ……/goods/${date}/big
		String bigPath = imgsPath + "/big"; // 大图地址  400*400
		mkdirFolder(bigPath);
		
		// ……/goods/${date}/mid
		String midPath = imgsPath + "/mid"; // 中图地址  200*200
		mkdirFolder(midPath);
		
		// ……/goods/${date}/sma
		String smaPath = imgsPath + "/sma"; // 小图地址  100*100
		mkdirFolder(smaPath);
		
		biv.setOrgPath(orgPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setBigPath(bigPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setMidPath(midPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setSmaPath(smaPath + "/" + getNewFileName(biv.getImgFileName()));
		
		if(1 > insert("backGoods.addGoodsImage", biv)){
			return false;
		}
		
		File formerFile = new File(biv.getOrgPath());
		biv.getImg().renameTo(formerFile);
		
		// 大图 400*400
		resizeFix(formerFile, biv.getBigPath(), 400, 400);
		
		// 中图 200*200
		resizeFix(formerFile, biv.getMidPath(), 200, 200);
		
		// 小图 100*100
		resizeFix(formerFile, biv.getSmaPath(), 100, 100);
		
		return true;
	}

	@Override
	public boolean delImage(BackGdsImageVO biv) throws Exception {
		if(1 > delete("backGoods.delGoodsImage", biv)){
			return false;
		}else{
			File file = new File(biv.getOrgPath());
			if(file.exists()){
				file.delete();
			}
			file = new File(biv.getBigPath());
			if(file.exists()){
				file.delete();
			}
			file = new File(biv.getMidPath());
			if(file.exists()){
				file.delete();
			}
			file = new File(biv.getSmaPath());
			if(file.exists()){
				file.delete();
			}
			return true;
		}
	}
	
	@Override
	public List<BackGdsClassifyVO> allClassify(BackGdsClassifyVO bcv)throws Exception {
		List<BackGdsClassifyVO> dbList = selectList("backGoods.allClassify", bcv);
		if(ComUtil.isEmpty(dbList) || 0 == dbList.size()){
			return null;
		}
		List<BackGdsClassifyVO> resp = new ArrayList<BackGdsClassifyVO>();
		for(BackGdsClassifyVO temp : dbList){
			if("0".equals(temp.getPid())){
				resp.add(temp);
			}else{
				for(BackGdsClassifyVO c : resp){
					if(c.getId().equals(temp.getPid())){
						c.getChildren().add(temp);
					}
				}
			}
		}
		return resp;
	}
	
	/**
	 * 校验文件夹
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 
	 * @param path
	 */
	private boolean mkdirFolder(String path){
		File folder = new File(path);
		if(!folder.exists() && !folder.isDirectory()){
			return folder.mkdirs();
		}
		return false;
	}
	
	
	/**
	 * 获取新文件名
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 
	 * @param old
	 * @return
	 * @throws Exception
	 */
	private String getNewFileName(String old)throws Exception{
		return UUID.randomUUID().toString().replace("-", "") + "." + old.split("[.]")[1];
	}
	
	/**
	 * 压缩图片到固定大小
	 * @author Dashi
	 * @version 1.0.0 
	 * @date 
	 * @param formerFilePath 原文件路径
	 * @param resizeFilePath 压缩后文件路径
	 * @param w 压缩后的宽
	 * @param h 压缩后的高
	 * @throws Exception
	 */
	private void resizeFix(File formerFile, String resizeFilePath, int w, int h)throws Exception{
		// 得到image对象
		Image img = ImageIO.read(formerFile);
		
		BufferedImage image = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB );   
		
        image.getGraphics().drawImage(img, 0, 0, w, h, null); // 绘制缩小后的图  
        
        File destFile = new File(resizeFilePath);  
        FileOutputStream out = new FileOutputStream(destFile); // 输出到文件流  
        // 可以正常实现bmp、png、gif转jpg  
        JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);  
        encoder.encode(image); // JPEG编码  
        out.close(); 
	}


}
