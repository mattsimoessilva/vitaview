type DietaryPreference =
    | "Vegan"
    | "Vegetarian"
    | "Pescatarian"
    | "Gluten-Free"
    | "Keto"
    | "Paleo"
    | "Other";

type Allergen =
    | "Dairy"
    | "Nuts"
    | "Gluten"
    | "Soy"
    | "Eggs"
    | "Shellfish"
    | "Other";

type SpecialDiet =
    | "Low-Sodium"
    | "Heart-Healthy"
    | "Diabetic-Friendly"
    | "High-Protein"
    | "Other";

interface UserProfile {
    user_info: {
        name: string;
        age: number;
        dietary_preference: DietaryPreference[];
    };
    allergies: {
        common_allergens: Allergen[];
        severity: "Mild" | "Moderate" | "Severe";
    };
    health_goals: {
        macro_limits: {
            sugar_limit_g?: number;
            sodium_limit_g?: number;
            fat_limit_g?: number;
        };
        special_diets: SpecialDiet[];
    };
    ingredient_preferences: {
        avoid: string[];
        preferred: string[];
    };
    environmental_preferences: {
        packaging: string[];
    };
}

interface ProductData {
    ingredients_tags?: string[];
    allergens_tags?: string[];
    nutriments?: {
        sugars_value?: number;
        sodium_value?: number;
        fat_value?: number;
        saturated_fat?: number;
        proteins_value?: number;
        carbohydrates_value?: number;
    };
    packaging_tags?: string[];
    labels_tags?: string[];
    ingredients_analysis_tags?: string[];
}

interface SuitabilityResult {
    suitable: boolean;
    reasons: string[];
}

export function isProductSuitable(user: UserProfile, product: ProductData): SuitabilityResult {
    const result: SuitabilityResult = {
        suitable: true,
        reasons: []
    };

    const { dietary_preference } = user.user_info;
    const { common_allergens, severity } = user.allergies;
    const { macro_limits, special_diets } = user.health_goals;
    const { avoid, preferred } = user.ingredient_preferences;
    const { packaging } = user.environmental_preferences;

    const productIngredients = product.ingredients_tags || [];
    const productAllergens = product.allergens_tags || [];
    const productNutriments = product.nutriments || {};
    const productPackaging = product.packaging_tags || [];
    const productAnalysis = product.ingredients_analysis_tags || [];

    // 1. Dietary Preference Check
    const dietaryChecks: Record<DietaryPreference, () => boolean> = {
        Vegan: () => !productAnalysis.includes("en:non-vegan"),
        Vegetarian: () => !productAnalysis.includes("en:non-vegetarian"),
        Pescatarian: () => !productIngredients.some(tag => tag.includes("meat")),
        "Gluten-Free": () => !productAllergens.includes("en:gluten"),
        Keto: () => (productNutriments.carbohydrates_value || 0) <= 5,
        Paleo: () => !productIngredients.some(tag => tag.includes("grains") || tag.includes("dairy")),
        Other: () => true
    };

    for (const preference of dietary_preference) {
        const check = dietaryChecks[preference];
        if (check && !check()) {
            result.suitable = false;
            result.reasons.push(`Does not meet ${preference} dietary preference`);
        }
    }

    // 2. Allergen Check
    for (const allergen of common_allergens) {
        const allergenTag = `en:${allergen.toLowerCase()}`;
        if (productAllergens.includes(allergenTag)) {
            result.suitable = false;
            result.reasons.push(`Contains allergen: ${allergen} (${severity})`);
        }
    }

    // 3. Macro Limits Check
    const macroCheck = {
        sugar: productNutriments.sugars_value || 0,
        sodium: productNutriments.sodium_value || 0,
        fat: productNutriments.fat_value || 0,
        saturated_fat: productNutriments.saturated_fat || 0
    };

    if (macro_limits.sugar_limit_g && macroCheck.sugar > macro_limits.sugar_limit_g) {
        result.suitable = false;
        result.reasons.push(`Exceeds sugar limit (${macroCheck.sugar}g > ${macro_limits.sugar_limit_g}g)`);
    }
    if (macro_limits.sodium_limit_g && macroCheck.sodium > macro_limits.sodium_limit_g) {
        result.suitable = false;
        result.reasons.push(`Exceeds sodium limit (${macroCheck.sodium}g > ${macro_limits.sodium_limit_g}g)`);
    }
    if (macro_limits.fat_limit_g && macroCheck.fat > macro_limits.fat_limit_g) {
        result.suitable = false;
        result.reasons.push(`Exceeds fat limit (${macroCheck.fat}g > ${macro_limits.fat_limit_g}g)`);
    }

    // 4. Special Diets
    const specialDietChecks: Record<SpecialDiet, () => boolean> = {
        "Low-Sodium": () => macroCheck.sodium <= 0.12,
        "Heart-Healthy": () => macroCheck.saturated_fat <= 1 && macroCheck.sodium <= 0.12,
        "Diabetic-Friendly": () => macroCheck.sugar <= 5,
        "High-Protein": () => (productNutriments.proteins_value || 0) >= 10,
        Other: () => true
    };

    for (const diet of special_diets) {
        const check = specialDietChecks[diet];
        if (check && !check()) {
            result.suitable = false;
            result.reasons.push(`Does not meet ${diet} criteria`);
        }
    }

    // 5. Ingredient Preferences
    for (const ingredient of avoid) {
        if (productIngredients.includes(ingredient.toLowerCase())) {
            result.suitable = false;
            result.reasons.push(`Contains avoided ingredient: ${ingredient}`);
        }
    }

    for (const preferredIngredient of preferred) {
        if (!productIngredients.includes(preferredIngredient.toLowerCase())) {
            result.reasons.push(`Preferred ingredient not found: ${preferredIngredient}`);
        }
    }

    // 6. Environmental Preferences
    for (const packPref of packaging) {
        const tag = `en:${packPref.toLowerCase().replace(/ /g, "-")}`;
        if (!productPackaging.includes(tag)) {
            result.reasons.push(`Packaging does not match preference: ${packPref}`);
        }
    }

    return result;
}
