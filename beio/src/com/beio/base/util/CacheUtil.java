package com.beio.base.util;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

/**
 * 缓存工具类
 * @author zhs
 * @date 2017.04.03
 * @version 1.0.0
 */
public class CacheUtil extends SqlSessionDaoSupport{
	
	public static final String GLOBALINDEXINFO = "globalIndexInfo";
	
	private static Map<String, Object> cache = new HashMap<String, Object>();

	public static void setCache(String key, Object obj) {
		if (cache == null) {
			cache = new HashMap<String, Object>();
		}
		cache.put(key, obj);
	}
	
	public static Object getCache(String key) {
		if (cache == null) {
			cache = new HashMap<String, Object>();
		}
		return cache.get(key);
	}
	
}
