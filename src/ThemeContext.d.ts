import { Colors, Dimens, Fonts } from "./Styles";
import { randomColor } from "./utils";
import { I18n } from "./I18n";
import { EdgeInsets } from "react-native-safe-area-context";
declare const DEFAULT_STYLE: {
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
export declare class Theme {
    appname: string;
    styles: typeof DEFAULT_STYLE;
    dimens: typeof Dimens;
    colors: typeof Colors;
    fonts: typeof Fonts;
    i18n: I18n;
    insets?: EdgeInsets;
    randomColor: typeof randomColor;
    constructor(appname?: string, colors?: {
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
    }, dimens?: {
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
    }, fonts?: {
        Regular: string;
        Bold: string;
        Styled: string;
    }, styles?: {
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
    }, i18n?: I18n);
    setInsets(insets: EdgeInsets): void;
}
export declare const ThemeContext: import("react").Context<Theme>;
export {};
