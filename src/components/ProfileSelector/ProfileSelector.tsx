import { useEffect, useState } from 'react';
import styles from './ProfileSelector.module.css';
import type { Profile } from '../../types/Profile';

interface ProfileSelectorProps {
    profiles: Profile[];
    onSelect?: (profile: Profile | null) => void;
}

export default function ProfileSelector({ profiles, onSelect }: ProfileSelectorProps) {
    const [activeIndex, setActiveIndex] = useState<number | ''>('');

    useEffect(() => {
        const active = localStorage.getItem('activeUserProfile');
        if (active) {
            const activeProfile: Profile = JSON.parse(active);
            const index = profiles.findIndex(p => JSON.stringify(p) === JSON.stringify(activeProfile));
            if (index !== -1) setActiveIndex(index);
        }
    }, [profiles]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = Number(e.target.value);
        setActiveIndex(index);
        const selected = profiles[index];
        localStorage.setItem('activeUserProfile', JSON.stringify(selected));
        onSelect?.(selected);
    };

    return (
        <select className={styles.select} value={activeIndex} onChange={handleChange}>
            <option value="" disabled className={styles.unselected} selected>
                Select a Profile
            </option>
            {profiles.map((profile, i) => (
                <option key={i} value={i}>
                    {profile.user_info.name || `Profile ${i + 1}`}
                </option>
            ))}
        </select>
    );
}
