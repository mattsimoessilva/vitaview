import styles from './NotFound.module.css';

const NotFound = ({ message = "No Data Found" }) => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>{message}</p>
        </div>
    );
};

export default NotFound;
