import styles from './ProductListCard.module.css';
import { Link } from 'react-router-dom';

interface ProductProps {
    code: string;
    imageSrc: string;
    brands: string;
    labels: string;
    name: string;
}

export default function ProductListCard({
    code,
    imageSrc,
    brands,
    labels,
    name,
}: ProductProps) {
    return (
        <div className={styles.card}>
            <img src={imageSrc} className={styles.image} />
            <div className={styles.details}>
                <Link to={`/product/${code}`} className={styles.link}>
                    <h3 className={styles.name}>{name}</h3>
                </Link>

                <div className={styles.info}>
                    <h5 className={styles.title}>Brands</h5>
                    <p className={styles.value}>{brands}</p>

                    <div className={styles.variable}>
                        <h5 className={styles.title}>Labels</h5>
                        <p className={styles.value}>{labels}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
