import { useEffect, useState } from 'react';
import styles from './ProfileSelector.module.css';
import type { Profile } from '../../types/Profile';

interface ProfileSelectorProps {
    profiles: Profile[];
    onSelect?: (profile: Profile | null) => void;
}

export default function ProfileSelector({ profiles, onSelect }: ProfileSelectorProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(() => {
        const stored = localStorage.getItem('activeUserProfile');
        if (!stored) return null;
        const found = profiles.findIndex(p => JSON.stringify(p) === stored);
        return found >= 0 ? found : null;
    });

    useEffect(() => {
        // If the active profile was deleted, reset selection
        if (activeIndex !== null && !profiles[activeIndex]) {
            setActiveIndex(null);
            localStorage.removeItem('activeUserProfile');
        }
    }, [profiles, activeIndex]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const idx = e.target.value === '' ? null : Number(e.target.value);
        setActiveIndex(idx);
        if (idx === null) {
            localStorage.removeItem('activeUserProfile');
            onSelect?.(null);
        } else {
            const selected = profiles[idx];
            localStorage.setItem('activeUserProfile', JSON.stringify(selected));
            onSelect?.(selected);
        }
    };

    return (
        <select className={styles.select} value={activeIndex ?? ''} onChange={handleChange}>
            <option value="" disabled className={styles.unselected}>
                Select a Profile
            </option>
            {profiles.map((profile, idx) => (
                <option key={idx} value={idx}>
                    {profile.user_info?.name || `Profile ${idx + 1}`}
                </option>
            ))}
        </select>
    );
}
