package com.beio.base.action;

import java.io.IOException;

import com.beio.base.util.Constant;
import com.beio.base.util.VerifyUtil;

/**
 * 图片控制器
 * @author zhs
 * @date 2017-04-03
 * @version 1.0.0
 */
public class ImageAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 生成验证码
	 * @return
	 * @throws Exception 
	 * @throws IOException 
	 */
	public void verifyCode() throws Exception{
		String verifyCode = VerifyUtil.generateVerifyCode(4);
		getSession().setAttribute(Constant.SESSIONVERIFYCODE, verifyCode.toUpperCase());
		VerifyUtil.outputImage(100, 40, getImageOutputStream(), verifyCode);
	}
	
}
