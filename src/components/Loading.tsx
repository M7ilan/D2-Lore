import LoadingIcon from "./LoadingIcon";
import { motion } from "framer-motion";

export default function Loading({ status }: { status: string }) {
	return (
		<motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute z-10 bg-default inset-0 flex flex-col gap-4 center">
			<div className="header">
				<LoadingIcon size={32} />
			</div>
			<div className="title">{status}</div>
		</motion.div>
	);
}
