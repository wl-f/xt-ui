import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import "../src/styles/index.scss"
import "./style.scss"


const wrapperStyle = {
    padding: '20px 40px',
    width: '500px'
}

const storyWrapper = (stroyFn) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {stroyFn()}
    </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})

const loaderFn = () => {
    return [
        require('../src/welcome.stories.tsx'),
        require('../src/components/Button/button.stories.tsx'),
        require('../src/components/Input/input.stories.tsx'),
        require('../src/components/Menu/menu.stories.tsx'),

    ]
}


configure(loaderFn, module);
