package com.beio.base.entity;

/**
 * 支付
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysPay {

	private String id; // 主键
	
	private String total_fee; // 支付金额
	
	private String return_code; // 响应代码
	
	private String return_msg; // 响应提示
	
	private String code_url; // 支付链接
	
	private String prepay_id; // 预支付ID

	private String sender_str; // 请求字符串
	
	private String return_str; // 响应字符串
	
	private String status; // 支付状态（0：下单未支付、1：支付完成）
	
	private String category; // 支付类型（0：购买商品、1：开通会员）
	
	private String pre_time; // 下单时间
	
	private String trade_state; // 交易状态
	
	private String pay_str; // 支付响应字符串
	
	private String pay_time; // 支付时间
	
	private String modifier; // 修改人

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}

	public String getReturn_code() {
		return return_code;
	}

	public void setReturn_code(String return_code) {
		this.return_code = return_code;
	}

	public String getReturn_msg() {
		return return_msg;
	}

	public void setReturn_msg(String return_msg) {
		this.return_msg = return_msg;
	}

	public String getCode_url() {
		return code_url;
	}

	public void setCode_url(String code_url) {
		this.code_url = code_url;
	}

	public String getPrepay_id() {
		return prepay_id;
	}

	public void setPrepay_id(String prepay_id) {
		this.prepay_id = prepay_id;
	}

	public String getSender_str() {
		return sender_str;
	}

	public void setSender_str(String sender_str) {
		this.sender_str = sender_str;
	}

	public String getReturn_str() {
		return return_str;
	}

	public void setReturn_str(String return_str) {
		this.return_str = return_str;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPre_time() {
		return pre_time;
	}

	public void setPre_time(String pre_time) {
		this.pre_time = pre_time;
	}

	public String getTrade_state() {
		return trade_state;
	}

	public void setTrade_state(String trade_state) {
		this.trade_state = trade_state;
	}

	public String getPay_str() {
		return pay_str;
	}

	public void setPay_str(String pay_str) {
		this.pay_str = pay_str;
	}

	public String getPay_time() {
		return pay_time;
	}

	public void setPay_time(String pay_time) {
		this.pay_time = pay_time;
	}

	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}
	
}
