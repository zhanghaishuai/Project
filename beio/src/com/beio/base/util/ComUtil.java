package com.beio.base.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLConnection;
import java.text.DecimalFormat;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

/**
 * 通用类
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class ComUtil {

	/** 字符串（空） **/
	public static final String STRINGEMPTY = "";
	
	/** 字符串（空格） **/
	public static final String STRINGSPACE = " ";

	/**
	 * 判断字符串是否为空
	 * 
	 * @param collection
	 * @return
	 */
	public static boolean isEmpty(String str) {
		return ((str == null) || (str.length() == 0));
	}

	/**
	 * 判断字符串是否不为空
	 * 
	 * @param collection
	 * @return
	 */
	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}
	
	/**
	 * 判断字符串是否全部为空
	 * 
	 * @param collection
	 * @return
	 */
	public static boolean isEveryEmpty(String str) {
		return ((str == null) || (str.length() == 0) || str == "null");
	}

	/**
	 * 判断字符串是否全部不为空
	 * 
	 * @param collection
	 * @return
	 */
	public static boolean isNotEveryEmpty(String str) {
		return !isEveryEmpty(str);
	}
	
	/**
	 * 去除前后空格
	 * 
	 * @param str
	 * @return
	 */
	public static String trim(String str) {
		return isNotEmpty(str) ? str.trim() : STRINGEMPTY;
	}

	/**
	 * 去除所有空格
	 * 
	 * @param str
	 * @return
	 */
	public static String trimAll(String str) {
		return isNotEmpty(str) ? str.replaceAll(STRINGSPACE, STRINGEMPTY) : STRINGEMPTY;
	}

	/**
	 * 判断集合是否为空
	 * 
	 * @param collection
	 * @return
	 */
	public static <T> boolean isEmpty(Collection<T> collection) {
		return ((collection == null) || (collection.size() == 0));
	}

	/**
	 * 判断集合是否不为空
	 * 
	 * @param collection
	 * @return
	 */
	public static <T> boolean isNotEmpty(Collection<T> collection) {
		return !isEmpty(collection);
	}
	
	/**
	 * 判断字典是否为空
	 * 
	 * @param collection
	 * @return
	 */
	public static <T, C> boolean isEmpty(Map<T, C> map) {
		return ((map == null) || (map.size() == 0));
	}

	/**
	 * 判断集合是否不为空
	 * 
	 * @param collection
	 * @return
	 */
	public static <T, C> boolean isNotEmpty(Map<T, C> map) {
		return !isEmpty(map);
	}
	
	/**
	 * 正则是否匹配
	 * @param reg
	 * @param str
	 * @return
	 */
	public static boolean isMatches(String reg, String str) {
		if (reg == null || str == null) {
			return false;
		}
		Pattern pattern = Pattern.compile(reg);
		Matcher matcher = pattern.matcher(str);
		return matcher.matches();
	}
	
	/**
	 * 正则是否不匹配
	 * @param reg
	 * @param str
	 * @return
	 */
	public static boolean isNotMatches(String reg, String str) {
		return !isMatches(reg, str);
	}
	
	/**
	 * 生成验证码
	 * @param len
	 * @return
	 */
	public static String smsVerifyCode(){
		return new DecimalFormat("000000").format((int) (Math.random() * Math.pow(10, 6)));
	}
	
	/**
	 * 生成支付号
	 * @param reg
	 * @param str
	 * @return
	 * @throws Exception 
	 */
	public static String payNo() throws Exception {
		return DateUtil.formatDate(DateUtil.getTime(),
				DateUtil.PATTERNNONETIMEWITHMS)
				+ new DecimalFormat("00000").format((int) (Math.random() * Math
						.pow(10, 5)));
	}
	
	/**
	 * 生成订单号
	 * @param reg
	 * @param str
	 * @return
	 * @throws Exception 
	 */
	public static String orderNo(int k) throws Exception {
		return DateUtil.formatDate(DateUtil.getTime(),
				DateUtil.PATTERNNONETIMEWITHMS)
				+ new DecimalFormat("000").format(k);
	}
	
	/**
	 * 唯一标识
	 * @return
	 */
	public static String uuid() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	/**
	 * XML组装
	 * @param param
	 * @return
	 */
	public static String installXML(Map<String, String> param){
		StringBuffer xml = new StringBuffer();
		xml.append("<xml>");
		for (Object key : param.keySet()) {
			xml.append("<"+key+"><![CDATA["+param.get(key)+"]]></"+key+">");
		}
		xml.append("</xml>");
		return xml.toString();
	}
	
	/**
	 * XML解析
	 * @param xmlStr
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, String> parseXML(String xmlStr) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		if (ComUtil.isEmpty(xmlStr)) {
			return map;
		}
		Document doc = DocumentHelper.parseText(xmlStr);
		Element root = doc.getRootElement();
		Iterator<Element> i = root.elementIterator();
		while (i.hasNext()) {
			Element e = i.next();
			map.put(e.getName(), e.getTextTrim());
		}
		return map;
	}
	
	/**
	 * 微信签名
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static String signWX(Map<String, String> param, String api_key) throws Exception{
		StringBuffer sb = new StringBuffer();
		for (Object key : param.keySet()) {
			if (ComUtil.isNotEmpty(param.get(key))) {
				sb.append(key + "=" + param.get(key) + "&");
			}
		}
		sb.append("key=" + api_key);
		return MD5Util.MD5("utf-8", sb.toString());
	}
	
	/**
	 * POST请求
	 * @param urlStr
	 * @param xmlStr
	 * @return
	 * @throws Exception
	 */
	public static String httpPost(String urlStr, String xmlStr) throws Exception {
		// 返回值
		StringBuffer result = new StringBuffer();
		// 行数据
		String line;
		// 请求地址
		URL url = new URL(urlStr);
		// 打开和URL之间的连接
		URLConnection conn = url.openConnection();
		// 设置通用的请求属性
        conn.setRequestProperty("accept", "*/*");
        conn.setRequestProperty("connection", "Keep-Alive");
        conn.setRequestProperty("Content-Type", "text/plain; charset=utf-8");
        conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
        // POST请求
        conn.setDoOutput(true);
        conn.setDoInput(true);
        // 获取URLConnection对象对应的输出流
        OutputStream out = conn.getOutputStream();
        out.write(xmlStr.getBytes("utf-8"));
        // 关闭输出流
        out.flush();
        out.close();
        // 定义BufferedReader输入流来读取URL的响应
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
        // 组装返回值
        while ((line = in.readLine()) != null) {
        	result.append(line);
        }
        in.close();
        return result.toString();
	}
	
	public static void main(String[] args) throws Exception {
		
		System.out.println(String.valueOf(BigDecimal.valueOf(139.1523).multiply(new BigDecimal(100)).intValue()));
		
	}
	
}
