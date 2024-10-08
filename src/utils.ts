import { Platform } from "react-native";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function extractPathFromUrl(url: string): string {
    const pathStartIndex = url.indexOf('/', url.indexOf('//') + 2);
    if (pathStartIndex === -1) {
        return '';
    }
    return url.substring(pathStartIndex + 1); // +1 to remove leading '/'
}

function extractQueryParams(part: string) {
    if (!part) {
        return {}
    }
    const query = part.split("?")[1];
    const params: any = {}
    if (!query) {
        return {}
    };
    const queryParams = query.split("&");
    queryParams?.forEach((pk) => {
        const [key, value] = pk.split("=")
        params[key] = value;
    });
    return params
}
export function getNavParamsFromDeeplink(url: string) {
    if (url?.startsWith("/")) {
        url = url.substring(1)
    }
    if (url?.startsWith("http")) {
        url = extractPathFromUrl(url)
    }
    let parts = url.split("/");

    let root, rootParams: any = {};
    root = parts[0];
    if (parts.length > 1) {

        let obj = {
            screen: '',
            params: {}
        };
        let lastCloneObj = undefined;
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            let cloneObj = Object.assign({}, obj);

            if (part?.indexOf("?") > -1) {
                cloneObj.screen = part.split("?")[0];
                cloneObj.params = extractQueryParams(part);
            } else {
                cloneObj.screen = part;
            }
            if (lastCloneObj == undefined) {
                lastCloneObj = cloneObj;
            } else {
                lastCloneObj.params = cloneObj;
            }
        }
        rootParams = lastCloneObj;
    } else {
        let qParts = root.split("?")
        rootParams = extractQueryParams(root)
        root = qParts[0]
    }
    return [root, rootParams];
}


export const Storage = {
    async getKeyAsync(key: string) {
        return await AsyncStorage.getItem(key);
    },

    async setKeyAsync(key: string, value?: string) {
        if (value == undefined) {
            AsyncStorage.removeItem(key)
            return
        }
        if (typeof value == 'object')
            value = JSON.stringify(value)
        return await AsyncStorage.setItem(key, value);
    }
}

export function ReactWrapper(component: any) {
    return (props: any) => {
        return component
    }
}

export function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    // return color;
    return undefined;
}

export function isWeb() {
    return Platform.OS == 'web'
}

export function isNative() {
    return Platform.OS !== 'web'
}

export function isAndroid() {
    return Platform.OS == 'android'
}

export function isIOS() {
    return Platform.OS == 'ios'
}

export function isDesktop() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return windowWidth > windowHeight
}

export function assignFields(
    target: any,
    source: any,
    fields: string[],
    skipUndefined: boolean = true) {
    if (!target)
        target = {}
    Object.keys(source || {}).forEach(k => {
        if (fields?.indexOf(k) > -1) {
            if (!skipUndefined && !source[k])
                return
            target[k] = source[k]
        }
    })
    return target
}