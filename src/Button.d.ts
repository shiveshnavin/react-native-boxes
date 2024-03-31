import { TextProps, TouchableHighlightProps, PressableProps, TextStyle } from "react-native";
export type ButtonViewProps = TextProps & TouchableHighlightProps & {
    icon?: any;
    text?: string;
    textStyle?: TextStyle;
};
export declare function TertiaryButtonView(props: ButtonViewProps): import("react").JSX.Element;
export declare function TransparentButton(props: TextProps & TouchableHighlightProps & {
    icon?: any;
    text?: string;
}): import("react").JSX.Element;
export declare function ButtonView(props: ButtonViewProps): import("react").JSX.Element;
export declare function RightIconButton(props: ButtonViewProps): import("react").JSX.Element;
export declare function LoadingButton(props: TextProps & TouchableHighlightProps & {
    loading: boolean;
    icon?: any;
    text?: string;
    loaderStyle?: 'normal' | 'transparent';
}): import("react").JSX.Element;
export declare function PressableView(props: PressableProps): import("react").JSX.Element;
