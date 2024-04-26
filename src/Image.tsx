import { ActivityIndicator, ActivityIndicatorProps, Image, Pressable, ViewProps } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useContext } from "react";
import { Theme, ThemeContext } from "./ThemeContext";
import { Center } from "./Box";
import { Subtitle } from "./Text";

export type IconProps = {
    name: any,
    size?: number,
    color?: string,
    onPress?: () => void
}
export function Icon(props: ViewProps & IconProps) {
    const theme = useContext(ThemeContext)
    return (
        <FontAwesome {...props}
            size={props.size || theme.dimens?.icon?.md}
            color={props.color || theme.colors?.text}
        />
    )
}


/**
 * 
 * @param props provide one of iconUrl , iconName , iconText
 * @returns 
 */
export function Avatar(props: ViewProps & {
    onPress?: Function,
    iconUrl?: string,
    iconName?: string,
    iconText?: string,
    iconNameProps?: IconProps,
    style?: any
}) {
    const theme = useContext(ThemeContext)
    const view = <Center style={[{
        margin: theme.dimens.space.sm,
        overflow: 'hidden',
        borderRadius: 100,
        width: theme.dimens.icon.xl,
        height: theme.dimens.icon.xl,
        borderWidth: theme.dimens.space.xs * 2,
        borderStyle: 'solid',
        borderColor: theme.colors.accentLight,
        backgroundColor: theme.colors.forground,
    }, props.style]}>
        <Center style={{
            width: '110%',
            height: '110%',
        }}>
            {
                (() => {
                    if (props.iconUrl)
                        return (
                            <Image
                                style={{
                                    width: '120%',
                                    height: '120%',
                                }}
                                source={{
                                    uri: props.iconUrl,
                                }}
                            />)
                    if (props.iconName || props.iconNameProps?.name)
                        return (
                            <Icon
                                name={props.iconName || props.iconNameProps?.name}
                                {...props.iconNameProps} />
                        )
                    if (props.iconText)
                        return (
                            <Subtitle style={{
                                color: props.style?.color || theme.colors.accentLight,
                            }}>{props.iconText?.substring(0, 2)}</Subtitle>
                        )
                })()
            }
        </Center>
    </Center>
    if (props.onPress)
        return (
            <Pressable onPress={() => {
                if (props.onPress)
                    props.onPress()
            }}>
                {view}
            </Pressable>
        )
    return view
}


export function getIcon(Input: any, wrap?: boolean): any {
    if (Input == undefined) {
        return undefined
    }
    if (typeof Input == 'string') {
        return (props: IconProps) => {
            return (
                <Icon  {...props} name={props.name || Input} />
            )
        }
    }
    return (props: any) => {
        return <>
            {Input}
        </>

    }
}


export function Spinner(props: ActivityIndicatorProps) {
    const theme = useContext(ThemeContext)
    return (
        <ActivityIndicator
            size={theme.dimens.icon.md}
            color={theme.colors.accent}
            {...props}
        />
    )
}


export function StatusIcon(props: { status: string | any, colorMap?: { status: string | any, icon: string, color: string }[] } & ViewProps) {
    const theme = useContext(ThemeContext)
    let color = theme.colors.info
    let icon = 'check'
    let fromColorMap = undefined
    if (props.colorMap) {
        fromColorMap = props.colorMap.find(mp => mp.status == props.status)
    }
    if (fromColorMap) {
        color = fromColorMap.color
        icon = fromColorMap.icon
    }
    else if (props.status == 'SUCCESS') {
        icon = 'check'
        color = theme.colors.success
    } else if (props.status == 'FAILED') {
        icon = 'close'
        color = theme.colors.critical
    } else if (props.status == 'PARTIAL_SUCCESS') {
        icon = 'warning'
        color = theme.colors.warning
    } else if (props.status == 'IN_PROGRESS') {
        icon = 'play'
        color = theme.colors.accent
    } else if (props.status == 'PAUSED') {
        icon = 'pause'
        color = theme.colors.text
    } else {
        icon = 'info'
        color = theme.colors.text
    }

    return (
        <Icon  {...props} name={icon} color={color} style={[{
            paddingRight: theme.dimens.space.md
        }, props.style]} />
    )
}