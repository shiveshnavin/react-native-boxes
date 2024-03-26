import { useContext } from "react";
import { TextProps, Text } from "react-native";
import { ThemeContext } from "./ThemeContext";

export function TextView(props: TextProps) {
    const theme = useContext(ThemeContext)
    return (
        <Text {...props}
            style={[{
                flexWrap: 'wrap',
                color: theme.colors.text,
                padding: theme.dimens.space.sm
            }, theme.styles.text, props.style]} />
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