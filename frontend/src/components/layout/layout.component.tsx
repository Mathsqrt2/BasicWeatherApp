import { FC, ReactNode } from "react";

type LayoutProps = {
    header?: ReactNode,
    content?: ReactNode,
    footer?: ReactNode,
}

export const Layout: FC<LayoutProps> = (props) => {
    return <>
        {props?.header}
        {props?.content}
        {props?.footer}
    </>
}