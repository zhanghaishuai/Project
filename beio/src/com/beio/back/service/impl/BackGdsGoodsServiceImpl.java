package com.beio.back.service.impl;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

import javax.imageio.ImageIO;

import com.beio.back.service.BackGdsGoodsService;
import com.beio.back.vo.BackGdsBannerVO;
import com.beio.back.vo.BackGdsImageVO;
import com.beio.base.service.impl.BaseIbatisServiceImpl;
import com.beio.base.util.ComUtil;
import com.beio.base.util.ConfigUtil;
import com.beio.base.util.DateUtil;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * 后台商品信息业务接口实现类
 * 
 * @author Dashi
 * @version 1.0.0
 * @date 2017-05-06
 */
public class BackGdsGoodsServiceImpl extends BaseIbatisServiceImpl implements
		BackGdsGoodsService {
	
	@Override
	public int saveImage(BackGdsImageVO biv) throws Exception {
		// ……/goods/${date}
		String imgsPath = ConfigUtil.getProperties("IMGSPATH")
				+ File.separator + DateUtil.formatDate(DateUtil.getDate(),
						DateUtil.PATTERNNONEDATE);
		mkdirFolder(imgsPath);

		// ……/goods/${date}/org
		String orgPath = imgsPath + "/org"; // 原图地址
		mkdirFolder(orgPath);

		// ……/goods/${date}/big
		String bigPath = imgsPath + "/big"; // 大图地址 400*400
		mkdirFolder(bigPath);

		// ……/goods/${date}/mid
		String midPath = imgsPath + "/mid"; // 中图地址 200*200
		mkdirFolder(midPath);

		// ……/goods/${date}/sma
		String smaPath = imgsPath + "/sma"; // 小图地址 100*100
		mkdirFolder(smaPath);

		biv.setOrgPath(orgPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setBigPath(bigPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setMidPath(midPath + "/" + getNewFileName(biv.getImgFileName()));
		biv.setSmaPath(smaPath + "/" + getNewFileName(biv.getImgFileName()));

		int result = 0;
		
		if (ComUtil.isEmpty(biv.getId())) {
			if (insert("backGoods.addGoodsImg", biv) > 0) {
				result = 1;
			}
		}else {
			if (update("backGoods.updGoodsImg", biv) > 0) {
				result = 2;
			}
		}
		
		if (result > 0) {
			
			File formerFile = new File(biv.getOrgPath());
			biv.getImg().renameTo(formerFile);

			// 大图 400*400
			resizeFix(formerFile, biv.getBigPath(), 400, 400);

			// 中图 200*200
			resizeFix(formerFile, biv.getMidPath(), 200, 200);

			// 小图 100*100
			resizeFix(formerFile, biv.getSmaPath(), 100, 100);
		}

		return result;
	}
	
	
	
	
	@Override
	public int saveImage(BackGdsBannerVO bgbv) throws Exception {
		// TODO Auto-generated method stub
		// ……/goods/${date}
		String imgsPath = ConfigUtil.getProperties("BANNERPATH");
		
		mkdirFolder(imgsPath);

		bgbv.setPath(imgsPath + File.separator + getNewFileName(bgbv.getImgFileName()));

		int result = 0;
		
		if (ComUtil.isEmpty(bgbv.getId())) {
			if (insert("backGoods.addBanner", bgbv) > 0) {
				result = 1;
			}
		}else {
			if (update("backGoods.updBanner", bgbv) > 0) {
				result = 2;
			}
		}
		
		if (result > 0) {
			
			File formerFile = new File(bgbv.getPath());
			bgbv.getImg().renameTo(formerFile);
		}
		
		return result;
	}
	
	
	
	
	/**
	 * 校验文件夹
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @param path
	 */
	private boolean mkdirFolder(String path) {
		File folder = new File(path);
		if (!folder.exists() && !folder.isDirectory()) {
			return folder.mkdirs();
		}
		return false;
	}

	/**
	 * 获取新文件名
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @param old
	 * @return
	 * @throws Exception
	 */
	private String getNewFileName(String old) throws Exception {
		return UUID.randomUUID().toString().replace("-", "") + "."
				+ old.split("[.]")[1];
	}

	/**
	 * 压缩图片到固定大小
	 * 
	 * @author Dashi
	 * @version 1.0.0
	 * @date
	 * @param formerFilePath
	 *            原文件路径
	 * @param resizeFilePath
	 *            压缩后文件路径
	 * @param w
	 *            压缩后的宽
	 * @param h
	 *            压缩后的高
	 * @throws Exception
	 */
	private void resizeFix(File formerFile, String resizeFilePath, int w, int h)
			throws Exception {
		// 得到image对象
		Image img = ImageIO.read(formerFile);

		BufferedImage image = new BufferedImage(w, h,
				BufferedImage.TYPE_INT_RGB);

		image.getGraphics().drawImage(img, 0, 0, w, h, null); // 绘制缩小后的图

		File destFile = new File(resizeFilePath);
		FileOutputStream out = new FileOutputStream(destFile); // 输出到文件流
		// 可以正常实现bmp、png、gif转jpg
		JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
		encoder.encode(image); // JPEG编码
		out.close();
	}





}
