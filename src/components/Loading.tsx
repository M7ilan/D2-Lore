import React from "react";
import LoadingIcon from "./LoadingIcon";
import { motion } from "framer-motion";
import Logo from "../icons/Logo";

export default function Loading() {
	return (
		<motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute w-full h-full z-50 bg-opacity flex flex-col gap-4 center bg-opacity-100">
			<div className={"center gap-2 bg-opacity flex-col"}>
				<Logo className="w-32 h-32 p-4 drop-shadow-xl text-opacity-100" />
				<div className="flex center gap-4">
					<LoadingIcon size={32} />
					<div className="font-bold">Loading Manifest...</div>
				</div>
			</div>
		</motion.div>
	);
}
