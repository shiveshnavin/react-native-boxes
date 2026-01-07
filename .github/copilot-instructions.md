# AI Instructions for React Native Boxes Components

This document provides detailed information about the input props and usage for each component in the react-native-boxes library.

## Table of Contents

1. [Theme & Context](#theme--context)
2. [Layout Components](#layout-components)
3. [Text Components](#text-components)
4. [Button Components](#button-components)
5. [Image Components](#image-components)
6. [Input Components](#input-components)
7. [Bar Components](#bar-components)
8. [Modal Components](#modal-components)
9. [List Components](#list-components)
10. [Message Components](#message-components)
11. [Utilities](#utilities)

---

## Theme & Context

### Theme

The `Theme` class is used to configure the application's appearance and behavior.

**Constructor Parameters:**
- `name` (string): Theme name
- `colors` (typeof Colors): Color scheme object (default: `Colors`)
- `dimens` (typeof Dimens): Dimensions object (default: `Dimens`)
- `fonts` (typeof Fonts): Fonts configuration (default: `Fonts`)
- `styles` (StyleSheet): Custom styles (default: auto-generated)
- `i18n` (I18n): Internationalization instance (optional)
- `onTrack` (AnalyticTracker): Analytics tracking function (optional)

**Properties:**
- `name`: Theme name
- `colors`: Color configuration
- `dimens`: Dimension configuration
- `fonts`: Font configuration
- `styles`: StyleSheet
- `i18n`: Internationalization instance
- `onTrack`: Analytics tracker function
- `insets`: Safe area insets (EdgeInsets)
- `randomColor`: Function to generate random colors

**Methods:**
- `setInsets(insets: EdgeInsets)`: Set safe area insets
- `setTracking(onTrack: AnalyticTracker)`: Set analytics tracker

**Usage:**
```typescript
import { Theme, ThemeContext, Colors, DarkColors } from 'react-native-boxes';

const theme = new Theme('my-app', DarkColors);
theme.onTrack = (action, view, text, extras) => {
  console.log('Track:', action, view, text, extras);
};

<ThemeContext.Provider value={theme}>
  {/* Your app components */}
</ThemeContext.Provider>
```

### Colors

**Light Colors (default):**
- `accent`: '#086CFE'
- `accentLight`: '#337DFF'
- `text`: '#444444'
- `caption`: '#A9A9A9'
- `heading`: '#222222'
- `background`: '#E6E6E6'
- `forground`: '#fff'
- `transparent`: 'transparent'
- `info`: '#2196F3'
- `success`: '#4CAF50'
- `warning`: '#FFA726'
- `critical`: '#F44336'
- `invert`: Object with inverted colors

**Dark Colors:**
Same structure with adjusted values for dark theme.

### Dimens

- `space`: { xs: 1, sm: 5, md: 10, lg: 20, xl: 50 }
- `font`: { sm: 12, md: 14, lg: 16, xl: 24 }
- `icon`: { sm: 12, md: 20, lg: 30, xl: 50, xxl: 80 }

### Fonts

- `Regular`: 'Regular'
- `Bold`: 'Bold'
- `Styled`: 'Styled'

---

## Layout Components

### Box

Basic container component with padding and optional random background color.

**Props:** Extends `ViewProps`
- All standard React Native View props

**Usage:**
```tsx
<Box style={{ backgroundColor: 'white' }}>
  {/* Content */}
</Box>
```

### VBox

Vertical box with column flex direction.

**Props:** Extends `ViewProps`
- All standard React Native View props

**Usage:**
```tsx
<VBox>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</VBox>
```

### HBox

Horizontal box with row flex direction.

**Props:** Extends `ViewProps`
- All standard React Native View props

**Usage:**
```tsx
<HBox>
  <Text>Left</Text>
  <Text>Right</Text>
</HBox>
```

### Center

Centers content both horizontally and vertically.

**Props:** Extends `ViewProps`
- All standard React Native View props

**Usage:**
```tsx
<Center>
  <Text>Centered Content</Text>
</Center>
```

### VPage

Full-screen vertical page container with background color.

**Props:** Extends `ViewProps`
- All standard React Native View props

**Usage:**
```tsx
<VPage>
  <Text>Page Content</Text>
</VPage>
```

### CardView

Card-style container with padding, border radius, and elevated appearance.

**Props:** Extends `ViewProps`
- All standard React Native View props

**Usage:**
```tsx
<CardView>
  <Text>Card Content</Text>
</CardView>
```

### KeyboardAvoidingScrollView

ScrollView that automatically adjusts for keyboard and safe areas.

**Props:** Extends `ScrollViewProps`
- All standard React Native ScrollView props

**Note:** Must be wrapped with SafeAreaView somewhere in parent tree

**Usage:**
```tsx
<KeyboardAvoidingScrollView>
  <TextInput placeholder="Type here" />
</KeyboardAvoidingScrollView>
```

---

## Text Components

### TextView

Base text component with internationalization support.

**Props:** Extends `TextProps`
- `skipI18n` (boolean): Skip internationalization
- `value` (string): Text value (alternative to children)
- `text` (string): Text value (alternative to children)
- All standard React Native Text props

**Usage:**
```tsx
<TextView>Hello World</TextView>
<TextView text="Hello World" />
<TextView value="Hello World" skipI18n={true} />
```

### Title

Large heading text component.

**Props:** Extends `TextProps`
- All standard React Native Text props

**Usage:**
```tsx
<Title>Page Title</Title>
```

### Subtitle

Subtitle text component.

**Props:** Extends `TextProps`
- All standard React Native Text props

**Usage:**
```tsx
<Subtitle>This is a subtitle</Subtitle>
```

### Caption

Small caption text component.

**Props:** Extends `TextProps`
- All standard React Native Text props

**Usage:**
```tsx
<Caption>Small caption text</Caption>
```

### TitleText

Bold title text component.

**Props:** Extends `TextProps`
- All standard React Native Text props

**Usage:**
```tsx
<TitleText>Bold Title</TitleText>
```

---

## Button Components

### ButtonView

Primary button component with customizable styling.

**Props:** Extends `TextProps` & `TouchableHighlightProps`
- `icon` (any): Icon to display (string name or component)
- `text` (string): Button text
- `textStyle` (TextStyle): Custom text styling
- `children` (any): Button content
- All TouchableHighlight props

**Usage:**
```tsx
<ButtonView text="Click Me" onPress={() => console.log('Clicked')} />
<ButtonView icon="home" text="Home" onPress={handlePress} />
```

### TransparentButton

Transparent button with accent color text.

**Props:** Extends `TextProps` & `TouchableHighlightProps`
- `icon` (any): Icon to display
- `text` (string): Button text
- All TouchableHighlight props

**Usage:**
```tsx
<TransparentButton text="Cancel" onPress={handleCancel} />
```

### TertiaryButtonView

Button with transparent background and accent text.

**Props:** Same as `ButtonView`

**Usage:**
```tsx
<TertiaryButtonView text="Learn More" onPress={handleLearnMore} />
```

### LoadingButton

Button with loading state indicator.

**Props:** Extends `TextProps` & `TouchableHighlightProps`
- `loading` (boolean): Show loading indicator
- `icon` (any): Icon to display when not loading
- `text` (string): Button text
- `loaderStyle` ('normal' | 'transparent'): Loading indicator style
- `underlayColor` (string): Underlay color when pressed
- All TouchableHighlight props

**Usage:**
```tsx
<LoadingButton 
  loading={isLoading}
  text="Submit"
  onPress={handleSubmit}
  loaderStyle="normal"
/>
```

### RightIconButton

Button with icon positioned on the right side.

**Props:** Same as `ButtonView`

**Usage:**
```tsx
<RightIconButton 
  text="Next"
  icon="arrow-right"
  onPress={handleNext}
/>
```

### PressableView

Wrapper for React Native Pressable with opacity effect.

**Props:** Extends `PressableProps`
- All standard React Native Pressable props

**Usage:**
```tsx
<PressableView onPress={handlePress}>
  <Text>Pressable Content</Text>
</PressableView>
```

### SwitchView

Switch component with optional label.

**Props:** Extends `SwitchProps`
- `text` (string): Label text
- `orientation` ('row' | 'column' | 'row-reverse' | 'column-reverse'): Layout orientation
- `textStyle` (TextStyle): Text styling
- All React Native Switch props

**Usage:**
```tsx
<SwitchView 
  value={isEnabled}
  onValueChange={setIsEnabled}
  text="Enable notifications"
/>
```

---

## Image Components

### Icon

FontAwesome icon component.

**Props:** Extends `ViewProps`
- `name` (any): FontAwesome icon name (required)
- `size` (number): Icon size
- `color` (string): Icon color
- `onPress` (() => void): Press handler

**Usage:**
```tsx
<Icon name="home" size={24} color="#086CFE" />
<Icon name="user" onPress={handleIconPress} />
```

### Avatar

Circular avatar component supporting images, icons, or text.

**Props:** Extends `ViewProps`
- `onPress` (Function): Press handler
- `iconUrl` (string): URL for avatar image
- `iconName` (string): FontAwesome icon name
- `iconText` (string): Text to display (shows first 2 characters)
- `iconNameProps` (IconProps): Icon configuration
- `style` (any): Custom styles

**Note:** Provide one of: `iconUrl`, `iconName`, or `iconText`

**Usage:**
```tsx
<Avatar iconUrl="https://example.com/avatar.jpg" />
<Avatar iconName="user" />
<Avatar iconText="JD" />
```

### Spinner

Loading spinner component.

**Props:** Extends `ActivityIndicatorProps`
- All React Native ActivityIndicator props

**Usage:**
```tsx
<Spinner />
<Spinner size="large" color="#086CFE" />
```

### StatusIcon

Icon that changes based on status.

**Props:** Extends `ViewProps`
- `status` (string | any): Status value (required)
- `colorMap` (Array): Custom status mappings
  - Each item: `{ status: string, icon: string, color: string }`

**Built-in statuses:**
- 'SUCCESS': green check
- 'FAILED': red close
- 'PARTIAL_SUCCESS': yellow warning
- 'IN_PROGRESS': blue play
- 'PAUSED': gray pause

**Usage:**
```tsx
<StatusIcon status="SUCCESS" />
<StatusIcon 
  status="CUSTOM"
  colorMap={[
    { status: 'CUSTOM', icon: 'star', color: '#FFD700' }
  ]}
/>
```

---

## Input Components

### TextInputView

Basic text input with pattern validation.

**Props:** Extends `TextInputProps`
- `initialText` (string): Initial text value
- `pattern` (string): Regex pattern for validation
- All React Native TextInput props

**Usage:**
```tsx
<TextInputView 
  placeholder="Enter text"
  initialText=""
  onChangeText={setText}
/>
<TextInputView 
  pattern="[0-9]*"
  placeholder="Numbers only"
/>
```

### CompositeTextInputView

Enhanced text input with label, icon, and alert text.

**Props:** Extends `TextInputProps`
- `hint` (string): Hint text
- `alertText` (string): Error/alert message
- `alertTextColor` (string): Alert text color
- `pattern` (string): Regex pattern for validation
- `initialText` (string): Initial text value
- `leftIcon` (string | React.Component): Left-side icon
- `icon` (string | React.Component): Right-side icon ('close', 'eye', etc.)
- `onIconPress` ((event) => void): Icon press handler
- `textInputProps` (TextInputProps): Additional TextInput props
- `onDone` ((txt: string) => void): Handler when input is done
- All React Native TextInput props

**Note:** If input is inside ScrollView, add `keyboardShouldPersistTaps={'handled'}` to the ScrollView.

**Usage:**
```tsx
<CompositeTextInputView
  placeholder="Email"
  icon="close"
  leftIcon="envelope"
  alertText="Invalid email"
  alertTextColor="#F44336"
  onChangeText={setEmail}
/>
```

---

## Bar Components

### SimpleToolbar

Basic toolbar with title and optional buttons.

**Props:** Extends `ViewProps`
- `title` (String): Toolbar title
- `hideStatusBar` (boolean): Hide status bar
- `backgroundColor` (string): Background color
- `statusbarBackgroundColor` (string): Status bar background
- `forgroundColor` (string): Text/icon color
- `homeIcon` (string | typeof Icon): Home/back icon
- `onHomePress` (() => void): Home button press handler
- `textStyle` (TextStyle): Title text style
- `options` (Option[]): Array of toolbar options
  - `id` (string): Option identifier
  - `title` (string): Option title
  - `icon` (string | any): Option icon
  - `onClick` ((id: string) => void): Click handler

**Usage:**
```tsx
<SimpleToolbar title="Home" />
<SimpleToolbar
  title="Settings"
  homeIcon="arrow-left"
  onHomePress={() => navigation.goBack()}
  options={[
    { id: 'search', icon: 'search', onClick: handleSearch }
  ]}
/>
```

### TransparentCenterToolbar

Toolbar with transparent background and centered title.

**Props:** Same as `SimpleToolbar`

**Usage:**
```tsx
<TransparentCenterToolbar
  title="Profile"
  homeIcon="arrow-left"
  onHomePress={handleBack}
/>
```

### BottomNavBar

Bottom navigation bar with multiple options.

**Props:** Extends `ViewProps`
- `options` (Option[]): Navigation options (required)
  - `id` (string): Option identifier
  - `title` (string): Option title (optional)
  - `icon` (string | any): Option icon
  - `onClick` ((id: string) => void): Click handler (optional)
- `selectedId` (string): Currently selected option ID (required)
- `onSelect` ((id: string) => void): Selection handler (required)
- `onDimens` ((width: number, height: number) => void): Dimension callback

**Usage:**
```tsx
<BottomNavBar
  selectedId={selectedId}
  options={[
    { id: 'home', icon: 'home', title: 'Home' },
    { id: 'search', icon: 'search', title: 'Search' },
    { id: 'profile', icon: 'user', title: 'Profile' }
  ]}
  onSelect={setSelectedId}
/>
```

### DividerView

Horizontal divider with optional text.

**Props:** Extends `ViewProps`
- `text` (string): Text to display in divider

**Usage:**
```tsx
<DividerView />
<DividerView text="OR" />
```

### ProgressBarView

Horizontal progress bar.

**Props:** Extends `ViewProps`
- `progress` (number): Progress percentage (0-100) (required)
- `progressColor` (String): Color of progress bar
- `pendingColor` (String): Color of remaining portion

**Usage:**
```tsx
<ProgressBarView progress={75} />
<ProgressBarView 
  progress={50}
  progressColor="#4CAF50"
  pendingColor="#E0E0E0"
/>
```

---

## Modal Components

### BottomSheet

Bottom sheet modal that slides up from bottom.

**Props:**
- `visible` (boolean): Show/hide modal (required)
- `title` (string | React.Component): Sheet title
- `cancellable` (boolean): Allow dismissal (default: true)
- `children` (any): Sheet content (required)
- `onDismiss` (Function): Dismiss callback
- `backgroundColor` (string): Background color
- `closeIcon` (string | React.ReactNode): Custom close icon
- `swipeToCloseDisabled` (boolean): Disable swipe to close

**Note:** Set `swipeToCloseDisabled = true` if facing scrolling issues.

**Usage:**
```tsx
<BottomSheet
  visible={isVisible}
  title="Options"
  onDismiss={() => setIsVisible(false)}
>
  <Text>Sheet content</Text>
</BottomSheet>
```

### Expand

Animated expandable/collapsible container.

**Props:** Extends `ViewProps`
- `title` (string): Header title
- `iconName` (string): Custom icon name
- `iconPosition` ('left' | 'right'): Icon position
- `leftPadding` (number): Content left padding
- `titleStyle` (StyleProp<TextStyle>): Title styling
- `titleBackgroundColor` (string): Title background
- `iconStyle` (IconProps): Icon styling
- `initialExpand` (boolean): Initial expanded state
- `duration` (number): Animation duration (ms)
- `onExpand` ((isExpanded: boolean) => void): Expand callback
- `onChange` ((isExpanded: boolean) => void): Change callback

**Usage:**
```tsx
<Expand title="Show Details" initialExpand={false}>
  <Text>Hidden content</Text>
</Expand>
```

### DropDownView

Dropdown selector with multiple display modes.

**Props:** Extends `CompositeTextInputViewProps`
- `listType` ('sheet' | 'horizontal-list'): Display style
- `options` (DropDownViewOption[]): Options array (required)
  - `id` (string): Option ID
  - `value` (any): Option value
  - `title` (string): Display title
- `selectedId` (string): Selected option ID (required)
- `onSelect` ((selectedId: string, opt: DropDownViewOption) => void): Selection handler (required)
- `initialVisile` (Boolean): Initial visibility
- `title` (string): Dropdown title
- `displayType` ('button' | 'input'): Display type
- `onRenderList` ((opts, onSelect) => any): Custom list renderer
- `onRenderOption` ((opt, setSelected) => any): Custom option renderer
- `onEmptyListPlaceholder` ((dismiss?) => React.ReactNode): Empty state
- `forceDialogSelectOnWeb` (Boolean): Force dialog on web
- `swipeToCloseDisabled` (boolean): Disable swipe to close

**Note:** Set `swipeToCloseDisabled = true` if facing scrolling issues.

**Usage:**
```tsx
<DropDownView
  title="Select Country"
  selectedId={selectedCountry}
  options={[
    { id: 'us', value: 'us', title: 'United States' },
    { id: 'uk', value: 'uk', title: 'United Kingdom' }
  ]}
  onSelect={(id, opt) => setSelectedCountry(id)}
/>
```

### ConfirmationDialog

Confirmation dialog with confirm/cancel buttons.

**Props:**
- `visible` (boolean): Show/hide dialog (required)
- `title` (string | React.Component): Dialog title
- `cancellable` (boolean): Allow dismissal
- `onDismiss` (Function): Dismiss callback
- `onConfirm` (() => void): Confirm handler (required)
- `onCancel` (() => void): Cancel handler
- `message` (string): Dialog message
- `confirmText` (String): Confirm button text (default: 'common.confirm')
- `cancelText` (String): Cancel button text (default: 'common.cancel')
- `children` (any): Custom content
- `noSheet` (boolean): Render without bottom sheet
- `style` (ViewStyle): Custom styles

**Usage:**
```tsx
<ConfirmationDialog
  visible={showConfirm}
  title="Confirm Delete"
  message="Are you sure you want to delete this item?"
  onConfirm={handleDelete}
  onDismiss={() => setShowConfirm(false)}
/>
```

### GenericDialog

Generic dialog with customizable buttons.

**Props:** Same as `ConfirmationDialog`

**Usage:**
```tsx
<GenericDialog
  visible={showDialog}
  title="Information"
  confirmText="OK"
  onConfirm={handleOk}
  onDismiss={() => setShowDialog(false)}
/>
```

### WebBrowserView

In-app web browser component.

**Props:**
- `url` (string): URL to open (required)
- `title` (string): Page title
- `openMessage` (string): Opening message
- `retryMessage` (string): Retry button text
- `cancelMessage` (string): Cancel button text
- `onCancel` (() => void): Cancel handler (required)
- `navigation` (object): Navigation object (required)
  - `navigate` ((path: string, params: any) => void)

**Usage:**
```tsx
<WebBrowserView
  url="https://example.com"
  title="External Link"
  onCancel={() => navigation.goBack()}
  navigation={navigation}
/>
```

---

## List Components

### SimpleDatalistView

Data list view with customizable item rendering.

**Props:** Extends `ViewProps`
- `items` (any[]): Array of items (required)
- `itemAdapter` ((item, idx, list) => SimpleDatatableViewItemProps): Item adapter function
- `loading` (boolean): Show loading spinner
- `onRender` ((item, idx, list) => Component): Custom render function

**Note:** Must provide either `itemAdapter` or `onRender`.

**Usage:**
```tsx
<SimpleDatalistView
  items={users}
  itemAdapter={(user) => ({
    title: user.name,
    subtitle: user.email,
    icon: 'user'
  })}
/>
```

### SimpleDatatlistViewItem

Individual list item component.

**Props:** Extends `ViewProps`
- `title` (string): Item title
- `icon` (string | any): Item icon
- `subtitle` (string | React.ReactNode): Item subtitle
- `body` (string | React.ReactNode): Item body text
- `action` (React.ReactNode): Action component (e.g., button)
- `onPress` (() => void): Press handler
- `flexRatio` ([number, number, number]): Width ratios [icon, content, action]

**Usage:**
```tsx
<SimpleDatatlistViewItem
  title="John Doe"
  subtitle="Software Engineer"
  body="john@example.com"
  icon="user"
  onPress={handlePress}
/>
```

### InfoRow

Information row with icon, title, and text.

**Props:**
- `title` (string): Row title (required)
- `text` (string): Row text (required)
- `icon` (string | React.ReactNode): Icon
- `color` (string): Text color
- `style` (ViewStyle): Container style
- `textStyle` (TextStyle): Text style
- `onPress` (() => void): Press handler

**Usage:**
```tsx
<InfoRow
  title="Email"
  text="user@example.com"
  icon="envelope"
  onPress={handleEmailPress}
/>
```

### IconRow

Row with icon and text.

**Props:**
- `text` (string): Row text (required)
- `icon` (string | React.ReactNode): Icon
- `onPress` (() => void): Press handler
- `color` (string): Text/icon color

**Usage:**
```tsx
<IconRow
  text="Settings"
  icon="cog"
  onPress={handleSettings}
/>
```

### SettingRow

Settings row with optional description and right icon.

**Props:**
- `text` (string): Setting name (required)
- `icon` (string | any): Left icon
- `color` (string): Text color
- `colorDesc` (string): Description color
- `description` (string): Setting description
- `rightIcon` (string | any): Right icon
- `style` (ViewStyle): Container style
- `onPress` (() => void): Press handler (required)

**Usage:**
```tsx
<SettingRow
  text="Notifications"
  icon="bell"
  description="Manage notification settings"
  rightIcon="chevron-right"
  onPress={handleNotifications}
/>
```

---

## Message Components

### AlertMessage

Alert message component with different types.

**Props:**
- `text` (string): Alert message (required)
- `type` ('info' | 'success' | 'warning' | 'critical'): Alert type
- `color` (string): Custom text color
- `onDismiss` (() => void): Dismiss handler
- `action` (React.ReactNode): Custom action component
- `style` (ViewStyle): Container style
- `onPress` (() => void): Press handler

**Usage:**
```tsx
<AlertMessage
  text="Operation successful"
  type="success"
  onDismiss={() => setShowAlert(false)}
/>
<AlertMessage
  text="An error occurred"
  type="critical"
/>
```

---

## Utilities

### Analytics

**TrackingActionType:**
- `CLICK`: 'click'
- `VIEW`: 'view'
- `NAVIGATE`: 'navigate'

**TrackingViewType:**
- `BUTTON`: 'button'
- `TEXT`: 'text'
- `DIALOG`: 'dialog'
- `DROPDOWN`: 'dropdown'
- `WEBVIEW`: 'webview'
- `BOX`: 'box'
- `SWITCH`: 'switch'
- `IMAGE`: 'image'
- `TOOLBAR`: 'toolbar'
- `BOTTOMBAR`: 'bottombar'
- `PAGE`: 'page'

**AnalyticTracker Type:**
```typescript
type AnalyticTracker = (
  action: string,
  view: string,
  text?: string,
  extra?: any
) => void
```

**Usage:**
```typescript
theme.onTrack = (action, view, text, extras) => {
  analytics.track(`${action}-${view}`, {
    text,
    ...extras
  });
};
```

### I18n

**Type:**
```typescript
type I18n = {
  t: (id?: string, placeholders?: any) => string | undefined
}
```

**Usage:**
```typescript
import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: { hello: 'Hello!' },
  es: { hello: 'Hola!' }
});

theme.i18n = i18n;
```

### Storage

Async storage utilities.

**Methods:**
- `getKeyAsync(key: string)`: Get stored value
- `setKeyAsync(key: string, value?: string)`: Set/remove stored value

**Usage:**
```typescript
import { Storage } from 'react-native-boxes';

const value = await Storage.getKeyAsync('myKey');
await Storage.setKeyAsync('myKey', 'myValue');
await Storage.setKeyAsync('myKey', undefined); // Remove
```

### Utility Functions

**isWeb()**: Returns true if running on web platform
**isNative()**: Returns true if running on native platform
**isAndroid()**: Returns true if running on Android
**isIOS()**: Returns true if running on iOS
**isDesktop()**: Returns true if window width > height
**randomColor()**: Generates random hex color (currently returns undefined)

**Usage:**
```typescript
import { isWeb, isNative, isDesktop } from 'react-native-boxes';

if (isWeb()) {
  // Web-specific code
}
```

### getNavParamsFromDeeplink

Parse deep link URL into navigation parameters.

**Parameters:**
- `url` (string): Deep link URL

**Returns:** `[root: string, params: object]`

**Usage:**
```typescript
import { getNavParamsFromDeeplink } from 'react-native-boxes';

const [route, params] = getNavParamsFromDeeplink('myapp://profile/123?tab=posts');
// route: 'myapp'
// params: { screen: 'profile', params: { ... } }
```

---

## Complete Usage Example

```typescript
import React, { useState } from 'react';
import {
  Theme,
  ThemeContext,
  DarkColors,
  VPage,
  SimpleToolbar,
  VBox,
  Title,
  TextView,
  ButtonView,
  TextInputView,
  BottomSheet,
  AlertMessage
} from 'react-native-boxes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const theme = new Theme('my-app', DarkColors);
  const [showSheet, setShowSheet] = useState(false);
  const [text, setText] = useState('');
  
  theme.onTrack = (action, view, text, extras) => {
    console.log('Analytics:', action, view, text, extras);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <VPage>
          <SimpleToolbar title="My App" />
          
          <VBox style={{ padding: 20 }}>
            <Title>Welcome</Title>
            <TextView>This is a sample app using react-native-boxes.</TextView>
            
            <TextInputView
              placeholder="Enter text"
              value={text}
              onChangeText={setText}
            />
            
            <ButtonView
              text="Open Sheet"
              onPress={() => setShowSheet(true)}
            />
            
            <AlertMessage
              text="This is an info message"
              type="info"
            />
          </VBox>
          
          <BottomSheet
            visible={showSheet}
            title="Bottom Sheet"
            onDismiss={() => setShowSheet(false)}
          >
            <TextView>Sheet content goes here</TextView>
          </BottomSheet>
        </VPage>
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
}
```

---

## Notes

1. **Theme Context**: Always wrap your app with `ThemeContext.Provider` to use components properly.

2. **GestureHandler**: Wrap with `GestureHandlerRootView` when using bottom sheets or gesture-based components.

3. **Safe Areas**: Some components like `KeyboardAvoidingScrollView` and toolbars require safe area context. Either use `SafeAreaView` or set `theme.insets` manually.

4. **Internationalization**: Text components automatically use `theme.i18n.t()` unless `skipI18n` is set to true.

5. **Analytics**: Components automatically track user interactions if `theme.onTrack` is configured.

6. **Icons**: Icon names come from FontAwesome. See https://icons.expo.fyi/ for available icons.

7. **Fonts**: Load custom fonts with names 'Regular', 'Bold', and 'Styled' for proper component styling.

8. **Web Platform**: Some components have platform-specific behavior (web vs native). Use utility functions like `isWeb()` to check platform.

9. **TypeScript**: All components are TypeScript-ready with full type definitions.

10. **Customization**: Most components accept standard React Native props (`style`, event handlers, etc.) for full customization.
