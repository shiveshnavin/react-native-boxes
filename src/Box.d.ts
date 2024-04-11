import { ScrollViewProps, ViewProps } from "react-native";
import * as React from 'react';
export declare function Box(props: ViewProps): React.JSX.Element;
export declare function VBox(props: ViewProps): React.JSX.Element;
export declare function HBox(props: ViewProps): React.JSX.Element;
export declare function Center(props: ViewProps): React.JSX.Element;
export declare function VPage(props: ViewProps): React.JSX.Element;
/**
 * Must be wrapped with SafeAreaView somewhere in parent tree
 * @param param0
 * @returns
 */
declare const KeyboardAvoidingScrollView: React.FC<ScrollViewProps>;
export default KeyboardAvoidingScrollView;
export declare function CardView(props: ViewProps): React.JSX.Element;
