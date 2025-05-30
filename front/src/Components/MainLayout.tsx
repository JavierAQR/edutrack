import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;