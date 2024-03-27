import * as React from 'react';
import { StyleProp, TextStyle, ViewProps } from 'react-native';
import { IconProps } from './Image';
export type BottomSheetProps = {
    visible: boolean;
    title?: string | React.Component;
    cancellable?: boolean;
    children: any;
    onDismiss?: Function;
};
export declare const BottomSheet: (props: BottomSheetProps) => React.JSX.Element;
export declare function Expand(props: ViewProps & {
    title?: string;
    iconName?: string;
    iconPosition?: 'left' | 'right';
    titleStyle?: StyleProp<TextStyle>;
    titleBackgroundColor?: string;
    iconStyle?: IconProps;
    initialExpand?: boolean;
    duration?: number;
    onChange?: (isExpanded: boolean) => void;
}): React.JSX.Element;
