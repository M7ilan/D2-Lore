import React from "react";
import LoadingIcon from "./LoadingIcon";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function Loading() {
	return (
		<motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute z-10 bg-default inset-0 flex flex-col gap-4 center">
			<div className={clsx("absolute w-full h-full center header gap-2 bg-default")}>
				<LoadingIcon size={48} />
				<div>Loading...</div>
			</div>
		</motion.div>
	);
}
