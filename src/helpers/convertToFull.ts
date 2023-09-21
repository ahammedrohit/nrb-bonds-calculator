export function convertToFull(e: string) {
    return e.replace(/[!-~]/g, (fullwidthChar) =>
        String.fromCharCode(fullwidthChar.charCodeAt(0) + 0xfee0)
    );
}
