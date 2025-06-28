// Option arrays
export const dietaryOptions = [
  'Vegan', 'Vegetarian', 'Pescatarian', 'Gluten-Free', 'Keto', 'Paleo', 'None'
];
export const allergenOptions = [
  'Dairy', 'Nuts', 'Gluten', 'Soy', 'Eggs', 'Shellfish', 'None'
];
export const severityOptions = [
  'Mild', 'Moderate', 'Severe', 'None'
];
export const specialDietOptions = [
  'Low-Sodium', 'Heart-Healthy', 'Diabetic-Friendly', 'High-Protein', 'None'
];
export const preferredIngredients = [
  'Organic Produce', 'Whole Grains', 'Plant-Based Proteins', 'None'
];
export const packagingOptions = [
  'Recyclable', 'Minimal Packaging', 'Plastic-Free', 'None'
];

// Validation logic
import type { Profile } from '../types/Profile';

export function validateProfile(data: Profile): string | null {
  const { name, age, dietary_preference } = data.user_info;
  const { common_allergens, severity } = data.allergies;
  const { sugar_limit_g, sodium_limit_g, fat_limit_g } = data.health_goals.macro_limits;
  const { special_diets } = data.health_goals;
  const { preferred } = data.ingredient_preferences;
  const { packaging } = data.environmental_preferences;

  if (!name.trim()) return 'Name is required.';
  if (!age || isNaN(Number(age)) || Number(age) <= 0) return 'Age must be a positive number.';

  const macros = [sugar_limit_g, sodium_limit_g, fat_limit_g];
  for (const macro of macros) {
    if (macro && (isNaN(Number(macro)) || Number(macro) < 0)) {
      return 'Macro limits must be non-negative numbers.';
    }
  }

  const requireChoice = (arr: string[], label: string) => {
    if (arr.length === 0) return `Please select at least one option or choose "None" for ${label}.`;
    if (arr.includes('None') && arr.length > 1) return `You cannot select "None" along with other options for ${label}.`;
    return null;
  };

  const checks = [
    requireChoice(dietary_preference, 'Dietary Preferences'),
    requireChoice(common_allergens, 'Allergies'),
    requireChoice(special_diets, 'Special Diets'),
    requireChoice(preferred, 'Preferred Ingredients'),
    requireChoice(packaging, 'Packaging Preferences')
  ];

  for (const check of checks) {
    if (check) return check;
  }

  if (!severity) return 'Please select an allergy severity.';

  return null;
}