"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeTextInputView = exports.TextInputView = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const ThemeContext_1 = require("./ThemeContext");
const utils_1 = require("./utils");
const Box_1 = require("./Box");
const Text_1 = require("./Text");
const Image_1 = require("./Image");
/**
 *
 * @param initialText if you use initialText then you dont need to maintain the 2 way binding between value and setValue, just enjoy props.onChangeText events
 * @returns
 */
function TextInputView(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const [text, setText] = (0, react_1.useState)(props.initialText);
    const [focused, setFocused] = (0, react_1.useState)(false);
    function onTextChange(newText) {
        setText(newText);
        props.onChangeText && props.onChangeText(newText);
    }
    return (<react_native_1.TextInput {...props} onFocus={(e) => {
            setFocused(true);
            props.onFocus && props.onFocus(e);
        }} onBlur={(e) => {
            setFocused(false);
            props.onBlur && props.onBlur(e);
        }} value={props.value || text} onChangeText={(newText) => {
            if (props.pattern) {
                const re = new RegExp(props.pattern);
                if (newText === "" || re.test(newText)) {
                    onTextChange(newText);
                }
            }
            else {
                onTextChange(newText);
            }
        }} style={[{
                color: theme.colors.text,
                textAlignVertical: "top",
                width: 'auto',
                fontSize: theme.dimens.font.md,
                fontFamily: theme.fonts.Regular,
                padding: theme.dimens.space.md,
                paddingStart: theme.dimens.space.md,
                paddingBottom: (0, utils_1.isWeb)() ? theme.dimens.space.md : theme.dimens.space.sm / 2,
                margin: theme.dimens.space.sm,
                borderWidth: focused ? 1.5 : 1.5,
                borderRadius: theme.dimens.space.sm,
                borderColor: !focused ? theme.colors.caption : theme.colors.accent
            }, (0, utils_1.isWeb)() ? {
                //@ts-ignore
                outline: 'none',
            } : {},
            props.style]}/>);
}
exports.TextInputView = TextInputView;
/**
 * Note: if input is inside a ScrollView in heirarchy anywhere then add keyboardShouldPersistTaps={'handled'}
 * to the scrollview else the icon click wont work
 * In case, you textinput is getting hidden due to keyboard see https://stackoverflow.com/a/77563800/6865753

 * @param props
 * @returns
 */
function CompositeTextInputView(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const [text, setText] = (0, react_1.useState)(props.initialText);
    const [alerttext, setAlertText] = (0, react_1.useState)(props.alertText);
    const [focused, setFocused] = (0, react_1.useState)(false);
    function onTextChange(newText) {
        setText(newText);
        props.onChangeText && props.onChangeText(newText);
    }
    const fontStyles = (0, utils_1.assignFields)({}, props.style, [
        "returnKeyType",
        "keyboardType",
        "textContentType",
        "multiline",
        "fontFamily",
        "fontSize",
        "fontWeight",
        "fontVariant",
        "color",
        "inputMode"
    ]);
    var hintVisible = false;
    if (props.placeholder && props.placeholder.length > 0 && focused) {
        hintVisible = true;
    }
    if (!focused && text && text.length > 0) {
        hintVisible = true;
    }
    if (!props.placeholder) {
        hintVisible = false;
    }
    // (focused || ((text ||
    //     props.value == undefined ? props.placeholder : props.value || ''
    // )?.length || 0) > 0)
    // if (!hintVisible && props.placeholder != undefined && props.placeholder?.length > 0 && text != undefined && text?.length > 0) {
    //     hintVisible = false
    // }
    const alertVisible = alerttext && alerttext.length;
    (0, react_1.useEffect)(() => {
        setText(props.value);
    }, [props.value]);
    (0, react_1.useEffect)(() => {
        setAlertText(props.alertText);
    }, [props.alertText]);
    //@ts-ignore
    const IconComponent = typeof props.icon == 'string' ? (<Image_1.Icon color={!focused ? theme.colors.caption : theme.colors.accent} style={{
            minWidth: (0, utils_1.isWeb)() ? theme.dimens.icon.lg : theme.dimens.icon.sm,
            padding: theme.dimens.space.sm / 2,
        }} name={props.icon}/>) : props.icon;
    return (<Box_1.HBox style={[{
                paddingEnd: theme.dimens.space.md,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 0,
                paddingStart: theme.dimens.space.sm * 1.5,
                margin: theme.dimens.space.sm,
                borderWidth: 1.5,
                borderRadius: theme.dimens.space.sm,
                borderColor: !focused ? theme.colors.caption : theme.colors.accent,
            }, (!hintVisible && !alertVisible) ? {
                paddingTop: theme.dimens.space.sm,
                paddingBottom: theme.dimens.space.sm
            } : {}, props.style]}>


            <Box_1.VBox style={[{
                flex: 1,
                paddingBottom: alertVisible ? 0 : theme.dimens.space.sm
            }, hintVisible ? {} : {
                paddingTop: theme.dimens.space.sm
            }]}>
                {hintVisible && <Text_1.TextView style={{
                padding: 0,
                margin: 0,
                fontSize: theme.dimens.font.sm,
                color: !focused ? theme.colors.caption : theme.colors.accent,
            }}>{props.placeholder}</Text_1.TextView>}
                <react_native_1.TextInput {...props._textInputProps} selectionColor={props.selectionColor || theme.colors.accent} secureTextEntry={props.secureTextEntry} placeholderTextColor={theme.colors.caption} placeholder={hintVisible ? '' : theme.i18n?.t(props.placeholder) || props.placeholder} keyboardType={props.keyboardType} returnKeyType={props.returnKeyType || 'default'} onFocus={(e) => {
            setFocused(true);
            props.onFocus && props.onFocus(e);
        }} onBlur={(e) => {
            setFocused(false);
            props.onBlur && props.onBlur(e);
        }} value={props.value || text} onChangeText={(newText) => {
            if (props.pattern) {
                const re = new RegExp(props.pattern);
                if (newText === "" || re.test(newText)) {
                    onTextChange(newText);
                }
            }
            else {
                onTextChange(newText);
            }
        }} style={[{
                color: theme.colors.text,
                fontSize: theme.dimens.font.md,
                fontFamily: theme.fonts.Regular,
            }, (0, utils_1.isWeb)() ? {
                //@ts-ignore
                outline: 'none',
            } : {}, fontStyles, props._textInputProps?.style]}/>
                {alertVisible && <Text_1.TextView style={{
                color: props.alertTextColor || theme.colors.critical,
                padding: 0,
                margin: 0,
                paddingBottom: theme.dimens.space.sm,
                fontSize: theme.dimens.font.sm,
            }}>{alerttext}</Text_1.TextView>}
            </Box_1.VBox>
            {props.icon != undefined &&
            <react_native_1.TouchableOpacity onPress={(e) => {
                    if (!props.onIconPress && props.icon == 'close') {
                        onTextChange('');
                    }
                    props.onIconPress && props.onIconPress(e);
                }}>
                    {(IconComponent)}
                </react_native_1.TouchableOpacity>}

        </Box_1.HBox>);
}
exports.CompositeTextInputView = CompositeTextInputView;
//# sourceMappingURL=Input.js.map