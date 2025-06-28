export interface Profile {
    user_info: {
        name: string;
        age: number | string;
        has_dietary_restrictions: boolean;
        dietary_preference: string[];
    };
    allergies: {
        has_allergies: boolean;
        common_allergens: string[];
        severity: 'Mild' | 'Moderate' | 'Severe' | '';
    };
    health_goals: {
        has_special_diets: boolean;
        macro_limits: {
            sugar_limit_g: number | string;
            sodium_limit_g: number | string;
            fat_limit_g: number | string;
        };
        special_diets: string[];
    };
    ingredient_preferences: {
        has_ingredient_preferences: boolean;
        preferred: string[];
        avoid: string[];
    };
    environmental_preferences: {
        has_packaging_preferences: boolean;
        packaging: string[];
    };
}
