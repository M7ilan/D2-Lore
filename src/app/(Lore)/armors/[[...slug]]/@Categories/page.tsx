"use client";

import useCatagories from "@/src/hooks/armors/useCategories";
import { useArmor } from "@/src/providers/ArmorProvider";
import clsx from "clsx";

export default function CategoriesPage() {
	const { node, category, setCategory } = useArmor();
	const categories = useCatagories();

	function handleOnClick(hash: number) {
		setCategory(hash);
		window.history.pushState({}, "", `/armors/${node}/${hash}`);
	}

	return (
		<div className="grid gap-2">
			{categories?.map((categoryDiff) => {
				const categoryHash = categoryDiff?.hash || 0;
				return (
					<div onClick={() => handleOnClick(categoryHash)} key={categoryHash} className={clsx("node p-2 subtitle", { active: categoryHash == category })}>
						{categoryDiff?.displayProperties.name}
					</div>
				);
			})}
		</div>
	);
}
