export interface ParsedErrorMessageProps {
    status?: number;
    message: string;
}

export interface RawErrorMessageProps {
    message: string;
    name: string;
    config: Config;
    code: string;
    response?: Response;
}

interface Config {
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    headers: Headers;
    baseURL: string;
    method: string;
    url: string;
    data: string;
}

interface Response {
    data: Data;
}

interface Data {
    error: string;
    message: string;
    status: number;
    timestamp: string;
    trace: string;
}
