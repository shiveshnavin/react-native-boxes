import { StyleSheet } from "react-native";

export const Dimens = {
    space: {
        xs: 1,
        sm: 5,
        md: 10,
        lg: 20,
        xl: 50,
    },
    font: {
        sm: 12,
        md: 14,
        lg: 16,
        xl: 24,
    },
    icon: {
        sm: 12,
        md: 20,
        lg: 30,
        xl: 50,
        xxl: 80,
    }
}

export const Fonts = {
    Regular: 'Regular',
    Bold: 'Bold',
    Styled: 'Styled',
}

export const Colors = {
    accent: '#1976D2',
    accentLight: '#2196F3',
    text: '#444444',
    caption: '#A9A9A9',
    heading: '#222222',
    background: '#E6E6E6',
    forground: '#fff',
    transparent: 'transparent',
    semitransparent: '#111a1a1c',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFA726',
    critical: '#F44336',
    invert: {
        text: '#fff',
        caption: '#fff',
        heading: '#fff',
        background: '#1a1a1c'
    }
}

export const LightColors = Colors

export const DarkColors = {
    accent: '#1976D2',
    accentLight: '#2196F3',
    text: '#f2f2f2',
    caption: '#565656',
    heading: '#dddddd',
    background: '#212121',
    forground: '#191919',
    transparent: 'transparent',
    semitransparent: '#111a1a1c',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFA726',
    critical: '#F44336',
    invert: {
        text: '#444444',
        caption: '#A9A9A9',
        heading: '#222222',
        background: '#E6E6E6',
        forground: '#fff'
    }
}

export function extendValues(
    dimens: typeof Dimens,
    colors: typeof Colors,
    fonts: typeof Fonts): {
        dimens: typeof Dimens,
        colors: typeof Colors,
        fonts: typeof Fonts
    } {
    return {
        dimens: Object.assign(dimens || {}, Dimens),
        colors: Object.assign(colors || {}, Colors),
        fonts: Object.assign(fonts || {}, Fonts),
    }
}

export function createStyle(
    dimens: typeof Dimens,
    colors: typeof Colors,
    fonts: typeof Fonts) {

    const Styles = StyleSheet.create({
        safeAreaInset: {
            top: dimens.space.md,
            left: 0,
            right: 0,
            bottom: dimens.space.md,
        },
        full: {
            height: '100%',
            width: '100%'
        },
        container: {
            marginTop: dimens.space.xl,
            backgroundColor: colors.background,
        },
        center: {
            alignContent: 'center',
            justifyContent: 'center'
        },
        textHead: {
            color: colors.text,
            fontSize: dimens.font.xl,
        },
        text: {
            fontFamily: fonts.Regular,
            fontSize: dimens.font.md,
        }
    });
    return Styles
}