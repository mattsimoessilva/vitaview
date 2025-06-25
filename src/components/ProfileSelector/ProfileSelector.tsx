import styles from './ProfileSelector.module.css';

export default function ProfileSelector() {
    return (
        <>
            <select className={styles.select}>
                <option className={styles.unselected}>Select a Profile</option>
            </select>
        </>
    );
}
