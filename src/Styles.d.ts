export declare const Dimens: {
    space: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    font: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    icon: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
};
export declare const Fonts: {
    Regular: string;
    Bold: string;
    Styled: string;
};
export declare const Colors: {
    accent: string;
    accentLight: string;
    text: string;
    caption: string;
    heading: string;
    background: string;
    forground: string;
    transparent: string;
    semitransparent: string;
    info: string;
    success: string;
    warning: string;
    critical: string;
    invert: {
        text: string;
        caption: string;
        heading: string;
        background: string;
    };
};
export declare const LightColors: {
    accent: string;
    accentLight: string;
    text: string;
    caption: string;
    heading: string;
    background: string;
    forground: string;
    transparent: string;
    semitransparent: string;
    info: string;
    success: string;
    warning: string;
    critical: string;
    invert: {
        text: string;
        caption: string;
        heading: string;
        background: string;
    };
};
export declare const DarkColors: {
    accent: string;
    accentLight: string;
    text: string;
    caption: string;
    heading: string;
    background: string;
    forground: string;
    transparent: string;
    semitransparent: string;
    info: string;
    success: string;
    warning: string;
    critical: string;
    invert: {
        text: string;
        caption: string;
        heading: string;
        background: string;
    };
};
export declare function extendValues(dimens: typeof Dimens, colors: typeof Colors, fonts: typeof Fonts): {
    dimens: typeof Dimens;
    colors: typeof Colors;
    fonts: typeof Fonts;
};
export declare function createStyle(dimens: typeof Dimens, colors: typeof Colors, fonts: typeof Fonts): {
    safeAreaInset: {
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    container: {
        marginTop: number;
        backgroundColor: string;
    };
    center: {
        alignContent: "center";
        justifyContent: "center";
    };
    textHead: {
        color: string;
        fontSize: number;
    };
    text: {
        fontFamily: string;
        fontSize: number;
    };
};
