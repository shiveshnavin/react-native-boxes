import { useContext } from "react";
import { TextProps, Text } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { TrackerUtils, TrackingActionType, TrackingViewType } from "./Analytics";

export type TextViewProps = TextProps & {
    skipI18n?: boolean
    value?: string
    text?: string
    analyticsId?: string
    analyticsExtras?: any
}
export function TextView(props: TextViewProps) {
    const theme = useContext(ThemeContext)
    const { analyticsId, analyticsExtras, skipI18n, value: valueProp, text: textProp, onPress, children: childrenProp, ...textProps } = props
    let children = childrenProp
    let value = valueProp
    let text = textProp
    if (theme.i18n && !skipI18n) {
        if (children && typeof children == 'string') {
            children = theme.i18n.t(children)
        }
        if (value) {
            value = theme.i18n.t(value)
        }
        if (text) {
            text = theme.i18n.t(text)
        }
    }
    return (
        <Text {...textProps}
            testID={analyticsId}
            //@ts-ignore
            nativeID={analyticsId}
            onPress={onPress ? (e) => {
                onPress(e)
                theme.onTrack(
                    TrackingActionType.CLICK,
                    TrackingViewType.TEXT,
                    TrackerUtils.textOrAnalyticsId(analyticsId, children || text || value),
                    analyticsExtras
                )
            } : undefined}
            style={[{
                flexWrap: 'wrap',
                color: theme.colors.text,
                padding: theme.dimens.space.sm
            }, theme.styles.text, textProps.style]} >
            {children || text || value}
        </Text>
    )
}


export function Subtitle(props: TextViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <TextView {...props} style={[
            {
                fontSize: theme.dimens.font.lg,
                color: theme.colors.text
            },
            theme.styles.Subtitle,
            props.style
        ]} />
    )
}


export function Title(props: TextViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <TextView {...props} style={[
            {
                fontSize: theme.dimens.font.xl,
                color: theme.colors.heading
            },
            theme.styles.Title,
            props.style
        ]} />
    )
}

export function Caption(props: TextViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <TextView {...props} style={[
            {
                fontSize: theme.dimens.font.sm,
                color: theme.colors.caption
            },
            props.style
        ]} />
    )
}


export function TitleText(props: TextViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <TextView {...props} style={[
            theme.styles.TitleText,
            props.style
        ]} />
    )
}
