"use client";

import LoreBook from "@/src/components/Bungie/LoreBook";
import LoreBookContent from "@/src/components/Bungie/LoreBookContent";
import LoreNode from "@/src/components/Bungie/LoreNode";
import LoreRecordContent from "@/src/components/Bungie/LoreRecordContent";
import { useManifest } from "@/src/providers/ManifestProvider";
import { useEffect } from "react";
import { useLore } from "@/src/providers/LoreProvider";
import { motion } from "framer-motion";

export default function HomePage({ params }: { params: { slug: number[] } }) {
	const { manifest } = useManifest();
	const { node, setNode, book, setBook, record, setRecord } = useLore();

	const nodeSlug = params.slug?.[0] ?? 0;
	const bookSlug = params.slug?.[1] ?? 0;
	const recordSlug = params.slug?.[2] ?? 0;

	const fetchFirstNode = () => {
		const lore = manifest?.DestinyPresentationNodeDefinition[4077680549]; // Lore Definition
		return lore?.children.presentationNodes[0].presentationNodeHash ?? 0;
	};

	const fetchFirstBookAndRecord = (node: number) => {
		const newNode = manifest?.DestinyPresentationNodeDefinition[node];
		const firstBook = newNode?.children.presentationNodes[0].presentationNodeHash ?? 0;
		const firstRecord = (firstBook && manifest?.DestinyPresentationNodeDefinition[firstBook].children.records[0].recordHash) ?? 0;

		return { firstBook, firstRecord };
	};

	useEffect(() => {
		if (manifest && !nodeSlug && !bookSlug && !recordSlug) {
			const defaultNode = fetchFirstNode();
			setNode(defaultNode);

			const { firstBook, firstRecord } = fetchFirstBookAndRecord(defaultNode);
			setBook(firstBook);
			setRecord(firstRecord);
		}

		if (nodeSlug) {
			setNode(nodeSlug);

			if (bookSlug) {
				setBook(bookSlug);
				const firstRecordOfSelectedBook = manifest?.DestinyPresentationNodeDefinition[bookSlug]?.children?.records[0]?.recordHash ?? 0;
				setRecord(firstRecordOfSelectedBook);

				if (recordSlug) {
					setTimeout(() => {
						setRecord(recordSlug);
					}, 100);
				} else if (!bookSlug) {
					setRecord(fetchFirstBookAndRecord(nodeSlug).firstRecord);
				}
			} else {
				setBook(fetchFirstBookAndRecord(nodeSlug).firstBook);
			}
		} else {
			setNode(fetchFirstNode());
		}
	}, [manifest]);

	useEffect(() => {
		if (node) {
			const { firstBook, firstRecord } = fetchFirstBookAndRecord(node);
			setBook(firstBook);
			setRecord(firstRecord);
		}
	}, [node]);

	useEffect(() => {
		if (book) {
			const newBook = manifest?.DestinyPresentationNodeDefinition[book];
			const firstRecord = newBook?.children.records[0]?.recordHash ?? 0;

			setRecord(firstRecord);
		}
	}, [book]);

	return (
		<div className="grid grid-cols-[1fr] grid-rows-[min-content_1fr] md:grid-cols-[320px_2fr] md:grid-rows-[1fr] md:gap-x-8 gap-y-2">
			<div className="flex md:col-span-2 justify-between items-center">
				<motion.div key={`node-${node}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 title duration-0">
					<div className="opacity-50 font-normal">{manifest?.DestinyPresentationNodeDefinition[node]?.displayProperties?.name}</div>
				</motion.div>
			</div>
			<div className="grid grid-rows-[64px_min-content] gap-8">
				<div className="grid grid-flow-col gap-2">
					<LoreNode />
				</div>
				<div className="grid grid-cols-[repeat(3,1fr)] gap-8">
					<LoreBook key={`book-${node}`} />
				</div>
			</div>
			<div className="grid grid-rows-[min-content_1fr] lg:grid-cols-[minmax(120px,360px)_minmax(320px,1fr)] gap-8 md:pl-8 md:border-l border-white border-opacity-10 duration-0">
				<LoreBookContent key={`bookcontent-${book}`} />
				<LoreRecordContent key={`recordcontent-${record}`} />
			</div>
		</div>
	);
}
