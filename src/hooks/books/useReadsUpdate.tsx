import { useDispatch, useSelector } from "react-redux";
import { addRead, removeRead } from "@/src/redux/reads/reads"; // adjust the import path
import { RootState } from "@/src/redux/store";

const useReadsUpdate = () => {
	const dispatch = useDispatch();
	const reads = useSelector((state: RootState) => state.reads.reads); // adjust the path as necessary

	function updateReads(node: number, book: number, record: number) {
		const bookmarkExists = reads.some((bookmark) => bookmark.record === record);

		if (bookmarkExists) {
			dispatch(removeRead(record));
		} else {
			dispatch(addRead({ node, book, record }));
		}
	}

	return updateReads;
};

export default useReadsUpdate;
