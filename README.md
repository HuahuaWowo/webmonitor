# 前端监控项目后端

## 加载依赖 
 * npm install

## 启动项目 
 * npm run start(更改需重启)
 * npm run dev(nodemon插件 更改内容自动重启服务)

### 我用的koa2的脚手架搭的根地址就是bin目录下的www，然后功能引入在app.js 

### 已经允许跨域了，随便访问

### 需要编写的内容及方法
参考routes文件下的staticError.js和monitor.js,

需要自己编写sql语句，不会的可以问我，找到自己负责的内容，

如果是请求数据就用get方法,ctx.request.query可以获得url的参数，解构取值，

具体还是看文件注释吧,写完routes里的文件后需要在根目录下的app.js导入中间件，

在10行导入依赖，在42行以后照着写（导入中间件）就行

### selectData是查询函数，addData是插入函数，没有本质区别就是返回值不一样，因为每个请求的内容不太一样，所以不太好封装（主要是我不会）

### 我也是边看边写的，有什么优化或者建议都可以说
