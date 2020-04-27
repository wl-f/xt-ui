import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
    /** 设置 Button 的类型,可选类型'primary' | 'default' | 'danger' | 'link' */
    buttonType?:ButtonType;
    /** 设置 Button 的大小,为空为正常大小,其他可选项 'lg' | 'sm' */
    size?:ButtonSize;
    /** 设置 Button 的是否禁用 */
    disabled?:boolean;
    /** 设置 Button 类型为'link'时的 'href'属性 */
    href?:string;
    /** 设置 Button 的自定义样式 */
    className?:string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button:FC<ButtonProps> = (props) =>{
    const {
        children,
        className,
        buttonType,
        size,
        disabled,
        href,
        ...restProps
    } = props;

    const classes = classNames('btn',className,{
        [`btn-${buttonType}`]: buttonType,
        [`btn-${size}`]: size,
        'disabled': (buttonType === 'link') && disabled
    })

    if (buttonType === 'link' && href){
        return (
            <a className={classes} href={href} {...restProps}>{children}</a>
        )
    } else {
        return(
            <button className={classes} disabled={disabled} {...restProps}>{children}</button>
        )
    }

}
Button.defaultProps = {
    buttonType: 'default',
    disabled: false
}
export default Button;
