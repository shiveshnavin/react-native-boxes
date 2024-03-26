import React from "react"
import { Colors, Dimens, createStyle, DarkColors, LightColors, Fonts } from "./Styles"
import { randomColor } from "./utils"
const DEFAULT_STYLE = createStyle(Dimens, Colors, Fonts)
export class Theme {
    appname: string = ''
    styles: typeof DEFAULT_STYLE
    dimens: typeof Dimens
    colors: typeof Colors
    fonts: typeof Fonts
    randomColor = randomColor
    constructor(appname = '',
        colors = Colors,
        dimens = Dimens,
        fonts = Fonts,
        styles = DEFAULT_STYLE) {
        this.appname = appname
        this.fonts = fonts ?? Fonts
        this.colors = colors ?? Colors
        this.dimens = dimens ?? Dimens
        this.fonts = fonts ?? Fonts
        this.styles = styles ?? createStyle(this.dimens, this.colors, this.fonts)
    }
}
export const ThemeContext = React.createContext(new Theme())
