package com.beio.base.util;

import com.aliyun.mns.client.CloudAccount;
import com.aliyun.mns.client.CloudTopic;
import com.aliyun.mns.client.MNSClient;
import com.aliyun.mns.common.ServiceException;
import com.aliyun.mns.model.BatchSmsAttributes;
import com.aliyun.mns.model.MessageAttributes;
import com.aliyun.mns.model.RawTopicMessage;
import com.beio.base.entity.SysSmsLog;

public class SmsUtil {

	/**
	 * 发送验证码（待实现）
	 * @param len
	 * @return
	 * @throws Exception 
	 */
	public static SysSmsLog sendSms(String mobile, String message) throws Exception {
		
		/**
		 * 短信日志
		 */
		SysSmsLog ssl = new SysSmsLog();
		ssl.setMobile(mobile);
		ssl.setMessage(message);
		/**
		 * Step 1. 获取主题引用
		 */
		CloudAccount account = new CloudAccount(
				ConfigUtil.getProperties("alisms.AccessKeyID"),
				ConfigUtil.getProperties("alisms.AccessKeySecret"),
				ConfigUtil.getProperties("alisms.Endpoint"));
		MNSClient client = account.getMNSClient();
		CloudTopic topic = client.getTopicRef(ConfigUtil.getProperties("alisms.TopicRef"));
		/**
		 * Step 2. 设置SMS消息体（必须）
		 * 
		 * 注：目前暂时不支持消息内容为空，需要指定消息内容，不为空即可。
		 */
		RawTopicMessage msg = new RawTopicMessage();
		msg.setMessageBody(ConfigUtil.getProperties("alisms.MessageBody"));
		/**
		 * Step 3. 生成SMS消息属性
		 */
		MessageAttributes messageAttributes = new MessageAttributes();
		BatchSmsAttributes batchSmsAttributes = new BatchSmsAttributes();
		// 3.1 设置发送短信的签名（SMSSignName）
		batchSmsAttributes.setFreeSignName(ConfigUtil.getProperties("alisms.SignName"));
		// 3.2 设置发送短信使用的模板（SMSTempateCode）
		batchSmsAttributes.setTemplateCode(ConfigUtil.getProperties("alisms.TemplateCode"));
		// 3.3 设置发送短信所使用的模板中参数对应的值（在短信模板中定义的，没有可以不用设置）
		BatchSmsAttributes.SmsReceiverParams smsReceiverParams = new BatchSmsAttributes.SmsReceiverParams();
		smsReceiverParams.setParam("code", message);
		// 3.4 增加接收短信的号码
		batchSmsAttributes.addSmsReceiver(mobile, smsReceiverParams);
		messageAttributes.setBatchSmsAttributes(batchSmsAttributes);
		try {
			/**
			 * Step 4. 发布SMS消息
			 */
			topic.publishMessage(msg, messageAttributes);
			ssl.setStatus("0");
			ssl.setErrCode("");
			ssl.setErrDesc("");
		} catch (ServiceException se) {
			ssl.setStatus("1");
			ssl.setErrCode(se.getErrorCode());
			ssl.setErrDesc(se.getMessage());
			se.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		client.close();
		return ssl;
	}
	
	public static void main(String[] args) throws Exception {
		
		System.out.println(SmsUtil.sendSms("15810585235", "135790"));;
		
	}

}
