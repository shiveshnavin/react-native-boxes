import { TextProps } from "react-native";
export type TextViewProps = TextProps & {
    skipI18n?: boolean;
};
export declare function TextView(props: TextViewProps): import("react").JSX.Element;
export declare function Subtitle(props: TextProps): import("react").JSX.Element;
export declare function Title(props: TextProps): import("react").JSX.Element;
export declare function Caption(props: TextProps): import("react").JSX.Element;
