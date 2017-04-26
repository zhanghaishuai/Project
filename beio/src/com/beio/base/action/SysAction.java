package com.beio.base.action;

import com.beio.base.entity.SysArea;
import com.beio.base.entity.SysMember;
import com.beio.base.service.SysService;
import com.beio.base.util.ComUtil;
import com.beio.base.util.Constant;
import com.beio.base.vo.Address;
import com.beio.base.vo.Member;

/**
 * 系统控制器
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class SysAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	private Member mr = new Member();
	
	private SysArea area = new SysArea();
	
	private Address addr = new Address();
	
	private SysService sysService;
	
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
	 * 查询区划
	 * @return
	 */
	public String queryArea() throws Exception{
		setRoot(baseIbaitsService.selectList("sys.queryArea", area), "200");
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
		if (!sendSms(mr.getMobile(), ComUtil.generateSmsVerifyCode()
				, Constant.SMSCATEGORYVERIFYCODE)) {
			setRoot("128");
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
			setRoot("195");
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
	 * 个人中心（重置密码）
	 * @return
	 * @throws Exception 
	 */
	public String findPwdMyCenter() throws Exception{
		SysMember m = sessionMember();
		getSession().setAttribute(Constant.SESSIONFINDPWDMOBILE, m.getMobile());
		setRoot(m, "200");
		return JSON;
	}
	
	/**
	 * 个人中心（更换手机）
	 * @return
	 * @throws Exception 
	 */
	public String changeMblMyCenter() throws Exception{
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), mr.getMobile())) {
			setRoot("120");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("mobile").getRegex(), mr.getMobile())) {
			setRoot("121");
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
		mr.setId(sessionMemberID());
		mr.setModifier(sessionMemberID());
		mr.setModifyTime(curTimeStr());
		if (baseIbaitsService.update("sys.changeBindMobile", mr) < 1) {
			setRoot("100");
			return JSON;
		}
		SysMember m =queryMember(mr);
		getSession().setAttribute(Constant.SESSIONUSERINFO, m);
		getSession().removeAttribute(Constant.SESSIONFINDPWDMOBILE);
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
		mr.setModifier(sessionMemberID());
		mr.setModifyTime(curTimeStr());
		if (baseIbaitsService.insert("sys.findPwd", mr) < 1) {
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
		mr.setModifier(sessionMemberID());
		mr.setModifyTime(curTimeStr());
		if (baseIbaitsService.insert("sys.modifyMemberInfo", mr) < 1) {
			setRoot("100");
			return JSON;
		}
		SysMember m =queryMember(mr);
		getSession().setAttribute(Constant.SESSIONUSERINFO, m);
		setRoot(m, "200");
		return JSON;
	}
	
	/**
	 * 查询收货地址
	 * @return
	 * @throws Exception 
	 */
	public String queryAddr() throws Exception{
		addr.setMemberID(sessionMemberID());
		addr = (Address) baseIbaitsService.selectOne("sys.queryAddr", addr);
		if (addr == null) {
			setRoot("139");
			return JSON;
		}
		setRoot(addr, "200");
		return JSON;
	}
	
	/**
	 * 编辑收货地址
	 * @return
	 * @throws Exception 
	 */
	public String editAddr() throws Exception{
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), addr.getName())) {
			setRoot("137");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("mobile").getRegex(), addr.getMobile())) {
			setRoot("120");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), addr.getMobile())) {
			setRoot("121");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), addr.getProvince())) {
			setRoot("141");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), addr.getCity())) {
			setRoot("142");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), addr.getCounty())) {
			setRoot("143");
			return JSON;
		}
		if (ComUtil.isNotMatches(getRegex("empty").getRegex(), addr.getAddress())) {
			setRoot("144");
			return JSON;
		}
		addr.setMemberID(sessionMemberID());
		addr.setIsdefault(Constant.DEFAULT);
		addr.setCreator(sessionMemberID());
		addr.setCreateTime(curTimeStr());
		addr.setModifier(sessionMemberID());
		addr.setModifyTime(curTimeStr());
		int result = sysService.editAddr(addr);
		if (result < 0) {
			setRoot("140");
			return JSON;
		}
		if (result < 1) {
			setRoot("100");
			return JSON;
		}
		setRoot(addr, "200");
		return JSON;
	}
	
	/**
	 * 删除收货地址
	 * @return
	 * @throws Exception 
	 */
	public String delAddr() throws Exception{
		addr.setMemberID(sessionMemberID());
		addr.setModifier(sessionMemberID());
		addr.setModifyTime(curTimeStr());
		if (baseIbaitsService.update("sys.delAddr", addr) < 1) {
			setRoot("100");
			return JSON;
		}
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 默认收货地址
	 * @return
	 * @throws Exception 
	 */
	public String defaultAddr() throws Exception{
		addr.setMemberID(sessionMemberID());
		addr.setModifier(sessionMemberID());
		addr.setModifyTime(curTimeStr());
		if (sysService.defaultAddr(addr) < 1) {
			setRoot("100");
			return JSON;
		}
		setRoot("200");
		return JSON;
	}
	
	/**
	 * 查询收货地址
	 * @return
	 * @throws Exception 
	 */
	public String queryAllAddr() throws Exception{
		addr.setMemberID(sessionMemberID());
		setRoot(baseIbaitsService.selectList("sys.queryAddr", addr), "200");
		return JSON;
	}

	public Member getMr() {
		return mr;
	}

	public void setMr(Member mr) {
		this.mr = mr;
	}

	public SysArea getArea() {
		return area;
	}

	public void setArea(SysArea area) {
		this.area = area;
	}

	public Address getAddr() {
		return addr;
	}

	public void setAddr(Address addr) {
		this.addr = addr;
	}

	public SysService getSysService() {
		return sysService;
	}

	public void setSysService(SysService sysService) {
		this.sysService = sysService;
	}
	
}
