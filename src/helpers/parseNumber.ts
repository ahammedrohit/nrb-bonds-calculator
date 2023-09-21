export const isNumeric = (num: any) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num as number) && Number(num) <= 2147483647;

export const parseNumber = (val: string | null) => {
    if (val === null) {
        return 0
    }
    const res = parseInt(val)
    if (res !== null) {
        return res
    } else {
        return 0
    }

}

export const parsePageNumber = (val: string | null) => {
    if (val === null) {
        return 1
    }
    const res = parseInt(val)
    if (res !== null) {
        return res
    } else {
        return 1
    }
}

export const parseOrderNumber = (val: string | null) => {
    if (val === null || val == '') {
        return undefined
    }
    const res = parseInt(val)
    if (res !== null) {
        return res
    } else {
        return undefined
    }

}

export const amountFrom = (val: string | null) => {
    if (val === null || val == '') {
        return 1
    }
    const res = parseInt(val)
    if (res !== null) {
        return res
    } else {
        return 1
    }

}

export const parseNumberToNDigit = (val: number, digit: number) => {
    return val.toLocaleString('en-US', {
        minimumIntegerDigits: digit,
        useGrouping: false
    })
}