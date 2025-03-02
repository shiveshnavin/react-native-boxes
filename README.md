# React Native Boxes
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Web](https://img.shields.io/badge/Web-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=apple&logoColor=white)


A simple to use react library that does all the UI heavy lifting for you so that you can focus on value and not code !

Out-of-the box comes with:
- Themes
- Layouts (Cards, Vertical, Horizontal, Centered etc.)
- Texts (Title, Subtitle, Text, Caption etc.)
- Buttons (Simple, Transparent, Loading etc.)
- Images and Icons (Icons, Avatars, Images etc.)
- Font (Specify Regular, Styled and Bold fonts)
- Bars (Toolbars, Bottom nav bars etc.)
- Modals (Dialogboxes, Selection bottomsheet, Horizontal selection etc.)
- Expand box (Animated)
- Lists (Simple data list)
- Webview (In app web browser)
- Internationalization (I18n)
- Analytics (Clicks, Impression tracking)

## Install

```
npm install react-native-boxes
```

## Dependencies

Make sure you have following dependencies installed. The versions can be any satisfying version but must not have any breaking changes.

```
    "@expo/vector-icons": "^13.0.0",
    "react": "^18.2.0",
    "@react-native-async-storage/async-storage": "1.23.1",
    "react-native": "^0.73.6",
    "react-native-safe-area-context": "^4.9.0",
    "react-native-gesture-handler":"~2.14.0"
```

## Usage
At the root of your app you must add a theme context and thats it! You are good to go. 
```
import { Colors, DarkColors, Theme } from 'react-native-boxes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App(){ 
    const colorScheme = 'dark'
    const theme = new Theme('my-app', colorScheme === 'dark' ? DarkColors : Colors);
    return (
        <ThemeContext.Provider value={theme} >
            <GestureHandlerRootView> 
                <WatchlistPage />
            </GestureHandlerRootView>
        </ThemeContext.Provider>
    )
}
```
Optional: If you are also gonna use bottomsheets, Add `GestureHandlerRootView`

## Components

### Themes
Dark colors and Light colors come out of the box.

Dark Colors

![image](https://github.com/user-attachments/assets/e95508cb-497a-4341-a32f-cacdf2daea07)


Light Colors

![image](https://github.com/user-attachments/assets/ed97e567-2160-487a-85f9-c1a21abbca86)


<details>
    <summary>Customizing theme</summary>
    
    import { Colors, Theme } from 'react-native-boxes';
    ...
    
    const MyColors = Object.assign(Colors, {
        accent: '#086CFE',
        accentLight: '#337DFF',
        text: '#444444',
        caption: '#A9A9A9',
        heading: '#222222',
        background: '#E6E6E6',
        forground: '#fff',
        transparent: 'transparent',
        semitransparent: '#111a1a1c',
        info: '#2196F3',
        success: '#4CAF50',
        successBackground: '#388E3C',
        warning: '#FFA726',
        critical: '#F44336',
        invert: {
            text: '#fff',
            caption: '#fff',
            heading: '#fff',
            background: '#1a1a1c'
        }
    })
     const theme = new Theme('my-app', MyColors);
    return (
        <ThemeContext.Provider value={theme} >
                <WatchlistPage />
        </ThemeContext.Provider>
    )
                    
</details>

You can also customize sizes, dimensions etc, but it is not recommended.
<details>
    <summary>Customizing other theme options</summary>

    const theme = new Theme(
        appname = '',
        colors  ,
        dimens ,
        fonts  ,
        styles , 
    )
        
</details>


### Layouts

### VPage
Your root tag for pages. Consists of vertical alignment and some basic padding.

![image](https://github.com/user-attachments/assets/85488495-4225-4a88-86b3-ecead70f647d)

<details>
    <summary>Code sample</summary>
    
    <VPage>
      <Title>Watchlist1</Title>
    </VPage>

</details>

#### Center
![image](https://github.com/user-attachments/assets/71ea1680-5b43-42b6-81c6-f03799912e95)
 
<details>
    <summary>Code sample</summary>

    <Center>
        <Title>Watchlist</Title>
        <Caption>Coming soon  </Caption>
    </Center>

</details>
 
#### VBox
![image](https://github.com/user-attachments/assets/b4d765c6-5879-4880-a28c-3aca0e88a07b)

<details>
    <summary>Code sample</summary>
    
    <VBox>
        <Title>Watchlist</Title>
        <Caption>Coming soon  </Caption>
    </VBox>

</details>
 

#### HBox
![image](https://github.com/user-attachments/assets/0b868e4e-d637-4ac9-a695-20bd420f1fad)

<details>
    <summary>Code sample</summary>
    
      <HBox>
        <Title>Watchlist1</Title>
        <Title>Watchlist2</Title>
      </HBox>
      
</details>


### Texts
![image](https://github.com/user-attachments/assets/5346a25f-a22e-495e-994e-a2bd2931de5d)

<details>
    <summary>Code sample</summary>
    Icons are from Fontawesome 
    https://icons.expo.fyi/Index
    
    <Title>Watchlist Title</Title>
      <TextView>
        This is a text with a simple example from a watchlist screen. You can add stocks to your watchlist and see their performance. You can also add alerts to get notified when a stock reaches a certain price.
      </TextView>
      <Subtitle>This is a subtitle for watchlist</Subtitle>
      <TitleText>
        This is a title text that explains what a watchlist is.
      </TitleText>
      <TextView>
        A watchlist is a list of stocks that you are interested in.
      </TextView>
      <TitleText>
        This is a another title text that explains what a watchlist is.
      </TitleText>
      <TextView>
        A watchlist is a list of stocks that you are interested in.
      </TextView>
      <Caption>
        This is a caption. All investments are subject to market risk. Please do your own research before investing in any stock. This app is for educational purposes only.
      </Caption>
    
</details>


### Images

#### Avatars

![image](https://github.com/user-attachments/assets/0e6b7ce7-9302-40b8-a570-4e166f6a423d)


- With icon
- With image url
- With text

<details>
    <summary>Code sample</summary>

    
    <Avatar iconName='user' />
    <Avatar iconUrl='https://avatars.githubusercontent.com/u/16799797?v=4' />
    <Avatar iconText='SN' />
          
</details>

#### Icons
Support for Fontawesome icon names from https://icons.expo.fyi/

![image](https://github.com/user-attachments/assets/b36ac996-556d-4027-ac6a-454bd65d7a50)

<details>
    <summary>Code sample</summary>
    
    <Icon name='home' size={50} />
    <Title>Light Theme Watchlist</Title>
          
</details>

### Buttons

<details>
    <summary>Simple button code sample</summary>
    
    <ButtonView text='Simple Button' />
    
</details>

![image](https://github.com/user-attachments/assets/55c063be-5a24-434b-b027-2ca0b88878f6)


<details>
    <summary>Transparent button code sample</summary>
    
    <TransparentButton text='Transparent Button' />
    
</details>

![image](https://github.com/user-attachments/assets/e45fa3ff-ab51-4241-9c2a-62d01cfd365e)


<details>
    <summary>Loading button code sample</summary>
    
    const [loading, setLoading] = useState(false)

    <LoadingButton loading={loading} text='Loading Button' onPress={() => {
        setLoading((prev) => !prev)
      }} />
    
</details> 

![ezgif-451f0321da765b](https://github.com/user-attachments/assets/7bd832ac-c5d1-4dbf-8faf-5aa9f3a72cc7)

### Bottombar
![image](https://github.com/user-attachments/assets/402682fc-35aa-42bc-905d-da6509aec269)

<details>
    <summary>Code sample</summary>
    Icons are from Fontawesome 
    https://icons.expo.fyi/Index
    
    export default function AppBottomBar() {
      const theme = useContext(ThemeContext)
      const router = useRouter()
      const [selectedId, setSelectedId] = React.useState('watchlist')
      return (
        <BottomNavBar
          selectedId={selectedId}
          options={[
            {
              id: 'watchlist',
              icon: 'bookmark',
              title: 'Watchlist'
            },
            {
              id: 'orders',
              icon: 'file-text',
              title: 'Orders'
            },
            {
              id: 'positions',
              icon: 'briefcase',
              title: 'Positions'
            },
            {
              id: 'settings',
              icon: 'gears',
              title: 'Settings'
            }
          ]}
          onSelect={(selectedId) => {
            console.log('selected', selectedId)
            setSelectedId(selectedId)
            router.push('/explore')
          }} />
      )
    }
    
</details>


### Expand
 ![Recording 2025-03-01 201906](https://github.com/user-attachments/assets/b69d5ea1-d6d3-4285-b1b1-b8aaeb5536bb)

<details>
    <summary>Code sample</summary>
    
    <Expand title='Expand Watchlist' >
        <TextView>INFY</TextView>
        <TextView>TCS</TextView>
    </Expand>
    
</details>


### Toolbars
 
### Simple Toolbar

![image](https://github.com/user-attachments/assets/c49c8292-4e35-4c9a-813e-3478abc1da11)

<details>
    <summary>Code sample</summary>
    
    <SimpleToolbar title="Watchlist" />
    
</details>

### Transparent Center Toolbar 

![image](https://github.com/user-attachments/assets/7b07ae8c-751c-43b2-90a6-3fb6ef97ab49)

<details>
    <summary>Code sample</summary>
    
    <SimpleToolbar title="Watchlist" />
    
</details>

### Toolbar with buttons

![image](https://github.com/user-attachments/assets/69924f9b-6fbf-47ca-b756-b34f705f1abf)

<details>
    <summary>Code sample</summary>
    
    <TransparentCenterToolbar
        homeIcon={"arrow-left"}
        title="Watchlist"
        options={[{
          id: 'search',
          icon: 'search',
          onClick: () => {
            console.log('Search clicked')
          }
        }]}
      />
    
</details>



### Divider

![image](https://github.com/user-attachments/assets/553f6f23-853d-4233-b771-2b731674c8fd)

<details>
    <summary>Code sample</summary>
    
    <Expand title='Expand Watchlist' >
        <TextView>INFY</TextView>
        <TextView>TCS</TextView>
    </Expand>
    
</details>

### Modals

#### Bottomsheet on mobile
 
![mobile sheet](https://github.com/user-attachments/assets/96c64fb9-9b00-49e3-8c4e-785772e0e880)

<details>
    <summary>Code sample</summary>


      <BottomSheet title="Bottomsheet About Watchlists" visible={showDialog} onDismiss={() => setShowDialog(false)}>
        <TextView>
          This is a simple dialog that can be used to show more information to the user. It is a bottom sheet that can host any content.
        </TextView>
        <HBox />
        <TextView>
          Watchlists are a great way to keep track of your favorite stocks. You can add stocks to your watchlist and see their performance. You can also add alerts to get notified when a stock reaches a certain price.
        </TextView>
        <TertiaryButtonView text='Goto Watchlist' onPress={() => setShowDialog(false)} />
      </BottomSheet>
      
</details>

#### Bottomsheet on Desktop (web)

![desktop sheet](https://github.com/user-attachments/assets/6fbaacb0-c134-43ca-af8c-6089c3b32cc7)

### Web view
Opens a webview on native and a `iframe` on Web

<details>
    <summary>Code sample</summary>

    <WebBrowserView url='https://www.google.com' title='Google'/>
    
</details>

### Internationalization

Install your favorite js library.

![locale](https://github.com/user-attachments/assets/48d3ea46-482f-49f3-8010-52433f15551c)



<details>
    <summary>Code sample</summary>

    import { I18n } from 'i18n-js';

    const I18nProvider = new I18n({
      en: {
        watchlist: {
          hello: 'Hello!'
        }
      },
      hi: {
        watchlist: {
          hello: 'नमस्ते !'
        }
      },
      hinglish: {
        watchlist: {
          hello: 'Namaste !'
        }
      },
      es: {
        watchlist: {
          hello: 'Hola!'
        }
      }
    });
    I18nProvider.missingBehavior = "guess";
    

    export default function App(){
        const [locale, setLocale] = useState('en')
        I18nProvider.locale = locale
        const theme = new Theme('appname', colorScheme === 'dark' ? DarkColors : Colors);
        theme.i18n = I18nProvider
        
          
        return (
            <ThemeContext.Provider value={theme} >
            <Center>
                  <Title>watchlist.hello</Title>
                </Center>
                <Center>
                  <HBox>
                    <TransparentButton text='English' onPress={() => {
                      setLocale('en')
                    }} />
                    <TransparentButton text='Hindi' onPress={() => {
                      setLocale('hi')
        
                    }} />
                  </HBox>
                  <HBox>
                    <TransparentButton text='Hinglish' onPress={() => {
                      setLocale('hinglish')
        
                    }} />
                    <TransparentButton text='Spanish' onPress={() => {
                      setLocale('es')
        
                    }} />
                  </HBox>
            </Center>
         </ThemeContext.Provider>
        )
     }
</details>



### Analytics
If you wanna track the users clicks and impressions on each component, just add a `onTrack` hook to your theme.

```
action : TrackingActionType = click | view | navigate
view : TrackingViewType = button | dropdown...
text : The text related to the component if present
extra : Depending on component, some contextual info. For e.g. the WebView impression gives {url, title} extra
```

<details>

    const theme = new Theme('appname', DarkColors);  
    theme.onTrack = (action, view, text, extras) => {
        myTracker.track(`${action}-${text}-${text}`, extras)
    }
</details>
