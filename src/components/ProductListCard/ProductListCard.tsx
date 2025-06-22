import styles from './ProductListCard.module.css';

interface ProductProps {
    imageSrc: string;
    brands: string;
    labels: string;
    name: string;
}

export default function ProductListCard({
    imageSrc,
    brands,
    labels,
    name,
}: ProductProps) {
    return (
        <div className={styles.card}>
            <img src={imageSrc} className={styles.image} />
            <div className={styles.details}>
                <h3 className={styles.name}>{name}</h3>

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
