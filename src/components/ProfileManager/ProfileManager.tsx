import styles from './ProfileManager.module.css';
import IconButton from '../IconButton/IconButton';
import AddIcon from '../../assets/add.svg';
import ProfileSelector from '../ProfileSelector/ProfileSelector';
import ProfileCard from '../ProfileCard/ProfileCard';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

export default function ProfileManager() {

    const buttons = [
        { iconSrc: AddIcon, label: 'Add Profile', altText: 'Button to add Dietary Profile', theme: 'dark' }
    ];


    return (
        <>
            <div className={styles.container}>
                <h4 className={styles.title}>Active Profile</h4>
                <ProfileSelector />
                <h4 className={styles.title}>All Profiles (0/3)</h4>
                <ProfileCard />
                <ButtonGroup buttons={buttons} />
            </div>
        </>
    );
}
