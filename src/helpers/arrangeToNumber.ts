export const arrangeToNumber = (val: number | undefined ) => {
    if (val === undefined) {
        return '-'
    }
    const res = ("0" + val).slice(-2)
    if (res !== undefined) {
        return res
    } else {
        return '-'
    }

}