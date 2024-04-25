import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
    HashRouter,
    Routes,
    Route,
    Link,
    BrowserRouter,
    Navigate,
} from "react-router-dom";

import Home from "./Home/home";
import Login from "./Account/login";
import Search from "./Search/search";
import Details from "./Details/details";
import Profile from "./Account/profile";
import { Provider } from "react-redux";
import store from "./store";
import CurrentUser from "./Account/CurrentUser";
import Nav from "./Navigation/nav";
import Users from "./Users/users";
import { Toaster } from "react-hot-toast";
import ShowDetails from "./Details/showDetails";

function App() {
    return (
        <Provider store={store}>
            <Toaster
                position="bottom-center"
                toastOptions={{
                    duration: 2000,
                    style: { textAlign: "center" },
                }}
            />
            <CurrentUser>
                <HashRouter>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile/:userId" element={<Profile />} />
                        <Route path="/users" element={<Users />} />

                        <Route path="/search" element={<Search />} />
                        <Route path="/search/:term" element={<Search />} />
                        <Route
                            path="/movie/details/:movieId"
                            element={<Details />}
                        />
                        <Route
                            path="/shows/details/:showId"
                            element={<ShowDetails />}
                        />
                    </Routes>
                </HashRouter>
            </CurrentUser>
        </Provider>
    );
}

export default App;
