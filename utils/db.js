const mysql = require("mysql");
console.log(mysql);
// 创建数据池
const pool = mysql.createPool({
  host: "43.142.45.192", // 数据库地址
  user: "monitor", // 数据库用户
  password: "zYnjSdeEnYsGmswM", // 数据库密码
  database: "monitor", // 选中数据库
});

// params 进行添加或修改的数据
function poolFn(connecQuery, sql, params) {
  // getConnection 创建连接池
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("建立连接池失败");
        throw err;
      }
      connecQuery(connection, sql, params).then((data) => {
        connection.release(); // 到这步说明已经完成操作，释放连接
        resolve(data);
      });
    });
    // console.log(pool._allConnections.length) // 连接池里的连接数
  });
}
/*
* connection 连接句柄
* sql 查询语句

* */

// 基于promise方法实现

// 查询数据
function select(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      // console.log(data)
      if (err) {
        reject(err);
        throw err;
      }
      resolve({
        msg:"查询成功",
        code:0,
        data
    });
    });
  });
}

// 添加数据
function add(connection, sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, result) => {
      if (err) {
        resolve({
          msg: "添加失败",
          code:1,
        });
        throw err;
      }
      resolve({
        msg: "添加成功",
        code:0,
      });
    });
  });
}

// 将方法封装统一导出

function queryFn(connecQuery, sql, params) {
  return new Promise((resolve) => {
    poolFn(connecQuery, sql, params).then((data) => {
      console.log(data);
      resolve(data);
    });
  });
}

module.exports = {
  selectData(sql, params) {
    return queryFn(select, sql, params);
  },
  addData(sql, params) {
    return queryFn(add, sql, params);
  },
};
