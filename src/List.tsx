import { ActivityIndicator, Text, TextStyle, View, ViewProps, ViewStyle } from "react-native"
import { Box, CardView, Center, HBox, VBox } from "./Box"
import { getIcon, Icon } from "./Image"
import { Caption, Subtitle, TextView, TitleText } from "./Text"
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import { PressableView } from "./Button"


export type DatatableViewProps = {
    items: any[],
    itemAdapter: (item: any, idx: number, list: any) => SimpleDatatableViewItemProps,
    loading?: boolean,
} & ViewProps
export function SimpleDatalistView(props: DatatableViewProps) {
    const theme = useContext(ThemeContext)

    return props.loading ?
        <Center style={{
            padding: theme.dimens.space.xl * 2
        }}>
            <ActivityIndicator
                size={theme.dimens.icon.xl}
                color={theme.colors.accent} />
        </Center> :
        <VBox style={[props.style]}>
            {
                props.items.map((item, idx) => {
                    let data = props.itemAdapter(item, idx, props.items)
                    return (
                        <SimpleDatatlistViewItem
                            key={idx}
                            {...data}
                        />
                    )
                })
            }
        </VBox>

}

export type SimpleDatatableViewItemProps = {
    title?: string,
    icon?: string | any,
    subtitle?: string | React.ReactNode,
    body?: string | React.ReactNode,
    action?: React.ReactNode,
    onPress?: () => void,
    flexRatio?: [number, number, number]
}


export function SimpleDatatlistViewItem(props: SimpleDatatableViewItemProps & ViewProps) {
    const Icon = getIcon(props.icon, true)
    const theme = useContext(ThemeContext)
    let flexRatio = props.flexRatio || [1.5, 7.5, 1]
    let [left, middle, right] = flexRatio
    const ttl = left + right + middle
    const percentages = {
        left: (left * 100) / ttl,
        right: (right * 100) / ttl,
        middle: (middle * 100) / ttl
    }
    return (
        <PressableView {...props} onPress={props.onPress} >
            <CardView
                style={[{
                    margin: 0,
                    marginBottom: theme.dimens.space.sm,
                    padding: theme.dimens.space.md,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }, props.style]}>

                <Box style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: `${percentages.left}%`,
                    maxWidth: 30
                }}>
                    {Icon && <Icon style={{
                        padding: theme.dimens.space.md,
                        paddingStart: 0,
                    }} />}
                </Box>
                <VBox style={{
                    //@ts-ignore
                    paddingStart: flexRatio.left > 1 ? theme.dimens.space.md : 0,
                    width: `${percentages.middle}%`,
                    flexShrink: 1,
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                }}>
                    {props.title && (<TitleText style={{
                        marginBottom: 0,
                        paddingBottom: 0,
                        padding: 0,
                    }}>{props.title}</TitleText>)}
                    {props.subtitle && (<TextView style={{
                        marginTop: 0,
                        padding: 0,
                    }}>{props.subtitle}</TextView>)}
                    {props.body && (<Caption style={{
                        margin: 0,
                        padding: 0
                    }} >{props.body}</Caption>)}
                </VBox>
                <Box style={{
                    alignItems: 'flex-end',
                    width: `${percentages.right}%`,
                    padding: 0
                }}>
                    {props.action}
                </Box>
            </CardView>
        </PressableView>
    )
}




export function InfoRow(props: {
    title: string,
    text: string,
    icon?: string | React.ReactNode,
    color?: string,
    style?: ViewStyle,
    textStyle?: TextStyle,
    onPress?: () => void
}) {
    const theme = useContext(ThemeContext)
    const InfoIcon = getIcon(props.icon)
    return (
        <PressableView onPress={props.onPress} style={{
            opacity: props.onPress ? undefined : 1
        }}>
            <HBox style={{
                paddingStart: theme.dimens.space.sm,
                paddingBottom: theme.dimens.space.sm,
                alignItems: 'center',
            }}>
                {InfoIcon && (<InfoIcon
                    size={theme.dimens.icon.md * 1.25}
                    color={props.color}
                    style={{
                        paddingEnd: theme.dimens.space.sm,
                        paddingStart: theme.dimens.space.sm,
                    }} />)}
                <VBox style={[{
                    flex: 1,
                    paddingStart: theme.dimens.space.sm,
                }, props.style]}>
                    <HBox style={{
                        alignItems: 'center',
                    }}>

                        <TitleText style={{
                            color: props.color,
                            marginBottom: 0,
                            paddingBottom: 0,
                            flexWrap: 'wrap'
                        }}>
                            {props.title || ' '}
                        </TitleText>
                    </HBox>
                    <TextView style={[{
                        marginTop: 0,
                        paddingTop: 0,
                    }, props.textStyle]}>
                        {props.text || ' '}
                    </TextView>
                </VBox>
            </HBox>

        </PressableView>
    )
}
export function IconRow(props: {
    text: string,
    icon?: string | React.ReactNode,
    onPress?: () => void,
    color?: string
}) {
    const theme = useContext(ThemeContext)
    const LeftIcon = getIcon(props.icon)
    return (
        <PressableView onPress={props.onPress}>
            <HBox style={{
                marginBottom: theme.dimens.space.md,
                alignItems: 'center'
            }}>
                <LeftIcon style={{
                    width: theme.dimens.icon.md,
                    marginRight: theme.dimens.space.md
                }} color={props.color || theme.colors.text} />
                <TitleText style={{
                    color: props.color || theme.colors.text
                }}>{props.text}</TitleText>
            </HBox>
        </PressableView>
    )
}



export function SettingRow({
    text,
    icon,
    style,
    color,
    colorDesc,
    description,
    rightIcon,
    onPress,
}: {
    text: string;
    icon?: string | any;
    color?: string;
    colorDesc?: string;
    description?: string;
    rightIcon?: string | any;
    style?: ViewStyle;
    onPress: () => void;
}) {
    const theme = useContext(ThemeContext);
    const RightIcon = getIcon(rightIcon);
    const LeftIcon = getIcon(icon);
    return (

        <PressableView onPress={onPress} style={{
            width: '100%',

        }}>
            <HBox
                style={[
                    {
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: theme.dimens.space.lg,
                        paddingLeft: theme.dimens.space.lg,
                        paddingBottom: theme.dimens.space.md,
                    },
                    style,
                ]}
            >
                <HBox style={{
                    flex: 1,
                    alignItems: "center",
                }}>
                    {icon && (
                        typeof icon == 'string' ? <Icon name={icon}
                            size={theme.dimens.icon.md}
                            color={color || theme.colors.text}
                            style={{
                                paddingBottom: description ? theme.dimens.space.md : 0,
                            }} /> : (LeftIcon && <LeftIcon />)
                    )}

                    <VBox style={{
                        paddingStart: theme.dimens.space.lg,
                        flex: 1
                    }}>
                        <TitleText
                            style={{
                                color: color || theme.colors.text,
                                fontFamily: theme.fonts.Styled,
                                paddingTop: 0,
                                paddingBottom: 0,
                            }}
                        >
                            {text}
                        </TitleText>

                        {description && <Caption style={{
                            color: colorDesc || theme.colors.caption,
                        }}>{description}</Caption>}
                    </VBox>
                </HBox>

                {rightIcon && <RightIcon />}
            </HBox>

        </PressableView>
    );
}
