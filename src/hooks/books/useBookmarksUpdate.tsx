import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "@/src/redux/bookmarks/bookmarks"; // adjust the import path
import { RootState } from "@/src/redux/store";

const useBookmarksUpdate = () => {
	const dispatch = useDispatch();
	const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks); // adjust the path as necessary

	function updateBookmarks(node: number, book: number, record: number) {
		const bookmarkExists = bookmarks.some((bookmark) => bookmark.record === record);

		if (bookmarkExists) {
			dispatch(removeBookmark(record));
		} else {
			dispatch(addBookmark({ node, book, record }));
		}
	}

	return updateBookmarks;
};

export default useBookmarksUpdate;
