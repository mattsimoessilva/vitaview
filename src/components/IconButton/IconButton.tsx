import styles from './IconButton.module.css';
import { Link } from 'react-router-dom';
interface IconButtonProps {
    iconSrc: string;
    label: string;
    altText: string;
    theme?: 'light' | 'dark';
    link?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    iconSrc,
    label,
    altText,
    theme = 'light',
    link,
}) => {
    const buttonClass =
        theme === 'dark' ? `${styles.button} ${styles.dark}` : `${styles.button} ${styles.light}`;

    return (
        <>
            <Link to={link}>
                <button className={buttonClass}>
                    <img src={iconSrc} alt={altText} className={styles.icon} />
                    <span className={styles.label}>{label}</span>
                </button>
            </Link>
        </>
    );
};

export default IconButton;
