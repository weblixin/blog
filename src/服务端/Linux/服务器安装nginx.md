### 服务器安装 nginx

#### 1、安装 `pcre` 和 `openssl` 依赖

```text
yum -y install pcre* yum -y install openssl*
```

#### 2、下载 `nginx` 压缩包

```text
wget http://nginx.org/download/nginx-1.16.1.tar.gz
```

#### 3、解压 `nginx` 压缩包

```text
tar -zcvf nginx-1.16.1.tar.gz
```

#### 4、进入 `nginx-1.16.1` 文件夹，执行配置文件，编译，安装依赖

```
cd nginx-1.16.1
./configure
make -j4
make install
```

#### 5、进行软连接

```
ln -s /usr/local/nginx  nginx-1.16.1
```

#### 6、进入 nginx/conf 文件夹下检查 nginx.conf 是否正确

```
cd /usr/local/nginx/conf
nginx -t
```

#### 7、如果出现 successfully，启动 nginx

```
nginx
```

#### 8、如果提示命令无效，修改环境变量

```
vim /etc/profile
```

#### 9、在文件底部添加

```
PATH=$PATH:/usr/local/nginx/sbin
export PATH
```

#### 10、保存修改文件，并重新编译该文件

```
source /etc/profile
```

#### 11、启动 nginx

```
nginx
```
