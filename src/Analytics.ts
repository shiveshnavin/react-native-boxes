export const TrackingViewType = {
    BUTTON: 'button',
    TEXT: 'text',
    DIALOG: 'dialog',
    DROPDOWN: 'dropdown',
    WEBVIEW: 'webview',
    BOX: 'box',
    SWITCH: 'switch',
    IMAGE: 'image',
    TOOLBAR: 'toolbar',
    BOTTOMBAR: 'bottombar'
}
export const TrackerUtils = {
    textOf(value: any) {
        if (typeof value == 'string') {
            return value
        }
        if (typeof value == 'object') {
            return 'object'
        }
        return "undefined"
    }
}
export const TrackingActionType = {
    CLICK: 'click',
    VIEW: 'view',
    NAVIGATE: 'navigate'
}
export type AnalyticTracker = (action: string, view: string, text?: string, extra?: any) => void
