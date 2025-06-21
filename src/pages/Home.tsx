import Header from '../components/Header/Header';
import HeaderSection from '../components/HeaderSection/HeaderSection';
import MainContainer from '../components/MainContainer/MainContainer';
import SearchBar from '../components/SearchBar/SearchBar';

import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import BannerGroup from '../components/BannerGroup/BannerGroup';

import IconButton from '../components/IconButton/IconButton';

import ListIcon from '../assets/list.svg';
import FavoriteIcon from '../assets/favorite.svg';
import LinkIcon from '../assets/link.svg';

import NutritionArt from '../assets/nutrition.png';
import ProcessingArt from '../assets/processing.png';
import EcologyArt from '../assets/ecology.png';

function Home() {
    const handleSearch = (query: string) => {
        console.log('User searched for:', query);
    };

    const buttons = [
        { iconSrc: ListIcon, label: 'Dietary Info', altText: 'List Icon' }
    ];

    const banners = [
        {
            imageSrc: NutritionArt,
            title: 'Nutritional Scores',
            text: `Here users can search for food items and view their nutritional score through a clean, transparent interface
                    \nEach food is evaluated using key dietary metrics such as calories, fat, sugar, fiber, and protein, and the resulting score offers a simple way to assess overall nutritional quality`,
            button: <IconButton iconSrc={LinkIcon} label="Learn More" altText="Link Icon" theme="dark" />,
            imagePosition: 'standard'
        },
        {
            imageSrc: ProcessingArt,
            title: 'Processing Scores',
            text: `We empower users to explore and compare food items through a modern, transparent interface designed for clarity and ease of use
                    \nEach food product is assigned a nutritional score derived from essential dietary metrics, including calories, fat, sugar, fiber, and protein`,
            button: <IconButton iconSrc={LinkIcon} label="Learn More" altText="Link Icon" theme="dark" />,
            imagePosition: 'varied'
        },
        {
            imageSrc: EcologyArt,
            title: 'Green Scores',
            text: `Each product is assigned a comprehensive sustainability rating informed by a range of critical environmental criteria
                    \nThese include greenhouse gas emissions across its lifecycle, freshwater consumption during production, and many others`,
            button: <IconButton iconSrc={LinkIcon} label="Learn More" altText="Link Icon" theme="dark" />,
            imagePosition: 'standard'
        }
    ];  

    return (
        <>
            <Header />
            <MainContainer>
                <HeaderSection />
                <SearchBar onSearch={handleSearch} />
                <ButtonGroup buttons={buttons} />
                <BannerGroup banners={banners} />
            </MainContainer>
            {/* <Footer /> */}
        </>
    );
}

export default Home;