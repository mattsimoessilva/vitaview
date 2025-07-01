import styles from './InfoToolTip.module.css';

export default function InfoTooltip() {
    return (
        <span className={styles.tooltipWrapper}>
            <span className={styles.tooltipIcon} tabIndex={0} aria-label="What are Dietary Profiles?" role="button">
                ?
            </span>
            <span className={styles.tooltipText}>
                <b>Dietary Profiles</b> let you save your dietary preferences, allergies, and health goals. You can quickly switch between profiles to check product suitability for different people or needs
            </span>
        </span>
    );
}