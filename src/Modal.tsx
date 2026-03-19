import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, FlatList, LayoutChangeEvent, Linking, Modal, Platform, Pressable, ScrollView, StyleProp, StyleSheet, TextStyle, TouchableHighlight, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { getIcon, Icon, IconProps } from './Image';
import { getNavParamsFromDeeplink, isDesktop, isWeb } from './utils';
import { ThemeContext } from './ThemeContext';
import { Center, HBox, VBox, VPage } from './Box';
import { Caption, Subtitle, TextView, Title } from './Text';
import { ButtonView, ButtonViewProps, LoadingButton, PressableView, TertiaryButtonView } from './Button';
import { CompositeTextInputView, CompositeTextInputViewProps } from './Input';
import * as WebBrowser from 'expo-web-browser';
import { TransparentCenterToolbar } from './Bar';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import { TrackerUtils, TrackingActionType, TrackingViewType } from './Analytics';


export type BottomSheetProps = {
    visible: boolean,
    title?: string | React.Component,
    cancellable?: boolean
    children: any
    onDismiss?: Function
    backgroundColor?: string
    closeIcon?: string | React.ReactNode
    swipeToCloseDisabled?: boolean
    containerStyle?: StyleProp<ViewStyle>
    analyticsId?: string
    analyticsExtras?: any

}


export const BottomSheet = (props: BottomSheetProps) => {
    const theme = useContext(ThemeContext);
    const [modalVisible, setModalVisible] = useState(props.visible);
    const cancellable = props.cancellable !== undefined ? props.cancellable : true;
    useEffect(() => {
        setModalVisible(props.visible);
        if (props.visible) {
            theme.onTrack(
                TrackingActionType.VIEW,
                TrackingViewType.DIALOG,
                TrackerUtils.textOrAnalyticsId(props.analyticsId, props.title),
                props.analyticsExtras
            );
        }
    }, [props.visible]);

    const trackDismiss = () => {
        theme.onTrack(
            TrackingActionType.CLICK,
            TrackingViewType.DIALOG,
            TrackerUtils.textOrAnalyticsId(
                TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'dismiss'),
                typeof props.title === 'string' ? 'dismiss-' + props.title : 'dismiss'
            ),
            props.analyticsExtras
        );
    };

    const handleDismiss = (shouldTrack?: boolean) => {
        if (shouldTrack) {
            trackDismiss();
        }
        setModalVisible(false);
        props.onDismiss && props.onDismiss();
    };

    const CloseIcon = getIcon(props.closeIcon) || (() => <Icon color={theme.colors.caption} name="close" />);

    // Sheet header
    const SheetHeader = (
        <HBox style={{ justifyContent: 'space-between', width: '100%' }}>
            <View style={{ width: theme.dimens.icon.md }} />
            {typeof props.title === 'string' ? (
                <Subtitle style={{ fontFamily: theme.fonts.Bold }}>{props.title}</Subtitle>
            ) : (props.title as any)}
            {cancellable ? (
                <TouchableOpacity
                    testID={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'dismiss')}
                    //@ts-ignore
                    nativeID={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'dismiss')}
                    style={{ padding: theme.dimens.space.sm }}
                    onPress={() => handleDismiss(true)}>
                    <CloseIcon />
                </TouchableOpacity>
            ) : (
                <View style={{ width: theme.dimens.icon.md }} />
            )}
        </HBox>
    );

    // Sheet body
    const SheetBody = (
        <VBox style={{ width: '100%' }}>
            {isWeb() ? (
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, maxHeight: 500 }}>
                    {props.children}
                </ScrollView>
            ) : (
                <VBox style={{ width: '100%' }}>{props.children}</VBox>
            )}
        </VBox>
    );

    // The sheet itself
    const Sheet = (
        <View
            testID={props.analyticsId}
            //@ts-ignore
            nativeID={props.analyticsId}
            style={[
                styles.modalContainer,
                { backgroundColor: props.backgroundColor || theme.colors.forground },
                props.containerStyle,
            ]}
        >
            <View style={{
                paddingTop: theme.dimens.space.md,
                paddingStart: theme.dimens.space.lg,
                paddingEnd: theme.dimens.space.lg,
                paddingBottom: theme.insets?.bottom || 0
            }}>
                {SheetHeader}
                {SheetBody}
            </View>
        </View>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => handleDismiss(true)}
        >
            {/* Overlay */}
            <Pressable
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                onPress={cancellable ? () => handleDismiss(true) : undefined}
                accessible={false}
            />
            {/* Sheet */}
            {Sheet}
        </Modal>
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
    leftPadding?: number,
    titleStyle?: StyleProp<TextStyle>,
    titleBackgroundColor?: string,
    iconStyle?: IconProps,
    initialExpand?: boolean,
    duration?: number,
    onExpand?: (isExpanded: boolean) => void,
    onChange?: (isExpanded: boolean) => void,
    analyticsId?: string,
    analyticsExtras?: any
}) {
    const theme = useContext(ThemeContext);
    const [expanded, setExpanded] = useState(props.initialExpand != undefined ? props.initialExpand : false);
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const spinValue = useRef(new Animated.Value(expanded ? 1 : 0)).current;
    const [initDone, setInitDone] = useState(false)

    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (props.initialExpand != undefined)
            setExpanded(props.initialExpand)
    }, [props.initialExpand])

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
        theme.onTrack(
            TrackingActionType.CLICK,
            TrackingViewType.DIALOG,
            TrackerUtils.textOrAnalyticsId(
                TrackerUtils.analyticsIdWithSuffix(props.analyticsId, newValue ? 'expand' : 'collapse'),
                (newValue ? 'expand' : 'collapse') + '-' + props.title
            ),
            props.analyticsExtras
        )
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
                testID={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, expanded ? 'collapse' : 'expand')}
                //@ts-ignore
                nativeID={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, expanded ? 'collapse' : 'expand')}
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
                            name={props.iconName || 'chevron-circle-right'}
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
                    zIndex: 1,
                    transform: [{ translateY: fadeAnim }],
                    height: expanded ? 'auto' : 0,
                    overflow: 'hidden'
                }}
                onLayout={onLayoutContent}>
                {
                    (expanded || initDone) && (
                        <VBox onLayout={onLayoutContent} style={{
                            paddingStart: props.leftPadding !== undefined ? props.leftPadding : theme.dimens.space.md * 3
                        }}>
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
    listType?: 'sheet' | 'horizontal-list'
    options: DropDownViewOption[]
    selectedId: string,
    onSelect: (selectedId: string, opt: DropDownViewOption) => void

    initialVisile?: Boolean,
    title?: string,
    displayType?: 'button' | 'input',
    onRenderList?: (opt: DropDownViewOption[], onSelect: (selectedId: string, opt: DropDownViewOption) => void) => any,
    onRenderOption?: (opt: DropDownViewOption, setSelected: (selectedId: string, opt: DropDownViewOption) => void) => any,
    onEmptyListPlaceholder?: (dismiss?: () => void) => React.ReactNode
    forceDialogSelectOnWeb?: Boolean
    swipeToCloseDisabled?: boolean
    analyticsId?: string
    analyticsExtras?: any
} & CompositeTextInputViewProps

/**
 * set swipeToCloseDisabled = true if you face issues with scrolling
 * @param props 
 * @returns 
 */
export const DropDownView = (props: DropDownViewProps) => {
    const displayType = props.displayType || 'input'
    const theme = useContext(ThemeContext)
    const [visible, setVisible] = useState(props.initialVisile || false)
    const flatlistRef = useRef<FlatList<any>>()
    const openAnalyticsId = TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'open')
    const selectAnalyticsId = TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'select')

    const getSelected = (): DropDownViewOption | undefined => {
        let se = props.options.find(op => op.id == props.selectedId)
        return se
    };
    const openDropDown = () => {
        setVisible(true)
    }
    const onSelect = (selectedId: string, opt: DropDownViewOption) => {
        props.onSelect(selectedId, opt)
        theme.onTrack(
            TrackingActionType.CLICK,
            TrackingViewType.DROPDOWN,
            TrackerUtils.textOrAnalyticsId(selectAnalyticsId, 'select-' + props.title),
            props.analyticsExtras !== undefined ? props.analyticsExtras : {
                value: selectedId,
                title: opt.title,
                displayType: displayType
            }
        )
        setVisible(false)
    }
    const shouldShowLabel = props.listType == 'horizontal-list' ? !visible : true
    if (Platform.OS == 'web' && !props.forceDialogSelectOnWeb) {
        if (props.options?.length == 0) {
            if (props.onEmptyListPlaceholder) {
                return props.onEmptyListPlaceholder()
            }
        }
        return (
            <>
                <select
                    value={props.selectedId}
                    defaultValue={props.selectedId}
                    onChange={(e) => {
                        //@ts-ignore
                        props.onSelect(e.target.value, props.options.find(o => o.id == e.target.value))
                    }}
                    //@ts-ignore
                    style={Object.assign({
                        color: theme.colors.text,
                        backgroundColor: theme.colors.background,
                        padding: theme.dimens.space.lg,
                        margin: theme.dimens.space.md,
                        paddingStart: theme.dimens.space.sm,
                        borderWidth: 1.5,
                        borderRadius: theme.dimens.space.sm,
                        borderColor: theme.colors.caption,
                    }, props.style || {})}>
                    <optgroup>

                        {
                            props.options.map(opt => {
                                if (props.onRenderOption) {
                                    return props.onRenderOption(opt, onSelect)
                                }
                                return (
                                    <option
                                        style={{
                                            fontFamily: theme.fonts.Regular,
                                            backgroundColor: theme.colors.background,
                                            color: theme.colors.text,
                                            padding: theme.dimens.space.md,
                                            paddingTop: theme.dimens.space.lg,
                                            paddingBottom: theme.dimens.space.lg,
                                        }}
                                        key={opt.id} id={opt.id} value={opt.id}>{opt.title || opt.value}</option>
                                )
                            })
                        }
                    </optgroup>
                </select>
            </>
        )
    }
    else {
        if (visible && props.listType == 'horizontal-list' && props.options?.length == 0 && props.onEmptyListPlaceholder) {
            return props.onEmptyListPlaceholder(() => {
                setVisible(false)
            })
        }
        return (
            <VBox style={props.style}>

                {
                    (visible && props.listType == 'horizontal-list') ? (
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            style={[{
                                marginTop: theme.dimens.space.sm,
                                marginBottom: theme.dimens.space.sm,
                            }, props.style]}
                            //@ts-ignore
                            ref={flatlistRef}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View
                                        style={{
                                            height: "100%",
                                            width: theme.dimens.space.sm,
                                            backgroundColor: theme.colors.forground,

                                        }}
                                    />
                                );
                            }}
                            horizontal={true}
                            data={props.options}
                            renderItem={(item) => {
                                const opt = item.item
                                if (props.onRenderOption) {
                                    return props.onRenderOption(opt, onSelect)
                                }
                                return (
                                    <PressableView
                                        testID={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, opt.id)}
                                        //@ts-ignore
                                        nativeID={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, opt.id)}
                                        key={opt.id}
                                        onPress={() => {
                                            setVisible(false)
                                            props.onSelect(opt.id, opt)
                                        }}>
                                        <Center style={{
                                            borderWidth: 1,
                                            borderRadius: theme.dimens.space.md,
                                            width: theme.dimens.space.xl * 1.4,
                                            height: theme.dimens.space.xl * 1.4,
                                            borderColor: props.selectedId == opt?.id ?
                                                theme.colors.accent : theme.colors.background,
                                            padding: theme.dimens.space.md
                                        }}>
                                            <Caption style={{
                                                color: theme.colors.text,
                                            }}>{opt?.title || opt.id}</Caption>

                                        </Center>
                                    </PressableView>
                                )
                            }}
                            keyExtractor={(item) => item?.id || `${Date.now()}`}
                            extraData={props.selectedId}
                        />
                    ) :

                        (
                            <BottomSheet
                                swipeToCloseDisabled={props.swipeToCloseDisabled}
                                visible={visible as boolean}
                                onDismiss={() => {
                                    setVisible(false)
                                }}
                                analyticsId={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'dialog')}
                                analyticsExtras={props.analyticsExtras}
                                title={props.title || ''} >

                                <ScrollView style={{
                                    maxHeight: '50%',
                                }}>
                                    {
                                        props.options?.length == 0 && props.onEmptyListPlaceholder ?
                                            (
                                                props.onEmptyListPlaceholder(() => {
                                                    setVisible(false)
                                                })
                                            )
                                            :
                                            (

                                                props.onRenderList ?
                                                    props.onRenderList(props.options, (selectedId: string, opt: DropDownViewOption) => {
                                                        setVisible(false)
                                                        props.onSelect(selectedId, opt)
                                                    }) :
                                                    (
                                                        props.options.map((opt, idx) => {
                                                            if (props.onRenderOption) {
                                                                return props.onRenderOption(opt, onSelect)
                                                            }
                                                            return (
                                                                <TertiaryButtonView
                                                                    testID={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, opt.id)}
                                                                    //@ts-ignore
                                                                    nativeID={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, opt.id)}
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
                                                    )
                                            )

                                    }
                                </ScrollView>
                            </BottomSheet>
                        )
                }

                {
                    shouldShowLabel && (
                        displayType == 'button' ? (

                            //@ts-ignore
                            <ButtonView
                                {...props}
                                analyticsId={openAnalyticsId}
                                analyticsExtras={props.analyticsExtras}
                                onPress={() => {
                                    openDropDown()
                                }}
                                text={getSelected()?.title || getSelected()?.id || 'select'} style={props.style}>
                            </ButtonView>
                        ) : (
                            //@ts-ignore
                            <PressableView
                                {...props}
                                analyticsId={openAnalyticsId}
                                analyticsExtras={props.analyticsExtras}
                                onPress={() => {
                                    openDropDown()
                                }}
                            >
                                <CompositeTextInputView
                                    readOnly={true}
                                    placeholder={props.title}
                                    {...props}
                                    value={getSelected()?.title || getSelected()?.id || props.title}
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
    children?: any,
    noSheet?: boolean,
    style?: ViewStyle,
    analyticsId?: string,
    analyticsExtras?: any
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {
    return <GenericDialog {...props} confirmText={props.confirmText || 'common.confirm'} cancelText={props.cancelText || 'common.cancel'} />
}


export function GenericDialog(props: ConfirmationDialogProps) {

    const confirmText = props.confirmText
    const cancelText = props.cancelText
    const theme = useContext(ThemeContext)
    const Conatiner = props?.noSheet ? VBox : BottomSheet
    return (
        <Conatiner
            style={[props?.noSheet ? {
                display: props.visible ? 'flex' : 'none'
            } : {}, props.style]}
            onDismiss={() => {
                props.onDismiss && props.onDismiss()
            }}
            {...props}
        >
            <VBox>
                {(props?.noSheet && props.title) ? <Center><Subtitle>{props.title as any}</Subtitle></Center> : null}

                {props.message && <TextView style={{
                    padding: theme.dimens.space.lg,
                    textAlign: 'center'
                }}>{props.message}</TextView>}
                {
                    confirmText && <ButtonView aria-label={props.title as string} text={confirmText as string} onPress={() => {
                        props.onDismiss && props.onDismiss()
                        props.onConfirm && props.onConfirm()
                    }}
                        analyticsId={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'confirm')}
                        analyticsExtras={props.analyticsExtras} />
                }
                {
                    cancelText && <TertiaryButtonView
                        aria-label={props.title as string}
                        style={{
                            marginTop: 0
                        }}
                        text={cancelText as string} onPress={() => {
                            props.onDismiss && props.onDismiss()
                            props.onCancel && props.onCancel()
                        }}
                        analyticsId={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'cancel')}
                        analyticsExtras={props.analyticsExtras} />
                }

            </VBox>

        </Conatiner>
    )
}



export function WebBrowserView(props: {
    url: string,
    title?: string,
    openMessage?: string,
    retryMessage?: string,
    cancelMessage?: string;
    analyticsId?: string,
    analyticsExtras?: any,
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
        theme.onTrack(
            TrackingActionType.VIEW,
            TrackingViewType.WEBVIEW,
            TrackerUtils.textOrAnalyticsId(props.analyticsId, 'webview-' + props.title),
            props.analyticsExtras !== undefined ? props.analyticsExtras : {
                url: props.url,
                message: props.openMessage
            }
        )
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
                    analyticsId={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'retry')}
                    analyticsExtras={props.analyticsExtras}
                    style={{
                        width: '80%'
                    }}>{props.retryMessage || "Retry"}</LoadingButton>
                <TertiaryButtonView
                    onPress={() => {
                        props.onCancel && props.onCancel()
                    }}
                    analyticsId={TrackerUtils.analyticsIdWithSuffix(props.analyticsId, 'cancel')}
                    analyticsExtras={props.analyticsExtras}
                    text={props.cancelMessage || "Cancel"} />
            </Center>
        </VPage>
    );
}
