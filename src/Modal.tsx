import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, LayoutChangeEvent, Linking, Modal, Platform, Pressable, ScrollView, StyleProp, StyleSheet, TextStyle, TouchableHighlight, TouchableOpacity, View, ViewProps } from 'react-native';
import { getIcon, Icon, IconProps } from './Image';
import { getNavParamsFromDeeplink, isDesktop, isWeb } from './utils';
import { ThemeContext } from './ThemeContext';
import { Center, HBox, VBox, VPage } from './Box';
import { Subtitle, TextView, Title } from './Text';
import { ButtonView, ButtonViewProps, LoadingButton, PressableView, TertiaryButtonView } from './Button';
import { CompositeTextInputView } from './Input';
import * as WebBrowser from 'expo-web-browser';
import { TransparentCenterToolbar } from './Bar';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';


export type BottomSheetProps = {
    visible: boolean,
    title?: string | React.Component,
    cancellable?: boolean
    children: any
    onDismiss?: Function
    backgroundColor?: string
    closeIcon?: string | React.ReactNode
    swipeToCloseDisabled?: boolean

}
/**
 * set swipeToCloseDisabled = true if you face issues with scrolling
 * @param props 
 * @returns 
 */
export const BottomSheet = (props: BottomSheetProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const theme = useContext(ThemeContext)
    let cancellable = props.cancellable != undefined ?
        props.cancellable : true

    useEffect(() => {
        setModalVisible(props.visible)
    }, [props.visible])

    function cancel() {
        setModalVisible(false)
        if (props.onDismiss) {
            props.onDismiss()
        }
    }

    const CloseIcon = getIcon(props.closeIcon) || (() => {
        return (<Icon color={theme.colors.caption} name="close" />)
    })
    const fling = Gesture.Fling()
        .direction(Directions.DOWN)
        .onEnd(() => {
            props.onDismiss && props.onDismiss()
        })
    return (
        <View style={styles.container}>
            <Modal
                onDismiss={() => {

                }}
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    cancel()
                }}
            >
                <TouchableHighlight
                    onPress={() => {
                        cancel()
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                    <View />
                </TouchableHighlight>

            </Modal>

            <Modal
                onDismiss={() => {
                    cancel()
                }}
                style={{
                    flex: 1
                }}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => cancel()}
            >
                <View style={[styles.modalContainer, {
                    backgroundColor: props.backgroundColor || theme.colors.forground
                }]}>
                    <View style={[{
                        paddingTop: theme.dimens.space.md,
                        paddingStart: theme.dimens.space.lg,
                        paddingEnd: theme.dimens.space.lg,
                    }]}>
                        <HBox style={{
                            justifyContent: 'space-between',
                            width: '100%'
                        }}>
                            <View style={{ width: theme.dimens.icon.md }} />
                            {
                                typeof props.title == 'string' ? (
                                    <Subtitle style={{
                                        fontFamily: theme.fonts.Bold
                                    }}>{props.title.toString()}</Subtitle>
                                ) : <>{props.title}</>
                            }
                            {
                                cancellable ? (<TouchableOpacity
                                    style={{
                                        padding: theme.dimens.space.sm
                                    }}
                                    onPress={() => {
                                        cancel()
                                    }}>
                                    <CloseIcon />
                                </TouchableOpacity>) : (
                                    <View style={{ width: theme.dimens.icon.md }} />
                                )
                            }
                        </HBox>
                        <VBox style={{
                            width: '100%'
                        }}>
                            {
                                props.swipeToCloseDisabled ? (
                                    <ScrollView
                                        nestedScrollEnabled={true}
                                        showsVerticalScrollIndicator={false}
                                        style={{
                                            flex: 1,
                                            maxHeight: 500,
                                        }}>
                                        {props.children}
                                    </ScrollView>
                                ) : (
                                    <GestureDetector gesture={fling}>
                                        {props.children}
                                    </GestureDetector>
                                )
                            }


                        </VBox>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: isDesktop() ? {
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




export function Expand(props: ViewProps & {
    title?: string,
    iconName?: string,
    iconPosition?: 'left' | 'right',
    titleStyle?: StyleProp<TextStyle>,
    titleBackgroundColor?: string,
    iconStyle?: IconProps,
    initialExpand?: boolean,
    duration?: number,
    onExpand?: (isExpanded: boolean) => void,
    onChange?: (isExpanded: boolean) => void
}) {
    const theme = useContext(ThemeContext);
    const [expanded, setExpanded] = useState(props.initialExpand != undefined ? props.initialExpand : false);
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const spinValue = useRef(new Animated.Value(expanded ? 1 : 0)).current;
    const [initDone, setInitDone] = useState(false)

    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(spinValue, {
            toValue: expanded ? 1 : 0,
            duration: props.duration || 200,
            easing: Easing.ease,
            useNativeDriver: false
        }).start();

        Animated.timing(
            fadeAnim,
            {
                toValue: expanded ? 0 : -20,
                duration: props.duration || 200, // Animation duration in milliseconds
                useNativeDriver: true // Add this line for better performance
            }
        ).start();
        if (props.onChange) {
            props.onChange(expanded);
        }
        expanded && props.onExpand && props.onExpand(expanded)
    }, [expanded]);

    useEffect(() => {
        setInitDone(true)
    }, [])

    const toggleExpand = () => {
        let newValue = !expanded
        setExpanded(newValue);
    };
    var onLayoutContent = (event: LayoutChangeEvent) => {
        if (!contentHeight) {
            setContentHeight(event.nativeEvent.layout.height);
        }
    };

    if (Platform.OS == "web") {
        const [initalLayoutWait, setinitalLayoutWait] = useState(false)
        useEffect(() => {
            setTimeout(() => {
                setinitalLayoutWait(true)
            }, 2000)
        }, [])
        onLayoutContent = (event: LayoutChangeEvent) => {
            if (!contentHeight && initalLayoutWait) {
                setContentHeight(event.nativeEvent.layout.height);
            }
        };
    }

    const spinInterpolated = spinValue.interpolate({
        easing: Easing.ease,
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    });

    const ExpandIcon = () => {
        return (
            <Pressable
                style={[{
                    borderRadius: theme.dimens.space.md,
                    padding: theme.dimens.space.md,
                }, {
                    backgroundColor: props.titleBackgroundColor
                }]}
                onPress={toggleExpand}>
                <Center style={props.iconPosition == 'right' ? {
                    paddingLeft: theme.dimens.space.sm,
                    justifyContent: 'space-between',
                    flexDirection: 'row-reverse',
                } : {
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                }}>
                    <Animated.View
                        style={{
                            transform: [{ rotate: spinInterpolated }],
                        }}>
                        <Icon
                            color={theme.colors.text}
                            {...props.iconStyle}
                            name={props.iconName || 'chevron-right'}
                        />
                    </Animated.View>
                    <HBox style={{
                        width: theme.dimens.space.sm
                    }} />
                    <Title style={[{
                        padding: 0,
                        paddingLeft: props.iconPosition == 'right' ? 0 :
                            theme.dimens.space.sm,
                        margin: 0,
                        fontSize: theme.dimens.font.md
                    }, props.titleStyle]}>{props.title}</Title>
                </Center>
            </Pressable >
        )
    }

    return (
        <VBox
            style={[{
                padding: 0,
                borderRadius: theme.dimens.space.md,
                margin: theme.dimens.space.sm
            }, {
                justifyContent: (props.iconPosition) == 'right' ? 'space-between' : 'flex-start'
            }, props.style]}>
            <ExpandIcon />
            <Animated.View
                style={{
                    zIndex: -1,
                    transform: [{ translateY: fadeAnim }],
                    height: expanded ? 'auto' : 0,
                    overflow: 'hidden'
                }}
                onLayout={onLayoutContent}>
                {
                    (expanded || initDone) && (
                        <VBox onLayout={onLayoutContent} >
                            {props.children}
                        </VBox>
                    )
                }
            </Animated.View>
        </VBox>
    );
}

export type DropDownViewOption = {
    id: string
    value: any
    title?: string
}
export type DropDownViewProps = {
    options: DropDownViewOption[]
    selectedId: string,
    onSelect: (selectedId: string, opt: DropDownViewOption) => void

    initialVisile?: Boolean,
    title?: string,
    displayType?: 'button' | 'input',
    onRenderOption?: (opt: DropDownViewOption) => any,
    forceDialogSelectOnWeb?: Boolean
} & ViewProps
export const DropDownView = (props: DropDownViewProps) => {
    const displayType = props.displayType || 'input'
    const theme = useContext(ThemeContext)
    const [visible, setVisible] = useState(props.initialVisile || false)

    const getSelected = (): DropDownViewOption | undefined => {
        let se = props.options.find(op => op.id == props.selectedId)
        return se
    };

    if (Platform.OS == 'web' && !props.forceDialogSelectOnWeb) {
        return (
            <select
                defaultValue={props.selectedId}
                onChange={(e) => {
                    //@ts-ignore
                    props.onSelect(e.target.value, props.options.find(o => o.id == e.target.value)?.value)
                }}
                //@ts-ignore
                style={Object.assign({
                    width: '100%',
                    padding: theme.dimens.space.md,
                    margin: theme.dimens.space.md
                }, props.style || {})}>
                {
                    props.options.map(opt => {
                        if (props.onRenderOption) {
                            return props.onRenderOption(opt)
                        }
                        return (
                            <option
                                style={{
                                    padding: theme.dimens.space.md,
                                }}
                                key={opt.id} id={opt.id} value={opt.id}>{opt.title || opt.value}</option>
                        )
                    })
                }
            </select>
        )
    }

    else {
        return (
            <VBox style={props.style}>
                <BottomSheet
                    visible={visible as boolean}
                    onDismiss={() => {
                        setVisible(false)
                    }}
                    title={props.title || ''} >
                    {
                        props.options.map((opt, idx) => {
                            if (props.onRenderOption) {
                                return props.onRenderOption(opt)
                            }
                            return (
                                <TertiaryButtonView
                                    onPress={() => {
                                        setVisible(false)
                                        props.onSelect(opt.id, opt)
                                    }}
                                    style={{
                                        padding: 0,
                                        paddingBottom: idx == props.options.length - 1 ? theme.dimens.space.md : 0,
                                        paddingTop: idx == 0 ? theme.dimens.space.md : 0,
                                    }}
                                    key={opt.id} >{opt.title || opt.value}</TertiaryButtonView>
                            )
                        })
                    }
                </BottomSheet>

                {
                    displayType == 'button' ? (

                        //@ts-ignore
                        <ButtonView
                            {...props}
                            onPress={() => {
                                setVisible(true)
                            }}
                            text={getSelected()?.title || getSelected()?.id || 'select'} style={props.style}>
                        </ButtonView>
                    ) : (
                        //@ts-ignore
                        <PressableView
                            {...props}
                            onPress={() => {
                                setVisible(true)
                            }}
                        >
                            <CompositeTextInputView
                                readOnly={true}
                                placeholder={props.title}
                                {...props}
                                value={getSelected()?.title || getSelected()?.id}
                                onIconPress={() => { setVisible(true) }}
                                icon={"caret-down"}
                                pointerEvents="none"
                                //@ts-ignore
                                _textInputProps={{
                                    caretHidden: true,
                                    placeholder: props.title || 'select',
                                    editable: false,
                                    selectTextOnFocus: false
                                }}
                                hint={props.title || 'select'}
                                initialText={getSelected()?.title || getSelected()?.id} />
                        </PressableView>
                    )
                }
            </VBox>

        )
    }
}


export type ConfirmationDialogProps = {
    visible: boolean,
    title?: string | React.Component,
    cancellable?: boolean
    onDismiss?: Function

    onConfirm: () => void,
    onCancel?: () => void,
    message?: string,
    confirmText?: String,
    cancelText?: String,
    children?: any
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {

    const confirmText = props.confirmText || 'Confirm'
    const cancelText = props.cancelText || 'Cancel'
    const theme = useContext(ThemeContext)
    return (
        <BottomSheet
            onDismiss={() => {
                props.onDismiss && props.onDismiss()
            }}
            {...props}
        >
            <VBox>
                {props.message && <TextView style={{
                    padding: theme.dimens.space.lg,
                    textAlign: 'center'
                }}>{props.message}</TextView>}
                <ButtonView text={confirmText as string} onPress={() => {
                    props.onDismiss && props.onDismiss()
                    props.onConfirm && props.onConfirm()
                }} />
                <TertiaryButtonView
                    style={{
                        marginTop: 0
                    }}
                    text={cancelText as string} onPress={() => {
                        props.onDismiss && props.onDismiss()
                        props.onCancel && props.onCancel()
                    }} />
            </VBox>

        </BottomSheet>
    )
}


export function WebBrowserView(props: {
    url: string,
    title?: string,
    openMessage?: string,
    retryMessage?: string,
    cancelMessage?: string;
    onCancel: () => void,
    navigation: {
        navigate: (path: string, params: any) => void
    }
}) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false)
    const _handlePressButtonAsync = async () => {
        if (isWeb()) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 5000)
            //@ts-ignore
            window.location.href = props.url
        } else {
            let result: any = await WebBrowser.openBrowserAsync(props.url);
            setResult(result);
        }
    };

    useEffect(() => {
        if (result == null)
            _handlePressButtonAsync()
    }, [])
    const theme = useContext(ThemeContext)
    Linking.addEventListener('url', (url) => {
        if (url?.url) {
            let path = url?.url.split("://")[1]
            if (path) {
                const [root, params] = getNavParamsFromDeeplink(path)
                props.navigation?.navigate(root, params)
            }
            Linking.removeAllListeners('url')
        }
    });
    return (
        <VPage >
            <TransparentCenterToolbar title={props.title || ''} />
            <Center style={{
                paddingBottom: theme.dimens.space.xl,
                flex: 1,
            }}>
                <Center style={{
                    paddingBottom: theme.dimens.space.xl * 2,
                }}>
                    <Icon name="globe" size={theme.dimens.icon.xxl} />
                    <Subtitle style={{
                        padding: theme.dimens.space.xl,
                        paddingTop: theme.dimens.space.lg,
                        textAlign: 'center'
                    }}>{props.openMessage || "Open in browser to continue."}</Subtitle>
                </Center>
                <LoadingButton
                    loading={loading}
                    onPress={() => {
                        _handlePressButtonAsync()
                    }}
                    style={{
                        width: '80%'
                    }}>{props.retryMessage || "Retry"}</LoadingButton>
                <TertiaryButtonView
                    onPress={() => {
                        props.onCancel && props.onCancel()
                    }}
                    text={props.cancelMessage || "Cancel"} />
            </Center>
        </VPage>
    );
}
