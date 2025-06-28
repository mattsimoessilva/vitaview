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
import MockImage from '../assets/mock_image.jpg';
import config from '../config';
import { isProductSuitable } from '../utils/checkSuitability';
import SuitabilityMessage from '../components/SuitabilityMessage/SuitabilityMessage';

const USE_API = config.USE_API;

const buttons = [
    { iconSrc: ListIcon, label: 'Dietary Info', altText: 'List Icon' }
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
    const [suitabilityMessage, setSuitabilityMessage] = useState<string | null>(null);

    const handleSearch = (newQuery: string) => {
        navigate(`/results?query=${encodeURIComponent(newQuery)}&page=1`);
    };

    useEffect(() => {
        if (!USE_API) {
            setProduct({
                code: 'mock123',
                name: 'Mock Chocolate Delight Bar with Ultra Flavor Burst and Crunchy Clusters',
                brands: 'Imaginary Foods Inc.',
                labels: 'Organic, Gluten Free, Fair Trade',
                quantity: '120g (4.2oz)',
                generic_name: 'Chocolate Energy Snack Bar',
                manufacturing_location: 'Mocksville, USA',
                countries_sold: 'United States, Canada, UK',
                ingredients_list: 'Cocoa solids, organic cane sugar, quinoa puffs, almond butter, natural vanilla flavor',
                allergens: 'Contains almonds and may contain traces of peanuts and soy',
                type: 'Snack',
                recyclability: 'Wrapper recyclable in soft plastic bins only',
                imageSrc: MockImage,
                nutri_score: 'A',
                nova_group: '1',
                eco_score: 'B',
                carbon_footprint: '600 g CO2 eq/kg',
            });
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}?fields=code,product_name,brands,labels_tags,quantity,generic_name,manufacturing_place,countries_tags,ingredients_text,ingredients_tags,allergens_tags,categories_tags,packaging_tags,packaging_recycling,image_url,nutriscore_grade,nova_group,ecoscore_grade,carbon_footprint,nutriments,ingredients_analysis_tags`);
                const data = await res.json();

                if (data.status === 1 && data.product) {
                    setProduct({
                        code: data.product.code ?? '',
                        name: data.product.product_name ?? 'Unnamed',
                        brands: data.product.brands ?? 'Unknown',
                        labels: (data.product.labels_tags || [])
                            .map((label: string) =>
                                label.replace(/^en:/, '')
                                    .replace(/-/g, ' ')
                                    .replace(/\b\w/g, c => c.toUpperCase())
                            ).join(', ') || 'No Labels',
                        quantity: data.product.quantity ?? 'Not provided',
                        generic_name: data.product.generic_name ?? 'Not available',
                        manufacturing_location: data.product.manufacturing_place ?? 'Not provided',
                        countries_sold: (data.product.countries_tags || [])
                            .map((c: string) =>
                                c.replace(/^en:/, '')
                                    .replace(/-/g, ' ')
                                    .replace(/\b\w/g, l => l.toUpperCase())
                            ).join(', ') || 'Not specified',
                        ingredients_list: data.product.ingredients_text ?? 'Not listed',
                        allergens: (data.product.allergens_tags || [])
                            .map((a: string) =>
                                a.replace(/^en:/, '')
                                    .replace(/-/g, ' ')
                                    .replace(/\b\w/g, c => c.toUpperCase())
                            ).join(', ') || 'None',
                        type: (data.product.categories_tags || [])
                            .map((cat: string) =>
                                cat.replace(/^en:/, '')
                                    .replace(/-/g, ' ')
                                    .replace(/\b\w/g, c => c.toUpperCase())
                            ).join(', ') || 'Uncategorized',
                        recyclability: data.product.packaging_recycling ?? 'Unknown',
                        imageSrc: data.product.image_url ?? '',
                        nutri_score: data.product.nutriscore_grade?.toUpperCase() ?? 'N/A',
                        nova_group: data.product.nova_group ? String(data.product.nova_group) : 'N/A',
                        eco_score: data.product.ecoscore_grade?.toUpperCase() ?? 'N/A',
                        carbon_footprint: data.product.carbon_footprint ?? 'Not available',
                    });

                    // Suitability check
                    const activeProfile = localStorage.getItem('activeUserProfile');
                    if (activeProfile) {
                        const user = JSON.parse(activeProfile);
                        const suitability = isProductSuitable(user, {
                            ingredients_tags: data.product.ingredients_tags ?? [],
                            allergens_tags: data.product.allergens_tags ?? [],
                            nutriments: {
                                sugars_value: data.product.nutriments?.sugars ?? 0,
                                sodium_value: data.product.nutriments?.sodium ?? 0,
                                fat_value: data.product.nutriments?.fat ?? 0,
                                saturated_fat: data.product.nutriments?.saturated_fat ?? 0,
                                proteins_value: data.product.nutriments?.proteins ?? 0,
                                carbohydrates_value: data.product.nutriments?.carbohydrates ?? 0
                            },
                            packaging_tags: data.product.packaging_tags ?? [],
                            labels_tags: data.product.labels_tags ?? [],
                            ingredients_analysis_tags: data.product.ingredients_analysis_tags ?? []
                        });

                        setSuitabilityMessage(
                            suitability.suitable
                                ? 'suitable'
                                : 'not_suitable'
                        );
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
                                <SuitabilityMessage status={USE_API ? suitabilityMessage! : 'suitable'} />
                            ) : null}

                            <ProductCard product={product} />
                        </>
                    ) : (
                        <p>No data found for “{code}”</p>
                    )}
                </ContentArea>
            </MainContainer>
            <Footer />
        </>
    );
}

export default Product;
