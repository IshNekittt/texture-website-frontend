export const selectAllTextures = (state) => state.textures.items;
export const selectTexturesIsLoading = (state) => state.textures.isLoading;
export const selectTexturesError = (state) => state.textures.error;
export const selectTexturesPagination = (state) => state.textures.pagination;
export const selectCurrentTexture = (state) => state.textures.currentItem;
