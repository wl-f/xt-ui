import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from './menu'
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) =>{
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpen = (index && context.mode === "vertical") ? openedSubMenus.includes(index) : false

    const [ menuOpen, setOpen ] = useState(isOpen)

    const classes = classNames('menu-item submenu-item', className, {
        'submenu-item-active': context.index === index
    })
    const handleClick = (e:React.MouseEvent) => {
        e.stopPropagation();
        setOpen(!menuOpen)
    }
    let timer:any
    const handleMouse = (e: React.MouseEvent, toggle:boolean) => {
        clearTimeout(timer)
        e.stopPropagation()
        timer = setTimeout(()=>{
            setOpen(toggle)
        },300)
    }

    const clickEvents = context.mode === "vertical" ? {onClick:handleClick} : {}
    const hoverEvents = context.mode !== "vertical" ? {
        onMouseEnter: (e:React.MouseEvent) => {handleMouse(e,true)},
        onMouseLeave: (e:React.MouseEvent) => {handleMouse(e,false)}
    }:{}

    const renderChildren = () => {
        const subMenuClassName = classNames('submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children,(child, index1) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${index1}`
                })
                // return childElement
            }else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component')
            }
        })
        return (
            <ul className={subMenuClassName}>
                {childrenComponent}
            </ul>
        )
    }
    return(
        <li key={index} className={classes}  {...hoverEvents}>
            <div className={'submenu-title'}  {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;
