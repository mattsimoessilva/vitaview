export function buildSuitabilityPayload(product: any) {
    return {
        ingredients_tags: product.ingredients_tags ?? [],
        allergens_tags: product.allergens_tags ?? [],
        nutriments: {
            sugars_value: product.nutriments?.sugars ?? 0,
            sodium_value: product.nutriments?.sodium ?? 0,
            fat_value: product.nutriments?.fat ?? 0,
            saturated_fat: product.nutriments?.saturated_fat ?? 0,
            proteins_value: product.nutriments?.proteins ?? 0,
            carbohydrates_value: product.nutriments?.carbohydrates ?? 0
        },
        packaging_tags: product.packaging_tags ?? [],
        labels_tags: product.labels_tags ?? [],
        ingredients_analysis_tags: product.ingredients_analysis_tags ?? []
    };
}
