import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.container}>
            <CircularProgress size={40} />
            <p className={styles.text}>Loading results for you...</p>
        </div>
    );
}

export default Loading;