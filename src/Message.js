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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertMessage = void 0;
const Box_1 = require("./Box");
const React = __importStar(require("react"));
const react_1 = require("react");
const ThemeContext_1 = require("./ThemeContext");
const FontAwesome_1 = __importDefault(require("@expo/vector-icons/FontAwesome"));
const react_native_1 = require("react-native");
const Text_1 = require("./Text");
function AlertMessage(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const type = props.type || 'info';
    //@ts-ignore
    let icon = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'info-circle',
        'critical': 'warning'
    }[type];
    let color = {
        'info': '#2196F3',
        'success': '#4CAF50',
        'warning': '#FFC107',
        'critical': '#F44336'
    }[type];
    if (!props.text || props.text.length < 1) {
        return undefined;
    }
    return (<Box_1.HBox style={[{
                flex: 1,
                margin: theme.dimens.space.sm,
                backgroundColor: theme.colors[type] || color,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingStart: theme.dimens.space.md,
                paddingEnd: theme.dimens.space.md,
                paddingBottom: props.text.length > 40 && react_native_1.Platform.OS == 'web' ?
                    theme.dimens.space.lg : theme.dimens.space.md,
                paddingTop: props.text.length > 40 && react_native_1.Platform.OS == 'web' ?
                    theme.dimens.space.lg : theme.dimens.space.md,
                borderRadius: theme.dimens.space.sm,
            }, props.style]}>

            <Box_1.HBox style={{
            flex: 0.93,
            alignItems: 'center',
        }}>
                <FontAwesome_1.default style={{
            marginRight: theme.dimens.space.md
        }} name={icon} size={theme.dimens.icon.md} color={theme.colors.invert.text}/>
                <Text_1.TextView style={{
            flexShrink: 1,
            padding: 0,
            color: theme.colors.invert.text,
        }}>{props.text}
                </Text_1.TextView>
            </Box_1.HBox>
            {props.onDismiss && <react_native_1.Pressable style={{
                flexDirection: 'row-reverse',
                flex: 0.06,
            }} onPress={() => {
                props.onDismiss && props.onDismiss();
            }}>
                    <FontAwesome_1.default name={'close'} size={theme.dimens.icon.md} color={theme.colors.invert.text}/>
                </react_native_1.Pressable>}
        </Box_1.HBox>);
}
exports.AlertMessage = AlertMessage;
//# sourceMappingURL=Message.js.map