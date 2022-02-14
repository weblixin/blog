## 服务器安装 `pm2` `git`

### `pm2`

```javascript
npm i pm2 -g
pm2 list  // 检验是否安装成功
```

### `git`

```javascript
yum install git
git --version // 检验git是否安装成功
```

### `pm2` 常用命令

```javascript
pm2 list            /   pm2 ls           查看所有进程
pm2 show <id>       /   pm2 info <id>    查看特定进程

pm2 start bin/www                        启动项目
pm2 start bin/www -n <my_name>
pm2 start bin/www --name <my_name>       启动项目并命名为my_name
pm2 start bin/www - i 0
pm2 start bin/www - i max                启动项目并根据CPU核数启动进程个数
pm2 start bin/www - i <num>              启动项目并启动num个进程
pm2 start bin/www --watch                启动项目并实时监控,文件修改时自动reload

pm2 reload all                           重载所有项目
pm2 reload <name>   /   pm2 reload <id>  重载名称是name/id的项目

pm2 restart all                          重启所有项目
pm2 restart <name>  /   pm2 restart <id> 重启名称是name/id的项目

pm2 stop all                             停止所有项目
pm2 stop <name>     /   pm2 stop <id>    停止名称是name/id的项目

pm2 delete all                           删除所有项目
pm2 delete <name>   /   pm2 delete <id>  删除名称是name/id的项目

pm2 logs <name>                          打印名称是name/id的项目的日志
```
