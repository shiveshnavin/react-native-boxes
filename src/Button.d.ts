import { TextProps, TouchableHighlightProps, PressableProps } from "react-native";
export declare function TransparentButton(props: TextProps & TouchableHighlightProps & {
    icon?: any;
    text?: string;
}): import("react").JSX.Element;
export declare function ButtonView(props: TextProps & TouchableHighlightProps & {
    icon?: any;
    text?: string;
}): import("react").JSX.Element;
export declare function RightIconButton(props: TextProps & TouchableHighlightProps & {
    icon?: any;
    text?: string;
}): import("react").JSX.Element;
export declare function LoadingButton(props: TextProps & TouchableHighlightProps & {
    loading: boolean;
    icon?: any;
    text?: string;
    loaderStyle?: 'normal' | 'transparent';
}): import("react").JSX.Element;
export declare function PressableView(props: PressableProps): import("react").JSX.Element;
