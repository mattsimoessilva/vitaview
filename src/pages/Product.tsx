import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import ContentArea from '../components/ContentArea/ContentArea';
import Loading from '../components/Loading/Loading';
import ProductCard from '../components/ProductCard/ProductCard';
import ListIcon from '../assets/list.svg';
import NotFound from '../components/NotFound/NotFound';
import config from '../config';
import { isProductSuitable } from '../utils/checkSuitability';
import SuitabilityMessage from '../components/SuitabilityMessage/SuitabilityMessage';
import { sanitizeText } from '../utils/sanitizeText';
import { formatTags } from '../utils/formatTags';
import { buildSuitabilityPayload } from '../utils/buildSuitabilityPayload';
import mockProduct from '../mocks/mockProduct';

const USE_API = config.USE_API;

const buttons = [
    { iconSrc: ListIcon, label: 'Dietary Info', altText: 'List Icon', link: '/dietary' }
];

interface ProductData {
    code: string;
    name: string;
    brands: string;
    labels: string;
    quantity: string;
    generic_name: string;
    imageSrc: string;
    manufacturing_location: string;
    countries_sold: string;
    ingredients_list: string;
    allergens: string;
    type: string;
    recyclability: string;
    nutri_score: string;
    nova_group: string;
    eco_score: string;
    carbon_footprint: string;
}

function Product() {
    const { code } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(USE_API);
    const [product, setProduct] = useState<ProductData | null>(null);
    const [fullApiResponse, setFullApiResponse] = useState<any | null>(null);
    const [suitabilityMessage, setSuitabilityMessage] = useState<string | null>(null);

    const handleSearch = (newQuery: string) => {
        navigate(`/results?query=${encodeURIComponent(newQuery)}&page=1`);
    };

    useEffect(() => {
        if (!USE_API) {
            setProduct(mockProduct);
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}?fields=code,product_name,brands,labels_tags,quantity,generic_name,manufacturing_place,countries_tags,ingredients_text,ingredients_tags,allergens_tags,categories_tags,packaging_tags,packaging_recycling,image_url,nutriscore_grade,nova_group,ecoscore_grade,carbon_footprint,nutriments,ingredients_analysis_tags`);
                const data = await res.json();
                setFullApiResponse(data);

                if (data.status === 1 && data.product) {
                    setProduct({
                        code: data.product.code ?? '',
                        name: data.product.product_name ?? 'Unnamed',
                        brands: data.product.brands ?? 'Unknown',
                        labels: formatTags(data.product.labels_tags, 'No Labels'),
                        quantity: data.product.quantity ?? 'Not provided',
                        generic_name: data.product.generic_name ?? 'Not available',
                        manufacturing_location: data.product.manufacturing_place ?? 'Not provided',
                        countries_sold: formatTags(data.product.countries_tags),
                        ingredients_list: sanitizeText(data.product.ingredients_text),
                        allergens: formatTags(data.product.allergens_tags, 'None'),
                        type: formatTags(data.product.categories_tags, 'Uncategorized'),
                        recyclability: data.product.packaging_recycling ?? 'Unknown',
                        imageSrc: data.product.image_url ?? '',
                        nutri_score: data.product.nutriscore_grade?.toUpperCase() ?? 'N/A',
                        nova_group: data.product.nova_group ? String(data.product.nova_group) : 'N/A',
                        eco_score: data.product.ecoscore_grade?.toUpperCase() ?? 'N/A',
                        carbon_footprint: data.product.carbon_footprint ?? 'Not available',
                    });

                    const activeProfile = localStorage.getItem('activeUserProfile');
                    if (activeProfile) {
                        const user = JSON.parse(activeProfile);
                        const suitability = isProductSuitable(user, buildSuitabilityPayload(data.product));
                        setSuitabilityMessage(suitability.suitable ? 'suitable' : 'not_suitable');
                    } else {
                        setSuitabilityMessage('unavailable');
                    }
                } else {
                    setProduct(null);
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [code]);

    return (
        <>
            <Header />
            <MainContainer>
                <SearchBar onSearch={handleSearch} long />
                <ButtonGroup buttons={buttons} varied />
                <ContentArea>
                    {loading ? (
                        <Loading />
                    ) : product ? (
                        <>
                            {(USE_API && suitabilityMessage) || !USE_API ? (
                                <SuitabilityMessage
                                    status={
                                        USE_API
                                            ? suitabilityMessage ?? 'unavailable'
                                            : 'unavailable'
                                    }
                                />
                            ) : null}

                            <ProductCard product={product} fullData={fullApiResponse} />
                        </>
                    ) : (
                        <NotFound />
                    )}
                </ContentArea>
            </MainContainer>
            <Footer />
        </>
    );
}

export default Product;
