"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDatatlistViewItem = exports.SimpleDatalistView = void 0;
const react_native_1 = require("react-native");
const Box_1 = require("./Box");
const Image_1 = require("./Image");
const Text_1 = require("./Text");
const react_1 = require("react");
const ThemeContext_1 = require("./ThemeContext");
const Button_1 = require("./Button");
function SimpleDatalistView(props) {
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    return props.loading ?
        <Box_1.Center style={{
                padding: theme.dimens.space.xl * 2
            }}>
            <react_native_1.ActivityIndicator size={theme.dimens.icon.xl} color={theme.colors.accent}/>
        </Box_1.Center> :
        <Box_1.VBox style={[props.style]}>
            {props.items.map((item, idx) => {
                let data = props.itemAdapter(item, idx, props.items);
                return (<SimpleDatatlistViewItem key={idx} {...data}/>);
            })}
        </Box_1.VBox>;
}
exports.SimpleDatalistView = SimpleDatalistView;
function SimpleDatatlistViewItem(props) {
    const RightIcon = (0, Image_1.getIcon)(props.icon, true);
    const theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext);
    let flexRatio = props.flexRatio || [1, 8, 1];
    let [left, middle, right] = flexRatio;
    const ttl = left + right + middle;
    const percentages = {
        left: (left * 100) / ttl,
        right: (right * 100) / ttl,
        middle: (middle * 100) / ttl
    };
    return (<Button_1.PressableView {...props} onPress={props.onPress}>
            <Box_1.CardView style={[{
                margin: 0,
                marginBottom: theme.dimens.space.sm,
                padding: theme.dimens.space.md,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }, props.style]}>

                <Box_1.Box style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: `${percentages.left}%`,
            maxWidth: 30
        }}>
                    {RightIcon && <RightIcon style={{
                padding: theme.dimens.space.md,
                paddingStart: 0,
            }}/>}
                </Box_1.Box>
                <Box_1.VBox style={{
            //@ts-ignore
            paddingStart: flexRatio.left > 1 ? theme.dimens.space.md : 0,
            width: `${percentages.middle}%`,
            flexShrink: 1,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
        }}>
                    {props.title && (<Text_1.Subtitle style={{
                marginBottom: 0,
                paddingBottom: 0,
            }}>{props.title}</Text_1.Subtitle>)}
                    {props.subtitle && (<Text_1.TextView style={{
                marginTop: 0,
                paddingTop: theme.dimens.space.sm,
            }}>{props.subtitle}</Text_1.TextView>)}
                    {props.body && (<Text_1.Caption>{props.body}</Text_1.Caption>)}
                </Box_1.VBox>
                <Box_1.Box style={{
            alignItems: 'flex-end',
            width: `${percentages.right}%`,
            padding: 0
        }}>
                    {props.action}
                </Box_1.Box>
            </Box_1.CardView>
        </Button_1.PressableView>);
}
exports.SimpleDatatlistViewItem = SimpleDatatlistViewItem;
//# sourceMappingURL=List.js.map