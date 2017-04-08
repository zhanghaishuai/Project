package com.beio.base.service;

import java.util.List;
import java.util.Map;

import com.beio.base.vo.Page;

/**
 * Ibatis基础业务逻辑接口
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public interface BaseIbaitsService {

	/**
	 * 清空缓存
	 * 
	 * @throws Exception
	 */
	public void clearCache() throws Exception;

	/**
	 * 新增
	 * @param arg0
	 * @return
	 * @throws Exception
	 */
	public int insert(String arg0) throws Exception;
	
	/**
	 * 新增
	 * @param arg0
	 * @param arg1
	 * @return
	 * @throws Exception
	 */
	public int insert(String arg0, Object arg1) throws Exception;

	/**
	 * 修改
	 * @param arg0
	 * @return
	 * @throws Exception
	 */
	public int update(String arg0) throws Exception;
	
	/**
	 * 修改
	 * @param arg0
	 * @param arg1
	 * @return
	 * @throws Exception
	 */
	public int update(String arg0, Object arg1) throws Exception;

	/**
	 * 删除
	 * @param arg0
	 * @return
	 * @throws Exception
	 */
	public int delete(String arg0) throws Exception;
	
	/**
	 * 删除
	 * @param arg0
	 * @param arg1
	 * @return
	 * @throws Exception
	 */
	public int delete(String arg0, Object arg1) throws Exception;
	
	/**
	 * 对象查询
	 * @param arg0
	 * @return
	 * @throws Exception
	 */
	public <T> T selectOne(String arg0) throws Exception;

	/**
	 * 对象查询
	 * @param arg0
	 * @param arg1
	 * @return
	 * @throws Exception
	 */
	public <T> T selectOne(String arg0, Object arg1) throws Exception;
	
	/**
	 * 集合查询
	 * @param arg0
	 * @return
	 * @throws Exception
	 */
	public <T> List<T> selectList(String arg0) throws Exception;
	
	/**
	 * 集合查询
	 * @param arg0
	 * @param arg1
	 * @return
	 * @throws Exception
	 */
	public <T> List<T> selectList(String arg0, Object arg1) throws Exception;

	/**
	 * 字典查询
	 * @param arg0
	 * @param arg1
	 * @param arg2
	 * @return
	 * @throws Exception
	 */
	public <T> Map<String, T> selectMap(String arg0, String arg2) throws Exception;
	
	/**
	 * 字典查询
	 * @param arg0
	 * @param arg1
	 * @param arg2
	 * @return
	 * @throws Exception
	 */
	public <T> Map<String, T> selectMap(String arg0, Object arg1, String arg2) throws Exception;

	/**
	 * 分页查询
	 * @param arg0
	 * @param arg1
	 * @return
	 * @throws Exception
	 */
	public Page selectPage(String arg0, Page arg1) throws Exception;

}
