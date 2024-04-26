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
exports.ConfirmationDialog = exports.DropDownView = exports.Expand = exports.BottomSheet = void 0;
//@ts-nocheck
const React = __importStar(require("react"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const Image_1 = require("./Image");
const utils_1 = require("./utils");
const ThemeContext_1 = require("./ThemeContext");
const Box_1 = require("./Box");
const Text_1 = require("./Text");
const Button_1 = require("./Button");
const Input_1 = require("./Input");
const BottomSheet = (props) => {
    const [modalVisible, setModalVisible] = (0, react_1.useState)(false);
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    let cancellable = props.cancellable != undefined ?
        props.cancellable : true;
    (0, react_1.useEffect)(() => {
        setModalVisible(props.visible);
    }, [props.visible]);
    function cancel() {
        setModalVisible(false);
        if (props.onDismiss) {
            props.onDismiss();
        }
    }
    return (<react_native_1.View style={styles.container}>
            <react_native_1.Modal onDismiss={() => {
        }} animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {
            cancel();
        }}>
                <react_native_1.TouchableHighlight onPress={() => {
            cancel();
        }} style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
                    <react_native_1.View />
                </react_native_1.TouchableHighlight>

            </react_native_1.Modal>

            <react_native_1.Modal onDismiss={() => {
            cancel();
        }} style={{
            flex: 1
        }} animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => cancel()}>
                <react_native_1.View style={[styles.modalContainer, {
                backgroundColor: theme.colors.forground
            }]}>
                    <react_native_1.View style={[{
                paddingTop: theme.dimens.space.md,
                paddingStart: theme.dimens.space.lg,
                paddingEnd: theme.dimens.space.lg,
            }]}>
                        <Box_1.HBox style={{
            justifyContent: 'space-between',
            width: '100%'
        }}>
                            <react_native_1.View style={{ width: theme.dimens.icon.md }}/>
                            {typeof props.title == 'string' ? (<Text_1.Subtitle style={{
                fontFamily: theme.fonts.Bold
            }}>{props.title.toString()}</Text_1.Subtitle>) : <>{props.title}</>}
                            {cancellable ? (<react_native_1.TouchableOpacity style={{
                padding: theme.dimens.space.sm
            }} onPress={() => {
                cancel();
            }}>
                                    <Image_1.Icon color={theme.colors.caption} name="close"/>
                                </react_native_1.TouchableOpacity>) : (<react_native_1.View style={{ width: theme.dimens.icon.md }}/>)}
                        </Box_1.HBox>
                        <Box_1.VBox style={{
            width: '100%'
        }}>
                            <react_native_1.ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{
            flex: 1,
            maxHeight: 500,
        }}>
                                {props.children}
                            </react_native_1.ScrollView>
                        </Box_1.VBox>
                    </react_native_1.View>
                </react_native_1.View>
            </react_native_1.Modal>
        </react_native_1.View>);
};
exports.BottomSheet = BottomSheet;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: (0, utils_1.isDesktop)() ? {
        marginLeft: '20%',
        marginRight: '20%',
        marginBottom: '1%',
        width: '60%',
        overflow: 'hidden',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    } : {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
});
function Expand(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const [expanded, setExpanded] = (0, react_1.useState)(props.initialExpand != undefined ? props.initialExpand : false);
    const [contentHeight, setContentHeight] = (0, react_1.useState)(null);
    const spinValue = (0, react_1.useRef)(new react_native_1.Animated.Value(expanded ? 1 : 0)).current;
    const [initDone, setInitDone] = (0, react_1.useState)(false);
    const [fadeAnim] = (0, react_1.useState)(new react_native_1.Animated.Value(0));
    (0, react_1.useEffect)(() => {
        react_native_1.Animated.timing(spinValue, {
            toValue: expanded ? 1 : 0,
            duration: props.duration || 200,
            easing: react_native_1.Easing.ease,
            useNativeDriver: false
        }).start();
        react_native_1.Animated.timing(fadeAnim, {
            toValue: expanded ? 0 : -20,
            duration: props.duration || 200, // Animation duration in milliseconds
            useNativeDriver: true // Add this line for better performance
        }).start();
        if (props.onChange) {
            props.onChange(expanded);
        }
        expanded && props.onExpand && props.onExpand(expanded);
    }, [expanded]);
    (0, react_1.useEffect)(() => {
        setInitDone(true);
    }, []);
    const toggleExpand = () => {
        let newValue = !expanded;
        setExpanded(newValue);
    };
    var onLayoutContent = (event) => {
        if (!contentHeight) {
            setContentHeight(event.nativeEvent.layout.height);
        }
    };
    if (react_native_1.Platform.OS == "web") {
        const [initalLayoutWait, setinitalLayoutWait] = (0, react_1.useState)(false);
        (0, react_1.useEffect)(() => {
            setTimeout(() => {
                setinitalLayoutWait(true);
            }, 2000);
        }, []);
        onLayoutContent = (event) => {
            if (!contentHeight && initalLayoutWait) {
                setContentHeight(event.nativeEvent.layout.height);
            }
        };
    }
    const spinInterpolated = spinValue.interpolate({
        easing: react_native_1.Easing.ease,
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    });
    const ExpandIcon = () => {
        return (<react_native_1.Pressable style={[{
                    borderRadius: theme.dimens.space.md,
                    padding: theme.dimens.space.md,
                }, {
                    backgroundColor: props.titleBackgroundColor
                }]} onPress={toggleExpand}>
                <Box_1.Center style={props.iconPosition == 'right' ? {
                paddingLeft: theme.dimens.space.sm,
                justifyContent: 'space-between',
                flexDirection: 'row-reverse',
            } : {
                justifyContent: 'flex-start',
                flexDirection: 'row',
            }}>
                    <react_native_1.Animated.View style={{
                transform: [{ rotate: spinInterpolated }],
            }}>
                        <Image_1.Icon color={theme.colors.text} {...props.iconStyle} name={props.iconName || 'chevron-right'}/>
                    </react_native_1.Animated.View>
                    <Box_1.HBox style={{
                width: theme.dimens.space.sm
            }}/>
                    <Text_1.Title style={[{
                    padding: 0,
                    paddingLeft: props.iconPosition == 'right' ? 0 :
                        theme.dimens.space.sm,
                    margin: 0,
                    fontSize: theme.dimens.font.md
                }, props.titleStyle]}>{props.title}</Text_1.Title>
                </Box_1.Center>
            </react_native_1.Pressable>);
    };
    return (<Box_1.VBox style={[{
                padding: 0,
                borderRadius: theme.dimens.space.md,
                margin: theme.dimens.space.sm
            }, {
                justifyContent: (props.iconPosition) == 'right' ? 'space-between' : 'flex-start'
            }, props.style]}>
            <ExpandIcon />
            <react_native_1.Animated.View style={{
            zIndex: -1,
            transform: [{ translateY: fadeAnim }],
            height: expanded ? 'auto' : 0,
            overflow: 'hidden'
        }} onLayout={onLayoutContent}>
                {(expanded || initDone) && (<Box_1.VBox onLayout={onLayoutContent}>
                            {props.children}
                        </Box_1.VBox>)}
            </react_native_1.Animated.View>
        </Box_1.VBox>);
}
exports.Expand = Expand;
const DropDownView = (props) => {
    const displayType = props.displayType || 'input';
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    const [visible, setVisible] = (0, react_1.useState)(props.initialVisile || false);
    const getSelected = () => {
        let se = props.options.find(op => op.id == props.selectedId);
        return se;
    };
    if (react_native_1.Platform.OS == 'web' && !props.forceDialogSelectOnWeb) {
        return (<select defaultValue={props.selectedId} onChange={(e) => {
                props.onSelect(e.target.value, props.options.find(o => o.id == e.target.value)?.value);
            }} 
        //@ts-ignore
        style={Object.assign({
                width: '100%',
                padding: theme.dimens.space.md,
                margin: theme.dimens.space.md
            }, props.style || {})}>
                {props.options.map(opt => {
                if (props.onRenderOption) {
                    return props.onRenderOption(opt);
                }
                return (<option style={{
                        padding: theme.dimens.space.md,
                    }} key={opt.id} id={opt.id} value={opt.id}>{opt.title || opt.value}</option>);
            })}
            </select>);
    }
    else {
        return (<Box_1.VBox style={props.style}>
                <exports.BottomSheet visible={visible} onDismiss={() => {
                setVisible(false);
            }} title={props.title || ''}>
                    {props.options.map((opt, idx) => {
                if (props.onRenderOption) {
                    return props.onRenderOption(opt);
                }
                return (<Button_1.TertiaryButtonView onPress={() => {
                        setVisible(false);
                        props.onSelect(opt.id, opt);
                    }} style={{
                        padding: 0,
                        paddingBottom: idx == props.options.length - 1 ? theme.dimens.space.md : 0,
                        paddingTop: idx == 0 ? theme.dimens.space.md : 0,
                    }} key={opt.id}>{opt.title || opt.value}</Button_1.TertiaryButtonView>);
            })}
                </exports.BottomSheet>

                {displayType == 'button' ? (
            //@ts-ignore
            <Button_1.ButtonView {...props} onPress={() => {
                    setVisible(true);
                }} text={getSelected()?.title || getSelected()?.id || 'select'} style={props.style}>
                        </Button_1.ButtonView>) : (
            //@ts-ignore
            <Button_1.PressableView {...props} onPress={() => {
                    setVisible(true);
                }}>
                            <Input_1.CompositeTextInputView placeholder={props.title} {...props} value={getSelected()?.title || getSelected()?.id} onIconPress={() => { setVisible(true); }} icon={"caret-down"} pointerEvents="none" _textInputProps={{
                    caretHidden: true,
                    placeholder: props.title || 'select',
                    editable: false,
                    selectTextOnFocus: false
                }} hint={props.title || 'select'} initialText={getSelected()?.title || getSelected()?.id}/>
                        </Button_1.PressableView>)}
            </Box_1.VBox>);
    }
};
exports.DropDownView = DropDownView;
function ConfirmationDialog(props) {
    const confirmText = props.confirmText || 'Confirm';
    const cancelText = props.cancelText || 'Cancel';
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return (<exports.BottomSheet onDismiss={() => {
            props.onDismiss && props.onDismiss();
        }} {...props}>
            <Box_1.VBox>
                {props.message && <Text_1.TextView style={{
                padding: theme.dimens.space.lg,
                textAlign: 'center'
            }}>{props.message}</Text_1.TextView>}
                <Button_1.ButtonView text={confirmText} onPress={() => {
            props.onDismiss && props.onDismiss();
            props.onConfirm && props.onConfirm();
        }}/>
                <Button_1.TertiaryButtonView text={cancelText} onPress={() => {
            props.onDismiss && props.onDismiss();
            props.onCancel && props.onCancel();
        }}/>
            </Box_1.VBox>

        </exports.BottomSheet>);
}
exports.ConfirmationDialog = ConfirmationDialog;
//# sourceMappingURL=Modal.js.map