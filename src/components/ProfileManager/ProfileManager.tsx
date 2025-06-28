import { useState, useEffect } from 'react';
import styles from './ProfileManager.module.css';
import AddIcon from '../../assets/add.svg';
import ProfileSelector from '../ProfileSelector/ProfileSelector';
import ProfileCard from '../ProfileCard/ProfileCard';
import CustomDialog from '../CustomDialog/CustomDialog';

export default function ProfileManager() {
    const [profiles, setProfiles] = useState(() => {
        const savedProfiles = localStorage.getItem('dietaryProfiles');
        return savedProfiles ? JSON.parse(savedProfiles) : [];
    });

    const [pendingProfile, setPendingProfile] = useState<any | null>(null);

    const [confirmDialog, setConfirmDialog] = useState<{
        message: string;
        onConfirm: () => void;
        onCancel: () => void;
    } | null>(null);

    useEffect(() => {
        localStorage.setItem('dietaryProfiles', JSON.stringify(profiles));
    }, [profiles]);

    const addProfile = () => {
        if (profiles.length >= 3 || pendingProfile) {
            setConfirmDialog({
                message: 'You can only have up to 3 profiles.',
                onConfirm: () => setConfirmDialog(null),
                onCancel: () => setConfirmDialog(null),
            });
            return;
        }

        const newProfile = {
            user_info: { name: '', age: '', dietary_preference: [] },
            allergies: { common_allergens: [], severity: '' },
            health_goals: {
                macro_limits: { sugar_limit_g: '', sodium_limit_g: '', fat_limit_g: '' },
                special_diets: [],
            },
            ingredient_preferences: { avoid: [], preferred: [] },
            environmental_preferences: { packaging: [] },
        };

        setPendingProfile(newProfile);
    };

    const savePendingProfile = (profile: any) => {
        setProfiles(prev => [...prev, profile]);
        setPendingProfile(null);
    };

    const cancelPendingProfile = () => {
        setPendingProfile(null);
    };

    const deleteProfile = (index: number) => {
        setConfirmDialog({
            message: 'Are you sure you want to delete this profile?',
            onConfirm: () => {
                const updated = [...profiles];
                const removed = updated.splice(index, 1);
                setProfiles(updated);

                const active = localStorage.getItem('activeUserProfile');
                if (active && JSON.stringify(JSON.parse(active)) === JSON.stringify(removed[0])) {
                    localStorage.removeItem('activeUserProfile');
                }

                setConfirmDialog(null);
            },
            onCancel: () => setConfirmDialog(null),
        });
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const active = document.activeElement;
            if (active instanceof HTMLInputElement && active.type === 'number') {
                active.blur();
            }
        };

        document.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            document.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>Active Profile</h4>
            <ProfileSelector profiles={profiles} />

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

            {pendingProfile && (
                <ProfileCard
                    index={profiles.length}
                    data={pendingProfile}
                    onChange={(updated) => setPendingProfile(updated)}
                    onDelete={cancelPendingProfile}
                    onSave={savePendingProfile}
                />
            )}

            {!pendingProfile && (
                <button className={styles.addButton} onClick={addProfile}>
                    <img src={AddIcon} alt="Add Profile" className={styles.icon} />
                    Add Profile
                </button>
            )}

            {confirmDialog && (
                <CustomDialog
                    message={confirmDialog.message}
                    onConfirm={confirmDialog.onConfirm}
                    onCancel={confirmDialog.onCancel}
                />
            )}
        </div>
    );
}
