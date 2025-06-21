import styles from './BannerCard.module.css';

interface BannerCardProps {
    imageSrc: string;
    title: string;
    text: string;
    button: React.ReactNode;
    imagePosition?: 'left' | 'right'; // optional, defaults to 'left'
}


export default function BannerCard({
    imageSrc,
    title,
    text,
    button,
    imagePosition = 'left',
}: BannerCardProps) {
    const isImageLeft = imagePosition === 'left';

    return (
        <div
            className={`${styles.card} ${isImageLeft ? styles.left : styles.right}`}
        >
            <img src={imageSrc} alt={title} className={styles.image} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{text}</p>
                <div className={styles.buttonContainer}>{button}</div>
            </div>
        </div>
    );
}
