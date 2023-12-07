"use client";

import { AnimatePresence } from "framer-motion";
import Loading from "@/src/components/Loading";
import { useManifest } from "./ManifestProvider";

export default function LoadingProvider() {
	const { isLoading, loadingStatus, down } = useManifest();

	return <AnimatePresence>{isLoading && <Loading key="loading" status={loadingStatus} down={down} />}</AnimatePresence>;
}
