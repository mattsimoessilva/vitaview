import styles from './HeaderSection.module.css';

const HeaderSection = () => (
    <div className={styles.container}>
        <h1 className={styles.title}>Find the Best Meal for You</h1>
        <p className={styles.subtitle}>
          Search by product name to explore detailed nutrition facts and make healthier food choices
        </p>
    </div>
);

export default HeaderSection;