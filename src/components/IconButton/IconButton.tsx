import styles from './IconButton.module.css';

interface IconButtonProps {
    iconSrc: string;
    label: string;
    altText: string;
}

const IconButton: React.FC<IconButtonProps> = ({ iconSrc, label, altText }) => {
    return (
        <button className={styles.button}>
            <img src={iconSrc} alt={altText} className={styles.icon} />
            <span className={styles.label}>{label}</span>
        </button>
    );
};

export default IconButton;