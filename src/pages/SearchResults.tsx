import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import ListIcon from '../assets/list.svg';
import ContentArea from '../components/ContentArea/ContentArea';
import ResultList from '../components/ResultList/ResultList';
import Pagination from '@mui/material/Pagination';
import { useTheme, useMediaQuery } from '@mui/material';
function SearchResults() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSearch = (query: string) => {
        console.log('User searched for:', query);
    };

    const buttons = [
        { iconSrc: ListIcon, label: 'Dietary Info', altText: 'List Icon' }
    ];

    const products = [
        { imageSrc: "https://th.bing.com/th/id/OIP.1pabx4-OyY95rTphWtu7RgHaJQ?rs=1&pid=ImgDetMain", name: "A Product Name", categories: "Snacks, Chocolates", labels: "Fair Trade, Gluten-Free", eco_score: "Grade B" },
        { imageSrc: "https://th.bing.com/th/id/OIP.1pabx4-OyY95rTphWtu7RgHaJQ?rs=1&pid=ImgDetMain", name: "A Product Name", categories: "Snacks, Chocolates", labels: "Fair Trade, Gluten-Free", eco_score: "Grade B" },
        { imageSrc: "https://th.bing.com/th/id/OIP.1pabx4-OyY95rTphWtu7RgHaJQ?rs=1&pid=ImgDetMain", name: "A Product Name", categories: "Snacks, Chocolates", labels: "Fair Trade, Gluten-Free", eco_score: "Grade B" },
        { imageSrc: "https://th.bing.com/th/id/OIP.1pabx4-OyY95rTphWtu7RgHaJQ?rs=1&pid=ImgDetMain", name: "A Product Name", categories: "Snacks, Chocolates", labels: "Fair Trade, Gluten-Free", eco_score: "Grade B" },
        { imageSrc: "https://th.bing.com/th/id/OIP.1pabx4-OyY95rTphWtu7RgHaJQ?rs=1&pid=ImgDetMain", name: "A Product Name", categories: "Snacks, Chocolates", labels: "Fair Trade, Gluten-Free", eco_score: "Grade B" },
        { imageSrc: "https://th.bing.com/th/id/OIP.1pabx4-OyY95rTphWtu7RgHaJQ?rs=1&pid=ImgDetMain", name: "A Product Name", categories: "Snacks, Chocolates", labels: "Fair Trade, Gluten-Free", eco_score: "Grade B"}
    ]

    return (
        <>
            <Header />
            <MainContainer>
                <SearchBar onSearch={handleSearch} long />
                <ButtonGroup buttons={buttons} varied />
                <ContentArea>
                    <ResultList products={products} />
                    <Pagination
                        count={10}
                        shape="rounded"
                        size="large"
                        siblingCount={isMobile ? 0 : 0}
                        boundaryCount={isMobile ? 0 : 2}
                    />
                </ContentArea>
            </MainContainer>
            <Footer />
        </>
    );
}

export default SearchResults;