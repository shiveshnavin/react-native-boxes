import { useContext } from "react";
import { StatusBar, TextStyle, View, ViewProps } from "react-native";
import { ThemeContext } from "./ThemeContext";
import * as React from 'react'
import { Center, HBox } from "./Box";
import { Caption, TextView } from "./Text";
import { Icon, getIcon } from "./Image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PressableView } from "./Button";
import { isDesktop, isWeb } from "./utils";
import { TrackingActionType, TrackingViewType } from "./Analytics";

export interface Option {
    id: string,
    title?: string,
    icon?: string | any,
    onClick?: (id: string) => void
}

export interface SimpleToolbarProps extends ViewProps {
    title?: String,
    hideStatusBar?: boolean,
    backgroundColor?: string,
    statusbarBackgroundColor?: string,
    forgroundColor?: string,
    homeIcon?: string | typeof Icon,
    onHomePress?: () => void
    textStyle?: TextStyle
    options?: Option[]
}

export const SimpleToolbarHeight = 40
export function SimpleToolbar(props: SimpleToolbarProps) {
    const theme = useContext(ThemeContext)
    var HomeIcon = getIcon(props.homeIcon)
    let insets
    try {
        insets = useSafeAreaInsets()
    } catch (e: any) {
        if (!theme.insets)
            console.warn('Unable to useSafeAreaInsets. Please set theme.insets =  useSafeAreaInsets(). ' + e.message)
        insets = theme.insets || theme.styles.safeAreaInset
    }

    return (
        <HBox style={[isWeb() ? {
            paddingTop: theme.dimens.space.lg,
            paddingBottom: theme.dimens.space.lg,
            backgroundColor: props.backgroundColor || theme.colors.accent,
            minHeight: SimpleToolbarHeight * (isDesktop() ? 1.3 : 1.25),
        } : {
            paddingTop: insets.top,
            paddingBottom: theme.dimens.space.lg,
            backgroundColor: props.backgroundColor || theme.colors.accent,
            minHeight: SimpleToolbarHeight,
        }, props.style]}>
            {
                !props.hideStatusBar && <StatusBar
                    animated={true}
                    backgroundColor={props.statusbarBackgroundColor || props.backgroundColor || theme.colors.accent}
                />
            }
            <HBox style={{
                left: 0,
                paddingStart: HomeIcon ? 0 : theme.dimens.space.sm,
                justifyContent: HomeIcon ? 'center' : 'flex-start',
                alignSelf: 'center',
                position: 'absolute',
                width: '100%',
            }}>
                <TextView style={[{
                    fontWeight: 'bold',
                    color: props.forgroundColor || theme.colors.invert.text
                }, props.textStyle]} >
                    {props.title}
                </TextView>
            </HBox>

            <HBox style={{
                paddingLeft: theme.dimens.space.md,
                alignSelf: 'center',
                alignContent: 'center',
                position: 'absolute',
                justifyContent: 'space-between',
                width: '99.9%',
            }}>
                <Center style={{
                    paddingLeft: theme.dimens.space.sm,
                    margin: 0,
                }}>
                    <PressableView onPress={() => {
                        theme.onTrack(TrackingActionType.CLICK, TrackingViewType.TOOLBAR, 'back')
                        props.onHomePress && props.onHomePress()
                    }}>
                        {HomeIcon && <HomeIcon color={props.forgroundColor || theme.colors.invert.text} />}
                    </PressableView>
                </Center>
                <HBox style={{
                    alignItems: 'center',
                    marginRight: isWeb() ? theme.dimens.space.sm : theme.dimens.space.md
                }}>
                    {
                        props.options?.map((opt) => {
                            let ActionIcon = getIcon(opt.icon)
                            let title = opt.title || opt.id
                            return (
                                <PressableView
                                    style={{
                                        padding: theme.dimens.space.md
                                    }}
                                    key={opt.id}
                                    accessibilityHint={title}
                                    onPress={() => {
                                        theme.onTrack(TrackingActionType.CLICK, TrackingViewType.TOOLBAR, 'option-' + opt.id)
                                        opt.onClick && opt.onClick(opt.id)
                                    }}>
                                    <ActionIcon
                                        color={props.forgroundColor || theme.colors.invert.text}
                                        style={{
                                            paddingLeft: theme.dimens.space.sm
                                        }} />
                                </PressableView>
                            )
                        })
                    }
                </HBox>
            </HBox>
        </HBox>
    )
}


export function TransparentCenterToolbar(props: SimpleToolbarProps) {
    const theme = useContext(ThemeContext)
    return (
        <SimpleToolbar
            {...props}
            style={[{
                width: '100%'
            }, props.style]}
            textStyle={{
                color: theme.colors.text
            }}
            homeIcon={props.homeIcon || ""}
            title={props.title}
            backgroundColor={theme.colors.transparent}
        />
    )
}

export function BottomNavBar(props: ViewProps &
{
    options: Option[],
    selectedId: string,
    onSelect: (id: string) => void,
    onDimens?: (width: number, height: number) => void
}) {
    const theme = useContext(ThemeContext)
    const onDimens = props.onDimens
    const hasText = props.options?.find((op) => {
        return op.title != undefined
    })
    function getItem(op: Option) {
        const color = props.selectedId == op.id ? theme.colors.accent : theme.colors.text
        const ItemIcon = getIcon(op.icon)
        const title = op.title || (hasText ? op.id : undefined)
        return (
            <PressableView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                    paddingTop: !hasText ? theme.dimens.space.lg : theme.dimens.space.md,
                    paddingBottom: !hasText ? theme.dimens.space.lg : theme.dimens.space.md,
                }}
                key={op.id}
                onPress={() => {
                    op.onClick && op.onClick(op.id)
                    theme.onTrack(TrackingActionType.CLICK, TrackingViewType.BOTTOMBAR, 'option-' + op.id)
                    props.onSelect(op.id)
                }}>
                <Center >
                    {op.icon && <ItemIcon color={color} />}
                    {title &&
                        <TextView style={{
                            fontSize: theme.dimens.font.sm,
                            color: color
                        }}>{title}</TextView>}
                </Center>
            </PressableView>
        )
    }
    if (!props.options || props.options?.length == 0) {
        return null
    }
    return (
        <HBox
            onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                onDimens && onDimens(width, height)
            }}
            {...props}
            style={[{
                borderWidth: 3,
                borderColor: theme.colors.background,
                borderRadius: theme.dimens.space.md,
                width: isDesktop() ? '50%' : '100%',
                position: 'absolute',
                bottom: 0,
                left: isDesktop() ? '25%' : 0,
                right: isDesktop() ? '25%' : 0,
                flex: 1,
                margin: 0,
                marginBottom: theme?.insets?.bottom || 0,
                backgroundColor: theme.colors.forground,
                zIndex: 100,
                justifyContent: 'space-around',
            }, props.style]}
        >
            {
                props.options?.map(op => {
                    return getItem(op)
                })
            }
        </HBox>
    )

}



export type DividerProps = ViewProps & {
    text?: string
}
export function DividerView(props: DividerProps) {

    const theme = useContext(ThemeContext)
    return (
        <Center style={{
            marginTop: theme.dimens.space.md,
            marginBottom: theme.dimens.space.md,
            flexDirection: "row",
            width: '100%',
            justifyContent: 'space-between'
        }}
            {...props}
        >
            <View style={{
                backgroundColor: theme.colors.caption,
                width: props?.text ? '40%' : '50%',
                height: 0.1
            }} />
            {
                props?.text &&
                <Caption>
                    {props.text}
                </Caption>
            }
            <View style={{
                backgroundColor: theme.colors.caption,
                width: props?.text ? '40%' : '50%',
                height: 0.1
            }} />
        </Center>
    )
}


export type ProgressBarViewProps = ViewProps & {
    progress: number
    progressColor?: String
    pendingColor?: String
}

export function ProgressBarView(props: ProgressBarViewProps) {
    const { progress } = props
    const theme = useContext(ThemeContext)
    return (
        <View style={[{
            marginTop: theme.dimens.space.md,
            flexDirection: 'row',
            height: theme.dimens.icon.sm / 3,
            width: '100%',
            backgroundColor: '#d3d3d3',
            borderRadius: 5,
            overflow: 'hidden',
        }, props.style]}>
            <View style={{
                width: `${progress}%`,
                backgroundColor: `${props.progressColor || theme.colors.accentLight}`,
            }} />
            <View style={{
                width: `${100 - progress}%`,
                backgroundColor: `${props.pendingColor || theme.colors.background}`,
            }} />
        </View>
    );
}
