---
title: git命令
---

### 1、初始化/新建代码库

```
// 在当前目录新建一个Git代码库

$ git init

// 新建一个目录，将其初始化为Git代码库

$ git init [project_name]
```

### 2、配置 git

-   配置用户名、邮箱

==`--global` 仅需在配置全局环境时添加==

```
// 用户名

$ git cofig --global user.name [your_github_name]

// 邮箱

$ git config --global user.email [your_github_email]
```

-   查询配置

```
$ git config --list
```

-   配置保存用户名密码，无需二次输入

```
$ git config credential.helper store
```

### 3、克隆项目

```
$ git clone [https://github.com/your_project_path]
```

### 4、提交文件到暂存区

```
// 提交某个文件或某些文件

$ git add [your_file_path_1] [your_file_path_2] [...]
```

or

```
// 提交当前目录下所有文件

$ git add .

$ git add *
```

or

```
// 提交某个目录下所有文件

$ git add [your_folder_path]/.

$ git add [your_folder_path]/*
```

### 5、提交暂存区文件到仓库区

```
// 提交某个文件或某些文件

$ git commit [file1] [file2] -m [message]

// 提交当前暂存区中的所有文件到仓库区

$ git commit -m [message]
```

### 6、将仓库的文件推送到远程

```
// 推送当前分支到对应的远程分支

$ git push

// 推送本地分支到某个仓库的某个远程分支

$ git push [remote_name] [local_branch_name]:[remote_branch_name]

// 推送本地分支到某个仓库的某个远程分支(本地分支和远程分支名称相同)

$ git push [remote_name] [branch_name]
```

### 7、拉取/同步远程代码

```
// 拉取当前本地分支对应的远程分支到本地

$ git pull

// 拉取某个仓库的某个远程分支到本地分支

$ git pull [remote_name] [local_branch_name]:[remote_branch_name]

// 拉取某个仓库的某个远程分支到本地分支(本地分支和远程分支名称相同)

$ git pull [remote_name] [branch_name]

// 下载远程仓库所有改动

$ git fetch [remote_name]
```

### 8、分支

```
// 查看本地分支

$ git branch

// 查看远程分支

$ git branch -r

// 查询所有分支

$ git branch -a

// 新建本地分支

$ git checkout -b [branch_name]

// 切换分支

$ git checkout [branch_name]

// 删除本地分支

$ git branch -d [branch_name]

// 合并本地分支到当前分支

$ git merge [branch_name]

// 新建远程分支

$ git push [remote_name] [local_branch]:[remote_branch]

// 删除远程分支

$ git push [remote_name] -d [remote_branch]

// 为当前分支设置远程仓库

$ git branch --set-upstream [local_branch] [remote_branch]

// 查询所有分支对应的远程仓库

$  git branch -vv

```

### 9、查看信息

```
// 查询本地分支的文件状态

$ git status

// 查询当前分支的历史版本

$ git log

// 查询当前分支最近几次的提交日志

$ git reflog

// 展示代码差异

$ git diff

// 查询所有远程仓库

$ git remote -v
```

### 10、撤销

```
// 重置当前分支的HEAD为指定commit

$ git reset --hard [commit]



// 重置当前分支的HEAD为远程最新提交的代码

$ git fetch && git reset --hard HEAD
```

### _我用过，且常用的就这么多了，以后有新内容再进行补充_
