package com.beio.base.action;

import org.apache.log4j.Logger;

/**
 * 错误控制器
 * @author zhs
 * @date 2017-03-29
 * @version 1.0.0
 */
public class ErrorAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = Logger.getLogger(ErrorAction.class);
	
	private Exception exception;
	
	public void exception() {
		exception.printStackTrace();
		logger.error("Global catch exception:", exception);
		try {
			print("The server has a error, Please try again later!");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public Exception getException() {
		return exception;
	}

	public void setException(Exception exception) {
		this.exception = exception;
	}
	
}
