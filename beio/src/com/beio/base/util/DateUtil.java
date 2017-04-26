package com.beio.base.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 时间工具类
 * @author zhs
 * @date 2016-08-01
 * @version 1.0.0
 */
public class DateUtil {
	
	public static final String PATTERNYEAR = "yyyy";
	public static final String PATTERNMON = "MM";
	public static final String PATTERNDAY = "dd";
	public static final String PATTERNHOUR = "HH";
	public static final String PATTERNNONEDATE = "yyyyMMdd";
	public static final String PATTERNNONETIME = "yyyyMMddHHmmss";
	public static final String PATTERNNONETIMEWITHMS = "yyyyMMddHHmmssSSS";
	public static final String PATTERNLINEDATE = "yyyy-MM-dd";
	public static final String PATTERNLINETIME = "yyyy-MM-dd HH:mm:ss";
	public static final String PATTERNLINETIMEWITHMS = "yyyy-MM-dd HH:mm:ss.SSS";

	/**
	 * 解析时间为指定模式字符串
	 * @param date
	 * @param pattern
	 * @return
	 * @throws Exception
	 */
	public static String formatDate(Date date, String pattern) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.format(date);
	}
	
	/**
	 * 解析指定时间格式字符串为时间
	 * @param dateStr
	 * @param pattern
	 * @return
	 * @throws Exception
	 */
	public static Date parseDate(String dateStr, String pattern) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.parse(dateStr);
	}
	
	/**
	 * 获取当前时间
	 * @return
	 * @throws Exception
	 */
	public static Date getTime() throws Exception {
		Calendar c = Calendar.getInstance();
		return c.getTime();
	}
	
	/**
	 * 获取当前日期
	 * @return
	 * @throws Exception
	 */
	public static Date getDate() throws Exception {
		return parseDate(formatDate(getTime(), PATTERNLINEDATE), PATTERNLINEDATE);
	}
	
	/**
	 * 时间加减
	 * @return
	 * @throws Exception
	 */
	public static Date addDate(Date date, int field, int amount) throws Exception {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(field, amount);
		return c.getTime();
	}
	
	/**
	 * 是否过期
	 * @param turnon
	 * @param expire
	 * @return
	 * @throws Exception 
	 */
	public static boolean isExpire(String turnon, String expire) throws Exception {
		return !(parseDate(turnon, PATTERNLINEDATE).before(getTime()) && addDate(
				parseDate(expire, PATTERNLINEDATE), Calendar.DATE, 1).after(getTime()));
	}
	
	/**
	 * 获取年龄
	 * @param birthday
	 * @return
	 * @throws Exception
	 */
	public static Integer getAge(Date birthday) throws Exception {
		
		// 创建日历对象
		Calendar c = Calendar.getInstance();
		
		// 获取出生年月日
		c.setTime(birthday);
		int birthYear = c.get(Calendar.YEAR);
		int birthMonth = c.get(Calendar.MONTH) + 1;
		int birthDay = c.get(Calendar.DAY_OF_MONTH);
		
		// 获取当前年月日
		c.setTime(getTime());
		int curYear = c.get(Calendar.YEAR);
		int curMonth = c.get(Calendar.MONTH) + 1;
		int curDay = c.get(Calendar.DAY_OF_MONTH);
		
		// 计算年龄
		int age = curYear - birthYear;
		
		// 判断年份
		if (birthYear < curYear) {
			
			// 判断月份
			if (birthMonth > curMonth) {
				// 年龄减 1
				age--;
			}else if (birthMonth == curMonth) {
				
				// 判断日期
				if (birthDay > curDay) {
					age--;
				}
			}
		}
		return age;
	}
	
	/**
	 * 获取星座
	 * @param birthday
	 * @return
	 * @throws Exception
	 */
	public static String getStar(Date birthday) throws Exception {
		
		// 创建日历对象
		Calendar c = Calendar.getInstance();

		// 获取出生月日
		c.setTime(birthday);
		int birthMonth = c.get(Calendar.MONTH) + 1;
		int birthDay = c.get(Calendar.DAY_OF_MONTH);
		
		// 计算星座
		String star = "";
        if (birthMonth == 1 && birthDay >= 20 || birthMonth == 2 && birthDay <= 18) {  
         star = "水瓶座";  
        }  
        if (birthMonth == 2 && birthDay >= 19 || birthMonth == 3 && birthDay <= 20) {  
         star = "双鱼座";  
        }  
        if (birthMonth == 3 && birthDay >= 21 || birthMonth == 4 && birthDay <= 19) {  
         star = "白羊座";  
        }  
        if (birthMonth == 4 && birthDay >= 20 || birthMonth == 5 && birthDay <= 20) {  
         star = "金牛座";  
        }  
        if (birthMonth == 5 && birthDay >= 21 || birthMonth == 6 && birthDay <= 21) {  
         star = "双子座";  
        }  
        if (birthMonth == 6 && birthDay >= 22 || birthMonth == 7 && birthDay <= 22) {  
         star = "巨蟹座";  
        }  
        if (birthMonth == 7 && birthDay >= 23 || birthMonth == 8 && birthDay <= 22) {  
         star = "狮子座";  
        }  
        if (birthMonth == 8 && birthDay >= 23 || birthMonth == 9 && birthDay <= 22) {  
         star = "处女座";  
        }  
        if (birthMonth == 9 && birthDay >= 23 || birthMonth == 10 && birthDay <= 22) {  
         star = "天秤座";  
        }  
        if (birthMonth == 10 && birthDay >= 23 || birthMonth == 11 && birthDay <= 21) {  
         star = "天蝎座";  
        }  
        if (birthMonth == 11 && birthDay >= 22 || birthMonth == 12 && birthDay <= 21) {  
         star = "射手座";  
        }  
        if (birthMonth == 12 && birthDay >= 22 || birthMonth == 1 && birthDay <= 19) {  
         star = "摩羯座";  
        }  
        
        return star;  
	}
	
}
