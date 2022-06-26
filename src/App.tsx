import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import './assets/styles/App.css';
import "antd/dist/antd.min.css";
import {
    StyledLayout,
} from "./constants";
import TaskboardTree from "./assets/Taskboard/TaskboardTree";
import Login from "./assets/Login";
import Cookies from 'js-cookie'

export function App() {
    let [token, setToken] = useState();
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        setToken(Cookies.get('token'));
        setLoaded(true);
    })
    const pId = 2

    return (
        <>
            <StyledLayout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/taskboard" element={<TaskboardTree ProjectId={pId}/>}/>
                    </Routes>
                </BrowserRouter>
            </StyledLayout>
        </>
    );

}
