"use client";

import LoreBook from "@/src/components/Lore/LoreBook";
import LoreBookContent from "@/src/components/Lore/LoreBookContent";
import LoreNode from "@/src/components/Lore/LoreNode";
import LoreRecordContent from "@/src/components/Lore/LoreRecordContent";
import { useManifest } from "@/src/providers/ManifestProvider";
import { useEffect } from "react";
import { useLore } from "@/src/providers/LoreProvider";
import { motion } from "framer-motion";
import { getFirstBook, getFirstNode, getFirstRecord } from "@/src/utils/NBRs";
import LoreBooksCounter from "@/src/components/Lore/LoreBooksCounter";

export default function LorePage({ params }: { params: { slug: number[] } }) {
	const { manifest } = useManifest();
	const { node, setNode, book, setBook, record, setRecord } = useLore();

	const nodeSlug = params.slug?.[0] ?? 0;
	const bookSlug = params.slug?.[1] ?? 0;
	const recordSlug = params.slug?.[2] ?? 0;

	useEffect(() => {
		if (manifest && !nodeSlug && !bookSlug && !recordSlug) {
			const defaultNode = getFirstNode(manifest);
			setNode(defaultNode);

			const firstBook = getFirstBook(manifest, defaultNode);
			setBook(firstBook);
			setRecord(getFirstRecord(manifest, firstBook));
		}

		if (nodeSlug) {
			setNode(nodeSlug);

			if (bookSlug) {
				setBook(bookSlug);
				setRecord(getFirstRecord(manifest, bookSlug));

				if (recordSlug) {
					setTimeout(() => {
						setRecord(recordSlug);
					}, 10);
				} else if (!bookSlug) {
					setRecord(getFirstRecord(manifest, nodeSlug));
				}
			} else {
				setBook(getFirstBook(manifest, nodeSlug));
			}
		} else {
			setNode(getFirstNode(manifest));
		}
	}, [manifest]);

	useEffect(() => {
		if (node) {
			const firstBook = getFirstBook(manifest, node);
			setBook(firstBook);
			setRecord(getFirstRecord(manifest, firstBook));
		}
	}, [node]);

	useEffect(() => {
		if (book) {
			setRecord(getFirstRecord(manifest, book));
		}
	}, [book]);

	useEffect(() => {
		if (nodeSlug) {
			setNode(nodeSlug);

			if (bookSlug) {
				setBook(bookSlug);
				setRecord(getFirstRecord(manifest, bookSlug));

				if (recordSlug) {
					setTimeout(() => {
						setRecord(recordSlug);
					}, 10);
				} else if (!bookSlug) {
					setRecord(getFirstRecord(manifest, nodeSlug));
				}
			} else {
				setBook(getFirstBook(manifest, nodeSlug));
			}
		} else {
			setNode(getFirstNode(manifest));
		}
	}, []);

	return (
		<div className="grid grid-cols-[1fr] grid-rows-[min-content_1fr] md:grid-cols-[320px_2fr] md:grid-rows-[1fr] md:gap-x-8 gap-y-2">
			<div className="flex md:col-span-2">
				<motion.div key={`node-${node}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full justify-between items-center gap-2 title duration-0">
					<div className="opacity-50 font-normal">{manifest?.DestinyPresentationNodeDefinition[node]?.displayProperties?.name}</div>
					<LoreBooksCounter />
				</motion.div>
			</div>
			<div className="grid grid-rows-[64px_min-content] gap-8">
				<div className="grid grid-flow-col gap-4">
					<LoreNode />
				</div>
				<div className="grid grid-cols-[repeat(3,1fr)] gap-8">
					<LoreBook key={`book-${node}`} />
				</div>
			</div>
			<div className="grid grid-rows-[min-content_1fr] lg:grid-cols-[minmax(120px,328px)_minmax(320px,1fr)] gap-8 md:pl-8 md:border-l border-white border-opacity-10">
				<LoreBookContent key={`bookcontent-${book}`} />
				<LoreRecordContent key={`recordcontent-${record}`} />
			</div>
		</div>
	);
}
