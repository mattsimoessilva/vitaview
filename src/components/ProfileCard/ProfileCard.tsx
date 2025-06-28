import { useState, useEffect } from 'react';
import styles from './ProfileCard.module.css';
import saveIcon from '../../assets/save.svg';
import deleteIcon from '../../assets/delete.svg';

const dietaryOptions = ['Vegan', 'Vegetarian', 'Pescatarian', 'Gluten-Free', 'Keto', 'Paleo', 'Other'];
const allergenOptions = ['Dairy', 'Nuts', 'Gluten', 'Soy', 'Eggs', 'Shellfish', 'Other'];
const severityOptions = ['Mild', 'Moderate', 'Severe'];
const specialDietOptions = ['Low-Sodium', 'Heart-Healthy', 'Diabetic-Friendly', 'High-Protein', 'Other'];
const preferredIngredients = ['Organic Produce', 'Whole Grains', 'Plant-Based Proteins'];
const packagingOptions = ['Recyclable', 'Minimal Packaging', 'Plastic-Free'];

interface ProfileCardProps {
    index: number;
    onDelete: (index: number) => void;
}

export default function ProfileCard({ index, onDelete }: ProfileCardProps) {
    const [profile, setProfile] = useState(() => {
        const stored = localStorage.getItem('dietaryProfiles');
        const profiles = stored ? JSON.parse(stored) : [];
        return profiles[index] || {
            user_info: { name: '', age: '', dietary_preference: [] },
            allergies: { common_allergens: [], severity: '' },
            health_goals: {
                macro_limits: { sugar_limit_g: '', sodium_limit_g: '', fat_limit_g: '' },
                special_diets: []
            },
            ingredient_preferences: { avoid: [], preferred: [] },
            environmental_preferences: { packaging: [] }
        };
    });

    const updateProfile = (section: string, field: string, value: any) => {
        setProfile(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const updateMacro = (macro: string, value: string) => {
        setProfile(prev => ({
            ...prev,
            health_goals: {
                ...prev.health_goals,
                macro_limits: {
                    ...prev.health_goals.macro_limits,
                    [macro]: value
                }
            }
        }));
    };

    const toggleArrayValue = (section: string, field: string, value: string) => {
        setProfile(prev => {
            const current = prev[section][field];
            const updated = current.includes(value)
                ? current.filter((v: string) => v !== value)
                : [...current, value];
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: updated
                }
            };
        });
    };

    const handleAvoidChange = (value: string) => {
        setProfile(prev => ({
            ...prev,
            ingredient_preferences: {
                ...prev.ingredient_preferences,
                avoid: value.split(',').map(s => s.trim())
            }
        }));
    };

    const saveProfile = () => {
        const stored = localStorage.getItem('dietaryProfiles');
        const profiles = stored ? JSON.parse(stored) : [];
        profiles[index] = profile;
        localStorage.setItem('dietaryProfiles', JSON.stringify(profiles));
        alert(`Profile ${index + 1} saved!`);
    };

    const deleteProfile = () => {
        const stored = localStorage.getItem('dietaryProfiles');
        const profiles = stored ? JSON.parse(stored) : [];
        profiles.splice(index, 1);
        localStorage.setItem('dietaryProfiles', JSON.stringify(profiles));
        onDelete(index);
    };

    return (
        <div className={styles.card}>
            <label className={styles.label}>Name</label>
            <input
                type="text"
                className={styles.text}
                value={profile.user_info.name}
                onChange={e => updateProfile('user_info', 'name', e.target.value)}
                placeholder="Insert a Name"
            />

            <label className={styles.label}>Age</label>
            <input
                type="number"
                className={styles.text}
                value={profile.user_info.age}
                onChange={e => updateProfile('user_info', 'age', e.target.value)}
                placeholder="Insert Age"
            />

            <fieldset className={styles.checkboxGroup}>
                <legend className={styles.label}>Dietary Preferences</legend>
                {dietaryOptions.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={profile.user_info.dietary_preference.includes(option)}
                            onChange={() => toggleArrayValue('user_info', 'dietary_preference', option)}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>

            <fieldset className={styles.checkboxGroup}>
                <legend className={styles.label}>Allergies</legend>
                {allergenOptions.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={profile.allergies.common_allergens.includes(option)}
                            onChange={() => toggleArrayValue('allergies', 'common_allergens', option)}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>

            <label className={styles.label}>Allergy Severity</label>
            <select
                className={styles.selectField}
                value={profile.allergies.severity}
                onChange={e => updateProfile('allergies', 'severity', e.target.value)}
            >
                <option value="">Select severity</option>
                {severityOptions.map(level => (
                    <option key={level} value={level}>{level}</option>
                ))}
            </select>

            <fieldset className={styles.group}>
                <legend className={styles.label}>Macro Limits (grams)</legend>

                <label className={styles.sectionLabel}>Sugar limit (g)</label>
                <input
                    type="number"
                    className={styles.inputField}
                    value={profile.health_goals.macro_limits.sugar_limit_g}
                    onChange={e => updateMacro('sugar_limit_g', e.target.value)}
                />

                <label className={styles.sectionLabel}>Sodium limit (g)</label>
                <input
                    type="number"
                    className={styles.inputField}
                    value={profile.health_goals.macro_limits.sodium_limit_g}
                    onChange={e => updateMacro('sodium_limit_g', e.target.value)}
                />

                <label className={styles.sectionLabel}>Fat limit (g)</label>
                <input
                    type="number"
                    className={styles.inputField}
                    value={profile.health_goals.macro_limits.fat_limit_g}
                    onChange={e => updateMacro('fat_limit_g', e.target.value)}
                />
            </fieldset>


            <fieldset className={styles.checkboxGroup}>
                <legend className={styles.label}>Special Diets</legend>
                {specialDietOptions.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={profile.health_goals.special_diets.includes(option)}
                            onChange={() => toggleArrayValue('health_goals', 'special_diets', option)}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>

            <fieldset className={styles.checkboxGroup}>
                <legend className={styles.label}>Preferred Ingredients</legend>
                {preferredIngredients.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={profile.ingredient_preferences.preferred.includes(option)}
                            onChange={() => toggleArrayValue('ingredient_preferences', 'preferred', option)}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>

            <label className={styles.label}>Avoid Ingredients (comma-separated)</label>
            <input
                type="text"
                className={styles.text}
                placeholder="e.g. Aspartame, MSG"
                value={profile.ingredient_preferences.avoid.join(', ')}
                onChange={e => handleAvoidChange(e.target.value)}
            />

            <fieldset className={styles.checkboxGroup}>
                <legend className={styles.label}>Packaging Preferences</legend>
                {packagingOptions.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={profile.environmental_preferences.packaging.includes(option)}
                            onChange={() => toggleArrayValue('environmental_preferences', 'packaging', option)}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>

            <div className={styles.actions}>
                <button className={styles.saveButton} onClick={saveProfile}>
                    <img src={saveIcon} className={styles.icon} />
                    <span className={styles.type}>Save</span>
                </button>
                <button className={styles.deleteButton} onClick={saveProfile}>
                    <img src={deleteIcon} className={styles.icon} />
                    <span className={styles.type}>Delete</span>
                </button>
            </div>
        </div>
    );
}
