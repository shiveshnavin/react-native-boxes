"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIcon = exports.Avatar = exports.Icon = void 0;
const react_native_1 = require("react-native");
const FontAwesome_1 = __importDefault(require("@expo/vector-icons/FontAwesome"));
const react_1 = require("react");
const ThemeContext_1 = require("./ThemeContext");
const Box_1 = require("./Box");
const Text_1 = require("./Text");
function Icon(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<FontAwesome_1.default {...props} size={props.size || theme.dimens?.icon?.md} color={props.color || theme.colors?.text}/>);
}
exports.Icon = Icon;
/**
 *
 * @param props provide one of iconUrl , iconName , iconText
 * @returns
 */
function Avatar(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const view = <Box_1.Center style={[{
                margin: theme.dimens.space.sm,
                overflow: 'hidden',
                borderRadius: 100,
                width: theme.dimens.icon.xl,
                height: theme.dimens.icon.xl,
                borderWidth: theme.dimens.space.xs * 2,
                borderStyle: 'solid',
                borderColor: theme.colors.accentLight,
                backgroundColor: theme.colors.forground,
            }, props.style]}>
        <Box_1.Center style={{
            width: '110%',
            height: '110%',
        }}>
            {(() => {
            if (props.iconUrl)
                return (<react_native_1.Image style={{
                        width: '120%',
                        height: '120%',
                    }} source={{
                        uri: props.iconUrl,
                    }}/>);
            if (props.iconName || props.iconNameProps?.name)
                return (<Icon name={props.iconName || props.iconNameProps?.name} {...props.iconNameProps}/>);
            if (props.iconText)
                return (<Text_1.Subtitle style={{
                        color: props.style?.color || theme.colors.accentLight,
                    }}>{props.iconText?.substring(0, 2)}</Text_1.Subtitle>);
        })()}
        </Box_1.Center>
    </Box_1.Center>;
    if (props.onPress)
        return (<react_native_1.Pressable onPress={() => {
                if (props.onPress)
                    props.onPress();
            }}>
                {view}
            </react_native_1.Pressable>);
    return view;
}
exports.Avatar = Avatar;
function getIcon(Input, wrap) {
    if (Input == undefined) {
        return undefined;
    }
    if (typeof Input == 'string') {
        return (props) => {
            return (<Icon {...props} name={props.name || Input}/>);
        };
    }
    return (props) => {
        return <>
            {Input}
        </>;
    };
}
exports.getIcon = getIcon;
//# sourceMappingURL=Image.js.map