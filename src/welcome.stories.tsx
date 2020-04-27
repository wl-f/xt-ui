import React from 'react'
import { storiesOf } from '@storybook/react'

const markdownText = `
### 使用 React+typescript 从零到一完成的一套自己的组件库

xt-ui 是一套练习组件库，使用 React Hooks 和 typescript


### 安装

~~~javascript
npm install xt-ui --save // 暂未发布到npm
~~~


### 使用
暂未发布到npm

### 项目技术要点

* typescript with React Hooks
* ️使用 react-testing-library 完成单元测试
* 使用 storybook 本地调试和生成文档页面
* 样式（Sass）组织
* npm发布流程,文档站点
`
storiesOf('欢迎来到XT-UI', module)
    .add('welcome', () => {
        return (
            <h2>欢迎来到 XT-UI 组件库</h2>
        )
    }, { info : { text: markdownText, source: false, }})
