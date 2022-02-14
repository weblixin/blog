### 服务器 mysql 安装

#### 1、下载安装包， 并解压 `/usr/local/src`

```
wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz
tar -zxvf mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz
```

#### 2、将解压后的文件夹移动到 `/usr/local/mysql-5.7.26`

```
mv mysql-5.7.26-linux-glibc2.12-x86_64 /usr/local
cd ../
mv mysql-5.7.26-linux-glibc2.12-x86_64 mysql-5.7.26
```

#### 3、创建组和用户

```
groupadd mysql
useradd -r -g mysql mysql
```

#### 4、创建 mysql 数据目录

```
cd /
mkdir -p data
cd data/
mkdir -p mysql
```

#### 5、赋予权限

```
chown mysql:mysql -R /data/mysql
```

#### 6、配置参数

```
vim /etc/my.cnf
```

```
[mysqld]
bind-address=0.0.0.0
port=3306
user=mysql
basedir=/usr/local/mysql-5.7.26
datadir=/data/mysql
socket=/tmp/mysql.sock
log-error=/data/mysql/mysql.err
pid-file=/data/mysql/mysql.pid
#character config
character_set_server=utf8mb4
symbolic-links=0
```

#### 7、初始化 mysql

```
cd /usr/local/mysql-5.7.26/bin/
 ./mysqld --defaults-file=/etc/my.cnf --basedir=/usr/local/mysql-5.7.26/ --datadir=/data/mysql/ --user=mysql --initialize
```

#### 8、添加权限，开启自启

```
cp ./support-files/mysql.server /etc/init.d/mysqld
chown 777 /etc/my.cnf
chmod +x /etc/init.d/mysqld
```

#### 9、查看初始密码并复制

```
vim /data/mysql/mysql.err
```

`root@localhost:`后边的就是密码

#### 10、启动 mysql，并修改密码

```
service mysqld start
cd /usr/local/mysql-5.7.26/bin
./mysql -u root -p
```

回车，输入密码

```
mysql> set password=password('admin');
```

#### 11、退出，停止 mysql 服务

```
mysql > quit
service mysqld stop
```
