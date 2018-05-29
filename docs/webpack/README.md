# 前言

截止4.27晚，GitHub[webpack教程](https://github.com/dingjiamughal/webpack3.0-note) star数已破50，于是决定以文档的形式进行开源展示。
<a href="https://github.com/dingjiamughal/webpack3.0-note">
  <img src="https://img.shields.io/github/stars/dingjiamughal/webpack3.0-note.svg?style=social&label=Star">
</a>
::: tip 预备知识：
- 简单的es6和nodejs基础
- 了解npm script工作流
:::

## 章节结构
不同于webpack官网介绍配置项的风格，此文档重在完成业务开发，从功能的角度进行编写 <br>
目前分为12章节：<br>
::: tip 第一部分：基础配置
* 第一章 babel的配置 介绍工程构建入口文件以及`.js`后缀文件的处理，eslint的配置
* 第二章 处理css 介绍css处理器，less/sass/stylus预处理编译loader的配置，postcss加前缀以及Tree shaking
* 第三章 提取公共代码 介绍分离业务代码、公共代码、第三方依赖
* 第四章 打包图片 介绍打包css中的图片以及字体文件
* 第五章 打包HTML 介绍`html-webpack-plugin`用法，html中图片打包
:::

::: tip 第二部分：搭建开发环境
* 第六章 搭建本地开发环境 介绍dev-server的N种mode，和最优的解决方案
* 第七章 开发环境和生产环境 介绍环境变量和区分打包的情况
* 第八章 用middleware搭建开发环境 高版本已被弃用，待编写...
:::

<demo-1 title="以下部分未完成"></demo-1>

::: tip 第三部分 构建性能
* 第九章 打包结果分析
* 第十章 优化打包速度
* 第十一章 多页应用 介绍`html-webpack-plugin`[这章看demo](https://github.com/dingjiamughal/webpack3.0-note/tree/master/muti-page-demo)
:::

::: tip 第四部分 mvvm框架
第十二章 webpack&&vue(mvvm) 介绍mvvm*-loader，demo新增`san-loader`以及san的简单用法
:::

## 为什么选择Vuepress
我是16年初接触的vue，当时的vue已是全面升级至vue2.x版本，官网推荐此版本是通过前端构建来进行vue项目的开发，接着就是接触了vue全家桶，算下来有一年多的时间。因此在4月中旬尤大发布了`vue`编写的轮子，决定做第一批的使用者。
