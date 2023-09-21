export function convertToHalf(e: string) {
    return e.replace(/[！-～]/g, (halfwidthChar) =>
        String.fromCharCode(halfwidthChar.charCodeAt(0) - 0xfee0)
    );
}