import { useContext, useEffect, useState } from "react";
import { TextProps, TouchableHighlight, GestureResponderEvent, TouchableHighlightProps, View, ActivityIndicator, LayoutAnimation, PressableProps, Pressable, TextStyle, Switch, SwitchProps } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { Center, HBox } from "./Box";
import { TextView, TextViewProps } from "./Text";
import { getIcon } from "./Image";
import { TrackerUtils, UAType, ViewType } from "./Analytics";

export type ButtonViewProps = TextProps & TouchableHighlightProps & { icon?: any, text?: string, textStyle?: TextStyle, children?: any }

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
    & { icon?: any, text?: string }) {
    const theme = useContext(ThemeContext)
    const tstyle = props.style || {}
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
            {...props}
            onPress={(e) => {
                props.onPress && props.onPress(e)
                theme.onTrack(UAType.CLICK, ViewType.BUTTON, (props.text || TrackerUtils.textOf(props.children)))
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
            {...props}
            onPress={(e) => {
                props.onPress && props.onPress(e)
                theme.onTrack(UAType.CLICK, ViewType.BUTTON, (props['aria-label'] ? props['aria-label'] + '-' : '') + (props.text || TrackerUtils.textOf(props.children)))
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
                                typeof props.icon == 'string' ? tstyle.color || theme.colors.invert.text : undefined} />
                        </View>
                    )
                }

                {
                    (props.text || props.children) && (
                        <TextView style={[{
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
                            color: tstyle.color || theme.colors.invert.text,
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
            {...props}
            onPress={(e) => {
                props.onPress && props.onPress(e)
                theme.onTrack(UAType.CLICK, ViewType.BUTTON, (props.text || TrackerUtils.textOf(props.children)))
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
                                color: tstyle.color || theme.colors.invert.text,
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
                                typeof props.icon == 'string' ? tstyle.color || theme.colors.invert.text : undefined} />
                        </View>
                    )
                }

            </HBox>
        </TouchableHighlight>
    )

}


export function LoadingButton(props: TextProps & TouchableHighlightProps
    & {
        loading: boolean,
        icon?: any,
        text?: string,
        loaderStyle?: 'normal' | 'transparent',
        underlayColor?: string
    }) {
    const theme = useContext(ThemeContext)
    const [_loading, _setIsLoading] = useState(props.loading)
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (props.loading != _loading)
            _setIsLoading(props.loading)
    }, [props.loading]);
    let loaderColor = theme.colors.invert.text
    let loaderSize = theme.dimens.icon.md
    let btnBg = theme.colors.accent
    let btnBgPressed = props.underlayColor || theme.colors.accentLight

    if (_loading && props.loaderStyle == 'transparent') {
        loaderColor = theme.colors.accent
        btnBg = theme.colors.transparent
        btnBgPressed = theme.colors.transparent
        loaderSize = theme.dimens.icon.lg
    }
    return (
        <ButtonView
            {...props}
            underlayColor={btnBgPressed}
            style={[{
                backgroundColor: btnBg,
                padding: _loading && props.loaderStyle == 'transparent' ?
                    theme.dimens.space.sm : theme.dimens.space.md
            }, props.style]}
            icon={_loading ?
                <ActivityIndicator
                    size={loaderSize}
                    color={loaderColor} />
                : props.icon
            }
            text={!_loading ? props.text : undefined} />
    )
}



export function PressableView(props: PressableProps) {
    //@ts-ignore
    return (<Pressable {...props} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1.0 }, props.style]} />)
}

export function SwitchView(props: SwitchProps & { text: string, orientation: 'row' | 'column' }) {
    const theme = useContext(ThemeContext)
    return (
        <HBox style={[{
            flexDirection: props.orientation || 'row',
            alignContent: 'center',
            alignItems: 'center'
        }, props.style]}>
            <Switch
                trackColor={{
                    false: theme.colors.caption,
                    true: theme.colors.success
                }}
                thumbColor={props.value ? theme.colors.invert.text : theme.colors.text}
                ios_backgroundColor={theme.colors.caption}
                onValueChange={(value) => {
                    props.onValueChange && props.onValueChange(value)
                    theme.onTrack(UAType.CLICK, ViewType.SWITCH, (props.text) + '-' + value, { value })
                }}
                {...props}
            />
            {
                props.text && (
                    <TextView>{props.text}</TextView>
                )
            }
        </HBox>

    )
}