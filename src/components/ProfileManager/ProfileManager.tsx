import { useState, useEffect } from 'react';
import styles from './ProfileManager.module.css';
import AddIcon from '../../assets/add.svg';
import ProfileSelector from '../ProfileSelector/ProfileSelector';
import ProfileCard from '../ProfileCard/ProfileCard';

export default function ProfileManager() {

    const [profiles, setProfiles] = useState(() => {
        const savedProfiles = localStorage.getItem('dietaryProfiles');
        return savedProfiles ? JSON.parse(savedProfiles) : [];
    });




    useEffect(() => {
        localStorage.setItem('dietaryProfiles', JSON.stringify(profiles));
        console.log('Saved to localStorage:', profiles);
    }, [profiles]);


    const addProfile = () => {
        if (profiles.length >= 3) {
            alert('You can only have up to 3 profiles.');
            return;
        }

        const newProfile = {
            user_info: { name: '', age: '', dietary_preference: [] },
            allergies: { common_allergens: [], severity: '' },
            health_goals: {
                macro_limits: { sugar_limit_g: '', sodium_limit_g: '', fat_limit_g: '' },
                special_diets: []
            },
            ingredient_preferences: { avoid: [], preferred: [] },
            environmental_preferences: { packaging: [] }
        };

        setProfiles(prev => [...prev, newProfile]);
    };

    const deleteProfile = (index: number) => {
        const updated = [...profiles];
        updated.splice(index, 1);
        setProfiles(updated);
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>Active Profile</h4>
            <ProfileSelector />

            <h4 className={styles.title}>All Profiles ({profiles.length}/3)</h4>
            {profiles.map((_, index) => (
                <ProfileCard
                    key={index}
                    index={index}
                    data={profiles[index]}
                    onChange={(updatedProfile) => {
                        const updated = [...profiles];
                        updated[index] = updatedProfile;
                        setProfiles(updated);
                    }}
                    onDelete={deleteProfile}
                />

            ))}

            <button className={styles.addButton} onClick={addProfile}>
                <img src={AddIcon} alt="Add Profile" className={styles.icon} />
                Add Profile
            </button>
        </div>
    );
}
