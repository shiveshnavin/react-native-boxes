# React Native Boxes
A simple to use react library that does all the UI heavy lifting for you so that you can focus on value and not code !

## Install

```
npm install react-native-boxes
```

## Dependencies

Make sure you have following dependencies installed. The versions can be satisfying version but must not have ny breaking changes.

```
    "@expo/vector-icons": "^13.0.0",
    "react": "^18.2.0",
    "react-native": "^0.73.6",
    "react-native-safe-area-context": "^4.9.0",
    "react-native-gesture-handler":"~2.14.0"
```


## Components

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



