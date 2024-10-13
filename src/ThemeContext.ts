import { createContext } from "react"
import { Colors, Dimens, createStyle, DarkColors, LightColors, Fonts } from "./Styles"
import { randomColor } from "./utils"
import { I18n, _i18n } from "./I18n"
import { EdgeInsets } from "react-native-safe-area-context"
import { AnalyticTracker } from "./Analytics"
const DEFAULT_STYLE = createStyle(Dimens, Colors, Fonts)
export class Theme {
    appname: string = ''
    styles: typeof DEFAULT_STYLE
    dimens: typeof Dimens
    colors: typeof Colors
    fonts: typeof Fonts
    i18n: I18n
    onTrack: AnalyticTracker
    insets?: EdgeInsets
    randomColor = randomColor
    constructor(appname = '',
        colors = Colors,
        dimens = Dimens,
        fonts = Fonts,
        styles = DEFAULT_STYLE,
        i18n = _i18n,
        onTrack = () => { }) {
        this.appname = appname
        this.fonts = fonts ?? Fonts
        this.colors = colors ?? Colors
        this.dimens = dimens ?? Dimens
        this.fonts = fonts ?? Fonts
        this.styles = styles ?? createStyle(this.dimens, this.colors, this.fonts)
        this.i18n = i18n
        this.onTrack = onTrack
    }
    setInsets(insets: EdgeInsets) {
        this.insets = insets
    }

    setTracking(onTrack: AnalyticTracker) {
        this.onTrack = onTrack
    }
}
export const ThemeContext = createContext(new Theme())
