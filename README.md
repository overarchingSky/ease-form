# el-form-renderer

[![Build Status](https://travis-ci.com/FEMessage/el-form-renderer.svg?branch=master)](https://travis-ci.com/FEMessage/el-form-renderer)
[![NPM Download](https://img.shields.io/npm/dm/@femessage/el-form-renderer.svg)](https://www.npmjs.com/package/@femessage/el-form-renderer)
[![NPM Version](https://img.shields.io/npm/v/@femessage/el-form-renderer.svg)](https://www.npmjs.com/package/@femessage/el-form-renderer)
[![NPM License](https://img.shields.io/npm/l/@femessage/el-form-renderer.svg)](https://github.com/FEMessage/el-form-renderer/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/el-form-renderer/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

![](https://cdn.nlark.com/yuque/0/2019/png/160590/1563849166655-0c7319bc-37f1-4ddd-94ff-13051bdd6691.png)

[English Documents](./README-en.md)

## Table of Contents <!-- omit in toc -->

- [el-form-renderer](#el-form-renderer)
  - [Introduction](#Introduction)
    - [拓展 form-item](#%E6%8B%93%E5%B1%95-form-item)
    - [拓展 slot](#%E6%8B%93%E5%B1%95-slot)
  - [表单验证](#%E8%A1%A8%E5%8D%95%E9%AA%8C%E8%AF%81)
    - [验证器拓展](#%E9%AA%8C%E8%AF%81%E5%99%A8%E6%8B%93%E5%B1%95)
  - [自动计算](#%E8%87%AA%E5%8A%A8%E8%AE%A1%E7%AE%97)
  - [远程选项](#%E8%BF%9C%E7%A8%8B%E9%80%89%E9%A1%B9)
  - [动态字段](#%E5%8A%A8%E6%80%81%E5%AD%97%E6%AE%B5)
  - [Feature](#Feature)
  - [Links](#Links)
  - [Quick Start](#Quick-Start)
  - [Inspiration](#Inspiration)
  - [License](#License)
  - [Contributors](#Contributors)

## Introduction

我们 [github 有这些组件](https://github.com/FEMessage)，它们并非孤立的，而是有关联的

我们开发的表单相关的组件都可以配合 [@femessage/el-form-renderer](https://github.com/FEMessage/el-form-renderer)（以下简称为 el-form-renderer）使用

可以说 el-form-renderer 是核心，扮演着枢纽的角色

### 拓展 form-item

el-data-table、el-data-tree 等组件内部集成该组件，用于更加灵活的配置内部表单渲染的场景。

以 el-data-table 为例，我们知道通过 el-data-table 可以快速生成一个列表的 CRUD 页面。而其中的搜索框，新增编辑的内容弹框，就是由 el-form-renderer 生成的。通过传入对应的配置项，就能生成相应的内容，不需要写 template。

### 拓展 slot

在一些表单项场景，el-form-renderer 可用于表单项进行扩展。

自定义组件按一定的格式实现 v-model，就能让 el-form-render 能渲染自定义组件

如下图所示，两个图片上传、一个富文本编辑器，都是借助 el-form-renderer 渲染的。

![example.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562641394165-dc22af20-2863-443f-8f1a-17cd12b1f359.png#align=left&display=inline&height=1488&name=example.png&originHeight=1488&originWidth=2646&size=145427&status=done&width=2646)

## 表单验证

vee-validate

### 验证器拓展

## 自动计算

## 远程选项

## 动态字段

## Feature

module -> Widget 插拔模式

- 跨平台（pc/mobile）
- 脱离表现层（轻松结合其他 ui 框架）
- 灵活的布局
- 灵活的表单类型拓展
- 灵活的错误消息提示
- 支持灵活的字段注解
- 集成 vee-validate 表单验证
- 远程校验 --(https://baianat.github.io/vee-validate/guide/custom-rules.html#non-immediate-rules)
- 自定义表单验证触发时机
- 数据联动
- 自动计算
- 动态显示
- 远程选项（如 select，radio，checkbox 等）
- 表单值回填（编辑）
- 集成设计器
- 轻量化
- 插拔化
- i18n

**[⬆ Back to Top](#table-of-contents)**

## Links

- [api doc and online demo](https://femessage.github.io/el-form-renderer/)
- [自定义组件接入指南](https://github.com/femessage/el-form-renderer/blob/master/docs/guide-custom-component.md)
- [自定义组件设置校验规则](https://github.com/FEMessage/el-form-renderer/blob/master/docs/guide-custom-rules-in-custom-component.md)

**[⬆ Back to Top](#table-of-contents)**

## Quick Start

```sh
# Step1 确认你已经正确安装并使用了 element-ui
yarn add @femessage/el-form-renderer
```

```html
<template>
  <el-form-renderer :content="content"></el-form-renderer>
</template>

<script>
  import ElFormRenderer from '@femessage/el-form-renderer'

  export default {
    components: {
      ElFormRenderer
    },
    data() {
      return {
        content: []
      }
    }
  }
</script>
```

**[⬆ Back to Top](#table-of-contents)**

## Inspiration

thanks to [element-patch](https://github.com/leezng/element-patch)

## License

[MIT](./LICENSE)

**[⬆ Back to Top](#table-of-contents)**

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt="Alvin"/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/el-form-renderer/commits?author=Alvin-Liu" title="Code">💻</a> <a href="#review-Alvin-Liu" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/FEMessage/el-form-renderer/issues?q=author%3AAlvin-Liu" title="Bug reports">🐛</a> <a href="#blog-Alvin-Liu" title="Blogposts">📝</a> <a href="#ideas-Alvin-Liu" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="#infra-levy9527" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/el-form-renderer/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/el-form-renderer/issues?q=author%3Aevillt" title="Bug reports">🐛</a> <a href="#blog-evillt" title="Blogposts">📝</a> <a href="#ideas-evillt" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/el-form-renderer/commits?author=donaldshen" title="Documentation">📖</a> <a href="#example-donaldshen" title="Examples">💡</a></td>
    <td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/el-form-renderer/commits?author=colmugx" title="Code">💻</a> <a href="https://github.com/FEMessage/el-form-renderer/commits?author=colmugx" title="Tests">⚠️</a> <a href="https://github.com/FEMessage/el-form-renderer/commits?author=colmugx" title="Documentation">📖</a></td>
    <td align="center"><a href="http://67.216.223.155/resume/"><img src="https://avatars3.githubusercontent.com/u/26338853?v=4" width="100px;" alt="OuZuYu"/><br /><sub><b>OuZuYu</b></sub></a><br /><a href="https://github.com/FEMessage/el-form-renderer/issues?q=author%3AOuZuYu" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
