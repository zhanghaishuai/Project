package com.beio.base.util;

import java.text.DecimalFormat;
import java.util.Collection;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
	public static String generateSmsVerifyCode(){
		return new DecimalFormat("000000").format((int) (Math.random() * Math.pow(10, 6)));
	}
	
	/**
	 * 生成订单号
	 * @param reg
	 * @param str
	 * @return
	 * @throws Exception 
	 */
	public static String generateOrderNO(int k) throws Exception {
		return DateUtil.formatDate(DateUtil.getTime(),
				DateUtil.PATTERNNONETIMEWITHMS)
				+ new DecimalFormat("000").format(k);
	}
	
	public static void main(String[] args) {
		System.out.println(generateSmsVerifyCode());
	}
	
}
