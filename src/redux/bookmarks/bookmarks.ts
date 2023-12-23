import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookmarksState = {
	bookmarks: NBR[];
};

const loadBookmarks = (): NBR[] => {
	const data = localStorage.getItem("Bookmarks");
	return data ? JSON.parse(data) : [];
};

const initialState: BookmarksState = {
	bookmarks: loadBookmarks(),
};

const bookmarksSlice = createSlice({
	name: "bookmarks",
	initialState,
	reducers: {
		addBookmark: (state, action: PayloadAction<NBR>) => {
			state.bookmarks.push(action.payload);
			localStorage.setItem("Bookmarks", JSON.stringify(state.bookmarks));
		},
		removeBookmark: (state, action: PayloadAction<number>) => {
			state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.record !== action.payload);
			localStorage.setItem("Bookmarks", JSON.stringify(state.bookmarks));
		},
	},
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
