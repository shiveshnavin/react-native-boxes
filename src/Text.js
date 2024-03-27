"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caption = exports.Title = exports.Subtitle = exports.TextView = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const ThemeContext_1 = require("./ThemeContext");
function TextView(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    let children = props.children;
    if (theme.i18n && !props.skipI18n) {
        if (children && typeof children == 'string') {
            children = theme.i18n.t(children);
        }
    }
    return (<react_native_1.Text {...props} style={[{
                flexWrap: 'wrap',
                color: theme.colors.text,
                padding: theme.dimens.space.sm
            }, theme.styles.text, props.style]}>
            {children}
        </react_native_1.Text>);
}
exports.TextView = TextView;
function Subtitle(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<TextView {...props} style={[
            {
                fontSize: theme.dimens.font.lg,
                color: theme.colors.text
            },
            props.style
        ]}/>);
}
exports.Subtitle = Subtitle;
function Title(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<TextView {...props} style={[
            {
                fontSize: theme.dimens.font.xl,
                color: theme.colors.heading
            },
            props.style
        ]}/>);
}
exports.Title = Title;
function Caption(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<TextView {...props} style={[
            {
                fontSize: theme.dimens.font.sm,
                color: theme.colors.caption
            },
            props.style
        ]}/>);
}
exports.Caption = Caption;
//# sourceMappingURL=Text.js.map