"use client";

import { createContext, useState, useContext, useEffect, Dispatch, SetStateAction } from "react";
import { getFirstNode, getFirstChildOfNode } from "@/src/utils/GetFirst";
import { useManifest } from "./ManifestProvider";
import { usePathname } from "next/navigation";

type ArmorContextProps = {
	node: number;
	setNode: Dispatch<SetStateAction<number>>;
	category: number;
	setCategory: Dispatch<SetStateAction<number>>;
};

export const ArmorContext = createContext<ArmorContextProps | undefined>(undefined);

export default function ArmorProvider({ children }: { children: React.ReactNode }) {
	const { manifest, setIsLoading } = useManifest();

	const [node, setNode] = useState(0);
	const [category, setCategory] = useState(0);

	// Parse URL parameters
	const path = usePathname();
	const params = path.split("/").slice(2);
	const nodeSlug = Number(params[0]);
	const categorySlug = Number(params[1]);

	// Set state from URL params or defaults on component mount or manifest change
	useEffect(() => {
		if (!manifest) return;

		const defaultNode = nodeSlug || getFirstNode(manifest, 1605042242);
		const defaultCategory = categorySlug || getFirstChildOfNode(manifest, defaultNode);

		setNode(defaultNode);
		setCategory(defaultCategory);

		setIsLoading(false);
	}, [manifest]);

	return <ArmorContext.Provider value={{ node, setNode, category, setCategory }}>{children}</ArmorContext.Provider>;
}

export const useArmor = (): ArmorContextProps => {
	const context = useContext(ArmorContext);
	if (!context) {
		throw new Error("useArmor must be used within a ArmorProvider");
	}
	return context;
};
