import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import ContentArea from '../components/ContentArea/ContentArea';
import ListIcon from '../assets/list.svg';
import { useNavigate } from 'react-router-dom';
import ProfileManager from '../components/ProfileManager/ProfileManager';

const buttons = [
    { iconSrc: ListIcon, label: 'Dietary Info', altText: 'List Icon', link: '/dietary' }
];

function DietaryProfile() {
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
                    <ProfileManager />
                </ContentArea>
            </MainContainer>
            <Footer />
        </>
    );
}

export default DietaryProfile;
