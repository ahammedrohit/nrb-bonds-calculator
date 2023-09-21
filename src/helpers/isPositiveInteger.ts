export const isPositiveInteger = (val: string) => {
    if (val !== null && val !== undefined && val.match(/^[0-9]+$/) && parseInt(val) >= 0) {
        return true;
    } else {
        return false;
    }
}

export const toPositiveInteger = (val: string) => {
    if (val !== null && val !== undefined && val.match(/^[0-9]+$/) && parseInt(val) >= 0) {
        return parseInt(val);
    } else {
        return 0;
    }
}