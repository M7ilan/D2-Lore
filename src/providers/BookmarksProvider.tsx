"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useLore } from "./LoreProvider";

type BookmarksContextProps = {
	bookmarks: NBR[];
	updateBookmarks: (selectedRecord: number) => void;
};

export const BookmarksContext = createContext<BookmarksContextProps | undefined>(undefined);

export default function BookmarksProvider({ children }: { children: React.ReactNode }) {
	const { node, book } = useLore();
	const [bookmarks, setBookmarks] = useState<NBR[]>([]);

	useEffect(() => {
		const bookmarks = JSON.parse(localStorage.getItem("Bookmarks") || "{}");
		setBookmarks(Object.values(bookmarks));
	}, []);

	function updateBookmarks(selectedRecord: number) {
		// Check if bookmark exists
		const bookmarked = !!bookmarks.find((bookmark) => bookmark.record == selectedRecord);

		// If bookmark exists, remove it
		if (bookmarked) {
			const newBookmarks = bookmarks.filter((bookmark) => bookmark.record != selectedRecord);
			setBookmarks(newBookmarks);
			localStorage.setItem("Bookmarks", JSON.stringify(newBookmarks));
		}

		// If bookmark doesn't exist, add it
		else {
			const newBookmarks = [...bookmarks, { node, book, record: selectedRecord }];
			setBookmarks(newBookmarks);
			localStorage.setItem("Bookmarks", JSON.stringify(newBookmarks));
		}
	}

	return <BookmarksContext.Provider value={{ bookmarks, updateBookmarks }}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks() {
	const context = useContext(BookmarksContext);
	if (context === undefined) {
		throw new Error("useBookmarks must be used within a BookmarksProvider");
	}
	return context;
}
