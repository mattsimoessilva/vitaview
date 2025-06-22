import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import ContentArea from '../components/ContentArea/ContentArea';
import Loading from '../components/Loading/Loading';
import ListIcon from '../assets/list.svg';
import MockImage from '../assets/mock_image.jpg';

const USE_API = false;

const buttons = [
    { iconSrc: ListIcon, label: 'Dietary Info', altText: 'List Icon' }
];
interface Product {

}

function Product() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const handleSearch = (newQuery: string) => {
        navigate(`/results?query=${encodeURIComponent(newQuery)}&page=1`);
    };
 
    return (
        <>
            <Header />
            <MainContainer>
                <SearchBar onSearch={handleSearch} long />
                <ButtonGroup buttons={buttons} varied />
                <ContentArea>
                    {loading ? (
                        <Loading />
                    ) : response ? (
                        <>
                            <ProductCard />
                        </>
                    ) : (
                        <p>No data found for “{product_code}”</p>
                    )}
                </ContentArea>
            </MainContainer>
            <Footer />
        </>
    );
}

export default Product;
