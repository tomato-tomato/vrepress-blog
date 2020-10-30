---
title: Sequelize
date: 2020-10-29
sidebar: 'auto'
categories:
 - Nodejs
tags:
 - JavaScript
 - Nodejs
 - Sequelize
publish: true
isShowComments: true
---

::: tip 概述
Sequelize 是一个 Node 的 ORM(Object-RelationalMapping)框架<br>
通过 JavaScript 的编写方式来操做数据库
:::

> [文档链接](https://sequelize.org/master/index.html)<br>
> [API Reference](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)



## 连接数据库

```js
const {Sequelize, DataTypes} = require('sequelize'); 
const sequelize = new Sequelize('database', 'username','password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  pool: {max: 5, acquire: 30000, idle: 10000},//连接池 
});
```

## 定义模型

```js
const User = sequelize.define('user', {
    // 定义字段
    firstName: {type: DataTypes.STRING, allowNull: false },
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    
}, {
    //其他模型的选项设置
    timestamps: false //禁止 sequelize 自动添加时间戳
});

```

## 同步数据库

```js
//force 如果为true 则会删除已经存在的同名表格
User.sync({force: true}).then(() => {
    return User.create({
        firstName: 'Tom',
        lastName: 'Luke',
        age: 30
    });
}).then(() => {
    User.findAll().then(user => {
        console.log(user);
    });
});

```

## 动态导入模型

::: warning 
下列代码中 `const model = sequelize.import(path.join(__dirname, file));` 会导致错误 `sequelize.import is not a function`, 这是因为sequelize 的版本问题导致的，只有在低于 `6.0.0` 的版本中，才不会出现问题<br>
具体请查看 [sequelize.import is not a function](https://stackoverflow.com/questions/62917111/sequelize-import-is-not-a-function)
:::

```js
//index.js
//读取当前目录中所有文件
const db = {Sequelize, sequelize};
const fs = require('fs');
const path = require('path');
// 读取当前目录中所有文件
fs.readdirSync(__dirname)
    .filter(file => (file !== 'index.js' && file !== 'db.js'))
    .forEach(file => {
        // 从文件中导入模型
        // const model = sequelize.import(path.join(__dirname, file));
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

module.exports = db;

//Customer.js
module.exports = (sequelize, DateTypes) => {
    const Customer = sequelize.define('Customer', {
        name: DataTypes.STRING(50),
        age: DataTypes.INTEGER,
        time: DataTypes.DATE,
        count: DataTypes.INTEGER
    },{
        //其他设置
        timestamps: false,
        tableName: 'customer_guests'
    });
    Customer.sync();

    return Customer;
    
}
```