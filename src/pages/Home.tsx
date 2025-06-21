import Header from '../components/Header/Header';
import HeaderSection from '../components/HeaderSection/HeaderSection';
import MainContainer from '../components/MainContainer/MainContainer';
import SearchBar from '../components/SearchBar/SearchBar';
import ListIcon from '../assets/list.svg';
import FavoriteIcon from '../assets/favorite.svg';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';

function Home() {
    const handleSearch = (query: string) => {
        console.log('User searched for:', query);
    };

    const buttons = [
        { iconSrc: ListIcon, label: 'Dietary Info', altText: 'List Icon' },
        { iconSrc: FavoriteIcon, label: 'Favorite Food', altText: 'Favorite Icon' }
    ];

    return (
        <>
            <Header />
            <MainContainer>
                <HeaderSection />
                <SearchBar onSearch={handleSearch} />
                <ButtonGroup buttons={buttons} />
            </MainContainer>
            {/* <Footer /> */}
        </>
    );
}

export default Home;