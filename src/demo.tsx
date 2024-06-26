import { useContext, useEffect, useReducer, useState } from 'react';
import * as React from 'react'
import { Alert, LayoutAnimation, SafeAreaView, Switch } from 'react-native';
import { BottomNavBar, ButtonView, Caption, Center, CompositeTextInputView, SimpleDatatlistViewItem, Expand, HBox, LoadingButton, PressableView, RightIconButton, SimpleToolbar, Subtitle, TextInputView, TextView, Theme, ThemeContext, Title, VBox, SimpleDatalistView } from '.';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertMessage } from './Message';
import { BottomSheet, DropDownView } from './Modal';
import { Avatar, Icon } from './Image';
import { ReactWrapper } from './utils';
import { Box, KeyboardAvoidingScrollView } from './Box';
import { DarkColors, LightColors } from './Styles';

export interface DemoScreenProps {
  navigation?: any
}

export function DemoScreen({ navigation }: DemoScreenProps) {

  const theme: Theme = useContext(ThemeContext)
  console.log('Rendering')
  const btnIcon = (<FontAwesome name='google'
    size={theme.dimens.icon.md}
    color={theme.colors.invert.text} />)
  const [loading, setLoading] = useState(false)
  const [alert, setBs] = useState(`In this version, the icon used is always 'chevron-right' even when expanded.`)
  const [bottomsheetVisible, setbottomsheetVisible] = useState(false)
  function setAlert(bs: string) {
    setBs(bs)
    setTimeout(() => {
      setBs(`In this version, the icon used is always 'chevron-right' even when expanded.`)
    }, 5000)
  }

  const [selectedBottombarId, setSelectedBottomBarId] = useState('home')
  const [mText, setMText] = useState(`@shivesh`)
  const [bottomBarHeight, setBottombarHeight] = useState(theme.dimens.space.xl)
  const [selectedTheme, setSelectedTheme] = useState(true)
  useEffect(() => {
    theme.colors = selectedTheme ? LightColors : DarkColors
    forceUpdate()
  }, [selectedTheme])
  const [, forceUpdate] = useReducer(x => x + 1, 0);



  const dataList = [
    {
      country: 'India',
      captialSlogan: 'Ye delhi hai mere yaar!',
      about: 'India is a promise land in the heart of asia. Soon there will be akhand bharat!',
    },
    {
      country: 'Japan',
      captialSlogan: 'Land of the Rising Sun',
      about: 'Japan is an island nation in East Asia. It is known for its advanced technology, rich history, and unique culture.',
    },
    {
      country: 'Italy',
      captialSlogan: 'The Boot-Shaped Beauty',
      about: 'Italy is a country located in Southern Europe. It is known for its historical landmarks, delicious food, and beautiful scenery.',
    },
    {
      country: 'Brazil',
      captialSlogan: 'Land of Samba and Carnival',
      about: 'Brazil is the largest country in South America. It is known for its vibrant culture, stunning beaches, and diverse rainforest.',
    },
  ];
  const [selCountry, setSelCountry] = useState(dataList[0].country)

  return (
    <SafeAreaProvider>
      <VBox
        style={{
          backgroundColor: theme.colors.background,
          padding: 0,
          paddingBottom: bottomBarHeight,
          margin: 0,
          height: '100%'
        }} >
        <SimpleToolbar
          title="Demo"
          homeIcon={
            ReactWrapper(<Icon color={theme.colors.invert.text} name="plus" />)
          }
          options={[
            {
              id: 'test',
              icon: 'gear',
              onClick: (id) => {
              }
            },
            {
              id: 'test2',
              icon: ReactWrapper(<PressableView>
                <Avatar
                  style={{
                    margin: 0,
                    height: theme.dimens?.icon?.md * 1.25,
                    width: theme.dimens?.icon?.md * 1.25,
                  }}
                  iconUrl="https://avatars.githubusercontent.com/u/16799797?v=4" />
              </PressableView>),
              onClick: (id) => {
              }
            }
          ]} />
        <KeyboardAvoidingScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps={'handled'}
          style={{
            flexGrow: 1,
          }}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >

          <Center style={{
            flexDirection: 'row',
            padding: 20
          }}>

            <Avatar
              onPress={() => {
                setbottomsheetVisible(true)
              }}
              style={{
                borderColor: theme.colors.success,
              }}
              iconNameProps={{
                name: 'user',
                color: theme.colors.success,
                size: theme.dimens.icon.lg
              }}
            />
            <Center>
              <Avatar
                style={{
                  borderWidth: theme.dimens.space.sm,
                  width: 100,
                  height: 100,
                  borderColor: theme.colors.success
                }}
                iconText='SN'
                onPress={() => {
                  setbottomsheetVisible(true)
                }}
                iconNameProps={{
                  name: 'user',
                  color: theme.colors.success,
                  size: theme.dimens.icon.lg
                }}
                iconUrl='https://cdn.truelancer.com/user-picture/307510-5c1f11bad82e9.jpg' />
              <Subtitle>{mText}</Subtitle>
            </Center>

            <Avatar
              style={{
                borderColor: theme.colors.success,
                color: theme.colors.success
              }}
              onPress={() => {
                setbottomsheetVisible(true)
              }}
              iconText='SN' />
          </Center>

          <Expand title='Datalist' initialExpand={false}>
            <SimpleDatalistView
              items={dataList}
              itemAdapter={(item) => {
                const [isEnabled, setisEnabled] = useState(true)
                return {
                  onPress: () => {
                    console.log('presssss')
                  },
                  action: (
                    <PressableView
                      onPress={(e) => {
                        e.stopPropagation()
                      }}>
                      <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        value={isEnabled}
                        onValueChange={(enab) => {
                          setisEnabled(enab)
                        }}
                      />
                    </PressableView>

                  ),
                  icon: (
                    <Avatar iconText={item.country.substr(0, 2).toUpperCase()} />
                  ),
                  flexRatio: [2, 7, 1],
                  title: item.country,
                  subtitle: item.captialSlogan,
                  body: item.about
                }
              }}
            />
            <Box style={{
              height: 0.1,
              width: '100%',
              margin: theme.dimens.space.md,
              backgroundColor: theme.colors.caption
            }} />
            <SimpleDatatlistViewItem
              icon={(
                <Avatar iconText='GH' />
              )}
              flexRatio={[2.5, 6.5, 1]}
              title='Go home'
              subtitle="Go big or Go home !"
              body="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available."
              action={(<Icon name="arrow-right" onPress={() => {
                console.log('pressed')
              }} />)}
            />

            <SimpleDatatlistViewItem
              icon="home"
              title='Go home'
              subtitle="In publishing and graphic design"
              action={(<Icon name="arrow-right" />)} />

            <SimpleDatatlistViewItem
              icon="home"
              title='Go home'
              subtitle="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available."
              action={(<Icon name="arrow-right" />)}
            />
          </Expand>

          <Expand title='Message Alert' initialExpand={false}
            style={{
              backgroundColor: theme.colors.forground
            }}
            titleBackgroundColor={theme.colors.forground}
          >
            <VBox>
              <AlertMessage text={alert} onDismiss={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setAlert('')
              }} />
              <AlertMessage text='Critial Message' type='critical' />
              <AlertMessage text='Success' type='success' />
              <AlertMessage text='Warning Message' type='warning' />
            </VBox>

          </Expand>
          <Expand title='Dropdowns'
            initialExpand={false}
          >
            <DropDownView
              title={"Select Country"}
              forceDialogSelectOnWeb={true}
              onSelect={(id) => {
                setSelCountry(id)
              }}
              selectedId={selCountry}
              options={dataList.map((d) => {
                return {
                  id: d.country,
                  value: d.captialSlogan,
                  title: d.captialSlogan
                }
              })} />
            <DropDownView
              displayType='button'
              title={"Select Country"}
              forceDialogSelectOnWeb={true}
              onSelect={(id) => {
                setSelCountry(id)
              }}
              selectedId={selCountry}
              options={dataList.map((d) => {
                return {
                  id: d.country,
                  value: d.captialSlogan,
                  title: d.captialSlogan
                }
              })} />
          </Expand>
          <Expand
            style={{
              padding: 0,
              borderWidth: 0.1,
              borderColor: '#DCDCDC'
            }}
            duration={200}
            title='In this version, the icon used is always chevron-right even when expanded. In this version, the icon used is always chevron-right even when expanded.'
            initialExpand={false} iconPosition='right'>
            <VBox>
              <Title>Text A</Title>
              <Subtitle>Text A Text A Text AText A Text AText A</Subtitle>
              <TextView>Text A</TextView>
              <Caption>Text Caption</Caption>
            </VBox>
          </Expand>
          <Expand title='Inputs'>

            <VBox>
              <TextInputView
                style={{
                  fontFamily: theme.fonts.Bold
                }}
                initialText={mText}
                value={mText}
                onChangeText={t => setMText(t)} />
              <CompositeTextInputView
                onChangeText={t => setMText(t)}
                placeholder='A test'
                initialText='Test' />
              <CompositeTextInputView
                inputMode='decimal'
                icon={"close"}
                style={{
                }}
                alertTextColor={theme.colors.warning}
                placeholder='Enter your name'
                initialText='Test'
                value={mText}
                onChangeText={t => setMText(t)} />
              <CompositeTextInputView
                style={{
                }}
                placeholder='Enter number'
                alertText={mText?.indexOf("@") > -1 ? '' : 'Please enter @ or else I am gonna come down at your place and mess you up buddy !'}
                initialText='Test'
                value={mText}
                onChangeText={t => setMText(t)} />
            </VBox>
          </Expand>

          <Expand
            iconStyle={{
              name: 'chevron-right',
              color: 'red'
            }}
            title='Buttons'
            initialExpand={true}>
            <VBox style={{
            }}>
              <VBox >

                <ButtonView
                  icon="google"
                  style={{
                  }}>Button Icon</ButtonView>

                <ButtonView
                  icon={btnIcon}
                  style={{
                  }}>Button Icon</ButtonView>

                <ButtonView style={{
                }}>Button Text</ButtonView>
              </VBox>
              <RightIconButton
                text='Click Me Icon'
                icon={btnIcon}>
              </RightIconButton>

              <Center>
                <LoadingButton

                  onPress={(e) => {
                    setLoading(!loading)
                  }}
                  loading={loading}
                  text='Click Me' />

                <ButtonView
                  underlayColor={theme.colors.transparent}
                  style={{
                    color: theme.colors.accent,
                    backgroundColor: theme.colors.transparent,
                  }}>Tertiary button</ButtonView>

              </Center>

              <Expand title='Nested expand'>
                <HBox style={{
                  justifyContent: 'center',
                }}>
                  <LoadingButton
                    style={{
                      width: 'auto'
                    }}
                    onPress={(e) => {
                      setLoading(!loading)
                    }}
                    loading={loading}
                    text='Click Me left' />
                  <LoadingButton
                    loaderStyle='transparent'
                    style={{
                      width: 'auto'
                    }}
                    onPress={(e) => {
                      setLoading(!loading)
                    }}
                    loading={loading}
                    text='Click Me right' />
                </HBox>
              </Expand>

            </VBox>
          </Expand>



          <ButtonView
            underlayColor={theme.colors.transparent}
            style={{
              color: theme.colors.accent,
              backgroundColor: theme.colors.transparent,
            }}
            onPress={() => {
              setSelectedTheme(!selectedTheme)
            }}>{selectedTheme ? 'Light' : 'Dark'}</ButtonView>


          <ButtonView
            underlayColor={theme.colors.transparent}
            style={{
              color: theme.colors.accent,
              backgroundColor: theme.colors.transparent,
            }}
            onPress={() => {
              setbottomsheetVisible(true)
            }}>Show Sheet</ButtonView>


        </KeyboardAvoidingScrollView>
        <BottomNavBar
          style={{
            borderTopLeftRadius: theme.dimens.space.md,
            borderTopRightRadius: theme.dimens.space.md,
          }}
          onSelect={setSelectedBottomBarId}
          selectedId={selectedBottombarId}
          options={[
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
              icon: ReactWrapper(<PressableView>
                <Avatar
                  onPress={() => {
                    setSelectedBottomBarId('profile')
                  }}
                  style={{
                    borderColor: selectedBottombarId == 'profile' ?
                      theme.colors.accent : theme.colors.caption,
                    margin: 0,
                    height: theme.dimens?.icon?.md,
                    width: theme.dimens?.icon?.md,
                  }}
                  // iconName='user'
                  iconUrl="https://avatars.githubusercontent.com/u/16799797?v=4"
                />
              </PressableView>)
            }
          ]}
          onDimens={(w, h) => {
            setBottombarHeight(h)
            console.log("bottomBarHeight", h)
          }} />

        <BottomSheet
          title="About"
          visible={bottomsheetVisible} onDismiss={() => {
            setbottomsheetVisible(false)
          }} >
          <TextView>Dinosaurs are a diverse group of reptiles of the clade Dinosauria. They first appeared during the Triassic period, between 243 and 233.23 million years ago, although the exact origin and timing of the evolution of dinosaurs is a subject of active research.</TextView>

          <TextView>Dinosaurs are a diverse group of reptiles of the clade Dinosauria. They first appeared during the Triassic period, between 243 and 233.23 million years ago, although the exact origin and timing of the evolution of dinosaurs is a subject of active research.</TextView>
          <Expand title='Types' initialExpand={false}
            style={{
              padding: 0,
              backgroundColor: theme.colors.forground
            }}
            titleBackgroundColor={theme.colors.forground}
          >
            <VBox>
              <AlertMessage text={alert} onDismiss={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setAlert('')
              }} />
              <AlertMessage text='Tyrannosaurus rex' type='critical' />
              <AlertMessage text='Spinosaurus' type='success' />
              <AlertMessage text='Ankylosaurs' type='warning' />
            </VBox>

          </Expand>
        </BottomSheet>
      </VBox>
    </SafeAreaProvider>
  );
}
