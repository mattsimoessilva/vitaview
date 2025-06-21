import styles from './ButtonGroup.module.css';
import IconButton from '../IconButton/IconButton';

interface ButtonGroupProps {
    buttons: { iconSrc: string; label: string; altText: string }[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => (
    <div className={styles.row}>
        {buttons.map((button, index) => (
            <IconButton key={index} {...button} />
        ))}
    </div>
);

export default ButtonGroup;