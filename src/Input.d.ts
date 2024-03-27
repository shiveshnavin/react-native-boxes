import { GestureResponderEvent, TextInputProps } from "react-native";
/**
 *
 * @param initialText if you use initialText then you dont need to maintain the 2 way binding between value and setValue, just enjoy props.onChangeText events
 * @returns
 */
export declare function TextInputView(props: TextInputProps & {
    initialText?: string;
    pattern?: string;
}): import("react").JSX.Element;
/**
 * Note: if input is inside a ScrollView in heirarchy anywhere then add keyboardShouldPersistTaps={'handled'}
 * to the scrollview else the icon click wont work
 * In case, you textinput is getting hidden due to keyboard see https://stackoverflow.com/a/77563800/6865753

 * @param props
 * @returns
 */
export declare function CompositeTextInputView(props: TextInputProps & {
    hint?: string;
    alertText?: string;
    alertTextColor?: string;
    pattern?: string;
    initialText?: string;
    icon?: 'close' | 'eye' | string | React.Component;
    onIconPress?: ((event: GestureResponderEvent) => void) | undefined;
}): import("react").JSX.Element;
