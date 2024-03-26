import { Image, Pressable, ViewProps } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Center } from "./Box";
import { Subtitle } from "./Text";

export type IconProps = {
    name: any,
    size?: number,
    color?: string
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


export function getIcon(input: any) {
    if (input == undefined) {
        return undefined
    }
    if (typeof input == 'string') {
        return (props: IconProps) => {
            return (
                <Icon  {...props} name={props.name || input} />
            )
        }
    }
    return input
}
