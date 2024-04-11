import { ReactNode, useContext, useEffect, useState } from "react";
import { GestureResponderEvent, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { assignFields, isWeb } from "./utils";
import { HBox, VBox } from "./Box";
import { TextView } from "./Text";
import { Icon } from "./Image";


/**
 * 
 * @param initialText if you use initialText then you dont need to maintain the 2 way binding between value and setValue, just enjoy props.onChangeText events
 * @returns 
 */
export function TextInputView(props: TextInputProps & {
    initialText?: string,
    pattern?: string,
}) {
    const theme = useContext(ThemeContext)
    const [text, setText] = useState(props.initialText)
    const [focused, setFocused] = useState(false)
    function onTextChange(newText: string) {
        setText(newText)
        props.onChangeText && props.onChangeText(newText)
    }

    return (
        <TextInput
            {...props}
            onFocus={(e) => {
                setFocused(true)
                props.onFocus && props.onFocus(e)
            }}
            onBlur={(e) => {
                setFocused(false)
                props.onBlur && props.onBlur(e)
            }}
            value={props.value || text}
            onChangeText={(newText) => {
                if (props.pattern) {
                    const re = new RegExp(props.pattern);
                    if (newText === "" || re.test(newText)) {
                        onTextChange(newText)
                    }
                } else {
                    onTextChange(newText)
                }
            }}
            style={[{
                color: theme.colors.text,
                textAlignVertical: "top",
                width: 'auto',
                fontSize: theme.dimens.font.md,
                fontFamily: theme.fonts.Regular,
                padding: theme.dimens.space.md,
                paddingStart: theme.dimens.space.md,
                paddingBottom: isWeb() ? theme.dimens.space.md : theme.dimens.space.sm / 2,
                margin: theme.dimens.space.sm,
                borderWidth: focused ? 1.5 : 1.5,
                borderRadius: theme.dimens.space.sm,
                borderColor: !focused ? theme.colors.caption : theme.colors.accent
            }, isWeb() ? {
                //@ts-ignore
                outline: 'none',
            } : {},
            props.style]}
        />
    )
}

export type CompositeTextInputViewProps = TextInputProps & {
    hint?: string,
    alertText?: string,
    alertTextColor?: string,
    pattern?: string,
    initialText?: string,
    icon?: 'close' | 'eye' | string | React.Component,
    _textInputProps?: TextInputProps,
    onIconPress?: ((event: GestureResponderEvent) => void) | undefined
}
/**
 * Note: if input is inside a ScrollView in heirarchy anywhere then add keyboardShouldPersistTaps={'handled'}
 * to the scrollview else the icon click wont work
 * In case, you textinput is getting hidden due to keyboard see https://stackoverflow.com/a/77563800/6865753

 * @param props 
 * @returns 
 */
export function CompositeTextInputView(props: CompositeTextInputViewProps) {
    const theme = useContext(ThemeContext)
    const [text, setText] = useState(props.initialText)
    const [alerttext, setAlertText] = useState(props.alertText)
    const [focused, setFocused] = useState(false)
    function onTextChange(newText: string) {
        setText(newText)
        props.onChangeText && props.onChangeText(newText)
    }
    const fontStyles: any = assignFields({}, props.style,
        [
            "returnKeyType",
            "keyboardType",
            "textContentType",
            "multiline",
            "fontFamily",
            "fontSize",
            "fontWeight",
            "fontVariant",
            "color",
            "inputMode"
        ])
    var hintVisible = false
    if (props.placeholder && props.placeholder.length > 0 && focused) {
        hintVisible = true
    }
    if (!focused && text && text.length > 0) {
        hintVisible = true
    }
    if (!props.placeholder) {
        hintVisible = false
    }
    // (focused || ((text ||
    //     props.value == undefined ? props.placeholder : props.value || ''
    // )?.length || 0) > 0)
    // if (!hintVisible && props.placeholder != undefined && props.placeholder?.length > 0 && text != undefined && text?.length > 0) {
    //     hintVisible = false
    // }
    const alertVisible = alerttext && alerttext.length
    useEffect(() => {
        setText(props.value)
    }, [props.value])
    useEffect(() => {
        setAlertText(props.alertText)
    }, [props.alertText])

    //@ts-ignore
    const IconComponent: ReactNode = typeof props.icon == 'string' ? (
        <Icon
            color={!focused ? theme.colors.caption : theme.colors.accent}
            style={{
                minWidth: isWeb() ? theme.dimens.icon.lg : theme.dimens.icon.sm,
                padding: theme.dimens.space.sm / 2,
            }} name={props.icon} />
    ) : props.icon

    return (
        <HBox style={[{
            paddingEnd: theme.dimens.space.md,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
            paddingStart: theme.dimens.space.sm * 1.5,
            margin: theme.dimens.space.sm,
            borderWidth: 1.5,
            borderRadius: theme.dimens.space.sm,
            borderColor: !focused ? theme.colors.caption : theme.colors.accent,
        }, (!hintVisible && !alertVisible) ? {
            paddingTop: theme.dimens.space.sm,
            paddingBottom: theme.dimens.space.sm
        } : {

        }, props.style]}>


            <VBox style={[{
                flex: 1,
                paddingBottom: alertVisible ? 0 : theme.dimens.space.sm
            }, hintVisible ? {
            } : {
                paddingTop: theme.dimens.space.sm
            }]}>
                {hintVisible && <TextView
                    style={{
                        padding: 0,
                        margin: 0,
                        fontSize: theme.dimens.font.sm,
                        color: !focused ? theme.colors.caption : theme.colors.accent,

                    }}
                >{props.placeholder}</TextView>}
                <TextInput
                    {...props._textInputProps}
                    selectionColor={props.selectionColor || theme.colors.accent}
                    secureTextEntry={props.secureTextEntry}
                    placeholderTextColor={theme.colors.caption}
                    placeholder={hintVisible ? '' : theme.i18n?.t(props.placeholder) || props.placeholder}
                    keyboardType={props.keyboardType}
                    returnKeyType={props.returnKeyType || 'default'}
                    onFocus={(e) => {
                        setFocused(true)
                        props.onFocus && props.onFocus(e)
                    }}
                    onBlur={(e) => {
                        setFocused(false)
                        props.onBlur && props.onBlur(e)
                    }}
                    value={props.value || text}
                    onChangeText={(newText) => {
                        if (props.pattern) {
                            const re = new RegExp(props.pattern);
                            if (newText === "" || re.test(newText)) {
                                onTextChange(newText)
                            }
                        } else {
                            onTextChange(newText)
                        }
                    }}
                    style={[{
                        color: theme.colors.text,
                        fontSize: theme.dimens.font.md,
                        fontFamily: theme.fonts.Regular,
                    }, isWeb() ? {
                        //@ts-ignore
                        outline: 'none',
                    } : {

                    }, fontStyles]}
                />
                {
                    alertVisible && <TextView
                        style={{
                            color: props.alertTextColor || theme.colors.critical,
                            padding: 0,
                            margin: 0,
                            paddingBottom: theme.dimens.space.sm,
                            fontSize: theme.dimens.font.sm,
                        }}
                    >{alerttext}</TextView>
                }
            </VBox>
            {
                props.icon != undefined &&
                <TouchableOpacity onPress={(e) => {
                    if (!props.onIconPress && props.icon == 'close') {
                        onTextChange('')
                    }
                    props.onIconPress && props.onIconPress(e)
                }}>
                    {
                        (IconComponent)
                    }
                </TouchableOpacity>
            }

        </HBox >
    )
}