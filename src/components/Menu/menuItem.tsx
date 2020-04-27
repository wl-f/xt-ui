import React, {useContext} from "react";
import classNames from "classnames";
import { MenuContext } from './menu'

export interface MenuItemProps {
    index?:string;
    disabled?:boolean;
    className?:string;
    style?:React.CSSProperties;
}
const MenuItem: React.FC<MenuItemProps> = (props)=> {
    const { index, disabled, className, style, children } = props
    const context = useContext(MenuContext)

    const handleClick = () =>{
        if (context.onSelect && !disabled && (typeof index ==="string")){
            context.onSelect(index)
        }
    }

    const classes = classNames('menu-item', className, {
        "menu-item-disabled": disabled,
        'menu-item-active': context.index === index
    })

    return(
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
};


MenuItem.defaultProps = {

}
MenuItem.displayName = 'MenuItem'

export default MenuItem
