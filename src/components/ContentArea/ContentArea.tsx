import styles from './ContentArea.module.css';

interface ContentAreaProps {
    children: React.ReactNode;
}

const ContentArea: React.FC<ContentAreaProps> = ({ children }) => (
    <div className={styles.container}>
        {children}
    </div>
);

export default ContentArea;
