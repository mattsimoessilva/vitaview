import Header from '../components/Header/Header';
import HeaderSection from '../components/HeaderSection/HeaderSection';
import MainContainer from '../components/MainContainer/MainContainer';
import SearchBar from '../components/SearchBar/SearchBar';
//import SearchBar from '../components/SearchBar/SearchBar'; 
//import ScoreCard from '../components/ScoreCard/ScoreCard';
//import Footer from '../components/Footer/Footer';

function Home() {
    const handleSearch = (query: string) => {
        console.log('User searched for:', query);
    };

    return (
        <>
            <Header />
            <MainContainer>
                <HeaderSection />
                <SearchBar onSearch={handleSearch} />
            </MainContainer>
            {/* <Footer /> */}
        </>
    );
}

export default Home;