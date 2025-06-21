import styles from './IconButton.module.css';

interface IconButtonProps {
    iconSrc: string;
    label: string;
    altText: string;
    theme?: 'light' | 'dark';
}

const IconButton: React.FC<IconButtonProps> = ({
    iconSrc,
    label,
    altText,
    theme = 'light',
}) => {
    const buttonClass =
        theme === 'dark' ? `${styles.button} ${styles.dark}` : `${styles.button} ${styles.light}`;

    return (
        <button className={buttonClass}>
            <img src={iconSrc} alt={altText} className={styles.icon} />
            <span className={styles.label}>{label}</span>
        </button>
    );
};

export default IconButton;
