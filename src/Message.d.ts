import * as React from "react";
import { ViewProps } from "react-native";
export declare function AlertMessage(props: ViewProps & {
    text: string;
    type?: 'info' | 'success' | 'warning' | 'critical';
    onDismiss?: Function;
}): React.JSX.Element | undefined;
