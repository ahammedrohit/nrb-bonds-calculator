import { Main } from "@pages/Main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}