const isString = (props) => {
    return typeof (props) === "string" && props !== undefined;
}

const isObject = (props) => {
    return typeof (props) === "object" && props !== undefined;
}

const isBoolean = (props) => {
    return typeof (props) === "boolean" && props !== undefined;
}

const isArray = (props) => {
    return Array.isArray(props) && props !== undefined;
}

const isNumber = (props) => {
    return !isNaN(props) && props !== undefined;
}

const isObjectEmpty = (props) => {
    if (isObject(props) && Object.keys(result).length === 0) {
        return true;
    }
    else {
        return false;
    }
}

const isNotObjectEmpty = (props) => {
    if (isObject(props) && !Object.keys(result).length === 0) {
        return true;
    }
    else {
        return false;
    }
}



module.exports = { isString, isObject, isBoolean, isArray, isNumber, isObjectEmpty, isNotObjectEmpty }