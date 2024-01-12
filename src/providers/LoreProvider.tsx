"use client";

import { createContext, useState, useContext, useEffect, Dispatch, SetStateAction } from "react";
import { getFirstChildOfNode, getFirstNode, getFirstRecord } from "@/src/utils/GetFirst";
import { usePathname } from "next/navigation";

type LoreContextProps = {
	node: number;
	setNode: Dispatch<SetStateAction<number>>;
	book: number;
	setBook: Dispatch<SetStateAction<number>>;
	record: number;
	setRecord: Dispatch<SetStateAction<number>>;
};

export const LoreContext = createContext<LoreContextProps | undefined>(undefined);

export default function LoreProvider({ children }: { children: React.ReactNode }) {
	const [node, setNode] = useState(0);
	const [book, setBook] = useState(0);
	const [record, setRecord] = useState(0);

	// Parse URL parameters
	const path = usePathname();
	const currectPage = path.split("/")[1];
	const params = path.split("/").slice(2);
	let nodeSlug = 0;
	let bookSlug = 0;
	let recordSlug = 0;
	if (currectPage == "books") {
		nodeSlug = Number(params[0]);
		bookSlug = Number(params[1]);
		recordSlug = Number(params[2]);
	}

	// Set state from URL params or defaults on component mount or manifest change
	useEffect(() => {
		const defaultNode = nodeSlug || getFirstNode(4077680549);
		const defaultBook = bookSlug || getFirstChildOfNode(defaultNode);
		const defaultRecord = recordSlug || getFirstRecord(defaultBook);

		setNode(defaultNode);
		setBook(defaultBook);
		setRecord(defaultRecord);
	}, []);

	return <LoreContext.Provider value={{ node, setNode, book, setBook, record, setRecord }}>{children}</LoreContext.Provider>;
}

export function useLore(): LoreContextProps {
	const context = useContext(LoreContext);
	if (!context) {
		throw new Error("useLore must be used within a LoreProvider");
	}
	return context;
};
