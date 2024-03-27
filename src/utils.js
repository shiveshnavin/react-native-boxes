"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFields = exports.isDesktop = exports.isWeb = exports.randomColor = exports.ReactWrapper = void 0;
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
function ReactWrapper(component) {
    return (props) => {
        return component;
    };
}
exports.ReactWrapper = ReactWrapper;
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    // return color;
    return undefined;
}
exports.randomColor = randomColor;
function isWeb() {
    return react_native_1.Platform.OS == 'web';
}
exports.isWeb = isWeb;
function isDesktop() {
    const windowWidth = react_native_2.Dimensions.get('window').width;
    const windowHeight = react_native_2.Dimensions.get('window').height;
    return windowWidth > windowHeight;
}
exports.isDesktop = isDesktop;
function assignFields(target, source, fields, skipUndefined = true) {
    if (!target)
        target = {};
    Object.keys(source || {}).forEach(k => {
        if (fields?.indexOf(k) > -1) {
            if (!skipUndefined && !source[k])
                return;
            target[k] = source[k];
        }
    });
    return target;
}
exports.assignFields = assignFields;
//# sourceMappingURL=utils.js.map