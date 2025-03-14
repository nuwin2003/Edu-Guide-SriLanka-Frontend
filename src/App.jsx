import './App.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Universities from "./pages/Universities.jsx";
import Courses from "./pages/Courses.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import {ToastContainer} from "react-toastify";
import theme from "./theme.js";
import Stream from "./pages/Stream.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {

  return (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/home" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="stream" element={<Stream />} />
                        <Route path="universities" element={<Universities />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="contact-us" element={<ContactUs />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
        <ToastContainer position="bottom-right" stacked />
    </>
  )
}

export default App
