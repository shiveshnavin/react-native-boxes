"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VPage = exports.Center = exports.HBox = exports.VBox = exports.Box = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const ThemeContext_1 = require("./ThemeContext");
const React = __importStar(require("react"));
const react_native_2 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const utils_1 = require("./utils");
function Box(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<react_native_1.View {...props} style={[
            {
                padding: theme.dimens.space.xs,
                backgroundColor: theme.randomColor() || 'transparent'
            },
            props.style
        ]}/>);
}
exports.Box = Box;
function VBox(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<Box {...props} style={[
            {
                flexDirection: 'column',
                backgroundColor: theme.randomColor() || 'transparent'
            },
            props.style
        ]}/>);
}
exports.VBox = VBox;
function HBox(props) {
    return (<VBox {...props} style={[
            {
                flexDirection: 'row',
            },
            props.style
        ]}/>);
}
exports.HBox = HBox;
function Center(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<Box {...props} style={[{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.randomColor() || 'transparent'
            },
            props.style]}/>);
}
exports.Center = Center;
function VPage(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<VBox {...props} style={[
            {
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0,
            },
            props.style
        ]}/>);
}
exports.VPage = VPage;
/**
 * Must be wrapped with SafeAreaView somewhere in parent tree
 * @param param0
 * @returns
 */
const KeyboardAvoidingScrollView = (props) => {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    let insets;
    try {
        insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    }
    catch (e) {
        if (!theme.insets)
            console.warn('Unable to useSafeAreaInsets. Please set theme.insets =  useSafeAreaInsets(). ' + e.message);
        insets = theme.insets || theme.styles.safeAreaInset;
    }
    if ((0, utils_1.isWeb)()) {
        return <react_native_2.ScrollView showsVerticalScrollIndicator={false} {...props}/>;
    }
    return (<react_native_2.KeyboardAvoidingView style={props.style} behavior="padding" enabled keyboardVerticalOffset={insets.top}>
            <react_native_2.ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} {...props}/>
        </react_native_2.KeyboardAvoidingView>);
};
exports.default = KeyboardAvoidingScrollView;
//# sourceMappingURL=Box.js.map