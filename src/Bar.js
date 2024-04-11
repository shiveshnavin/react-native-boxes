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
exports.BottomNavBar = exports.TransparentCenterToolbar = exports.SimpleToolbar = exports.SimpleToolbarHeight = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const ThemeContext_1 = require("./ThemeContext");
const React = __importStar(require("react"));
const Box_1 = require("./Box");
const Text_1 = require("./Text");
const Image_1 = require("./Image");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const Button_1 = require("./Button");
const utils_1 = require("./utils");
exports.SimpleToolbarHeight = 40;
function SimpleToolbar(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    var HomeIcon = (0, Image_1.getIcon)(props.homeIcon);
    let insets;
    try {
        insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    }
    catch (e) {
        if (!theme.insets)
            console.warn('Unable to useSafeAreaInsets. Please set theme.insets =  useSafeAreaInsets(). ' + e.message);
        insets = theme.insets || theme.styles.safeAreaInset;
    }
    return (<Box_1.HBox style={[(0, utils_1.isWeb)() ? {
                paddingTop: theme.dimens.space.lg,
                paddingBottom: theme.dimens.space.lg,
                backgroundColor: props.backgroundColor || theme.colors.accent,
                minHeight: exports.SimpleToolbarHeight * ((0, utils_1.isDesktop)() ? 1.3 : 1.25),
            } : {
                paddingTop: insets.top,
                paddingBottom: theme.dimens.space.lg,
                backgroundColor: props.backgroundColor || theme.colors.accent,
                minHeight: exports.SimpleToolbarHeight,
            }, props.style]}>
            {!props.hideStatusBar && <react_native_1.StatusBar animated={true} backgroundColor={props.statusbarBackgroundColor || props.backgroundColor || theme.colors.accent}/>}
            <Box_1.HBox style={{
            left: 0,
            paddingStart: HomeIcon ? 0 : theme.dimens.space.sm,
            justifyContent: HomeIcon ? 'center' : 'flex-start',
            alignSelf: 'center',
            position: 'absolute',
            width: '100%',
        }}>
                <Text_1.TextView style={[{
                fontWeight: 'bold',
                color: props.forgroundColor || theme.colors.invert.text
            }, props.textStyle]}>
                    {props.title}
                </Text_1.TextView>
            </Box_1.HBox>

            <Box_1.HBox style={{
            paddingLeft: theme.dimens.space.md,
            alignSelf: 'center',
            alignContent: 'center',
            position: 'absolute',
            justifyContent: 'space-between',
            width: '99.9%',
        }}>
                <Box_1.Center style={{
            paddingLeft: theme.dimens.space.sm,
            margin: 0,
        }}>
                    <Button_1.PressableView onPress={() => {
            props.onHomePress && props.onHomePress();
        }}>
                        {HomeIcon && <HomeIcon color={props.forgroundColor || theme.colors.invert.text}/>}
                    </Button_1.PressableView>
                </Box_1.Center>
                <Box_1.HBox style={{
            alignItems: 'center',
            marginRight: (0, utils_1.isWeb)() ? theme.dimens.space.sm : theme.dimens.space.md
        }}>
                    {props.options?.map((opt) => {
            let ActionIcon = (0, Image_1.getIcon)(opt.icon);
            let title = opt.title || opt.id;
            return (<Button_1.PressableView style={{
                    paddingStart: theme.dimens.space.md
                }} key={opt.id} accessibilityHint={title} onPress={() => {
                    opt.onClick && opt.onClick(opt.id);
                }}>
                                    <ActionIcon color={props.forgroundColor || theme.colors.invert.text} style={{
                    paddingLeft: theme.dimens.space.sm
                }}/>
                                </Button_1.PressableView>);
        })}
                </Box_1.HBox>
            </Box_1.HBox>
        </Box_1.HBox>);
}
exports.SimpleToolbar = SimpleToolbar;
function TransparentCenterToolbar(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<SimpleToolbar style={{
            width: '100%'
        }} textStyle={{
            color: theme.colors.text
        }} homeIcon="" title={props.title} backgroundColor={theme.colors.transparent} {...props}/>);
}
exports.TransparentCenterToolbar = TransparentCenterToolbar;
function BottomNavBar(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const onDimens = props.onDimens;
    const hasText = props.options?.find((op) => {
        return op.title != undefined;
    });
    function getItem(op) {
        const color = props.selectedId == op.id ? theme.colors.accent : theme.colors.text;
        const ItemIcon = (0, Image_1.getIcon)(op.icon);
        const title = op.title || (hasText ? op.id : undefined);
        return (<Button_1.PressableView style={{
                paddingTop: theme.dimens.space.sm
            }} key={op.id} onPress={() => {
                op.onClick && op.onClick(op.id);
                props.onSelect(op.id);
            }}>
                <Box_1.Center>
                    {op.icon && <ItemIcon color={color}/>}
                    {title &&
                <Text_1.TextView style={{
                        fontSize: theme.dimens.font.sm,
                        color: color
                    }}>{title}</Text_1.TextView>}
                </Box_1.Center>
            </Button_1.PressableView>);
    }
    if (!props.options || props.options?.length == 0) {
        return null;
    }
    return (<Box_1.HBox onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            onDimens && onDimens(width, height);
        }} {...props} style={[{
                marginBottom: theme?.insets?.bottom || 0,
                padding: theme.dimens.space.md,
                paddingTop: !hasText ? theme.dimens.space.lg : theme.dimens.space.md,
                paddingBottom: !hasText ? theme.dimens.space.lg : theme.dimens.space.md,
                backgroundColor: theme.colors.forground,
                zIndex: 100,
                width: '100%',
                justifyContent: 'space-around',
                left: 0,
                bottom: 0,
                position: 'absolute'
            }, props.style]}>
            {props.options?.map(op => {
            return getItem(op);
        })}
        </Box_1.HBox>);
}
exports.BottomNavBar = BottomNavBar;
//# sourceMappingURL=Bar.js.map