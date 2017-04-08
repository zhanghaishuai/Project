package com.beio.base.action;

import java.io.File;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.util.JSONUtils;

import org.apache.struts2.ServletActionContext;

import com.beio.base.entity.SysMember;
import com.beio.base.entity.SysRegex;
import com.beio.base.entity.SysSmsLog;
import com.beio.base.entity.SysTipMsg;
import com.beio.base.service.BaseIbaitsService;
import com.beio.base.util.ComUtil;
import com.beio.base.util.Constant;
import com.beio.base.util.DateUtil;
import com.beio.base.util.RegexUtil;
import com.beio.base.util.SmsUtil;
import com.beio.base.util.TipMsgUtil;
import com.beio.base.vo.Root;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 基础控制器
 * 
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class BaseAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	// Json标识
	protected static final String JSON = "json";

	// 文件
	protected File file;

	// 文件名
	protected String fileFileName;

	// 文件列表
	protected File[] files;

	// 文件列表名称
	protected String[] filesFileName;
	
	// 接口反馈对象
	protected Root root = new Root();
	
	// 会员对象
	protected SysMember member = new SysMember();
	
	// 刷新标记
	protected String flushStr;
	
	// 正则工具类
	protected RegexUtil regexUtil;
	
	// 提示工具类
	protected TipMsgUtil tipMsgUtil;
		
	// 业务逻辑基类
	protected BaseIbaitsService baseIbaitsService;
	
	/**
	 * JSON时间格式 
	 */
	static {
		String[] dateFormats = new String[] { "yyyy-MM-dd HH:mm:ss.sss", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd" };
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));
	}

	/**
	 * 请求对象
	 * @return
	 */
	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	/**
	 * 响应对象
	 * @return
	 */
	public HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * 会话对象
	 * @return
	 */
	public HttpSession getSession() {
		return getRequest().getSession();
	}
	
	/**
	 * IP 地址
	 * @return
	 */
	public String getIpAddress() {
		HttpServletRequest request = getRequest();
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
	}
	
	/**
	 * 请求参数
	 * @return
	 */
	public String getRequsetParams(){
		StringBuffer params = new StringBuffer();
		Map<String, String[]> map = getRequest().getParameterMap();
		for (Object key : map.keySet()) {
			String[] strs = map.get(key);
			for (int i = 0; i < strs.length; i++) {
				params.append(ComUtil.isEmpty(params.toString()) ? "?" : "&");
				params.append(key);
				params.append("=");
				params.append(strs[i]);
			}
		}
		return params.toString();
	}

	/**
	 * 文本输出流
	 * @return
	 */
	public PrintWriter getOut() throws Exception {
		HttpServletResponse response = getResponse();
		response.setContentType("text/plain;charset=UTF-8");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		return response.getWriter();
	}
	
	/**
	 * 图片输出流
	 * @return
	 */
	public ServletOutputStream getImageOutputStream() throws Exception {
		HttpServletResponse response = getResponse();
		response.setContentType("image/jpeg");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		return response.getOutputStream();
	}

	/**
	 * 输出数据
	 * @param arg0
	 * @throws Exception
	 */
	public <T> void print(T arg0) throws Exception {
		PrintWriter out = getOut();
		out.println(arg0);
		out.flush();
		out.close();
	}
	
	/**
	 * 会话会员
	 * @return
	 */
	public SysMember sessionMember() {
		if (getSession().getAttribute(Constant.SESSIONUSERINFO) != null) {
			return ((SysMember) getSession().getAttribute(Constant.SESSIONUSERINFO));
		}
		return null;
	}
	
	/**
	 * 会话会员
	 * @return
	 */
	public String sessionMemberID() {
		if (getSession().getAttribute(Constant.SESSIONUSERINFO) != null) {
			return ((SysMember) getSession().getAttribute(Constant.SESSIONUSERINFO)).getId();
		}
		return "";
	}
	
	/**
	 * 当前时间
	 * @return
	 * @throws Exception
	 */
	public String curTimeStr() throws Exception {
		return DateUtil.formatDate(DateUtil.getTime(), DateUtil.PATTERNLINETIMEWITHMS);
	}
	
	/**
	 * 会员状态
	 * @return
	 * @throws Exception 
	 */
	public boolean sessionMemberState() throws Exception {
		if (getSession().getAttribute(Constant.SESSIONUSERINFO) != null) {
			return !DateUtil.parseDate(
					((SysMember) getSession().getAttribute(
							Constant.SESSIONUSERINFO)).getExpireTime(),
					DateUtil.PATTERNLINEDATE).before(DateUtil.getDate());
		}
		return false;
	}
	
	/**
	 * 查询顾客
	 * @return
	 * @throws Exception 
	 */
	public SysMember queryMember(SysMember member) throws Exception{
		return baseIbaitsService.selectOne("sys.queryMember", member);
	}
	
	/**
	 * 发送短信
	 * @return
	 * @throws Exception
	 */
	public boolean sendSms(String mobile, String message, String category) throws Exception{
		SysSmsLog ssl = new SysSmsLog();
		ssl.setMobile(mobile);
		ssl.setMessage(message);
		ssl.setStatus(SmsUtil.sendSms(mobile, message));
		ssl.setCategory(category);
		ssl.setCreator(sessionMemberID());
		ssl.setCreateTime(curTimeStr());
		System.out.println("SMSVerifyCode:=====:=====:=====:" + message);
		baseIbaitsService.insert("sys.insertSmsLog", ssl);
		return Constant.SMSSENDSUCCESS.equals(ssl.getStatus());
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public File[] getFiles() {
		return files;
	}

	public void setFiles(File[] files) {
		this.files = files;
	}

	public String[] getFilesFileName() {
		return filesFileName;
	}

	public void setFilesFileName(String[] filesFileName) {
		this.filesFileName = filesFileName;
	}

	public Root getRoot() {
		return root;
	}
	
	public void setRoot(Object result) {
		this.root.setResult(result);
	}
	
	public void setRoot(String status) {
		this.root.setStatus(status);
	}
	
	public void setRoot(Object result, String status) {
		this.root.setResult(result);
		this.root.setStatus(status);
	}

	public void setRoot(Object result, String status, String message) {
		this.root.setResult(result);
		this.root.setStatus(status);
		this.root.setMessage(message);
	}

	public SysMember getMember() {
		return member;
	}

	public void setMember(SysMember member) {
		this.member = member;
	}
	
	public String getFlushStr() {
		return flushStr;
	}

	public void setFlushStr(String flushStr) {
		this.flushStr = flushStr;
	}

	public RegexUtil getRegexUtil() {
		return regexUtil;
	}

	public void setRegexUtil(RegexUtil regexUtil) {
		this.regexUtil = regexUtil;
	}
	
	public SysRegex getRegex(String key) {
		return regexUtil.getRegex(key);
	}
	
	public Map<String, SysRegex> getRegexs() {
		return regexUtil.getRegexs();
	}
	
	public TipMsgUtil getTipMsgUtil() {
		return tipMsgUtil;
	}

	public void setTipMsgUtil(TipMsgUtil tipMsgUtil) {
		this.tipMsgUtil = tipMsgUtil;
	}
	
	public SysTipMsg getTip(String key) {
		return tipMsgUtil.getTip(key);
	}
	
	public Map<String, SysTipMsg> getTips() {
		return tipMsgUtil.getTips();
	}

	public BaseIbaitsService getBaseIbaitsService() {
		return baseIbaitsService;
	}

	public void setBaseIbaitsService(BaseIbaitsService baseIbaitsService) {
		this.baseIbaitsService = baseIbaitsService;
	}
	
}
