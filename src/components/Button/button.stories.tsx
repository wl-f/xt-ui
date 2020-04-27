import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'

const defaultButton = () => (
    <Button onClick={action('clicked')}> default button </Button>
)

const buttonWithSize = () => (
    <>
        <Button size="lg"> large button </Button>
        <Button size="sm"> small button </Button>
    </>
)

const buttonWithType = () => (
    <>
        <Button buttonType="primary"> primary button </Button>
        <Button buttonType="danger"> danger button </Button>
        <Button buttonType="link" href="https://baidu.com"> link button </Button>
    </>
)

storiesOf('Button', module)
    .add('Button', defaultButton)
    .add('不同尺寸的 Button', buttonWithSize)
    .add('不同类型的 Button', buttonWithType)
