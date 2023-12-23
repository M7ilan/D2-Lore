"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useLore } from "./LoreProvider";

type ReadsContextProps = {
	reads: NBR[];
	updateReads: (selectedRecord: number) => void;
};

export const ReadsContext = createContext<ReadsContextProps | undefined>(undefined);

export default function ReadsProvider({ children }: { children: React.ReactNode }) {
	const { node, book } = useLore();
	const [reads, setReads] = useState<NBR[]>([]);

	useEffect(() => {
		const reads = JSON.parse(localStorage.getItem("Reads") || "{}");
		setReads(Object.values(reads));
	}, []);

	function updateReads(selectedRecord: number) {
		// Check if read exists
		const readed = !!reads.find((read) => read.record == selectedRecord);

		// If read exists, remove it
		if (readed) {
			const newReads = reads.filter((read) => read.record != selectedRecord);
			setReads(newReads);
			localStorage.setItem("Reads", JSON.stringify(newReads));
		}

		// If read doesn't exist, add it
		else {
			const newReads = [...reads, { node, book, record: selectedRecord }];
			setReads(newReads);
			localStorage.setItem("Reads", JSON.stringify(newReads));
		}
	}

	return <ReadsContext.Provider value={{ reads, updateReads }}>{children}</ReadsContext.Provider>;
}

export function useReads() {
	const context = useContext(ReadsContext);
	if (context === undefined) {
		throw new Error("useReads must be used within a ReadsProvider");
	}
	return context;
}
