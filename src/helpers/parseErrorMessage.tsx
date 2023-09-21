import { ParsedErrorMessageProps, RawErrorMessageProps } from "@src/interfaces/ErrorMessage";

export function parseErrorMessage(err: RawErrorMessageProps): ParsedErrorMessageProps {
    const res: ParsedErrorMessageProps = { status: 400, message: "" };
    if (err.response) {
        res.status = err.response.data.status
        res.message = err.response.data.message
    } else {
        res.message = err.message
    }
    return res;
}