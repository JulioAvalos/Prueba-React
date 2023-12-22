import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import MainPage from "../pages/MainPage.tsx";
import Favorites from "../pages/Favorites.tsx";

function Navigation() {

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path='/*' element={<Navigate to='/' replace/>}/>
            </Routes>
        </Router>
    );
}

export default Navigation;
