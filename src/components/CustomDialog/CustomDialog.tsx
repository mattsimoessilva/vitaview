import styles from "./CustomDialog.module.css";

interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <button onClick={onConfirm}>Ok</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmDialog;
