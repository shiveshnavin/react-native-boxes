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
    BOTTOMBAR: 'bottombar',
    PAGE: 'page'
}
function textOf(value: any) {
    if (typeof value == 'string') {
        return value
    }
    if (typeof value == 'object') {
        return 'object'
    }
    return "undefined"
}

function textOrAnalyticsId(analyticsId: any, value: any) {
    if (analyticsId !== undefined && analyticsId !== null) {
        return analyticsId
    }
    return textOf(value)
}

function analyticsIdWithSuffix(analyticsId: any, suffix: string) {
    if (analyticsId !== undefined && analyticsId !== null) {
        return `${analyticsId}_${suffix}`
    }
    return undefined
}

export const TrackerUtils = {
    textOf,
    textOrAnalyticsId,
    analyticsIdWithSuffix
}
export const TrackingActionType = {
    CLICK: 'click',
    VIEW: 'view',
    NAVIGATE: 'navigate'
}
export type AnalyticTracker = (action: string, view: string, textOrAnalyticsId?: string, extra?: any) => void
