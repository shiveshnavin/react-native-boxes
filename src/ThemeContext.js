"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeContext = exports.Theme = void 0;
const react_1 = require("react");
const Styles_1 = require("./Styles");
const utils_1 = require("./utils");
const I18n_1 = require("./I18n");
const DEFAULT_STYLE = (0, Styles_1.createStyle)(Styles_1.Dimens, Styles_1.Colors, Styles_1.Fonts);
class Theme {
    appname = '';
    styles;
    dimens;
    colors;
    fonts;
    i18n;
    insets;
    randomColor = utils_1.randomColor;
    constructor(appname = '', colors = Styles_1.Colors, dimens = Styles_1.Dimens, fonts = Styles_1.Fonts, styles = DEFAULT_STYLE, i18n = I18n_1._i18n) {
        this.appname = appname;
        this.fonts = fonts ?? Styles_1.Fonts;
        this.colors = colors ?? Styles_1.Colors;
        this.dimens = dimens ?? Styles_1.Dimens;
        this.fonts = fonts ?? Styles_1.Fonts;
        this.styles = styles ?? (0, Styles_1.createStyle)(this.dimens, this.colors, this.fonts);
        this.i18n = i18n;
    }
    setInsets(insets) {
        this.insets = insets;
    }
}
exports.Theme = Theme;
exports.ThemeContext = (0, react_1.createContext)(new Theme());
//# sourceMappingURL=ThemeContext.js.map