import Navbar from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {
    return (
        <>
            <Navbar/>
            <main style={{paddingTop: '85px'}}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default MainLayout;