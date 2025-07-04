import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Product from './pages/Product';
import DietaryProfile from './pages/DietaryProfile';
import PageNotFound from './pages/PageNotFound';
import './body.module.css';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/results" element={<SearchResults />} />
                <Route path="/product/:code" element={<Product />} />
                <Route path="/dietary" element={<DietaryProfile />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
