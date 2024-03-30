import { useContext } from "react";
import { ScrollViewProps, View, ViewProps } from "react-native";
import { ThemeContext } from "./ThemeContext";
import * as React from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isWeb } from "./utils";

export function Box(props: ViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <View
            {...props}
            style={[
                {
                    padding: theme.dimens.space.xs,
                    backgroundColor: theme.randomColor() || 'transparent'
                },
                props.style
            ]} />
    )
}

export function VBox(props: ViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <Box  {...props} style={[
            {
                flexDirection: 'column',
                backgroundColor: theme.randomColor() || 'transparent'
            },
            props.style
        ]} />
    )
}

export function HBox(props: ViewProps) {

    return (
        <VBox {...props} style={[
            {
                flexDirection: 'row',
            },
            props.style
        ]} />
    )
}

export function Center(props: ViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <Box
            {...props}
            style={[{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.randomColor() || 'transparent'
            },
            props.style]} />
    )
}


export function VPage(props: ViewProps) {
    const theme = useContext(ThemeContext)
    return (
        <VBox  {...props} style={[
            {
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0,
                backgroundColor: theme.colors.background,
            },
            props.style
        ]} />
    )
}

/**
 * Must be wrapped with SafeAreaView somewhere in parent tree
 * @param param0 
 * @returns 
 */
const KeyboardAvoidingScrollView: React.FC<ScrollViewProps> = (props: ScrollViewProps) => {
    const theme = useContext(ThemeContext)
    let insets
    try {
        insets = useSafeAreaInsets()
    } catch (e: any) {
        if (!theme.insets)
            console.warn('Unable to useSafeAreaInsets. Please set theme.insets =  useSafeAreaInsets(). ' + e.message)
        insets = theme.insets || theme.styles.safeAreaInset
    }
    if (isWeb()) {
        return <ScrollView
            showsVerticalScrollIndicator={false}
            {...props} />
    }
    return (
        <KeyboardAvoidingView
            style={props.style}
            behavior="padding" enabled
            keyboardVerticalOffset={insets.top}
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                {...props} />
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingScrollView