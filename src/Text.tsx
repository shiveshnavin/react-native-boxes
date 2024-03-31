import { useContext } from "react";
import { TextProps, Text } from "react-native";
import { ThemeContext } from "./ThemeContext";

export type TextViewProps = TextProps & {
    skipI18n?: boolean
}
export function TextView(props: TextViewProps) {
    const theme = useContext(ThemeContext)
    let children = props.children
    if (theme.i18n && !props.skipI18n) {
        if (children && typeof children == 'string') {
            children = theme.i18n.t(children)
        }
    }
    return (
        <Text {...props}
            style={[{
                flexWrap: 'wrap',
                color: theme.colors.text,
                padding: theme.dimens.space.sm
            }, theme.styles.text, props.style]} >
            {children}
        </Text>
    )
}


export function Subtitle(props: TextProps) {
    const theme = useContext(ThemeContext)
    return (
        <TextView {...props} style={[
            {
                fontSize: theme.dimens.font.lg,
                color: theme.colors.text
            },
            props.style
        ]} />
    )
}


export function Title(props: TextProps) {
    const theme = useContext(ThemeContext)
    return (
        <TextView {...props} style={[
            {
                fontSize: theme.dimens.font.xl,
                color: theme.colors.heading
            },
            props.style
        ]} />
    )
}

export function Caption(props: TextProps) {
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