"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStyle = exports.extendValues = exports.DarkColors = exports.LightColors = exports.Colors = exports.Fonts = exports.Dimens = void 0;
const react_native_1 = require("react-native");
exports.Dimens = {
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
};
exports.Fonts = {
    Regular: 'Regular',
    Bold: 'Bold',
    Styled: 'Styled',
};
exports.Colors = {
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
    successBackground: '#388E3C',
    warning: '#FFA726',
    critical: '#F44336',
    invert: {
        text: '#fff',
        caption: '#fff',
        heading: '#fff',
        background: '#1a1a1c'
    }
};
exports.LightColors = exports.Colors;
exports.DarkColors = {
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
    successBackground: '#388E3C',
    warning: '#FFA726',
    critical: '#F44336',
    invert: {
        text: '#fff',
        caption: '#fff',
        heading: '#fff',
        background: '#E6E6E6'
    }
};
function extendValues(dimens, colors, fonts) {
    return {
        dimens: Object.assign(dimens || {}, exports.Dimens),
        colors: Object.assign(colors || {}, exports.Colors),
        fonts: Object.assign(fonts || {}, exports.Fonts),
    };
}
exports.extendValues = extendValues;
function createStyle(dimens, colors, fonts) {
    const Styles = react_native_1.StyleSheet.create({
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
    return Styles;
}
exports.createStyle = createStyle;
//# sourceMappingURL=Styles.js.map