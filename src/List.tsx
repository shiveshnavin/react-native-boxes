import { ActivityIndicator, Text, View, ViewProps } from "react-native"
import { Box, CardView, Center, HBox, VBox } from "./Box"
import { getIcon } from "./Image"
import { Icon } from "@expo/vector-icons/build/createIconSet"
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