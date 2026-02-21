import { HBox } from "./Box";
import * as React from "react";
import { useContext } from 'react'
import { ThemeContext } from "./ThemeContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Platform, Pressable, Text, ViewProps, ViewStyle } from "react-native";
import { TextView } from "./Text";
import { isDesktop } from "./utils";
import { TransparentButton } from "./Button";



export function AlertMessage(props:
    {
        text: string,
        type?: 'info' | 'success' | 'warning' | 'critical',
        color?: string,
        onDismiss?: () => void
        action?: React.ReactNode
        style?: ViewStyle
        onPress?: () => void
    }) {
    const theme = useContext(ThemeContext)
    const type = props.type || 'info'
    //@ts-ignore
    let icon: 'info-circle' | 'warning' = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'info-circle',
        'critical': 'warning'
    }[type]

    let color = {
        'info': '#2196F3',
        'success': '#4CAF50',
        'warning': '#FFC107',
        'critical': '#F44336'
    }[type];
    let colorType = theme.colors[type] || color
    let textColor = theme.name != 'dark' && type == 'warning' ? theme.colors.text : colorType;
    if (!props.text || props.text.length < 1) {
        return undefined
    }

    return (
        <HBox style={[{
            minHeight: isDesktop() ? undefined : '10%',
            margin: theme.dimens.space.sm,
            borderColor: colorType,
            borderWidth: theme.dimens.space.xs,
            backgroundColor: colorType + "1A",
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingStart: theme.dimens.space.md,
            paddingEnd: theme.dimens.space.md,
            paddingBottom: props.text.length > 40 && Platform.OS == 'web' ?
                theme.dimens.space.lg : theme.dimens.space.md,
            paddingTop: props.text.length > 40 && Platform.OS == 'web' ?
                theme.dimens.space.lg : theme.dimens.space.md,
            borderRadius: theme.dimens.space.md,
        }, props.style]}>

            <HBox style={{
                flex: 0.93,
                alignItems: 'center',
            }}>
                <FontAwesome
                    style={{
                        marginRight: theme.dimens.space.md
                    }}
                    name={icon}
                    size={theme.dimens.icon.md}
                    color={props.color || textColor} />
                <TextView style={{
                    flexShrink: 1,
                    padding: 0,
                    color: props.color || textColor,
                }}>{props.text}
                </TextView>
            </HBox>
            {props.action}
            {
                props.onDismiss && <Pressable
                    style={{
                        flexDirection: 'row-reverse',
                        flex: 0.06,
                    }}
                    onPress={() => {
                        props.onDismiss && props.onDismiss()
                    }}>
                    <FontAwesome name={'close'}
                        size={theme.dimens.icon.md}
                        color={theme.colors.text} />
                </Pressable>
            }
        </HBox>
    )
}
