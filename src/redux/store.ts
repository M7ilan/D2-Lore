import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from "./bookmarks/bookmarks";
import readsReducer from "./reads/reads";

export const store = configureStore({
	reducer: {
		bookmarks: bookmarksReducer,
		reads: readsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
