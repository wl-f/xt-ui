import React from "react";
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'menu-test'
}
const testVerticalProps: MenuProps = {
    defaultIndex: 0,
    mode: "vertical"
}

const renderMenu = (props:MenuProps) => {

    return(
        <Menu {...props}>
            <MenuItem index={0}>
                active
            </MenuItem>
            <MenuItem index={1} disabled>
                disabled
            </MenuItem>
            <MenuItem index={2}>
                MenuItem 3
            </MenuItem>
            <MenuItem index={3}>
                MenuItem 4
            </MenuItem>
        </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('Menu and MenuItem component ', () => {
    // beforeEach 每个case执行前都会执行
    beforeEach(() => {
        wrapper = render(renderMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('should render correct menu and meunItem based on default props', function () {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu', 'menu-test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item', 'menu-item-active')
        expect(disabledElement).toHaveClass('menu-item', 'menu-item-disabled')

    });

    it('should items should change active and call the right callback', function () {
        const thirdItem = wrapper.getByText('MenuItem 3')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('menu-item-active')
        expect(activeElement).not.toHaveClass('menu-item-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    });

    it('should render vertical mode when mode is set to vertical', function () {
        cleanup(); // 清除
        const wrapper = render(renderMenu(testVerticalProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    });
})
