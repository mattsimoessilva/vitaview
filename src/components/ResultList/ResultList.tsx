import styles from './ResultList.module.css';
import ProductListCard from '../ProductListCard/ProductListCard';

interface ResultListProps {
    products: { imageSrc: string, name: string, brands: string, labels: string }[];
}

const ResultList: React.FC<ResultListProps> = ({ products }) => (
     <>
        <h2 className={styles.title}>Search Results</h2>
        <div className={styles.container}>
            {products.map((product, index) => (
                <ProductListCard key={index} {...product} />
            ))}
        </div>
    </>
);

export default ResultList;
