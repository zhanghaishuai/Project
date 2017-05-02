package com.beio.base.service.impl;

import java.util.Calendar;
import java.util.Map;
import java.util.TreeMap;

import com.beio.base.entity.SysAddr;
import com.beio.base.entity.SysPay;
import com.beio.base.service.SysService;
import com.beio.base.util.ComUtil;
import com.beio.base.util.ConfigUtil;
import com.beio.base.util.Constant;
import com.beio.base.util.DateUtil;
import com.beio.base.vo.Member;
import com.beio.base.vo.Root;

/**
 * 商品业务逻辑实现
 * @author zhs
 * @date 2017-04-09
 * @version 1.0.0
 */
public class SysServiceImpl extends BaseIbatisServiceImpl implements SysService {

	@Override
	public int editAddr(SysAddr sysAddr) throws Exception {
		// TODO Auto-generated method stub
		if (ComUtil.isNotEmpty(sysAddr.getId())) {
			// 重置地址
			update("sys.resetAddr", sysAddr);
			// 编辑地址
			return update("sys.editAddr", sysAddr);
		}
		// 地址上限
		if((int)selectOne("sys.queryTotalAddr", sysAddr) >= Constant.MAXTOTALADDR){
			return -1;
		}
		// 重置地址
		update("sys.resetAddr", sysAddr);
		// 新增地址
		int result = insert("sys.addAddr", sysAddr);
		sysAddr.setId(String.valueOf(selectOne("sys.queryid")));
		return result;
	}

	@Override
	public int defaultAddr(SysAddr sysAddr) throws Exception {
		// TODO Auto-generated method stub
		// 重置地址
		update("sys.resetAddr", sysAddr);
		// 编辑地址
		return update("sys.defaultAddr", sysAddr);
	}

	@Override
	public int orderquery(SysPay pay) throws Exception {
		// TODO Auto-generated method stub
		update("sys.orderquery", pay);
		update("sys.", pay);
		return 0;
	}

	@Override
	public Root mrfeeInvite(Member mr) throws Exception {
		// TODO Auto-generated method stub
		// 内邀码不可用
		if (update("sys.useInvite", mr) < 1) {
			return new Root("151");
		}
		// 首次开通会员
		if ("0".equals(mr.getMember().getLevel())) {
			mr.setTurnonTime(DateUtil.formatDate(DateUtil.getTime(),
					DateUtil.PATTERNLINETIMEWITHMS));
			mr.setExpireTime(DateUtil.formatDate(
					DateUtil.addDate(DateUtil.getTime(), Calendar.YEAR, 1),
					DateUtil.PATTERNLINETIMEWITHMS));
			mr.setMrfeeTurnon(mr.getTurnonTime());
		}else {
			// 会员已过期
			if (mr.getMember().isExpire()) {
				mr.setExpireTime(DateUtil.formatDate(DateUtil.addDate(
						DateUtil.getTime(), Calendar.YEAR, 1),
						DateUtil.PATTERNLINETIMEWITHMS));
				mr.setMrfeeTurnon(DateUtil.formatDate(DateUtil.getTime(),
						DateUtil.PATTERNLINETIMEWITHMS));
			}else {
				mr.setExpireTime(DateUtil.formatDate(DateUtil.addDate(
						DateUtil.parseDate(mr.getMember().getExpireTime(),
								DateUtil.PATTERNLINETIMEWITHMS),
						Calendar.YEAR, 1), DateUtil.PATTERNLINETIMEWITHMS));
				mr.setMrfeeTurnon(mr.getMember().getExpireTime());
			}
		}
		update("sys.turnon", mr);
		insert("sys.mrfeeInvite", mr);
		return new Root(mr, "200");
	}

	@Override
	public Root preMrfee(Member mr) throws Exception {
		// TODO Auto-generated method stub
		// 创建支付对象
		SysPay pay = new SysPay();
		pay.setCategory("1");
		// 保存下单信息
		insert("sys.pay", pay);
		// 获取支付标识
		pay.setId(String.valueOf(selectOne("queryid")));
		mr.setPayID(pay.getId());
		
		// 微信统一下单参数
		Map<String, String> param = new TreeMap<String, String>();
		param.put("appid", ConfigUtil.getProperties("wx.appid"));
		param.put("body", "快客林-会员年费");
		param.put("mch_id", ConfigUtil.getProperties("wx.mch_id"));
		param.put("nonce_str", ComUtil.uuid());
		param.put("notify_url", "http://localhost:8080/beio/pay/notify");
		param.put("out_trade_no", mr.getPayID());
		param.put("total_fee", Constant.MEMBERYEARFEE);
		param.put("trade_type", "NATIVE");
		param.put("sign", ComUtil.signWX(param, ConfigUtil.getProperties("wx.api_key")));
		String sender_str = ComUtil.installXML(param);
		String return_str = ComUtil.httpPost("https://api.mch.weixin.qq.com/pay/unifiedorder", sender_str);
		
		// 解析下单响应参数
		Map<String, String> map = ComUtil.parseXML(return_str);
		
		pay.setTotal_fee(Constant.MEMBERYEARFEE);
		pay.setSender_str(sender_str);
		pay.setReturn_str(return_str);
		pay.setCode_url(map.get("code_url"));
		pay.setPrepay_id(map.get("prepay_id"));
		pay.setReturn_msg(map.get("return_msg"));
		pay.setReturn_code(map.get("return_code"));
		pay.setPre_time(mr.getModifyTime());
		update("sys.unifiedorder", pay);
		insert("sys.preMrfee", mr);
		return new Root(pay, "200");
	}

	@Override
	public Root payMrfee(Member mr, SysPay pay) throws Exception {
		// TODO Auto-generated method stub
		// 微信查询订单参数
		Map<String, String> param = new TreeMap<String, String>();
		param.put("appid", ConfigUtil.getProperties("wx.appid"));
		param.put("mch_id", ConfigUtil.getProperties("wx.mch_id"));
		param.put("out_trade_no", pay.getId());
		param.put("nonce_str", ComUtil.uuid());
		param.put("sign", ComUtil.signWX(param, ConfigUtil.getProperties("wx.api_key")));
		String sender_str = ComUtil.installXML(param);
		String return_str = ComUtil.httpPost("https://api.mch.weixin.qq.com/pay/orderquery", sender_str);
		// 解析下单响应参数
		Map<String, String> map = ComUtil.parseXML(return_str);
		// 判断支付结果
		if ("SUCCESS".equals(map.get("return_code"))) {
			if ("SUCCESS".equals(map.get("result_code"))) {
				// 支付成功
				if ("SUCCESS".equals(map.get("trade_state")) || "REFUND".equals(map.get("trade_state"))
						|| "CLOSED".equals(map.get("trade_state")) || "REVOKED".equals(map.get("trade_state"))
						|| "PAYERROR".equals(map.get("trade_state"))) {
					if ("SUCCESS".equals(map.get("trade_state"))) {
						pay.setStatus("1");
						// 首次开通会员
						if ("0".equals(mr.getMember().getLevel())) {
							mr.setTurnonTime(DateUtil.formatDate(DateUtil.getTime(),
									DateUtil.PATTERNLINETIMEWITHMS));
							mr.setExpireTime(DateUtil.formatDate(
									DateUtil.addDate(DateUtil.getTime(), Calendar.YEAR, 1),
									DateUtil.PATTERNLINETIMEWITHMS));
							mr.setMrfeeTurnon(mr.getTurnonTime());
						}else {
							// 会员已过期
							if (mr.getMember().isExpire()) {
								mr.setExpireTime(DateUtil.formatDate(DateUtil.addDate(
										DateUtil.getTime(), Calendar.YEAR, 1),
										DateUtil.PATTERNLINETIMEWITHMS));
								mr.setMrfeeTurnon(DateUtil.formatDate(DateUtil.getTime(),
										DateUtil.PATTERNLINETIMEWITHMS));
							}else {
								mr.setExpireTime(DateUtil.formatDate(DateUtil.addDate(
										DateUtil.parseDate(mr.getMember().getExpireTime(),
												DateUtil.PATTERNLINETIMEWITHMS),
										Calendar.YEAR, 1), DateUtil.PATTERNLINETIMEWITHMS));
								mr.setMrfeeTurnon(mr.getMember().getExpireTime());
							}
						}
						mr.setPayID(pay.getId());
						update("sys.turnon", mr);
						update("sys.payMrfee", mr);
					}else {
						pay.setStatus("2");
					}
					pay.setPay_str(return_str);
					pay.setTrade_state(map.get("trade_state"));
					// 更新支付状态
					update("sys.orderquery", pay);
				}
			}
		}
		mr.setTrade_state(map.get("trade_state"));
		return new Root(mr, "200");
	}

}
