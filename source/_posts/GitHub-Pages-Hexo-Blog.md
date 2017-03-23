---
title: 使用GitHub Pages和Hexo搭建个人博客
date: 2017-03-22 13:48:17
tags: [Git,GitHub,Hexo]
categories: 搭建博客
---
# 前言
这是一篇使用GitHub Pages和Hexo来搭建免费独立博客的总结。

本文内容全部来自于网上的教程，欢迎各位交流指正。特别感谢[CrazyMilk](http://crazymilk.github.io/2015/12/28/GitHub-Pages-Hexo搭建博客)的博文。

可供参考的文档:

> * [Git](https://git-scm.com/book/zh/v2)
> * [GitHub](https://github.com/)
> * [GitHub Pages](https://pages.github.com/)
> * [Hexo](https://hexo.io/zh-cn/)
> * [Markdown](http://www.appinn.com/markdown/)

# 必要配置

## 创建GitHub Pages仓库
---
在自己的GitHub帐号下创建一个新的仓库，命名为username.github.io(username为GitHub的用户名)
##  Git
---
###  安装Git
---
在Windows下有两种方式:
1. 安装Git
2. 安装GitHub

###  配置Git
---
设置用户名和邮件地址，Git每次提交都会使用到它们。
``` bash
$ git config --global user.name "username"
$ git config --global user.email "username@example.com"
```
对于user.email，因为在GitHub的commits信息上是可见的，所以如果你不想让人知道你的email，可以Keeping your email address private:
1. 在GitHub右上方点击你的头像，选择Settings
2. 在z左边的Personal settings侧边栏选择Emails
3. 在Keep my email address private前打勾

##  让Git与GitHub建立联系
---
###  检查电脑上是否存在SSH keys
---
``` bash
$ ls -al ~/.ssh
# Lists the files in your .ssh directory, if they exist
```
如果存在*.pub和与之同名的无后缀文件，证明已存在SSH keys

### 如果没有SSH key，则生成新的SSH key
---
``` bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# Creates a new ssh key, using the provided email as a label
```
之后一路回车即可。

### 向ssh-agent添加key
---
首先确保ssh-agent可运行:
``` bash
# start the ssh-agent in the background
$ ssh-agent -s
```
然后添加SSH key:
``` bash
$ ssh-add ~/.ssh/id_rsa
```
成功时返回：
``` bash
Identity added: /c/Users/you/.ssh/id_rsa (/c/Users/you/.ssh/id_rsa)
```
添加失败时：
``` bash
Could not open a connection to your authentication agent.
```
尝试以下命令：
``` bash
$ eval 'ssh-agent -s'
```
再使用ssh-add，如果还不行，需要ssh-agent启动bash:
``` bash
$ ssh-agent bash --login -i
```
再执行ssh-add。

###  在GitHub添加SSH key
---
首先，拷贝公钥：
``` bash
$ clip < ~/.ssh/id_rsa.pub
# Copies the contents of the id_rsa.pub file to your cllipboard
```
然后，在GitHub中Setting->Personal settings->SSH and GPG keys下选择New SSH key。
粘贴进Key文本框中，起一个title，Add SSH key。
测试链接：
``` bash
$ ssh -T git@github.com
# Attempts to ssh to GitHub
```
如果看到：
``` bash
The authenticity of host 'github.com (192.30.253.112)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)? 
```
键入yes，之后将会看到如下信息：
``` bash
Hi username! You've successfully authenticated, but GitHub does not
provide shell access.
```

##  Hexo
---
###  安装Hexo
---
安装Hexo之前需要安装下列应用程序：
* [Node.js](http://nodejs.org/)
* [Git](http://git-scm.com/)
然后使用npm 即可完成Hexo 的安装。
``` bash
$ npm install -g hexo-cli
```
###  使用Hexo建站
---
安装完成后，新建一个文件夹(如D:\Blog)，右键 Blog 选择Git bash here，输入：
``` bash
$ hexo init
```
该命令会在目标文件夹内建立网站所需要的所有文件。接下来安装依赖包：
``` bash
$ npm install
```
这样，我们就已经搭建起本地的Hexo博客了。可以先执行以下命令（对应文件夹下），然后在浏览器中输入localhost:4000查看。
``` bash
$ hexo generate
$ hexo server
```
debug命令可以在本地实时修改查看。
``` bash
$ hexo s --debug
```


###  发布到GitHub Pages
---
继续使用上面的文件夹D:\Blog，然后编辑该文件夹下的_config.yml。
默认生成的_config.yml:
``` bash
# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type:
```
修改后的_config.yml:
``` bash
deploy:
  type: git
  repository: 对应仓库的地址（可以在GitHub对应的仓库中复制）
  branch: 分支（User Pages为master，Project Pages为gh-pages）
```

为了能够使Hexo部署到GitHub上，还需安装一个插件：
``` bash
$ npm install hexo-deployer-git --save
```
之后，执行以下指令即可完成部署：
``` bash
$ hexo generate
$ hexo deploy
```
部署后访问username.github.io即可进行浏览。

### 使用主题
---
以上使用的是默认主题landscape，可以使用git clone将别人的主题拷贝到D:\Blog\themes下，然后将_config.yml中的theme：landscape改为下载的主题文件夹名称。
例如使用Next主题hexo-theme-next-5.1.0，配置为：
``` yml
#主题配置
## Themes: https://hexo.io/themes/
#theme: false #禁用主题
#theme: landscape
theme: hexo-theme-next-5.1.0
```
详细的定制过程可以参考syd192的博文。
> [Hexo的Next主题配置](http://www.cnblogs.com/syd192/p/6074323.html)

# 优化部署与管理
---
##  概述
---
Hexo部署到GitHub上的文件，是.md(你的博文)在转化之后生成的.html。
想要在不同的电脑上书写博客，就需要将整个文件夹push到Github上。
master分支已经用来发布网站了，还需要一个分支hexo存放Hexo网站的文件。
---
## 我的博客搭建流程
---
1. 创建GitHub仓库:dinglq1989.github.io
2. 在GitHub上创建两个分支: master 与 hexo并设置 hexo 为默认分支
3. 拷贝仓库：
``` bash
$ git clone https://github.com/dinglq1989/dinglq1989.github.io.git
```
4. 在本地dinglq1989.github.io文件夹下通过Git bash依次执行：
``` bash
$ npm install hexo
$ hexo init
$ npm install
# 下面是部署，首页，归档，分类，标签的插件
$ npm install hexo-deployer-git 
$ npm install hexo-generator-index --save
$ npm install hexo-generator-archive --save
$ npm install hexo-generator-category --save
$ npm install hexo-generator-tag --save
```
5. 修改_config.yml中的deploy参数，分支应为master:
``` yml
deploy:
  type: git
  repository: https://github.com/dinglq1989/dinglq1989.github.io.git
  branch: master
```
6. 本地Git链接到GitHub
``` bash
#初始化本地Git
$ git init
#创建本地Git分支hexo并转到hexo分支
$ git checkout -b hexo
#添加远程分支origin
$ git add remote origin https://github.com/dinglq1989/dinglq1989.github.io.git
#提交本地hexo分支作为远程的hexo分支，左为本地分支
$ git push origin hexo:hexo
# 
$ git pull --rebase origin hexo
```
7. 依次执行以下指令提交网站相关文件：
``` bash
$ git add .
$ git commit -m "..."
$ git push origin hexo
```
8. 生成网站并部署到GitHub:
``` bash
$ hexo generate -d
```

##  我的博客管理流程
---
###  日常修改
---
1. 提交网站相关文件：
``` bash
$ git add .
$ git commit -m "..."
$ git push origin hexo
```
2. 生成网站并部署到GitHub:
``` bash
$ hexo generate -d
```
###  重新配置书写环境
---
1. 拷贝仓库：
``` bash
$ git clone https://github.com/dinglq1989/dinglq1989.github.io.git
```
2. 在本地dinglq1989.github.io文件夹下：
``` bash
#此时当前分支应显示为hexo
$ npm install hexo
$ npm install
$ npm install hexo-deployer-git 
$ npm install hexo-generator-index --save
$ npm install hexo-generator-archive --save
$ npm install hexo-generator-category --save
$ npm install hexo-generator-tag --save
```
