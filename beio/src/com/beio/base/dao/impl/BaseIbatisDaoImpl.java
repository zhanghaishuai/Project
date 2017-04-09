package com.beio.base.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.beio.base.dao.BaseIbatisDao;
import com.beio.base.vo.Page;

/**
 * Ibatis 基础数据访问实现
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
@SuppressWarnings("rawtypes")
public class BaseIbatisDaoImpl extends SqlSessionDaoSupport implements BaseIbatisDao {

	@Override
	public void clearCache() throws Exception {
		// TODO Auto-generated method stub
		getSqlSession().clearCache();
	}

	@Override
	public int insert(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().insert(arg0);
	}

	@Override
	public int insert(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().insert(arg0, arg1);
	}

	@Override
	public int update(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().update(arg0);
	}

	@Override
	public int update(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().update(arg0, arg1);
	}

	@Override
	public int delete(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().delete(arg0);
	}

	@Override
	public int delete(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().delete(arg0, arg1);
	}

	@Override
	public Object selectOne(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().selectOne(arg0);
	}

	@Override
	public Object selectOne(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().selectOne(arg0, arg1);
	}

	@Override
	public List selectList(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().selectList(arg0);
	}

	@Override
	public List selectList(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().selectList(arg0, arg1);
	}

	@Override
	public Map selectMap(String arg0, String arg2)
			throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().selectMap(arg0, arg2);
	}

	@Override
	public Map selectMap(String arg0, Object arg1, String arg2)
			throws Exception {
		// TODO Auto-generated method stub
		return getSqlSession().selectMap(arg0, arg1, arg2);
	}

	@Override
	public Page selectPage(String arg0, Page page) throws Exception {
		// TODO Auto-generated method stub
		// 获取总数
		page.setPageQueryCount(true);
		int total = getSqlSession().selectOne(arg0, page);
		// 构建分页对象
		page.setPageTotal(total);
		// 获取当前页数据
		page.setPageQueryCount(false);
		page.setPageList(getSqlSession().selectList(arg0, page));
		// 返回分页对象
		return page;
	}

}
