import {Typography, Button} from 'antd';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import './assets/styles/App.css';
import "antd/dist/antd.min.css";
import {v4 as uuid} from 'uuid';
import { parse as uuidParse } from 'uuid';
import {
    StyledLayout,
    StyledHeader,
} from "./constants";
import {Taskboard} from "./assets/Taskboard/Taskboard";
import Login from "./assets/Login";
import Cookies from 'js-cookie'

export function App() {
    let [token, setToken] = useState();
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        setToken(Cookies.get('token'));
        setLoaded(true);
    })
    const pId = "9867090f-7eda-f34d-92d2-e022f03ba8b0"

    return (
        <>
            <StyledLayout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/dashboard" element={<div/>}/>
                        <Route path="/taskboard" element={<Taskboard ProjectId={pId}/>}/>
                    </Routes>
                </BrowserRouter>
            </StyledLayout>
        </>
    );

}
