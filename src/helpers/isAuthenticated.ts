import { JwtDecoded } from "@src/interfaces/JwtDecoded";
import { decodeToken } from "./jwtHelper";

export const isAuthenticated = (token: string) => {
    if (!token) return false;
    const decoded: JwtDecoded = decodeToken(token);
    const issuedAt = decoded.iat * 1000;
    const expireAt = decoded.exp * 1000;
    const currentAt = Date.now();
    const expired = expireAt < currentAt
    if (expired) return false;
    const issuedDay = new Date(issuedAt).getDay();
    const currentDay = new Date(currentAt).getDay();
    const issuedYesterday = issuedDay != currentDay
    if (issuedYesterday) return false;
    return decoded;
}