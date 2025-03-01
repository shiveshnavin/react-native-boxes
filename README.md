# React Native Boxes

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

### Bottombar
![image](https://github.com/user-attachments/assets/402682fc-35aa-42bc-905d-da6509aec269)

<details>
    <summary>Section A</summary>
    
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
