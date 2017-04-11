package com.beio.base.vo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.beio.base.util.DateUtil;

/**
 * 分页值对象
 * @author zhs
 * @date 2017-03-27
 * @version 1.0.0
 */
public class Page {
	
	// 显示数
	private int pageSize = 10;
	
	// 总条数
	private int pageTotal = 0;

	// 当前页
	private int pageIndex = 1;

	// 总页码
	private int pageCount = 1;

	// 开始时间
	private Date pageBeginTime;
	
	// 结束时间
	private Date pageEndTime;
	
	// 查询总数
	private boolean pageQueryCount = false;

	// 数据集合
	@SuppressWarnings("rawtypes")
	private List pageList = new ArrayList();


	public int getPageTotal() {
		return pageTotal;
	}

	public void setPageTotal(int pageTotal) {
		// 保存总数
		this.pageTotal = pageTotal;

		// 获取总页数
		this.pageCount = this.pageTotal == 0 ? 1
				: this.pageTotal % this.pageSize == 0 ? this.pageTotal / this.pageSize
						: (this.pageTotal / this.pageSize) + 1;

		// 控制当前页
		if (this.pageIndex < 1) {
			this.pageIndex = 1;
		} else if (this.pageIndex > this.pageCount) {
			this.pageIndex = this.pageCount;
		}
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageCount() {
		return pageCount;
	}

	@SuppressWarnings("rawtypes")
	public List getPageList() {
		return pageList;
	}

	@SuppressWarnings("rawtypes")
	public void setPageList(List pageList) {
		this.pageList = pageList;
	}

	public Date getPageBeginTime() {
		return pageBeginTime;
	}

	public void setPageBeginTime(Date pageBeginTime) {
		this.pageBeginTime = pageBeginTime;
	}

	public Date getPageEndTime() {
		return pageEndTime;
	}

	public void setPageEndTime(Date pageEndTime) {
		this.pageEndTime = pageEndTime;
	}
	
	public boolean isPageQueryCount() {
		return pageQueryCount;
	}

	public void setPageQueryCount(boolean pageQueryCount) {
		this.pageQueryCount = pageQueryCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public Date getPageCurTime() {
		try {
			return DateUtil.getTime();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new Date();
	}

	public int getFirstResult() {
		return (pageIndex - 1) * pageSize;
	}

	public int getMaxResults() {
		return pageSize;
	}
	
	public Page(int pageSize) {
		super();
		this.pageSize = pageSize;
	}
	
	public Page() {
		super();
	}
}
