import React from "react";
import LoadingIcon from "./LoadingIcon";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
	return (
		<motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute w-full h-full z-50 bg-default flex flex-col gap-4 center">
			<div className={"center gap-2 bg-default flex-col"}>
				<Image priority src="/Logo.png" width={344} height={344} alt="Logo" className="w-32 h-32" />
				<div className="flex center gap-4">
					<LoadingIcon size={32} />
					<div className="font-bold">Loading Manifest...</div>
				</div>
			</div>
		</motion.div>
	);
}
