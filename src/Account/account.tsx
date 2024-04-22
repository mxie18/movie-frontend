import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Profile from "./profile";
import Login from "./login";

export default function Account() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="login" />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}
