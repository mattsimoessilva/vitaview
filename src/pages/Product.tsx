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
                const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}?fields=code,product_name,brands,labels_tags,quantity,generic_name,manufacturing_place,countries_tags,ingredients_text,allergens_tags,categories_tags,packaging_recycling,image_url,nutriscore_grade,nova_group,ecoscore_grade,carbon_footprint`);
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
                        <ProductCard product={product} />
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
