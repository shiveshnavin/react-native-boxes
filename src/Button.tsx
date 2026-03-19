import { useContext, useEffect, useState } from "react";
import { TextProps, TouchableHighlight, GestureResponderEvent, TouchableHighlightProps, View, ActivityIndicator, LayoutAnimation, PressableProps, Pressable, TextStyle, Switch, SwitchProps } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { Center, HBox } from "./Box";
import { TextView, TextViewProps } from "./Text";
import { getIcon } from "./Image";
import { TrackerUtils, TrackingActionType, TrackingViewType } from "./Analytics";

export type ButtonViewProps = TextProps & TouchableHighlightProps & { icon?: any, text?: string, textStyle?: TextStyle, children?: any, analyticsId?: string, analyticsExtras?: any }

export function TertiaryButtonView(props: ButtonViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <ButtonView
            {...props}
            underlayColor={props.underlayColor || theme.colors.transparent}
            style={[{
                backgroundColor: theme.colors.transparent,
            }, props.style]}
            textStyle={Object.assign({
                fontSize: theme.dimens.font.lg,
                color: theme.colors.accent
            }, props.textStyle || {})}
        />
    )
}
export function TransparentButton(props: TextProps & TouchableHighlightProps
    & { icon?: any, text?: string, analyticsId?: string, analyticsExtras?: any }) {
    const theme = useContext(ThemeContext)
    const tstyle = props.style || {}
    const { analyticsId, analyticsExtras, ...touchableProps } = props
    const [isPressed, setIsPressed] = useState(false)
    const onPressIn = (e: GestureResponderEvent) => {
        setIsPressed(true)
        if (props.onPressIn) props.onPressIn(e)
    }
    const onPressOut = (e: GestureResponderEvent) => {
        setIsPressed(false)
        if (props.onPressOut) props.onPressOut(e)
    }

    return (
        <TouchableHighlight
            {...touchableProps}
            testID={analyticsId}
            //@ts-ignore
            nativeID={analyticsId}
            onPress={(e) => {
                props.onPress && props.onPress(e)
                theme.onTrack(
                    TrackingActionType.CLICK,
                    TrackingViewType.BUTTON,
                    TrackerUtils.textOrAnalyticsId(analyticsId, (props.text || TrackerUtils.textOf(props.children))),
                    analyticsExtras
                )
            }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            underlayColor={theme.colors.transparent}
            style={[{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: theme.dimens.space.md,
                borderRadius: theme.dimens.space.md,
                margin: theme.dimens.space.sm,
                backgroundColor: theme.colors.transparent,
            }, props.style]}>
            <Center style={{
                padding: 0,
                margin: 0,
                flexDirection: 'row',
                backgroundColor: 'transparent'
            }}>

                {
                    props.icon && (
                        <View style={{
                            margin: theme.dimens.space.sm
                        }}>
                            {getIcon(props.icon)}
                        </View>
                    )
                }

                {
                    (props.text || props.children) && (
                        <TextView style={{
                            fontWeight: "500",
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            //@ts-ignore
                            fontSize: tstyle.fontSize,
                            //@ts-ignore
                            fontFamily: tstyle.fontFamily || theme.fonts.Bold,
                            //@ts-ignore
                            color: isPressed ? (props.underlayColor || theme.colors.accentLight) : tstyle.color || theme.colors.accent,
                        }}>
                            {props.text || props.children}
                        </TextView>
                    )
                }
            </Center>
        </TouchableHighlight>
    )
}

export function ButtonView(props: ButtonViewProps) {
    const theme = useContext(ThemeContext)
    const tstyle = props.style || {}
    const { analyticsId, analyticsExtras, ...touchableProps } = props
    const [isPressed, setIsPressed] = useState(false)
    const onPressIn = (e: GestureResponderEvent) => {
        setIsPressed(true)
        if (props.onPressIn) props.onPressIn(e)
    }
    const onPressOut = (e: GestureResponderEvent) => {
        setIsPressed(false)
        if (props.onPressOut) props.onPressOut(e)
    }
    const BtnIcon = getIcon(props.icon)
    return (
        <TouchableHighlight
            {...touchableProps}
            testID={analyticsId}
            //@ts-ignore
            nativeID={analyticsId}
            onPress={(e) => {
                props.onPress && props.onPress(e)
                theme.onTrack(
                    TrackingActionType.CLICK,
                    TrackingViewType.BUTTON,
                    TrackerUtils.textOrAnalyticsId(
                        analyticsId,
                        (props['aria-label'] ? props['aria-label'] + '-' : '') + (props.text || TrackerUtils.textOf(props.children))
                    ),
                    analyticsExtras
                )
            }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            underlayColor={props.underlayColor || theme.colors.accentLight}
            style={[{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: theme.dimens.space.md,
                borderRadius: theme.dimens.space.md,
                margin: theme.dimens.space.sm,
                backgroundColor: theme.colors.accent,
            }, props.style]}>
            <Center style={{
                padding: 0,
                margin: 0,
                flexDirection: 'row',
                backgroundColor: 'transparent'
            }}>


                {
                    BtnIcon && (
                        <View style={{
                            margin: theme.dimens.space.sm
                        }}>
                            <BtnIcon color={
                                //@ts-ignore
                                typeof props.icon == 'string' ? tstyle.color || "#fff" : undefined} />
                        </View>
                    )
                }

                {
                    (props.text || props.children) && (

                        <TextView style={[{
                            width: '100%',
                            textAlign: 'center',
                            opacity: isPressed ? .7 : 1,
                            fontWeight: "500",
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            //@ts-ignore
                            fontSize: tstyle.fontSize || theme.dimens.font.md,
                            //@ts-ignore
                            fontFamily: tstyle.fontFamily || theme.fonts.Bold,
                            //@ts-ignore
                            color: tstyle.color || "#fff",
                        }, props.textStyle]}>
                            {props.text || props.children}
                        </TextView>
                    )
                }
            </Center>
        </TouchableHighlight>
    )
}


export function RightIconButton(props: ButtonViewProps) {

    const theme = useContext(ThemeContext)
    const tstyle = props.style || {}
    const { analyticsId, analyticsExtras, ...touchableProps } = props
    const [isPressed, setIsPressed] = useState(false)
    const onPressIn = (e: GestureResponderEvent) => {
        setIsPressed(true)
        if (props.onPressIn) props.onPressIn(e)
    }
    const onPressOut = (e: GestureResponderEvent) => {
        setIsPressed(false)
        if (props.onPressOut) props.onPressOut(e)
    }
    const BtnIcon = getIcon(props.icon)

    return (
        <TouchableHighlight
            {...touchableProps}
            testID={analyticsId}
            //@ts-ignore
            nativeID={analyticsId}
            onPress={(e) => {
                props.onPress && props.onPress(e)
                theme.onTrack(
                    TrackingActionType.CLICK,
                    TrackingViewType.BUTTON,
                    TrackerUtils.textOrAnalyticsId(analyticsId, (props.text || TrackerUtils.textOf(props.children))),
                    analyticsExtras
                )
            }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            underlayColor={props.underlayColor || theme.colors.accentLight}
            style={[{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: theme.dimens.space.md,
                borderRadius: theme.dimens.space.md,
                margin: theme.dimens.space.sm,
                backgroundColor: theme.colors.accent,
            }, props.style]}>

            <HBox style={{
                padding: 0,
                margin: 0,
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '100%',
                paddingLeft: theme.dimens.space.sm,
                paddingRight: theme.dimens.space.sm,
            }}>
                <Center style={{
                    padding: 0,
                    margin: 0,
                    flexDirection: 'row',
                    backgroundColor: 'transparent'
                }}>

                    {
                        (props.text) && (
                            <TextView style={{
                                marginRight: theme.dimens.space.lg,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                //@ts-ignore
                                fontSize: tstyle.fontSize,
                                //@ts-ignore
                                fontFamily: tstyle.fontFamily,
                                //@ts-ignore
                                color: tstyle.color || "#fff",
                            }}>
                                {props.text}
                            </TextView>
                        )
                    }
                    {props.children}

                </Center>
                {
                    BtnIcon && (
                        <View style={{
                            position: 'absolute',
                            right: 0,
                            margin: theme.dimens.space.sm
                        }}>
                            <BtnIcon color={
                                //@ts-ignore
                                typeof props.icon == 'string' ? tstyle.color || "#fff" : undefined} />
                        </View>
                    )
                }

            </HBox>
        </TouchableHighlight>
    )

}


export function LoadingButton(props: ButtonViewProps & {
    loading: boolean,
    loaderStyle?: 'normal' | 'transparent',
    underlayColor?: string
}) {
    const { loading, loaderStyle, ...buttonProps } = props
    const theme = useContext(ThemeContext)
    const [_loading, _setIsLoading] = useState(loading)
    useEffect(() => {
        if (loading != _loading) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
        _setIsLoading(loading)
    }, [loading]);
    let loaderColor = theme.colors.invert.text
    let loaderSize = theme.dimens.icon.md
    let btnBg = theme.colors.accent
    let btnBgPressed = props.underlayColor || theme.colors.accentLight

    if (_loading && loaderStyle == 'transparent') {
        loaderColor = theme.colors.accent
        btnBg = theme.colors.transparent
        btnBgPressed = theme.colors.transparent
        loaderSize = theme.dimens.icon.lg
    }
    return (
        <ButtonView
            {...buttonProps}
            underlayColor={btnBgPressed}
            style={[{
                backgroundColor: btnBg,
                padding: _loading && loaderStyle == 'transparent' ?
                    theme.dimens.space.sm : theme.dimens.space.md
            }, props.style]}
            icon={_loading ?
                <ActivityIndicator
                    size={loaderSize}
                    color={loaderColor} />
                : buttonProps.icon
            }
            text={!_loading ? buttonProps.text : undefined} />
    )
}



export function PressableView(props: PressableProps & { analyticsId?: string, analyticsExtras?: any }) {
    const theme = useContext(ThemeContext)
    const { analyticsId, analyticsExtras, onPress, style, ...rest } = props as any
    return (
        <Pressable
            {...rest}
            testID={analyticsId}
            //@ts-ignore
            nativeID={analyticsId}
            onPress={(e) => {
                onPress && onPress(e)
                if (analyticsId !== undefined && analyticsId !== null) {
                    theme.onTrack(TrackingActionType.CLICK, TrackingViewType.BOX, analyticsId, analyticsExtras)
                }
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1.0 }, style]}
        />
    )
}

export function SwitchView(props: SwitchProps & { text?: string, orientation?: "row" | "column" | "row-reverse" | "column-reverse" | undefined, textStyle?: TextStyle, analyticsId?: string, analyticsExtras?: any }) {
    const theme = useContext(ThemeContext)
    const { text, orientation, textStyle, analyticsId, analyticsExtras, style, onValueChange, ...switchProps } = props
    return (
        <HBox style={[{
            flexDirection: orientation || 'row',
            alignContent: 'center',
            alignItems: 'center'
        }, style]}>
            <Switch
                testID={analyticsId}
                //@ts-ignore
                nativeID={analyticsId}
                trackColor={{
                    false: theme.colors.caption,
                    true: theme.colors.success
                }}
                thumbColor={props.value ? theme.colors.invert.text : theme.colors.text}
                ios_backgroundColor={theme.colors.caption}
                onValueChange={(value) => {
                    onValueChange && onValueChange(value)
                    theme.onTrack(
                        TrackingActionType.CLICK,
                        TrackingViewType.SWITCH,
                        TrackerUtils.textOrAnalyticsId(analyticsId, (text || '') + '-' + value),
                        analyticsExtras !== undefined ? analyticsExtras : { value }
                    )
                }}
                {...switchProps}
            />
            {
                text && (
                    <TextView style={textStyle}>{text}</TextView>
                )
            }
        </HBox>

    )
}
