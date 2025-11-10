// store.ts
"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./userSlice";
import jobReducer from "./jobSlice";
import jobSearch from "./jobSearch";

// 1. Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer,
  jobSearch:jobSearch, 
});

// 2. Setup persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // persist only the user slice
};

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }),
});

// 5. Setup the persistor
export const persistor = persistStore(store);

// 6. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

