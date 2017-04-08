package com.beio.base.util;


/**
 * 地址工具类
 * 
 * @author zhs
 * @date 2016-09-05
 * @version 1.0.0
 * 
 */
public class PathUtil {
	
	
	public static String serverPath(String localPath) throws Exception {
		return ConfigUtil.getProperties("data.server") + localPath;
	}
	
//	/**
//	 * 获取资源服务器地址
//	 */
//	public static String resourcePath(String localPath) throws Exception {
//		return ConfigUtil.getProperties(Constant.RESOURCEURL) + localPath;
//	}
//	
//	/**
//	 * 获取接口服务器地址
//	 */
//	public static String serverPath(String localPath) throws Exception {
//		return ConfigUtil.getProperties(Constant.SERVERURL) + localPath;
//	}
//	
//	/**
//	 * 获取管理应用服务器地址
//	 */
//	public static String managementPath(String localPath) throws Exception{
//		return ConfigUtil.getProperties(Constant.MANAGEURL) + localPath;
//	}
//
//	/**
//	 * 获取原图地址
//	 * 
//	 * @return
//	 * @throws Exception
//	 */
//	public static String getPicturePath(String basePath, Date date)
//			throws Exception {
//
//		return basePath + Constant.UPLOAD_PICTURE_FOLDER + File.separator
//				+ getPathByDate(date, true);
//	}
//
//	/**
//	 * 获取缩略图地址
//	 * 
//	 * @return
//	 * @throws Exception
//	 */
//	public static String getThumbnailPath(String basePath, Date date)
//			throws Exception {
//
//		return basePath + Constant.UPLOAD_THUMBNAIL_FOLDER + File.separator
//				+ getPathByDate(date, true);
//	}
//	
//	/**
//	 * 获取音频地址
//	 * 
//	 * @return
//	 * @throws Exception
//	 */
//	public static String getAudioPath(String basePath, Date date)
//			throws Exception {
//
//		return basePath + Constant.UPLOAD_AUDIO_FOLDER + File.separator
//				+ getPathByDate(date, true);
//	}
//	
//	/**
//	 * 根据时间生成
//	 * 
//	 * @param date
//	 * @return
//	 * @throws Exception
//	 */
//	public static String getPathByDate(Date date, boolean containHour)
//			throws Exception {
//
//		// 声明地址字符串
//		StringBuffer path = new StringBuffer();
//
//		// 拼接年份路径
//		path.append(DateUtil.formatDate(date, DateUtil.PATTERNDATEYEAR));
//
//		// 拼接月日路径
//		path.append(File.separator);
//		path.append(DateUtil.formatDate(date, DateUtil.PATTERNDATEMONDAY));
//
//		// 判断是否包含小时路径，如包含则添加
//		if (containHour) {
//			path.append(File.separator);
//			path.append(DateUtil.formatDate(date, DateUtil.PATTERNDATEHOUR));
//		}
//
//		// 返回
//		return path.toString();
//	}
	
}
