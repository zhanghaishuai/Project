package com.beio.base.entity;

/**
 * 短信日志
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysSmsLog {

	private String id; // 主键
	
	private String mobile; // 手机号
	
	private String message; // 消息内容
	
	private String status; // 状态
	
	private String errCode; // 错误代码
	
	private String errDesc; // 错误描述
	
	private String category; // 类型（01：验证码）
	
	private String creator; // 创建人
	
	private String createTime; // 创建时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getErrCode() {
		return errCode;
	}

	public void setErrCode(String errCode) {
		this.errCode = errCode;
	}

	public String getErrDesc() {
		return errDesc;
	}

	public void setErrDesc(String errDesc) {
		this.errDesc = errDesc;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
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

}
