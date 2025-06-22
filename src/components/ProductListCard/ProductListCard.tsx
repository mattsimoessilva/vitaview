import styles from './ProductListCard.module.css';

interface ProductProps {
    imageSrc: string;
    categories: string;
    labels: string;
    name: string;
}

export default function ProductListCard({
    imageSrc,
    categories,
    labels,
    name,
}: ProductProps) {
    return (
        <div className={styles.card}>
            <img src={imageSrc} className={styles.image} />
            <div className={styles.details}>
                <h3 className={styles.name}>{name}</h3>

                <div className={styles.info}>
                    <h5 className={styles.title}>Categories</h5>
                    <p className={styles.value}>{categories}</p>

                    <div className={styles.variable}>
                        <h5 className={styles.title}>Labels</h5>
                        <p className={styles.value}>{labels}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
