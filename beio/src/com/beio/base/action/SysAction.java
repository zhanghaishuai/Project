package com.beio.base.action;

import java.util.Calendar;

import com.beio.base.entity.SysMember;
import com.beio.base.util.ComUtil;
import com.beio.base.util.Constant;
import com.beio.base.util.DateUtil;
import com.beio.base.util.SmsUtil;
import com.beio.base.vo.Member;

/**
 * 系统控制器
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	Member mr = new Member();
	
	/**
	 * 查询正则
	 * @return
	 */
	public String queryRegex() throws Exception{
		setRoot(getRegexs(), "200");
		return JSON;
	}
	
	/**
	 * 查询提示
	 * @return
	 */
	public String queryTip() throws Exception{
		setRoot(getTips(), "200");
		return JSON;
	}
	
	/**
	 * 短信验证码
	 * @return
	 * @throws Exception 
	 */
	public String sendSmsVerifyCode() throws Exception {
		if (ComUtil.isNotMatches(getRegex("mobile").getRegex(), mr.getMobile())) {
			setRoot("121");
			return JSON;
		}
		if (!sendSms(mr.getMobile(), SmsUtil.smsVerifyCode(6), Constant.SMSCATEGORYVERIFYCODE)) {
			setRoot("128");
			return JSON;
		}
		SysMember m = queryMember(mr);
		if (m == null && Constant.EXIST.equals(mr.getExist())) {
			setRoot("190");
			return JSON;
		}
		if (m != null && Constant.NOTEXIST.equals(mr.getExist())) {
			setRoot("191");
			return JSON;
		}
		if (m != null && !Constant.ENABLE.equals(m.getEnable())) {
			setRoot("192");
			return JSON;
		}
		if (m != null && !Constant.EXIST.equals(m.getExist())) {
			setRoot("193");
			return JSON;
		}
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 会话用户
	 * @return
	 */
	public String querySessionMember() throws Exception{
		SysMember m = sessionMember();
		if (m == null) {
			setRoot("170");
			return JSON;
		}
		setRoot(m, "200");
		return JSON;
	}
	
	/**
	 * 会员是否存在
	 * @return
	 * @throws Exception 
	 */
	public String isMemberExist() throws Exception{
		if (ComUtil.isNotMatches(getRegex("mobile").getRegex(), member.getMobile())) {
			setRoot("121");
			return JSON;
		}
		SysMember m = queryMember(member);
		if (m == null) {
			setRoot("190");
			return JSON;
		}
		setRoot("191");
		return JSON;
	}
	
	/**
	 * 会员注册
	 * @return
	 * @throws Exception 
	 */
	public String register() throws Exception{
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getMobile())) {
			setRoot("120");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("mobile").getRegex(), mr.getMobile())) {
			setRoot("121");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getPassword())) {
			setRoot("122");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("password").getRegex(), mr.getPassword())) {
			setRoot("123");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getEmail())) {
			setRoot("131");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("email").getRegex(), mr.getEmail())) {
			setRoot("132");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getImgVerifyCode())) {
			setRoot("124");
			return JSON;
		}
		if (!mr.getImgVerifyCode().toUpperCase().equals((String) getSession().getAttribute(Constant.SESSIONVERIFYCODE))) {
			setRoot("125");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getSmsVerifyCode())) {
			setRoot("126");
			return JSON;
		}
		if (!mr.getSmsVerifyCode().equals(baseIbaitsService.selectOne("sys.querySmsVerify", mr.getMobile()))) {
			setRoot("127");
			return JSON;
		}
		SysMember m = queryMember(mr);
		if (m != null) {
			setRoot("191");
			return JSON;
		}
		mr.setLevel(Constant.CUSTOMERLEVELREGULAR);
		mr.setTurnonTime(curTimeStr());
		mr.setExpireTime(DateUtil.formatDate(DateUtil.addDate(DateUtil.getTime(), Calendar.YEAR, 1), DateUtil.PATTERNLINETIMEWITHMS));
		mr.setCreator(sessionMemberID());
		mr.setCreateTime(curTimeStr());
		mr.setModifier(sessionMemberID());
		mr.setModifyTime(curTimeStr());
		if (baseIbaitsService.insert("sys.register", mr) < 1) {
			setRoot("100");
			return JSON;
		}
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 登录
	 * @return
	 * @throws Exception 
	 */
	public String login() throws Exception{
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getMobile())) {
			setRoot("120");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getPassword())) {
			setRoot("122");
			return JSON;
		}
		if (!Constant.AUTOLOGINMARK.equals(mr.getAutoLoginMark())) {
			if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getImgVerifyCode())) {
				setRoot("124");
				return JSON;
			}
			if (!mr.getImgVerifyCode().toUpperCase().equals((String) getSession().getAttribute(Constant.SESSIONVERIFYCODE))) {
				setRoot("125");
				return JSON;
			}
		}
		
		SysMember m = (SysMember) getBaseIbaitsService().selectOne("sys.login", mr);
		if (m == null) {
			setRoot("190");
			return JSON;
		}
		if (!Constant.ENABLE.equals(m.getEnable())) {
			setRoot("192");
			return JSON;
		}
		if (!Constant.EXIST.equals(m.getExist())) {
			setRoot("193");
			return JSON;
		}
		getSession().setAttribute(Constant.SESSIONUSERINFO, m);
		setRoot(m, "200");
		return JSON;
	}
	
	/**
	 * 用户注销
	 * @return
	 */
	public String logout() throws Exception{
		getSession().removeAttribute(Constant.SESSIONUSERINFO);
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 找回密码（填写手机）
	 * @return
	 * @throws Exception 
	 */
	public String findPwdFillMobile() throws Exception{
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getMobile())) {
			setRoot("120");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("mobile").getRegex(), mr.getMobile())) {
			setRoot("121");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getImgVerifyCode())) {
			setRoot("124");
			return JSON;
		}
		if (!mr.getImgVerifyCode().toUpperCase().equals((String) getSession().getAttribute(Constant.SESSIONVERIFYCODE))) {
			setRoot("125");
			return JSON;
		}
		SysMember m = queryMember(mr);
		if (m == null) {
			setRoot("190");
			return JSON;
		}
		getSession().setAttribute(Constant.SESSIONFINDPWDMOBILE, mr.getMobile());
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 找回密码（验证身份）
	 * @return
	 * @throws Exception 
	 */
	public String findPwdValidIdentity() throws Exception{
		String mobile = String.valueOf(getSession().getAttribute(Constant.SESSIONFINDPWDMOBILE));
		if (ComUtil.isEveryEmpty(mobile)) {
			setRoot("171");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getSmsVerifyCode())) {
			setRoot("126");
			return JSON;
		}
		if (!mr.getSmsVerifyCode().equals(baseIbaitsService.selectOne("sys.querySmsVerify", mobile))) {
			setRoot("127");
			return JSON;
		}
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 找回密码（重置密码）
	 * @return
	 * @throws Exception 
	 */
	public String findPwdResetPwd() throws Exception{
		String mobile = String.valueOf(getSession().getAttribute(Constant.SESSIONFINDPWDMOBILE));
		if (ComUtil.isEveryEmpty(mobile)) {
			setRoot("171");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getPassword())) {
			setRoot("122");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("password").getRegex(), mr.getPassword())) {
			setRoot("123");
			return JSON;
		}
		mr.setMobile(mobile);
		if (getBaseIbaitsService().insert("sys.findPwd", mr) < 1) {
			setRoot("100");
			return JSON;
		}
		getSession().removeAttribute(Constant.SESSIONFINDPWDMOBILE);
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 修改个人信息
	 * @return
	 * @throws Exception 
	 */
	public String modifyMemberInfo() throws Exception{
		if (ComUtil.isNotMatches(getRegex("nickName").getRegex(), mr.getNickName())) {
			setRoot("133");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getEmail())) {
			setRoot("132");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("email").getRegex(), mr.getEmail())) {
			setRoot("131");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("date").getRegex(), mr.getBirthday())) {
			setRoot("135");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("hobby").getRegex(), mr.getHobby())) {
			setRoot("134");
			return JSON;
		}
		mr.setId(sessionMemberID());
		if (getBaseIbaitsService().insert("sys.modifyMemberInfo", mr) < 1) {
			setRoot("100");
			return JSON;
		}
		SysMember m =queryMember(mr);
		getSession().setAttribute(Constant.SESSIONUSERINFO, m);
		setRoot(m, "200");
		return JSON;
	}

	public Member getMr() {
		return mr;
	}

	public void setMr(Member mr) {
		this.mr = mr;
	}
	
}
