import styles from './SuitabilityMessage.module.css';
import CheckIcon from '../../assets/check.svg';
import BlockIcon from '../../assets/block.svg';
import EmptyIcon from '../../assets/empty.svg';

interface MessageProps {
    status: 'suitable' | 'not_suitable' | 'unavailable';
}

const SuitabilityMessage: React.FC<MessageProps> = ({ status }) => {
    const config = {
        suitable: {
            className: `${styles.container} ${styles.suitable}`,
            label: 'Suitable for your dietary needs',
            icon: CheckIcon
        },
        not_suitable: {
            className: `${styles.container} ${styles.not_suitable}`,
            label: 'Not suitable for your dietary needs',
            icon: BlockIcon
        },
        unavailable: {
            className: `${styles.container} ${styles.unavailable}`,
            label: 'No dietary information registered',
            icon: EmptyIcon
        }
    };

    console.log(status);

    const { className, label, icon } = config[status];

    return (
        <div className={className}>
            <img src={icon} className={styles.icon} alt="" />
            <span className={styles.label}>{label}</span>
        </div>
    );
};
export default SuitabilityMessage;