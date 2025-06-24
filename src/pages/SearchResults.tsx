import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import ListIcon from '../assets/list.svg';
import ContentArea from '../components/ContentArea/ContentArea';
import ResultList from '../components/ResultList/ResultList';
import Pagination from '@mui/material/Pagination';
import Loading from '../components/Loading/Loading';
import { useTheme, useMediaQuery } from '@mui/material';
import MockImage from '../assets/mock_image.jpg';
import config from '../config';

const USE_API = config.USE_API;


interface Product {
    code: string;
    product_name: string;
    product_name_en?: string;
    brands: string;
    brands_tags: string[];
    categories: string;
    categories_tags: string[];
    labels_tags: string[];
    nutrition_grades_tags: string[];
    image_url: string;
    ecoscore_grade?: string;
    ecoscore_score?: number;
    quantity?: string;
    serving_size?: string;
    nutriments?: Record<string, string | number | undefined>;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const queryParams = useQuery();
    const query = queryParams.get('query') || '';
    const page = parseInt(queryParams.get('page') || '1', 10);

    const [results, setResults] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);

            if (!USE_API) {
                const mockProducts: Product[] = [
                    {
                        code: 'mock1',
                        product_name:
                            'Test Product A with an Incredibly, Absurdly, and Comically Long Name That You’d Never Expect on a Shelf but Exists Solely for Component Layout Stress Testing',
                        brands: 'DemoBrandTheUltimateMockBrandOfEverlastingLengthAndFictionalBrilliance',
                        brands_tags: [],
                        categories:
                            'Snacks, Mocked, Artificial, Impossibly Complex, Unexpectedly Verbose, Technically Delicious But Unrealistically Labeled for UI Shenanigans and Overflow Evaluation',
                        categories_tags: [],
                        labels_tags: ['super-organic-certified-artisan-small-batch-locally-sourced-hand-crafted-goodness'],
                        nutrition_grades_tags: ['b'],
                        image_url: MockImage,
                    },
                    {
                        code: 'mock2',
                        product_name:
                            'Second Test Product with a Fantastically Verbose Descriptor That Spills Over the Edge of Reason and Forces Your Design to Truly Confront the Limits of Horizontal Real Estate',
                        brands: 'BrandNameWithSoMuchLengthItCouldWrapTwiceAroundTheCardComponentAndStillKeepTyping',
                        brands_tags: [],
                        categories:
                            'Drinks, Mocked, Quenchers of Hyperbole, Liquid Legends, Elixirs of Layout Testing and Boundary Defying Typography Experiments',
                        categories_tags: [],
                        labels_tags: ['fictional', 'impossibly-long-hypoallergenic-eco-miracle-certification-xyz'],
                        nutrition_grades_tags: ['a'],
                        image_url: MockImage,
                    }
                ];

                setResults(mockProducts);
                setPageCount(1);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(
                    `https://world.openfoodfacts.org/api/v2/search?categories_tags=${encodeURIComponent(
                        query
                    )}&page=${page}&page_size=6`
                );
                const data = await res.json();
                setResults(data.products || []);
                setPageCount(data.page_count || 1);
            } catch (err) {
                console.error('Error fetching search results:', err);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchResults();
    }, [query, page]);

    const handleSearch = (newQuery: string) => {
        navigate(`/results?query=${encodeURIComponent(newQuery)}&page=1`);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        navigate(`/results?query=${encodeURIComponent(query)}&page=${value}`);
    };

    const buttons = [
        { iconSrc: ListIcon, label: 'Dietary Info', altText: 'List Icon' }
    ];

    const formattedProducts = results.map((product) => ({
        code: product.code, // Add this line
        imageSrc: product.image_url || '',
        name: product.product_name || 'Unnamed Product',
        brands: product.brands || 'Unknown Brand',
        labels: product.labels_tags
            ?.filter(label => label.startsWith('en:'))
            .map(label => {
                const cleaned = label.replace(/^en:/, '').replace(/-/g, ' ');
                return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
            })
            .join(', ') || 'No Labels',
        eco_score: product.nutrition_grades_tags?.[0]?.toUpperCase() || 'N/A'
    }));


    return (
        <>
            <Header />
            <MainContainer>
                <SearchBar onSearch={handleSearch} long />
                <ButtonGroup buttons={buttons} varied />
                <ContentArea>
                    {loading ? (
                        <Loading />
                    ) : results.length > 0 ? (
                        <>
                            <ResultList products={formattedProducts} />
                            <Pagination
                                count={pageCount}
                                page={page}
                                onChange={handlePageChange}
                                shape="rounded"
                                size="large"
                                siblingCount={isMobile ? 0 : 0}
                                boundaryCount={isMobile ? 0 : 2}
                            />
                        </>
                    ) : (
                        <p>No results found for “{query}”</p>
                    )}
                </ContentArea>
            </MainContainer>
            <Footer />
        </>
    );
}

export default SearchResults;
