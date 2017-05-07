package com.beio.front.entity;

import com.beio.base.vo.Page;

/**
 * 售后服务
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class GdsService extends Page{

	private String id; // 主键
	
	private String orderID; // 订单ID
	
	private String content; // 内容
	
	private String feedback; // 反馈
	
	private String remark; // 备注
	
	private String status; // 售后状态（0：已申请、1：已反馈）
	
	private String enable; // 是否启用（0：否、1：是）
	
	private String exist; // 是否删除（0：否、1：是）
	
	private String creator; // 创建人
	
	private String createTime; // 创建时间
	
	private String modifier; // 修改人
	
	private String modifyTime; // 修改时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEnable() {
		return enable;
	}

	public void setEnable(String enable) {
		this.enable = enable;
	}

	public String getExist() {
		return exist;
	}

	public void setExist(String exist) {
		this.exist = exist;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	public String getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}

}
