export const selectAllCategories = (state) => state.categories.items;
export const selectCategoriesIsLoading = (state) => state.categories.isLoading;
export const selectCategoriesError = (state) => state.categories.error;
export const selectCurrentCategory = (state) => state.categories.currentItem;
