import styles from './ProfileCard.module.css';

export default function ProfileCard() {
    return (
        <>
            <div className={styles.card}>
                <label className={styles.label}>Name</label>
                <input type="text" className={styles.text} placeholder="Insert a Name" />
            </div>
        </>
    );
}
