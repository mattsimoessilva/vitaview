import styles from './BannerCard.module.css';

interface BannerCardProps {
    imageSrc: string;
    title: string;
    text: string;
    button: React.ReactNode;
    imagePosition?: 'standard' | 'varied'; // optional, defaults to 'left'
}


export default function BannerCard({
    imageSrc,
    title,
    text,
    button,
    imagePosition = 'standard',
}: BannerCardProps) {
    const isImageStandard = imagePosition === 'standard';

    return (
        <div
            className={`${styles.card} ${isImageStandard ? styles.standard : styles.varied}`}
        >
            <img src={imageSrc} alt={title} className={styles.image} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{text}</p>
                <div className={styles.button}>{button}</div>
            </div>
        </div>
    );
}
