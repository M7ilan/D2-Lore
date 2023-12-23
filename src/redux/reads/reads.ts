import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReadsState = {
	reads: NBR[];
};

let data: string | null = null;
if (typeof window !== "undefined") {
	data = localStorage.getItem("Bookmarks");
}

const loadReads = (): NBR[] => {
	return data ? JSON.parse(data) : [];
};

const initialState: ReadsState = {
	reads: loadReads(),
};

const readsSlice = createSlice({
	name: "reads",
	initialState,
	reducers: {
		addRead: (state, action: PayloadAction<NBR>) => {
			state.reads.push(action.payload);
			localStorage.setItem("Reads", JSON.stringify(state.reads));
		},
		removeRead: (state, action: PayloadAction<number>) => {
			state.reads = state.reads.filter((bookmark) => bookmark.record !== action.payload);
			localStorage.setItem("Reads", JSON.stringify(state.reads));
		},
	},
});

export const { addRead, removeRead } = readsSlice.actions;

export default readsSlice.reducer;
