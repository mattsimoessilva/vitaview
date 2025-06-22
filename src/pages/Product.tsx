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

const USE_API = false;

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
            // Use mock data
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

        // Otherwise fetch from API (placeholder)
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}`);
                const data = await res.json();
                if (data.product) {
                    setProduct({
                        code: data.product.code ?? '',
                        name: data.product.name ?? '',
                        brands: data.product.brands ?? '',
                        labels: (data.product.labels_tags || []).filter((label: string) =>
                            label.startsWith('en:')
                        ).map((label: string) =>
                            label.replace('en:', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                        ).join(', ') || 'No Labels',
                        quantity: data.product.quantity ?? '',
                        generic_name: data.product.generic_name ?? '',
                        manufacturing_location: data.product.manufacturing_place ?? '',
                        countries_sold: data.product.countries_tags ? data.product.countries_tags.join(', ') : '',
                        ingredients_list: data.product.ingredients_text ?? '',
                        allergens: data.product.allergens ?? '',
                        type: data.product.categories_tags ? data.product.categories_tags.join(', ') : '',
                        recyclability: data.product.packaging_recycling ?? '',
                        imageSrc: data.product.image_url || '',
                        nutri_score: data.product.nutriscore_grade ?? '',
                        nova_group: data.product.nova_group ? String(data.product.nova_group) : '',
                        eco_score: data.product.ecoscore_grade ?? '',
                        carbon_footprint: data.product.carbon_footprint ?? '',
                    });
                }
            } catch (err) {
                console.error('Error loading product:', err);
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
                            <ProductCard
                                product={{
                                    code: product.code,
                                    name: product.name,
                                    brands: product.brands,
                                    labels: product.labels,
                                    quantity: product.quantity,
                                    generic_name: product.generic_name,
                                    imageSrc: product.imageSrc,
                                    manufacturing_location: product.manufacturing_location,
                                    countries_sold: product.countries_sold,
                                    ingredients_list: product.ingredients_list,
                                    allergens: product.allergens,
                                    type: product.type,
                                    recyclability: product.recyclability,
                                    nutri_score: product.nutri_score,
                                    nova_group: product.nova_group,
                                    eco_score: product.eco_score,
                                    carbon_footprint: product.carbon_footprint,
                                }}
                            />

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
