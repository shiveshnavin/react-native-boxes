import { Platform } from "react-native";
import { Dimensions } from 'react-native';


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