// src/contexts/LoreContext.tsx

"use client";

import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

interface LoreContextProps {
	node: number;
	setNode: Dispatch<SetStateAction<number>>;
	book: number;
	setBook: Dispatch<SetStateAction<number>>;
	record: number;
	setRecord: Dispatch<SetStateAction<number>>;
}

export const LoreContext = createContext<LoreContextProps | undefined>(undefined);

export default function LoreProvider({ children }: { children: React.ReactNode }) {
	const [node, setNode] = useState(0);
	const [book, setBook] = useState(0);
	const [record, setRecord] = useState(0);

	return <LoreContext.Provider value={{ node, setNode, book, setBook, record, setRecord }}>{children}</LoreContext.Provider>;
}

export const useLore = (): LoreContextProps => {
	const context = useContext(LoreContext);
	if (!context) {
		throw new Error("useLore must be used within a LoreProvider");
	}
	return context;
};
