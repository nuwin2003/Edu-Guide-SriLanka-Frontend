import React from 'react';
import InitialView from "../components/InitialView.jsx";
import OurServices from "../components/OurServices.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Reviews from "../components/Reviews.jsx";
import FeedbackForm from "../components/FeedbackForm.jsx";

const Home = () => {
    return (
        <>
            <InitialView/>
            <OurServices/>
            <AboutUs/>
            <FeedbackForm/>
            <Reviews/>
        </>

    );
};

export default Home;