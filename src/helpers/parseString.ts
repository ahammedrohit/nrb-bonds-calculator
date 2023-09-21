export const parseToString = (val: any) => {
    if (val !== null && val !== "null" && val !== undefined && val !== "undefined") {
        return val
    } else {
        return ''
    }
}

export const parseToTimeNumber = (val: any) => {
    if (val !== null && val !== "null" && val !== undefined && val !== "undefined") {
        try {
            return parseInt(val)
        }
        catch (err) {
            return 0;
        }
    } else {
        return 0
    }
}

export const parseToPageNoString = (val: any) => {
    if (val !== null && val !== "null" && val !== undefined && val !== "undefined") {
        return val
    } else {
        return '1'
    }
}


export const parseToPageSizeString = (val: any) => {
    if (val !== null && val !== "null" && val !== undefined && val !== "undefined") {
        return val
    } else {
        return '300'
    }
}

export const toTitleCase = (str?: string) => {
    return str?.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
    );
}