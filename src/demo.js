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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoScreen = void 0;
const react_1 = require("react");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const _1 = require(".");
const FontAwesome_1 = __importDefault(require("@expo/vector-icons/FontAwesome"));
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const Message_1 = require("./Message");
const Modal_1 = require("./Modal");
const Image_1 = require("./Image");
const utils_1 = require("./utils");
const Box_1 = __importDefault(require("./Box"));
const Styles_1 = require("./Styles");
function DemoScreen({ navigation }) {
    const theme = (0, react_1.useContext)(_1.ThemeContext);
    console.log('Rendering');
    const btnIcon = (<FontAwesome_1.default name='google' size={theme.dimens.icon.md} color={theme.colors.invert.text}/>);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [alert, setBs] = (0, react_1.useState)(`In this version, the icon used is always 'chevron-right' even when expanded.`);
    const [bottomsheetVisible, setbottomsheetVisible] = (0, react_1.useState)(false);
    function setAlert(bs) {
        setBs(bs);
        setTimeout(() => {
            setBs(`In this version, the icon used is always 'chevron-right' even when expanded.`);
        }, 5000);
    }
    const [selectedBottombarId, setSelectedBottomBarId] = (0, react_1.useState)('home');
    const [mText, setMText] = (0, react_1.useState)(`@shivesh`);
    const [bottomBarHeight, setBottombarHeight] = (0, react_1.useState)(theme.dimens.space.xl);
    const [selectedTheme, setSelectedTheme] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        theme.colors = selectedTheme ? Styles_1.LightColors : Styles_1.DarkColors;
        forceUpdate();
    }, [selectedTheme]);
    const [, forceUpdate] = (0, react_1.useReducer)(x => x + 1, 0);
    return (<react_native_safe_area_context_1.SafeAreaProvider>
      <_1.VBox style={{
            backgroundColor: theme.colors.background,
            padding: 0,
            paddingBottom: bottomBarHeight,
            margin: 0,
            height: '100%'
        }}>
        <_1.SimpleToolbar title="Demo" homeIcon={(0, utils_1.ReactWrapper)(<Image_1.Icon color={theme.colors.invert.text} name="plus"/>)} options={[
            {
                id: 'test',
                icon: 'gear',
                onClick: (id) => {
                }
            },
            {
                id: 'test2',
                icon: (0, utils_1.ReactWrapper)(<_1.PressableView>
                <Image_1.Avatar style={{
                        margin: 0,
                        height: theme.dimens?.icon?.md * 1.25,
                        width: theme.dimens?.icon?.md * 1.25,
                    }} iconUrl="https://avatars.githubusercontent.com/u/16799797?v=4"/>
              </_1.PressableView>),
                onClick: (id) => {
                }
            }
        ]}/>
        <Box_1.default automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps={'handled'} style={{
            flexGrow: 1,
        }} nestedScrollEnabled={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

          <_1.Center style={{
            flexDirection: 'row',
            padding: 20
        }}>

            <Image_1.Avatar onPress={() => {
            setbottomsheetVisible(true);
        }} style={{
            borderColor: theme.colors.success,
        }} iconNameProps={{
            name: 'user',
            color: theme.colors.success,
            size: theme.dimens.icon.lg
        }}/>
            <_1.Center>
              <Image_1.Avatar style={{
            borderWidth: theme.dimens.space.sm,
            width: 100,
            height: 100,
            borderColor: theme.colors.success
        }} iconText='SN' onPress={() => {
            setbottomsheetVisible(true);
        }} iconNameProps={{
            name: 'user',
            color: theme.colors.success,
            size: theme.dimens.icon.lg
        }} iconUrl='https://cdn.truelancer.com/user-picture/307510-5c1f11bad82e9.jpg'/>
              <_1.Subtitle>{mText}</_1.Subtitle>
            </_1.Center>

            <Image_1.Avatar style={{
            borderColor: theme.colors.success,
            color: theme.colors.success
        }} onPress={() => {
            setbottomsheetVisible(true);
        }} iconText='SN'/>
          </_1.Center>
          <_1.Expand title='Message Alert' initialExpand={false} style={{
            backgroundColor: theme.colors.forground
        }} titleBackgroundColor={theme.colors.forground}>
            <_1.VBox>
              <Message_1.AlertMessage text={alert} onDismiss={() => {
            react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
            setAlert('');
        }}/>
              <Message_1.AlertMessage text='Critial Message' type='critical'/>
              <Message_1.AlertMessage text='Success' type='success'/>
              <Message_1.AlertMessage text='Warning Message' type='warning'/>
            </_1.VBox>

          </_1.Expand>
          <_1.Expand style={{
            padding: 0,
            borderWidth: 0.1,
            borderColor: '#DCDCDC'
        }} duration={200} title='In this version, the icon used is always chevron-right even when expanded. In this version, the icon used is always chevron-right even when expanded.' initialExpand={false} iconPosition='right'>
            <_1.VBox>
              <_1.Title>Text A</_1.Title>
              <_1.Subtitle>Text A Text A Text AText A Text AText A</_1.Subtitle>
              <_1.TextView>Text A</_1.TextView>
              <_1.Caption>Text Caption</_1.Caption>
            </_1.VBox>
          </_1.Expand>
          <_1.Expand title='Inputs'>

            <_1.VBox>
              <_1.TextInputView style={{
            fontFamily: theme.fonts.Bold
        }} initialText={mText} value={mText} onChangeText={t => setMText(t)}/>
              <_1.CompositeTextInputView onChangeText={t => setMText(t)} placeholder='A test' initialText='Test'/>
              <_1.CompositeTextInputView inputMode='decimal' icon={"close"} style={{}} alertTextColor={theme.colors.warning} placeholder='Enter your name' initialText='Test' value={mText} onChangeText={t => setMText(t)}/>
              <_1.CompositeTextInputView style={{}} placeholder='Enter number' alertText={mText?.indexOf("@") > -1 ? '' : 'Please enter @ or else I am gonna come down at your place and mess you up buddy !'} initialText='Test' value={mText} onChangeText={t => setMText(t)}/>
            </_1.VBox>
          </_1.Expand>

          <_1.Expand iconStyle={{
            name: 'chevron-right',
            color: 'red'
        }} title='Buttons' initialExpand={false}>
            <_1.VBox style={{}}>
              <_1.VBox>
                <_1.ButtonView icon={btnIcon} style={{}}>Button Icon</_1.ButtonView>

                <_1.ButtonView style={{}}>Button Text</_1.ButtonView>
              </_1.VBox>
              <_1.RightIconButton text='Click Me Icon' icon={btnIcon}>
              </_1.RightIconButton>

              <_1.Center>
                <_1.LoadingButton onPress={(e) => {
            setLoading(!loading);
        }} loading={loading} text='Click Me'/>

                <_1.ButtonView underlayColor={theme.colors.transparent} style={{
            color: theme.colors.accent,
            backgroundColor: theme.colors.transparent,
        }}>Tertiary button</_1.ButtonView>

              </_1.Center>

              <_1.Expand title='Nested expand'>
                <_1.HBox style={{
            justifyContent: 'center',
        }}>
                  <_1.LoadingButton style={{
            width: 'auto'
        }} onPress={(e) => {
            setLoading(!loading);
        }} loading={loading} text='Click Me left'/>
                  <_1.LoadingButton loaderStyle='transparent' style={{
            width: 'auto'
        }} onPress={(e) => {
            setLoading(!loading);
        }} loading={loading} text='Click Me right'/>
                </_1.HBox>
              </_1.Expand>

            </_1.VBox>
          </_1.Expand>



          <_1.ButtonView underlayColor={theme.colors.transparent} style={{
            color: theme.colors.accent,
            backgroundColor: theme.colors.transparent,
        }} onPress={() => {
            setSelectedTheme(!selectedTheme);
        }}>{selectedTheme ? 'Light' : 'Dark'}</_1.ButtonView>


          <_1.ButtonView underlayColor={theme.colors.transparent} style={{
            color: theme.colors.accent,
            backgroundColor: theme.colors.transparent,
        }} onPress={() => {
            setbottomsheetVisible(true);
        }}>Show Sheet</_1.ButtonView>


        </Box_1.default>
        <_1.BottomNavBar style={{
            borderTopLeftRadius: theme.dimens.space.md,
            borderTopRightRadius: theme.dimens.space.md,
        }} onSelect={setSelectedBottomBarId} selectedId={selectedBottombarId} options={[
            {
                id: 'home',
                title: 'Home',
                icon: 'home'
            },
            {
                id: 'create',
                title: 'Create',
                icon: 'plus'
            },
            {
                id: 'search',
                title: 'Search',
                icon: 'search'
            },
            {
                id: 'profile',
                title: 'Profile',
                icon: (0, utils_1.ReactWrapper)(<_1.PressableView>
                <Image_1.Avatar onPress={() => {
                        setSelectedBottomBarId('profile');
                    }} style={{
                        borderColor: selectedBottombarId == 'profile' ?
                            theme.colors.accent : theme.colors.caption,
                        margin: 0,
                        height: theme.dimens?.icon?.md,
                        width: theme.dimens?.icon?.md,
                    }} 
                // iconName='user'
                iconUrl="https://avatars.githubusercontent.com/u/16799797?v=4"/>
              </_1.PressableView>)
            }
        ]} onDimens={(w, h) => {
            setBottombarHeight(h);
            console.log("bottomBarHeight", h);
        }}/>

        <Modal_1.BottomSheet title="About" visible={bottomsheetVisible} onDismiss={() => {
            setbottomsheetVisible(false);
        }}>
          <_1.TextView>Dinosaurs are a diverse group of reptiles of the clade Dinosauria. They first appeared during the Triassic period, between 243 and 233.23 million years ago, although the exact origin and timing of the evolution of dinosaurs is a subject of active research.</_1.TextView>

          <_1.TextView>Dinosaurs are a diverse group of reptiles of the clade Dinosauria. They first appeared during the Triassic period, between 243 and 233.23 million years ago, although the exact origin and timing of the evolution of dinosaurs is a subject of active research.</_1.TextView>
          <_1.Expand title='Types' initialExpand={false} style={{
            padding: 0,
            backgroundColor: theme.colors.forground
        }} titleBackgroundColor={theme.colors.forground}>
            <_1.VBox>
              <Message_1.AlertMessage text={alert} onDismiss={() => {
            react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
            setAlert('');
        }}/>
              <Message_1.AlertMessage text='Tyrannosaurus rex' type='critical'/>
              <Message_1.AlertMessage text='Spinosaurus' type='success'/>
              <Message_1.AlertMessage text='Ankylosaurs' type='warning'/>
            </_1.VBox>

          </_1.Expand>
        </Modal_1.BottomSheet>
      </_1.VBox>
    </react_native_safe_area_context_1.SafeAreaProvider>);
}
exports.DemoScreen = DemoScreen;
//# sourceMappingURL=demo.js.map