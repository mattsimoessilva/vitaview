import styles from './ProductCard.module.css';
interface ProductProps {
    product: {
        imageSrc: string,
        name: string,
        brands: string,
        labels: string,
        quantity: string,
        generic_name: string,
        code: string,
        manufacturing_location: string,
        countries_sold: string,
        ingredients_list: string,
        allergens: string,
        type: string,
        recyclability: string,
        nutri_score: string,
        nova_group: string,
        carbon_footprint: string,
        eco_score: string,
    }
}

const ProductCard: React.FC<ProductProps> = ({product}) => (
    <>
        <div className={styles.card}>
            <img src={product.imageSrc} className={styles.image} alt={product.name} />
            <div className={styles.section}>
                <h3 className={styles.section_title}>Basic Product Info</h3>

                <h5 className={styles.title}>Product Name</h5>
                <p className={styles.value}>{product.name}</p>

                <h5 className={styles.title}>Brands</h5>
                <p className={styles.value}>{product.brands}</p>

                <h5 className={styles.title}>Quantity</h5>
                <p className={styles.value}>{product.quantity}</p>

                <h5 className={styles.title}>Generic Name</h5>
                <p className={styles.value}>{product.generic_name}</p>

                <h5 className={styles.title}>Code (GTIN/Barcode)</h5>
                <p className={styles.value}>{product.code}</p>
            </div>

            <div className={styles.section}>
                <h3 className={styles.section_title}>Origins & Availability</h3>

                <h5 className={styles.title}>Manufacturing Location</h5>
                <p className={styles.value}>{product.manufacturing_location}</p>

                <h5 className={styles.title}>Countries Sold</h5>
                <p className={styles.value}>{product.countries_sold}</p>
            </div>

            <div className={styles.section}>
                <h3 className={styles.section_title}>Ingredients & Allergens</h3>

                <h5 className={styles.title}>Ingredients List</h5>
                <p className={styles.value}>{product.ingredients_list}</p>

                <h5 className={styles.title}>Allergens</h5>
                <p className={styles.value}>{product.allergens}</p>

                <h5 className={styles.title}>Labels</h5>
                <p className={styles.value}>{product.labels}</p>
            </div>

            <div className={styles.section}>
                <h3 className={styles.section_title}>Nutrition & Ecology</h3>

                <h5 className={styles.title}>Nutri-Score</h5>
                <p className={styles.value}>{product.nutri_score}</p>

                <h5 className={styles.title}>NOVA Group</h5>
                <p className={styles.value}>{product.nova_group}</p>

                <h5 className={styles.title}>Eco-Score</h5>
                <p className={styles.value}>{product.eco_score}</p>

                <h5 className={styles.title}>Carbon Footprint Estimation</h5>
                <p className={styles.value}>{product.carbon_footprint}</p>
            </div>

            <div className={styles.section}>
                <h3 className={styles.section_title}>Packaging</h3>

                <h5 className={styles.title}>Type</h5>
                <p className={styles.value}>{product.type}</p>

                <h5 className={styles.title}>Recyclability</h5>
                <p className={styles.value}>{product.recyclability}</p>
            </div>

        </div>
    </>
);

export default ProductCard;
