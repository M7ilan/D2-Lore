"use client";

import { createContext, useState, useContext, useEffect, Dispatch, SetStateAction } from "react";
import { getFirstChildOfNode, getFirstNode, getFirstRecord } from "@/src/utils/GetFirst";
import { useManifest } from "./ManifestProvider";
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
	const { manifest, setIsLoading } = useManifest();

	const [node, setNode] = useState(0);
	const [book, setBook] = useState(0);
	const [record, setRecord] = useState(0);

	// Parse URL parameters
	const path = usePathname();
	const params = path.split("/").slice(2);
	const nodeSlug = Number(params[0]);
	const bookSlug = Number(params[1]);
	const recordSlug = Number(params[2]);

	// Set state from URL params or defaults on component mount or manifest change
	useEffect(() => {
		if (!manifest) return;

		const defaultNode = nodeSlug || getFirstNode(manifest, 4077680549);
		const defaultBook = bookSlug || getFirstChildOfNode(manifest, defaultNode);
		const defaultRecord = recordSlug || getFirstRecord(manifest, defaultBook);

		setNode(defaultNode);
		setBook(defaultBook);
		setRecord(defaultRecord);

		setIsLoading(false);
	}, [manifest]);

	return <LoreContext.Provider value={{ node, setNode, book, setBook, record, setRecord }}>{children}</LoreContext.Provider>;
}

export const useLore = (): LoreContextProps => {
	const context = useContext(LoreContext);
	if (!context) {
		throw new Error("useLore must be used within a LoreProvider");
	}
	return context;
};
