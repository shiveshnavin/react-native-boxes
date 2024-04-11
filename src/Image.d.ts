import { ActivityIndicatorProps, ViewProps } from "react-native";
export type IconProps = {
    name: any;
    size?: number;
    color?: string;
    onPress?: () => void;
};
export declare function Icon(props: ViewProps & IconProps): import("react").JSX.Element;
/**
 *
 * @param props provide one of iconUrl , iconName , iconText
 * @returns
 */
export declare function Avatar(props: ViewProps & {
    onPress?: Function;
    iconUrl?: string;
    iconName?: string;
    iconText?: string;
    iconNameProps?: IconProps;
    style?: any;
}): import("react").JSX.Element;
export declare function getIcon(Input: any, wrap?: boolean): any;
export declare function Spinner(props: ActivityIndicatorProps): import("react").JSX.Element;
