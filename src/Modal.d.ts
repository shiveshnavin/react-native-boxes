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
    onExpand?: (isExpanded: boolean) => void;
    onChange?: (isExpanded: boolean) => void;
}): React.JSX.Element;
export type DropDownViewOption = {
    id: string;
    value: any;
    title?: string;
};
export type DropDownViewProps = {
    options: DropDownViewOption[];
    selectedId: string;
    onSelect: (selectedId: string, opt: DropDownViewOption) => void;
    initialVisile?: Boolean;
    title?: string;
    displayType?: 'button' | 'input';
    onRenderOption?: (opt: DropDownViewOption) => any;
    forceDialogSelectOnWeb?: Boolean;
} & ViewProps;
export declare const DropDownView: (props: DropDownViewProps) => React.JSX.Element;
export type ConfirmationDialogProps = {
    visible: boolean;
    title?: string | React.Component;
    cancellable?: boolean;
    onDismiss?: Function;
    onConfirm: () => void;
    onCancel?: () => void;
    message?: string;
    confirmText?: String;
    cancelText?: String;
    children?: any;
};
export declare function ConfirmationDialog(props: ConfirmationDialogProps): React.JSX.Element;
