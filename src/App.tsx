import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import {
    HashRouter,
    Routes,
    Route,
    Link,
    BrowserRouter,
} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";

function App() {
    const API_KEY = "0cb3e4f23e531a8824f7084b5543bd5f";

    console.log(process.env);

    // const fetch = async () => {
    //     const response = await axios.get(
    //         `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    //     );
    //     console.log(response.data);
    // };

    // fetch();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
