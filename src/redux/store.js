import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import { themeReducer } from "./theme/slice";
import { categoriesReducer } from "./categories/slice";
import { texturesReducer } from "./textures/slice";
import { adminReducer } from "./admin/slice";
const themePersistConfig = {
  key: "theme",
  storage,
  whitelist: ["mode"],
};

const adminPersistConfig = {
  key: "admin-session",
  storage: storageSession,
  whitelist: ["apiKey", "isLoggedIn"],
};

const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, themeReducer),
  categories: categoriesReducer,
  textures: texturesReducer,
  admin: persistReducer(adminPersistConfig, adminReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
