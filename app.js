const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const cors = require("koa2-cors");
const bodyparser = require("koa-bodyparser");
const log4j = require("./logger/index.js");
const root = require("./routes/root");
const staticError = require("./routes/staticError");
const monitor = require("./routes/monitor");

// error handler
onerror(app);

// 中间件
//相当于原生nodejs里处理传入数据（chunk）
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
//自动将数据转成json
app.use(json());
//静态文件服务，public下的文件可以直接访问,webpack打包应该是放在这里
app.use(require("koa-static")(__dirname + "/public"));
//服务端模板引擎，用不到
app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);
//写入日志
app.use(async (ctx, next) => {
  if (ctx.method === "GET") log4j.info(`${ctx.method}|${ctx.url}`);
  else
    log4j.info(`${ctx.method}|${ctx.url}|${JSON.stringify(ctx.request.body)}`);
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// // 打印日志 logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

//允许跨域
app.use(cors());
// routes
app.use(root.routes(), root.allowedMethods());
app.use(staticError.routes(), staticError.allowedMethods());
app.use(monitor.routes(), monitor.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
