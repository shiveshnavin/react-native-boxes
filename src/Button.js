"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchView = exports.PressableView = exports.LoadingButton = exports.RightIconButton = exports.ButtonView = exports.TransparentButton = exports.TertiaryButtonView = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const ThemeContext_1 = require("./ThemeContext");
const Box_1 = require("./Box");
const Text_1 = require("./Text");
const Image_1 = require("./Image");
function TertiaryButtonView(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<ButtonView {...props} underlayColor={props.underlayColor || theme.colors.transparent} style={[{
                backgroundColor: theme.colors.transparent,
            }, props.style]} textStyle={Object.assign({
            fontSize: theme.dimens.font.lg,
            color: theme.colors.accent
        }, props.textStyle || {})}/>);
}
exports.TertiaryButtonView = TertiaryButtonView;
function TransparentButton(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const tstyle = props.style || {};
    const [isPressed, setIsPressed] = (0, react_1.useState)(false);
    const onPressIn = (e) => {
        setIsPressed(true);
        if (props.onPressIn)
            props.onPressIn(e);
    };
    const onPressOut = (e) => {
        setIsPressed(false);
        if (props.onPressOut)
            props.onPressOut(e);
    };
    return (<react_native_1.TouchableHighlight {...props} onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={theme.colors.transparent} style={[{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: theme.dimens.space.md,
                borderRadius: theme.dimens.space.xl,
                margin: theme.dimens.space.sm,
                backgroundColor: theme.colors.transparent,
            }, props.style]}>
            <Box_1.Center style={{
            padding: 0,
            margin: 0,
            flexDirection: 'row',
            backgroundColor: 'transparent'
        }}>

                {props.icon && (<react_native_1.View style={{
                margin: theme.dimens.space.sm
            }}>
                            {(0, Image_1.getIcon)(props.icon)}
                        </react_native_1.View>)}

                {(props.text || props.children) && (<Text_1.TextView style={{
                fontWeight: "500",
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                //@ts-ignore
                fontSize: tstyle.fontSize,
                //@ts-ignore
                fontFamily: tstyle.fontFamily,
                //@ts-ignore
                color: isPressed ? (props.underlayColor || theme.colors.accent) : tstyle.color || theme.colors.text,
            }}>
                            {props.text || props.children}
                        </Text_1.TextView>)}
            </Box_1.Center>
        </react_native_1.TouchableHighlight>);
}
exports.TransparentButton = TransparentButton;
function ButtonView(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const tstyle = props.style || {};
    const [isPressed, setIsPressed] = (0, react_1.useState)(false);
    const onPressIn = (e) => {
        setIsPressed(true);
        if (props.onPressIn)
            props.onPressIn(e);
    };
    const onPressOut = (e) => {
        setIsPressed(false);
        if (props.onPressOut)
            props.onPressOut(e);
    };
    const BtnIcon = (0, Image_1.getIcon)(props.icon);
    return (<react_native_1.TouchableHighlight {...props} onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={props.underlayColor || theme.colors.accentLight} style={[{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: theme.dimens.space.md,
                borderRadius: theme.dimens.space.xl,
                margin: theme.dimens.space.sm,
                backgroundColor: theme.colors.accent,
            }, props.style]}>
            <Box_1.Center style={{
            padding: 0,
            margin: 0,
            flexDirection: 'row',
            backgroundColor: 'transparent'
        }}>

                {BtnIcon && (<react_native_1.View style={{
                margin: theme.dimens.space.sm
            }}>
                            <BtnIcon color={
            //@ts-ignore
            typeof props.icon == 'string' ? tstyle.color || theme.colors.invert.text : undefined}/>
                        </react_native_1.View>)}

                {(props.text || props.children) && (<Text_1.TextView style={[{
                    opacity: isPressed ? .7 : 1,
                    fontWeight: "500",
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    //@ts-ignore
                    fontSize: tstyle.fontSize || theme.dimens.font.md,
                    //@ts-ignore
                    fontFamily: tstyle.fontFamily || theme.fonts.Regular,
                    //@ts-ignore
                    color: tstyle.color || theme.colors.invert.text,
                }, props.textStyle]}>
                            {props.text || props.children}
                        </Text_1.TextView>)}
            </Box_1.Center>
        </react_native_1.TouchableHighlight>);
}
exports.ButtonView = ButtonView;
function RightIconButton(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const tstyle = props.style || {};
    const [isPressed, setIsPressed] = (0, react_1.useState)(false);
    const onPressIn = (e) => {
        setIsPressed(true);
        if (props.onPressIn)
            props.onPressIn(e);
    };
    const onPressOut = (e) => {
        setIsPressed(false);
        if (props.onPressOut)
            props.onPressOut(e);
    };
    const BtnIcon = (0, Image_1.getIcon)(props.icon);
    return (<react_native_1.TouchableHighlight {...props} onPressIn={onPressIn} onPressOut={onPressOut} underlayColor={props.underlayColor || theme.colors.accentLight} style={[{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: theme.dimens.space.md,
                borderRadius: theme.dimens.space.xl,
                margin: theme.dimens.space.sm,
                backgroundColor: theme.colors.accent,
            }, props.style]}>

            <Box_1.HBox style={{
            padding: 0,
            margin: 0,
            alignItems: 'center',
            backgroundColor: 'transparent',
            width: '100%',
            paddingLeft: theme.dimens.space.sm,
            paddingRight: theme.dimens.space.sm,
        }}>
                <Box_1.Center style={{
            padding: 0,
            margin: 0,
            flexDirection: 'row',
            backgroundColor: 'transparent'
        }}>

                    {(props.text) && (<Text_1.TextView style={{
                marginRight: theme.dimens.space.lg,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                //@ts-ignore
                fontSize: tstyle.fontSize,
                //@ts-ignore
                fontFamily: tstyle.fontFamily,
                //@ts-ignore
                color: tstyle.color || theme.colors.invert.text,
            }}>
                                {props.text}
                            </Text_1.TextView>)}
                    {props.children}

                </Box_1.Center>
                {BtnIcon && (<react_native_1.View style={{
                position: 'absolute',
                right: 0,
                margin: theme.dimens.space.sm
            }}>
                            <BtnIcon />
                        </react_native_1.View>)}

            </Box_1.HBox>
        </react_native_1.TouchableHighlight>);
}
exports.RightIconButton = RightIconButton;
function LoadingButton(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const [_loading, _setIsLoading] = (0, react_1.useState)(props.loading);
    (0, react_1.useEffect)(() => {
        react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        if (props.loading != _loading)
            _setIsLoading(props.loading);
    }, [props.loading]);
    let loaderColor = theme.colors.invert.text;
    let loaderSize = theme.dimens.icon.md;
    let btnBg = theme.colors.accent;
    let btnBgPressed = theme.colors.accentLight;
    if (_loading && props.loaderStyle == 'transparent') {
        loaderColor = theme.colors.accent;
        btnBg = theme.colors.transparent;
        btnBgPressed = theme.colors.transparent;
        loaderSize = theme.dimens.icon.lg;
    }
    return (<ButtonView {...props} underlayColor={btnBgPressed} style={[{
                width: _loading ? '100%' : '100%',
                backgroundColor: btnBg,
                padding: _loading && props.loaderStyle == 'transparent' ?
                    theme.dimens.space.sm : theme.dimens.space.md
            }, props.style]} icon={_loading ?
            <react_native_1.ActivityIndicator size={loaderSize} color={loaderColor}/>
            : undefined} text={!_loading ? props.text : undefined}/>);
}
exports.LoadingButton = LoadingButton;
function PressableView(props) {
    //@ts-ignore
    return (<react_native_1.Pressable {...props} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1.0 }, props.style]}/>);
}
exports.PressableView = PressableView;
function SwitchView(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<react_native_1.Switch trackColor={{
            false: theme.colors.caption,
            true: theme.colors.success
        }} thumbColor={theme.colors.text} ios_backgroundColor={theme.colors.caption} {...props}/>);
}
exports.SwitchView = SwitchView;
//# sourceMappingURL=Button.js.map