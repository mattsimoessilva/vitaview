import styles from './ButtonGroup.module.css';
import IconButton from '../IconButton/IconButton';

interface ButtonGroupProps {
    buttons: { iconSrc: string; label: string; altText: string }[];
    varied?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, varied = false }) => {
    const containerClass = varied
        ? `${styles.row} ${styles.varied}`
        : styles.row;

    return (
        <div className={containerClass}>
            {buttons.map((button, index) => (
                <IconButton key={index} {...button} />
            ))}
        </div>
    );
};

export default ButtonGroup;
