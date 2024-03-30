import { TextStyle, ViewProps } from "react-native";
import * as React from 'react';
import { Icon } from "./Image";
export interface Option {
    id: string;
    title?: string;
    icon?: string | any;
    onClick?: (id: string) => void;
}
export interface SimpleToolbarProps extends ViewProps {
    title?: String;
    hideStatusBar?: boolean;
    backgroundColor?: string;
    statusbarBackgroundColor?: string;
    forgroundColor?: string;
    homeIcon?: string | typeof Icon;
    onHomePress?: () => void;
    textStyle?: TextStyle;
    options?: Option[];
}
export declare const SimpleToolbarHeight = 40;
export declare function SimpleToolbar(props: SimpleToolbarProps): React.JSX.Element;
export declare function BottomNavBar(props: ViewProps & {
    options: Option[];
    selectedId: string;
    onSelect: (id: string) => void;
    onDimens?: (width: number, height: number) => void;
}): React.JSX.Element | null;
