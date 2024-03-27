import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Modal, Platform, Pressable, ScrollView, StyleProp, StyleSheet, TextStyle, TouchableHighlight, TouchableOpacity, View, ViewProps } from 'react-native';
import { Icon, IconProps } from './Image';
import { isDesktop } from './utils';
import { ThemeContext } from './ThemeContext';
import { Center, HBox, VBox } from './Box';
import { Subtitle, Title } from './Text';

export type BottomSheetProps = {
    visible: boolean,
    title?: string | React.Component,
    cancellable?: boolean
    children: any
    onDismiss?: Function
}
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
                    backgroundColor: theme.colors.forground
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
                                    <Icon
                                        color={theme.colors.caption} name="close" />
                                </TouchableOpacity>) : (
                                    <View style={{ width: theme.dimens.icon.md }} />
                                )
                            }
                        </HBox>
                        <VBox style={{
                            width: '100%'
                        }}>
                            <ScrollView
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    flex: 1,
                                    maxHeight: 500,
                                }}>
                                {props.children}
                            </ScrollView>
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
    }, [expanded]);

    useEffect(() => {
        setInitDone(true)
    }, [])

    const toggleExpand = () => {
        if (props.onChange) {
            props.onChange(!expanded);
        }
        setExpanded(!expanded);
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