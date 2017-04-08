package com.beio.base.service.impl;

import java.util.List;
import java.util.Map;

import com.beio.base.dao.BaseIbatisDao;
import com.beio.base.service.BaseIbaitsService;
import com.beio.base.vo.Page;

/**
 * Ibatis基础业务逻辑实现
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class BaseIbatisServiceImpl implements BaseIbaitsService {

	private BaseIbatisDao baseIbatisDao;

	@Override
	public void clearCache() throws Exception {
		// TODO Auto-generated method stub
		baseIbatisDao.clearCache();
	}

	@Override
	public int insert(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.insert(arg0);
	}

	@Override
	public int insert(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.insert(arg0, arg1);
	}

	@Override
	public int update(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.update(arg0);
	}

	@Override
	public int update(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.update(arg0, arg1);
	}

	@Override
	public int delete(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.delete(arg0);
	}

	@Override
	public int delete(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.delete(arg0, arg1);
	}

	@Override
	public <T> T selectOne(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.selectOne(arg0);
	}

	@Override
	public <T> T selectOne(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.selectOne(arg0, arg1);
	}

	@Override
	public <T> List<T> selectList(String arg0) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.selectList(arg0);
	}

	@Override
	public <T> List<T> selectList(String arg0, Object arg1) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.selectList(arg0, arg1);
	}

	@Override
	public <T> Map<String, T> selectMap(String arg0, String arg2)
			throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.selectMap(arg0, arg2);
	}

	@Override
	public <T> Map<String, T> selectMap(String arg0, Object arg1, String arg2)
			throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.selectMap(arg0, arg1, arg2);
	}

	@Override
	public Page selectPage(String arg0, Page arg1) throws Exception {
		// TODO Auto-generated method stub
		return baseIbatisDao.selectPage(arg0, arg1);
	}

	public BaseIbatisDao getBaseIbatisDao() {
		return baseIbatisDao;
	}

	public void setBaseIbatisDao(BaseIbatisDao baseIbatisDao) {
		this.baseIbatisDao = baseIbatisDao;
	}

}
