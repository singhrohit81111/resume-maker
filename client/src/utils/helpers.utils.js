// src/utils/helpers.js

export const debounce = (func, delay) => {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay)
    }
};

export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Example of a utility function that logs messages
export const logMessage = (message) => {
    console.log(`[LOG] ${message}`);
};
