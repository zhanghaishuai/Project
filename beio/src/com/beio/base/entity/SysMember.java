package com.beio.base.entity;

import com.beio.base.util.Constant;
import com.beio.base.util.DateUtil;

/**
 * 会员信息
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysMember {

	private String id; // 主键
	
	private String mobile; // 手机号
	
	private String password; // 密码
	
	private String email; // 邮箱

	private String nickName; // 昵称
	
	private String sex; // 性别（0：女、1：男）
	
	private String birthday; // 生日
	
	private String hobby; // 兴趣爱好
	
	private String level; // 会员级别（0：普通、1：高级）
	
	private String turnonTime; // 到期时间
	
	private String expireTime; // 到期时间
	
	private String remark; // 备注
	
	private String enable; // 是否启用（0：否、1：是）
	
	private String exist; // 是否删除（0：否、1：是）
	
	private String creator; // 创建人
	
	private String createTime; // 创建时间
	
	private String modifier; // 修改人
	
	private String modifyTime; // 修改时间
	
	private boolean expire; // 是否过期

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getHobby() {
		return hobby;
	}

	public void setHobby(String hobby) {
		this.hobby = hobby;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getTurnonTime() {
		return turnonTime;
	}

	public void setTurnonTime(String turnonTime) {
		this.turnonTime = turnonTime;
	}

	public String getExpireTime() {
		return expireTime;
	}

	public void setExpireTime(String expireTime) {
		this.expireTime = expireTime;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public boolean isExpire() {
		try {
			this.expire = !Constant.CUSTOMERLEVELSENIOR.equals(level) ?
				true : DateUtil.isExpire(turnonTime, expireTime);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return expire;
	}

	public void setExpire(boolean expire) {
		this.expire = expire;
	}

}
