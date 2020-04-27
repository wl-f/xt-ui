import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Button, {ButtonProps} from "./button";

const defaultProps:ButtonProps = {
    onClick: jest.fn()
}
const testProps:ButtonProps = {
    buttonType:'primary',
    size:'lg',
    className: 'test'
}
const disabledProps:ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
}
describe('test Button component',()=>{

    it('should render the correct default button', function () {
        const wrapper = render(<Button {...defaultProps}>Default</Button>)
        const element = wrapper.getByText('Default') as HTMLButtonElement; // 获取按钮dom元素
        expect(element).toBeInTheDocument(); // 是否渲染
        expect(element.tagName).toEqual('BUTTON'); // 是否是button类型
        expect(element.disabled).toBeFalsy(); // 默认button disabled属性不存在
        expect(element).toHaveClass('btn btn-default') // 是否含有btn btn-default样式
        fireEvent.click(element); // 点击按钮
        expect(defaultProps.onClick).toHaveBeenCalled() // onClick事件被触发过
    });

    it('should render the correct component based on different props', function () {
        const wrapper = render(<Button {...testProps}>Different Props</Button>)
        const element = wrapper.getByText('Different Props');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg test')
    });

    it('should render a link when btnType equals link and href is provide', function () {
        const wrapper = render(<Button buttonType={"link"} href={'http://baidu.com'}>Link</Button>)
        const element = wrapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link')
    });

    it('should render disabled button when disabled set to true', function () {
        const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
        const element = wrapper.getByText('Disabled') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
})

