---
title: 何如部署一个项目，并访问
---

### 何如部署一个 express 项目，并通过域名或公网 IP 访问

#### 1、clone 一个 express 项目，进入项目并安装依赖

```
git clone https://github.com/weblixin/learn_serve.git
cd learn_serve
npm i
```

#### 2、在服务器后台配置安全组，加入需要的端口号

| key      | value     |
| :------- | :-------- |
| 规则方向 | 入方向    |
| 端口范围 | 3000/3000 |
| 授权对象 | 0.0.0.0/0 |

#### 3、使用 pm2 启动项目

```
pm2 start bin/www -n learn
```

这样就能使用公网 IP 访问了

#### 4、解析域名

| key      | value   |
| :------- | :------ |
| 主机记录 | www     |
| 记录值   | 公网 IP |

访问配置好的域名就可以访问啦，这里配置的是 www 的
