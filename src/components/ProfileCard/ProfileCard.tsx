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
    data: any;
    onChange: (updatedProfile: any) => void;
    onDelete: (index: number) => void;
}

export default function ProfileCard({ index, data, onChange, onDelete }: ProfileCardProps) {
    const updateField = (section: string, field: string, value: any) => {
        const updated = {
            ...data,
            [section]: {
                ...data[section],
                [field]: value
            }
        };
        onChange(updated);
    };

    const updateMacro = (macro: string, value: string) => {
        const updated = {
            ...data,
            health_goals: {
                ...data.health_goals,
                macro_limits: {
                    ...data.health_goals.macro_limits,
                    [macro]: value
                }
            }
        };
        onChange(updated);
    };

    const toggleArrayValue = (section: string, field: string, value: string) => {
        const current = data[section][field];
        const updatedArray = current.includes(value)
            ? current.filter((v: string) => v !== value)
            : [...current, value];

        updateField(section, field, updatedArray);
    };

    const handleAvoidChange = (value: string) => {
        const array = value.split(',').map(s => s.trim());
        updateField('ingredient_preferences', 'avoid', array);
    };

    const saveProfile = () => {
        alert(`Profile ${index + 1} saved!`);
    };

    const deleteProfile = () => {
        onDelete(index);
    };

    return (
        <div className={styles.card}>
            <label className={styles.label}>Name</label>
            <input
                type="text"
                className={styles.text}
                value={data.user_info.name}
                onChange={e => updateField('user_info', 'name', e.target.value)}
                placeholder="Insert a Name"
            />

            <label className={styles.label}>Age</label>
            <input
                type="number"
                className={styles.text}
                value={data.user_info.age}
                onChange={e => updateField('user_info', 'age', e.target.value)}
                placeholder="Insert Age"
            />

            <fieldset className={styles.checkboxGroup}>
                <legend className={styles.label}>Dietary Preferences</legend>
                {dietaryOptions.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={data.user_info.dietary_preference.includes(option)}
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
                            checked={data.allergies.common_allergens.includes(option)}
                            onChange={() => toggleArrayValue('allergies', 'common_allergens', option)}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>

            <label className={styles.label}>Allergy Severity</label>
            <select
                className={styles.selectField}
                value={data.allergies.severity}
                onChange={e => updateField('allergies', 'severity', e.target.value)}
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
                    value={data.health_goals.macro_limits.sugar_limit_g}
                    onChange={e => updateMacro('sugar_limit_g', e.target.value)}
                />

                <label className={styles.sectionLabel}>Sodium limit (g)</label>
                <input
                    type="number"
                    className={styles.inputField}
                    value={data.health_goals.macro_limits.sodium_limit_g}
                    onChange={e => updateMacro('sodium_limit_g', e.target.value)}
                />

                <label className={styles.sectionLabel}>Fat limit (g)</label>
                <input
                    type="number"
                    className={styles.inputField}
                    value={data.health_goals.macro_limits.fat_limit_g}
                    onChange={e => updateMacro('fat_limit_g', e.target.value)}
                />
            </fieldset>

            <fieldset className={styles.checkboxGroup}>
                <legend className={styles.label}>Special Diets</legend>
                {specialDietOptions.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={data.health_goals.special_diets.includes(option)}
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
                            checked={data.ingredient_preferences.preferred.includes(option)}
                            onChange={() => toggleArrayValue('ingredient_preferences', 'preferred', option)}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>

            <fieldset className={styles.checkboxGroup}>
                <legend className={styles.label}>Packaging Preferences</legend>
                {packagingOptions.map(option => (
                    <label key={option} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={data.environmental_preferences.packaging.includes(option)}
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
                <button className={styles.deleteButton} onClick={deleteProfile}>
                    <img src={deleteIcon} className={styles.icon} />
                    <span className={styles.type}>Delete</span>
                </button>
            </div>
        </div>
    );
}
