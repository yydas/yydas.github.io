---
layout: ../../layouts/post.astro
title: 工作文档
description: 会议纪要的内容.
dateFormatted: 2023-05-23
---

# 05-14
#### 会员体系
- 体系框架
	- 成长值
	- 等级分层
	- 退档机
- 权益体系
	- 物质权益
	- 精神权益

# 05-09
- 讲解绿地泉商城

# 04-29
- 商城先做
- 积分兑换立减金实现才能上线
- 自有商城供应商体系（用户、会员、积分、订单）活动、广告
- 运营（商城、文旅、本地生活、活动、广告）

# 04-26
测试报告需要截图、时间、地点、内容、分布、类型，有效期盖章
备份：热备、冷备 备份安全性 高可用、备份策略 根据等保满足要求
详设概设：功能要匹配上，非功能项要满足合同
测试方案要先出，用例执行了要截图

# 04-20
线上自营商城：
支付：支付、营销费
出项：裂变营销渠道费、供应链结算

周边商城
支付：支付金额、平台营销费、商家营销费
出项：渠道费、平台费、商家实收

# 04-16
#### 过程交付文档
- 文档修改用修订模式
- 功能清单和详细设计描述一致 ，功能清单偏差需要有对应功能（对应来源：来源于标书）
- 需求描述、用户场景、具体的数据要求
- 测试用例、测试缺陷bug记录
- 数据来源项：无的时候该功能无数据来源项
- 版本v1.0.0 第一位是阶段版本 第二位是当前阶段变更版本 第三位是内部审核未过审的版本
商家中心：
分润管理
对账

# 04-15
##### 关键词
- TOD：地铁站为中心一公里的商圈
- 商家：商家入驻、线网商户
- 会员：C端用户 、员工：工作人员
- 业态：在线电商、线下团购、外卖、商超（pos机）、家政服务、物业服务
- 商城、团购生活、票务、
- 一个商家有多个门店
- 商家统一门户->门店
- 单一个人、私域会员人在多商家对应系统一个人、人和商家业态关系
- C端用户：访客（未注册手机号）、会员（注册手机号）、地铁内部员工（手机号、工号、白名单）
- 会员中心：通平台统一对外输出、成长用户；对外支付
- 积分（代币）、成长值、权益
- 优惠券关联商品
- 账户：会员多账户（现金账户、积分账户、）员工（卡账户（现金账户、福利账户））
- 商家可以属于所有商圈（-1 为自营）或者单独端口
- 商家管理：商家业态管理、商家审批管理、分润管理、对账
- 在线商城 b2c 一个商家多供应链
- 
- 入驻场地和入驻场所是什么
- 商家选址下单
- 商家结算规则
- 入驻费用管理模块：
	- 入驻费与合约费
	- 解约和中止合约
	- 商家应收款

# 04-09
- ~~多商户下单~~
- 部分退款
- 单商家多商户对于tod的问题
- 团购是单产品下单还是多人成团下单
- 快递闪送只是即时闪送还是快递+闪送
- 商家的佣金是针对谁的，怎么计算

# 04-07
## 轨道生活服务平台
地铁营销运营、线下活动（积分、优惠券）乘车使用

#### 业务中台
##### 基础数据
###### 员工数据
###### 组织数据
###### 数据权限
###### 会员数据（包含b2c、b2b2c）
会员信息、权益、钱包（充值、积分等）、账号（多账号对应一个会员）、画像（大数据）、标签（大数据）
###### TOD数据
地铁圆心一公里、tod信息录入、用于业务中台tod隔离
######  业态数据
业态名称、中台的业态隔离、小程序展示、商家关联、tod业态关联
###### 隔离数据
TOD、业态、商家
###### 日志数据
业务、操作、埋点、异常、开发
###### 消息数据
对应消息中心
###### 渠道数据
###### 支付数据
支付宝、微信支付
###### 订单数据
###### 积分数据
###### 优惠券
###### 营销
##### 功能模块
###### 系统管理
###### 统一门户
###### 员工中心
###### 会员中心
###### 支付中心
微信立减-平台先向银行购入
###### 订单中心
###### 营销中心
###### 商家中心（前期调研）
线网商户、
###### 日志中心
###### 消息中心
###### 评论中心
##### 数据中台
###### 数据基座
###### 数据接入
###### 数据清洗
###### 主题库
用户、商户、订单
###### 专题库
活动、精准推送
###### 报表
###### 标签
#### 子系统后台
###### 自有商场
###### 线上信息流广告
广告管理、广告投放、用户定向投放、接口提供
###### TOD 系统集成
统一登录、门户、营销活动、统计分析
###### 平台入驻
###### 线网商户
###### 家政服务
###### 快递闪送
###### 商圈消费笔记
#### 商家端
##### 主体小程序（带核销）
##### 频道
#### 用户端
##### 频道
#### 节点
4-26、7-26、12-26
#### 计划
周五-数据中台原型设计；17号全版本设计
