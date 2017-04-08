package com.beio.base.util;

import java.io.InputStream;
import java.util.Properties;

/**
 * 配置文件工具类
 * 
 * @author zhs
 * @date 2016-06-28
 * @version 1.0
 */
public class ConfigUtil {

	/** 定义属性实例 **/
	private static Properties properties = new Properties();
	
	/** 配置文件资源路径 **/
	private static final String RESOURCE = "/config.properties";

	/**
	 * 获取输入流
	 * @param resource
	 * @return
	 * @throws Exception
	 */
	public static InputStream getResourceAsStream(String resource)
			throws Exception {
		InputStream stream = null;
		String stripped = (resource.startsWith("/")) ? resource.substring(1) : resource;
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		if (classLoader != null) {
			stream = classLoader.getResourceAsStream(stripped);
		}
		if (stream == null) {
			stream = ConfigUtil.class.getResourceAsStream(resource);
		}
		if (stream == null) {
			stream = ConfigUtil.class.getClassLoader().getResourceAsStream(stripped);
		}
		if (stream == null) {
			throw new Exception(resource + " not found!");
		}
		return stream;
	}

	/**
	 * 获取属性值
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String getProperties(String key) throws Exception {
		// 加载配置文件
		if (properties == null || properties.isEmpty()) {
			properties.load(getResourceAsStream(RESOURCE));
		}
		// 返回属性值
		return properties.getProperty(key);
	}

}
